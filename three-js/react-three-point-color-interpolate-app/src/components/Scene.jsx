import {OrbitControls} from '@react-three/drei';
import {useThree} from '@react-three/fiber';
import {useEffect, useCallback} from 'react';
import {Dot} from './Dot';
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
      <Dot
        x={-3}
        y={0}
        z={0}
        progress={progress}
        minProgress={minProgress}
        maxProgress={maxProgress}
        stepProgress={stepProgress}
        colorInterpolator={d3.interpolateGreens}
      />
      <Dot
        x={0}
        y={0}
        z={0}
        progress={progress}
        minProgress={minProgress}
        maxProgress={maxProgress}
        stepProgress={stepProgress}
        colorInterpolator={d3.interpolateBlues}
      />
      <Dot
        x={3}
        y={0}
        z={0}
        progress={progress}
        minProgress={minProgress}
        maxProgress={maxProgress}
        stepProgress={stepProgress}
        colorInterpolator={d3.interpolateOranges}
      />
      <Dot
        x={0}
        y={3}
        z={0}
        progress={progress}
        minProgress={minProgress}
        maxProgress={maxProgress}
        stepProgress={stepProgress}
        colorInterpolator={d3.interpolatePurples}
      />
      <Dot
        x={0}
        y={-3}
        z={0}
        progress={progress}
        minProgress={minProgress}
        maxProgress={maxProgress}
        stepProgress={stepProgress}
        colorInterpolator={d3.interpolateRdYlBu}
      />
      <Dot
        x={0}
        y={0}
        z={3}
        progress={progress}
        minProgress={minProgress}
        maxProgress={maxProgress}
        stepProgress={stepProgress}
        colorInterpolator={d3.interpolateSpectral}
      />
      <Dot
        x={0}
        y={0}
        z={-3}
        progress={progress}
        minProgress={minProgress}
        maxProgress={maxProgress}
        stepProgress={stepProgress}
        colorInterpolator={d3.interpolateWarm}
      />
      <OrbitControls enableZoom enablePan enableRotate autoRotate />
    </>
  );
};

export {Scene};
