import { useEffect, useState } from 'react';

const Sidebar = ({ onSelectPart }) => {
  const [bodyParts, setBodyParts] = useState([]);

  useEffect(() => {
    fetch('/api/body-parts/')
      .then(res => res.json())
      .then(setBodyParts)
      .catch(err => console.error("Erreur fetch body-parts:", err));
  }, []);

  return (
    <div className="w-64 bg-white shadow p-4 h-screen overflow-auto">
      <h2 className="text-xl font-bold mb-4">Systèmes</h2>
      <ul>
        {bodyParts.map(part => (
          <li key={part.id} className="mb-2">
            <button
              onClick={() => onSelectPart(part)}
              className="text-blue-600 hover:underline"
            >
              {part.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;