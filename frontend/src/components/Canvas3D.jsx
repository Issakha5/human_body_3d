import { useEffect, useState, useRef, Suspense } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

function Model({ url, setSelectedPoint }) {
  if (!url) {
    console.error('Model URL is undefined');
    return null;
  }

  try {
    const gltf = useLoader(GLTFLoader, url);
    const modelRef = useRef();

    const handleClick = (event) => {
      event.stopPropagation();
      const point = event.point;
      setSelectedPoint({ x: point.x, y: point.y, z: point.z });
    };

    console.log('Loaded glTF:', gltf); 
    return <primitive ref={modelRef} object={gltf.scene} onClick={handleClick} />;
  } catch (error) {
    console.error('Error in Model component:', error);
    return null;
  }
}

function Annotations({ annotations }) {
  if (!annotations || !Array.isArray(annotations)) {
    console.error('Annotations is not an array or is undefined:', annotations);
    return null;
  }

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
  const [modelUrl, setModelUrl] = useState('');
  const [annotations, setAnnotations] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/api/body-parts/?system=${selectedSystem}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log('API Response:', data); 
        if (data.length > 0) {
          const url = `/static/${data[0].model_file.replace(/^\/+/, '')}`;
          console.log('Model URL:', url);
          setModelUrl(url);
          setAnnotations(data[0].annotations || []);
        } else {
          throw new Error('No model found for this system');
        }
      })
      .catch((error) => {
        console.error('Error loading model:', error);
        setError(error.message);
      });
  }, [selectedSystem]);

  if (error) {
    return <div className="text-red-500 p-4">Error: {error}</div>;
  }

  return (
    <div className="w-full h-[600px] bg-white shadow-md">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={75} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[0, 1, 1]} intensity={0.5} />
        {modelUrl && (
          <Suspense fallback={<div className="text-gray-500 p-4">Loading model...</div>}>
            <Model url={modelUrl} setSelectedPoint={setSelectedPoint} />
          </Suspense>
        )}
        <Annotations annotations={annotations} />
        <OrbitControls />
      </Canvas>
    </div>
  );
}

export default Canvas3D;