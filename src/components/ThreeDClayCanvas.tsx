import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  OrbitControls, 
  ContactShadows, 
  Environment
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
  Pause,
  Zap
} from 'lucide-react';
import { TacomaNeighborhoodModel } from './TacomaNeighborhoodModel';
import { LanguageCode, TRANSLATIONS } from '../utils/i18n';

// Dynamic Tone Mapping Exposure without recreating WebGLRenderer
const SceneExposure: React.FC<{ mode: 'day' | 'sunset' | 'night' | 'wireframe' }> = ({ mode }) => {
  const { gl } = useThree();
  useEffect(() => {
    gl.toneMapping = THREE.ACESFilmicToneMapping;
    gl.toneMappingExposure = mode === 'sunset' ? 1.25 : mode === 'night' ? 1.15 : 1.18;
  }, [mode, gl]);
  return null;
};

interface ThreeDClayCanvasProps {
  categories: CategoryBuilding[];
  onSelectCategory: (category: CategoryBuilding) => void;
  selectedCategory: CategoryBuilding | null;
  currentLanguage?: LanguageCode;
  onExit3D?: () => void;
}

// 5 Zone Centroid & Camera Targets for Smooth Focus
const ZONE_CAMERA_TARGETS: Record<string, { target: [number, number, number]; position: [number, number, number] }> = {
  'urban-design': {
    target: [-6.95, 4.0, -6.17],
    position: [-1.5, 8.5, 0.5]
  },
  'residential-luxury': {
    target: [-6.19, 3.0, 11.89],
    position: [-1.0, 7.5, 18.5]
  },
  'commercial-complexes': {
    target: [6.57, 5.2, 6.23],
    position: [14.0, 10.5, 14.0]
  },
  'retail-stores': {
    target: [-0.87, 3.2, -1.03],
    position: [6.5, 8.0, 6.5]
  },
  'institutional-competitions': {
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

export const ThreeDClayCanvas: React.FC<ThreeDClayCanvasProps> = ({
  categories,
  onSelectCategory,
  selectedCategory,
  currentLanguage = 'en',
  onExit3D
}) => {
  const [lightingMode, setLightingMode] = useState<'day' | 'sunset' | 'night' | 'wireframe'>('day');
  const [autoRotate, setAutoRotate] = useState<boolean>(false);
  const [cameraFocus, setCameraFocus] = useState<{ target: [number, number, number]; position: [number, number, number] } | null>(null);

  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;

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
    <div className="relative w-full h-screen bg-[#0f141c] overflow-hidden select-none touch-none">
      {/* 3D WebGL Canvas with PBR Tone Mapping */}
      <Canvas
        shadows
        camera={{ position: [15, 14, 18], fov: 38 }}
        gl={{ 
          antialias: true,
          preserveDrawingBuffer: true,
          powerPreference: 'high-performance'
        }}
        className="w-full h-full"
      >
        <Suspense fallback={null}>
          <SceneExposure mode={lightingMode} />

          {/* Clean Studio Horizon Background - NO Artificial Sun Disc */}
          <color attach="background" args={[lightingMode === 'night' ? '#0f172a' : lightingMode === 'sunset' ? '#1c1520' : '#eaeff5']} />

          {/* Realistic PBR Environment Reflections (Fixed preset to avoid 404 HDR network suspend) */}
          <Environment preset="city" environmentIntensity={lightingMode === 'night' ? 0.4 : lightingMode === 'sunset' ? 0.85 : 1.1} />

          {/* Hemisphere Ambient Sky Bounce */}
          <hemisphereLight 
            intensity={lightingMode === 'night' ? 0.95 : lightingMode === 'sunset' ? 1.0 : 1.3} 
            color={lightingMode === 'sunset' ? '#fed7aa' : lightingMode === 'night' ? '#bae6fd' : '#ffffff'} 
            groundColor={lightingMode === 'night' ? '#1e293b' : '#64748b'} 
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
              {/* Rich Urban Architectural Night: Clear Moon Bounce & Soft Blue Sky Fill */}
              <ambientLight intensity={1.4} color="#93c5fd" />
              <directionalLight 
                position={[24, 38, 20]} 
                intensity={2.8} 
                color="#e0f2fe" 
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
              <directionalLight position={[-20, 20, -16]} intensity={1.6} color="#7dd3fc" />
              <directionalLight position={[0, -10, 0]} intensity={0.6} color="#334155" />

              {/* 5 Distinct Architectural Accent Warm Light Sources (Zero shadow overhead) */}
              {/* 1. Dublin Tech Hub 7-Story Tower Facade */}
              <pointLight position={[6.57, 8.0, 6.23]} intensity={8} color="#fbbf24" distance={35} decay={2} />

              {/* 2. Commercial Mall & Terraces */}
              <pointLight position={[-0.87, 4.5, -1.03]} intensity={7} color="#fbbf24" distance={30} decay={2} />

              {/* 3. Urban Port & Promenade Waterfront */}
              <pointLight position={[-6.95, 4.5, -6.17]} intensity={7} color="#38bdf8" distance={30} decay={2} />

              {/* 4. Residential Villas Pathway */}
              <pointLight position={[-6.19, 3.5, 11.89]} intensity={6} color="#fde047" distance={25} decay={2} />

              {/* 5. Central Plaza & Boulevard Hub */}
              <pointLight position={[2.5, 2.5, 2.5]} intensity={6} color="#fbbf24" distance={25} decay={2} />
            </>
          )}


          {/* Real SketchUp Tacoma Site Model with 5 Interactive Clickable Hotspots & Authentic Textures */}
          <TacomaNeighborhoodModel
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={onSelectCategory}
            lightingMode={lightingMode}
            currentLanguage={currentLanguage}
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

      {/* BOTTOM-LEFT: Camera Preset & View Control Toolbar (Rotate & Overview) */}
      <div className={`absolute bottom-4 sm:bottom-6 left-3 sm:left-6 z-20 glass-panel p-1 sm:p-1.5 rounded-2xl shadow-clay-md flex items-center gap-1 sm:gap-1.5 border border-white/80 transition-opacity duration-300 ${selectedCategory ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <button
          onClick={handleResetCamera}
          className="p-1.5 sm:px-3 sm:py-1.5 rounded-xl text-xs font-semibold text-gray-700 hover:text-black hover:bg-white/80 transition-all cursor-pointer flex items-center gap-1.5"
          title={t.overviewView}
        >
          <Camera className="w-4 h-4 sm:w-3.5 sm:h-3.5 text-blue-600 shrink-0" />
          <span className="hidden sm:inline font-medium">{t.overviewView}</span>
        </button>

        <button
          onClick={() => {
            sound.playSwitch();
            setAutoRotate(!autoRotate);
          }}
          className={`p-1.5 sm:px-3 sm:py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
            autoRotate ? 'bg-blue-600 text-white shadow-xs' : 'text-gray-700 hover:text-black hover:bg-white/80'
          }`}
          title={autoRotate ? t.autoRotateStop : t.autoRotateStart}
        >
          {autoRotate ? <Pause className="w-4 h-4 sm:w-3.5 sm:h-3.5 text-white shrink-0" /> : <Play className="w-4 h-4 sm:w-3.5 sm:h-3.5 text-blue-600 shrink-0" />}
          <span className="hidden sm:inline font-medium">{autoRotate ? t.autoRotateStop : t.autoRotateStart}</span>
        </button>
      </div>

      {/* BOTTOM-CENTER: Lighting Mood Switcher Toolbar (Day, Sunset, Night) & Navigation Hint */}
      {!selectedCategory && (
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 sm:gap-2 max-w-[96vw] pb-[env(safe-area-inset-bottom,4px)]">
          {/* Lighting Mode Switcher Panel */}
          <div className="glass-panel p-1 sm:p-1.5 rounded-2xl shadow-clay-lg flex items-center gap-1 border border-white/90">
            <button
              onClick={() => { setLightingMode('day'); sound.playSwitch(); }}
              className={`p-1.5 sm:px-3 sm:py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                lightingMode === 'day' ? 'bg-black text-white shadow-xs' : 'text-gray-700 hover:text-black hover:bg-white/80'
              }`}
              title={t.dayMode}
            >
              <Sun className="w-4 h-4 sm:w-3.5 sm:h-3.5 text-amber-500 shrink-0" />
              <span className="hidden sm:inline">{t.dayMode}</span>
            </button>

            <button
              onClick={() => { setLightingMode('sunset'); sound.playSwitch(); }}
              className={`p-1.5 sm:px-3 sm:py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                lightingMode === 'sunset' ? 'bg-orange-600 text-white shadow-xs' : 'text-gray-700 hover:text-black hover:bg-white/80'
              }`}
              title={t.sunsetMode}
            >
              <Sunset className="w-4 h-4 sm:w-3.5 sm:h-3.5 text-orange-400 shrink-0" />
              <span className="hidden sm:inline">{t.sunsetMode}</span>
            </button>

            <button
              onClick={() => { setLightingMode('night'); sound.playSwitch(); }}
              className={`p-1.5 sm:px-3 sm:py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                lightingMode === 'night' ? 'bg-indigo-950 text-white shadow-xs ring-2 ring-sky-400/60' : 'text-gray-700 hover:text-black hover:bg-white/80'
              }`}
              title={t.nightMode}
            >
              <Moon className="w-4 h-4 sm:w-3.5 sm:h-3.5 text-indigo-300 shrink-0" />
              <span className="hidden sm:inline">{t.nightMode}</span>
            </button>

            {onExit3D && (
              <button
                onClick={() => { sound.playClick(); onExit3D(); }}
                className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl text-xs font-bold text-blue-700 hover:bg-blue-50 transition-all cursor-pointer flex items-center gap-1 border-l border-slate-200/80 ml-1 pl-2"
                title={currentLanguage === 'fa' ? 'بازگشت به نسخه سبک و پرسرعت' : 'Switch to Ultra-Fast 2D Mode'}
              >
                <Zap className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span className="hidden md:inline">{currentLanguage === 'fa' ? 'نسخه سبک' : 'Fast Mode'}</span>
              </button>
            )}
          </div>

          {/* Minimal Navigation Hint (Desktop only) */}
          <div className="hidden sm:flex text-[11px] font-medium text-slate-300 bg-slate-950/70 backdrop-blur-md px-3.5 py-1 rounded-full border border-white/10 items-center gap-3">
            <span className="flex items-center gap-1">
              <MousePointerClick className="w-3 h-3 text-sky-400 shrink-0" />
              <span>{t.clickBuildingHint}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <RotateCw className="w-3 h-3 text-emerald-400 shrink-0" />
              <span>{t.rotateHint}</span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
