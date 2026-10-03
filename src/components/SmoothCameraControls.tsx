import { useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from 'three-stdlib';
import * as THREE from 'three';

export interface CameraFocus {
  target: [number, number, number];
  position: [number, number, number];
}

export function SmoothCameraControls({ targetFocus, autoRotate, onUserInteraction }: {
  targetFocus: CameraFocus | null;
  autoRotate: boolean;
  onUserInteraction?: () => void;
}) {
  const { camera, gl } = useThree();
  // Own the update loop: Drei's controls otherwise update before our flight too.
  const controls = useMemo(() => new OrbitControls(camera), [camera]);
  const interactionCallback = useRef(onUserInteraction);
  interactionCallback.current = onUserInteraction;
  const manual = useRef(false);
  const dragging = useRef(false);
  const zoomRadius = useRef<number | null>(null);
  const flight = useRef({
    progress: 1, active: false,
    fromTarget: new THREE.Vector3(), toTarget: new THREE.Vector3(),
    fromOrbit: new THREE.Spherical(), toOrbit: new THREE.Spherical(),
    orbit: new THREE.Spherical(), offset: new THREE.Vector3()
  });

  useEffect(() => { manual.current = false; }, [autoRotate]);

  useEffect(() => {
    controls.target.set(0, 2, 0);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.rotateSpeed = 0.49;
    controls.zoomSpeed = 0.65;
    controls.screenSpacePanning = true;
    controls.minDistance = 5;
    controls.maxDistance = Math.max(140, camera.position.length() * 1.2);
    controls.minPolarAngle = 0.15;
    controls.maxPolarAngle = Math.PI / 2.03;
    controls.touches = { ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_PAN };
    controls.update();

    const stopFlight = () => {
      flight.current.active = false;
      controls.enableDamping = true;
      controls.autoRotate = false;
      manual.current = true;
      interactionCallback.current?.();
    };
    const start = () => { stopFlight(); dragging.current = true; zoomRadius.current = null; };
    const end = () => { dragging.current = false; };
    const wheel = (event: WheelEvent) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      stopFlight();
      if (dragging.current) return;
      const pixels = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? gl.domElement.clientHeight : 1);
      const radius = zoomRadius.current ?? camera.position.distanceTo(controls.target);
      zoomRadius.current = THREE.MathUtils.clamp(
        radius * Math.exp(THREE.MathUtils.clamp(pixels, -240, 240) * 0.0015),
        controls.minDistance, controls.maxDistance
      );
    };
    gl.domElement.addEventListener('wheel', wheel, { passive: false, capture: true });
    controls.addEventListener('start', start);
    controls.addEventListener('end', end);
    controls.connect(gl.domElement);
    return () => {
      gl.domElement.removeEventListener('wheel', wheel, true);
      controls.removeEventListener('start', start);
      controls.removeEventListener('end', end);
      controls.dispose();
    };
  }, [controls, camera, gl]);

  useEffect(() => {
    if (!targetFocus) return;
    // Drain residual drag/pan before capturing a flight; preserve its start pose.
    const position = camera.position.clone();
    const target = controls.target.clone();
    controls.autoRotate = false;
    controls.enableDamping = false;
    controls.update();
    camera.position.copy(position);
    controls.target.copy(target);
    zoomRadius.current = null;
    const f = flight.current;
    f.fromTarget.copy(target);
    f.toTarget.set(...targetFocus.target);
    f.fromOrbit.setFromVector3(f.offset.copy(position).sub(target));
    f.toOrbit.setFromVector3(f.offset.set(...targetFocus.position).sub(f.toTarget));
    // Shortest arc around the subject rather than a straight line through it.
    f.toOrbit.theta = f.fromOrbit.theta + Math.atan2(
      Math.sin(f.toOrbit.theta - f.fromOrbit.theta), Math.cos(f.toOrbit.theta - f.fromOrbit.theta)
    );
    f.progress = 0;
    f.active = true;
  }, [targetFocus, controls, camera]);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);
    const f = flight.current;
    controls.autoRotate = autoRotate && !manual.current && !f.active;
    // This installed OrbitControls uses a fixed 60fps step for auto-rotation.
    controls.autoRotateSpeed = 0.56 * dt * 60;
    controls.dampingFactor = 1 - Math.exp(-3.7 * dt);
    if (f.active) {
      f.progress = Math.min(1, f.progress + dt / 1.25);
      const p = f.progress;
      const ease = p * p * p * (p * (6 * p - 15) + 10);
      controls.target.lerpVectors(f.fromTarget, f.toTarget, ease);
      f.orbit.set(
        THREE.MathUtils.lerp(f.fromOrbit.radius, f.toOrbit.radius, ease),
        THREE.MathUtils.lerp(f.fromOrbit.phi, f.toOrbit.phi, ease),
        THREE.MathUtils.lerp(f.fromOrbit.theta, f.toOrbit.theta, ease)
      );
      camera.position.copy(controls.target).add(f.offset.setFromSpherical(f.orbit));
      controls.update();
      if (p === 1) { f.active = false; controls.enableDamping = true; }
    } else {
      if (zoomRadius.current !== null) {
        const radius = camera.position.distanceTo(controls.target);
        const next = THREE.MathUtils.lerp(radius, zoomRadius.current, 1 - Math.exp(-12 * dt));
        camera.position.sub(controls.target).multiplyScalar(next / Math.max(radius, 0.001)).add(controls.target);
        if (Math.abs(next - zoomRadius.current) < 0.001) zoomRadius.current = null;
      }
      controls.update();
    }
  }, -1);

  return null;
}
