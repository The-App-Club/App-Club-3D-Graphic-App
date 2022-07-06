import React, { Suspense, VFC } from 'react';
import * as THREE from 'three';
import { Environment, OrbitControls, Stats } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { Objects } from './Objects';

function ShaderMesh() {
  return (
    <Canvas
      camera={{
        position: [15, 15, 15],
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
      <directionalLight position={[20, 20, 20]} castShadow />
      {/* objects */}
      <Suspense fallback={null}>
        <Environment preset="city" />
        <Objects />
      </Suspense>
      {/* helper */}
      <axesHelper />
    </Canvas>
  );
}

export { ShaderMesh };
