import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Text } from '@react-three/drei';

export default function Heart() {
  const meshRef = useRef();
  const lightRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const scale = 2 + Math.sin(t * 3) * 0.08;

    if (meshRef.current) {
      meshRef.current.scale.set(scale, scale, scale);
      meshRef.current.rotation.y += 0.01;

      const intensity = 1 + Math.sin(t * 3) * 0.5;
      if (lightRef.current) {
        lightRef.current.intensity = intensity;
      }
    }
  });

  const shape = useMemo(() => {
    const heartShape = new THREE.Shape();
    const scale = 0.1;

    for (let t = 0; t <= Math.PI * 2; t += 0.01) {
      const x = scale * 16 * Math.pow(Math.sin(t), 3);
      const y =
        scale *
        (13 * Math.cos(t) -
          5 * Math.cos(2 * t) -
          2 * Math.cos(3 * t) -
          Math.cos(4 * t));

      if (t === 0) heartShape.moveTo(x, y);
      else heartShape.lineTo(x, y);
    }

    return heartShape;
  }, []);

  const extrudeSettings = {
    depth: 0.3,
    bevelEnabled: true,
    bevelThickness: 0.05,
    bevelSize: 0.05,
    bevelSegments: 2,
  };

  const geometry = useMemo(
    () => new THREE.ExtrudeGeometry(shape, extrudeSettings),
    [shape]
  );

 
  function HeartMessage() {
    return (
      <Text
        className="heart-message"
        position={[0, -3.5, 0.5]}
        fontSize={0.4}
        color="FFFFFF"
        anchorX="center"
        anchorY="middle"
        maxWidth={5}
      >
        A flower’s beauty whispers the language of the heart
      </Text>
    );
  }

  
  return (
    <>
      <ambientLight intensity={0.6} />
      <spotLight
        ref={lightRef}
        position={[0, 5, 10]}
        angle={0.4}
        penumbra={1}
        castShadow
        color="#ff80c0"
      />
      <mesh
        ref={meshRef}
        geometry={geometry}
        position={[0, 0, 0]}
        scale={[3, 3, 3]}
      >
        <meshStandardMaterial color="#caa6ff" />
      </mesh>

      <HeartMessage />
    </>
  );
}
