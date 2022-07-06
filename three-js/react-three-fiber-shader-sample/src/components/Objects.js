import React, { Suspense, VFC } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

const vertexShaderDefine = `
uniform float u_time;
uniform float u_radius;
varying vec2 v_uv;
`;

const beginnormal_vertex = `
float delta = (sin(u_time) + 1.0) / 2.0;
vec3 objectNormal = delta * normal + (1.0 - delta) * normalize(position);
`;

const begin_vertex = `
v_uv = uv;
vec3 v = normalize(position) * u_radius;
vec3 transformed = delta * position + (1.0 - delta) * v;
`;

const fragmentShaderDefine = `
uniform float u_time;
varying vec2 v_uv;
`;

const color_fragment = `
float rnd = fract(sin(dot(v_uv.xy, vec2(12.9898, 78.233)) + u_time) * 43758.5453123);
float r = (sin(u_time) + 1.0) / 2.0;
float g = (sin(PI * 2.0 / 3.0 + u_time) + 1.0) / 2.0;
float b = (sin(PI * 4.0 / 3.0 + u_time) + 1.0) / 2.0;
vec3 color = vec3(r, g, b) * rnd;
diffuseColor = vec4(color, 1.0);
`;

function Objects() {
  const material = new THREE.MeshStandardMaterial({ color: '#22a7f2', metalness: 1, roughness: 0.2, wireframe: false });
  material.onBeforeCompile = (shader) => {
    shader.uniforms.u_time = { value: 0 };
    shader.uniforms.u_radius = { value: 10 };
    // vertex
    shader.vertexShader = vertexShaderDefine + shader.vertexShader;
    shader.vertexShader = shader.vertexShader.replace('#include <beginnormal_vertex>', beginnormal_vertex);
    shader.vertexShader = shader.vertexShader.replace('#include <begin_vertex>', begin_vertex);
    // fragment
    shader.fragmentShader = fragmentShaderDefine + shader.fragmentShader;
    shader.fragmentShader = shader.fragmentShader.replace('#include <color_fragment>', color_fragment);

    material.userData.shader = shader;
    // debug
    // console.log('vertexShader', shader.vertexShader);
    // console.log('fragmentShader', shader.fragmentShader);
  };

  const geometry = new THREE.BoxBufferGeometry(10, 10, 10, 12, 12, 12);

  useFrame(({ clock }) => {
    const shader = material.userData.shader;
    if (shader) {
      shader.uniforms.u_time.value = clock.getElapsedTime();
    }
  });
  return <mesh geometry={geometry} material={material} receiveShadow />;
}

export { Objects };
