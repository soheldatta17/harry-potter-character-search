import React, { useState } from 'react';
import Select, { components } from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const options = [
  { value: 'harry', label: 'Harry Potter' },
  { value: 'hermione', label: 'Hermione Granger' },
  { value: 'ron', label: 'Ron Weasley' },
  { value: 'dumbledore', label: 'Albus Dumbledore' },
  { value: 'snape', label: 'Severus Snape' },
  { value: 'voldemort', label: 'Lord Voldemort' },
  { value: 'draco', label: 'Draco Malfoy' },
  { value: 'hagrid', label: 'Rubeus Hagrid' },
  { value: 'sirius', label: 'Sirius Black' },
  { value: 'luna', label: 'Luna Lovegood' },
];

const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <FontAwesomeIcon icon={faSearch} />
    </components.DropdownIndicator>
  );
};

const App = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [characterDetails, setCharacterDetails] = useState(null);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    setCharacterDetails(null); // Clear previous character details
    console.log(`Option selected:`, selectedOption);
    if(selectedOption==null)
    {
      return;
    }
    fetch(`https://harry-potter-api-ebon.vercel.app/search?name=${selectedOption.label}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (data.characters && data.characters.length > 0) {
          setCharacterDetails(data.characters[0]);
        } else {
          console.log('No characters found');
        }
      })
      .catch(error => {
        console.error('Error fetching characters:', error);
      });
  };

  return (
    <div style={{ margin: '50px', textAlign: 'center' }}>
      <h1>Select Your Favorite Harry Potter Character</h1>
      <Select
        value={selectedOption}
        onChange={handleChange}
        options={options}
        placeholder="Search here..."
        components={{ DropdownIndicator }}
        isClearable
        styles={{
          container: (provided) => ({
            ...provided,
            width: 300,
            margin: '0 auto',
            textAlign: 'left',
          }),
        }}
      />
      {selectedOption && characterDetails && (
  <div style={{
    marginTop: '20px',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    border: '1px solid #ddd',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f9f9f9'
  }}>
    <img
      src={characterDetails.image}
      alt={characterDetails.name}
      style={{
        marginRight: '20px',
        maxWidth: '200px',
        borderRadius: '10px',
        border: '2px solid #ccc'
      }}
    />
    <div style={{ maxWidth: '500px' }}>
      <h2 style={{ margin: '0 0 10px', fontSize: '24px' }}>{characterDetails.name}</h2>
      <p><strong>House:</strong> {characterDetails.house}</p>
      <p><strong>Species:</strong> {characterDetails.species}</p>
      <p><strong>Gender:</strong> {characterDetails.gender}</p>
      <p><strong>Date of Birth:</strong> {characterDetails.dateOfBirth}</p>
      <p><strong>Wand:</strong> {characterDetails.wand.wood} (wood), {characterDetails.wand.core} (core), {characterDetails.wand.length}" (length)</p>
      <p><strong>Patronus:</strong> {characterDetails.patronus}</p>
      <p><strong>Actor:</strong> {characterDetails.actor}</p>
    </div>
  </div>
)}

    </div>
  );
};

export default App;
