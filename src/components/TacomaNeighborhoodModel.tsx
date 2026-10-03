import { CategoryMark } from './CategoryMark';
import { buildingSelectionGeometry } from '../utils/buildingSelectionGeometry';
import React, { useRef, useState, useMemo } from 'react';
import { useGLTF, Html, Float, Outlines } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { CategoryBuilding } from '../types';
import { sound } from '../utils/audio';
import { cleanModelSurfaces } from '../utils/cleanModelSurfaces';
import { 
  Building2, 
  Home, 
  Briefcase, 
  Compass, 
  Sparkles,
  Layers,
  ArrowUpRight,
  ShoppingBag,
  Award
} from 'lucide-react';
import { LanguageCode, TRANSLATIONS } from '../utils/i18n';

interface TacomaNeighborhoodModelProps {
  categories: CategoryBuilding[];
  onSelectCategory: (category: CategoryBuilding) => void;
  selectedCategory: CategoryBuilding | null;
  lightingMode: 'day' | 'sunset' | 'night' | 'wireframe';
  currentLanguage?: LanguageCode;
  showPins?: boolean;
}

// 5 Interactive Building Complexes in Tacoma Model (Exact Coordinates & Bounding Envelopes mapped to Categories)
const BUILDING_ZONES: {
  categoryId: string;
  center: [number, number, number];
  size: [number, number, number];
  roof: [number, number, number];
  label: string;
  badge: string;
  color: string;
  icon: any;
}[] = [
  {
    categoryId: 'urban-design',
    center: [-6.95, 4.17, -6.17],
    size: [3.2, 4.74, 12.5],
    roof: [-6.95, 6.75, -6.17],
    label: 'Urban Design, Ports & Infrastructure',
    badge: 'ZONE 01',
    color: '#0284c7',
    icon: Compass
  },
  {
    categoryId: 'residential-luxury',
    center: [-6.19, 2.66, 11.89],
    size: [4.8, 2.43, 5.5],
    roof: [-6.19, 4.05, 11.89],
    label: 'Luxury Villas & Residential Enclaves',
    badge: 'ZONE 02',
    color: '#10b981',
    icon: Home
  },
  {
    categoryId: 'commercial-complexes',
    center: [6.57, 4.69, 6.23],
    size: [4.2, 7.98, 12.8],
    roof: [6.57, 8.85, 6.23],
    label: 'Commercial Complexes & Mixed-Use Towers',
    badge: 'ZONE 03',
    color: '#6366f1',
    icon: Briefcase
  },
  {
    categoryId: 'retail-stores',
    center: [-0.87, 2.67, -1.03],
    size: [6.5, 3.44, 18.0],
    roof: [-0.87, 4.65, -1.03],
    label: 'Modern Retail Spaces & Concept Showrooms',
    badge: 'ZONE 04',
    color: '#ec4899',
    icon: ShoppingBag
  },
  {
    categoryId: 'institutional-competitions',
    center: [7.31, 1.60, 16.02],
    size: [2.8, 1.94, 3.6],
    roof: [7.31, 2.75, 16.02],
    label: 'Civic Architecture & Design Competitions',
    badge: 'ZONE 05',
    color: '#f59e0b',
    icon: Award
  }
];

import { ArchitecturalEntourage } from './ArchitecturalEntourage';

// Helpers for Automatic Mesh & Hierarchy Detection
const isBaseElement = (name: string): boolean => {
  const n = name.toLowerCase();
  return (
    n.includes('ground') ||
    n.includes('asphalt') ||
    n.includes('blacktop') ||
    n.includes('paver') ||
    n.includes('street') ||
    n.includes('sidewalk') ||
    n.includes('road') ||
    n.includes('base') ||
    n.includes('pedestal') ||
    n.includes('terrain') ||
    n.includes('earth') ||
    n.includes('soil')
  );
};

const isContextElement = (name: string): boolean => {
  const n = name.toLowerCase();
  return (
    n.includes('tree') ||
    n.includes('vegetat') ||
    n.includes('plant') ||
    n.includes('ivy') ||
    n.includes('leaf') ||
    n.includes('juniper') ||
    n.includes('locust') ||
    n.includes('people') ||
    n.includes('person') ||
    n.includes('human') ||
    n.includes('rockit') ||
    n.includes('stacy') ||
    n.includes('jean') ||
    n.includes('car') ||
    n.includes('vehicle') ||
    n.includes('lamp') ||
    n.includes('pole') ||
    n.includes('fixture')
  );
};

// Detect architectural window frames, mullions, louvers, and shadow reveals (creates 3D relief!)
const isDarkTrimElement = (name: string): boolean => {
  const n = name.toLowerCase();
  return (
    n.includes('color_007') ||
    n.includes('color_008') ||
    n.includes('color_009') ||
    n.includes('_charcoal_') ||
    n.includes('m_0135_darkgray') ||
    n.includes('_black_') ||
    n.includes('steel_2') ||
    n.includes('fencing') ||
    n.includes('color_006')
  );
};

// Detect all windows, storefronts, and glazed facade openings across the neighborhood
const isGlazingElement = (name: string, mat?: THREE.Material | THREE.Material[]): boolean => {
  const n = name.toLowerCase();
  const rawMats = Array.isArray(mat) ? mat : mat ? [mat] : [];
  const hasTranspMat = rawMats.some(m => m.transparent || (m.opacity !== undefined && m.opacity < 0.95));
  const matNames = rawMats.map(m => (m.name || '').toLowerCase()).join(' ');

  return (
    n.includes('glass') ||
    n.includes('window') ||
    n.includes('curtain') ||
    n.includes('glaze') ||
    n.includes('trans') ||
    n.includes('resin') ||
    // Include all SketchUp window meshes colored in yellow/amber:
    n.includes('color_d02') ||
    n.includes('color_d01') ||
    n.includes('color_d04') ||
    n.includes('color_d05') ||
    n.includes('color_e05') ||
    /\byel\b/.test(n) ||
    matNames.includes('glass') ||
    matNames.includes('window') ||
    matNames.includes('curtain') ||
    matNames.includes('glaze') ||
    matNames.includes('trans') ||
    matNames.includes('resin') ||
    hasTranspMat
  );
};

// Detect roof planes, slabs, and copings for negative polygon offset
const isRoofElement = (name: string): boolean => {
  const n = name.toLowerCase();
  return (
    n.includes('roof') ||
    n.includes('parapet') ||
    n.includes('coping') ||
    n.includes('beadboard') ||
    n.includes('concrete_tile') ||
    n.includes('metal_steel_textured_white') ||
    n.includes('metal_corrugated_shiny')
  );
};

export const TacomaNeighborhoodModel: React.FC<TacomaNeighborhoodModelProps> = ({
  categories,
  onSelectCategory,
  selectedCategory,
  lightingMode,
  currentLanguage = 'en',
  showPins = true
}) => {
  const gltf = useGLTF('/models/tacoma/Tacoma_Neighborhood.glb', '/draco/');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;
  const isRTL = currentLanguage === 'fa';

  // Architectural Physical Maquette PBR Materials (Studio Maquette Standard)
  // 1. Warm Frosted Luminous Glazing / Windows (Solid backlit architectural panels - NO hollow see-through transmission!)
  const glazingMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#a8a7a2'), // Warm ivory cream
    emissive: new THREE.Color('#ffe2b8'), // Warm golden interior glow
    emissiveIntensity: 0.02, // Elegant internal light
    roughness: 0.65,
    metalness: 0,
    flatShading: true,
    side: THREE.DoubleSide
  }), []);

  // 2. Crisp White Laser-Cut Architectural Model Board (Walls, Facades & Main Volumes - 100% Solid & DoubleSide)
  const opaqueMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#eee7dc'),
    roughness: 0.95,
    metalness: 0,
    flatShading: true,
    side: THREE.DoubleSide
  }), []);

  // 2b. White Roof Material with polygonOffset to completely eliminate Z-fighting on overlapping copings
  const roofMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#e1dace'),
    roughness: 0.95,
    metalness: 0,
    flatShading: true,
    side: THREE.DoubleSide,
    polygonOffset: true,
    polygonOffsetFactor: -0.5,
    polygonOffsetUnits: -0.5
  }), []);

  // 3. Dark Architectural Graphite Relief Trim (Mullions, Window Frames, Louvers, Shadow Reveals)
  const darkTrimMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#64615c'), // Dark charcoal-graphite for crisp frame contrast & 3D relief
    roughness: 0.85,
    metalness: 0,
    flatShading: true,
    side: THREE.DoubleSide
  }), []);

  // 4. Matte Dark Charcoal Presentation Plinth (Base / Ground / Pavement) - Offset slightly back so walls cleanly sit on top
  const baseMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#aaa69e'), // Refined studio graphite plinth
    roughness: 0.85,
    metalness: 0,
    flatShading: true,
    side: THREE.DoubleSide,
    polygonOffset: true,
    polygonOffsetFactor: 0.5,
    polygonOffsetUnits: 0.5
  }), []);

  const streetMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#787b78', roughness: 0.98, metalness: 0,
    flatShading: true, side: THREE.DoubleSide,
    polygonOffset: true, polygonOffsetFactor: 0.5, polygonOffsetUnits: 0.5
  }), []);

  // 5. Solid Architectural Model Context (Trees / Vegetation / Site Entourage - Clean solid architectural finish)
  const contextMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#ded8cd'), // Clean laser-cut architectural model context
    roughness: 0.60,
    metalness: 0,
    side: THREE.DoubleSide
  }), []);

  // 1. Initial Scene Setup & Anti-Gravity Floating Roofs
  const sceneClone = useMemo(() => {
    const clone = gltf.scene.clone();

    // Center & scale model to world coordinates
    const scale = 0.0032;
    clone.scale.set(scale, scale, scale);
    clone.position.set(-3948.0 * scale, -836.0 * scale, 8985.0 * scale);
    clone.rotation.set(0, 0, 0);

    const meshes: THREE.Mesh[] = [];
    // Physical Maquette Material Overwrite & Complete Volume Assurance
    clone.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        meshes.push(child);
        const name = (child.name || '').toLowerCase();

        if (/asphalt|blacktop|street|road/.test(name)) {
          child.material = streetMat;
          child.castShadow = false;
          child.receiveShadow = true;
          child.renderOrder = 0;
        } else if (isBaseElement(name)) {
          child.material = baseMat;
          child.castShadow = false;
          child.receiveShadow = true;
          child.renderOrder = 0;
        } else if (isGlazingElement(name, child.material)) {
          child.material = glazingMat;
          child.castShadow = true;
          child.receiveShadow = true;
          child.renderOrder = 0;
        } else if (isDarkTrimElement(name)) {
          // Architectural Reveals, Frames, Louvers and Mullions -> Sharp 3D relief!
          child.material = darkTrimMat;
          child.castShadow = true;
          child.receiveShadow = true;
          child.renderOrder = 0;
        } else if (isContextElement(name)) {
          child.material = contextMat;
          child.castShadow = true;
          child.receiveShadow = true;
          child.renderOrder = 0;
        } else if (isRoofElement(name)) {
          // Roof planes, copings, and parapets with negative polygon offset to eliminate z-fighting
          child.material = roofMat;
          child.castShadow = true;
          child.receiveShadow = true;
          child.renderOrder = 0;
        } else {
          // Laser-cut White Architectural Model Board (Walls, Facades & Massing - Complete Solid Volumes)
          child.material = opaqueMat;
          child.castShadow = true;
          child.receiveShadow = true;
          child.renderOrder = 0;
        }
      }
    });

    clone.updateMatrixWorld(true);
    const priority = [glazingMat, darkTrimMat, roofMat, opaqueMat, contextMat, streetMat, baseMat];
    meshes.sort((a, b) => priority.indexOf(a.material as THREE.MeshStandardMaterial) - priority.indexOf(b.material as THREE.MeshStandardMaterial));
    cleanModelSurfaces(meshes);
    return clone;
  }, [gltf, baseMat, streetMat, glazingMat, darkTrimMat, contextMat, opaqueMat, roofMat]);

  const selectionGeometry = useMemo(() => buildingSelectionGeometry(sceneClone, BUILDING_ZONES, [baseMat, streetMat, contextMat]), [sceneClone, baseMat, streetMat, contextMat]);
  React.useEffect(() => () => Object.values(selectionGeometry).forEach(geometry => geometry.dispose()), [selectionGeometry]);

  // Frosted acrylic remains neutral by day, warmly backlit at dusk and night.
  // Emissive panels are local to the windows: no point lights leaking through walls.
  React.useEffect(() => {
    const night = lightingMode === 'night';
    const dusk = lightingMode === 'sunset';
    glazingMat.color.set(night ? '#ded0b7' : dusk ? '#c4bbac' : '#a8a7a2');
    glazingMat.emissive.set('#ffe2b8');
    glazingMat.emissiveIntensity = night ? 0.85 : dusk ? 0.28 : 0.02;
  }, [lightingMode, glazingMat]);

  return (
    <group position={[0, 0, 0]}>
      {/* Real SketchUp Neighborhood Site Model with Physical Maquette Pipeline */}
      <primitive object={sceneClone} />

      {/* Gallery Presentation Plinth Block (Sitting cleanly below model base, zero coplanar overlap) */}
      <mesh position={[0, -0.45, 0]} castShadow receiveShadow>
        <boxGeometry args={[23, 0.8, 40]} />
        <meshStandardMaterial color="#c3baac" roughness={0.98} metalness={0} />
      </mesh>

      {/* 5 Interactive Building Keys (Direct Building Selection & Clean Rooftop Badges - NO CIRCLES) */}
      {BUILDING_ZONES.map((zone) => {
        const category = categories.find(c => c.id === zone.categoryId);
        if (!category) return null;
        const isHovered = hoveredId === zone.categoryId;
        const isSelected = selectedCategory?.id === zone.categoryId;
        const leadProject = category.projects[0];

        return (
          <group key={zone.categoryId}>
            {/* 1. Direct Building Hitbox: Clicking anywhere on the building activates it! */}
            <mesh
              position={zone.center}
              onClick={(e) => {
                e.stopPropagation();
                if (e.delta > 4) return;
                setHoveredId(null);
                onSelectCategory(category);
                sound.playDrawerOpen();
              }}
              onPointerOver={(e) => {
                e.stopPropagation();
                setHoveredId(zone.categoryId);
                document.body.style.cursor = 'pointer';
                sound.playClick();
              }}
              onPointerOut={() => {
                setHoveredId(null);
                document.body.style.cursor = 'auto';
              }}
            >
              <boxGeometry args={zone.size} />
              {/* Picking volumes must not tint or intersect the visible architecture. */}
              <meshBasicMaterial transparent opacity={0} depthWrite={false} colorWrite={false} />
            </mesh>

            {/* Blue contours follow the real facade and roof triangles, rather than the picking box. */}
            {(isSelected || (showPins && isHovered)) && (
              <mesh geometry={selectionGeometry[zone.categoryId]} raycast={() => null} renderOrder={10}>
                <meshBasicMaterial color="#56717d" transparent opacity={0.09} depthWrite={false}
                  side={THREE.DoubleSide} polygonOffset polygonOffsetFactor={-2} polygonOffsetUnits={-2} toneMapped={false} />
                <Outlines color="#365665" thickness={2.5} angle={Math.PI} toneMapped={false} renderOrder={9} />
              </mesh>
            )}

            {/* 2. Sleek Floating Architectural Tag (Hidden when any building is selected or during video intro) */}
            {!selectedCategory && showPins && (
              <group position={zone.roof}>
                {/* Minimalist Floating Glass Pill Badge & Rich Project Card */}
                <Html position={[0, 0.35, 0]} center distanceFactor={15} zIndexRange={[0, 5]}>
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setHoveredId(null);
                      onSelectCategory(category);
                      sound.playDrawerOpen();
                    }}
                    onPointerOver={() => {
                      setHoveredId(zone.categoryId);
                      document.body.style.cursor = 'pointer';
                    }}
                    onPointerOut={() => {
                      setHoveredId(null);
                      document.body.style.cursor = 'auto';
                    }}
                    className={`transition-all duration-300 transform cursor-pointer select-none ${
                      isHovered ? 'scale-105 -translate-y-2' : 'scale-95 hover:scale-100'
                    }`}
                  >
                    {/* MOBILE-ONLY COMPACT PIN (32px circular icon - never overlaps or blocks screen) */}
                    <div className="md:hidden flex flex-col items-center pointer-events-auto">
                      <div
                        className={`w-9 h-9 rounded-2xl flex items-center justify-center shadow-clay-md border-2 transition-all duration-200 active:scale-90 ${
                          isSelected
                            ? 'bg-[#365665] text-white border-white ring-4 ring-[#78909a]/50 scale-110'
                            : 'bg-white/95 text-slate-900 border-white/90 shadow-md'
                        }`}
                      >
                        <CategoryMark categoryId={zone.categoryId} className="w-5 h-5 shrink-0" />
                      </div>
                      <div className="mt-1">
                        <span className="text-[8px] font-mono font-bold px-1.5 py-0.5 rounded-full bg-slate-950/90 text-white shadow-md border border-white/20 whitespace-nowrap">
                          {t.zones[zone.categoryId as keyof typeof t.zones]?.badge?.replace('ZONE ', 'Z') || `Z0${categories.findIndex(c => c.id === zone.categoryId) + 1}`}
                        </span>
                      </div>
                      {isHovered && (
                        <div className="mt-2 max-w-48 rounded-xl bg-slate-950/95 px-3 py-2 text-center text-xs font-bold text-white shadow-lg" dir={isRTL ? 'rtl' : 'ltr'}>
                          {t.zones[zone.categoryId as keyof typeof t.zones]?.label || category.title}
                        </div>
                      )}
                    </div>

                    {/* DESKTOP-ONLY EXPANDED GLASS BADGE (md:flex) */}
                    <div
                      className={`hidden md:flex px-4 py-2 rounded-2xl backdrop-blur-xl border shadow-2xl items-center gap-3 whitespace-nowrap transition-all duration-300 ${
                        isHovered
                          ? 'bg-slate-900/95 text-white border-[#78909a] ring-2 ring-[#78909a]/40 shadow-[#365665]/30'
                          : 'bg-white/95 text-slate-900 border-slate-200/90 shadow-slate-900/15'
                      }`}
                    >
                      {/* Glowing Icon Container */}
                      <div
                        className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shadow-xs transition-colors ${
                          isHovered
                            ? 'bg-[#365665] text-white'
                            : 'bg-slate-900 text-white'
                        }`}
                      >
                        <CategoryMark categoryId={zone.categoryId} className="w-5 h-5" />
                      </div>

                      {/* Typography */}
                      <div className={isRTL ? 'text-right' : 'text-left'} dir={isRTL ? 'rtl' : 'ltr'}>
                        <div className="flex items-center gap-1.5">
                          <span className={`text-[8.5px] font-mono font-bold px-1.5 py-0.5 rounded ${
                            isHovered ? 'bg-[#223d49] text-[#c7d4d9] border border-[#56717d]' : 'bg-slate-100 text-slate-700'
                          }`}>
                            {t.zones[zone.categoryId as keyof typeof t.zones]?.badge || zone.badge}
                          </span>
                          <span className={`text-[9.5px] font-bold ${
                            isHovered ? 'text-[#b2c5cd]' : 'text-slate-500'
                          }`}>
                            {category.projects.length} {t.projectsCount}
                          </span>
                        </div>
                        <div className="text-[12px] font-black tracking-tight leading-none mt-1">
                          {t.zones[zone.categoryId as keyof typeof t.zones]?.label || zone.label}
                        </div>
                      </div>

                      <div className={`p-1.5 rounded-xl transition-transform duration-200 ${
                        isHovered ? 'bg-[#365665] text-white translate-x-[-2px]' : 'bg-slate-100 text-slate-500'
                      }`}>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    {/* Expanded Hover HUD Card: Lead Project Preview (Desktop ONLY - never blocks mobile viewport) */}
                    {isHovered && !selectedCategory && leadProject && (
                      <div 
                        className={`hidden md:block mt-2 w-64 p-3 rounded-2xl bg-slate-950/95 backdrop-blur-2xl border border-[#78909a]/40 shadow-2xl text-white animate-in fade-in slide-in-from-bottom-2 duration-200 ${
                          isRTL ? 'text-right' : 'text-left'
                        }`}
                        dir={isRTL ? 'rtl' : 'ltr'}
                      >
                        {leadProject.coverImage && (
                          <div className="relative w-full h-24 rounded-xl overflow-hidden mb-2.5 border border-white/10">
                            <img 
                              src={leadProject.coverImage} 
                              alt={leadProject.title} 
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                            <span className={`absolute bottom-1.5 ${isRTL ? 'right-2' : 'left-2'} text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#365665] text-white`}>
                              {leadProject.year}
                            </span>
                          </div>
                        )}
                        <div className="text-xs font-bold line-clamp-1 text-slate-100">
                          {leadProject.title}
                        </div>
                        <div className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">
                          {leadProject.location} • {leadProject.typology}
                        </div>
                        <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-bold text-[#91adb9]">
                          <span className="flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-amber-400" />
                            {t.clickToEnter}
                          </span>
                          <span>{category.projects.length} {t.projectsCount} ↗</span>
                        </div>
                      </div>
                    )}
                  </div>
                </Html>
              </group>
            )}
          </group>
        );
      })}
    </group>
  );
};

useGLTF.preload('/models/tacoma/Tacoma_Neighborhood.glb', '/draco/');
