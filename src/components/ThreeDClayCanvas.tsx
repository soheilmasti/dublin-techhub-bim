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
import { TacomaNeighborhoodModel } from './TacomaNeighborhoodModel';
import { LanguageCode, TRANSLATIONS } from '../utils/i18n';

// Dynamic Tone Mapping Exposure and Environment Intensity calibration
const SceneExposure: React.FC<{ mode: 'day' | 'sunset' | 'night' | 'wireframe' }> = ({ mode }) => {
  const { gl, scene } = useThree();
  useEffect(() => {
    gl.toneMapping = THREE.ACESFilmicToneMapping;
    // Master Studio Exposure: Balanced key-to-fill ratios, preventing clipped white highlights and lifting shadow details
    gl.toneMappingExposure = mode === 'sunset' ? 1.02 : mode === 'night' ? 0.98 : 1.06;
    gl.shadowMap.enabled = true;
    gl.shadowMap.type = THREE.PCFSoftShadowMap;

    // Subtly balance HDR environment reflections so materials receive natural studio GI bounce
    if ('environmentIntensity' in scene) {
      (scene as any).environmentIntensity = mode === 'night' ? 0.18 : mode === 'sunset' ? 0.42 : 0.55;
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
  lightingMode?: 'day' | 'sunset' | 'night' | 'wireframe';
  autoRotate?: boolean;
  onAutoRotateChange?: (rotating: boolean) => void;
  resetCameraTrigger?: number;
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
  onOpenFlipbook,
  lightingMode: propLightingMode,
  autoRotate: propAutoRotate,
  onAutoRotateChange,
  resetCameraTrigger
}) => {
  const [localLightingMode, setLocalLightingMode] = useState<'day' | 'sunset' | 'night' | 'wireframe'>('day');
  const [localAutoRotate, setLocalAutoRotate] = useState<boolean>(true);
  const lightingMode = propLightingMode ?? localLightingMode;
  const autoRotate = propAutoRotate ?? localAutoRotate;

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

  // External trigger from BottomToolbar to reset camera view
  useEffect(() => {
    if (resetCameraTrigger && resetCameraTrigger > 0) {
      handleResetCamera();
    }
  }, [resetCameraTrigger]);

  const handleFocusZone = (cat: CategoryBuilding) => {
    sound.playClick();
    onSelectCategory(cat);
    if (ZONE_CAMERA_TARGETS[cat.id]) {
      setCameraFocus(ZONE_CAMERA_TARGETS[cat.id]);
    }
  };

  const isMobile = typeof navigator !== 'undefined' && /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
  const shadowMapRes = isMobile ? 1024 : 4096;

  return (
    <div className="relative w-full h-[100dvh] h-screen bg-[#0f141c] overflow-hidden select-none touch-none">
      {/* 3D WebGL Canvas with PBR Tone Mapping & Wide Overview Camera */}
      <Canvas
        shadows
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        camera={{ position: [32, 24, -24], near: 1.0, far: 180, fov: 38 }}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          powerPreference: 'high-performance'
        }}
        style={{ touchAction: 'none' }}
        className="w-full h-full"
      >
        <Suspense fallback={null}>
          <SceneExposure mode={lightingMode} />
          <ResponsiveCameraUpdater fov={responsiveFov} />

          {/* Clean Studio Horizon Background (Architectural Studio Stage) */}
          <color attach="background" args={[lightingMode === 'night' ? '#090d14' : lightingMode === 'sunset' ? '#161320' : '#14171d']} />

          {/* Hemisphere Ambient Sky Bounce (Calibrated for crisp architectural relief without washing out shadow faces) */}
          <hemisphereLight 
            intensity={lightingMode === 'night' ? 0.22 : lightingMode === 'sunset' ? 0.32 : 0.35} 
            color={lightingMode === 'sunset' ? '#fed7aa' : lightingMode === 'night' ? '#38bdf8' : '#f8fafc'} 
            groundColor={lightingMode === 'night' ? '#090d14' : lightingMode === 'sunset' ? '#1c1520' : '#1a1d24'} 
          />

          {/* Lighting based on mood */}
          {lightingMode === 'day' && (
            <>
              {/* Soft luminous ambient fill - lifts shadow faces so all windows, facades and reveals remain readable */}
              <ambientLight intensity={0.42} color="#f8fafc" />
              {/* Dominant crisp architectural sun (angled at 45 deg, balanced intensity so white volumes don't blow out) */}
              <directionalLight
                position={[-28, 42, 24]}
                intensity={1.35}
                color="#fffbf2"
                castShadow
                shadow-mapSize-width={shadowMapRes}
                shadow-mapSize-height={shadowMapRes}
                shadow-camera-left={-38}
                shadow-camera-right={38}
                shadow-camera-top={38}
                shadow-camera-bottom={-38}
                shadow-camera-near={1}
                shadow-camera-far={120}
                shadow-bias={-0.00004}
                shadow-normalBias={0.012}
              />
              {/* Gentle opposite sky bounce fill so shadow faces show crisp details without washing out */}
              <directionalLight position={[24, 18, -16]} intensity={0.32} color="#94a3b8" />
            </>
          )}

          {lightingMode === 'sunset' && (
            <>
              {/* Luminous twilight ambient fill */}
              <ambientLight intensity={0.36} color="#cbd5e1" />
              {/* Warm golden hour sun casting dramatic, long shadows across roofs and plazas */}
              <directionalLight
                position={[-32, 20, 16]}
                intensity={1.45}
                color="#fb923c"
                castShadow
                shadow-mapSize-width={shadowMapRes}
                shadow-mapSize-height={shadowMapRes}
                shadow-camera-left={-38}
                shadow-camera-right={38}
                shadow-camera-top={38}
                shadow-camera-bottom={-38}
                shadow-camera-near={1}
                shadow-camera-far={120}
                shadow-bias={-0.00004}
                shadow-normalBias={0.012}
              />
              {/* Cool twilight sky fill bounce (complementary blue-lavender tone) */}
              <directionalLight position={[20, 16, -14]} intensity={0.38} color="#818cf8" />
            </>
          )}

          {lightingMode === 'night' && (
            <>
              {/* Clear, legible architectural nocturnal ambient sky fill - prevents buildings from disappearing into pitch black */}
              <ambientLight intensity={0.28} color="#334155" />
              {/* Soft, cool moonlight casting gentle, readable shadows across the masterplan */}
              <directionalLight 
                position={[-24, 38, 20]} 
                intensity={0.65} 
                color="#93c5fd" 
                castShadow
                shadow-mapSize-width={shadowMapRes}
                shadow-mapSize-height={shadowMapRes}
                shadow-camera-left={-38}
                shadow-camera-right={38}
                shadow-camera-top={38}
                shadow-camera-bottom={-38}
                shadow-camera-near={1}
                shadow-camera-far={120}
                shadow-bias={-0.00004}
                shadow-normalBias={0.012}
              />

              {/* Subtle architectural focal warm light pools (intimate accent glows at key building entrances & plazas) */}
              <pointLight position={[6.57, 5.0, 6.23]} intensity={1.5} color="#fbbf24" distance={22} decay={2} />
              <pointLight position={[-0.87, 3.2, -1.03]} intensity={1.4} color="#fbbf24" distance={20} decay={2} />
              <pointLight position={[-6.95, 3.2, -6.17]} intensity={1.4} color="#38bdf8" distance={20} decay={2} />
              <pointLight position={[-6.19, 2.2, 11.89]} intensity={1.3} color="#fde047" distance={18} decay={2} />
              <pointLight position={[2.5, 1.8, 2.5]} intensity={1.4} color="#fbbf24" distance={20} decay={2} />
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
            onUserInteraction={() => {
              if (onAutoRotateChange) onAutoRotateChange(false);
              setLocalAutoRotate(false);
            }} 
          />
          <Environment preset="studio" blur={0.8} />
        </Suspense>
      </Canvas>
    </div>
  );
};
