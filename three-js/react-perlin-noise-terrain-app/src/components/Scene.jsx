import {OrbitControls} from '@react-three/drei';
import {useThree} from '@react-three/fiber';
import {useEffect, useCallback} from 'react';
import {Floor} from './Floor';
import * as d3 from 'd3';

const Scene = ({progress, minProgress, maxProgress, stepProgress}) => {
  const {
    scene,
    gl,
    camera,
    size: {width, height},
  } = useThree();

  const onWindowResize = useCallback(() => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    scene.updateMatrix();
  }, []);

  useEffect(() => {
    camera.zoom = progress;
    camera.updateProjectionMatrix();
    scene.updateMatrix();
  }, [progress]);

  useEffect(() => {
    window.addEventListener('resize', onWindowResize);
    return () => {
      window.removeEventListener('resize', onWindowResize);
    };
  }, []);

  return (
    <>
      <Floor />
      <OrbitControls enableZoom enablePan enableRotate autoRotate />
    </>
  );
};

export {Scene};
