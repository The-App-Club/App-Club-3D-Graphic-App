import {OrbitControls} from '@react-three/drei';
import {useThree} from '@react-three/fiber';
import {useEffect, useCallback, useMemo} from 'react';
import {Cube} from './Cube';
import * as d3 from 'd3';
import {GridHelper, Box3, Vector3, Box3Helper} from 'three';
import 'array-each-slice';
import {transform} from 'framer-motion';

const Scene = ({progress, minProgress, maxProgress, stepProgress}) => {
  const {
    scene,
    gl,
    camera,
    size: {width, height},
  } = useThree();

  const offset = (value) => {
    if (value < 0) {
      return -2;
    }
    return +2;
  };

  const cubePointList = useMemo(() => {
    const pointList = [];
    for (let x = -1; x <= 1; x++) {
      for (let z = -1; z <= 1; z++) {
        for (let y = -1; y <= 1; y++) {
          pointList.push({
            startPos: [x, y, z],
            endPos: [x, y, z],
          });
        }
      }
    }
    return pointList;
  }, []);
  const onWindowResize = useCallback(() => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    scene.updateMatrix();
  }, []);

  useEffect(() => {
    // camera.zoom = progress;
    // camera.updateProjectionMatrix();
    // scene.updateMatrix();
  }, [progress]);

  useEffect(() => {
    window.addEventListener('resize', onWindowResize);
    return () => {
      window.removeEventListener('resize', onWindowResize);
    };
  }, []);

  return (
    <>
      {cubePointList.map(({startPos, endPos}, index) => {
        return (
          <Cube
            key={index}
            startPos={startPos}
            endPos={endPos}
            progress={progress}
            minProgress={minProgress}
            maxProgress={maxProgress}
            stepProgress={stepProgress}
            color={d3.interpolateBlues(
              transform([0, cubePointList.length - 1], [0, 1])(index)
            )}
          />
        );
      })}
      <OrbitControls enableZoom enablePan enableRotate autoRotate />
    </>
  );
};

export {Scene};
