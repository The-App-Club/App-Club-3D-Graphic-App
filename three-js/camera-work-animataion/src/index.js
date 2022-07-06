import * as THREE from 'three';
// import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
// import {SVGLoader} from 'three/examples/jsm/loaders/SVGLoader';
// https://blog.logrocket.com/bringing-svgs-three-js-svgloader/
// https://discourse.threejs.org/t/camera-zoom-to-fit-object/936/23
// https://codepen.io/discoverthreejs/pen/vwVeZB
// https://codepen.io/programking/pen/MyOQpO

console.clear();

let stats;
stats = new Stats();
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = 0;
stats.domElement.style.top = 0;
document.body.appendChild(stats.domElement);

let scene, camera, renderer, geometry, material, cube;

function initialize() {
  if (renderer) {
    document.body.removeChild(renderer.domElement);
  }

  // Setting the scene
  scene = new THREE.Scene();

  // Camera Object
  camera = new THREE.PerspectiveCamera(
    4,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 75;
  camera.position.x = 50;
  camera.position.y = 50;
  camera.lookAt(scene.position);
  camera.updateMatrixWorld();

  // Render Object
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Making the cube
  geometry = new THREE.BoxGeometry(2, 2, 2, 2, 2, 2);

  const texture = new THREE.TextureLoader().load(
    './static/image/SlackImage.png'
  );
  // https://threejs.org/docs/#api/en/textures/Texture
  // https://threejs.org/docs/#api/en/materials/MeshPhongMaterial
  // https://sbcode.net/threejs/meshphongmaterial/
  material = new THREE.MeshBasicMaterial({
    color: `#eeeeee`,
    map: texture,
  });

  cube = new THREE.Mesh(geometry, material);

  scene.add(cube);
}

let parameter = {
  objectWireFrame: false,
  objectVelocityX: 0.0,
  objectVelocityY: 0.0,
  objectVelocityZ: 0.0,
  objectWidth: 1,
  objectHeight: 1,
  objectDepth: 1,
  cameraPositionX: 75,
  cameraPositionY: 50,
  cameraPositionZ: 50,
};

let controllerInfo = {
  'Stop Rotate': stopRotate,
  'Camera Position X': parameter.cameraPositionX,
  'Camera Position Y': parameter.cameraPositionY,
  'Camera Position Z': parameter.cameraPositionZ,
  'Object WireFrame': parameter.objectWireFrame,
  'Object Velocity X': parameter.objectVelocityX,
  'Object Velocity Y': parameter.objectVelocityY,
  'Object Velocity Z': parameter.objectVelocityZ,
  'Object Width': parameter.objectWidth,
  'Object Height': parameter.objectHeight,
  'Object Depth': parameter.objectDepth,
};

function stopRotate() {
  parameter.objectVelocityX = 0;
  parameter.objectVelocityY = 0;
  parameter.objectVelocityZ = 0;
}

const gui = new dat.GUI();
let folder;
gui.width = 300;
gui.add(controllerInfo, 'Stop Rotate');
gui.add(controllerInfo, 'Object WireFrame').onChange((event) => {
  detectChangeParameter(event, 'Object WireFrame');
});
folder = gui.addFolder('Camera');
folder
  .add(controllerInfo, 'Camera Position X', -360, 360, 0.001)
  .onChange((event) => {
    detectChangeParameter(event, 'Camera Position X');
  });
folder
  .add(controllerInfo, 'Camera Position Y', -360, 360, 0.001)
  .onChange((event) => {
    detectChangeParameter(event, 'Camera Position Y');
  });
folder
  .add(controllerInfo, 'Camera Position Z', -360, 360, 0.001)
  .onChange((event) => {
    detectChangeParameter(event, 'Camera Position Z');
  });
folder = gui.addFolder('Velocity');
folder
  .add(controllerInfo, 'Object Velocity X', -1, 1, 0.001)
  .onChange((event) => {
    detectChangeParameter(event, 'Object Velocity X');
  });
folder
  .add(controllerInfo, 'Object Velocity Y', -1, 1, 0.001)
  .onChange((event) => {
    detectChangeParameter(event, 'Object Velocity Y');
  });
folder
  .add(controllerInfo, 'Object Velocity Z', -1, 1, 0.001)
  .onChange((event) => {
    detectChangeParameter(event, 'Object Velocity Z');
  });
folder = gui.addFolder('Object');
folder.add(controllerInfo, 'Object Width', 1, 3, 0.0001).onChange((event) => {
  detectChangeParameter(event, 'Object Width');
});
folder.add(controllerInfo, 'Object Height', 1, 3, 0.0001).onChange((event) => {
  detectChangeParameter(event, 'Object Height');
});
folder.add(controllerInfo, 'Object Depth', 1, 3, 0.0001).onChange((event) => {
  detectChangeParameter(event, 'Object Depth');
});

function reflectWireFrame() {
  cube.material.wireframe = parameter.objectWireFrame;
}

function reflectCamera() {
  camera.position.x = parameter.cameraPositionX;
  camera.position.y = parameter.cameraPositionY;
  camera.position.z = parameter.cameraPositionZ;
}
function reflectCube() {
  cube.scale.x = parameter.objectWidth;
  cube.scale.y = parameter.objectHeight;
  cube.scale.z = parameter.objectDepth;
}

function detectChangeParameter(event, keyName) {
  if (keyName === 'Object WireFrame') {
    parameter.objectWireFrame = event;
    reflectWireFrame();
    return;
  }
  if (keyName === 'Camera Position X') {
    parameter.cameraPositionX = event;
    reflectCamera();
    return;
  }
  if (keyName === 'Camera Position Y') {
    parameter.cameraPositionY = event;
    reflectCamera();
    return;
  }
  if (keyName === 'Camera Position Z') {
    parameter.cameraPositionZ = event;
    reflectCamera();
    return;
  }
  if (keyName === 'Object Velocity X') {
    parameter.objectVelocityX = event;
  }
  if (keyName === 'Object Velocity Y') {
    parameter.objectVelocityY = event;
  }
  if (keyName === 'Object Velocity Z') {
    parameter.objectVelocityZ = event;
  }
  if (keyName === 'Object Width') {
    parameter.objectWidth = event;
    reflectCube();
    return;
  }
  if (keyName === 'Object Height') {
    parameter.objectHeight = event;
    reflectCube();
    return;
  }
  if (keyName === 'Object Depth') {
    parameter.objectDepth = event;
    reflectCube();
    return;
  }
}

function render() {
  camera.lookAt(scene.position);
  camera.updateMatrixWorld();

  cube.rotation.x += parameter.objectVelocityX;
  cube.rotation.y += parameter.objectVelocityY;
  cube.rotation.z += parameter.objectVelocityZ;

  renderer.render(scene, camera);

  stats.update();

  window.requestAnimationFrame(render);
}

function setUp() {
  initialize();
  render();
}

window.addEventListener('resize', setUp);
window.addEventListener('load', setUp);
