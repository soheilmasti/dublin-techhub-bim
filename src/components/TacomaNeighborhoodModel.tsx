import React, { useRef, useState, useMemo } from 'react';
import { useGLTF, Html, Float } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { CategoryBuilding } from '../types';
import { sound } from '../utils/audio';
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
    label: 'طراحی شهری، بنادر و زیرساخت کلان',
    badge: 'ZONE 01',
    color: '#0284c7',
    icon: Compass
  },
  {
    categoryId: 'residential-luxury',
    center: [-6.19, 2.66, 11.89],
    size: [4.8, 2.43, 5.5],
    roof: [-6.19, 4.05, 11.89],
    label: 'پروژه‌های مسکونی و ویلاهای لوکس',
    badge: 'ZONE 02',
    color: '#10b981',
    icon: Home
  },
  {
    categoryId: 'commercial-complexes',
    center: [6.57, 4.69, 6.23],
    size: [4.2, 7.98, 12.8],
    roof: [6.57, 8.85, 6.23],
    label: 'مجتمع‌های تجاری، اداری و برج‌ها',
    badge: 'ZONE 03',
    color: '#6366f1',
    icon: Briefcase
  },
  {
    categoryId: 'retail-stores',
    center: [-0.87, 2.67, -1.03],
    size: [6.5, 3.44, 18.0],
    roof: [-0.87, 4.65, -1.03],
    label: 'فروشگاه‌های کانسپت و فضاهای تجاری مدرن',
    badge: 'ZONE 04',
    color: '#ec4899',
    icon: ShoppingBag
  },
  {
    categoryId: 'institutional-competitions',
    center: [7.31, 1.60, 16.02],
    size: [2.8, 1.94, 3.6],
    roof: [7.31, 2.75, 16.02],
    label: 'مسابقات معماری و پروژه‌های عمومی',
    badge: 'ZONE 05',
    color: '#f59e0b',
    icon: Award
  }
];

import { ArchitecturalEntourage } from './ArchitecturalEntourage';

export const TacomaNeighborhoodModel: React.FC<TacomaNeighborhoodModelProps> = ({
  categories,
  onSelectCategory,
  selectedCategory,
  lightingMode,
  currentLanguage = 'en'
}) => {
  const gltf = useGLTF('/models/tacoma/Tacoma_Neighborhood.glb');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;
  const isRTL = currentLanguage === 'fa';

  // Clone & configure bright architectural materials for SketchUp model
  const sceneClone = useMemo(() => {
    const clone = gltf.scene.clone();

    // Center & scale model to world coordinates
    const scale = 0.0032;
    clone.scale.set(scale, scale, scale);
    clone.position.set(-3948.0 * scale, -836.0 * scale, 8985.0 * scale);
    clone.rotation.set(0, 0, 0);

    // Preserve Authentic SketchUp Textures, Materials & Colors
    clone.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material) {
        child.castShadow = true;
        child.receiveShadow = true;

        const materials = Array.isArray(child.material) ? child.material : [child.material];
        materials.forEach((mat) => {
          mat.side = THREE.DoubleSide;
          mat.needsUpdate = true;

          if (mat.map) {
            mat.map.anisotropy = 16;
            mat.map.needsUpdate = true;
          }

          if (mat instanceof THREE.MeshStandardMaterial) {
            const matName = (mat.name || '').toLowerCase();
            const isGlass = matName.includes('glass') || matName.includes('translucent') || matName.includes('window');

            if (isGlass) {
              mat.transparent = true;
              mat.opacity = lightingMode === 'night' ? 0.95 : 0.68;
              mat.roughness = 0.1;
              mat.metalness = 0.85;
              mat.envMapIntensity = 2.0;
            } else {
              mat.roughness = THREE.MathUtils.clamp(mat.roughness || 0.45, 0.25, 0.7);
              mat.metalness = THREE.MathUtils.clamp(mat.metalness || 0.05, 0.02, 0.3);
              mat.envMapIntensity = 1.35;
            }

            // Enhanced Night Illumination on Windows & Facades
            if (lightingMode === 'night') {
              if (isGlass) {
                // Glowing warm interior architectural light from inside the buildings
                mat.emissive = new THREE.Color('#f59e0b');
                mat.emissiveIntensity = 2.2;
              } else {
                // Subtle architectural facade night tint
                mat.roughness = 0.3;
                mat.metalness = 0.15;
              }
            } else if (lightingMode === 'sunset') {
              mat.roughness = 0.35;
            }
          }
        });
      }
    });

    return clone;
  }, [gltf, lightingMode]);

  return (
    <group position={[0, 0, 0]}>
      {/* Real SketchUp Neighborhood Site Model */}
      <primitive object={sceneClone} />

      {/* 3D Proportional Scale Figures & Modern Street Lighting */}
      <ArchitecturalEntourage lightingMode={lightingMode as any} />

      {/* 5 Interactive Building Keys (Direct Building Selection & Clean Rooftop Badges - NO CIRCLES) */}
      {BUILDING_ZONES.map((zone) => {
        const category = categories.find(c => c.id === zone.categoryId);
        if (!category) return null;
        const isHovered = hoveredId === zone.categoryId;
        const isSelected = selectedCategory?.id === zone.categoryId;
        const Icon = zone.icon;
        const leadProject = category.projects[0];

        return (
          <group key={zone.categoryId}>
            {/* 1. Direct Building Hitbox: Clicking anywhere on the building activates it! */}
            <mesh
              position={zone.center}
              onClick={(e) => {
                e.stopPropagation();
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
              <meshStandardMaterial
                color={zone.color}
                transparent
                opacity={isSelected ? 0.30 : isHovered ? 0.20 : 0.0}
                emissive={zone.color}
                emissiveIntensity={isSelected ? 1.5 : isHovered ? 0.9 : 0.0}
                roughness={0.2}
                depthWrite={false}
              />
            </mesh>

            {/* 2. Sleek Floating Architectural Tag (Hidden when any building is selected so user can freely inspect project details) */}
            {!selectedCategory && (
              <group position={zone.roof}>
                {/* Minimalist Floating Glass Pill Badge & Rich Project Card */}
                <Html position={[0, 0.4, 0]} center distanceFactor={15}>
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
                    {/* Primary Glass Badge */}
                    <div
                      className={`px-4 py-2 rounded-2xl backdrop-blur-xl border shadow-2xl flex items-center gap-3 whitespace-nowrap transition-all duration-300 ${
                        isHovered
                          ? 'bg-slate-900/95 text-white border-sky-400 ring-2 ring-sky-400/40 shadow-sky-500/30'
                          : 'bg-white/95 text-slate-900 border-slate-200/90 shadow-slate-900/15'
                      }`}
                    >
                      {/* Glowing Icon Container */}
                      <div
                        className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shadow-xs transition-colors ${
                          isHovered
                            ? 'bg-sky-500 text-white'
                            : 'bg-slate-900 text-white'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>

                      {/* Typography */}
                      <div className={isRTL ? 'text-right' : 'text-left'} dir={isRTL ? 'rtl' : 'ltr'}>
                        <div className="flex items-center gap-1.5">
                          <span className={`text-[8.5px] font-mono font-bold px-1.5 py-0.5 rounded ${
                            isHovered ? 'bg-sky-950 text-sky-200 border border-sky-700' : 'bg-slate-100 text-slate-700'
                          }`}>
                            {t.zones[zone.categoryId as keyof typeof t.zones]?.badge || zone.badge}
                          </span>
                          <span className={`text-[9.5px] font-bold ${
                            isHovered ? 'text-sky-300' : 'text-slate-500'
                          }`}>
                            {category.projects.length} {t.projectsCount}
                          </span>
                        </div>
                        <div className="text-[12px] font-black tracking-tight leading-none mt-1">
                          {t.zones[zone.categoryId as keyof typeof t.zones]?.label || zone.label}
                        </div>
                      </div>

                      <div className={`p-1.5 rounded-xl transition-transform duration-200 ${
                        isHovered ? 'bg-sky-600 text-white translate-x-[-2px]' : 'bg-slate-100 text-slate-500'
                      }`}>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    {/* Expanded Hover HUD Card: Lead Project Preview (only when hovering and not selected) */}
                    {isHovered && !selectedCategory && leadProject && (
                      <div 
                        className={`mt-2 w-64 p-3 rounded-2xl bg-slate-950/95 backdrop-blur-2xl border border-sky-400/40 shadow-2xl text-white animate-in fade-in slide-in-from-bottom-2 duration-200 ${
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
                            <span className={`absolute bottom-1.5 ${isRTL ? 'right-2' : 'left-2'} text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-blue-600 text-white`}>
                              {leadProject.year}
                            </span>
                          </div>
                        )}
                        <div className="text-xs font-bold line-clamp-1 text-slate-100">
                          {isRTL ? leadProject.title : (leadProject.englishTitle || leadProject.title)}
                        </div>
                        <div className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">
                          {leadProject.location} • {leadProject.typology}
                        </div>
                        <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-bold text-sky-400">
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

useGLTF.preload('/models/tacoma/Tacoma_Neighborhood.glb');
