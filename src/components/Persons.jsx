import React from 'react';

const Persons = ({ filteredList, handleDelete }) => {
  return (
    <div>
      <h3>Names and numbers</h3>
      <table>
        <tbody>
          {filteredList.map((person, index) => (
            <tr key={index}>
              <td>{person.id} - {person.name}</td>
              <td>{person.puhelin}</td>
               {/* Display phone number */}
              <td>
                <button className='deletebutton' onClick={() => handleDelete(person.id)}>delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Persons;

