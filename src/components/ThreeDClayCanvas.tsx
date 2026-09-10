import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  OrbitControls, 
  Text, 
  ContactShadows, 
  useGLTF, 
  Edges,
  Float,
  MeshReflectorMaterial
} from '@react-three/drei';
import * as THREE from 'three';
import { CategoryBuilding } from '../types';
import { sound } from '../utils/audio';
import { 
  Sun, 
  Sunset, 
  Moon, 
  Code2, 
  RotateCw, 
  ZoomIn, 
  MousePointerClick,
  Sparkles,
  Layers,
  Building
} from 'lucide-react';
import { TacomaNeighborhoodModel } from './TacomaNeighborhoodModel';

interface ThreeDClayCanvasProps {
  categories: CategoryBuilding[];
  onSelectCategory: (category: CategoryBuilding) => void;
  selectedCategory: CategoryBuilding | null;
}

// Architectural Villa Model (Minimal Concrete Cantilever with Pool & Warm Interior)
const ArchitecturalVilla: React.FC<{ isHovered: boolean; isSelected: boolean; isWireframe: boolean; isNight: boolean }> = ({
  isHovered,
  isSelected,
  isWireframe,
  isNight
}) => {
  const primaryColor = isSelected ? '#2563eb' : isHovered ? '#ffffff' : '#f4f5f8';
  const glassColor = isNight ? '#fbbf24' : '#60a5fa';

  return (
    <group position={[0, 0, 0]}>
      {/* Ground Podium & Terrace */}
      <mesh position={[0, 0.15, 0]} castShadow receiveShadow>
        <boxGeometry args={[4.2, 0.3, 3.8]} />
        <meshStandardMaterial color="#e5e7eb" roughness={0.4} />
        {isWireframe && <Edges color="#00ffff" threshold={15} />}
      </mesh>

      {/* Infinity Pool */}
      <mesh position={[1.2, 0.22, 0.8]}>
        <boxGeometry args={[1.4, 0.1, 1.8]} />
        <meshStandardMaterial color="#38bdf8" roughness={0.1} metalness={0.8} />
      </mesh>

      {/* Main Ground Floor Volume */}
      <mesh position={[-0.6, 0.8, -0.4]} castShadow receiveShadow>
        <boxGeometry args={[2.4, 1.0, 2.2]} />
        <meshStandardMaterial color={primaryColor} roughness={0.3} />
        {isWireframe && <Edges color="#00ffff" threshold={15} />}
      </mesh>

      {/* Upper Floor Cantilever Box */}
      <mesh position={[-0.2, 1.8, 0.2]} castShadow receiveShadow>
        <boxGeometry args={[3.2, 1.0, 2.4]} />
        <meshStandardMaterial color={primaryColor} roughness={0.25} />
        {isWireframe && <Edges color="#00ffff" threshold={15} />}
      </mesh>

      {/* Panoramic Glazing Slit with Interior Glow */}
      <mesh position={[-0.2, 1.8, 1.42]}>
        <planeGeometry args={[2.8, 0.7]} />
        <meshStandardMaterial 
          color={glassColor} 
          emissive={isNight ? '#f59e0b' : '#000000'} 
          emissiveIntensity={isNight ? 1.5 : 0} 
          roughness={0.1} 
          metalness={0.5} 
        />
      </mesh>

      {/* Rooftop Pergola Slats */}
      {[-0.8, -0.4, 0, 0.4, 0.8].map((xOffset, idx) => (
        <mesh key={idx} position={[xOffset, 2.4, 0.2]} castShadow>
          <boxGeometry args={[0.08, 0.08, 2.4]} />
          <meshStandardMaterial color="#475569" roughness={0.5} />
        </mesh>
      ))}
    </group>
  );
};

// Architectural High-Rise Tower with Louvers & Skybridge
const ArchitecturalTower: React.FC<{ isHovered: boolean; isSelected: boolean; isWireframe: boolean; isNight: boolean }> = ({
  isHovered,
  isSelected,
  isWireframe,
  isNight
}) => {
  const primaryColor = isSelected ? '#6366f1' : isHovered ? '#ffffff' : '#f0f2f6';
  const glassColor = isNight ? '#fbbf24' : '#93c5fd';

  return (
    <group position={[0, 0, 0]}>
      {/* 4-Story Podium Base */}
      <mesh position={[0, 0.8, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.6, 1.6, 3.4]} />
        <meshStandardMaterial color="#e2e8f0" roughness={0.3} />
        {isWireframe && <Edges color="#00ffff" threshold={15} />}
      </mesh>

      {/* Main High-Rise Core */}
      <mesh position={[-0.5, 3.4, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.0, 4.0, 2.4]} />
        <meshStandardMaterial color={primaryColor} roughness={0.2} />
        {isWireframe && <Edges color="#00ffff" threshold={15} />}
      </mesh>

      {/* Secondary Slender Tower */}
      <mesh position={[0.9, 2.8, -0.2]} castShadow receiveShadow>
        <boxGeometry args={[1.4, 3.2, 1.8]} />
        <meshStandardMaterial color={primaryColor} roughness={0.2} />
        {isWireframe && <Edges color="#00ffff" threshold={15} />}
      </mesh>

      {/* Connecting Skybridge */}
      <mesh position={[0.2, 3.5, -0.1]} castShadow>
        <boxGeometry args={[0.8, 0.4, 1.2]} />
        <meshStandardMaterial 
          color="#38bdf8" 
          emissive={isNight ? '#60a5fa' : '#000000'} 
          emissiveIntensity={isNight ? 1.2 : 0} 
          roughness={0.1} 
        />
      </mesh>

      {/* Floor Slab Slices */}
      {[1.8, 2.4, 3.0, 3.6, 4.2, 4.8].map((h, i) => (
        <mesh key={i} position={[-0.5, h, 1.22]}>
          <planeGeometry args={[1.8, 0.35]} />
          <meshStandardMaterial 
            color={glassColor} 
            emissive={isNight ? '#f59e0b' : '#000000'} 
            emissiveIntensity={isNight ? 1.8 : 0} 
            roughness={0.1} 
          />
        </mesh>
      ))}

      {/* Crown Roof Spire */}
      <mesh position={[-0.5, 5.7, 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.15, 1.2, 8]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.8} />
      </mesh>
    </group>
  );
};

// Coastal Masterplan & Bridge Structure (Matching Soheil Masti's Urban Design project)
const ArchitecturalBridgeMasterplan: React.FC<{ isHovered: boolean; isSelected: boolean; isWireframe: boolean; isNight: boolean }> = ({
  isHovered,
  isSelected,
  isWireframe,
  isNight
}) => {
  const primaryColor = isSelected ? '#0ea5e9' : isHovered ? '#ffffff' : '#f1f5f9';

  return (
    <group position={[0, 0, 0]}>
      {/* Island Ground Terraces */}
      <mesh position={[-1.8, 0.2, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[1.8, 2.2, 0.4, 16]} />
        <meshStandardMaterial color="#e2e8f0" roughness={0.5} />
        {isWireframe && <Edges color="#00ffff" threshold={15} />}
      </mesh>

      <mesh position={[1.8, 0.2, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[1.8, 2.2, 0.4, 16]} />
        <meshStandardMaterial color="#e2e8f0" roughness={0.5} />
        {isWireframe && <Edges color="#00ffff" threshold={15} />}
      </mesh>

      {/* Curved Cable Bridge Deck */}
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[4.2, 0.15, 0.9]} />
        <meshStandardMaterial color={primaryColor} roughness={0.3} />
        {isWireframe && <Edges color="#00ffff" threshold={15} />}
      </mesh>

      {/* Bridge Suspension Pylons */}
      <mesh position={[0, 1.6, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.18, 2.4, 8]} />
        <meshStandardMaterial color="#334155" metalness={0.7} />
      </mesh>

      {/* Island Waterfront Mini-Towers */}
      <mesh position={[-1.8, 1.4, -0.4]} castShadow receiveShadow>
        <boxGeometry args={[1.2, 2.0, 1.2]} />
        <meshStandardMaterial color={primaryColor} roughness={0.3} />
        {isWireframe && <Edges color="#00ffff" threshold={15} />}
      </mesh>

      <mesh position={[1.8, 1.6, 0.4]} castShadow receiveShadow>
        <boxGeometry args={[1.1, 2.4, 1.1]} />
        <meshStandardMaterial color={primaryColor} roughness={0.3} />
        {isWireframe && <Edges color="#00ffff" threshold={15} />}
      </mesh>
    </group>
  );
};

// Origami Pavilion (Cultural / Competition Landmark)
const ArchitecturalPavilion: React.FC<{ isHovered: boolean; isSelected: boolean; isWireframe: boolean; isNight: boolean }> = ({
  isHovered,
  isSelected,
  isWireframe,
  isNight
}) => {
  const primaryColor = isSelected ? '#f59e0b' : isHovered ? '#ffffff' : '#f8fafc';

  return (
    <group position={[0, 0, 0]}>
      {/* Stepped Plaza Base */}
      <mesh position={[0, 0.1, 0]} receiveShadow>
        <cylinderGeometry args={[2.0, 2.2, 0.2, 6]} />
        <meshStandardMaterial color="#e5e7eb" roughness={0.4} />
      </mesh>

      {/* Faceted Folded Shell */}
      <mesh position={[0, 0.9, 0]} castShadow receiveShadow>
        <coneGeometry args={[1.8, 1.6, 6]} />
        <meshStandardMaterial 
          color={primaryColor} 
          roughness={0.25} 
          emissive={isNight ? '#f59e0b' : '#000000'}
          emissiveIntensity={isNight ? 0.4 : 0}
        />
        {isWireframe && <Edges color="#00ffff" threshold={15} />}
      </mesh>

      {/* Internal Light Spire */}
      <mesh position={[0, 1.2, 0]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={1.5} />
      </mesh>
    </group>
  );
};

// Retail Concept Store Box
const ArchitecturalRetail: React.FC<{ isHovered: boolean; isSelected: boolean; isWireframe: boolean; isNight: boolean }> = ({
  isHovered,
  isSelected,
  isWireframe,
  isNight
}) => {
  const primaryColor = isSelected ? '#ec4899' : isHovered ? '#ffffff' : '#f3f4f6';

  return (
    <group position={[0, 0, 0]}>
      <mesh position={[0, 0.7, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.4, 1.4, 2.0]} />
        <meshStandardMaterial color={primaryColor} roughness={0.3} />
        {isWireframe && <Edges color="#00ffff" threshold={15} />}
      </mesh>
      {/* Glazed Front Display */}
      <mesh position={[0, 0.7, 1.02]}>
        <planeGeometry args={[2.0, 1.0]} />
        <meshStandardMaterial 
          color="#f43f5e" 
          emissive={isNight ? '#f43f5e' : '#000000'} 
          emissiveIntensity={isNight ? 1.0 : 0} 
          roughness={0.1} 
        />
      </mesh>
    </group>
  );
};

// Master 3D Building Node in Canvas
const Building3DNode: React.FC<{
  category: CategoryBuilding;
  isSelected: boolean;
  onSelect: () => void;
  lightingMode: string;
}> = ({ category, isSelected, onSelect, lightingMode }) => {
  const [hovered, setHovered] = useState(false);
  const groupRef = useRef<THREE.Group>(null);

  const position = category.position3D || [0, 1, 0];
  const isWireframe = lightingMode === 'wireframe';
  const isNight = lightingMode === 'night';

  useFrame((state, delta) => {
    if (groupRef.current) {
      const targetY = hovered ? position[1] + 0.35 : position[1];
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, delta * 8);
    }
  });

  const renderArchitecturalGeometry = () => {
    switch (category.buildingType) {
      case 'villa':
        return <ArchitecturalVilla isHovered={hovered} isSelected={isSelected} isWireframe={isWireframe} isNight={isNight} />;
      case 'tower':
      case 'commercial':
        return <ArchitecturalTower isHovered={hovered} isSelected={isSelected} isWireframe={isWireframe} isNight={isNight} />;
      case 'urban-bridge':
        return <ArchitecturalBridgeMasterplan isHovered={hovered} isSelected={isSelected} isWireframe={isWireframe} isNight={isNight} />;
      case 'pavilion':
        return <ArchitecturalPavilion isHovered={hovered} isSelected={isSelected} isWireframe={isWireframe} isNight={isNight} />;
      case 'retail':
      default:
        return <ArchitecturalRetail isHovered={hovered} isSelected={isSelected} isWireframe={isWireframe} isNight={isNight} />;
    }
  };

  return (
    <group position={[position[0], 0, position[2]]}>
      <group
        ref={groupRef}
        position={[0, position[1], 0]}
        onClick={(e) => {
          e.stopPropagation();
          sound.playClick();
          onSelect();
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = 'auto';
        }}
      >
        {renderArchitecturalGeometry()}

        {/* Floating Typography Tag */}
        {(hovered || isSelected) && (
          <group position={[0, 3.2, 0]}>
            <Text
              fontSize={0.34}
              color={isNight || isWireframe ? '#38bdf8' : '#0f172a'}
              anchorX="center"
              anchorY="middle"
              outlineWidth={0.03}
              outlineColor={isNight || isWireframe ? '#000000' : '#ffffff'}
            >
              {category.categoryNumber} // {category.title}
            </Text>
            <Text
              position={[0, -0.4, 0]}
              fontSize={0.22}
              color={isNight || isWireframe ? '#94a3b8' : '#64748b'}
              anchorX="center"
              anchorY="middle"
            >
              {category.projects.length} PROJECTS // CLICK TO EXPLORE
            </Text>
          </group>
        )}
      </group>
    </group>
  );
};

// Ground, Water Basin and Grid
const ArchitecturalGround: React.FC<{ lightingMode: string }> = ({ lightingMode }) => {
  const isWireframe = lightingMode === 'wireframe';
  const isNight = lightingMode === 'night';
  const isSunset = lightingMode === 'sunset';

  return (
    <group position={[0, 0, 0]}>
      {/* Master Terrain Base */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow>
        <planeGeometry args={[34, 34]} />
        <meshStandardMaterial 
          color={isWireframe ? '#050811' : isNight ? '#0b0f19' : isSunset ? '#e5dfd7' : '#f0f2f6'} 
          roughness={0.6} 
        />
      </mesh>

      {/* Reflective Water Canal Basin */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, -0.5]} receiveShadow>
        <planeGeometry args={[26, 4.5]} />
        <meshStandardMaterial 
          color={isNight ? '#0369a1' : isSunset ? '#38bdf8' : '#bae6fd'} 
          roughness={0.05} 
          metalness={0.8} 
        />
      </mesh>

      {/* CAD Grid Helper */}
      <gridHelper 
        args={[34, 34, isWireframe ? '#00ffff' : '#cbd5e1', isWireframe ? '#083344' : '#e2e8f0']} 
        position={[0, 0.02, 0]} 
      />
    </group>
  );
};

export const ThreeDClayCanvas: React.FC<ThreeDClayCanvasProps> = ({
  categories,
  onSelectCategory,
  selectedCategory
}) => {
  const [lightingMode, setLightingMode] = useState<'day' | 'sunset' | 'night' | 'wireframe'>('day');

  return (
    <div className="relative w-full h-screen bg-[#eceef2] overflow-hidden">
      {/* 3D WebGL Canvas */}
      <Canvas
        shadows
        camera={{ position: [15, 14, 18], fov: 36 }}
        className="w-full h-full"
      >
        <Suspense fallback={null}>
          {/* Lighting based on mood */}
          {lightingMode === 'day' && (
            <>
              <ambientLight intensity={0.9} />
              <directionalLight
                position={[18, 28, 16]}
                intensity={1.5}
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
                shadow-bias={-0.0001}
              />
              <directionalLight position={[-15, 12, -10]} intensity={0.5} />
            </>
          )}

          {lightingMode === 'sunset' && (
            <>
              <ambientLight intensity={0.6} color="#fed7aa" />
              <directionalLight
                position={[24, 12, 10]}
                intensity={2.2}
                color="#f97316"
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
              />
              <directionalLight position={[-15, 10, -10]} intensity={0.3} color="#60a5fa" />
            </>
          )}

          {lightingMode === 'night' && (
            <>
              <ambientLight intensity={0.25} color="#1e1b4b" />
              <directionalLight position={[10, 20, 10]} intensity={0.6} color="#38bdf8" />
              <pointLight position={[0, 6, 0]} intensity={2.0} color="#fbbf24" distance={20} />
            </>
          )}

          {lightingMode === 'wireframe' && (
            <>
              <ambientLight intensity={0.4} color="#00ffff" />
              <directionalLight position={[15, 20, 15]} intensity={0.8} />
            </>
          )}

          {/* Real SketchUp Tacoma Site Model with 5 Interactive Clickable Hotspots */}
          <TacomaNeighborhoodModel
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={onSelectCategory}
            lightingMode={lightingMode}
          />

          {/* Soft Shadows */}
          <ContactShadows
            position={[0, 0, 0]}
            opacity={lightingMode === 'night' ? 0.8 : 0.45}
            scale={28}
            blur={2.2}
            far={12}
          />

          {/* Camera Orbit */}
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            maxPolarAngle={Math.PI / 2.15}
            minDistance={8}
            maxDistance={40}
            dampingFactor={0.06}
          />
        </Suspense>
      </Canvas>

      {/* Lighting Mood Switcher Toolbar (Top-Right Floating) */}
      <div className="absolute top-20 right-6 z-20 glass-panel p-1.5 rounded-2xl shadow-clay-md flex items-center gap-1 border border-white/80">
        <button
          onClick={() => { setLightingMode('day'); sound.playSwitch(); }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            lightingMode === 'day' ? 'bg-black text-white shadow-xs' : 'text-gray-600 hover:text-black'
          }`}
          title="نور روز سفید (White Clay Daylight)"
        >
          <Sun className="w-3.5 h-3.5" />
          <span>روز ماکتی</span>
        </button>

        <button
          onClick={() => { setLightingMode('sunset'); sound.playSwitch(); }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            lightingMode === 'sunset' ? 'bg-orange-600 text-white shadow-xs' : 'text-gray-600 hover:text-black'
          }`}
          title="نور غروب خورشید (Golden Hour Sunset)"
        >
          <Sunset className="w-3.5 h-3.5" />
          <span>غروب طلایی</span>
        </button>

        <button
          onClick={() => { setLightingMode('night'); sound.playSwitch(); }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            lightingMode === 'night' ? 'bg-indigo-950 text-white shadow-xs' : 'text-gray-600 hover:text-black'
          }`}
          title="حالت شب معماری (Night BIM Illumination)"
        >
          <Moon className="w-3.5 h-3.5" />
          <span>شب معماری</span>
        </button>

        <button
          onClick={() => { setLightingMode('wireframe'); sound.playSwitch(); }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            lightingMode === 'wireframe' ? 'bg-cyan-900 text-cyan-200 shadow-xs' : 'text-gray-600 hover:text-black'
          }`}
          title="حالت وایرفریم CAD و دیاگرام BIM"
        >
          <Code2 className="w-3.5 h-3.5" />
          <span>CAD Wireframe</span>
        </button>
      </div>

      {/* Navigation Instruction Bar (Bottom) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 glass-panel px-5 py-2.5 rounded-2xl shadow-clay-md flex items-center gap-4 text-xs font-medium text-gray-800 border border-white/90">
        <span className="flex items-center gap-1.5">
          <RotateCw className="w-4 h-4 text-blue-600 animate-spin-slow" />
          چرخش زاویه دید: کلیک چپ و حرکت ماوس
        </span>
        <span className="w-1 h-3.5 bg-gray-300 rounded-full" />
        <span className="flex items-center gap-1.5">
          <ZoomIn className="w-4 h-4 text-emerald-600" />
          زوم: اسکرول
        </span>
        <span className="w-1 h-3.5 bg-gray-300 rounded-full" />
        <span className="flex items-center gap-1.5">
          <MousePointerClick className="w-4 h-4 text-indigo-600" />
          کلیک روی هر ساختمان برای باز شدن پروژه‌ها
        </span>
      </div>
    </div>
  );
};
