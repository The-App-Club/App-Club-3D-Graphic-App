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
        startPos={[-3, 0, 0]}
        endPos={[6, 0, 0]}
        progress={progress}
        minProgress={minProgress}
        maxProgress={maxProgress}
        stepProgress={stepProgress}
        color={d3.interpolateBlues(0.5)}
      />
      <Dot
        startPos={[3, 0, 0]}
        endPos={[-6, 0, 0]}
        progress={progress}
        minProgress={minProgress}
        maxProgress={maxProgress}
        stepProgress={stepProgress}
        color={d3.interpolateSpectral(0.5)}
      />
      <Dot
        startPos={[0, 0, 3]}
        endPos={[0, 0, -6]}
        progress={progress}
        minProgress={minProgress}
        maxProgress={maxProgress}
        stepProgress={stepProgress}
        color={d3.interpolatePlasma(0.5)}
      />
      <Dot
        startPos={[0, 0, -3]}
        endPos={[0, 0, 6]}
        progress={progress}
        minProgress={minProgress}
        maxProgress={maxProgress}
        stepProgress={stepProgress}
        color={d3.interpolateGreens(0.5)}
      />
      <Dot
        startPos={[0, 3, 0]}
        endPos={[0, -6, 0]}
        progress={progress}
        minProgress={minProgress}
        maxProgress={maxProgress}
        stepProgress={stepProgress}
        color={d3.interpolateInferno(0.5)}
      />
      <Dot
        startPos={[0, -3, 0]}
        endPos={[0, 6, 0]}
        progress={progress}
        minProgress={minProgress}
        maxProgress={maxProgress}
        stepProgress={stepProgress}
        color={d3.interpolateOranges(0.5)}
      />
      <OrbitControls enableZoom enablePan enableRotate autoRotate />
    </>
  );
};

export {Scene};
