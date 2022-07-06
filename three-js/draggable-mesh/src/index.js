import './index.css';
import { Kidding } from './components/Kidding';
import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';

function App() {
  return (
    <>
      <Kidding></Kidding>
    </>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
