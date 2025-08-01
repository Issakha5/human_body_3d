import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Canvas3D from './components/Canvas3D';
import AnnotationForm from './components/AnnotationForm';

function App() {
  const [selectedPart, setSelectedPart] = useState(null);
  const [annotations, setAnnotations] = useState([]);

  useEffect(() => {
    if (selectedPart) {
      fetch(`/api/annotations/?body_part=${selectedPart.id}`)
        .then(res => res.json())
        .then(setAnnotations);
    }
  }, [selectedPart]);

  const handleAddAnnotation = (data) => {
    fetch('/api/annotations/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, body_part: selectedPart.id })
    })
      .then(res => res.json())
      .then(newAnnotation => setAnnotations([...annotations, newAnnotation]));
  };

  return (
    <div className="flex">
      <Sidebar onSelectPart={setSelectedPart} />
      <div className="flex-1 relative">
      <Canvas3D
  modelPath={selectedPart?.model_file}
  annotations={annotations.filter(a => a.body_part === selectedPart?.id)}
/>
        {selectedPart && (
          <div className="absolute bottom-4 right-4 bg-white rounded shadow p-4">
            <AnnotationForm onSubmit={handleAddAnnotation} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;