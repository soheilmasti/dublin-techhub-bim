import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  OrbitControls, 
  ContactShadows, 
  Environment,
  Sky
} from '@react-three/drei';
import * as THREE from 'three';
import type { OrbitControls as OrbitControlsType } from 'three-stdlib';
import { CategoryBuilding } from '../types';
import { sound } from '../utils/audio';
import { 
  Sun, 
  Sunset, 
  Moon, 
  Code2, 
  RotateCw, 
  MousePointerClick,
  Camera,
  Play,
  Pause
} from 'lucide-react';
import { TacomaNeighborhoodModel } from './TacomaNeighborhoodModel';

interface ThreeDClayCanvasProps {
  categories: CategoryBuilding[];
  onSelectCategory: (category: CategoryBuilding) => void;
  selectedCategory: CategoryBuilding | null;
}

// 5 Zone Centroid & Camera Targets for Smooth Focus
const ZONE_CAMERA_TARGETS: Record<string, { target: [number, number, number]; position: [number, number, number] }> = {
  'dublin-techhub': {
    target: [6.57, 5.2, 6.23],
    position: [14.0, 10.5, 14.0]
  },
  'urban-design': {
    target: [-6.95, 4.0, -6.17],
    position: [-1.5, 8.5, 0.5]
  },
  'commercial-retail': {
    target: [-0.87, 3.2, -1.03],
    position: [6.5, 8.0, 6.5]
  },
  'residential-villas': {
    target: [-6.19, 3.0, 11.89],
    position: [-1.0, 7.5, 18.5]
  },
  'cultural-public': {
    target: [7.31, 2.2, 16.02],
    position: [13.5, 6.5, 22.0]
  }
};

const OVERVIEW_CAMERA = {
  target: [0, 2.0, 0] as [number, number, number],
  position: [15, 14, 18] as [number, number, number]
};

// Smooth Camera Flight Controller (Free Orbit by default, flies ONLY on click, yields immediately on user mouse interaction)
const CameraController: React.FC<{
  targetFocus: { target: [number, number, number]; position: [number, number, number] } | null;
  autoRotate: boolean;
}> = ({ targetFocus, autoRotate }) => {
  const controlsRef = useRef<OrbitControlsType>(null);
  const isFlying = useRef<boolean>(false);
  const targetVec = useRef(new THREE.Vector3());
  const posVec = useRef(new THREE.Vector3());

  // Trigger flight ONLY when targetFocus is explicitly updated by a click
  useEffect(() => {
    if (targetFocus) {
      targetVec.current.set(...targetFocus.target);
      posVec.current.set(...targetFocus.position);
      isFlying.current = true;
    }
  }, [targetFocus]);

  // Immediately yield camera control to user if they touch/drag/scroll with mouse
  useEffect(() => {
    const controls = controlsRef.current;
    if (!controls) return;

    const handleUserStart = () => {
      // User began interacting with mouse -> stop any programmatic flight immediately!
      isFlying.current = false;
    };

    controls.addEventListener('start', handleUserStart);
    return () => {
      controls.removeEventListener('start', handleUserStart);
    };
  }, []);

  useFrame(({ camera }, delta) => {
    const controls = controlsRef.current;
    if (!controls) return;

    // Only interpolate when actively flying from an explicit click
    if (isFlying.current) {
      controls.target.lerp(targetVec.current, delta * 3.5);
      camera.position.lerp(posVec.current, delta * 3.0);
      controls.update();

      // Once destination is reached, release camera control for complete freedom
      if (
        controls.target.distanceTo(targetVec.current) < 0.08 &&
        camera.position.distanceTo(posVec.current) < 0.12
      ) {
        isFlying.current = false;
      }
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={true}
      enableZoom={true}
      enableRotate={true}
      enableDamping={true}
      dampingFactor={0.06}
      screenSpacePanning={true}
      autoRotate={autoRotate}
      autoRotateSpeed={0.8}
      maxPolarAngle={Math.PI / 2.03}
      minDistance={3}
      maxDistance={70}
    />
  );
};

// Museum-Grade Architectural Pedestal Base
const ArchitecturalPlinth: React.FC<{ lightingMode: string }> = ({ lightingMode }) => {
  const isWireframe = lightingMode === 'wireframe';
  const isNight = lightingMode === 'night';
  const isSunset = lightingMode === 'sunset';

  const baseColor = isWireframe ? '#040814' : isNight ? '#090d16' : isSunset ? '#262626' : '#1e232d';

  return (
    <group position={[0, -0.15, 0]}>
      {/* Museum Display Beveled Plinth */}
      <mesh receiveShadow position={[0, -0.2, 0]}>
        <cylinderGeometry args={[22, 22.5, 0.4, 64]} />
        <meshStandardMaterial color={baseColor} roughness={0.4} metalness={0.2} />
      </mesh>

      {/* Outer Polished Metallic Bevel Ring */}
      <mesh position={[0, 0.02, 0]}>
        <ringGeometry args={[21.8, 22.0, 64]} />
        <meshStandardMaterial color={isWireframe ? '#00ffff' : '#64748b'} metalness={0.8} roughness={0.2} side={THREE.DoubleSide} />
      </mesh>

      {/* Subtle CAD Grid on Pedestal Top */}
      <gridHelper 
        args={[36, 36, isWireframe ? '#00ffff' : '#334155', isWireframe ? '#083344' : '#1e293b']} 
        position={[0, 0.025, 0]} 
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
  const [autoRotate, setAutoRotate] = useState<boolean>(false);
  const [cameraFocus, setCameraFocus] = useState<{ target: [number, number, number]; position: [number, number, number] } | null>(null);

  // Sync camera focus when selectedCategory changes
  useEffect(() => {
    if (selectedCategory && ZONE_CAMERA_TARGETS[selectedCategory.id]) {
      setCameraFocus(ZONE_CAMERA_TARGETS[selectedCategory.id]);
    }
  }, [selectedCategory]);

  const handleResetCamera = () => {
    sound.playClick();
    setCameraFocus({ ...OVERVIEW_CAMERA });
  };

  const handleFocusZone = (cat: CategoryBuilding) => {
    sound.playClick();
    onSelectCategory(cat);
    if (ZONE_CAMERA_TARGETS[cat.id]) {
      setCameraFocus(ZONE_CAMERA_TARGETS[cat.id]);
    }
  };

  return (
    <div className="relative w-full h-screen bg-[#0f141c] overflow-hidden select-none">
      {/* 3D WebGL Canvas with PBR Tone Mapping */}
      <Canvas
        shadows
        camera={{ position: [15, 14, 18], fov: 38 }}
        gl={{ 
          antialias: true, 
          toneMapping: THREE.ACESFilmicToneMapping, 
          toneMappingExposure: lightingMode === 'sunset' ? 1.25 : lightingMode === 'night' ? 0.95 : 1.18 
        }}
        className="w-full h-full"
      >
        <Suspense fallback={null}>
          {/* Natural Atmospheric Sky Horizon */}
          {lightingMode === 'day' && (
            <Sky 
              distance={450000} 
              sunPosition={[60, 45, 60]} 
              inclination={0.6} 
              azimuth={0.25} 
              turbidity={4} 
              rayleigh={1.2} 
            />
          )}

          {lightingMode === 'sunset' && (
            <Sky 
              distance={450000} 
              sunPosition={[80, 8, 40]} 
              inclination={0.1} 
              azimuth={0.15} 
              turbidity={10} 
              rayleigh={3.5} 
            />
          )}

          {/* Realistic PBR Environment Reflections */}
          <Environment preset={lightingMode === 'sunset' ? 'sunset' : lightingMode === 'night' ? 'night' : 'city'} />

          {/* Hemisphere Ambient Sky Bounce */}
          <hemisphereLight 
            intensity={lightingMode === 'night' ? 0.35 : lightingMode === 'sunset' ? 1.0 : 1.3} 
            color={lightingMode === 'sunset' ? '#fed7aa' : '#ffffff'} 
            groundColor={lightingMode === 'night' ? '#090d16' : '#64748b'} 
          />

          {/* Lighting based on mood */}
          {lightingMode === 'day' && (
            <>
              <ambientLight intensity={1.1} />
              <directionalLight
                position={[24, 38, 20]}
                intensity={2.6}
                color="#fffcf7"
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
                shadow-camera-left={-22}
                shadow-camera-right={22}
                shadow-camera-top={22}
                shadow-camera-bottom={-22}
                shadow-camera-far={80}
                shadow-bias={-0.00015}
              />
              <directionalLight position={[-20, 18, -16]} intensity={1.0} color="#e0f2fe" />
              <directionalLight position={[0, -10, 0]} intensity={0.4} color="#f8fafc" />
            </>
          )}

          {lightingMode === 'sunset' && (
            <>
              <ambientLight intensity={0.9} color="#fed7aa" />
              <directionalLight
                position={[30, 14, 12]}
                intensity={3.4}
                color="#f97316"
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
                shadow-bias={-0.00015}
              />
              <directionalLight position={[-18, 12, -12]} intensity={1.0} color="#60a5fa" />
            </>
          )}

          {lightingMode === 'night' && (
            <>
              {/* Rich Urban Night Sky & Moon Bounce */}
              <ambientLight intensity={0.75} color="#1e293b" />
              <directionalLight position={[18, 30, 18]} intensity={1.8} color="#60a5fa" />
              <directionalLight position={[-16, 20, -14]} intensity={1.0} color="#38bdf8" />

              {/* 1. Dublin Tech Hub 7-Story Tower Facade & Roof Uplights */}
              <pointLight position={[6.57, 9.5, 6.23]} intensity={7.5} color="#fbbf24" distance={38} />
              <pointLight position={[6.57, 2.5, 6.23]} intensity={5.5} color="#38bdf8" distance={25} />

              {/* 2. Commercial Mall Entrance & Cafe Terrace Lighting */}
              <pointLight position={[-0.87, 4.8, -1.03]} intensity={6.5} color="#f59e0b" distance={32} />

              {/* 3. Urban Port & Promenade Waterfront Lights */}
              <pointLight position={[-6.95, 4.5, -6.17]} intensity={5.5} color="#0284c7" distance={32} />

              {/* 4. Residential Villas Pathway & Garden Illumination */}
              <pointLight position={[-6.19, 3.8, 11.89]} intensity={4.8} color="#10b981" distance={28} />

              {/* 5. Cultural Pavilion Landmark Jewel Glow */}
              <pointLight position={[7.31, 3.2, 16.02]} intensity={5.2} color="#c084fc" distance={28} />

              {/* Central Avenue Streetlight Core Glow */}
              <pointLight position={[3.2, 2.0, 3.0]} intensity={4.5} color="#fbbf24" distance={25} />
              <pointLight position={[0.5, 2.0, 0.5]} intensity={4.5} color="#fbbf24" distance={25} />
            </>
          )}

          {/* Museum Pedestal Display Base */}
          <ArchitecturalPlinth lightingMode={lightingMode} />

          {/* Real SketchUp Tacoma Site Model with 5 Interactive Clickable Hotspots & Authentic Textures */}
          <TacomaNeighborhoodModel
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={onSelectCategory}
            lightingMode={lightingMode}
          />

          {/* Soft Ground Contact Shadows */}
          <ContactShadows
            position={[0, 0.03, 0]}
            opacity={lightingMode === 'night' ? 0.85 : 0.65}
            scale={32}
            blur={2.0}
            far={14}
          />

          {/* Smooth Camera Flight & Orbit Controls */}
          <CameraController targetFocus={cameraFocus} autoRotate={autoRotate} />
        </Suspense>
      </Canvas>

      {/* TOP-LEFT: Camera Preset & View Control Toolbar */}
      <div className="absolute top-20 left-6 z-20 glass-panel p-1.5 rounded-2xl shadow-clay-md flex items-center gap-1.5 border border-white/80">
        <button
          onClick={handleResetCamera}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-gray-700 hover:text-black hover:bg-white/80 transition-all"
          title="بازگشت به زاویه دید کلی شهرک (Overview)"
        >
          <Camera className="w-3.5 h-3.5 text-blue-600" />
          <span>دید کلی</span>
        </button>

        <button
          onClick={() => {
            sound.playSwitch();
            setAutoRotate(!autoRotate);
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            autoRotate ? 'bg-blue-600 text-white shadow-xs' : 'text-gray-700 hover:text-black hover:bg-white/80'
          }`}
          title="چرخش سینمایی اتوماتیک دور شهرک"
        >
          {autoRotate ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          <span>{autoRotate ? 'توقف چرخش' : 'چرخش خودکار'}</span>
        </button>
      </div>

      {/* TOP-RIGHT: Lighting Mood Switcher Toolbar (Clean Architectural Modes - No Code/Wireframe) */}
      <div className="absolute top-20 right-6 z-20 glass-panel p-1.5 rounded-2xl shadow-clay-md flex items-center gap-1 border border-white/80">
        <button
          onClick={() => { setLightingMode('day'); sound.playSwitch(); }}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            lightingMode === 'day' ? 'bg-black text-white shadow-xs' : 'text-gray-600 hover:text-black'
          }`}
          title="رندر متریال و بافت‌های واقعی اسکچ‌آپ با نور طبیعی روز"
        >
          <Sun className="w-3.5 h-3.5" />
          <span>روز اسکچ‌آپ</span>
        </button>

        <button
          onClick={() => { setLightingMode('sunset'); sound.playSwitch(); }}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            lightingMode === 'sunset' ? 'bg-orange-600 text-white shadow-xs' : 'text-gray-600 hover:text-black'
          }`}
          title="نور غروب خورشید با سایه‌روشن‌های طلایی"
        >
          <Sunset className="w-3.5 h-3.5" />
          <span>غروب طلایی</span>
        </button>

        <button
          onClick={() => { setLightingMode('night'); sound.playSwitch(); }}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            lightingMode === 'night' ? 'bg-indigo-950 text-white shadow-xs' : 'text-gray-600 hover:text-black'
          }`}
          title="نورپردازی شبانه معماری با نورهای اختصاصی نما و چراغ‌های شهری"
        >
          <Moon className="w-3.5 h-3.5" />
          <span>شب معماری</span>
        </button>
      </div>

      {/* BOTTOM: Zone Quick-Jump Pills & Interactive HUD */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
        {/* 5 Building Quick Jump Bar */}
        <div className="glass-panel p-1.5 rounded-2xl shadow-clay-lg flex items-center gap-1 border border-white/90">
          {categories.map((cat, idx) => {
            const isSelected = selectedCategory?.id === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleFocusZone(cat)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 ${
                  isSelected 
                    ? 'bg-blue-600 text-white shadow-md scale-102' 
                    : 'text-slate-700 hover:text-black hover:bg-white/80'
                }`}
                title={`فوکوس دوربین و بررسی ${cat.title}`}
              >
                <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                  isSelected ? 'bg-blue-800 text-white' : 'bg-slate-200 text-slate-700'
                }`}>
                  0{idx + 1}
                </span>
                <span className="hidden md:inline">{cat.title}</span>
                <span className="text-[10px] opacity-75 font-normal">({cat.projects.length})</span>
              </button>
            );
          })}
        </div>

        {/* Minimal Navigation Hint */}
        <div className="text-[11px] font-medium text-slate-400 bg-slate-900/60 backdrop-blur-md px-3.5 py-1 rounded-full border border-white/10 flex items-center gap-3">
          <span className="flex items-center gap-1">
            <MousePointerClick className="w-3 h-3 text-sky-400" />
            کلیک روی هر ساختمان = پرواز دوربین و باز شدن پروژه‌ها
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <RotateCw className="w-3 h-3 text-emerald-400" />
            چرخش ۳۶۰ درجه: کلیک چپ و درگ ماوس
          </span>
        </div>
      </div>
    </div>
  );
};
