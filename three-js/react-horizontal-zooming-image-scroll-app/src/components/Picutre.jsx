import {css} from '@emotion/css';
import {useMemo, useState, useRef, useCallback, useEffect} from 'react';
import {useThree, useFrame, Canvas} from '@react-three/fiber';
import {
  useIntersect,
  useScroll,
  Image,
  ScrollControls,
  Scroll,
} from '@react-three/drei';
import {transform} from 'framer-motion';
import * as THREE from 'three';

const Picutre = ({
  sizeW = 120,
  sizeH = 50,
  url = `https://media.giphy.com/media/4ilFRqgbzbx4c/giphy.gif`,
  x = 0, // -1 ~ 1
  y = 0, // -1 ~ 1
  page = 1,
}) => {
  const {width: w, height: h} = useThree((state) => {
    return state.viewport;
  });
  const visible = useRef(false);
  const data = useScroll();
  const group = useRef();
  const ref = useIntersect((isVisible) => (visible.current = isVisible));
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
  const clampWidth = (width) => {
    return transform([0, window.innerWidth / 2], [0, w])(width);
  };

  const clampHeight = (height) => {
    return transform([0, window.innerHeight / 2], [0, h])(height);
  };

  const clampX = useCallback(
    (x) => {
      return transform(
        [-1, 1],
        [-w / 2 + w * (page - 1), w / 2 + w * (page - 1)]
      )(x);
    },
    [page]
  );

  const clampY = useCallback(
    (y) => {
      return transform([-1, 1], [-h / 2, h / 2])(y);
    },
    [page]
  );

  return (
    <group
      ref={group}
      position={[clampX(x), clampY(y), 0]}
      onClick={(e) => {
        // console.log(e)
        window.alert(url);
      }}
    >
      <Image
        ref={ref}
        url={url}
        scale={[clampWidth(sizeW), clampHeight(sizeH), 1]}
        grayscale={0}
        opacity={1}
        zoom={1}
      />
    </group>
  );
};

export {Picutre};
