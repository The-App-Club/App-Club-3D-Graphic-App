import './index.css';
import { Kidding } from './components/Kidding';
import { Pudding } from './components/Pudding';
import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Canvas, useFrame } from '@react-three/fiber';

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas
        camera={{
          position: [0, 10, 8],
          fov: 75,
          aspect: window.innerWidth / window.innerHeight,
          near: 0.1,
          far: 2000,
        }}
        dpr={window.devicePixelRatio}
        shadows
      >
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Kidding position={[-1.2, 0, 0]} />
        <Kidding position={[1.2, 0, 0]} />
      </Canvas>
      {/* <Kidding></Kidding> */}
      {/* <Pudding></Pudding> */}
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
