import * as THREE from 'three';
import {useRef, useCallback} from 'react';
import {useFrame, useThree} from '@react-three/fiber';
import {
  useIntersect,
  Image,
  ScrollControls,
  Scroll,
  useScroll,
} from '@react-three/drei';
import {transform} from 'framer-motion';

const Item = ({url, posX, posY, sizeW, sizeH, page}) => {
  const visible = useRef(false);
  const group = useRef();
  const data = useScroll();
  const ref = useIntersect((isVisible) => (visible.current = isVisible));
  const {width: w, height: h} = useThree((state) => state.viewport);
  useFrame((state, delta) => {
    ref.current.position.y = THREE.MathUtils.damp(
      ref.current.position.y,
      visible.current ? 0 : -h / 2 + 1,
      4,
      delta
    );
    ref.current.material.zoom = THREE.MathUtils.damp(
      ref.current.material.zoom,
      visible.current ? 1 : 1.5,
      4,
      delta
    );
    // https://github.com/pmndrs/drei#scrollcontrols
  });

  const clampX = useCallback((x) => {
    return transform([-1, 1], [-w / 2, w / 2])(x);
  }, []);

  const clampY = useCallback(
    (y) => {
      return -h * (page - 1 + y);
    },
    [page]
  );
  const clampWidth = useCallback((width) => {
    return transform(
      [-window.innerWidth / 2, window.innerWidth / 2],
      [-w, w]
    )(width);
  }, []);

  const clampHeight = useCallback((height) => {
    return transform(
      [-window.innerHeight / 2, window.innerHeight / 2],
      [-h, h]
    )(height);
  }, []);
  return (
    <group
      ref={group}
      position={[clampX(posX), clampY(posY), 1]}
      onClick={(e) => {
        // console.log(e)
        window.alert(url);
      }}
    >
      <Image
        ref={ref}
        scale={[clampWidth(sizeW), clampHeight(sizeH), 1]}
        url={url}
        grayscale={0}
        opacity={1}
        zoom={1}
      />
    </group>
  );
};

export {Item};
