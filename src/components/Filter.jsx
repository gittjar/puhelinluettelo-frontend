import React from 'react';

const Filter = ({ filterText, handleFilterChange }) => {
  return (
    <div>
      Etsi puhelinluettelosta <br />
      <input value={filterText} onChange={handleFilterChange} />
    </div>
  );
};

export default Filter;
