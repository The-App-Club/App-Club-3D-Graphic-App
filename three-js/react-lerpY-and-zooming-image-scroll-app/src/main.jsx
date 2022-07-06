import {createRoot} from 'react-dom/client';
import {css} from '@emotion/css';
import {useRef} from 'react';
import {Canvas, useFrame, useThree} from '@react-three/fiber';
import {ScrollControls, Scroll} from '@react-three/drei';
import {Items} from './components/Items';
import {Text} from './components/Text';
import './styles/index.scss';
const App = () => {
  return (
    <div
      className={css`
        width: 100%;
        height: 100vh;
        background: transparent;
      `}
    >
      <Canvas
        orthographic
        camera={{zoom: 80}}
        gl={{alpha: false, antialias: false, stencil: false, depth: false}}
        dpr={[1, 1.5]}
      >
        <color attach="background" args={['#f0f0f0']} />
        <ScrollControls damping={6} pages={5} horizontal={false}>
          <Items />
          <Scroll html style={{width: '100%', position: 'relative'}}>
            <Text posX={0} posY={0.1} fromPage={0} toPage={1}>
              {'Cowboy Bebop'}
            </Text>
            <Text posX={0.6} posY={0.6} fromPage={1} toPage={2}>
              {'Spike'}
            </Text>
            <Text posX={0.1} posY={0.3} fromPage={2} toPage={3}>
              {'Fei'}
            </Text>
            <Text posX={0.1} posY={0.3} fromPage={3} toPage={4}>
              {'Bebop'}
            </Text>
            <Text posX={0.5} posY={0.5} fromPage={4} toPage={5}>
              {'Cowboy'}
            </Text>
          </Scroll>
        </ScrollControls>
      </Canvas>
    </div>
  );
};

const container = document.getElementById('root');

const root = createRoot(container);

root.render(<App />);
