import React, { useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { analyserNode } from '../store/index';

const Audio = () => {
  const MyAudio = styled.audio`
    position: absolute;
    bottom: 20px;
  `;

  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current.volume = 0.05;
  }, []);

  const handlePlay = () => {
    if (!analyserNode.data) {
      const audioContext = new AudioContext();
      const src = audioContext.createMediaElementSource(audioRef.current);
      const analyser = audioContext.createAnalyser();
      src.connect(analyser);
      analyser.connect(audioContext.destination);
      analyser.fftSize = 512;
      analyserNode.data = analyser;
    }
  };

  return (
    <MyAudio
      ref={audioRef}
      controls
      loop
      src="./assets/IDLMs.mp3"
      onPlay={handlePlay}
    ></MyAudio>
  );
};

export { Audio };
