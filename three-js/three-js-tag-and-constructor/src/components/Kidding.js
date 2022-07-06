import ReactDOM from 'react-dom';
import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

// https://github.com/pmndrs/react-three-fiber
const Kidding = (props) => {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef();
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => {
    ref.current.rotation.x += 0.01;
    ref.current.rotation.y += 0.01;
  });
  // Return the view, these are regular Threejs elements expressed in JSX
  // コールバックも取れて便利使いやすそう
  return (
    <mesh {...props} ref={ref} scale={clicked ? 1.5 : 1} onClick={(event) => click(!clicked)} onPointerOver={(event) => hover(true)} onPointerOut={(event) => hover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      {/* https://threejs.org/docs/#api/en/geometries/CircleGeometry */}
      {/* <circleGeometry args={[1, 32]}/> */}
      {/* <sphereGeometry args={[1, 32, 16]} /> */}
      <meshBasicMaterial color={'#123456'} />
      {/* <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} /> */}
    </mesh>
  );
};

export { Kidding };
