import {transform} from 'framer-motion';
import {useRef, useEffect, useState} from 'react';
import {Box} from '@react-three/drei';
import {useFrame} from '@react-three/fiber';
import * as THREE from 'three';
import * as d3 from 'd3';
const Dot = ({
  x = 0,
  y = 0,
  z = 0,
  progress,
  minProgress,
  maxProgress,
  colorInterpolator,
}) => {
  const box = useRef();
  const vec = new THREE.Vector3(x, y, z);
  const [active, setActive] = useState(false);
  const [color, setColor] = useState('red');
  useFrame(({clock}) => {
    const elapsedTime = clock.getElapsedTime();
    const frameProgress = THREE.MathUtils.clamp(elapsedTime % 1, 0, 1);
    box.current.position.lerp(vec, 0.1);
    if (active) {
      // console.log(frameProgress, d3.interpolateBlues(frameProgress));
      setColor(colorInterpolator(frameProgress));
    }
  });

  useEffect(() => {
    const niceProgress = transform(
      [minProgress, maxProgress],
      [0, 1]
    )(progress);
    console.log(niceProgress);
  }, [progress]);

  return (
    <Box
      ref={box}
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

export {Dot};
