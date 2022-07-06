import React from 'react';
import { OrbitControls, Stats } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { TexturedPlane } from './TexturedPlane';

const Viewer = () => {
  return (
    <Canvas
      camera={{
        position: [0, 20, 5],
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
      <ambientLight intensity={0.1} />
      <directionalLight
        position={[10, 10, 10]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.1}
        shadow-camera-far={40}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-camera-left={-15}
        shadow-camera-right={15}
        shadow-bias={-0.003}
      />
      {/* objects */}
      <TexturedPlane />
      {/* helper */}
      {/* <axesHelper /> */}
    </Canvas>
  );
};

export { Viewer };
