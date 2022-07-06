import { useControls } from 'leva';
import React, { useEffect, useRef, VFC } from 'react';
import * as THREE from 'three';
import { OrbitControls, Plane, Stats } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';

const TexturedPlane = () => {
  const matRef = useRef(null);
  const textureRef = useRef(null);

  const datas = useControls({
    color: '#2694ab',
    subdivide: {
      value: 300,
      min: 50,
      max: 500,
      step: 10,
    },
    displacementScale: {
      value: 5,
      min: 0.1,
      max: 5,
      step: 0.1,
    },
    wireframe: true,
    shadow: false,
  });

  useEffect(() => {
    const drawer = document.getElementById('drawer');
    if (drawer) {
      const canvas = drawer;
      const texture = new THREE.Texture(canvas);
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      matRef.current.displacementMap = texture;
      textureRef.current = texture;
    }
  }, []);

  useFrame(() => {
    if (textureRef.current) {
      textureRef.current.needsUpdate = true;
    }
  });

  return (
    <Plane
      rotation={[-Math.PI / 2, 0, 0]}
      args={[20, 20, datas.subdivide, datas.subdivide]}
      castShadow={datas.shadow}
      receiveShadow
    >
      <meshPhongMaterial ref={matRef} {...datas} side={THREE.DoubleSide} />
    </Plane>
  );
};

export { TexturedPlane };
