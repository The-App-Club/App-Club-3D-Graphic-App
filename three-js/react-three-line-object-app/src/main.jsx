import {createRoot} from 'react-dom/client';
import './styles/index.scss';
import {Canvas} from '@react-three/fiber';
import {css} from '@emotion/css';
import {Scene} from './components/Scene';
import {useMemo, useState} from 'react';
import {Slider} from '@mui/material';
const App = () => {
  const [progress, setProgress] = useState(1);

  const [minProgress, maxProgress, stepProgress] = useMemo(() => {
    return [-5, 5, 0.1];
  }, []);

  const handleChange = (e) => {
    setProgress(e.target.value);
  };
  return (
    <>
      <div
        className={css`
          position: fixed;
          top: 1.2rem;
          left: 1.2rem;
          margin: 0 auto;
          max-width: 30rem;
          width: 100%;
          padding: 1rem;
          z-index: 1;
          @media (max-width: 768px) {
            position: relative;
            top: initial;
            left: initial;
            top: 1.5rem;
            max-width: 100%;
          }
        `}
      >
        <Slider
          defaultValue={0}
          min={minProgress}
          max={maxProgress}
          step={stepProgress}
          value={progress}
          aria-label="Default"
          valueLabelDisplay="auto"
          onChange={handleChange}
        />
      </div>
      <div
        className={css`
          width: 100vw;
          height: 100vh;
          background: transparent;
        `}
      >
        <Canvas camera={{position: [0, 0, 10], zoom: 1}}>
          <ambientLight />
          {/* <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <pointLight position={[-10, -10, -10]} /> */}
          <Scene
            progress={progress}
            minProgress={minProgress}
            maxProgress={maxProgress}
            stepProgress={stepProgress}
          />
        </Canvas>
      </div>
    </>
  );
};

const container = document.getElementById('root');

const root = createRoot(container);

root.render(<App />);
