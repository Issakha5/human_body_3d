import { useState, useEffect } from 'react';

function Sidebar({ setSelectedSystem }) {
  const [systems, setSystems] = useState([]);

  useEffect(() => {
    fetch('/api/body-parts/')
      .then((res) => res.json())
      .then((data) => {
        setSystems(data);
      })
      .catch((error) => console.error('Erreur lors du chargement des systèmes :', error));
  }, []);

  return (
    <div className="w-64 bg-white p-4 shadow-md">
      <h3 className="text-xl font-bold mb-4">Systèmes corporels</h3>
      <ul>
        {systems.map((system) => (
          <li key={system.id}>
            <button
              onClick={() => setSelectedSystem(system.id)}
              className="w-full text-left p-2 hover:bg-gray-200 rounded"
            >
              {system.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
