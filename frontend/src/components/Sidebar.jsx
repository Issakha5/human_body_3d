function Sidebar({ setSelectedSystem }) {
  const systems = [
    { id: 'skeleton', name: 'Squelette' },
    { id: 'organs', name: 'Organes' },
    { id: 'muscles', name: 'Muscles' },
    { id: 'nervous', name: 'Système nerveux' },
    { id: 'blood', name: 'Système sanguin' },
  ];

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
