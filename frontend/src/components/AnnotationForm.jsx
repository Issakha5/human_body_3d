import { useState } from 'react';

const AnnotationForm = ({ onSubmit }) => {
  const [label, setLabel] = useState('');
  const [description, setDescription] = useState('');
  const [coords, setCoords] = useState({ x: 0, y: 0, z: 0 });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCoords({ ...coords, [name]: parseFloat(value) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!label.trim()) {
      alert('Le nom est requis.');
      return;
    }

    onSubmit({ label, description, ...coords });

    setLabel('');
    setDescription('');
    setCoords({ x: 0, y: 0, z: 0 });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 text-sm">
      <h3 className="text-base font-semibold">Ajouter une annotation</h3>

      <div>
        <label className="block">Nom</label>
        <input
          type="text"
          className="border rounded p-1 w-full"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="Ex: Cœur"
          required
        />
      </div>

      <div>
        <label className="block">Description</label>
        <textarea
          className="border rounded p-1 w-full"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Ex: Organe vital..."
        />
      </div>

      <div className="flex gap-2">
        {['x', 'y', 'z'].map((axis) => (
          <div key={axis}>
            <label className="block uppercase">{axis}</label>
            <input
              type="number"
              name={axis}
              step="0.01"
              className="border rounded p-1 w-20"
              value={coords[axis]}
              onChange={handleChange}
            />
          </div>
        ))}
      </div>

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Ajouter
      </button>
    </form>
  );
};

export default AnnotationForm;