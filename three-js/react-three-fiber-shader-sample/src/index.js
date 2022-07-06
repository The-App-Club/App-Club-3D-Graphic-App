import ReactDOM from 'react-dom';
import './styles/index.scss';
import { ShaderMesh } from './components/ShaderMesh';
import React, { useEffect, useState, useRef } from 'react';
import styled from '@emotion/styled';

function App() {
  const Workspace = styled.div`
    height: 100vh;
    width: 100vw;
  `;

  return (
    <>
      <Workspace
        onClick={(e) => {
          console.log(e);
        }}
      >
        <ShaderMesh />
      </Workspace>
    </>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
