import './styles/index.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import styled from '@emotion/styled';
import { Visualizer } from './components/Visualizer';
import { Audio } from './components/Audio';

const App = () => {
  const Container = styled.div`
    position: relative;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  `;

  return (
    <Container>
      <Visualizer />
      <Audio />
    </Container>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
