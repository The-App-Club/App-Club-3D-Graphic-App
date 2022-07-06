import {OrbitControls} from '@react-three/drei';
import {useThree} from '@react-three/fiber';
import {useEffect, useCallback} from 'react';
import {Line} from './Line';
import * as d3 from 'd3';
import {MathUtils} from 'three';

// for (let index = 0; index <= 7; index++) {
//   console.log(index, MathUtils.mapLinear(index, 0, 7, 0, 1));
// }

const step = (n) => {
  return MathUtils.mapLinear(n, 0, 5, 0, 1);
};

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
      <Line
        start={[0, 0, 0]}
        end={[10, 0, 0]}
        progress={progress}
        minProgress={minProgress}
        maxProgress={maxProgress}
        stepProgress={stepProgress}
        color={d3.interpolateSpectral(step(0))}
      />
      <Line
        start={[0, 0, 0]}
        end={[0, 10, 0]}
        progress={progress}
        minProgress={minProgress}
        maxProgress={maxProgress}
        stepProgress={stepProgress}
        color={d3.interpolateSpectral(step(1))}
      />
      <Line
        start={[0, 0, 0]}
        end={[0, 0, 10]}
        progress={progress}
        minProgress={minProgress}
        maxProgress={maxProgress}
        stepProgress={stepProgress}
        color={d3.interpolateSpectral(step(2))}
      />
      <Line
        start={[0, 0, 0]}
        end={[-10, 0, 0]}
        progress={progress}
        minProgress={minProgress}
        maxProgress={maxProgress}
        stepProgress={stepProgress}
        color={d3.interpolateSpectral(step(3))}
      />
      <Line
        start={[0, 0, 0]}
        end={[0, -10, 0]}
        progress={progress}
        minProgress={minProgress}
        maxProgress={maxProgress}
        stepProgress={stepProgress}
        color={d3.interpolateSpectral(step(4))}
      />
      <Line
        start={[0, 0, 0]}
        end={[0, 0, -10]}
        progress={progress}
        minProgress={minProgress}
        maxProgress={maxProgress}
        stepProgress={stepProgress}
        color={d3.interpolateSpectral(step(5))}
      />
      <OrbitControls enableZoom enablePan enableRotate autoRotate />
    </>
  );
};

export {Scene};
