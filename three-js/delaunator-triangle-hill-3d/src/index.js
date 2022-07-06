import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import Delaunator from 'delaunator';
import SimplexNoise from 'simplex-noise';
const simplex = new SimplexNoise();

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

let cameraWorkScale = 175;
let cameraWorkScaleInit = 175;

camera.position.setScalar(cameraWorkScale); // スケールを調整 値を大きくするとモデルは小さくなる スクロールイベントに合わせてインタラクティブに

const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
const canvas = renderer.domElement;
const containerDom = document.querySelector('.container');
containerDom.appendChild(canvas);

const controls = new OrbitControls(camera, canvas);

const light = new THREE.DirectionalLight(0xffffff, 1.5);
light.position.setScalar(100);
scene.add(light);
scene.add(new THREE.AmbientLight(0xffffff, 0.5));

const size = {x: 200, z: 200};
const pointsCount = 1000;
const points3d = [];
for (let i = 0; i < pointsCount; i++) {
  let x = THREE.Math.randFloatSpread(size.x);
  let z = THREE.Math.randFloatSpread(size.z);
  let y = simplex.noise2D((x / size.x) * 5, (z / size.z) * 5) * 15; // 標高の調整
  points3d.push(new THREE.Vector3(x, y, z));
}

const geom = new THREE.BufferGeometry().setFromPoints(points3d);
const cloud = new THREE.Points(
  geom,
  new THREE.PointsMaterial({color: 0x99ccff, size: 2})
);
scene.add(cloud);

// triangulate x, z
const indexDelaunay = Delaunator.from(
  points3d.map((v) => {
    return [v.x, v.z];
  })
);

const meshIndex = []; // delaunay index => three.js index
for (let i = 0; i < indexDelaunay.triangles.length; i++) {
  meshIndex.push(indexDelaunay.triangles[i]);
}

geom.setIndex(meshIndex); // add three.js index to the existing geometry
geom.computeVertexNormals();
const mesh = new THREE.Mesh(
  geom, // re-use the existing geometry
  new THREE.MeshLambertMaterial({color: 'orange', wireframe: true})
);
scene.add(mesh);

mesh.material.wireframe = false;

// const gui = new dat.GUI();
// gui.add(mesh.material, "wireframe");

render();

function resize(renderer) {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}

function render() {
  if (resize(renderer)) {
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

function normalize(value, min, max) {
  // https://stats.stackexchange.com/questions/70801/how-to-normalize-data-to-0-1-range
  return (value - min) / (max - min);
}

function handleScroll(e) {
  const t = document.body.getBoundingClientRect().top;
  const scrollY = window.scrollY;

  if (t === 0) {
    canvas.classList.remove('is-active');
    camera.position.setScalar(cameraWorkScaleInit);
  } else {
    canvas.classList.add('is-active');
  }

  // camera.position.z = t * -0.1;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;

  cameraWorkScale = cameraWorkScaleInit + t * 0.02;
  camera.position.setScalar(cameraWorkScale);
}

window.addEventListener('scroll', handleScroll);
