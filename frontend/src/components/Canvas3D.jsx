import { useEffect, useRef } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

function Model({ url, setSelectedPoint }) {
  const gltf = useLoader(GLTFLoader, url);
  const modelRef = useRef();

  const handleClick = (event) => {
    event.stopPropagation();
    const point = event.point;
    setSelectedPoint({ x: point.x, y: point.y, z: point.z });
  };

  return <primitive ref={modelRef} object={gltf.scene} onClick={handleClick} />;
}

function Annotations({ annotations }) {
  return (
    <>
      {annotations.map((anno) => (
        <mesh key={anno.id} position={[anno.x, anno.y, anno.z]}>
          <sphereGeometry args={[0.1, 32, 32]} />
          <meshBasicMaterial color="red" />
        </mesh>
      ))}
    </>
  );
}

function Canvas3D({ selectedSystem, setSelectedPoint }) {
  const [annotations, setAnnotations] = useState([]);

  useEffect(() => {
    fetch(`/api/body-parts/?system=${selectedSystem}`)
      .then((res) => res.json())
      .then((data) => {
        const allAnnotations = data.flatMap((part) => part.annotations);
        setAnnotations(allAnnotations);
      });
  }, [selectedSystem]);

  return (
    <div className="w-full h-[600px] bg-white shadow-md">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={75} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[0, 1, 1]} intensity={0.5} />
        <Model url={`/models/${selectedSystem}.gltf`} setSelectedPoint={setSelectedPoint} />
        <Annotations annotations={annotations} />
        <OrbitControls />
      </Canvas>
    </div>
  );
}

export default Canvas3D;
