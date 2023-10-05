import React from 'react';

const Persons = ({ filteredList, handleDelete }) => {
  return (
    <div>
      <h3>Names and numbers</h3>
      <div className="card-container">
  {filteredList.map((person, index) => (
    <div className="person-card" key={index}>
      <div className="person-info">
        <div className='person-id'>ID: {person.id}</div>
        <div className="person-name">Name: {person.name}</div>
        <div>Phonenumber: {person.phonenumber}</div>
      </div>
      <button className="delete-button" onClick={() => handleDelete(person.id)}>
        Delete
      </button>
    </div>
  ))}
</div>

    </div>
  );
};

export default Persons;

