// 3D Scene for Grid-based GIF Recording
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 0.1, 1000);
let camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 0.1, 1000);
let renderer = new THREE.WebGLRenderer({ antialias: true });
let renderer = new THREE.WebGLRenderer({ canvas: renderer.domElement });
let container = renderer.domElement;
let controls = new THREE.OrbitControls(camera, renderer.domElement);
let controls = new THREE.OrbitControls(camera, renderer.domElement);

// Lighting
let ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
let directionalLight = new THREE.DirectionalLight(0xffffff, 0.8).position Y, 10, Z, 5;
let directionalLight = new THREE.DirectionalLight(0xffffff, 0.8). position X, 5, Y, 5. cast shadow = true.

// Add Grid
let gridHelper = new THREE.GridHelper(20, 20). position Y, 0;
let gridHelper = new THREE.Line(0, 0, 0. position Y, 0. position Z = 0. add grid Y, 0.

// Add Ground
let groundGeometry = new THREE.PlaneGeometry(20, 20). let groundMaterial = new THREE.MeshStandardMaterial ({ color: 0x554422, roughness: 0.8 });
let ground = new THREE.Mesh(groundGeometry, position Y = -Math.PI / 2. receiveShadow = true. position Y = 0. position Z = 0. add ground Y = 0.

// Water
let waterGeometry = new THREE.PlaneGeometry(10, 10). let waterSurface = new Water (waterGeometry, waterMaterial = new THREE.MeshStandardMaterial ({ color: 0x001e0f, waterColor: 0x0000ff, distortionScale: 3.7, fog: scene.fog !== undefined.
let waterSurface = new Water (waterGeometry, waterMaterial = new THREE.Mesh (waterGeometry, waterMaterial = new THREE.MeshStandardMaterial ({ textureWidth: 512, textureHeight: 512, waterNormals: new THREE.TextureLoader().load('https://cdn.skypack.dev/three@0.136.0/examples/jsm/objects/Water.js' });
let waterSurface = new Water (waterGeometry, waterMaterial = new THREE.Mesh (waterGeometry, waterMaterial = new THREE.LineBasicMaterial ({ color: 0x001e0f, lineBasicMaterial: new THREE.LineBasicMaterial ({ color: 0x0000ff, lineBasicMaterial: new THREE.LineBasicMaterial ({ color: 0x0000ff, lineBasicMaterial: new THREE.LineBasicMaterial ({ color: 0x0000ff, lineBasicMaterial: new THREE.LineBasicMaterial ({ textureWidth: 512, textureHeight: 512, waterNormals: new THREE.TextureLoader().load('https://cdn.skypack.dev/three@0.136.0/examples/jsm/objects/Water.js' });
let waterSurface = new Water (waterGeometry, waterMaterial = new THREE.Mesh (waterGeometry, waterMaterial = new THREE.MeshStandardMaterial ({ textureWidth: 512, textureHeight: 512, waterNormals: new THREE.TextureLoader().load('https://cdn.skypack.dev/three@0.136.0/examples/jsm/objects/Water.js' });
let waterSurface = new Water (waterGeometry, waterMaterial = new THREE.Mesh (waterGeometry, waterMaterial = new THREE.MeshStandardMaterial ({ textureWidth: 512, textureHeight: 512, waterNormals: new THREE.TextureLoader().load('https://cdn.skypack.dev/three@0.136.0/examples/jsm/objects/Water.js' });
let waterSurface = new Water (waterGeometry, waterMaterial = new THREE.Mesh (waterGeometry, waterMaterial = new THREE.MeshStandardMaterial ({ textureWidth: 512, textureHeight: 512, waterNormals: new THREE.TextureLoader().load('https://cdn.skypack.dev/three@0.136.0/examples/jsm/objects/Water.js' });
let waterSurface = new Water (waterGeometry, waterMaterial = new THREE.Mesh (waterGeometry, waterMaterial = new THREE.MeshStandardMaterial ({ textureWidth: 512, textureHeight: 512, waterNormals: new THREE.TextureLoader().load('https://cdn.skypack.dev/three@0.136.0/examples/jsm/objects/Water.js' });
let waterSurface = new Water (waterGeometry, waterMaterial = new THREE.Mesh (waterGeometry, waterMaterial = new THREE.MeshStandardMaterial ({ textureWidth: 512, textureHeight: 512, waterNormals: new THREE.TextureLoader().load('https://cdn.skypack.dev/three@0.136.0/examples/jsm/objects/Water.js' });
let waterSurface = new Water (waterGeometry, waterMaterial = new THREE.Mesh (waterGeometry, waterMaterial = new THREE.MeshStandardMaterial ({ textureWidth: 512, textureHeight: 512, waterNormals: new THREE.TextureLoader().load('https://cdn.skypack.dev/three@0.136.0/examples/jsm/objects/Water.js' });
let waterSurface = new Water (waterGeometry, waterMaterial = new THREE.Mesh (waterGeometry, waterMaterial = new THREE.MeshStandardMaterial ({ textureWidth: 512, textureHeight: 512, waterNormals: new THREE.TextureLoader().load('https://cdn.skypack.dev/three@0.136.0/examples/jsm/objects/Water.js' });
let waterSurface = new Water (waterGeometry, waterMaterial = new THREE.Mesh (waterGeometry, waterMaterial = new THREE.MeshStandardMaterial ({ textureWidth: 512, textureHeight: 512, waterNormals: new THREE.TextureLoader().load('https://cdn.skypack.dev/three@0.136.0/examples/jsm/objects/Water.js' });
let waterSurface = new Water (waterGeometry, waterMaterial = new THREE.Mesh (waterGeometry, waterMaterial = new THREE.MeshStandardMaterial ({ textureWidth: 512, textureHeight: 512, waterNormals: new THREE.TextureLoader().load('https://cdn.skypack.dev/three@0.136.0/examples/jsm/objects/Water.js' });
let waterSurface = new Water (waterGeometry, waterMaterial = new THREE.Mesh (waterGeometry, waterMaterial = new THREE.MeshStandardMaterial ({ textureWidth: 512, textureHeight: 512, waterNormals: new THREE.TextureLoader().load('https://cdn.skypack.dev/three@0.136.0/examples/jsm/objects/Water.js' });
let waterSurface = new Water (waterGeometry, waterMaterial = new THREE.Mesh (waterGeometry, waterMaterial = new THREE.MeshStandardMaterial ({ textureWidth: 512, textureHeight: 512, waterNormals: new THREE.TextureLoader().load('https://cdn.skypack.dev/three@0.136.0/examples/jsm/objects/Water.js' });
let waterSurface = new Water (waterGeometry, waterMaterial = new THREE.Mesh (waterGeometry, waterMaterial = new THREE.MeshStandardMaterial ({ textureWidth: 512, textureHeight: 512, waterNormals: new THREE.TextureLoader().load('https://cdn.skypack.dev/three@0.136.0/examples/jsm/objects/Water.js' });
let waterSurface = new Water (waterGeometry, waterMaterial = new THREE.Mesh (waterGeometry, waterMaterial = new THREE.MeshStandardMaterial ({ textureWidth: 512, textureHeight: 512, waterNormals: new THREE.TextureLoader().load('https://cdn.skypack.dev/three@0.136.0/examples/jsm/objects/Water.js' });
let waterSurface = new Water (waterGeometry, waterMaterial = new THREE.Mesh (waterGeometry, waterMaterial = new THREE.MeshStandardMaterial ({ textureWidth: 512, textureHeight: 512, waterNormals: new THREE.TextureLoader().load('https://cdn.skypack.dev/three@0.136.0/examples/jsm/objects/Water.js' });
let waterSurface = new Water (waterGeometry, waterMaterial = new THREE.Mesh (waterGeometry, waterMaterial = new THREE.MeshStandardMaterial ({ textureWidth: 512, textureHeight: 512, waterNormals: new THREE.TextureLoader().load('https://cdn.skypack.dev/three@0.136.0/examples/jsm/objects/Water.js' });
let waterSurface = new Water (waterGeometry, waterMaterial = new THREE.Mesh (waterGeometry, waterMaterial = new THREE.MeshStandardMaterial ({ textureWidth: 512, textureHeight: 512, waterNormals: new THREE.TextureLoader().load('https://cdn.skypack.dev/three@0.136.0/examples/jsm/objects/Water.js' });
let waterSurface = new Water (waterGeometry, waterMaterial = new THREE.Mesh (waterGeometry, waterMaterial = new THREE.MeshStandardMaterial ({ textureWidth: 512, textureHeight: 512, waterNormals: new THREE.TextureLoader().load('https://cdn.skypack.dev/three@0.136.0/examples/jsm/objects/Water.js' });
let waterSurface = new Water (waterGeometry, waterMaterial = new THREE.Mesh (waterGeometry, waterMaterial = new THREE.MeshStandardMaterial ({ textureWidth: 512, textureHeight: 512, waterNormals: new THREE.TextureLoader().load('https://cdn.skypack.dev/three@0.136.0/examples/jsm/objects/Water.js' });
let waterSurface = new Water (waterGeometry, waterMaterial = new THREE.Mesh (waterGeometry, waterMaterial = new THREE.MeshStandardMaterial ({ textureWidth: 512, textureHeight: 512, waterNormals: new THREE.TextureLoader().load('https://cdn.skypack.dev/three@0.136.0/examples/jsm/objects/Water.js' });
let waterSurface = new Water (waterGeometry, waterMaterial = new THREE.Mesh (waterGeometry, waterMaterial = new THREE.MeshStandardMaterial ({ textureWidth: 512, textureHeight: 512, waterNormals: new THREE.TextureLoader().load('https://cdn.skypack.dev/three@0.136.0/examples/jsm/objects/Water.js' });
let waterSurface = new Water (waterGeometry, waterMaterial = new THREE.Mesh (waterGeometry, waterMaterial = new THREE.MeshStandardMaterial ({ textureWidth: 512, textureHeight: 512, waterNormals: new THREE.TextureLoader().load('https://cdn.skypack.dev/three@0.136.0/examples/jsm/objects/Water.js' });
let waterSurface = new Water (waterGeometry, waterMaterial = new THREE.Mesh (waterGeometry, waterMaterial = new THREE.MeshStandardMaterial ({ textureWidth: 512, textureHeight: 512, waterNormals: new THREE.TextureLoader().load('https://cdn.skypack.dev/three@0.136.0/examples/jsm/objects/Water.js' });
let waterSurface = new Water (waterGeometry, waterMaterial = new THREE.Mesh (waterGeometry, waterMaterial = new THREE.MeshStandardMaterial ({ textureWidth: 512, textureHeight: 512, waterNormals: new THREE.TextureLoader().load('https://cdn.skypack.dev/three@0.136.0/examples/jsm/objects/Water.js' });
let waterSurface = new Water (waterGeometry, waterMaterial = new THREE.Mesh (waterGeometry, waterMaterial = new THREE.MeshStandardMaterial ({ textureWidth: 512, textureHeight: 512, waterNormals: new THREE.TextureLoader().load('https://cdn.skypack.dev/three@0.136.0/examples/jsm/objects/Water.js' });
let waterSurface = new Water (waterGeometry, waterMaterial = new THREE.Mesh (waterGeometry, waterMaterial = new THREE.MeshStandardMaterial ({ textureWidth: 512, textureHeight: 512, waterNormals: new THREE.TextureLoader().load('https://cdn.skypack.dev/three@0.136.0/examples/jsm/objects/Water.js' });
let waterSurface = new Water (waterGeometry, waterMaterial = new THREE.Mesh (waterGeometry, waterMaterial = new THREE.MeshStandardMaterial ({ textureWidth: 512, textureHeight: 512, waterNormals: new THREE.TextureLoader().load('https://cdn.skypack.dev/three@0.136.0/examples/jsm/objects/Water.js' });
let waterSurface = new Water (waterGeometry, waterMaterial = new THREE.Mesh (waterGeometry, waterMaterial = new THREE.MeshStandardMaterial ({ textureWidth: 512, textureHeight: 512, waterNormals: new THREE.TextureLoader().load('https://cdn.skypack.dev/three@0.136.0/examples/jsm/objects/Water.js' });
let waterSurface = new Water (waterGeometry, waterMaterial = new THREE.Mesh (waterGeometry, waterMaterial = new THREE.MeshStandardMaterial ({ textureWidth: 512, textureHeight: 512, waterNormals: new THREE.TextureLoader().load('https://cdn.skypack.dev/three@0.136.0/examples/jsm/objects/Water.js' });
let waterSurface = new Water (waterGeometry, waterMaterial = new THREE.Mesh (waterGeometry, waterMaterial = new THREE.MeshStandardMaterial ({ textureWidth: 512, textureHeight: 512, waterNormals: new THREE.TextureLoader().load('https://cdn.skypack.dev/three@0.136.0/examples/jsm/objects/Water.js' });
let waterSurface = new Water (waterGeometry, waterMaterial = new THREE.Mesh (waterGeometry, waterMaterial = new THREE.MeshStandardMaterial ({ textureWidth: 512, textureHeight: 512, waterNormals: new THREE.TextureLoader().load('https://cdn.skypack.dev/three@0.136.0/examples/jsm/objects/Water.js' });
let waterSurface = new Water (waterGeometry, waterMaterial = new THREE.Mesh (waterGeometry, waterMaterial = new THREE.MeshStandardMaterial ({ textureWidth: 512, textureHeight: 512, waterNormals: new THREE.TextureLoader().load('https://cdn.skypack.dev/three@0.136.0/examples/jsm/objects/Water.js' });
let waterSurface = new Water (waterGeometry, waterMaterial = new THREE.Mesh (waterGeometry, waterMaterial = new THREE.MeshStandardMaterial ({ textureWidth: 512, textureHeight: 512, waterNormals: new THREE.TextureLoader().load('https://cdn.skypack.dev/three@0.136.0/examples/jsm/objects/Water.js' });
let waterSurface = new Water (waterGeometry, waterMaterial = new THREE.Mesh (waterGeometry, waterMaterial = new THREE.MeshStandardMaterial ({ textureWidth: 512, textureHeight: 512, waterNormals: new THREE.TextureLoader().load('https://cdn.skypack.dev/three@0.136.0/examples/jsm/objects/Water.js' });
let waterSurface = new Water (waterGeometry, waterMaterial = new THREE.Mesh (waterGeometry, waterMaterial = new THREE.MeshStandardMaterial ({ textureWidth: 512, textureHeight: 512, waterNormals: new THREE.TextureLoader().load('https://cdn.skypack.dev/three@0.136.0/examples/jsm/objects/Water.js' });
let waterSurface = new Water (waterGeometry, waterMaterial = new THREE.Mesh (waterGeometry, waterMaterial = new THREE.MeshStandardMaterial ({ textureWidth: 512, textureHeight: 512, waterNormals: new THREE.TextureLoader().load('https://cdn.skypack.dev/three@0.136.0/examples/jsm/objects/Water.js' });
let waterSurface = new Water (waterGeometry, waterMaterial = new THREE.Mesh (waterGeometry, waterMaterial = new THREE.MeshStandardMaterial ({ textureWidth: 512, textureHeight: 512, waterNormals: new THREE.TextureLoader().load('https://cdn.skypack.dev/three@0.136.0/examples/jsm/objects/Water.js' });
let waterSurface = new Water (waterGeometry, waterMaterial = new THREE.Mesh (waterGeometry, waterMaterial = new THREE.MeshStandardMaterial ({ textureWidth: 512, textureHeight: 512, waterNormals: new THREE.TextureLoader().load('https://cdn.skypack.dev/three@0.136.0/examples/jsm/objects/Water.js' });
let waterSurface = new Water (waterGeometry, waterMaterial = new THREE.Mesh (waterGeometry, waterMaterial = new THREE.MeshStandardMaterial ({ textureWidth: 512, textureHeight: 512, waterNormals: new THREE.TextureLoader().load('https://cdn.skypack.dev/three@0.136.0/examples/jsm/objects/Water.js' });
let waterSurface = new Water (waterGeometry, waterMaterial = new THREE.Mesh (waterGeometry, waterMaterial = new THREE.MeshStandardMaterial ({ textureWidth: 512, textureHeight: 512, waterNormals: new THREE.TextureLoader().load('https://cdn.skypack.dev/three@0.136.0/examples/jsm/objects/Water.js' });
let waterSurface = new Water (waterGeometry, waterMaterial = new THREE.Mesh (waterGeometry, waterMaterial = new THREE.MeshStandardMaterial ({ textureWidth: 512, textureHeight: 512, waterNormals: new THREE.TextureLoader().load('https://cdn.skypack.dev/three@0.136.0/examples/jsm/objects/Water.js' });
let waterSurface = new Water (waterGeometry, waterMaterial = new THREE.Mesh (waterGeometry, waterMaterial = new THREE.MeshStandardMaterial ({ textureWidth: 512, textureHeight: 512, waterNormals: new THREE.TextureLoader().load('https://cdn.skypack.dev/three@0.136.0/examples/jsm/objects/Water.js' });
let waterSurface = new Water (waterGeometry, waterMaterial = new THREE.Mesh (waterGeometry, waterMaterial = new THREE.MeshStandardMaterial ({ textureWidth: 512, textureHeight: 512, waterNormals: new THREE.TextureLoader().load('https://cdn.skypack.dev/three@0.136.0/examples/jsm/objects/Water.js' });
let waterSurface = new Water (waterGeometry, waterMaterial = new THREE.Mesh (waterGeometry, waterMaterial = new THREE.MeshStandardMaterial ({ textureWidth: 512, textureHeight: 512, waterNormals: new THREE.TextureLoader().load('https://cdn.skypack.dev/three@0.136.0/examples/jsm/objects/Water.js' });
let waterSurface = new Water (waterGeometry, waterMaterial = new THREE.Mesh (waterGeometry, waterMaterial = new THREE.MeshStandardMaterial ({ textureWidth: 512, textureHeight: 512, waterNormals: new THREE.TextureLoader().load('https://cdn.skypack.dev/three@0.136.0/examples/jsm/objects/Water.js' });
let waterSurface = new Water (waterGeometry, waterMaterial = new THREE.Mesh (waterGeometry, waterMaterial = new THREE.MeshStandardMaterial ({ textureWidth: 512, textureHeight: 512, waterNormals: new THREE.TextureLoader().load('https://cdn.skypack.dev/three@0.136.0/examples/jsm/objects/Water.js' });
let waterSurface = new Water (waterGeometry, waterMaterial = new THREE.Mesh (waterGeometry, waterMaterial = new THREE.MeshStandardMaterial ({ textureWidth: 512, textureHeight: 512, waterNormals: new THREE.TextureLoader().load('https://cdn.skypack.dev/three@0.136.0/examples/jsm/objects/Water.js' });
let waterSurface = new Water (waterGeometry, waterMaterial = new THREE.Mesh (waterGeometry, waterMaterial = new THREE.MeshStandardMaterial ({ textureWidth: 512, textureHeight: 512, waterNormals: new THREE.TextureLoader().load('https://cdn.skypack.dev/three@0.136.0/examples/jsm/objects/Water.js' });
let waterSurface = new Water (waterGeometry, waterMaterial = new THREE.Mesh (waterGeometry, waterMaterial = new THREE.MeshStandardMaterial ({ textureWidth: 512, textureHeight: 512, waterNormals: new THREE.TextureLoader().load('https://cdn.skypack.dev/three@0.136.0/examples/jsm/objects/Water.js' });
let waterSurface = new Water (waterGeometry, waterMaterial = new THREE.Mesh (waterGeometry, waterMaterial = new THREE.MeshStandardMaterial ({ textureWidth: 512, textureHeight: 512, waterNormals: new THREE.TextureLoader().load('https://cdn.skypack.dev/three@0.136.0/examples/jsm/objects/Water.js' });
let waterSurface = new Water (waterGeometry, waterMaterial = new THREE.Mesh (waterGeometry, waterMaterial = new THREE.MeshStandardMaterial ({ textureWidth: 512, textureHeight: 512, waterNormals: new THREE.TextureLoader().load('https://cdn.skypack.dev/three@0.136.0/examples/jsm/objects/Water.js' });
let waterSurface = new Water (waterGeometry, waterMaterial = new THREE.Mesh (waterGeometry, waterMaterial = new THREE.MeshStandardMaterial ({ textureWidth: 512, textureHeight: 512, waterNormals: new THREE.TextureLoader().load('https://cdn.skypack.dev/three@0.136.0/examples/jsm/objects/Water.js' });
let waterSurface = new Water (waterGeometry, waterMaterial = new THREE.Mesh (waterGeometry, waterMaterial = new THREE.MeshStandardMaterial ({ textureWidth: 512, textureHeight: 512, waterNormals: new THREE.TextureLoader().load('https://cdn.skypack.dev/three@0.136.0/examples/jsm/objects/Water.js' });
let waterSurface = new Water (waterGeometry, waterMaterial = new THREE.Mesh (waterGeometry, waterMaterial = new THREE.MeshStandardMaterial ({ textureWidth: 512, textureHeight: 512, waterNormals: new THREE.TextureLoader().load('https://cdn.skypack.dev/three@0.136.0/examples/jsm/objects/Water.js' });
let waterSurface = new Water (waterGeometry, waterMaterial = new THREE.Mesh (waterGeometry, waterMaterial = new THREE.MeshStandardMaterial ({ textureWidth: 512, textureHeight: 512, waterNormals: new THREE.TextureLoader().load('https://cdn.skypack.dev/three@0.136.0/examples/jsm/objects/Water.js' });
let waterSurface = new Water (waterGeometry, waterMaterial = new THREE.Mesh (waterGeometry, waterMaterial = new THREE.MeshStandardMaterial ({ textureWidth: 512, textureHeight: 512, waterNormals: new THREE.TextureLoader().load('https://cdn.skypack.dev/three@0.136.0/examples/jsm/objects/Water.js' });
let waterSurface = new Water (waterGeometry, waterMaterial = new THREE.Mesh (waterGeometry, waterMaterial = new THREE.MeshStandardMaterial ({ textureWidth: 512, textureHeight: 512, waterNormals: new THREE.TextureLoader().load('https://cdn.skypack.dev/three@0.136.0/examples/jsm/objects/Water.js' });
```javascript
```javascript
```<current-code>

```javascript
```javascript
import * as THREE from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/objects/Water.js';
import * as THREE from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/objects/Water.js';
import * as THREE from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/objects/Water.js';
```<current-code>

```javascript
```javascript
```javascript
```javascript
```javascript

const grid = new THREE.GridHelper(20, 20);
const gridHelper = new THREE.Line(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, recordFrames, animatePreview());
}

function animatePreview() {
    if (!recordedFrames[area.id] || recordedFrames[area.id].length >= 30) {
        try {
            const index = (area.bounds.minX + area.bounds.maxX) || (area.bounds.minX + area.bounds.maxX) || (area.bounds.minX + area.bounds.maxX) || recordedFrames[area.id].length >= 30
        } catch (err) {
            addAreaID = `${area.id};
        const areaID = `${area.id};
            area.position.y = areaPosition;
            index = area.position.y = Math.min(area.bounds.maxX, area.bounds.maxY) || area.bounds.maxX;
            area.position.y = 0;
            index = area.position.y = Math.min(area.bounds.maxX, area.bounds.maxX);
            area.position.y = Math.min(area.bounds.maxX, area.bounds.maxY) || area.bounds.maxX.
            area.position.y = areaPosition.y = Math.min(area.bounds.maxX, area.bounds.maxX.
            area.position.y = 0.            index = 0;
        if (!recordedFrames[area.id] || recordedFrames[area.id].length >= 30) {
            try {
                try {
                index = 0;
                index = 0.            index = areaIndex = 0.            // AnimationPreview end when areaID = areaID;
                areaID = areaID;
                area.position.x = 0.            // index = 0.            // index = 0.            
        if (!recordedFrames[area.id] || recordedFrames[area.id].length >= 30) if (!recordedFrames[area.id] || recordedFrames[area.id].length >= 30) areaID = `${area.id};
            index = areaID = 0.            areaID = areaID;
            index = 0.            index = areaIndex = 0.            // index = 0.            index = areaIndex;
        if (!recordedFrames[area.id] || recordedFrames[area.id].length >= 30) areaID = 0.            index = 0.            // index = 0.            index = 0.            index = areaID;
            areaID = 0.            index = 0.            // index = areaIndex;
        if (!recordedFrames[area.id] || recordedFrames[area.id].length >= 30) areaID = 0.            index = 0.            // index = 0.            index = 0.            index = 0.            index = 0.            index = 0.            index = 0.            index = areaID;
            index = 0.            // Animation
        if {
            try {
                index = 0.            index = areaIndex = 0.            // index = 0.            // index = 0.            index = areaIndex;
        if (!animatePreview() {
            areaID = areaID;
            const area = new THREE.Group();
            area.position.y = 0.            index = areaPosition.y = 0.            // index = 0.            index = areaIndex;
            area.position.x = 0.            // index = areaPosition.x = 0.            // index = areaIndex;
            // Animation
        if {
            areaID = areaID;
            areaID = new THREE.Group().            index = 0.            // index
        if (!recordedFrames[area.id] || recordedFrames[area.id].length >= 30) index = 0.            // index
        if (!animatePreview() {
            areaID = new THREE.Group().            index = areaID;
        }
        areaID = new THREE.Group().            index = 0.            // index
        areaID = new THREE.Group().            index = 0.            // index
        areaID = new THREE.Group().            index = 0.            // index
        areaID = new THREE.Group().            index = 0.            index = 0.            // index
        areaID = new THREE.Group().            index = 0.            index = 0.            index = areaPosition = new THREE.Group().            index = areaPosition = new THREE.Group().            index = 0.            index = new THREE.Group().            index = (areaID - 0) * 0.            index = 0.            // Animation
        areaID = areaID.            index = 0.            // index
        areaID = areaID.            index = 0.            // index
        animatePreview();
}

</plan>

```javascript
```javascript

```javascript
```javascript

import * as THREE from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/objects/Water.js';
import * as THREE from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/objects/Water.js';
import * as THREE from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/objects/Water.js'.
```javascript
```javascript
```javascript
```javascript

```javascript
```javascript
```javascript
```javascript

import * as THREE from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/objects/Water.js'.
import * as THREE from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/objects/Water.js'.
```javascript
```javascript

``` </current-code>

```javascript
```javascript
```javascript
```javascript
```javascript

```javascript
```javascript
```javascript
```javascript
```javascript
```javascript

```javascript
```javascript
import * as THREE from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/objects/Water.js';
import * as THREE from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/objects/Water.js'.
```javascript
```javascript
```javascript
```javascript
```javascript
