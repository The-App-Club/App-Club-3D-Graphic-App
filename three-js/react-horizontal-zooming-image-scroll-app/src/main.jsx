import {createRoot} from 'react-dom/client';
import './styles/index.scss';
import {css} from '@emotion/css';
import {useMemo, useState, useRef, Suspense} from 'react';
import {Slider} from '@mui/material';
import {useThree, useFrame, Canvas} from '@react-three/fiber';
import {useScroll, Image, ScrollControls, Scroll} from '@react-three/drei';
import {Scene} from './components/Scene';
import {Spacer} from './components/Spacer';

const App = () => {
  const [progress, setProgress] = useState(1);

  const [minProgress, maxProgress, stepProgress] = useMemo(() => {
    return [-5, 5, 0.1];
  }, []);

  const handleChange = (e) => {
    setProgress(e.target.value);
  };

  // https://docs.pmnd.rs/react-three-fiber/api/canvas
  return (
    <div>
      <div
        className={css`
          width: 100vw;
          height: 100vh;
          background: transparent;
        `}
      >
        <Canvas camera={{position: [0, 0, 10], zoom: 1}}>
          <ambientLight />
          <Scene
          // progress={progress}
          // minProgress={minProgress}
          // maxProgress={maxProgress}
          // stepProgress={stepProgress}
          />
        </Canvas>
      </div>
      {/* {[...Array(10).keys()].map((n, index) => {
        return <Spacer key={index} />;
      })}
      <p>hohoh</p> */}
    </div>
  );
};

const container = document.getElementById('root');

const root = createRoot(container);

root.render(<App />);
