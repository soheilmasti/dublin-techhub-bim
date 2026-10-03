import * as THREE from 'three';

/** Remove coincident triangles, including reversed faces, without editing cached GLTF data.
 * Call with meshes in material priority order, so glazing/trim wins over a wall.
 * Double-sided materials retain visibility from both sides of a surviving face.
 */
export function cleanModelSurfaces(meshes: THREE.Mesh[]): number {
  const vertices = new Map<string, number>();
  const triangles = new Set<string>();
  const point = new THREE.Vector3();
  let removed = 0;
  for (const mesh of meshes) {
    const geometry = mesh.geometry;
    const position = geometry.getAttribute('position');
    if (!position || geometry.groups.length > 0) continue;
    const vertexIds = new Uint32Array(position.count);
    for (let i = 0; i < position.count; i++) {
      point.fromBufferAttribute(position, i).applyMatrix4(mesh.matrixWorld);
      // 0.01 mm in scene units: do not collapse intentional facade reveals.
      const key = `${Math.round(point.x * 1e5)},${Math.round(point.y * 1e5)},${Math.round(point.z * 1e5)}`;
      let id = vertices.get(key);
      if (id === undefined) { id = vertices.size; vertices.set(key, id); }
      vertexIds[i] = id;
    }
    const index = geometry.getIndex();
    const count = index ? index.count : position.count;
    const retained: number[] = [];
    let meshRemoved = 0;
    for (let i = 0; i + 2 < count; i += 3) {
      const a = index ? index.getX(i) : i;
      const b = index ? index.getX(i + 1) : i + 1;
      const c = index ? index.getX(i + 2) : i + 2;
      const ids = [vertexIds[a], vertexIds[b], vertexIds[c]].sort((x, y) => x - y);
      const key = `${ids[0]},${ids[1]},${ids[2]}`;
      if (ids[0] === ids[1] || ids[1] === ids[2] || triangles.has(key)) {
        meshRemoved++;
      } else {
        triangles.add(key);
        retained.push(a, b, c);
      }
    }
    if (meshRemoved) {
      mesh.geometry = geometry.clone();
      mesh.geometry.setIndex(retained);
      removed += meshRemoved;
    }
  }
  return removed;
}
