import {useThree} from '@react-three/fiber';
import {useEffect, useCallback, Suspense} from 'react';
import {Picutre} from './Picutre';
import * as d3 from 'd3';
import {
  OrbitControls,
  useScroll,
  Image,
  ScrollControls,
  Scroll,
} from '@react-three/drei';

const Scene = ({progress, minProgress, maxProgress, stepProgress}) => {
  const {
    scene,
    gl,
    camera,
    size: {width, height},
    viewport,
  } = useThree((state) => {
    return state;
  });

  const onWindowResize = useCallback(() => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    scene.updateMatrix();
  }, []);

  // useEffect(() => {
  //   camera.zoom = progress;
  //   camera.updateProjectionMatrix();
  //   scene.updateMatrix();
  // }, [progress]);

  useEffect(() => {
    window.addEventListener('resize', onWindowResize);
    return () => {
      window.removeEventListener('resize', onWindowResize);
    };
  }, []);

  return (
    <Suspense fallback={null}>
      <ScrollControls damping={3} pages={3} horizontal={true} infinite={false}>
        <Scroll>
          <Picutre
            sizeW={120}
            sizeH={150}
            url={`https://media.giphy.com/media/10VjiVoa9rWC4M/giphy.gif`}
            x={-0.7}
            y={0.6}
            page={1}
          />
          <Picutre
            sizeW={250}
            sizeH={150}
            url={`https://media.giphy.com/media/4ilFRqgbzbx4c/giphy.gif`}
            x={0.6}
            y={0.8}
            page={1}
          />
          <Picutre
            sizeW={150}
            sizeH={250}
            url={`https://media.giphy.com/media/MeFiwDSGDApHy/giphy.gif`}
            x={-0.8}
            y={-0.6}
            page={1}
          />
          <Picutre
            sizeW={150}
            sizeH={150}
            url={`https://media.giphy.com/media/eeYbfcTxoxGlG/giphy.gif`}
            x={0.8}
            y={-0.6}
            page={1}
          />
          <Picutre
            sizeW={150}
            sizeH={150}
            url={`https://media.giphy.com/media/iIkP9O94wiFlm/giphy.gif`}
            x={0}
            y={0}
            page={1}
          />
          <Picutre
            sizeW={150}
            sizeH={150}
            url={`https://media.giphy.com/media/BrFTdYQmMXduw/giphy.gif`}
            x={-0.7}
            y={0.4}
            page={2}
          />
          <Picutre
            sizeW={150}
            sizeH={80}
            url={`https://media.giphy.com/media/4ilFRqgbzbx4c/giphy.gif`}
            x={0}
            y={-0.3}
            page={2}
          />
          <Picutre
            sizeW={80}
            sizeH={150}
            url={`https://media.giphy.com/media/xdgisqRDFyO9G/giphy.gif`}
            x={0.7}
            y={0.6}
            page={2}
          />
          <Picutre
            sizeW={150}
            sizeH={120}
            url={`https://media.giphy.com/media/b21HcSrrBu8pi/giphy.gif`}
            x={-0.7}
            y={0.4}
            page={3}
          />
          <Picutre
            sizeW={150}
            sizeH={230}
            url={`https://media.giphy.com/media/3TACspcXhhQPK/giphy.gif`}
            x={0}
            y={-0.3}
            page={3}
          />
          <Picutre
            sizeW={180}
            sizeH={150}
            url={`https://media.giphy.com/media/b1dXky39p5Zcs/giphy.gif`}
            x={0.7}
            y={0.6}
            page={3}
          />
        </Scroll>
        {/* <Scroll html>
          <h1 style={{position: 'absolute', top: '60vh', left: '1.5em'}}>
            Be
          </h1>
          <h1 style={{position: 'absolute', top: '140vh', left: '40vw'}}>
            Creative
          </h1>
        </Scroll> */}
      </ScrollControls>
    </Suspense>
  );
};

export {Scene};
