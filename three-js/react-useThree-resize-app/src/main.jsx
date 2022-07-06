import { createRoot } from "react-dom/client";
import "./styles/index.scss";
import { Canvas } from "@react-three/fiber";
import { css } from "@emotion/css";
import { Globe } from "./components/Globe";
import { useState } from "react";
import { Slider } from "@mui/material";
const App = () => {
  const [progress, setProgress] = useState(5);

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
          min={-10}
          max={10}
          step={0.1}
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
          background: rgb(143, 218, 250);
        `}
      >
        <Canvas camera={{ position: [0, 0, 200], zoom: 1 }}>
          <Globe progress={progress} />
        </Canvas>
      </div>
    </>
  );
};

const container = document.getElementById("root");

const root = createRoot(container);

root.render(<App />);
