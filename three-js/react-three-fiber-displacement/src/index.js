import './styles/index.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import styled from '@emotion/styled';
import { Drawer } from './components/Drawer';
import { Viewer } from './components/Viewer';

const App = () => {
  const Container = styled.div`
    position: relative;
    width: 100vw;
    height: 100vh;
  `;

  const DrawerContainer = styled.div`
    position: absolute;
    bottom: 20px;
    left: 20px;
    line-height: 0;
  `;

  return (
    <Container>
      <Viewer />
      <DrawerContainer>
        <Drawer />
      </DrawerContainer>
    </Container>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
