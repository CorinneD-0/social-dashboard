import React, { useState } from 'react';

const Users = () => {
  const [filter, setFilter] = useState('');
  const [filterError, setFilterError] = useState('');

  const handleFilterChange = e => {
    setFilter(e.target.value);
    if (e.target.value.length > 0 && e.target.value.length < 3) setFilterError('Minimo 3 caratteri');
    else setFilterError('');
  };
  const handleFilterSubmit = e => {
    e.preventDefault();
    if (filter.length > 0 && filter.length < 3) setFilterError('Minimo 3 caratteri');
    else {
      setFilterError('');
      // ... submit logic ...
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-2">Users</h1>
      <p className="text-gray-600">Gestione utenti (pagina statica di esempio)</p>
      <form onSubmit={handleFilterSubmit}>
        <input value={filter} onChange={handleFilterChange} placeholder="Filtra per username" />
        {filterError && <span className="text-red-500 text-xs">{filterError}</span>}
        <button type="submit">Filtra</button>
      </form>
    </div>
  );
};

export default Users; 