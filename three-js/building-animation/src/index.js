import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

// import {SVGLoader} from 'three/examples/jsm/loaders/SVGLoader';
// https://blog.logrocket.com/bringing-svgs-three-js-svgloader/
// https://discourse.threejs.org/t/camera-zoom-to-fit-object/936/23
// https://codepen.io/discoverthreejs/pen/vwVeZB
// https://codepen.io/programking/pen/MyOQpO

console.clear();

function init() {
  const container = document.querySelector('#scene-container');

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x8fbcd4);

  const camera = new THREE.PerspectiveCamera(
    35,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.set(-40, 40, 10);
  const controls = new OrbitControls(camera, container);

  const lights = createLights();
  const materials = createMaterials();
  const meshes = createMeshes(materials);

  scene.add(
    lights.ambient,
    lights.main,

    ...meshes.boxes
  );

  const renderer = createRenderer(container);

  setupOnWindowResize(camera, container, renderer);

  renderer.setAnimationLoop(() => {
    renderer.render(scene, camera);
  });

  setupSelectAndZoom(camera, container, controls, materials, meshes);
}

function createLights() {
  const ambient = new THREE.HemisphereLight(0xddeeff, 0x0f0e0d, 5);

  const main = new THREE.DirectionalLight(0xffffff, 5);
  main.position.set(10, 10, 10);

  return {
    ambient,
    main,
  };
}

function createMaterials() {
  const main = new THREE.MeshStandardMaterial({
    color: 0xcccccc,
    flatShading: true,
    transparent: true,
    opacity: 0.8,
  });

  main.color.convertSRGBToLinear();

  const highlight = new THREE.MeshStandardMaterial({
    color: 0xff4444,
    flatShading: true,
  });

  highlight.color.convertSRGBToLinear();

  return {
    main,
    highlight,
  };
}

function createMeshes(materials) {
  const geometry = new THREE.BoxBufferGeometry(1, 1, 1);
  geometry.translate(0, 0.5, 0);
  const boxes = [];

  for (let i = 0; i < 500; i++) {
    const mesh = new THREE.Mesh(geometry, materials.main);
    mesh.position.x = Math.random() * 60 - 30;
    mesh.position.y = 0;
    mesh.position.z = Math.random() * 60 - 30;
    mesh.scale.y = Math.random() * 10;
    mesh.updateMatrix();
    mesh.matrixAutoUpdate = false;

    boxes.push(mesh);
  }

  return {
    boxes,
  };
}

function createRenderer(container) {
  const renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setSize(container.clientWidth, container.clientHeight);

  renderer.setPixelRatio(window.devicePixelRatio);

  // renderer.gammaFactor = 2.2;
  // renderer.gammaOutput = true;

  renderer.physicallyCorrectLights = true;

  container.appendChild(renderer.domElement);

  return renderer;
}

function setupOnWindowResize(camera, container, renderer) {
  window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(container.clientWidth, container.clientHeight);
  });
}

init();

function setupSelectAndZoom(camera, container, controls, materials, meshes) {
  const selection = [];

  let isDragging = false;
  const mouse = new THREE.Vector2();
  const raycaster = new THREE.Raycaster();

  container.addEventListener(
    'mousedown',
    () => {
      isDragging = false;
    },
    false
  );

  container.addEventListener(
    'mousemove',
    () => {
      isDragging = true;
    },
    false
  );

  window.addEventListener(
    'mouseup',
    (event) => {
      if (isDragging) {
        isDragging = false;
        return;
      }

      isDragging = false;

      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObjects(meshes.boxes);

      if (intersects.length > 0) {
        const mesh = intersects[0].object;

        if (selection.includes(mesh)) {
          mesh.material = materials.main;
          selection.splice(selection.indexOf(mesh), 1);
        } else {
          selection.push(mesh);
          mesh.material = materials.highlight;
        }

        if (selection.length > 0)
          zoomCameraToSelection(camera, controls, selection);
      }
    },
    false
  );
}

function zoomCameraToSelection(camera, controls, selection, fitRatio = 1.2) {
  const box = new THREE.Box3();

  for (const object of selection) box.expandByObject(object);

  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());

  const maxSize = Math.max(size.x, size.y, size.z);
  const fitHeightDistance =
    maxSize / (2 * Math.atan((Math.PI * camera.fov) / 360));
  const fitWidthDistance = fitHeightDistance / camera.aspect;
  const distance = fitRatio * Math.max(fitHeightDistance, fitWidthDistance);

  const direction = controls.target
    .clone()
    .sub(camera.position)
    .normalize()
    .multiplyScalar(distance);

  controls.maxDistance = distance * 10;
  controls.target.copy(center);

  camera.near = distance / 100;
  camera.far = distance * 100;
  camera.updateProjectionMatrix();

  camera.position.copy(controls.target).sub(direction);

  controls.update();
}
