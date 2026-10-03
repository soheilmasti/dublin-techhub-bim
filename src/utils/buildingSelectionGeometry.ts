import * as THREE from 'three';

interface Envelope { categoryId: string; center: [number, number, number]; size: [number, number, number] }

/** Extract the actual architectural triangles inside each picking envelope, in world coordinates. */
export function buildingSelectionGeometry(scene: THREE.Object3D, zones: Envelope[], excluded: THREE.Material[]) {
  const points = zones.map(() => [] as number[]);
  const bounds = zones.map(zone => new THREE.Box3().setFromCenterAndSize(new THREE.Vector3(...zone.center), new THREE.Vector3(...zone.size).addScalar(0.3)));
  const vertices = [new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()];
  const center = new THREE.Vector3();
  scene.updateMatrixWorld(true);
  scene.traverse(object => {
    if (!(object instanceof THREE.Mesh) || excluded.includes(object.material as THREE.Material)) return;
    const position = object.geometry.getAttribute('position');
    if (!position) return;
    const index = object.geometry.getIndex();
    const count = index?.count ?? position.count;
    for (let i = 0; i + 2 < count; i += 3) {
      vertices.forEach((vertex, j) => vertex.fromBufferAttribute(position, index ? index.getX(i + j) : i + j).applyMatrix4(object.matrixWorld));
      center.copy(vertices[0]).add(vertices[1]).add(vertices[2]).multiplyScalar(1 / 3);
      const zone = bounds.findIndex(bound => bound.containsPoint(center) && vertices.every(vertex => bound.containsPoint(vertex)));
      if (zone >= 0) vertices.forEach(vertex => points[zone].push(vertex.x, vertex.y, vertex.z));
    }
  });
  return Object.fromEntries(zones.map((zone, i) => {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(points[i], 3));
    geometry.computeVertexNormals();
    return [zone.categoryId, geometry];
  }));
}
