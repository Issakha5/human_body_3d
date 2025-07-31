import { useState } from 'react'
import Sidebar from './components/Sidebar';
import Canvas3D from './components/Canvas3D';
import AnnotationForm from './components/AnnotationForm';

function App() {
  const [selectedSystem, setSelectedSystem] = useState('skeleton');
  const [selectedPoint, setSelectedPoint] = useState(null);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar setSelectedSystem={setSelectedSystem} />
      <div className="flex-1 p-4">
        <Canvas3D selectedSystem={selectedSystem} setSelectedPoint={setSelectedPoint} />
        {selectedPoint && (
          <AnnotationForm
            selectedPoint={selectedPoint}
            selectedSystem={selectedSystem}
            setSelectedPoint={setSelectedPoint}
          />
        )}
      </div>
    </div>
  );
}

export default App;
