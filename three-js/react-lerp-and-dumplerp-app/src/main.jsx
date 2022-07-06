import {createRoot} from 'react-dom/client';
import './styles/index.scss';
import {Canvas} from '@react-three/fiber';
import {css} from '@emotion/css';
import {useMemo, useState, useRef, useEffect, useCallback} from 'react';
import {Button, Slider} from '@mui/material';
import {useMotionValue, animate} from 'framer-motion';
import * as R from 'ramda';
import {MathUtils} from 'three';

const App = () => {
  const [tik, setTik] = useState(null);
  const [forward, setForward] = useState(true);
  const x = useMotionValue(0);
  const [moveX, setMoveX] = useState(0);
  const [moveX2, setMoveX2] = useState(0);
  const [moveX3, setMoveX3] = useState(0);
  const [moveX4, setMoveX4] = useState(0);

  const lerp = useCallback((start, end) => {
    return (t) => {
      return MathUtils.lerp(start, end, t);
    };
  }, []);

  const smoothstep = useCallback((start, end) => {
    return (value) => {
      return MathUtils.smoothstep(value, start, end);
    };
  }, []);

  const lerpDump = useCallback((start, end) => {
    return (lambda) => {
      return (t) => {
        return MathUtils.damp(start, end, lambda, t);
      };
    };
  }, []);

  const lerpCustomDump = useCallback((start, end) => {
    return (lambda) => {
      return (t) => {
        return MathUtils.lerp(start, end, 1 - Math.exp(-lambda * t));
      };
    };
  }, []);

  const swap = useCallback(
    (array = []) => {
      if (!forward) {
        return array.reverse();
      }
      return array;
    },
    [forward]
  );

  useEffect(() => {
    if (!tik) {
      return;
    }
    x.set(0);
    const controls = animate(x, 200, {
      duration: 0.7,
      onUpdate: (t) => {
        const progress = R.clamp(0, 1, t / 200);
        setMoveX(lerp(...swap([0, 700]))(progress));
        setMoveX2(lerpDump(...swap([700, 0]))(5)(progress));
        setMoveX3(lerpCustomDump(...swap([0, 700]))(4)(progress));
        setMoveX3(lerpCustomDump(...swap([0, 700]))(4)(progress));
        // setMoveX4(smoothstep(0, 100)(t));
        // console.log(lerp(0, 3)(progress), smoothstep(0, 200)(t));
      },
    });
    return controls.stop;
  }, [tik]);
  return (
    <>
      <Button
        variant={'outlined'}
        onClick={(e) => {
          setTik(new Date());
          setForward((forward) => {
            return !forward;
          });
        }}
      >
        {'Do'}
      </Button>
      <div
        className={css`
          position: relative;
        `}
      >
        <div
          className={css`
            position: absolute;
            width: 100px;
            height: 100px;
            background: red;
            top: 1rem;
            left: ${moveX}px;
          `}
        />
        <div
          className={css`
            position: absolute;
            width: 100px;
            height: 100px;
            background: green;
            top: 10rem;
            left: ${moveX2}px;
          `}
        />
        <div
          className={css`
            position: absolute;
            width: 100px;
            height: 100px;
            background: blue;
            top: 20rem;
            left: ${700 - moveX3}px;
          `}
        />
        <div
          className={css`
            position: absolute;
            width: 100px;
            height: 100px;
            background: orange;
            top: 30rem;
            left: ${moveX4}px;
          `}
        />
      </div>
    </>
  );
};

const container = document.getElementById('root');

const root = createRoot(container);

root.render(<App />);
