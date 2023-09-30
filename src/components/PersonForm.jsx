import React from "react";

const PersonForm = ({ newName, newpuhelin, handleNameChange, handlepuhelinChange }) => {
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
        value={newpuhelin}
        onChange={handlepuhelinChange}
      />
    </div>
  );
};

export default PersonForm;
