import {transform} from 'framer-motion';
import {useRef, useEffect, useState, useMemo, useLayoutEffect} from 'react';
import {Box} from '@react-three/drei';
import {useFrame} from '@react-three/fiber';
import * as THREE from 'three';
import * as d3 from 'd3';
import SimplexNoise from 'simplex-noise';
import 'array-each-slice';
import {default as chance} from 'chance';

const simplex = new SimplexNoise();

const Floor = ({}) => {
  const refPlane = useRef();

  const vertices = useMemo(() => {
    if (!refPlane.current) {
      return;
    }
    const noiseList = [];
    // https://stackoverflow.com/questions/69891379/react-three-fiber-to-draw-custom-vertices
    const planeVertices = refPlane.current.attributes.position.array;
    for (let i = 0; i < planeVertices.length; i++) {
      const x = planeVertices[i * 3 + 0];
      const y = planeVertices[i * 3 + 1];
      const z = planeVertices[i * 3 + 2];
      if (x !== undefined && y !== undefined && z !== undefined) {
        const noiseValue = simplex.noise3D(x, y, Math.random());
        planeVertices[i * 3 + 2] = noiseValue;
        noiseList.push(noiseValue);
      }
    }
    return noiseList;
  }, [refPlane.current]);

  // https://github.com/matahj/gdgunam/blob/master/threejs-react/src/components/Floor.js#L14-L22
  let offset = 0.05;
  useFrame(({clock}) => {
    const time = clock.getElapsedTime();
    const planeVertices = refPlane.current.attributes.position.array;
    vertices.forEach((vertice, index) => {
      const i = Math.floor((index + offset) % vertices.length);
      // planeVertices[i * 3  + 2] = vertice;
      planeVertices[i * 3 + 2] =
        3.42 * Math.sin(planeVertices[i * 3 + 0] * 2 + time);
    });
    offset += 0.05;
    // https://threejs.org/docs/#manual/en/introduction/How-to-update-things
    refPlane.current.attributes.position.needsUpdate = true; // required after the first render
  });

  return (
    <mesh position={[0, -3, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <planeGeometry ref={refPlane} attach="geometry" args={[30, 30, 10, 10]} />
      <meshBasicMaterial attach="material" color="grey" wireframe />
    </mesh>
  );
};

export {Floor};
