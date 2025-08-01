/* import { useGLTF } from '@react-three/drei';
import { useRef, useEffect } from 'react';
import * as THREE from 'three';

export default function Model({ modelFile }) {
  const group = useRef();
  const { scene } = useGLTF(`/${modelFile}`);

  useEffect(() => {
    if (!scene || !group.current) return;

    // Centrage et mise à l’échelle
    const box = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());
    const size = new THREE.Vector3();
    box.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = 2 / maxDim;

    scene.scale.setScalar(scale);
    scene.position.sub(center);

    group.current.clear();
    group.current.add(scene);
  }, [scene]);

  return <group ref={group} />;
} */

import React from 'react';
import { useGLTF } from '@react-three/drei';

const Model = ({ modelPath, annotations = [] }) => {
  const { scene } = useGLTF(modelPath);

  return (
    <group scale={[0.01, 0.01, 0.01]}>
      <primitive object={scene} />
      {annotations.map((a, i) => (
        <mesh key={i} position={[a.x, a.y, a.z]}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshStandardMaterial color="red" />
        </mesh>
      ))}
    </group>
  );
};

export default Model;