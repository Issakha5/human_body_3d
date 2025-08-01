import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';
import { Suspense } from 'react';
import Model from './Model';
import ErrorBoundary from './ErrorBoundary';

const Canvas3D = ({ modelPath, annotations }) => {
   if (!modelPath) {
    return (
      <div className="h-[80vh] w-full flex items-center justify-center bg-gray-100 rounded shadow">
        <p className="text-gray-500">Sélectionnez un élément dans la barre latérale pour voir le modèle 3D.</p>
      </div>
    );
  }
  return (
    <div className="h-[80vh] w-full rounded shadow">
      <ErrorBoundary>
        <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[2, 2, 2]} intensity={0.6} />
          <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
          <Suspense fallback={null}>
            <Stage
              adjustCamera
              intensity={0.5}
              environment="city"
              shadows={false}
            >
              <Model modelPath={modelPath} annotations={annotations} />
            </Stage>
          </Suspense>
        </Canvas>
      </ErrorBoundary>
    </div>
  );
};

export default Canvas3D;