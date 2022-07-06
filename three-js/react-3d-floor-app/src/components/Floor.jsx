const Floor = () => {
  return (
    <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
    <planeGeometry
      attach="geometry"
      args={[30, 30, 10, 10]}
    />
    <meshBasicMaterial attach="material" color="grey" wireframe />
  </mesh>
  )
}

export {Floor}