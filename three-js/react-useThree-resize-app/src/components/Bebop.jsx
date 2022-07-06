import { useRef } from "react";
import { Box } from "@react-three/drei";
const Bebop = () => {
  const box = useRef();
  return (
    <Box
      args={[10, 10, 10]}
      ref={box}
      onClick={(event) => {
        console.log("clicked");
      }}
      onPointerOver={(event) => {
        console.log("mouseover");
      }}
      onPointerOut={(event) => {
        console.log("mouseout");
      }}
      // onBeforeRender={(e) => {
      //   console.log(e);
      // }}
      // onAfterRender={(e)=>{
      //   console.log(e)
      // }}
    >
    </Box>
  );
};

export { Bebop };
