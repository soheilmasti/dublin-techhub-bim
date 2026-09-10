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
  ArrowUpRight
} from 'lucide-react';

interface TacomaNeighborhoodModelProps {
  categories: CategoryBuilding[];
  onSelectCategory: (category: CategoryBuilding) => void;
  selectedCategory: CategoryBuilding | null;
  lightingMode: 'day' | 'sunset' | 'night' | 'wireframe';
}

// 5 Interactive Building Complexes in Tacoma Model (Exact Coordinates & Bounding Envelopes)
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
    categoryId: 'dublin-techhub',
    center: [6.57, 4.69, 6.23],
    size: [4.2, 7.98, 12.8],
    roof: [6.57, 8.85, 6.23],
    label: '🇮🇪 برج ۷ طبقه دوبلین (BIM Audit)',
    badge: 'ZONE 05',
    color: '#059669',
    icon: Sparkles
  },
  {
    categoryId: 'urban-design',
    center: [-6.95, 4.17, -6.17],
    size: [3.2, 4.74, 12.5],
    roof: [-6.95, 6.75, -6.17],
    label: 'طراحی شهری و بنادر',
    badge: 'ZONE 01',
    color: '#0284c7',
    icon: Compass
  },
  {
    categoryId: 'commercial-retail',
    center: [-0.87, 2.67, -1.03],
    size: [6.5, 3.44, 18.0],
    roof: [-0.87, 4.65, -1.03],
    label: 'مجتمع‌های تجاری و اداری',
    badge: 'ZONE 03',
    color: '#f59e0b',
    icon: Briefcase
  },
  {
    categoryId: 'residential-villas',
    center: [-6.19, 2.66, 11.89],
    size: [4.8, 2.43, 5.5],
    roof: [-6.19, 4.05, 11.89],
    label: 'مسکونی و ویلاهای لوکس',
    badge: 'ZONE 02',
    color: '#10b981',
    icon: Home
  },
  {
    categoryId: 'cultural-public',
    center: [7.31, 1.60, 16.02],
    size: [2.8, 1.94, 3.6],
    roof: [7.31, 2.75, 16.02],
    label: 'فرهنگی و مسابقات معماری',
    badge: 'ZONE 04',
    color: '#8b5cf6',
    icon: Building2
  }
];

export const TacomaNeighborhoodModel: React.FC<TacomaNeighborhoodModelProps> = ({
  categories,
  onSelectCategory,
  selectedCategory,
  lightingMode
}) => {
  const gltf = useGLTF('/models/tacoma/Tacoma_Neighborhood.glb');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

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
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        if (lightingMode === 'wireframe') {
          child.material = new THREE.MeshBasicMaterial({ 
            color: '#00ffff', 
            wireframe: true 
          });
        } else if (child.material) {
          // Enhance authentic SketchUp PBR textures & materials
          const materials = Array.isArray(child.material) ? child.material : [child.material];
          materials.forEach((mat) => {
            mat.side = THREE.DoubleSide;
            mat.needsUpdate = true;

            if (mat instanceof THREE.MeshStandardMaterial) {
              mat.roughness = THREE.MathUtils.clamp(mat.roughness || 0.45, 0.25, 0.7);
              mat.metalness = THREE.MathUtils.clamp(mat.metalness || 0.05, 0.02, 0.3);
              mat.envMapIntensity = 1.2;

              if (lightingMode === 'sunset') {
                mat.color.multiply(new THREE.Color('#fed7aa'));
              } else if (lightingMode === 'night') {
                mat.color.multiply(new THREE.Color('#94a3b8'));
              }
            }
          });
        }
      }
    });

    return clone;
  }, [gltf, lightingMode]);

  return (
    <group position={[0, 0, 0]}>
      {/* Real SketchUp Neighborhood Site Model */}
      <primitive object={sceneClone} />

      {/* 5 Interactive Building Keys (Direct Building Mesh Selection & Rooftop Badges) */}
      {BUILDING_ZONES.map((zone) => {
        const category = categories.find(c => c.id === zone.categoryId) || categories[0];
        const isHovered = hoveredId === zone.categoryId;
        const isSelected = selectedCategory?.id === zone.categoryId;
        const Icon = zone.icon;

        return (
          <group key={zone.categoryId}>
            {/* 1. Direct Building Hitbox: Clicking anywhere on the building activates it! */}
            <mesh
              position={zone.center}
              onClick={(e) => {
                e.stopPropagation();
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
                opacity={isSelected ? 0.35 : isHovered ? 0.25 : 0.0}
                emissive={zone.color}
                emissiveIntensity={isSelected ? 1.5 : isHovered ? 0.9 : 0.0}
                roughness={0.2}
                depthWrite={false}
              />
            </mesh>

            {/* 2. Sleek Rooftop Architectural Beacon (Directly Flush On Building Roof) */}
            <group position={zone.roof}>
              {/* Subtle Rooftop Glowing Base Halo */}
              <mesh 
                position={[0, 0.08, 0]}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectCategory(category);
                  sound.playDrawerOpen();
                }}
                onPointerOver={(e) => {
                  e.stopPropagation();
                  setHoveredId(zone.categoryId);
                  document.body.style.cursor = 'pointer';
                }}
              >
                <cylinderGeometry args={[0.75, 0.75, 0.06, 32]} />
                <meshStandardMaterial
                  color={zone.color}
                  emissive={zone.color}
                  emissiveIntensity={isHovered ? 3.0 : isSelected ? 3.5 : 1.4}
                  transparent
                  opacity={0.85}
                />
              </mesh>

              {/* Minimalist Floating Glass Pill Badge (Anchored on Roof) */}
              <Html position={[0, 0.5, 0]} center distanceFactor={16}>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
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
                    isHovered || isSelected ? 'scale-110 -translate-y-1' : 'scale-95 hover:scale-105'
                  }`}
                >
                  <div
                    className={`px-3.5 py-1.5 rounded-full backdrop-blur-xl border shadow-xl flex items-center gap-2.5 whitespace-nowrap transition-all duration-300 ${
                      isSelected
                        ? 'bg-blue-600 text-white border-white ring-4 ring-blue-400/50 shadow-blue-500/40'
                        : isHovered
                        ? 'bg-slate-900/95 text-white border-sky-400 ring-2 ring-sky-400/40 shadow-sky-500/20'
                        : 'bg-white/95 text-slate-900 border-slate-200/90 shadow-slate-900/10'
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                        isSelected
                          ? 'bg-white text-blue-600'
                          : isHovered
                          ? 'bg-sky-500 text-white'
                          : 'bg-slate-900 text-white'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>

                    <div className="text-right">
                      <div className="flex items-center gap-1.5">
                        <span className={`text-[8.5px] font-mono font-bold px-1.5 py-0.2 rounded ${
                          isSelected ? 'bg-blue-800 text-white' : 'bg-slate-100 text-slate-700'
                        }`}>
                          {zone.badge}
                        </span>
                        <span className={`text-[9.5px] font-bold ${
                          isSelected ? 'text-blue-100' : isHovered ? 'text-sky-300' : 'text-slate-500'
                        }`}>
                          {category.projects.length} پروژه
                        </span>
                      </div>
                      <div className="text-[11.5px] font-black tracking-tight leading-none mt-0.5">
                        {zone.label}
                      </div>
                    </div>

                    <div className={`p-1 rounded-full ${
                      isSelected ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-400'
                    }`}>
                      <ArrowUpRight className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              </Html>
            </group>
          </group>
        );
      })}
    </group>
  );
};

useGLTF.preload('/models/tacoma/Tacoma_Neighborhood.glb');
