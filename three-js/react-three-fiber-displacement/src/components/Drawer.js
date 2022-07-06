import React, { useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { Button, Slider, Typography } from '@mui/material';

const Drawer = () => {
  const Container = styled.div`
    position: relative;
    padding: 20px;
    background-color: rgba(0, 109, 176, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 10px;
    display: grid;
    grid-template-rows: auto auto auto auto;
    grid-gap: 10px;
  `;

  const CanvasWorkspace = styled.canvas`
    width: 300px;
    height: 300px;
  `;

  const SliderContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    grid-gap: 10px;
    color: #fff;
  `;

  const canvasRef = useRef(null);

  let darkness = 1;
  let lineWidth = 10;
  let mouseDown = false;
  let start = { x: 0, y: 0 };
  let end = { x: 0, y: 0 };
  const ratio = { w: 300 / 300, h: 300 / 300 }; // 解像度 / Canvas Size(pixel)

  const clearCanvas = () => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  };

  useEffect(() => {
    clearCanvas();
  }, []);

  const handleMouseDown = (e) => {
    mouseDown = true;
    const rect = canvasRef.current.getBoundingClientRect();
    start = { x: e.clientX - rect.x, y: e.clientY - rect.y };
    end = { x: e.clientX - rect.x, y: e.clientY - rect.y };
  };

  const handleMouseUp = () => {
    mouseDown = false;
  };

  const handleMouseLeave = () => {
    mouseDown = false;
  };

  const handleMouseMove = (e) => {
    if (mouseDown) {
      const ctx = canvasRef.current.getContext('2d');
      const rect = canvasRef.current.getBoundingClientRect();

      start = { x: end.x, y: end.y };
      end = { x: e.clientX - rect.x, y: e.clientY - rect.y };

      const dark = 255 * darkness;

      // Draw our path
      ctx.beginPath();
      ctx.moveTo(start.x * ratio.w, start.y * ratio.h);
      ctx.lineTo(end.x * ratio.w, end.y * ratio.h);
      ctx.strokeStyle = `rgb(${dark}, ${dark}, ${dark})`;
      ctx.lineWidth = lineWidth;
      ctx.lineCap = 'round';
      ctx.stroke();
      ctx.closePath();
    }
  };

  const handleClearClick = () => {
    clearCanvas();
  };

  const handleDarknessChange = (e, v) => {
    darkness = v;
  };

  const handleLineWidthChange = (e, v) => {
    lineWidth = v;
  };

  return (
    <Container>
      {/* canvas */}
      <CanvasWorkspace
        id="drawer"
        ref={canvasRef}
        width={300}
        height={300}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      ></CanvasWorkspace>
      <SliderContainer>
        <Typography component="div">Darkness</Typography>
        <Slider
          size="small"
          color="secondary"
          valueLabelDisplay="auto"
          min={0}
          max={1}
          step={0.1}
          defaultValue={1}
          onChange={handleDarknessChange}
        />
      </SliderContainer>
      <SliderContainer>
        <Typography component="div">LineWidth</Typography>
        <Slider
          size="small"
          color="secondary"
          valueLabelDisplay="auto"
          min={5}
          max={20}
          step={1}
          defaultValue={10}
          onChange={handleLineWidthChange}
        />
      </SliderContainer>
      <Button
        variant="outlined"
        color="secondary"
        fullWidth
        onClick={handleClearClick}
      >
        Clear
      </Button>
    </Container>
  );
};

export { Drawer };
