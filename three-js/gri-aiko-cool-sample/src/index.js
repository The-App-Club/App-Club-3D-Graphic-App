import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import {VRM} from '@pixiv/three-vrm';

let stats;
stats = new Stats();
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = 0;
stats.domElement.style.top = 0;
document.body.appendChild(stats.domElement);

let parameter = {
  objectTranslationX: 0,
  objectTranslationY: 0,
  objectTranslationZ: 0,
  objectLookAtX: 0,
  objectLookAtY: 0,
  objectLookAtZ: 0,
};

let controllerInfo = {
  'Object Translation X': parameter.objectTranslationX,
  'Object Translation Y': parameter.objectTranslationY,
  'Object Translation Z': parameter.objectTranslationZ,
  'Object LookAt X': parameter.objectLookAtX,
  'Object LookAt Y': parameter.objectLookAtY,
  'Object LookAt Z': parameter.objectLookAtZ,
};

const gui = new dat.GUI();
gui.width = 300;

const object = gui.addFolder('Object');
const objectTranslation = object.addFolder('Object Translation');
objectTranslation
  .add(controllerInfo, 'Object Translation X', -10, 10, 0.0001)
  .onChange((event) => {
    detectChangeParameter(event, 'Object Translation X');
  });
objectTranslation
  .add(controllerInfo, 'Object Translation Y', -10, 10, 0.0001)
  .onChange((event) => {
    detectChangeParameter(event, 'Object Translation Y');
  });
objectTranslation
  .add(controllerInfo, 'Object Translation Z', -10, 10, 0.0001)
  .onChange((event) => {
    detectChangeParameter(event, 'Object Translation Z');
  });
const objectLookAt = object.addFolder('Object LookAt');
objectLookAt
  .add(controllerInfo, 'Object LookAt X', -2000, 2000, 0.1)
  .onChange((event) => {
    detectChangeParameter(event, 'Object LookAt X');
  });
objectLookAt
  .add(controllerInfo, 'Object LookAt Y', -2000, 2000, 0.1)
  .onChange((event) => {
    detectChangeParameter(event, 'Object LookAt Y');
  });
objectLookAt
  .add(controllerInfo, 'Object LookAt Z', -2000, 2000, 0.1)
  .onChange((event) => {
    detectChangeParameter(event, 'Object LookAt Z');
  });

function detectChangeParameter(event, keyName) {
  if (keyName === 'Object Translation X') {
    parameter.objectTranslationX = event;
  }
  if (keyName === 'Object Translation Y') {
    parameter.objectTranslationY = event;
  }
  if (keyName === 'Object Translation Z') {
    parameter.objectTranslationZ = event;
  }
  if (keyName === 'Object LookAt X') {
    parameter.objectLookAtX = event;
  }
  if (keyName === 'Object LookAt Y') {
    parameter.objectLookAtY = event;
  }
  if (keyName === 'Object LookAt Z') {
    parameter.objectLookAtZ = event;
  }

  reflectObjectRotate();
  reflectObjectTranslate();
  reflectObjectLookAt();
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

// シーンの準備
// https://note.com/npaka/n/ne34d7b70743c
const gScene = new THREE.Scene();

// カメラの準備
const gCamera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// レンダラーの準備
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x7fbfff, 1.0);
document.body.appendChild(renderer.domElement);

// ライトの準備
const light = new THREE.DirectionalLight(0xffffff);
light.position.set(-1, 1, -1).normalize();
gScene.add(light);

function reflectCameraScale() {
  gvrm.scene.scale.setScalar(parameter.cameraScale);
}

function reflectCameraRotation() {
  gCamera.rotation.x = deg2rad(parameter.cameraRotationX);
  gCamera.rotation.y = deg2rad(parameter.cameraRotationY);
  gCamera.rotation.z = deg2rad(parameter.cameraRotationZ);
}

function reflectObjectLookAt() {
  gVrm.scene.lookAt(
    new THREE.Vector3(
      parameter.objectLookAtX,
      parameter.objectLookAtY,
      parameter.objectLookAtZ
    )
  );
}

function reflectObjectTranslate() {
  gVrm.scene.position.x = parameter.objectTranslationX;
  gVrm.scene.position.y = parameter.objectTranslationY;
  gVrm.scene.position.z = parameter.objectTranslationZ;
}

function reflectObjectRotate() {
  // lookAt と rotationは同時にできない
  // https://stackoverflow.com/questions/14250208/three-js-how-to-rotate-an-object-to-lookat-one-point-and-orient-towards-anothe
  // https://discourse.threejs.org/t/set-object-rotation-using-a-lookat-vector/4617
  gVrm.scene.rotation.x = deg2rad(parameter.objectRotationX);
  gVrm.scene.rotation.y = deg2rad(parameter.objectRotationY);
  gVrm.scene.rotation.z = deg2rad(parameter.objectRotationZ);
}

let gVrm;
// VRMの読み込み
const loader = new GLTFLoader();
loader.load('./static/model/gri-aiko.vrm', (gltf) => {
  console.log(gltf);
  VRM.from(gltf).then((vrm) => {
    gVrm = vrm;

    // 姿勢の指定
    vrm.scene.position.y = -1;
    vrm.scene.position.z = -3;
    vrm.scene.rotation.y = Math.PI / 2;

    vrm.scene.lookAt(new THREE.Vector3(1, 1, 1));

    // シーンへの追加
    gScene.add(vrm.scene);
  });
});

window.addEventListener('resize', handleResize);

function handleResize() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);
  gCamera.aspect = width / height;
  gCamera.updateProjectionMatrix();
  renderer.render(gScene, gCamera);
}

// アニメーションループの開始
function animate() {
  requestAnimationFrame(animate);
  renderer.render(gScene, gCamera);
  stats.update();
}
animate();
