import React from 'react';

const Filter = ({ filterText, handleFilterChange }) => {
  return (
    <div>
    <section className='color-line'></section>
      Etsi puhelinluettelosta <br />
      <input value={filterText} onChange={handleFilterChange} />
    </div>
  );
};

export default Filter;
