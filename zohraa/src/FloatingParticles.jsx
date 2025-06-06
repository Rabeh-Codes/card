
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function FloatingParticles({ count = 100 }) {
  const meshRef = useRef();

 
  const particles = useMemo(() => {
    const dummy = new THREE.Object3D();
    const positions = [];

    for (let i = 0; i < count; i++) {
      positions.push({
        x: (Math.random() - 0.5) * 10,
        y: (Math.random() - 0.5) * 10,
        z: (Math.random() - 0.5) * 5,
        speed: 0.01 + Math.random() * 0.02,
        offset: Math.random() * Math.PI * 2,
      });
    }

    return positions;
  }, [count]);

  
  useFrame(() => {
    if (!meshRef.current) return;
    const dummy = new THREE.Object3D();

    particles.forEach((p, i) => {
      p.y += p.speed;
      if (p.y > 6) p.y = -6; 

      dummy.position.set(
        p.x + Math.sin(p.offset + p.y) * 0.2, 
        p.y,
        p.z
      );
      dummy.scale.set(0.1, 0.1, 0.1);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  const heartShape = useMemo(() => {
    const shape = new THREE.Shape();
    const s = 0.05;
    for (let t = 0; t <= Math.PI * 2; t += 0.01) {
      const x = s * 16 * Math.pow(Math.sin(t), 3);
      const y =
        s *
        (13 * Math.cos(t) -
          5 * Math.cos(2 * t) -
          2 * Math.cos(3 * t) -
          Math.cos(4 * t));
      if (t === 0) shape.moveTo(x, y);
      else shape.lineTo(x, y);
    }
    return shape;
  }, []);

  const geometry = useMemo(() => {
    return new THREE.ExtrudeGeometry(heartShape, {
      depth: 0.05,
      bevelEnabled: false,
    });
  }, [heartShape]);

  return (
    <instancedMesh ref={meshRef} args={[geometry, null, count]}>
      <meshStandardMaterial color="#ff85c1" emissive="#ffbcd9" />
    </instancedMesh>
  );
}
