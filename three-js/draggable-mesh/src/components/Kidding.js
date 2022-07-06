import React, { Suspense, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { DragControls } from 'three-stdlib';
import { OrbitControls, Sphere, Stats, TorusKnot, useHelper, useTexture } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';

const Kidding = () => {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas
        camera={{
          position: [0, 10, 8],
          fov: 50,
          aspect: window.innerWidth / window.innerHeight,
          near: 0.1,
          far: 2000,
        }}
        dpr={window.devicePixelRatio}
        shadows
      >
        {/* canvas color */}
        <color attach="background" args={['#1e1e1e']} />
        {/* fps */}
        <Stats />
        {/* camera controller */}
        <OrbitControls attach="orbitControls" />
        {/* lights */}
        <Draggable>
          <PointLight />
        </Draggable>
        {/* objects */}
        <Suspense fallback={null}>
          <Draggable>
            <ToonTorusKnot textureName="logo192" color="#22cefa" position={[1, 2, 0]} />
          </Draggable>
          <Draggable>
            <ToonTorusKnot textureName="SlackImage" color="#ea7600" position={[-1, 2, 0]} />
          </Draggable>
        </Suspense>
        {/* helper */}
        <axesHelper />
        <gridHelper position={[0, 0.01, 0]} args={[10, 10, 'red', 'black']} />
      </Canvas>
    </div>
  );
};

const ToonTorusKnot = (props) => {
  const { textureName, color, position } = props;
  const ref = useRef(null);

  const toneMap = useTexture(`./${textureName}.png`);
  toneMap.minFilter = THREE.NearestFilter;
  toneMap.magFilter = THREE.NearestFilter;

  useFrame(() => {
    ref.current.rotation.x += 0.005;
    ref.current.rotation.y += 0.005;
  });

  return (
    <TorusKnot ref={ref} args={[0.5, 0.2, 128, 128]} position={position}>
      <meshToonMaterial color={color} gradientMap={toneMap} />
    </TorusKnot>
  );
};

const PointLight = () => {
  const lightRef = useRef();

  useHelper(lightRef, THREE.PointLightHelper, [0.5]);

  return (
    <group position={[0, 5, 0]}>
      <Sphere scale={0.2}>
        <meshBasicMaterial color="#f3f3f3" />
      </Sphere>
      <pointLight ref={lightRef} intensity={1} shadow-mapSize-width={2048} shadow-mapSize-height={2048} castShadow />
    </group>
  );
};

const Draggable = ({ children }) => {
  const ref = useRef(null);
  const { camera, gl, scene } = useThree();

  useEffect(() => {
    const controls = new DragControls(ref.current.children, camera, gl.domElement);
    controls.transformGroup = true;

    const orbitControls = scene.orbitControls;

    controls.addEventListener('dragstart', () => {
      orbitControls.enabled = false;
    });
    controls.addEventListener('dragend', () => {
      orbitControls.enabled = true;
    });
  }, [camera, gl.domElement, scene]);

  return <group ref={ref}>{children}</group>;
};

export { Kidding };
