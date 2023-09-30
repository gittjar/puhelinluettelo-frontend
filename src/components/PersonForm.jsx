import React from "react";

const PersonForm = ({ newName, newPhoneNumber, handleNameChange, handlePhoneNumberChange }) => {
  return (
    <div>
        Nimi ja puhelinnumero<br />
      <input
        placeholder="Etunimi Sukunimi"
        value={newName}
        onChange={handleNameChange}
      />
      <input
        placeholder="Puhelinnumero"
        value={newPhoneNumber}
        onChange={handlePhoneNumberChange}
      />
    </div>
  );
};

export default PersonForm;
