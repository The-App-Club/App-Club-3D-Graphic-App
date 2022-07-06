import React from 'react';
import * as THREE from 'three';
import { OrbitControls, Stats } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { MeshVisualizer } from '../components/MeshVisualizer';

const Visualizer = () => {
  return (
    <Canvas
      camera={{
        position: [0, 3, 15],
        fov: 50,
        aspect: window.innerWidth / window.innerHeight,
        near: 0.1,
        far: 2000,
      }}
      dpr={window.devicePixelRatio}
    >
      {/* canvas color */}
      <color attach="background" args={['#1e1e1e']} />
      {/* fps */}
      <Stats />
      {/* camera controller */}
      <OrbitControls attach="orbitControls" />
      {/* lights */}
      <ambientLight intensity={1} />
      {/* objects */}
      <MeshVisualizer />
    </Canvas>
  );
};
export { Visualizer };
