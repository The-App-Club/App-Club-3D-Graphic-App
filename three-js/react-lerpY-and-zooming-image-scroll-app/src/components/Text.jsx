import {useCallback} from 'react';
import {useThree} from '@react-three/fiber';
import {transform} from 'framer-motion';
import {css} from '@emotion/css';

const Text = ({posX, posY, fromPage, toPage, children}) => {
  const {width: w, height: h} = useThree((state) => state.viewport);

  const clampX = useCallback((x) => {
    return transform([0, 1], [0, 100])(x);
  }, []);

  const clampY = useCallback((y) => {
    return transform([0, 1], [fromPage * 100, toPage * 100])(y);
  }, []);

  return (
    <h1
      className={css`
        position: absolute;
        font-size: 1rem;
        top: ${clampY(posY)}vh;
        left: ${clampX(posX)}vw;
      `}
    >
      {children}
    </h1>
  );
};

export {Text};
