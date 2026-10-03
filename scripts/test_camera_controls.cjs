// Run with node scripts/test_camera_controls.cjs. Uses the installed OrbitControls.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
const THREE = require('three');
const { OrbitControls } = require('three-stdlib');

function harness() {
  const hooks = [], effects = [], listeners = new Map();
  let index = 0, frame, controls, updates = 0;
  const camera = new THREE.PerspectiveCamera(38, 1.6, 0.2, 240);
  camera.position.set(40, 30, -30);
  const element = {
    style: {}, clientHeight: 900, ownerDocument: { removeEventListener() {} },
    addEventListener(type, callback, options) {
      if (type === 'wheel' && options?.capture) listeners.set(type, callback);
    },
    removeEventListener(type, callback) {
      if (listeners.get(type) === callback) listeners.delete(type);
    }
  };
  const react = {
    useRef(value) { const i = index++; return hooks[i] ??= { current: value }; },
    useMemo(factory) { const i = index++; return hooks[i] ??= factory(); },
    useEffect(callback, deps) {
      const i = index++, old = hooks[i];
      if (!old || deps.some((d, n) => d !== old[n])) effects.push(callback);
      hooks[i] = deps;
    }
  };
  class ObservedControls extends OrbitControls {
    constructor(object) {
      super(object);
      controls = this;
      const update = this.update;
      this.update = () => { updates++; return update(); };
    }
  }
  const source = fs.readFileSync(require('node:path').join(__dirname, '../src/components/SmoothCameraControls.tsx'), 'utf8');
  const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
  const sandbox = { exports: {}, require(name) {
    if (name === 'react') return react;
    if (name === '@react-three/fiber') return {
      useThree: () => ({ camera, gl: { domElement: element } }),
      useFrame: (callback) => { frame = callback; }
    };
    if (name === 'three-stdlib') return { OrbitControls: ObservedControls };
    if (name === 'three') return THREE;
    throw new Error(name);
  }};
  vm.runInNewContext(compiled, sandbox);
  const render = (props) => {
    index = 0;
    sandbox.exports.SmoothCameraControls(props);
    while (effects.length) effects.shift()();
  };
  render({ targetFocus: null, autoRotate: false });
  return {
    camera, controls, render,
    step(delta = 1 / 60) { const before = updates; frame({}, delta); assert.equal(updates - before, 1, 'one controls update per frame'); },
    wheel(deltaY, deltaMode = 0) { listeners.get('wheel')({ deltaY, deltaMode, preventDefault() {}, stopImmediatePropagation() {} }); },
    radius: () => camera.position.distanceTo(controls.target)
  };
}

const focus = { target: [-6.95, 4, -6.17], position: [-0.3, 8.5, -11.6] };
for (const fps of [30, 60, 120]) {
  const h = harness();
  h.render({ targetFocus: focus, autoRotate: true });
  for (let i = 0; i < fps * 1.5; i++) h.step(1 / fps);
  assert.ok(h.camera.position.distanceTo(new THREE.Vector3(...focus.position)) < 0.05, `flight endpoint at ${fps}fps`);
  assert.ok(h.controls.target.distanceTo(new THREE.Vector3(...focus.target)) < 1e-6);
}

{
  const h = harness(), before = h.radius();
  h.wheel(-120);
  assert.equal(h.radius(), before, 'wheel does not instantly move the camera');
  h.step();
  assert.ok(h.radius() < before && h.radius() > before * Math.exp(-0.18), 'zoom eases toward destination');
  for (let i = 0; i < 120; i++) h.step();
  assert.ok(Math.abs(h.radius() - before * Math.exp(-0.18)) < 0.002);
  for (let i = 0; i < 100; i++) h.wheel(-240);
  for (let i = 0; i < 120; i++) h.step();
  assert.ok(h.radius() >= 5 - 1e-6, 'minimum zoom limit');
}

{
  const h = harness();
  h.render({ targetFocus: focus, autoRotate: true });
  for (let i = 0; i < 20; i++) h.step();
  const target = h.controls.target.clone();
  h.controls.dispatchEvent({ type: 'start' });
  for (let i = 0; i < 90; i++) h.step();
  assert.ok(h.controls.target.distanceTo(target) < 1e-6, 'drag interrupts flight');
  assert.equal(h.controls.autoRotate, false, 'interaction stops auto rotation immediately');
}

{
  const h = harness();
  h.render({ targetFocus: focus, autoRotate: false });
  for (let i = 0; i < 15; i++) h.step();
  const previous = h.camera.position.clone();
  h.render({ targetFocus: { target: [0, 2, 0], position: [40, 30, -30] }, autoRotate: false });
  assert.ok(h.camera.position.distanceTo(previous) < 1e-6, 'retargeting preserves current pose');
  for (let i = 0; i < 100; i++) h.step();
  assert.ok(h.camera.position.distanceTo(new THREE.Vector3(40, 30, -30)) < 1e-6);
}

console.log('PASS: frame ownership, flights at 30/60/120fps, smooth wheel zoom, zoom bounds, interruption, retargeting.');
