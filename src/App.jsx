import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import './styles.css';
import numberService from './services/numberService';
import Notification from './components/Notification';
import ConfirmationDialog from './components/ConfirmationDialog';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [filterText, setFilterText] = useState('');
  const [filteredList, setFilteredList] = useState([]);
  const [notification, setNotification] = useState(null);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [personToUpdate, setPersonToUpdate] = useState(null);
  const [showDeleteConfirmationDialog, setShowDeleteConfirmationDialog] = useState(false);
  const [deleteConfirmationMessage, setDeleteConfirmationMessage] = useState('');
  const [personToDelete, setPersonToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Add this state


  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  useEffect(() => {
    // Fetch data from the backend when the component mounts
    numberService.getAll()
      .then((data) => {
        setPersons(data);
        setFilteredList(data);
      })
      .finally(() => {
        setIsLoading(false); // Set isLoading to false when data is loaded
      });
  }, []);

  const addName = (event) => {
    event.preventDefault();
    const existingPerson = persons.find((person) => person.name === newName);
  
    if (existingPerson) {
      setPersonToUpdate(existingPerson);
      setNewName(existingPerson.name); // Update the name field
      setNewPhoneNumber(existingPerson.phonenumber); // Update the phone number field
      setConfirmationMessage(`${newName} is already in the list. Do you want to update the information? Please give a new phone number and press YES if you want to change the number.`);
      setShowConfirmationDialog(true);
    } else {
      if (newName.length < 3) {
        setErrorMessage('Name must be at least 3 characters long');
        return;
      }
  
      if (!newPhoneNumber) {
        setErrorMessage('Phone number is required');
        return;
      }
  
      const newPerson = { name: newName, phonenumber: newPhoneNumber };
      numberService.create(newPerson)
        .then((response) => {
          setPersons([...persons, response]);
          setNewName('');
          setErrorMessage('');
          setFilteredList([...filteredList, response]);
          showNotification(`${newName} added to the list with phone number: ${newPhoneNumber}`);
          setNewPhoneNumber(''); // Clear phone number after showing the notification
        })
        .catch((error) => {
          console.error('Error saving data:', error);
          setErrorMessage('Error saving data. Please check your input and try again.');
        });
    }
  };
  
  
  
  
  
  
  

  const handleConfirm = () => {
    setShowConfirmationDialog(false);
    if (personToUpdate) {
      const updatedPerson = { ...personToUpdate, phonenumber: newPhoneNumber };
      numberService
        .update(personToUpdate.id, updatedPerson)
        .then((response) => {
          setPersons(persons.map((person) => (person.id === response.id ? response : person)));
          setFilteredList(filteredList.map((person) => (person.id === response.id ? response : person)));
          setNewName('');
          setNewPhoneNumber(''); // Clear phone number
          setErrorMessage('');
          setPersonToUpdate(null);
          showNotification(`${newName} updated in the list.`);
        })
        .catch((error) => {
          console.error('Error updating data:', error);
        });
    } else {
      const newPerson = { name: newName, phonenumber: newPhoneNumber };
      numberService.create(newPerson)
        .then((response) => {
          setPersons([...persons, response]);
          setNewName('');
          setNewPhoneNumber(''); // Clear phone number
          setErrorMessage('');
          setFilteredList([...filteredList, response]);
          showNotification(`${newName} added to the list.`);
        })
        .catch((error) => {
          console.error('Error saving data:', error);
        });
    }
  };

  const handleCancel = () => {
    setShowConfirmationDialog(false);
    setPersonToUpdate(null);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setNewPhoneNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    const searchText = event.target.value;
    setFilterText(searchText);
    const filtered = persons.filter((person) =>
      person.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredList(filtered);
  };

  const handleDelete = (id) => {
    const person = persons.find((p) => p.id === id);

    if (person) {
      setPersonToDelete(person);
      setDeleteConfirmationMessage(`Do you really want to delete ${person.name}?`);
      setShowDeleteConfirmationDialog(true);
    }
  };

  const handleDeleteConfirm = () => {
    if (personToDelete) {
      numberService.deleteId(personToDelete.id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== personToDelete.id));
          setFilteredList(filteredList.filter((person) => person.id !== personToDelete.id));
          setPersonToDelete(null);
          showNotification(`${personToDelete.name} deleted from the list.`);
        })
        .catch((error) => {
          console.error('Error deleting data:', error);
        });
    }

    setShowDeleteConfirmationDialog(false);
  };

  const handleDeleteCancel = () => {
    setPersonToDelete(null);
    setShowDeleteConfirmationDialog(false);
  };

  return (
   
    <div className="main">
      <h2>Jarno's Phonebook <i class="fas fa-phone"></i>
 </h2>
      {isLoading ? ( // Conditional rendering based on isLoading state
      <span className='loading-data-info'>Ladataan dataa tietokannasta..odota hetkonen!</span>
      
    ) : (
      <>

      <div className="filter-text">
        <Filter filterText={filterText} handleFilterChange={handleFilterChange} />
      </div>
      <form className="inputform" onSubmit={addName}>
        <div>
          <br />
          <PersonForm
            newName={newName}
            newPhoneNumber={newPhoneNumber}
            handleNameChange={handleNameChange}
            handlePhoneNumberChange={handlePhoneNumberChange}
          />
        </div>
        <div className="add-nappi">
          <button type="submit">Add <i class="fas fa-plus"></i></button>
        </div>
        <section className='color-line'></section>
      </form>

      </>
      )}

      <Notification message={notification} />

      {showConfirmationDialog && (
        <ConfirmationDialog
          message={confirmationMessage}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}

      {showDeleteConfirmationDialog && (
        <ConfirmationDialog
          message={deleteConfirmationMessage}
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
      )}

      {errorMessage && <div className="error">{errorMessage}</div>}

      <div className="filtered-list">
        <Persons filteredList={filteredList} handleDelete={handleDelete} />
      </div>
    </div>
  );
};

export default App;