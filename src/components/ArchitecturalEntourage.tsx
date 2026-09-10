import React, { useMemo } from 'react';
import * as THREE from 'three';

interface ArchitecturalEntourageProps {
  lightingMode: 'day' | 'sunset' | 'night';
}

// Stylized Architectural Scale Figure (1:300 Scale, ~1.75m Real Height = 0.22 World Units)
const ScaleFigure: React.FC<{
  position: [number, number, number];
  rotation?: number;
  color?: string;
  isWalking?: boolean;
  isNight?: boolean;
}> = ({
  position,
  rotation = 0,
  color = '#cbd5e1',
  isWalking = true,
  isNight = false
}) => {
  const figureColor = isNight ? '#94a3b8' : color;

  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {/* Head */}
      <mesh position={[0, 0.20, 0]} castShadow>
        <sphereGeometry args={[0.022, 12, 12]} />
        <meshStandardMaterial color={figureColor} roughness={0.4} metalness={0.1} />
      </mesh>

      {/* Torso & Shoulders */}
      <mesh position={[0, 0.135, 0]} castShadow>
        <boxGeometry args={[0.05, 0.09, 0.03]} />
        <meshStandardMaterial color={figureColor} roughness={0.4} metalness={0.1} />
      </mesh>

      {/* Legs (Standing or Walking Stride) */}
      {isWalking ? (
        <>
          <mesh position={[0.014, 0.05, 0.015]} rotation={[0.2, 0, 0]} castShadow>
            <boxGeometry args={[0.018, 0.09, 0.02]} />
            <meshStandardMaterial color={figureColor} roughness={0.5} />
          </mesh>
          <mesh position={[-0.014, 0.05, -0.015]} rotation={[-0.2, 0, 0]} castShadow>
            <boxGeometry args={[0.018, 0.09, 0.02]} />
            <meshStandardMaterial color={figureColor} roughness={0.5} />
          </mesh>
        </>
      ) : (
        <mesh position={[0, 0.05, 0]} castShadow>
          <boxGeometry args={[0.04, 0.09, 0.024]} />
          <meshStandardMaterial color={figureColor} roughness={0.5} />
        </mesh>
      )}

      {/* Ground Contact Shadow Disk */}
      <mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.045, 12]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.35} />
      </mesh>
    </group>
  );
};

// Sleek Modern Architectural Streetlamp Post with Downward Night Illumination
const StreetLamp: React.FC<{
  position: [number, number, number];
  rotation?: number;
  isNight: boolean;
}> = ({ position, rotation = 0, isNight }) => {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {/* Vertical Sleek Metallic Pole (Height ~ 3.5m = 0.45 Units) */}
      <mesh position={[0, 0.225, 0]} castShadow>
        <cylinderGeometry args={[0.012, 0.015, 0.45, 8]} />
        <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Horizontal Luminaire Arm */}
      <mesh position={[0.06, 0.44, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.008, 0.008, 0.12, 8]} />
        <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Modern Fixture Head */}
      <mesh position={[0.11, 0.435, 0]}>
        <boxGeometry args={[0.04, 0.015, 0.025]} />
        <meshStandardMaterial 
          color={isNight ? '#fbbf24' : '#64748b'} 
          emissive={isNight ? '#fbbf24' : '#000000'}
          emissiveIntensity={isNight ? 3.5 : 0}
        />
      </mesh>

      {/* Active Warm Night Illumination Cone & Point Light */}
      {isNight && (
        <>
          <pointLight 
            position={[0.11, 0.40, 0]} 
            intensity={2.8} 
            color="#fbbf24" 
            distance={5.5} 
            decay={2} 
          />
          {/* Subtle Light Pool on Ground */}
          <mesh position={[0.11, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.85, 24]} />
            <meshBasicMaterial color="#fbbf24" transparent opacity={0.14} />
          </mesh>
        </>
      )}
    </group>
  );
};

// Pedestrian Figures Scattered Across Plazas, Sidewalks, and Entrances
const PEOPLE_COORDINATES: {
  pos: [number, number, number];
  rot: number;
  walking: boolean;
  color: string;
}[] = [
  // 1. Dublin Tech Hub 7-Story Tower Plaza & Entrance (Zone 05)
  { pos: [5.6, 0.04, 5.5], rot: 0.8, walking: true, color: '#f8fafc' },
  { pos: [5.9, 0.04, 5.8], rot: 0.5, walking: false, color: '#3b82f6' },
  { pos: [6.1, 0.04, 5.9], rot: 2.2, walking: false, color: '#e2e8f0' },
  { pos: [6.8, 0.04, 5.2], rot: -0.6, walking: true, color: '#64748b' },
  { pos: [7.2, 0.04, 5.6], rot: 1.4, walking: true, color: '#f8fafc' },
  { pos: [6.4, 0.04, 7.2], rot: -1.2, walking: true, color: '#059669' },
  { pos: [5.2, 0.04, 6.4], rot: 0.3, walking: true, color: '#f1f5f9' },

  // 2. Commercial Mall & Outdoor Cafe Terrace (Zone 03)
  { pos: [-0.4, 0.04, -0.6], rot: 1.1, walking: true, color: '#f59e0b' },
  { pos: [-0.7, 0.04, -0.9], rot: -0.4, walking: false, color: '#f8fafc' },
  { pos: [-1.2, 0.04, -1.4], rot: 2.5, walking: true, color: '#475569' },
  { pos: [-1.6, 0.04, -0.8], rot: -1.8, walking: true, color: '#e2e8f0' },
  { pos: [-0.1, 0.04, 0.4], rot: 0.2, walking: true, color: '#38bdf8' },
  { pos: [-1.8, 0.04, -2.1], rot: 1.6, walking: false, color: '#f8fafc' },
  { pos: [-2.2, 0.04, -1.8], rot: -1.4, walking: false, color: '#94a3b8' },

  // 3. Main Central Street & Sidewalk Crossings
  { pos: [1.8, 0.04, 1.2], rot: 0.1, walking: true, color: '#f8fafc' },
  { pos: [2.2, 0.04, 1.6], rot: 0.15, walking: true, color: '#64748b' },
  { pos: [3.4, 0.04, 2.5], rot: -1.5, walking: true, color: '#f8fafc' },
  { pos: [3.8, 0.04, 2.8], rot: -1.3, walking: true, color: '#2563eb' },
  { pos: [4.5, 0.04, 3.8], rot: 0.4, walking: true, color: '#e2e8f0' },
  { pos: [1.2, 0.04, -0.5], rot: -0.8, walking: true, color: '#f8fafc' },
  { pos: [2.8, 0.04, -1.2], rot: 2.1, walking: true, color: '#475569' },

  // 4. Urban Design Port Promenade (Zone 01)
  { pos: [-6.2, 0.04, -5.2], rot: 0.6, walking: true, color: '#0284c7' },
  { pos: [-6.8, 0.04, -5.8], rot: -0.9, walking: false, color: '#f8fafc' },
  { pos: [-7.4, 0.04, -6.5], rot: 1.2, walking: true, color: '#cbd5e1' },
  { pos: [-7.8, 0.04, -5.2], rot: -1.6, walking: true, color: '#e2e8f0' },

  // 5. Residential Villas Pathway (Zone 02)
  { pos: [-5.4, 0.04, 10.8], rot: 1.2, walking: true, color: '#10b981' },
  { pos: [-5.8, 0.04, 11.5], rot: -0.5, walking: true, color: '#f8fafc' },
  { pos: [-6.5, 0.04, 12.2], rot: 0.8, walking: false, color: '#475569' },

  // 6. Cultural Pavilion & Competition Landmark (Zone 04)
  { pos: [6.6, 0.04, 14.8], rot: 1.5, walking: true, color: '#8b5cf6' },
  { pos: [7.2, 0.04, 15.6], rot: -0.7, walking: false, color: '#f8fafc' },
  { pos: [7.6, 0.04, 16.2], rot: 2.1, walking: true, color: '#e2e8f0' }
];

// Streetlamp Positions Along the Central Avenue & Plazas
const STREETLAMP_POSITIONS: [number, number, number, number][] = [
  // [x, y, z, rotation]
  [4.8, 0.02, 4.8, Math.PI / 4],
  [5.2, 0.02, 6.8, Math.PI / 3],
  [2.2, 0.02, 2.2, Math.PI / 4],
  [0.5, 0.02, 0.5, Math.PI / 4],
  [-1.2, 0.02, -1.2, Math.PI / 4],
  [-3.0, 0.02, -3.0, Math.PI / 4],
  [3.2, 0.02, -0.8, -Math.PI / 4],
  [5.0, 0.02, 1.2, -Math.PI / 4],
  [6.8, 0.02, 13.5, Math.PI / 2],
  [-4.8, 0.02, 9.8, -Math.PI / 3],
  [-5.8, 0.02, -4.5, Math.PI / 2]
];

export const ArchitecturalEntourage: React.FC<ArchitecturalEntourageProps> = ({ lightingMode }) => {
  const isNight = lightingMode === 'night';

  return (
    <group position={[0, 0, 0]}>
      {/* 1. Scale Human Figures (Pedestrians, Professionals, Visitors) */}
      {PEOPLE_COORDINATES.map((person, idx) => (
        <ScaleFigure
          key={idx}
          position={person.pos}
          rotation={person.rot}
          color={person.color}
          isWalking={person.walking}
          isNight={isNight}
        />
      ))}

      {/* 2. Architectural Streetlamps & Night Light Pools */}
      {STREETLAMP_POSITIONS.map(([x, y, z, rot], idx) => (
        <StreetLamp
          key={idx}
          position={[x, y, z]}
          rotation={rot}
          isNight={isNight}
        />
      ))}
    </group>
  );
};
