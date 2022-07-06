import { useState } from "react";
import { useSpring } from "@react-spring/core";
import { a } from "@react-spring/three";
import { transform } from "framer-motion";
import { samples, interpolate, formatHex } from "culori";
import easing from "bezier-easing";
import * as d3 from "d3";

const Bebop = () => {
  const [active, setActive] = useState(0);

  const { spring } = useSpring({
    spring: active,
    config: { mass: 5, tension: 400, friction: 50, precision: 0.0001 },
  });

  // interpolate values from commong spring
  const scale = spring.to([0, 1], [1, 5]);
  const rotation = spring.to([0, 1], [0, Math.PI / 2]);
  const color = spring.to([0, 0.5, 1], ["#54d0ff", "#9f92ff", "#ff7689"]);

  return (
    <a.group position-y={scale}>
      <a.mesh
        rotation-y={rotation}
        scale-x={scale}
        scale-y={scale}
        scale-z={scale}
        onClick={(e) => {
          setActive(Number(!active));
        }}
      >
        <boxBufferGeometry attach="geometry" args={[10, 10, 10]} />
        <a.meshStandardMaterial
          roughness={0.5}
          attach="material"
          color={color}
        />
      </a.mesh>
    </a.group>
  );
};
export { Bebop };
