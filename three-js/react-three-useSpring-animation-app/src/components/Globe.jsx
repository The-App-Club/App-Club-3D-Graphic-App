import { OrbitControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect, useCallback } from "react";
import { Bebop } from "./Bebop";

const Globe = ({ progress }) => {
  const {
    scene,
    gl,
    camera,
    size: { width, height },
  } = useThree();

  const onWindowResize = useCallback(() => {
    // console.log(camera.aspect);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    scene.updateMatrix();
  }, []);

  useEffect(() => {
    // console.log(progress);
    camera.zoom = progress;
    camera.updateProjectionMatrix();
    scene.updateMatrix();
  }, [progress]);

  useEffect(() => {
    window.addEventListener("resize", onWindowResize);
    return () => {
      window.removeEventListener("resize", onWindowResize);
    };
  }, []);

  return (
    <>
      <Bebop />
      {/* <OrbitControls enableRotate autoRotate active /> */}
    </>
  );
};

export { Globe };
