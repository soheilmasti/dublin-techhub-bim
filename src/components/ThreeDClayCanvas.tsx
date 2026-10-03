import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  Environment, SoftShadows, ContactShadows
} from '@react-three/drei';
import * as THREE from 'three';
import { SmoothCameraControls } from './SmoothCameraControls';
import { CategoryBuilding } from '../types';
import { sound } from '../utils/audio';
import { TacomaNeighborhoodModel } from './TacomaNeighborhoodModel';
import { LanguageCode, TRANSLATIONS } from '../utils/i18n';

// Dynamic Tone Mapping Exposure and Environment Intensity calibration
const SceneExposure: React.FC<{ mode: 'day' | 'sunset' | 'night' | 'wireframe' }> = ({ mode }) => {
  const { gl } = useThree();
  useEffect(() => {
    gl.toneMapping = THREE.ACESFilmicToneMapping;
    // Master Studio Exposure: Balanced key-to-fill ratios, preventing clipped white highlights and lifting shadow details
    gl.toneMappingExposure = mode === 'sunset' ? 0.78 : mode === 'night' ? 0.85 : 0.72;
    gl.shadowMap.enabled = true;
    gl.shadowMap.type = THREE.PCFShadowMap;

    // Geometry and key lights are static within a mood: cache the shadow pass.
    gl.shadowMap.autoUpdate = false;
    gl.shadowMap.needsUpdate = true;
  }, [mode, gl]);
  return null;
};

// Dynamic Responsive FOV Updater for mobile/tablet/desktop screens
const ResponsiveCameraUpdater: React.FC<{ fov: number }> = ({ fov }) => {
  const { camera } = useThree();
  useFrame((_, delta) => {
    if (camera instanceof THREE.PerspectiveCamera && Math.abs(camera.fov - fov) > 0.001) {
      camera.fov = THREE.MathUtils.lerp(camera.fov, fov, 1 - Math.exp(-8 * Math.min(delta, 0.05)));
      camera.updateProjectionMatrix();
    }
  });
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
const getOverviewCamera = () => {
  const aspect = typeof window === 'undefined' ? 1.5 : window.innerWidth / window.innerHeight;
  const distanceScale = Math.max(1, 0.9 / aspect);
  return {
    target: [0, 2, 0] as [number, number, number],
    position: [40 * distanceScale, 30 * distanceScale, -30 * distanceScale] as [number, number, number]
  };
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

  const [initialCamera] = useState(() => ({
    position: getOverviewCamera().position, near: 0.2, far: 240, fov: computeOverviewFov()
  }));
  const [responsiveFov, setResponsiveFov] = useState<number>(computeOverviewFov);

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
      setCameraFocus(getOverviewCamera());
      setResponsiveFov(computeOverviewFov());
    }
  }, [selectedCategory?.id]);

  const handleResetCamera = () => {
    sound.playClick();
    setCameraFocus(getOverviewCamera());
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

  const isMobile = typeof navigator !== 'undefined' && (/Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) || navigator.maxTouchPoints > 1);
  const shadowMapRes = isMobile ? 1024 : 2048;

  return (
    <div className="relative w-full scene-viewport bg-[#0f141c] overflow-hidden select-none touch-none">
      {/* 3D WebGL Canvas with PBR Tone Mapping & Wide Overview Camera */}
      <Canvas
        shadows
        dpr={isMobile ? [1, 1.25] : [1, 1.5]}
        camera={initialCamera}
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

          {/* Broad studio softbox, neutral bounce, and softly readable recesses. */}
          <SoftShadows size={65} samples={isMobile ? 8 : 16} focus={0} />
          <color attach="background" args={[lightingMode === 'night' ? '#373b43' : lightingMode === 'sunset' ? '#c5b9ab' : '#d7d2c9']} />
          <hemisphereLight
            intensity={lightingMode === 'night' ? 0.3 : 0.42}
            color={lightingMode === 'night' ? '#cbd5e1' : '#fff8ee'}
            groundColor={lightingMode === 'night' ? '#737680' : '#b7aea2'}
          />
          <ambientLight intensity={0.08} color="#fff5e7" />
          <directionalLight
            position={lightingMode === 'sunset' ? [-26, 25, 18] : [-18, 45, 15]}
            intensity={lightingMode === 'night' ? 0.55 : lightingMode === 'sunset' ? 1.1 : 1.25}
            color={lightingMode === 'night' ? '#d5deef' : lightingMode === 'sunset' ? '#ffdab4' : '#fff4e2'}
            castShadow
            shadow-mapSize-width={shadowMapRes}
            shadow-mapSize-height={shadowMapRes}
            shadow-camera-left={-30}
            shadow-camera-right={30}
            shadow-camera-top={30}
            shadow-camera-bottom={-30}
            shadow-camera-near={1}
            shadow-camera-far={120}
            shadow-bias={-0.00012}
            shadow-normalBias={0.035}
          />
          <directionalLight position={[22, 18, -20]} intensity={lightingMode === 'night' ? 0.15 : 0.32} color="#f1f0eb" />
          <ContactShadows
            key={lightingMode}
            position={[0, -0.885, 0]}
            scale={65}
            far={16}
            opacity={0.35}
            blur={2.5}
            resolution={isMobile ? 256 : 512}
            frames={1}
            color="#655b4d"
          />
          {/* Continuous studio sweep around the small model plinth. */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.9, 0]} receiveShadow>
            <planeGeometry args={[600, 600]} />
            <meshStandardMaterial color={lightingMode === 'night' ? '#656870' : '#aaa092'} roughness={1} metalness={0} />
          </mesh>

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
          <SmoothCameraControls
            targetFocus={cameraFocus} 
            autoRotate={autoRotate} 
            onUserInteraction={() => {
              if (onAutoRotateChange) onAutoRotateChange(false);
              setLocalAutoRotate(false);
            }} 
          />
          <Environment
            preset="studio"
            environmentIntensity={lightingMode === 'night' ? 0.18 : lightingMode === 'sunset' ? 0.22 : 0.25}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};
