import React from 'react';

const Persons = ({ filteredList, handleDelete }) => {
  return (
    <div>
      <h2>Numbers</h2>
      <table>
        <tbody>
          {filteredList.map((person, index) => (
            <tr key={index}>
              <td>{person.id} - {person.name}</td>
              <td>{person.phonenumber} {person.puhelin}</td>
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

