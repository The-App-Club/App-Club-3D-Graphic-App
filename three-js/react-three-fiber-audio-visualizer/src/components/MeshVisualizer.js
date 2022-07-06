import React, { useRef } from 'react';
import * as THREE from 'three';
import { Plane } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { analyserNode } from '../store/index';

const MeshVisualizer = () => {
  const planeRef = useRef(null);

  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  const texture = new THREE.Texture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;

  useFrame(() => {
    if (analyserNode.data) {
      let timeData = new Uint8Array(analyserNode.data.frequencyBinCount);
      analyserNode.data.getByteFrequencyData(timeData);

      const imageData = ctx.getImageData(0, 1, 256, 511);
      ctx.putImageData(imageData, 0, 0, 0, 0, 256, 512);
      for (let x = 0; x < timeData.length; x++) {
        ctx.fillStyle = `rgb(${timeData[x]}, ${timeData[x]}, ${timeData[x]})`;
        ctx.fillRect(x, 510, 2, 2);
      }

      texture.needsUpdate = true;
    }
  });

  return (
    <Plane
      ref={planeRef}
      rotation={[-Math.PI / 2, 0, 0]}
      args={[20, 20, 256, 256]}
    >
      <meshPhongMaterial
        wireframe
        color="#0f0"
        displacementMap={texture}
        displacementScale={10}
      />
    </Plane>
  );
};

export { MeshVisualizer };
