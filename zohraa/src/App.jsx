import React, { useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import Heart from './Heart.jsx';
import './App.css';
import FloatingParticles from './FloatingParticles';

function BackgroundMusic() {
  const audioRef = useRef();

  useEffect(() => {
    const audio = audioRef.current;
    audio.volume = 0.5;
    audio.play().catch((e) => {
      console.log('Auto-play blocked, will play on user interaction.');
    });
  }, []);

  return <audio ref={audioRef} src="/romantic.mp3" loop />;
}

export default function App() {
  return (
    <div className="app">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight
          position={[5, 5, 5]}
          angle={0.3}
          penumbra={1}
          intensity={1}
          castShadow
        />
        <FloatingParticles count={150} />
        <Heart />
      </Canvas>

      <BackgroundMusic />

      <div className="greeting">
        <p className="line line-1">❤️ عيد سعيد يا زهرة ❤️</p>
        <p className="line line-2">🎉 كل سنة وانت بألف خير 🎉</p>
        <p className="line line-3">❤️ كل عام وانت النبض والروح ❤️</p>
      </div>
    </div>
  );
}
