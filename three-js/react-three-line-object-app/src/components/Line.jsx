import {transform} from 'framer-motion';
import {useRef, useEffect, useState, useMemo, useLayoutEffect} from 'react';
import {Box} from '@react-three/drei';
import {useFrame} from '@react-three/fiber';
import * as THREE from 'three';
import * as d3 from 'd3';
// https://stackoverflow.com/a/68663264/15972569
const Line = ({start, end, progress, minProgress, maxProgress, color}) => {
  const lineDomRef = useRef();
  const [active, setActive] = useState(false);
  // const [color, setColor] = useState('red');
  useLayoutEffect(() => {
    lineDomRef.current.geometry.setFromPoints(
      [start, end].map((point) => {
        return new THREE.Vector3(...point);
      })
    );
  }, [start, end]);

  useEffect(() => {
    const niceProgress = transform(
      [minProgress, maxProgress],
      [0, 1]
    )(progress);
    console.log(niceProgress);
  }, [progress]);

  useFrame(({clock}) => {
    const elapsedTime = clock.getElapsedTime();
    const frameProgress = THREE.MathUtils.clamp(elapsedTime % 1, 0, 1);
    // lineDomRef.current.position.lerp(vec, 0.1);
    // if (active) {
    //   setColor(colorInterpolator(frameProgress));
    // }
  });

  return (
    <line
      ref={lineDomRef}
      onClick={(e) => {
        setActive((active) => {
          return !active;
        });
      }}
    >
      <bufferGeometry />
      <lineBasicMaterial color={color} linewidth={13} />
    </line>
  );
};

export {Line};
