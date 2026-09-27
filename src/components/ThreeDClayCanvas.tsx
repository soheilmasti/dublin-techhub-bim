import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  OrbitControls,
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
  Zap,
  BookOpen
} from 'lucide-react';
import { TacomaNeighborhoodModel } from './TacomaNeighborhoodModel';
import { LanguageCode, TRANSLATIONS } from '../utils/i18n';

// Dynamic Tone Mapping Exposure and Environment Intensity calibration
const SceneExposure: React.FC<{ mode: 'day' | 'sunset' | 'night' | 'wireframe' }> = ({ mode }) => {
  const { gl, scene } = useThree();
  useEffect(() => {
    gl.toneMapping = THREE.ACESFilmicToneMapping;
    // Controlled exposure: prevents blown-out white walls & preserves deep architectural contrast
    gl.toneMappingExposure = mode === 'sunset' ? 0.95 : mode === 'night' ? 0.80 : 0.92;
    gl.shadowMap.enabled = true;
    gl.shadowMap.type = THREE.PCFSoftShadowMap;

    // Subtly balance HDR environment reflections so they don't wash out shadows
    if ('environmentIntensity' in scene) {
      (scene as any).environmentIntensity = mode === 'night' ? 0.03 : mode === 'sunset' ? 0.16 : 0.22;
    }
  }, [mode, gl, scene]);
  return null;
};

// Dynamic Responsive FOV Updater for mobile/tablet/desktop screens
const ResponsiveCameraUpdater: React.FC<{ fov: number }> = ({ fov }) => {
  const { camera } = useThree();
  useEffect(() => {
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = fov;
      camera.updateProjectionMatrix();
    }
  }, [camera, fov]);
  return null;
};

interface ThreeDClayCanvasProps {
  categories: CategoryBuilding[];
  onSelectCategory: (category: CategoryBuilding) => void;
  selectedCategory: CategoryBuilding | null;
  currentLanguage?: LanguageCode;
  onExit3D?: () => void;
  isIntroActive?: boolean;
  isFlipbookOpen?: boolean;
  onOpenFlipbook?: () => void;
}

// 5 Zone Centroid & Camera Targets for Smooth Focus (Rotated 90 deg CCW to match Horizontal Overview perspective)
const ZONE_CAMERA_TARGETS: Record<string, { target: [number, number, number]; position: [number, number, number] }> = {
  'urban-design': {
    target: [-6.95, 4.0, -6.17],
    position: [-0.3, 8.5, -11.6]
  },
  'residential-luxury': {
    target: [-6.19, 3.0, 11.89],
    position: [0.4, 7.5, 6.7]
  },
  'commercial-complexes': {
    target: [6.57, 5.2, 6.23],
    position: [14.3, 10.5, -1.2]
  },
  'retail-stores': {
    target: [-0.87, 3.2, -1.03],
    position: [6.7, 8.0, -8.4]
  },
  'institutional-competitions': {
    target: [7.31, 2.2, 16.02],
    position: [13.3, 6.5, 9.8]
  }
};

// Wide, comfortable panoramic overview of the entire Tacoma neighborhood & masterplan (Rotated 90 deg counter-clockwise & centered)
const OVERVIEW_CAMERA = {
  target: [0, 2.0, 3.5] as [number, number, number],
  position: [32, 24, -24] as [number, number, number]
};

// Smooth Camera Flight Controller (Free Orbit by default, flies ONLY on click, yields immediately on user mouse interaction)
const CameraController: React.FC<{
  targetFocus: { target: [number, number, number]; position: [number, number, number] } | null;
  autoRotate: boolean;
  onUserInteraction?: () => void;
}> = ({ targetFocus, autoRotate, onUserInteraction }) => {
  const controlsRef = useRef<OrbitControlsType>(null);
  const isFlying = useRef<boolean>(false);
  const flightProgress = useRef<number>(1);
  const startPos = useRef(new THREE.Vector3());
  const startTarget = useRef(new THREE.Vector3());
  const targetVec = useRef(new THREE.Vector3());
  const posVec = useRef(new THREE.Vector3());

  // Trigger flight ONLY when targetFocus is explicitly updated by a click
  useEffect(() => {
    if (targetFocus && controlsRef.current) {
      const controls = controlsRef.current;
      startPos.current.copy(controls.object.position);
      startTarget.current.copy(controls.target);
      targetVec.current.set(...targetFocus.target);
      posVec.current.set(...targetFocus.position);
      flightProgress.current = 0;
      isFlying.current = true;
    }
  }, [targetFocus]);

  // Immediately yield camera control to user if they touch/drag/scroll with mouse
  useEffect(() => {
    const controls = controlsRef.current;
    if (!controls) return;

    const handleUserStart = () => {
      // User began interacting with mouse/touch -> stop flight and pause auto-rotation immediately!
      isFlying.current = false;
      onUserInteraction?.();
    };

    controls.addEventListener('start', handleUserStart);
    return () => {
      controls.removeEventListener('start', handleUserStart);
    };
  }, [onUserInteraction]);

  useFrame(({ camera }, delta) => {
    const controls = controlsRef.current;
    if (!controls) return;

    // Smooth deterministic cubic ease-out camera flight
    if (isFlying.current) {
      flightProgress.current = Math.min(1, flightProgress.current + delta * 1.35);
      const p = flightProgress.current;
      // Cubic ease-out: fast start, soft landing
      const ease = 1 - Math.pow(1 - p, 3);

      camera.position.lerpVectors(startPos.current, posVec.current, ease);
      controls.target.lerpVectors(startTarget.current, targetVec.current, ease);
      controls.update();

      if (p >= 1) {
        isFlying.current = false;
        camera.position.copy(posVec.current);
        controls.target.copy(targetVec.current);
        controls.update();
      }
    } else {
      controls.update();
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={true}
      enableZoom={true}
      enableRotate={true}
      rotateSpeed={0.49}
      zoomSpeed={1.0}
      enableDamping={true}
      dampingFactor={0.06}
      screenSpacePanning={true}
      autoRotate={autoRotate}
      autoRotateSpeed={0.56}
      maxPolarAngle={Math.PI / 2.03}
      minDistance={3}
      maxDistance={120}
      touches={{
        ONE: THREE.TOUCH.ROTATE,
        TWO: THREE.TOUCH.DOLLY_PAN
      }}
    />
  );
};

export const ThreeDClayCanvas: React.FC<ThreeDClayCanvasProps> = ({
  categories,
  onSelectCategory,
  selectedCategory,
  currentLanguage = 'en',
  onExit3D,
  isIntroActive = false,
  isFlipbookOpen = false,
  onOpenFlipbook
}) => {
  const [lightingMode, setLightingMode] = useState<'day' | 'sunset' | 'night' | 'wireframe'>('day');
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [cameraFocus, setCameraFocus] = useState<{ target: [number, number, number]; position: [number, number, number] } | null>(null);

  // Responsive FOV helper based on screen width/aspect ratio (auto-adapts for portrait phones & tablets)
  const computeOverviewFov = () => {
    const width = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const height = typeof window !== 'undefined' ? window.innerHeight : 800;
    const aspect = width / height;

    if (aspect < 0.6) {
      // Tall portrait mobile (e.g. iPhone, Samsung Galaxy) -> wider FOV to fit full horizontal masterplan
      return 55;
    } else if (aspect < 0.9) {
      // Tablet portrait (iPad)
      return 46;
    } else if (aspect < 1.3) {
      // Small laptops / square windows
      return 42;
    } else {
      // Standard wide desktop
      return 38;
    }
  };

  const [responsiveFov, setResponsiveFov] = useState<number>(38);

  useEffect(() => {
    const updateFov = () => {
      setResponsiveFov(computeOverviewFov());
    };

    updateFov();
    window.addEventListener('resize', updateFov);
    return () => window.removeEventListener('resize', updateFov);
  }, []);

  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;
  const isInitialMount = useRef(true);

  // Sync camera focus: zoom in on building click, smoothly return to OVERVIEW on deselect!
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (selectedCategory && ZONE_CAMERA_TARGETS[selectedCategory.id]) {
      setCameraFocus(ZONE_CAMERA_TARGETS[selectedCategory.id]);
    } else if (!selectedCategory) {
      // Whenever user closes project drawer or returns to 3D space, smoothly fly back to panoramic Overview!
      setCameraFocus({ ...OVERVIEW_CAMERA });
      setResponsiveFov(computeOverviewFov());
    }
  }, [selectedCategory]);

  const handleResetCamera = () => {
    sound.playClick();
    setCameraFocus({ ...OVERVIEW_CAMERA });
    setResponsiveFov(computeOverviewFov());
  };

  const handleFocusZone = (cat: CategoryBuilding) => {
    sound.playClick();
    onSelectCategory(cat);
    if (ZONE_CAMERA_TARGETS[cat.id]) {
      setCameraFocus(ZONE_CAMERA_TARGETS[cat.id]);
    }
  };

  const isMobile = typeof navigator !== 'undefined' && /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);

  return (
    <div className="relative w-full h-[100dvh] h-screen bg-[#0f141c] overflow-hidden select-none touch-none">
      {/* 3D WebGL Canvas with PBR Tone Mapping & Wide Overview Camera */}
      <Canvas
        shadows
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        camera={{ position: [32, 24, -24], near: 0.5, far: 200, fov: 38 }}
        gl={{
          antialias: true,
          logarithmicDepthBuffer: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          preserveDrawingBuffer: true,
          powerPreference: 'high-performance'
        }}
        className="w-full h-full"
      >
        <Suspense fallback={null}>
          <SceneExposure mode={lightingMode} />
          <ResponsiveCameraUpdater fov={responsiveFov} />

          {/* Clean Horizon Background (Matching professional model studio in reference photo) */}
          <color attach="background" args={[lightingMode === 'night' ? '#070a12' : lightingMode === 'sunset' ? '#1c1520' : '#e2e6ee']} />

          {/* Hemisphere Ambient Sky Bounce (Calibrated for crisp architectural relief without washing out shadow faces) */}
          <hemisphereLight 
            intensity={lightingMode === 'night' ? 0.08 : lightingMode === 'sunset' ? 0.22 : 0.24} 
            color={lightingMode === 'sunset' ? '#fed7aa' : lightingMode === 'night' ? '#1e293b' : '#e0f2fe'} 
            groundColor={lightingMode === 'night' ? '#070a12' : '#1e2430'} 
          />

          {/* Lighting based on mood */}
          {lightingMode === 'day' && (
            <>
              {/* Soft natural ambient fill - leaves deep, readable 3D architectural volume and shadow relief */}
              <ambientLight intensity={0.15} color="#f1f5f9" />
              {/* Dominant crisp architectural sun (angled at 45 deg, casting sharp, natural surface shadows onto walls, roofs & ground) */}
              <directionalLight
                position={[-28, 44, 22]}
                intensity={2.1}
                color="#fffcf2"
                castShadow
                shadow-mapSize-width={4096}
                shadow-mapSize-height={4096}
                shadow-camera-left={-38}
                shadow-camera-right={38}
                shadow-camera-top={38}
                shadow-camera-bottom={-38}
                shadow-camera-near={1}
                shadow-camera-far={120}
                shadow-bias={-0.0004}
                shadow-normalBias={0.035}
              />
              {/* Gentle opposite sky bounce fill so shadow faces show crisp details without washing out */}
              <directionalLight position={[24, 18, -16]} intensity={0.22} color="#cbd5e1" />
            </>
          )}

          {lightingMode === 'sunset' && (
            <>
              <ambientLight intensity={0.16} color="#fed7aa" />
              <directionalLight
                position={[-30, 22, 16]}
                intensity={2.3}
                color="#f97316"
                castShadow
                shadow-mapSize-width={4096}
                shadow-mapSize-height={4096}
                shadow-camera-left={-38}
                shadow-camera-right={38}
                shadow-camera-top={38}
                shadow-camera-bottom={-38}
                shadow-camera-near={1}
                shadow-camera-far={120}
                shadow-bias={-0.0004}
                shadow-normalBias={0.035}
              />
              <directionalLight position={[18, 14, -12]} intensity={0.25} color="#60a5fa" />
            </>
          )}

          {lightingMode === 'night' && (
            <>
              {/* Deep, authentic architectural night: subtle dark blue sky ambience */}
              <ambientLight intensity={0.05} color="#0f172a" />
              {/* Soft, cool moonlight casting gentle, moody shadows */}
              <directionalLight 
                position={[-24, 38, 20]} 
                intensity={0.35} 
                color="#93c5fd" 
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
                shadow-camera-left={-38}
                shadow-camera-right={38}
                shadow-camera-top={38}
                shadow-camera-bottom={-38}
                shadow-camera-near={1}
                shadow-camera-far={120}
                shadow-bias={-0.0004}
                shadow-normalBias={0.035}
              />

              {/* Subtle architectural focal warm light pools (intimate accent glows, not blinding floodlights) */}
              <pointLight position={[6.57, 6.0, 6.23]} intensity={2.2} color="#fbbf24" distance={20} decay={2} />
              <pointLight position={[-0.87, 3.5, -1.03]} intensity={1.8} color="#fbbf24" distance={18} decay={2} />
              <pointLight position={[-6.95, 3.5, -6.17]} intensity={1.8} color="#38bdf8" distance={18} decay={2} />
              <pointLight position={[-6.19, 2.5, 11.89]} intensity={1.6} color="#fde047" distance={16} decay={2} />
              <pointLight position={[2.5, 2.0, 2.5]} intensity={1.8} color="#fbbf24" distance={18} decay={2} />
            </>
          )}


          {/* Real SketchUp Tacoma Site Model with 5 Interactive Clickable Hotspots & Authentic Textures */}
          <TacomaNeighborhoodModel
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={onSelectCategory}
            lightingMode={lightingMode}
            currentLanguage={currentLanguage}
            showPins={!isIntroActive && !isFlipbookOpen && !selectedCategory}
          />

          {/* Smooth Camera Flight & Orbit Controls (Auto-rotates by default, pauses on manual touch/click/drag) */}
          <CameraController 
            targetFocus={cameraFocus} 
            autoRotate={autoRotate} 
            onUserInteraction={() => setAutoRotate(false)} 
          />
          <Environment preset="studio" blur={0.8} />
        </Suspense>
      </Canvas>

      {/* BOTTOM-LEFT: Camera Preset & View Control Toolbar (Rotate & Overview - Hidden on Video Intro or Flipbook) */}
      {!isIntroActive && !isFlipbookOpen && (
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

          {onOpenFlipbook && (
            <button
              onClick={() => {
                sound.playPageFlip();
                onOpenFlipbook();
              }}
              className="p-1.5 sm:px-3 sm:py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-xs hover:scale-105 active:scale-95 border border-amber-400/40"
              title={currentLanguage === 'fa' ? 'ورق زدن دفترچه پورتفولیو استودیو' : 'Open Portfolio Flipbook'}
            >
              <BookOpen className="w-4 h-4 sm:w-3.5 sm:h-3.5 text-white shrink-0" />
              <span className="hidden sm:inline font-bold">
                {currentLanguage === 'fa' ? 'دفترچه پورتفولیو' : 'Portfolio Book'}
              </span>
            </button>
          )}
        </div>
      )}

      {/* BOTTOM-CENTER: Lighting Mood Switcher Toolbar (Day, Sunset, Night) & Navigation Hint */}
      {!selectedCategory && !isIntroActive && !isFlipbookOpen && (
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
