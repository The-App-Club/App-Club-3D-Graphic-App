import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {SVGLoader} from 'three/examples/jsm/loaders/SVGLoader';
// https://blog.logrocket.com/bringing-svgs-three-js-svgloader/
// https://discourse.threejs.org/t/camera-zoom-to-fit-object/936/23
console.clear();

let stats;
stats = new Stats();
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = 0;
stats.domElement.style.top = 0;
document.body.appendChild(stats.domElement);

const svgGroup = new THREE.Group();
const materialDiffuseColor = new THREE.Color();
const strokeDiffuseColor = new THREE.Color();

let updateAnimation;
let fillMaterial, stokeMaterial;

let parameter = {
  depth: 5,
  objectRotateX: 0.0,
  objectRotateY: 0.0,
  objectRotateZ: 0.0,
  materialHue: 0.121,
  materialSaturation: 0.73,
  materialLightness: 0.66,
  strokeHue: 0.21,
  strokeSaturation: 0.3,
  strokeLightness: 0.6,
};

let controllerInfo = {
  Depth: parameter.depth,
  'Object Rotate X': parameter.objectRotateX,
  'Object Rotate Y': parameter.objectRotateY,
  'Object Rotate Z': parameter.objectRotateZ,
  'Material Hue': parameter.materialHue,
  'Material Saturation': parameter.materialSaturation,
  'Material Lightness': parameter.materialLightness,
  'Stroke Hue': parameter.strokeHue,
  'Stroke Saturation': parameter.strokeSaturation,
  'Stroke Lightness': parameter.strokeLightness,
};

// https://github.com/mrdoob/three.js/blob/master/examples/webgl_geometry_teapot.html#L19
const gui = new dat.GUI();
let folder;
gui.width = 300;
gui.add(controllerInfo, 'Depth', -100, 100, 0.1).onChange((event) => {
  detectChangeParameter(event, 'Depth');
});
folder = gui.addFolder('Rotation');
folder
  .add(controllerInfo, 'Object Rotate X', -360.0, 360.0, 0.001)
  .onChange((event) => {
    detectChangeParameter(event, 'Object Rotate X');
  });
folder
  .add(controllerInfo, 'Object Rotate Y', -360.0, 360.0, 0.001)
  .onChange((event) => {
    detectChangeParameter(event, 'Object Rotate Y');
  });
folder
  .add(controllerInfo, 'Object Rotate Z', -360.0, 360.0, 0.001)
  .onChange((event) => {
    detectChangeParameter(event, 'Object Rotate Z');
  });
folder = gui.addFolder('Material color');
folder
  .add(controllerInfo, 'Material Hue', 0.0, 1.0, 0.025)
  .onChange((event) => {
    detectChangeParameter(event, 'Material Hue');
  });
folder
  .add(controllerInfo, 'Material Saturation', 0.0, 1.0, 0.025)
  .onChange((event) => {
    detectChangeParameter(event, 'Material Saturation');
  });
folder
  .add(controllerInfo, 'Material Lightness', 0.0, 1.0, 0.025)
  .onChange((event) => {
    detectChangeParameter(event, 'Material Lightness');
  });
folder = gui.addFolder('Stroke color');
folder.add(controllerInfo, 'Stroke Hue', 0.0, 1.0, 0.025).onChange((event) => {
  detectChangeParameter(event, 'Stroke Hue');
});
folder
  .add(controllerInfo, 'Stroke Saturation', 0.0, 1.0, 0.025)
  .onChange((event) => {
    detectChangeParameter(event, 'Stroke Saturation');
  });
folder
  .add(controllerInfo, 'Stroke Lightness', 0.0, 1.0, 0.025)
  .onChange((event) => {
    detectChangeParameter(event, 'Stroke Lightness');
  });

function detectChangeParameter(event, keyName) {
  if (keyName === 'Depth') {
    parameter.depth = event;
    updateAnimation(parameter.depth);
    return;
  }
  if (keyName === 'Object Rotate X') {
    parameter.objectRotateX = event;
    reflectObject();
    return;
  }
  if (keyName === 'Object Rotate Y') {
    parameter.objectRotateY = event;
    reflectObject();
    return;
  }
  if (keyName === 'Object Rotate Z') {
    parameter.objectRotateZ = event;
    reflectObject();
    return;
  }

  if (keyName === 'Material Hue') {
    parameter.materialHue = event;
    reflectMaterial();
    return;
  }
  if (keyName === 'Material Saturation') {
    parameter.materialSaturation = event;
    reflectMaterial();
    return;
  }
  if (keyName === 'Material Lightness') {
    parameter.materialLightness = event;
    reflectMaterial();
    return;
  }
  if (keyName === 'Stroke Hue') {
    parameter.strokeHue = event;
    reflectStroke();
    return;
  }
  if (keyName === 'Stroke Saturation') {
    parameter.strokeSaturation = event;
    reflectStroke();
    return;
  }
  if (keyName === 'Stroke Lightness') {
    parameter.strokeLightness = event;
    reflectStroke();
    return;
  }
}

function loadSvgFile(fileURL) {
  return new Promise((resolve, reject) => {
    const loader = new SVGLoader();
    loader.load(
      fileURL,
      (data) => {
        resolve(data);
      },
      (progress) => {
        console.log(progress);
      },
      (error) => {
        reject(error);
      }
    );
  });
}

function deg2rad(deg) {
  return (deg * Math.PI) / 180.0;
}

function reflectObject() {
  svgGroup.rotateX(deg2rad(parameter.objectRotateX));
  svgGroup.rotateY(deg2rad(parameter.objectRotateY));
  svgGroup.rotateZ(deg2rad(parameter.objectRotateZ));
}

function reflectMaterial() {
  // https://github.com/mrdoob/three.js/blob/master/examples/webgl_geometry_teapot.html#L255
  materialDiffuseColor.setHSL(
    parameter.materialHue,
    parameter.materialSaturation,
    parameter.materialLightness
  );
  fillMaterial.color.copy(materialDiffuseColor);
}
function reflectStroke() {
  // https://github.com/mrdoob/three.js/blob/master/examples/webgl_geometry_teapot.html#L255
  strokeDiffuseColor.setHSL(
    parameter.strokeHue,
    parameter.strokeSaturation,
    parameter.strokeLightness
  );
  stokeMaterial.color.copy(strokeDiffuseColor);
}

const renderSVG = async (extrusion, fileURL) => {
  fillMaterial = new THREE.MeshBasicMaterial({
    color: `#222222`,
  });

  stokeMaterial = new THREE.LineBasicMaterial({
    color: `#eeeeee`,
  });

  const svgData = await loadSvgFile(fileURL);

  const updateMap = [];

  svgGroup.scale.y *= -1;
  svgData.paths.forEach((path) => {
    const shapes = SVGLoader.createShapes(path);
    shapes.forEach((shape) => {
      // https://threejs.org/docs/#api/en/geometries/ExtrudeGeometry
      const meshGeometry = new THREE.ExtrudeBufferGeometry(shape, {
        depth: extrusion,
        bevelEnabled: false,
      });
      // https://threejs.org/docs/#api/en/geometries/EdgesGeometry
      const linesGeometry = new THREE.EdgesGeometry(meshGeometry);
      const mesh = new THREE.Mesh(meshGeometry, fillMaterial);
      const lines = new THREE.LineSegments(linesGeometry, stokeMaterial);

      updateMap.push({shape, mesh, lines});
      svgGroup.add(mesh, lines);
    });
  });

  const box = new THREE.Box3().setFromObject(svgGroup);
  const size = box.getSize(new THREE.Vector3());
  // const yOffset = size.y / -2;
  // const xOffset = size.x / -2;

  // svgGroup.children.forEach((item) => {
  //   item.position.x = xOffset;
  //   item.position.y = yOffset;
  // });

  return {
    object: svgGroup,
    update(extrusion) {
      updateMap.forEach((updateDetails) => {
        const meshGeometry = new THREE.ExtrudeBufferGeometry(
          updateDetails.shape,
          {
            depth: extrusion,
            bevelEnabled: false,
          }
        );
        const linesGeometry = new THREE.EdgesGeometry(meshGeometry);

        updateDetails.mesh.geometry.dispose();
        updateDetails.lines.geometry.dispose();
        updateDetails.mesh.geometry = meshGeometry;
        updateDetails.lines.geometry = linesGeometry;
      });
    },
  };
};

const setupScene = (container) => {
  const scene = new THREE.Scene();
  const renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
  const camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.01,
    1e5
  );
  const ambientLight = new THREE.AmbientLight('#888888');
  const pointLight = new THREE.PointLight('#ffffff', 2, 800);
  const controls = new OrbitControls(camera, renderer.domElement);
  const animate = () => {
    stats.begin();
    renderer.render(scene, camera);
    controls.update();
    stats.end();
    requestAnimationFrame(animate);
  };

  renderer.setSize(window.innerWidth, window.innerHeight);
  scene.add(ambientLight, pointLight);
  camera.position.z = 50;
  camera.position.x = 50;
  camera.position.y = 50;
  controls.enablePan = false;

  container.append(renderer.domElement);
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
  animate();

  return {camera, controls, scene};
};

(async () => {
  const app = document.querySelector('#app');
  const {scene, camera, controls} = setupScene(app);
  const {object, update} = await renderSVG(
    parameter.depth,
    './static/svg/twitter.svg'
  );
  updateAnimation = update;
  scene.add(object);
})();
