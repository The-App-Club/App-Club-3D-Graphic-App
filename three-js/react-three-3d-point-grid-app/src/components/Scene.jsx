import {OrbitControls} from '@react-three/drei';
import {useThree} from '@react-three/fiber';
import {useEffect, useCallback, useMemo} from 'react';
import {Dot} from './Dot';
import * as d3 from 'd3';
import {GridHelper} from 'three';
import 'array-each-slice';

const Scene = ({progress, minProgress, maxProgress, stepProgress}) => {
  const {
    scene,
    gl,
    camera,
    size: {width, height},
  } = useThree();

  const gridPointList = useMemo(() => {
    const size = 10;
    const divisions = 10;

    const gridHelper = new GridHelper(size, divisions);

    const grid = gridHelper.geometry.attributes.position.array;
    return [...grid].eachSlice(3);
  }, []);
  const gridPointList2 = useMemo(() => {
    const size = 8;
    const divisions = 10;

    const gridHelper = new GridHelper(size, divisions);

    const grid = gridHelper.geometry.attributes.position.array;
    return [...grid].eachSlice(3);
  }, []);
  const gridPointList3 = useMemo(() => {
    const size = 6;
    const divisions = 10;

    const gridHelper = new GridHelper(size, divisions);

    const grid = gridHelper.geometry.attributes.position.array;
    return [...grid].eachSlice(3);
  }, []);
  const gridPointList4 = useMemo(() => {
    const size = 4;
    const divisions = 10;

    const gridHelper = new GridHelper(size, divisions);

    const grid = gridHelper.geometry.attributes.position.array;
    return [...grid].eachSlice(3);
  }, []);
  const gridPointList5 = useMemo(() => {
    const size = 2;
    const divisions = 10;

    const gridHelper = new GridHelper(size, divisions);

    const grid = gridHelper.geometry.attributes.position.array;
    return [...grid].eachSlice(3);
  }, []);
  const gridPointList6 = useMemo(() => {
    const size = 0.1;
    const divisions = 1;

    const gridHelper = new GridHelper(size, divisions);

    const grid = gridHelper.geometry.attributes.position.array;
    return [...grid].eachSlice(3);
  }, []);

  const onWindowResize = useCallback(() => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    scene.updateMatrix();
  }, []);

  useEffect(() => {
    camera.zoom = progress;
    camera.updateProjectionMatrix();
    scene.updateMatrix();
  }, [progress]);

  useEffect(() => {
    window.addEventListener('resize', onWindowResize);
    return () => {
      window.removeEventListener('resize', onWindowResize);
    };
  }, []);

  return (
    <>
      {gridPointList.map((gridPoint, index) => {
        return (
          <Dot
            key={index}
            startPos={gridPoint}
            endPos={gridPoint}
            progress={progress}
            minProgress={minProgress}
            maxProgress={maxProgress}
            stepProgress={stepProgress}
            color={d3.interpolateBlues(0.5)}
          />
        );
      })}
      {gridPointList2.map((gridPoint, index) => {
        gridPoint[1] = 1;
        return (
          <Dot
            key={index}
            startPos={gridPoint}
            endPos={gridPoint}
            progress={progress}
            minProgress={minProgress}
            maxProgress={maxProgress}
            stepProgress={stepProgress}
            color={d3.interpolateOranges(0.5)}
          />
        );
      })}
      {gridPointList3.map((gridPoint, index) => {
        gridPoint[1] = 2;
        return (
          <Dot
            key={index}
            startPos={gridPoint}
            endPos={gridPoint}
            progress={progress}
            minProgress={minProgress}
            maxProgress={maxProgress}
            stepProgress={stepProgress}
            color={d3.interpolateGreens(0.5)}
          />
        );
      })}
      {gridPointList4.map((gridPoint, index) => {
        gridPoint[1] = 3;
        return (
          <Dot
            key={index}
            startPos={gridPoint}
            endPos={gridPoint}
            progress={progress}
            minProgress={minProgress}
            maxProgress={maxProgress}
            stepProgress={stepProgress}
            color={d3.interpolateInferno(0.5)}
          />
        );
      })}
      {gridPointList5.map((gridPoint, index) => {
        gridPoint[1] = 4;
        return (
          <Dot
            key={index}
            startPos={gridPoint}
            endPos={gridPoint}
            progress={progress}
            minProgress={minProgress}
            maxProgress={maxProgress}
            stepProgress={stepProgress}
            color={d3.interpolateYlOrBr(0.5)}
          />
        );
      })}
      {gridPointList6.map((gridPoint, index) => {
        gridPoint[1] = 5;
        return (
          <Dot
            key={index}
            startPos={gridPoint}
            endPos={gridPoint}
            progress={progress}
            minProgress={minProgress}
            maxProgress={maxProgress}
            stepProgress={stepProgress}
            color={d3.interpolateRainbow(0.5)}
          />
        );
      })}
      <OrbitControls enableZoom enablePan enableRotate autoRotate />
    </>
  );
};

export {Scene};
