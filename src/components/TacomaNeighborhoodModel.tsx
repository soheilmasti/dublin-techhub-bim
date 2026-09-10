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

// 5 Interactive Hotspot Positions in Tacoma Neighborhood Model Space
const BUILDING_HOTSPOTS: {
  categoryId: string;
  position: [number, number, number];
  label: string;
  badge: string;
  color: string;
  icon: any;
}[] = [
  {
    categoryId: 'urban-design',
    position: [-8.5, 3.5, -6.5],
    label: 'طراحی شهری و بنادر',
    badge: 'ZONE 01',
    color: '#0284c7',
    icon: Compass
  },
  {
    categoryId: 'residential-villas',
    position: [7.2, 4.2, -4.5],
    label: 'مسکونی و ویلاهای لوکس',
    badge: 'ZONE 02',
    color: '#10b981',
    icon: Home
  },
  {
    categoryId: 'commercial-retail',
    position: [-4.2, 5.0, 5.2],
    label: 'مجتمع‌های تجاری و اداری',
    badge: 'ZONE 03',
    color: '#f59e0b',
    icon: Briefcase
  },
  {
    categoryId: 'cultural-public',
    position: [6.8, 3.8, 6.0],
    label: 'فرهنگی و مسابقات معماری',
    badge: 'ZONE 04',
    color: '#8b5cf6',
    icon: Building2
  },
  {
    categoryId: 'dublin-techhub',
    position: [0.0, 6.5, 0.0],
    label: '🇮🇪 برج ۷ طبقه دوبلین (BIM Audit)',
    badge: 'ZONE 05',
    color: '#059669',
    icon: Sparkles
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

    // Architectural Clay & Material Polish
    clone.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        if (lightingMode === 'wireframe') {
          child.material = new THREE.MeshBasicMaterial({ color: '#00ffff', wireframe: true });
        } else if (lightingMode === 'night') {
          child.material = new THREE.MeshStandardMaterial({
            color: '#1e293b',
            roughness: 0.4,
            metalness: 0.2,
          });
        } else if (lightingMode === 'sunset') {
          child.material = new THREE.MeshStandardMaterial({
            color: '#fed7aa',
            roughness: 0.35,
            metalness: 0.05,
          });
        } else {
          // Bright, pristine Architectural White Clay (Daylight)
          child.material = new THREE.MeshStandardMaterial({
            color: '#f8fafc',
            roughness: 0.28,
            metalness: 0.05,
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

      {/* 5 Interactive Clickable Building Hotspots */}
      {BUILDING_HOTSPOTS.map((hotspot) => {
        const category = categories.find(c => c.id === hotspot.categoryId) || categories[0];
        const isHovered = hoveredId === hotspot.categoryId;
        const isSelected = selectedCategory?.id === hotspot.categoryId;
        const Icon = hotspot.icon;

        return (
          <group 
            key={hotspot.categoryId} 
            position={hotspot.position}
            onPointerOver={(e) => { e.stopPropagation(); setHoveredId(hotspot.categoryId); sound.playClick(); }}
            onPointerOut={() => setHoveredId(null)}
            onClick={(e) => { e.stopPropagation(); onSelectCategory(category); sound.playDrawerOpen(); }}
          >
            {/* Pulsing Beacon Light Ring */}
            <mesh position={[0, 0, 0]}>
              <cylinderGeometry args={[0.9, 0.9, 0.08, 24]} />
              <meshStandardMaterial 
                color={hotspot.color} 
                emissive={hotspot.color} 
                emissiveIntensity={isHovered ? 2.5 : (isSelected ? 3.0 : 1.2)} 
                transparent 
                opacity={0.8} 
              />
            </mesh>

            {/* Glowing Vertical Light Pillar */}
            <mesh position={[0, 1.2, 0]}>
              <cylinderGeometry args={[0.04, 0.04, 2.4, 12]} />
              <meshStandardMaterial 
                color={hotspot.color} 
                emissive={hotspot.color} 
                emissiveIntensity={isHovered ? 3.0 : 1.5} 
              />
            </mesh>

            {/* Floating 3D Target Marker / Icon */}
            <Float speed={3} rotationIntensity={0.2} floatIntensity={0.6}>
              <mesh position={[0, 2.5, 0]} castShadow>
                <sphereGeometry args={[0.45, 24, 24]} />
                <meshStandardMaterial 
                  color={hotspot.color} 
                  emissive={hotspot.color} 
                  emissiveIntensity={isHovered ? 1.8 : 0.8}
                  roughness={0.2}
                  metalness={0.6}
                />
              </mesh>
            </Float>

            {/* Interactive HTML Card Tag */}
            <Html position={[0, 3.4, 0]} center distanceFactor={18}>
              <div 
                onClick={(e) => { e.stopPropagation(); onSelectCategory(category); sound.playDrawerOpen(); }}
                className={`transition-all duration-300 transform cursor-pointer ${
                  isHovered || isSelected ? 'scale-110 -translate-y-2' : 'scale-95'
                }`}
              >
                <div className={`px-4 py-2 rounded-2xl backdrop-blur-xl border shadow-2xl flex items-center gap-3 whitespace-nowrap ${
                  isSelected 
                    ? 'bg-blue-600 text-white border-white ring-4 ring-blue-400/50' 
                    : isHovered 
                    ? 'bg-slate-900/95 text-white border-sky-400 ring-2 ring-sky-400/30' 
                    : 'bg-white/95 text-gray-900 border-gray-200'
                }`}>
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${
                    isSelected ? 'bg-white text-blue-600' : 'bg-black text-white'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-800">
                        {hotspot.badge}
                      </span>
                      <span className="text-[10px] text-gray-500 font-bold">
                        {category.projects.length} پروژه
                      </span>
                    </div>
                    <div className="text-xs font-black tracking-tight mt-0.5">
                      {hotspot.label}
                    </div>
                  </div>
                  <div className="p-1 rounded-lg bg-gray-100/50 text-gray-400 hover:text-black">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
};

useGLTF.preload('/models/tacoma/Tacoma_Neighborhood.glb');
