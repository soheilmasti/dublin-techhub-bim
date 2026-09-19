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
        <cylinderGeometry args={[0.012, 0.016, 0.45, 8]} />
        <meshStandardMaterial color="#1e293b" metalness={0.85} roughness={0.25} />
      </mesh>

      {/* Horizontal Luminaire Arm */}
      <mesh position={[0.06, 0.44, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.008, 0.008, 0.12, 8]} />
        <meshStandardMaterial color="#1e293b" metalness={0.85} roughness={0.25} />
      </mesh>

      {/* Modern Fixture Head */}
      <mesh position={[0.11, 0.435, 0]}>
        <boxGeometry args={[0.045, 0.016, 0.028]} />
        <meshStandardMaterial 
          color={isNight ? '#fde047' : '#64748b'} 
          emissive={isNight ? '#fde047' : '#000000'}
          emissiveIntensity={isNight ? 6.0 : 0}
          toneMapped={false}
        />
      </mesh>

      {/* Active Warm Night Illumination: PointLight & Street Floor Glow */}
      {isNight && (
        <>
          <pointLight 
            position={[0.11, 0.38, 0]} 
            intensity={4.2} 
            color="#fbbf24" 
            distance={5.5} 
            decay={1.8} 
            castShadow
          />
          {/* Warm Illumination pool on street asphalt/pavement */}
          <mesh position={[0.11, 0.008, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.75, 24]} />
            <meshBasicMaterial color="#fbbf24" transparent opacity={0.24} depthWrite={false} />
          </mesh>
        </>
      )}
    </group>
  );
};

// Pedestrian Figures Flush on Actual Street, Sidewalk, and Plaza Pavement
const PEOPLE_COORDINATES: {
  pos: [number, number, number];
  rot: number;
  walking: boolean;
  color: string;
}[] = [
  // 1. Central Avenue & Crossings (on Blacktop_New & Polished_Concrete_New sidewalks)
  { pos: [2.2, 1.111, 1.5], rot: 0.15, walking: true, color: '#f8fafc' },
  { pos: [2.8, 1.055, 2.8], rot: -1.2, walking: true, color: '#3b82f6' },
  { pos: [3.4, 1.032, 3.4], rot: 0.4, walking: true, color: '#64748b' },
  { pos: [4.0, 1.011, 4.0], rot: -1.5, walking: true, color: '#e2e8f0' },
  { pos: [1.5, 1.189, -0.5], rot: 1.8, walking: true, color: '#f8fafc' },
  { pos: [2.0, 1.165, -1.8], rot: -0.6, walking: false, color: '#475569' },

  // 2. Dublin Tech Hub Tower Plaza & Entrance (Zone 03) (on Blacktop_New & Plaza)
  { pos: [4.8, 0.973, 5.5], rot: 0.8, walking: true, color: '#f8fafc' },
  { pos: [5.0, 0.987, 5.0], rot: 0.5, walking: false, color: '#3b82f6' },
  { pos: [5.2, 0.941, 6.4], rot: -1.2, walking: true, color: '#059669' },
  { pos: [4.2, 0.938, 6.8], rot: 1.4, walking: true, color: '#f1f5f9' },
  { pos: [3.8, 0.998, 5.0], rot: 2.2, walking: false, color: '#e2e8f0' },

  // 3. Commercial Mall & Outdoor Terraces (Zone 04) (on Polished_Concrete_New)
  { pos: [-2.5, 1.690, 1.5], rot: 1.1, walking: true, color: '#f59e0b' },
  { pos: [-2.8, 1.670, 2.0], rot: -0.4, walking: false, color: '#f8fafc' },
  { pos: [-2.5, 1.706, 1.0], rot: 2.5, walking: true, color: '#475569' },
  { pos: [-2.5, 1.719, 0.5], rot: -1.8, walking: true, color: '#e2e8f0' },
  { pos: [-3.0, 1.746, -0.5], rot: 0.2, walking: false, color: '#94a3b8' },

  // 4. Residential Villas Pathway (Zone 02) (on Concrete_Stamped_Ashlar)
  { pos: [-4.8, 1.537, 9.8], rot: 1.2, walking: true, color: '#10b981' },
  { pos: [-5.4, 1.549, 10.8], rot: -0.5, walking: true, color: '#f8fafc' },
  { pos: [-5.8, 1.598, 11.5], rot: 0.8, walking: false, color: '#475569' },
  { pos: [-6.2, 1.683, 12.0], rot: 1.6, walking: true, color: '#cbd5e1' },

  // 5. Urban Design Port Promenade (Zone 01) (on Concrete_Stamped_Ashlar)
  { pos: [-5.8, 1.875, -4.5], rot: 0.6, walking: true, color: '#0284c7' },
  { pos: [-6.4, 1.877, -5.2], rot: -0.9, walking: false, color: '#f8fafc' },
  { pos: [-7.0, 1.909, -5.8], rot: 1.2, walking: true, color: '#cbd5e1' },
  { pos: [-7.5, 1.957, -6.5], rot: -1.6, walking: true, color: '#e2e8f0' },

  // 6. Cultural Pavilion Landmark Area (Zone 05) (on Blacktop_New)
  { pos: [5.0, 0.817, 11.8], rot: 1.5, walking: true, color: '#8b5cf6' },
  { pos: [5.5, 0.791, 12.5], rot: -0.7, walking: false, color: '#f8fafc' },
  { pos: [6.2, 0.743, 13.5], rot: 2.1, walking: true, color: '#e2e8f0' }
];

// Streetlamp Positions Flush on Street Level Along Avenues, Sidewalks & Plazas
const STREETLAMP_POSITIONS: [number, number, number, number][] = [
  // [x, y, z, rotation]
  // 1. Central Avenue & Tower Area (on Blacktop_New & Concrete Sidewalks)
  [4.8, 0.973, 5.5, Math.PI / 4],
  [4.2, 0.938, 6.8, Math.PI / 3],
  [2.5, 1.073, 2.5, Math.PI / 4],
  [3.0, 1.044, 3.0, Math.PI / 4],
  [2.0, 1.121, 0.0, Math.PI / 4],
  [1.5, 1.186, -0.5, Math.PI / 4],
  [2.5, 1.165, -2.0, -Math.PI / 4],

  // 2. West Commercial Plaza (on Polished_Concrete_New & Blacktop_New)
  [-2.5, 1.674, 2.0, -Math.PI / 4],
  [-3.0, 1.681, 1.5, -Math.PI / 4],
  [-2.0, 1.762, -1.5, Math.PI / 4],

  // 3. Residential Villas Pathway (on Concrete_Stamped_Ashlar)
  [-4.8, 1.537, 9.8, -Math.PI / 3],
  [-5.8, 1.598, 11.5, -Math.PI / 3],
  [-6.5, 1.841, 12.5, -Math.PI / 3],

  // 4. Waterfront / Port Promenade (on Polished_Concrete_New & Concrete_Stamped_Ashlar)
  [-5.8, 1.875, -4.5, Math.PI / 2],
  [-6.4, 1.877, -5.2, Math.PI / 2],
  [-7.0, 1.909, -5.8, Math.PI / 2],

  // 5. Cultural Pavilion Street (on Blacktop_New)
  [5.5, 0.791, 12.5, Math.PI / 2],
  [6.2, 0.743, 13.5, Math.PI / 2]
];

export const ArchitecturalEntourage: React.FC<ArchitecturalEntourageProps> = ({ lightingMode }) => {
  const isNight = lightingMode === 'night';

  return (
    <group position={[0, 0, 0]}>
      {/* 1. Scale Human Figures (Pedestrians, Professionals, Visitors - Flush on Pavement) */}
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
