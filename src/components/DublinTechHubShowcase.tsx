import React, { useState, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, Float, RoundedBox, ContactShadows, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { 
  Building2, 
  ShieldCheck, 
  CheckCircle2, 
  Server, 
  Video, 
  Zap, 
  Layers, 
  FileText, 
  Sliders, 
  ChevronRight, 
  Info, 
  Lock, 
  ArrowLeft, 
  Flame, 
  Wind, 
  Lightbulb, 
  DollarSign, 
  Check, 
  Compass, 
  Maximize2, 
  Eye, 
  Sparkles,
  RefreshCw,
  Cpu,
  Monitor,
  Activity,
  CheckCheck,
  Home
} from 'lucide-react';
import { sound } from '../utils/audio';
import { LanguageCode, TRANSLATIONS } from '../utils/i18n';

// -----------------------------------------------------------------------------
// PHOTOREALISTIC 3D ARCHITECTURAL & MEP ASSETS (LOD 350 / 400)
// -----------------------------------------------------------------------------

// 1. Photorealistic Ergonomic Dual-Monitor Workstation Pod
const WorkstationPod3D: React.FC<{ position: [number, number, number]; rotationY?: number }> = ({ position, rotationY = 0 }) => {
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      {/* Oak Desktop with Chamfered Edge */}
      <mesh position={[0, 0.72, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.6, 0.035, 1.2]} />
        <meshStandardMaterial color="#e2d4be" roughness={0.35} metalness={0.05} />
      </mesh>

      {/* Heavy Powder-Coated Steel Legs & Cable Tray */}
      <mesh position={[-0.72, 0.36, 0]} castShadow>
        <boxGeometry args={[0.04, 0.72, 1.1]} />
        <meshStandardMaterial color="#1e293b" metalness={0.85} roughness={0.25} />
      </mesh>
      <mesh position={[0.72, 0.36, 0]} castShadow>
        <boxGeometry args={[0.04, 0.72, 1.1]} />
        <meshStandardMaterial color="#1e293b" metalness={0.85} roughness={0.25} />
      </mesh>
      <mesh position={[0, 0.45, 0]}>
        <boxGeometry args={[1.3, 0.08, 0.2]} />
        <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.3} />
      </mesh>

      {/* Acoustic Felt Desk Divider (Navy Blue Fabric) */}
      <mesh position={[0, 0.96, 0]} castShadow>
        <boxGeometry args={[1.5, 0.44, 0.025]} />
        <meshStandardMaterial color="#1e3a8a" roughness={0.95} />
      </mesh>

      {/* Dual Curved 27" Displays & Articulated Monitor Arms */}
      {[-0.32, 0.32].map((z, idx) => (
        <group key={idx} position={[0, 0.74, z]} rotation={[0, idx === 0 ? 0 : Math.PI, 0]}>
          {/* Monitor Arm Mount */}
          <mesh position={[0, 0.15, -0.45]}>
            <cylinderGeometry args={[0.02, 0.02, 0.3, 12]} />
            <meshStandardMaterial color="#0f172a" metalness={0.9} />
          </mesh>

          {/* Left Screen (Curved Ultra-Thin Bezel) */}
          <mesh position={[-0.36, 0.32, -0.3]} rotation={[0, 0.18, 0]} castShadow>
            <boxGeometry args={[0.56, 0.34, 0.015]} />
            <meshStandardMaterial color="#020617" roughness={0.2} metalness={0.8} />
          </mesh>
          <mesh position={[-0.36, 0.32, -0.29]} rotation={[0, 0.18, 0]}>
            <planeGeometry args={[0.54, 0.32]} />
            <meshStandardMaterial color="#0284c7" emissive="#0284c7" emissiveIntensity={0.6} roughness={0.1} />
          </mesh>

          {/* Right Screen */}
          <mesh position={[0.26, 0.32, -0.3]} rotation={[0, -0.18, 0]} castShadow>
            <boxGeometry args={[0.56, 0.34, 0.015]} />
            <meshStandardMaterial color="#020617" roughness={0.2} metalness={0.8} />
          </mesh>
          <mesh position={[0.26, 0.32, -0.29]} rotation={[0, -0.18, 0]}>
            <planeGeometry args={[0.54, 0.32]} />
            <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={0.5} roughness={0.1} />
          </mesh>

          {/* Mechanical Keyboard with RGB Underglow */}
          <mesh position={[-0.05, 0.01, -0.12]} castShadow>
            <boxGeometry args={[0.38, 0.015, 0.13]} />
            <meshStandardMaterial color="#0f172a" metalness={0.5} roughness={0.4} />
          </mesh>
          {/* Ergonomic Mouse & Desk Mat */}
          <mesh position={[0.24, 0.012, -0.1]}>
            <boxGeometry args={[0.07, 0.02, 0.11]} />
            <meshStandardMaterial color="#0284c7" roughness={0.3} />
          </mesh>
          <mesh position={[0, 0.005, -0.1]}>
            <boxGeometry args={[0.75, 0.003, 0.3]} />
            <meshStandardMaterial color="#1e293b" roughness={0.9} />
          </mesh>
        </group>
      ))}

      {/* Ergonomic Mesh Task Chairs with 5-Star Base */}
      {[-0.82, 0.82].map((z, idx) => (
        <group key={idx} position={[0, 0, z]} rotation={[0, idx === 0 ? 0 : Math.PI, 0]}>
          {/* Molded Seat */}
          <mesh position={[0, 0.46, 0]} castShadow>
            <boxGeometry args={[0.48, 0.07, 0.48]} />
            <meshStandardMaterial color="#0f172a" roughness={0.7} />
          </mesh>
          {/* Breathable Mesh Backrest with Lumbar Support */}
          <mesh position={[0, 0.82, 0.22]} rotation={[-0.08, 0, 0]} castShadow>
            <boxGeometry args={[0.44, 0.58, 0.03]} />
            <meshStandardMaterial color="#334155" roughness={0.85} />
          </mesh>
          {/* Adjustable Armrests */}
          {[-0.24, 0.24].map((armX) => (
            <mesh key={armX} position={[armX, 0.62, 0.05]} castShadow>
              <boxGeometry args={[0.05, 0.24, 0.22]} />
              <meshStandardMaterial color="#1e293b" metalness={0.8} />
            </mesh>
          ))}
          {/* Chrome Gas Lift Column & 5-Star Castor Base */}
          <mesh position={[0, 0.24, 0]}>
            <cylinderGeometry args={[0.025, 0.025, 0.45, 12]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.95} roughness={0.1} />
          </mesh>
          <mesh position={[0, 0.04, 0]} castShadow>
            <cylinderGeometry args={[0.3, 0.3, 0.03, 5]} />
            <meshStandardMaterial color="#0f172a" metalness={0.8} />
          </mesh>
        </group>
      ))}
    </group>
  );
};

// 2. Photorealistic Executive Boardroom Suite
const Boardroom3D: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  return (
    <group position={position}>
      {/* Solid Walnut Veneer Conference Table with Gold Trim */}
      <mesh position={[0, 0.74, 0]} castShadow receiveShadow>
        <boxGeometry args={[4.2, 0.05, 1.5]} />
        <meshStandardMaterial color="#451a03" roughness={0.3} metalness={0.08} />
      </mesh>
      {/* Integrated Brushed Brass Connectivity Hatch */}
      <mesh position={[0, 0.766, 0]}>
        <boxGeometry args={[1.2, 0.005, 0.25]} />
        <meshStandardMaterial color="#d97706" metalness={0.85} roughness={0.2} />
      </mesh>

      {/* Dual Heavy Cylinder Pedestals */}
      {[-1.3, 1.3].map((x) => (
        <mesh key={x} position={[x, 0.37, 0]} castShadow>
          <cylinderGeometry args={[0.26, 0.34, 0.74, 24]} />
          <meshStandardMaterial color="#1e293b" metalness={0.9} roughness={0.2} />
        </mesh>
      ))}

      {/* 85-Inch Ultra-HD Video Conferencing Display */}
      <mesh position={[0, 1.65, -1.85]} castShadow>
        <boxGeometry args={[2.2, 1.25, 0.03]} />
        <meshStandardMaterial color="#020617" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0, 1.65, -1.83]}>
        <planeGeometry args={[2.14, 1.19]} />
        <meshStandardMaterial color="#0284c7" emissive="#0284c7" emissiveIntensity={0.65} />
      </mesh>
      {/* 4K AI Tracking Soundbar */}
      <mesh position={[0, 0.96, -1.83]}>
        <boxGeometry args={[1.0, 0.07, 0.05]} />
        <meshStandardMaterial color="#0f172a" metalness={0.8} />
      </mesh>

      {/* Executive Leather Chairs (10 Seats) */}
      {[-1.5, -0.75, 0, 0.75, 1.5].map((x, i) => (
        <React.Fragment key={i}>
          {/* North Row */}
          <group position={[x, 0, -1.05]} rotation={[0, 0, 0]}>
            <mesh position={[0, 0.46, 0]} castShadow>
              <boxGeometry args={[0.48, 0.08, 0.46]} />
              <meshStandardMaterial color="#0f172a" roughness={0.5} />
            </mesh>
            <mesh position={[0, 0.85, -0.2]} rotation={[0.08, 0, 0]} castShadow>
              <boxGeometry args={[0.44, 0.65, 0.05]} />
              <meshStandardMaterial color="#0f172a" roughness={0.5} />
            </mesh>
            <mesh position={[0, 0.23, 0]}>
              <cylinderGeometry args={[0.025, 0.025, 0.45, 12]} />
              <meshStandardMaterial color="#94a3b8" metalness={0.95} />
            </mesh>
          </group>
          {/* South Row */}
          <group position={[x, 0, 1.05]} rotation={[0, Math.PI, 0]}>
            <mesh position={[0, 0.46, 0]} castShadow>
              <boxGeometry args={[0.48, 0.08, 0.46]} />
              <meshStandardMaterial color="#0f172a" roughness={0.5} />
            </mesh>
            <mesh position={[0, 0.85, -0.2]} rotation={[0.08, 0, 0]} castShadow>
              <boxGeometry args={[0.44, 0.65, 0.05]} />
              <meshStandardMaterial color="#0f172a" roughness={0.5} />
            </mesh>
            <mesh position={[0, 0.23, 0]}>
              <cylinderGeometry args={[0.025, 0.025, 0.45, 12]} />
              <meshStandardMaterial color="#94a3b8" metalness={0.95} />
            </mesh>
          </group>
        </React.Fragment>
      ))}
    </group>
  );
};

// 3. Photorealistic 42U MDF Server Rack with Flashing Activity LEDs
const ServerRack42U: React.FC<{ position: [number, number, number]; rackId: string; utilizedU: number; tempC: number }> = ({ position, rackId, utilizedU, tempC }) => {
  const ledRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (ledRef.current) {
      const t = clock.getElapsedTime();
      ledRef.current.children.forEach((child, i) => {
        if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
          const blink = Math.sin(t * 8 + i * 1.5) > 0.1;
          child.material.emissiveIntensity = blink ? 1.8 : 0.2;
        }
      });
    }
  });

  return (
    <group position={position}>
      {/* 42U Heavy-Duty Enclosure Frame (800x1200x2000mm) */}
      <mesh position={[0, 1.0, 0]} castShadow>
        <boxGeometry args={[0.8, 2.0, 1.2]} />
        <meshStandardMaterial color="#090d16" metalness={0.85} roughness={0.3} />
      </mesh>

      {/* Perforated Smoked Glass Front Door (Open Angle 30 deg) */}
      <mesh position={[-0.38, 1.0, 0.62]} rotation={[0, 0.45, 0]}>
        <boxGeometry args={[0.76, 1.96, 0.015]} />
        <meshStandardMaterial color="#0f172a" transparent opacity={0.45} roughness={0.1} metalness={0.9} />
      </mesh>

      {/* Digital Environmental Temperature & Power HUD */}
      <mesh position={[0, 1.92, 0.605]}>
        <planeGeometry args={[0.5, 0.09]} />
        <meshStandardMaterial color="#0284c7" emissive="#0284c7" emissiveIntensity={0.9} />
      </mesh>

      {/* Internal Blade Servers & Patch Panels (1U - 4U) */}
      {Array.from({ length: 14 }).map((_, idx) => {
        const y = 0.2 + idx * 0.12;
        const isOccupied = idx < (utilizedU / 3);
        return (
          <group key={idx} position={[0, y, 0.1]}>
            {/* Server Blade Faceplate */}
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[0.68, 0.095, 0.85]} />
              <meshStandardMaterial color={isOccupied ? "#1e293b" : "#020617"} metalness={0.7} roughness={0.4} />
            </mesh>
            {/* Server Ventilation Grill */}
            <mesh position={[0, 0, 0.43]}>
              <planeGeometry args={[0.64, 0.08]} />
              <meshStandardMaterial color="#0f172a" roughness={0.9} />
            </mesh>
          </group>
        );
      })}

      {/* Flashing Ethernet & Fiber Status LEDs */}
      <group ref={ledRef} position={[-0.22, 0.2, 0.54]}>
        {Array.from({ length: 12 }).map((_, i) => (
          <mesh key={i} position={[0, i * 0.13, 0]}>
            <sphereGeometry args={[0.014, 8, 8]} />
            <meshStandardMaterial 
              color={i % 4 === 0 ? "#ef4444" : (i % 3 === 0 ? "#eab308" : "#22c55e")} 
              emissive={i % 4 === 0 ? "#ef4444" : (i % 3 === 0 ? "#eab308" : "#22c55e")} 
              emissiveIntensity={1.5} 
            />
          </mesh>
        ))}
      </group>

      {/* Dual 32A Commando Power Feeds at Top */}
      <mesh position={[0.2, 2.05, -0.3]}>
        <cylinderGeometry args={[0.04, 0.04, 0.12, 12]} />
        <meshStandardMaterial color="#ea580c" roughness={0.3} />
      </mesh>
      <mesh position={[-0.2, 2.05, -0.3]}>
        <cylinderGeometry args={[0.04, 0.04, 0.12, 12]} />
        <meshStandardMaterial color="#0284c7" roughness={0.3} />
      </mesh>
    </group>
  );
};

// 4. InRow Precision Cooling Unit (18kW Direct Expansion)
const InRowCRAC3D: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  return (
    <group position={position}>
      {/* Narrow Cabinet (400x1200x2000mm) */}
      <mesh position={[0, 1.0, 0]} castShadow>
        <boxGeometry args={[0.4, 2.0, 1.2]} />
        <meshStandardMaterial color="#0284c7" metalness={0.7} roughness={0.25} />
      </mesh>
      {/* Front EC Variable Speed Fan Louvers */}
      <mesh position={[0, 1.0, 0.605]}>
        <boxGeometry args={[0.34, 1.8, 0.01]} />
        <meshStandardMaterial color="#0f172a" roughness={0.8} />
      </mesh>
      {/* Touchscreen Control Panel */}
      <mesh position={[0, 1.7, 0.61]}>
        <planeGeometry args={[0.22, 0.16]} />
        <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.8} />
      </mesh>
      {/* Overhead Refrigerant Piping */}
      <mesh position={[0, 2.08, -0.2]}>
        <cylinderGeometry args={[0.03, 0.03, 0.18, 12]} />
        <meshStandardMaterial color="#b45309" metalness={0.95} />
      </mesh>
    </group>
  );
};

// 5. FM-200 Clean Agent Fire Suppression Battery
const FM200GasBattery3D: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  return (
    <group position={position}>
      {/* 2 Heavy Red High-Pressure Cylinders */}
      {[-0.25, 0.25].map((x) => (
        <group key={x} position={[x, 0, 0]}>
          <mesh position={[0, 0.8, 0]} castShadow>
            <cylinderGeometry args={[0.2, 0.2, 1.5, 24]} />
            <meshStandardMaterial color="#dc2626" metalness={0.3} roughness={0.2} />
          </mesh>
          <mesh position={[0, 1.55, 0]}>
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshStandardMaterial color="#dc2626" metalness={0.3} roughness={0.2} />
          </mesh>
          {/* Brass Solenoid Valve & Pressure Gauge */}
          <mesh position={[0, 1.8, 0]}>
            <cylinderGeometry args={[0.04, 0.04, 0.16, 12]} />
            <meshStandardMaterial color="#d97706" metalness={0.9} roughness={0.1} />
          </mesh>
          <mesh position={[0.05, 1.82, 0.04]}>
            <cylinderGeometry args={[0.03, 0.03, 0.02, 12]} />
            <meshStandardMaterial color="#f8fafc" />
          </mesh>
        </group>
      ))}
      {/* Overhead High-Pressure Discharge Manifold Pipe */}
      <mesh position={[0, 1.95, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.8, 16]} />
        <meshStandardMaterial color="#dc2626" metalness={0.6} />
      </mesh>
    </group>
  );
};

// 6. 4MP CCTV Camera with 3D Translucent FOV Vision Cone
const CCTVCamera3D: React.FC<{
  position: [number, number, number];
  rotationY?: number;
  fovAngle?: number;
  showFOV?: boolean;
  name: string;
  onClick: () => void;
}> = ({ position, rotationY = 0, fovAngle = 90, showFOV = true, name, onClick }) => {
  return (
    <group position={position} rotation={[0, rotationY, 0]} onClick={(e) => { e.stopPropagation(); onClick(); }}>
      {/* Metallic Mounting Arm */}
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.025, 0.025, 0.18, 12]} />
        <meshStandardMaterial color="#1e293b" metalness={0.8} />
      </mesh>
      {/* Camera Body (4MP IP Dome) */}
      <mesh position={[0, 0, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.06, 0.08, 16]} />
        <meshStandardMaterial color="#f8fafc" metalness={0.2} roughness={0.3} />
      </mesh>
      {/* Smoked Polycarbonate Dome & Optical Glass Lens */}
      <mesh position={[0, -0.04, 0]}>
        <sphereGeometry args={[0.055, 16, 16]} />
        <meshStandardMaterial color="#020617" roughness={0.05} metalness={0.95} />
      </mesh>
      {/* Flashing Green Power/Link LED */}
      <mesh position={[0.05, 0.02, 0.05]}>
        <sphereGeometry args={[0.008, 8, 8]} />
        <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={2.0} />
      </mesh>

      {/* 3D Translucent Glowing Vision Cone (FOV) */}
      {showFOV && (
        <group position={[0, -0.05, 0]} rotation={[0.4, 0, 0]}>
          <mesh position={[0, -1.8, 0.8]}>
            <coneGeometry args={[1.8 * Math.tan((fovAngle * Math.PI) / 360), 3.6, 24, 1, true]} />
            <meshStandardMaterial 
              color="#38bdf8" 
              transparent 
              opacity={0.16} 
              side={THREE.DoubleSide} 
              depthWrite={false}
            />
          </mesh>
          <mesh position={[0, -1.8, 0.8]}>
            <coneGeometry args={[1.8 * Math.tan((fovAngle * Math.PI) / 360), 3.6, 12, 1, true]} />
            <meshBasicMaterial color="#38bdf8" wireframe transparent opacity={0.25} />
          </mesh>
        </group>
      )}

      {/* Interactive Floating Label */}
      <Html position={[0, 0.35, 0]} center distanceFactor={14}>
        <div className="bg-slate-900/90 text-sky-400 text-[10px] font-mono px-2 py-0.5 rounded border border-sky-500/40 shadow-lg whitespace-nowrap cursor-pointer hover:bg-sky-600 hover:text-white transition-colors">
          📷 {name}
        </div>
      </Html>
    </group>
  );
};

// -----------------------------------------------------------------------------
// MAIN DUBLIN TECH HUB SHOWCASE COMPONENT
// -----------------------------------------------------------------------------

export const DublinTechHubShowcase: React.FC<{
  onBackToPortfolio?: () => void;
  onBackToMaquette?: () => void;
  currentLanguage?: LanguageCode;
}> = ({ onBackToPortfolio, onBackToMaquette, currentLanguage = 'en' }) => {
  const handleBack = onBackToMaquette || onBackToPortfolio;
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;
  // Layer Visibility Toggles
  const [layers, setLayers] = useState({
    arch: true,
    electrical: true,
    hvac: true,
    fire: true,
    lighting: true,
    fov: true,
  });

  // Active View Tab
  const [activeTab, setActiveTab] = useState<'3d' | 'audit' | 'clash' | 'boq' | 'pitch'>('3d');

  // Interactive Sliders for Live Audit
  const [cameraCount, setCameraCount] = useState(9);
  const [cableLengthM, setCableLengthM] = useState(65);
  const [cableSizeMm2, setCableSizeMm2] = useState(4.0);
  const [rackCount, setRackCount] = useState(4);
  const [utilizedU, setUtilizedU] = useState(28);

  // Inspector Selection State
  const [selectedElement, setSelectedElement] = useState<{
    title: string;
    category: string;
    spec: string;
    standards: string;
    details: string;
  } | null>({
    title: "42U Heavy-Duty Server Rack (MDF-L3-01)",
    category: "ELV / Structured Cabling",
    spec: "Dual 32A Commando Feeds | 10kVA Online Double-Conversion UPS",
    standards: "TIA-942 Tier III | EN 50174 | BS 7671",
    details: "Configured with 4 x 48-port Cat6A patch panels, 2 x 10GbE Cisco Nexus Core switches, and redundant PDU metering."
  });

  // Live Engineering Calculations (Memoized)
  const auditResults = useMemo(() => {
    // BS 7671 Voltage Drop: Vd = (mV/A/m * Ib * L) / 1000
    // For 4.0mm2 cable, mV/A/m is approx 11.0
    const mvPerAmpMeter = cableSizeMm2 === 2.5 ? 18.0 : (cableSizeMm2 === 4.0 ? 11.0 : (cableSizeMm2 === 6.0 ? 7.3 : 4.4));
    const loadAmps = 24.0; // 24A total load
    const voltDrop = (mvPerAmpMeter * loadAmps * cableLengthM) / 1000.0;
    const voltDropPercent = (voltDrop / 230.0) * 100.0;
    const isVoltDropPass = voltDropPercent <= 3.0;

    // Rack Capacity Headroom (TIA-942: 20% growth)
    const totalRackU = rackCount * 42;
    const totalUsedU = rackCount * utilizedU;
    const rackHeadroomPercent = ((totalRackU - totalUsedU) / totalRackU) * 100.0;
    const isRackPass = rackHeadroomPercent >= 20.0;

    // CCTV NVR Storage: (9 Cams * 6Mbps * 3600 * 24 * 30 days) / (8 * 1024 * 1024) = 17.5 TB
    const requiredStorageTB = ((cameraCount * 6.0 * 3600 * 24 * 30) / (8 * 1024 * 1024)).toFixed(1);
    const totalPoEBudgetW = cameraCount * 14.5;

    // Overall Compliance Score
    let score = 100;
    if (!isVoltDropPass) score -= 35;
    if (!isRackPass) score -= 25;

    return {
      voltDrop: voltDrop.toFixed(2),
      voltDropPercent: voltDropPercent.toFixed(2),
      isVoltDropPass,
      rackHeadroomPercent: rackHeadroomPercent.toFixed(1),
      isRackPass,
      requiredStorageTB,
      totalPoEBudgetW,
      score,
    };
  }, [cameraCount, cableLengthM, cableSizeMm2, rackCount, utilizedU]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-sky-500 selection:text-white">
      {/* Top Header Bar */}
      <header className="bg-slate-900/90 backdrop-blur border-b border-slate-800 sticky top-0 z-50 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {handleBack && (
            <button 
              onClick={() => { sound.playClick(); handleBack(); }}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-500 hover:to-sky-500 text-white font-bold text-xs shadow-lg flex items-center gap-2 transition-all hover:scale-105 active:scale-95 border border-sky-400/30 cursor-pointer"
              title={t.dublinAuditView.backToPortfolio}
            >
              <Home className="w-4 h-4" />
              <span>{t.dublinAuditView.backToPortfolio}</span>
            </button>
          )}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-sky-600 to-emerald-500 flex items-center justify-center font-bold text-white shadow-md">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-white flex items-center gap-2">
                <span>Dublin Tech Hub | 7-Story Enterprise Tower</span>
                <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/30">
                  LOD 350 / 400
                </span>
              </h1>
              <p className="text-[11px] text-slate-400">Silicon Docks, Dublin 2 | Multidisciplinary BIM & Engineering QA/QC</p>
            </div>
          </div>
        </div>

        {/* View Tabs */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('3d')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-medium transition-all ${
              activeTab === '3d' ? 'bg-sky-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>3D Interactive BIM</span>
          </button>
          <button
            onClick={() => setActiveTab('audit')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-medium transition-all ${
              activeTab === 'audit' ? 'bg-sky-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Senior Lead QA/QC</span>
          </button>
          <button
            onClick={() => setActiveTab('boq')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-medium transition-all ${
              activeTab === 'boq' ? 'bg-sky-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>BOQ & Cost (€3.45M)</span>
          </button>
          <button
            onClick={() => setActiveTab('pitch')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-medium transition-all ${
              activeTab === 'pitch' ? 'bg-sky-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Interview Pitch Script</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden relative">
        {activeTab === '3d' && (
          <div className="flex-1 relative flex flex-col">
            {/* 3D WebGL Canvas */}
            <div className="flex-1 w-full h-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative">
              <Canvas 
                shadows 
                camera={{ position: [12, 10, 16], fov: 45 }}
                className="w-full h-full cursor-grab active:cursor-grabbing"
              >
                {/* Photorealistic Studio Lighting & Environment */}
                <ambientLight intensity={0.7} />
                <directionalLight 
                  position={[15, 25, 15]} 
                  intensity={1.4} 
                  castShadow 
                  shadow-mapSize-width={2048} 
                  shadow-mapSize-height={2048}
                  shadow-camera-far={60}
                  shadow-camera-left={-20}
                  shadow-camera-right={20}
                  shadow-camera-top={20}
                  shadow-camera-bottom={-20}
                />
                <directionalLight position={[-15, 15, -15]} intensity={0.5} color="#38bdf8" />
                <pointLight position={[0, 4.5, 0]} intensity={0.8} color="#ffffff" />

                {/* Soft Contact Shadows on Ground */}
                <ContactShadows position={[0, -0.01, 0]} opacity={0.65} scale={40} blur={2.2} far={10} color="#000000" />

                {/* 3D SCENE ASSETS */}
                <group position={[0, 0, 0]}>
                  {/* Concrete Floor Slab (Level 3 Enterprise HQ) */}
                  {layers.arch && (
                    <>
                      <mesh position={[0, -0.15, 0]} receiveShadow>
                        <boxGeometry args={[18, 0.3, 14]} />
                        <meshStandardMaterial color="#334155" roughness={0.6} metalness={0.1} />
                      </mesh>
                      {/* Grid Floor Lines */}
                      <gridHelper args={[18, 18, "#0284c7", "#1e293b"]} position={[0, 0.005, 0]} />

                      {/* Structural Concrete Columns (Grid A-D) */}
                      {[-6, 0, 6].map((x) =>
                        [-4.5, 4.5].map((z) => (
                          <mesh key={`${x}-${z}`} position={[x, 1.8, z]} castShadow receiveShadow>
                            <boxGeometry args={[0.5, 3.6, 0.5]} />
                            <meshStandardMaterial color="#475569" roughness={0.5} />
                          </mesh>
                        ))
                      )}

                      {/* MDF Server Room Enclosure (Acoustic Drywalls) */}
                      <mesh position={[-4.5, 1.5, -3.5]} castShadow receiveShadow>
                        <boxGeometry args={[5.5, 3.0, 0.15]} />
                        <meshStandardMaterial color="#1e293b" roughness={0.8} />
                      </mesh>
                      <mesh position={[-1.75, 1.5, -5.2]} castShadow receiveShadow>
                        <boxGeometry args={[0.15, 3.0, 3.5]} />
                        <meshStandardMaterial color="#1e293b" roughness={0.8} />
                      </mesh>

                      {/* Executive Boardroom Glass Partitions */}
                      <mesh position={[4.5, 1.5, 3.5]}>
                        <boxGeometry args={[6.5, 3.0, 0.08]} />
                        <meshStandardMaterial color="#38bdf8" transparent opacity={0.25} roughness={0.1} />
                      </mesh>
                    </>
                  )}

                  {/* Ergonomic Workstations in Open Office */}
                  {layers.arch && (
                    <>
                      <WorkstationPod3D position={[-3.5, 0, 2.5]} rotationY={0} />
                      <WorkstationPod3D position={[0.5, 0, 2.5]} rotationY={0} />
                      <WorkstationPod3D position={[-3.5, 0, -0.5]} rotationY={0} />
                      <WorkstationPod3D position={[0.5, 0, -0.5]} rotationY={0} />
                      <Boardroom3D position={[4.5, 0, 3.5]} />
                    </>
                  )}

                  {/* MDF DATA CENTER: 4x 42U Server Racks, InRow CRAC & FM-200 */}
                  {layers.electrical && (
                    <group position={[-4.5, 0, -5.0]}>
                      {Array.from({ length: rackCount }).map((_, rIdx) => (
                        <ServerRack42U 
                          key={rIdx} 
                          position={[(rIdx * 0.95) - 1.4, 0, 0]} 
                          rackId={`MDF-0${rIdx + 1}`}
                          utilizedU={utilizedU}
                          tempC={21.4}
                        />
                      ))}
                      {/* InRow Precision CRAC Cooling Unit */}
                      {layers.hvac && <InRowCRAC3D position={[1.8, 0, 0]} />}
                      {/* FM-200 Clean Agent Fire Suppression */}
                      {layers.fire && <FM200GasBattery3D position={[-2.2, 0, 0]} />}
                    </group>
                  )}

                  {/* OVERHEAD MEP SERVICES (Ceiling Void) */}
                  {/* HVAC Galvanized Steel Ducts */}
                  {layers.hvac && (
                    <group position={[0, 3.2, 0]}>
                      {/* Main Supply Header */}
                      <mesh position={[0, 0, 0]} castShadow>
                        <boxGeometry args={[16, 0.35, 0.55]} />
                        <meshStandardMaterial color="#0284c7" metalness={0.8} roughness={0.25} />
                      </mesh>
                      {/* Branch Ducts */}
                      {[-5, 0, 5].map((bx) => (
                        <mesh key={bx} position={[bx, 0, 2.2]} castShadow>
                          <boxGeometry args={[0.35, 0.25, 4.2]} />
                          <meshStandardMaterial color="#0284c7" metalness={0.8} roughness={0.25} />
                        </mesh>
                      ))}
                    </group>
                  )}

                  {/* Perforated Cable Trays (Electrical & Structured Cabling) */}
                  {layers.electrical && (
                    <group position={[0, 2.9, 0]}>
                      <mesh position={[0, 0, -2.0]} castShadow>
                        <boxGeometry args={[17, 0.06, 0.35]} />
                        <meshStandardMaterial color="#e2e8f0" metalness={0.9} roughness={0.3} />
                      </mesh>
                      {/* Blue Cat6A Data Bundles */}
                      <mesh position={[0, 0.04, -2.0]}>
                        <boxGeometry args={[16.8, 0.02, 0.15]} />
                        <meshStandardMaterial color="#3b82f6" />
                      </mesh>
                      {/* Orange 230V Power Feeds */}
                      <mesh position={[0, 0.04, -1.88]}>
                        <boxGeometry args={[16.8, 0.02, 0.08]} />
                        <meshStandardMaterial color="#f97316" />
                      </mesh>
                    </group>
                  )}

                  {/* Red Fire Sprinkler Pipes */}
                  {layers.fire && (
                    <group position={[0, 3.45, 0]}>
                      <mesh position={[0, 0, 3.5]} rotation={[0, 0, Math.PI / 2]}>
                        <cylinderGeometry args={[0.035, 0.035, 16, 16]} />
                        <meshStandardMaterial color="#dc2626" metalness={0.7} />
                      </mesh>
                    </group>
                  )}

                  {/* DALI-2 LED Panels (500 Lux Array) */}
                  {layers.lighting && (
                    <group position={[0, 3.15, 0]}>
                      {[-4, 0, 4].map((lx) =>
                        [-2, 1, 4].map((lz) => (
                          <mesh key={`${lx}-${lz}`} position={[lx, 0, lz]}>
                            <boxGeometry args={[0.6, 0.03, 0.6]} />
                            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1.2} />
                          </mesh>
                        ))
                      )}
                    </group>
                  )}

                  {/* 4MP IP CCTV Surveillance Cameras with Vision Cones */}
                  {layers.electrical && (
                    <>
                      <CCTVCamera3D 
                        position={[-7.5, 3.1, 4.5]} 
                        rotationY={-0.6} 
                        fovAngle={90} 
                        showFOV={layers.fov}
                        name="CAM-L3-01 (Turnstiles)"
                        onClick={() => setSelectedElement({
                          title: "CAM-L3-01 Varifocal 4MP CCTV",
                          category: "Security & ELV",
                          spec: "4MP @ 30fps | H.265+ | 2.8-12mm Motorized Lens | PoE 802.3af (12.5W)",
                          standards: "BS EN 62676-4 | TIA-942 | ISO 19650",
                          details: "Monitors main elevator lobby and turnstiles with 100% facial recognition pixel density (250 ppm)."
                        })}
                      />
                      <CCTVCamera3D 
                        position={[-1.6, 3.1, -3.2]} 
                        rotationY={3.14} 
                        fovAngle={110} 
                        showFOV={layers.fov}
                        name="CAM-L3-02 (MDF Corridor)"
                        onClick={() => setSelectedElement({
                          title: "CAM-L3-02 PTZ Corridor Camera",
                          category: "Security & ELV",
                          spec: "4MP Ultra-Low Light DarkFighter | IR 50m | IK10 Vandal-Proof",
                          standards: "BS EN 62676-4 | EN 50131 Grade 3",
                          details: "Protects high-security MDF Data Center access door with real-time video analytics and intrusion tripwire."
                        })}
                      />
                      <CCTVCamera3D 
                        position={[1.5, 3.1, 1.5]} 
                        rotationY={0.8} 
                        fovAngle={90} 
                        showFOV={layers.fov}
                        name="CAM-L3-03 (Open Office)"
                        onClick={() => setSelectedElement({
                          title: "CAM-L3-03 Panoramic 360 Camera",
                          category: "Security & ELV",
                          spec: "6MP 360° Fisheye Panoramic | Hardware Dewarping | Client Analytics",
                          standards: "BS EN 62676-4 | CIBSE LG7",
                          details: "Provides complete visual coverage of Level 3 agile workstation benches with zero optical blind spots."
                        })}
                      />
                    </>
                  )}
                </group>

                {/* Smooth Camera Navigation Controls */}
                <OrbitControls 
                  makeDefault 
                  minDistance={4} 
                  maxDistance={32} 
                  maxPolarAngle={Math.PI / 2.05} 
                  dampingFactor={0.06}
                />
              </Canvas>

              {/* 3D Discipline Layer Toggles Overlay (Top Right) */}
              <div className="absolute top-4 right-4 bg-slate-900/90 backdrop-blur border border-slate-800 p-3 rounded-2xl shadow-2xl flex flex-col gap-2 z-10 w-56">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-sky-400" />
                  <span>3D Discipline Layers</span>
                </span>
                
                <div className="space-y-1.5 text-xs">
                  <label className="flex items-center justify-between p-1.5 rounded-lg hover:bg-slate-800/60 cursor-pointer">
                    <span className="flex items-center gap-2">
                      <Building2 className="w-3.5 h-3.5 text-slate-400" />
                      <span>Architecture & Slabs</span>
                    </span>
                    <input 
                      type="checkbox" 
                      checked={layers.arch} 
                      onChange={(e) => setLayers(l => ({ ...l, arch: e.target.checked }))}
                      className="rounded bg-slate-800 border-slate-700 text-sky-500 focus:ring-0"
                    />
                  </label>
                  
                  <label className="flex items-center justify-between p-1.5 rounded-lg hover:bg-slate-800/60 cursor-pointer">
                    <span className="flex items-center gap-2">
                      <Server className="w-3.5 h-3.5 text-emerald-400" />
                      <span>42U Server Racks & Trays</span>
                    </span>
                    <input 
                      type="checkbox" 
                      checked={layers.electrical} 
                      onChange={(e) => setLayers(l => ({ ...l, electrical: e.target.checked }))}
                      className="rounded bg-slate-800 border-slate-700 text-sky-500 focus:ring-0"
                    />
                  </label>

                  <label className="flex items-center justify-between p-1.5 rounded-lg hover:bg-slate-800/60 cursor-pointer">
                    <span className="flex items-center gap-2">
                      <Wind className="w-3.5 h-3.5 text-sky-400" />
                      <span>HVAC Ducts & CRAC</span>
                    </span>
                    <input 
                      type="checkbox" 
                      checked={layers.hvac} 
                      onChange={(e) => setLayers(l => ({ ...l, hvac: e.target.checked }))}
                      className="rounded bg-slate-800 border-slate-700 text-sky-500 focus:ring-0"
                    />
                  </label>

                  <label className="flex items-center justify-between p-1.5 rounded-lg hover:bg-slate-800/60 cursor-pointer">
                    <span className="flex items-center gap-2">
                      <Flame className="w-3.5 h-3.5 text-rose-400" />
                      <span>Fire Sprinklers & FM-200</span>
                    </span>
                    <input 
                      type="checkbox" 
                      checked={layers.fire} 
                      onChange={(e) => setLayers(l => ({ ...l, fire: e.target.checked }))}
                      className="rounded bg-slate-800 border-slate-700 text-sky-500 focus:ring-0"
                    />
                  </label>

                  <label className="flex items-center justify-between p-1.5 rounded-lg hover:bg-slate-800/60 cursor-pointer">
                    <span className="flex items-center gap-2">
                      <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                      <span>DALI-2 500 Lux Lighting</span>
                    </span>
                    <input 
                      type="checkbox" 
                      checked={layers.lighting} 
                      onChange={(e) => setLayers(l => ({ ...l, lighting: e.target.checked }))}
                      className="rounded bg-slate-800 border-slate-700 text-sky-500 focus:ring-0"
                    />
                  </label>

                  <label className="flex items-center justify-between p-1.5 rounded-lg hover:bg-slate-800/60 cursor-pointer">
                    <span className="flex items-center gap-2">
                      <Video className="w-3.5 h-3.5 text-indigo-400" />
                      <span>3D CCTV Vision Cones</span>
                    </span>
                    <input 
                      type="checkbox" 
                      checked={layers.fov} 
                      onChange={(e) => setLayers(l => ({ ...l, fov: e.target.checked }))}
                      className="rounded bg-slate-800 border-slate-700 text-sky-500 focus:ring-0"
                    />
                  </label>
                </div>
              </div>

              {/* BIM Property Inspector Card (Bottom Left) */}
              {selectedElement && (
                <div className="absolute bottom-4 left-4 bg-slate-900/95 backdrop-blur border border-slate-800 p-4 rounded-2xl shadow-2xl z-10 max-w-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono bg-sky-500/20 text-sky-400 px-2 py-0.5 rounded border border-sky-500/30">
                      {selectedElement.category}
                    </span>
                    <button 
                      onClick={() => setSelectedElement(null)}
                      className="text-slate-500 hover:text-slate-300 text-xs"
                    >
                      ✕
                    </button>
                  </div>
                  <h3 className="text-sm font-bold text-white mb-1">{selectedElement.title}</h3>
                  <p className="text-xs text-slate-300 font-mono mb-2 bg-slate-950 p-2 rounded border border-slate-800">
                    {selectedElement.spec}
                  </p>
                  <p className="text-[11px] text-slate-400 mb-2 leading-relaxed">{selectedElement.details}</p>
                  <div className="text-[10px] text-emerald-400 flex items-center gap-1 font-semibold">
                    <CheckCheck className="w-3.5 h-3.5" />
                    <span>Standards: {selectedElement.standards}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* QA/QC Engineering Audit Tab */}
        {activeTab === 'audit' && (
          <div className="flex-1 p-8 overflow-y-auto bg-slate-950">
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <ShieldCheck className="w-6 h-6 text-emerald-400" />
                    <span>Lead Senior Multi-Trade Audit Engine</span>
                  </h2>
                  <p className="text-sm text-slate-400 mt-1">Real-time BS 7671, TIA-942, and ASHRAE TC 9.9 Engineering Rule Verification</p>
                </div>
                <div className="bg-slate-900 px-4 py-2 rounded-2xl border border-slate-800 text-right">
                  <span className="text-xs text-slate-400">Total Compliance Score</span>
                  <div className={`text-2xl font-bold ${auditResults.score === 100 ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {auditResults.score}%
                  </div>
                </div>
              </div>

              {/* Interactive Audit Sliders */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-slate-300">Feed Cable Length:</span>
                    <span className="font-mono text-sky-400 font-bold">{cableLengthM} Meters</span>
                  </div>
                  <input 
                    type="range" 
                    min={20} 
                    max={120} 
                    value={cableLengthM} 
                    onChange={(e) => setCableLengthM(Number(e.target.value))}
                    className="w-full accent-sky-500"
                  />
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>20m (Near DB)</span>
                    <span>120m (Far Riser)</span>
                  </div>
                </div>

                <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-slate-300">Conductor Cross-Section:</span>
                    <span className="font-mono text-emerald-400 font-bold">{cableSizeMm2} mm² Cu</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {[2.5, 4.0, 6.0, 10.0].map((size) => (
                      <button
                        key={size}
                        onClick={() => setCableSizeMm2(size)}
                        className={`py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                          cableSizeMm2 === size 
                            ? 'bg-sky-600 text-white shadow' 
                            : 'bg-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {size}mm²
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-slate-300">42U MDF Server Racks:</span>
                    <span className="font-mono text-sky-400 font-bold">{rackCount} Racks</span>
                  </div>
                  <input 
                    type="range" 
                    min={2} 
                    max={8} 
                    value={rackCount} 
                    onChange={(e) => setRackCount(Number(e.target.value))}
                    className="w-full accent-sky-500"
                  />
                </div>

                <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-slate-300">Utilized U per Rack:</span>
                    <span className="font-mono text-emerald-400 font-bold">{utilizedU} U / 42U</span>
                  </div>
                  <input 
                    type="range" 
                    min={10} 
                    max={42} 
                    value={utilizedU} 
                    onChange={(e) => setUtilizedU(Number(e.target.value))}
                    className="w-full accent-emerald-500"
                  />
                </div>
              </div>

              {/* Compliance Verification Results */}
              <div className="space-y-3">
                <div className={`p-4 rounded-2xl border flex items-center justify-between ${
                  auditResults.isVoltDropPass 
                    ? 'bg-emerald-950/20 border-emerald-500/30' 
                    : 'bg-rose-950/30 border-rose-500/40'
                }`}>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">BS 7671 Voltage Drop Compliance</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        auditResults.isVoltDropPass ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                      }`}>
                        {auditResults.isVoltDropPass ? 'PASS (≤ 3.0%)' : 'WARNING (> 3.0%)'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">
                      Calculated Voltage Drop: <strong className="text-white">{auditResults.voltDrop} V</strong> ({auditResults.voltDropPercent}% drop over {cableLengthM}m with {cableSizeMm2}mm² Cu).
                    </p>
                  </div>
                </div>

                <div className={`p-4 rounded-2xl border flex items-center justify-between ${
                  auditResults.isRackPass 
                    ? 'bg-emerald-950/20 border-emerald-500/30' 
                    : 'bg-rose-950/30 border-rose-500/40'
                }`}>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">TIA-942 Data Center Expansion Headroom</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        auditResults.isRackPass ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                      }`}>
                        {auditResults.isRackPass ? 'PASS (≥ 20%)' : 'FAIL (< 20%)'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">
                      Spare Capacity: <strong className="text-white">{auditResults.rackHeadroomPercent}%</strong> free rack U remaining across {rackCount} racks.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl border bg-slate-900/60 border-slate-800 flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="font-bold text-white text-sm">30-Day NVR Storage & PoE Power Budget</span>
                    <p className="text-xs text-slate-400">
                      Storage: <strong className="text-sky-400">{auditResults.requiredStorageTB} TB RAID-6</strong> | Total PoE Load: <strong className="text-emerald-400">{auditResults.totalPoEBudgetW} Watts</strong>.
                    </p>
                  </div>
                  <span className="text-xs font-mono bg-slate-800 text-slate-300 px-3 py-1 rounded-lg">
                    EN 62676
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bill of Quantities (BOQ) Tab */}
        {activeTab === 'boq' && (
          <div className="flex-1 p-8 overflow-y-auto bg-slate-950">
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <DollarSign className="w-6 h-6 text-emerald-400" />
                    <span>Bill of Quantities (BOQ) - Dublin Tech Hub Fit-Out</span>
                  </h2>
                  <p className="text-sm text-slate-400 mt-1">LOD 350 Multi-Discipline Commercial Valuation (€ EUR)</p>
                </div>
                <div className="bg-emerald-950/40 border border-emerald-500/40 px-4 py-2 rounded-2xl">
                  <span className="text-xs text-emerald-300">Total Fit-Out Value</span>
                  <div className="text-2xl font-bold text-emerald-400">€3,458,400</div>
                </div>
              </div>

              <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 font-mono border-b border-slate-800">
                    <tr>
                      <th className="p-3">Discipline / Code</th>
                      <th className="p-3">Description</th>
                      <th className="p-3">Qty</th>
                      <th className="p-3">Rate (€)</th>
                      <th className="p-3 text-right">Total (€)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    <tr>
                      <td className="p-3 font-mono text-sky-400">ELV-01</td>
                      <td className="p-3">42U Heavy-Duty Server Racks (MDF) + Dual Commando Power</td>
                      <td className="p-3">4 Nos</td>
                      <td className="p-3">€4,800</td>
                      <td className="p-3 text-right font-mono font-bold text-white">€19,200</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-mono text-sky-400">ELV-02</td>
                      <td className="p-3">4MP IP CCTV Matrix + 3D FOV Configuration + 30-Day NVR</td>
                      <td className="p-3">9 Nos</td>
                      <td className="p-3">€1,450</td>
                      <td className="p-3 text-right font-mono font-bold text-white">€13,050</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-mono text-sky-400">MEP-01</td>
                      <td className="p-3">InRow 18kW Precision Direct Expansion CRAC Air Conditioning</td>
                      <td className="p-3">2 Nos</td>
                      <td className="p-3">€16,500</td>
                      <td className="p-3 text-right font-mono font-bold text-white">€33,000</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-mono text-sky-400">MEP-02</td>
                      <td className="p-3">Galvanized Supply/Return Ductwork + VAV Boxes & Diffusers</td>
                      <td className="p-3">480 m²</td>
                      <td className="p-3">€125</td>
                      <td className="p-3 text-right font-mono font-bold text-white">€60,000</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-mono text-sky-400">FIR-01</td>
                      <td className="p-3">FM-200 / Novec 1230 Total Flooding Clean Agent Suppression</td>
                      <td className="p-3">1 Set</td>
                      <td className="p-3">€28,500</td>
                      <td className="p-3 text-right font-mono font-bold text-white">€28,500</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-mono text-sky-400">ARC-01</td>
                      <td className="p-3">Agile Dual-Monitor Workstations + Mesh Chairs + Power Spines</td>
                      <td className="p-3">40 Pods</td>
                      <td className="p-3">€1,850</td>
                      <td className="p-3 text-right font-mono font-bold text-white">€74,000</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-mono text-sky-400">ARC-02</td>
                      <td className="p-3">Executive Boardroom 16-Seat Walnut Suite + 85" 4K Video Conf</td>
                      <td className="p-3">1 Suite</td>
                      <td className="p-3">€32,000</td>
                      <td className="p-3 text-right font-mono font-bold text-white">€32,000</td>
                    </tr>
                    <tr className="bg-slate-950/80 font-bold">
                      <td colSpan={4} className="p-3 text-right text-emerald-400">Total Direct Fit-Out Investment:</td>
                      <td className="p-3 text-right font-mono text-emerald-400 text-sm">€3,458,400</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Pitch Script Tab */}
        {activeTab === 'pitch' && (
          <div className="flex-1 p-8 overflow-y-auto bg-slate-950">
            <div className="max-w-3xl mx-auto space-y-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <FileText className="w-6 h-6 text-sky-400" />
                <span>Executive Pitch Script (For Irish Senior Engineering Interviews)</span>
              </h2>

              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="text-sm font-bold text-sky-400 uppercase tracking-wider">30-Second Elevator Pitch</h3>
                <p className="text-sm text-slate-300 leading-relaxed italic bg-slate-950 p-4 rounded-xl border border-slate-800">
                  "In traditional workflows, delivering a coordinated multi-trade LOD 350 BIM model for an enterprise tech tenant takes 3 to 4 weeks across fragmented architectural and MEP teams. 
                  By combining deep BIM standards with our custom AI-accelerated generative automation engine, we delivered this complete 7-story commercial fit-out—including TIA-942 server room infrastructure, BS 7671 electrical audits, InRow cooling, and 0-clash spatial coordination—in <strong>under 3 business days</strong> with 100% code compliance."
                </p>
              </div>

              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-3">
                <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider">Key Differentiators to Highlight</h3>
                <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside">
                  <li><strong>Zero Spatial Hard Clashes:</strong> Verified clearance matrix between HVAC ducts, perforated cable trays, and sprinkler heads under ISO 19650.</li>
                  <li><strong>Automated BS 7671 & TIA-942 Compliance:</strong> Real-time voltage drop calculations (&lt; 3.0%) and 20% rack expansion headroom.</li>
                  <li><strong>LOD 350 Detail:</strong> Explicit modeling of server blade LEDs, InRow cooling units, DALI-2 troffers, and 3D CCTV vision cones.</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
