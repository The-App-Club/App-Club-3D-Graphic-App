import {transform} from 'framer-motion';
import {useRef, useEffect, useState} from 'react';
import {Box} from '@react-three/drei';
import {useFrame} from '@react-three/fiber';
import * as THREE from 'three';
import * as d3 from 'd3';
import gsap from 'gsap';
import {Power3} from 'gsap';
const Cube = ({
  startPos = [0, 0, 0],
  endPos = [0, 0, 0],
  progress,
  minProgress,
  maxProgress,
  color,
}) => {
  const box = useRef();
  const [active, setActive] = useState(true);
  useFrame(({clock}) => {
    const elapsedTime = clock.getElapsedTime();
    const frameProgress = THREE.MathUtils.clamp(elapsedTime % 1, 0, 1);
  });

  useEffect(() => {
    if (active) {
      gsap.to(
        {},
        {
          duration: 1,
          ease: Power3.easeInOut,
          onUpdate: (e) => {
            box.current.position.lerp(new THREE.Vector3(...startPos), 0.1);
          },
        }
      );
    } else {
      gsap.to(
        {},
        {
          duration: 1,
          ease: Power3.easeInOut,
          onUpdate: (e) => {
            box.current.position.lerp(new THREE.Vector3(...endPos), 0.1);
          },
        }
      );
    }
  }, [active]);

  useEffect(() => {
    const niceProgress = transform(
      [minProgress, maxProgress],
      [0, 1]
    )(progress);
    box.current.position.lerpVectors(
      new THREE.Vector3(...startPos),
      new THREE.Vector3(...endPos),
      niceProgress
    );
  }, [progress]);
  return (
    <Box
      ref={box}
      position={startPos}
      onClick={(e) => {
        setActive((active) => {
          return !active;
        });
      }}
    >
      <meshLambertMaterial attach="material" color={color} />
    </Box>
  );
};

export {Cube};
