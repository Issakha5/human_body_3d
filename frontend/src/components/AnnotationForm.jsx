import { useState } from 'react';

function AnnotationForm({ selectedPoint, selectedSystem, setSelectedPoint }) {
  const [label, setLabel] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/annotations/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        label,
        description,
        x: selectedPoint.x,
        y: selectedPoint.y,
        z: selectedPoint.z,
        body_part: 1, // À remplacer par l’ID du body_part approprié
      }),
    });
    if (response.ok) {
      alert('Annotation enregistrée !');
      setSelectedPoint(null);
      setLabel('');
      setDescription('');
    }
  };

  return (
    <div className="mt-4 p-4 bg-white shadow-md rounded">
      <h3 className="text-lg font-bold mb-2">Ajouter une annotation</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="Nom de l'annotation"
          className="w-full p-2 mb-2 border rounded"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="w-full p-2 mb-2 border rounded"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Enregistrer
        </button>
      </form>
    </div>
  );
}

export default AnnotationForm;
