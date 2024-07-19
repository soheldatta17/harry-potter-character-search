import React, { useState } from 'react';
import Select, { components } from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const options = 
[
  { value: 'harry', label: 'Harry Potter' },
  { value: 'hermione', label: 'Hermione Granger' },
  { value: 'draco', label: 'Draco Malfoy' },
  { value: 'ron', label: 'Ron Weasley' },
  { value: 'cho', label: 'Cho Chang' },
  { value: 'minerva', label: 'Minerva McGonagall' },
  { value: 'cedric', label: 'Cedric Diggory' },
  { value: 'snape', label: 'Severus Snape' },
  { value: 'hagrid', label: 'Rubeus Hagrid' },
  { value: 'lovegood', label: 'Luna Lovegood' },
  { value: 'longbottom', label: 'Neville Longbottom' }, // corrected from 'longboottom'
  { value: 'ginny', label: 'Ginny Weasley' }, // corrected from 'ginie'
  { value: 'sirius', label: 'Sirius Black' },
  { value: 'remus', label: 'Remus Lupin' }, // corrected from 'rrmas'
  { value: 'bellatrix', label: 'Bellatrix Lestrange' },
  { value: 'voldemort', label: 'Lord Voldemort' }, // corrected from 'volde'
  { value: 'horace', label: 'Horace Slughorn' }, // corrected from 'horaes'
  { value: 'kingsley', label: 'Kingsley Shacklebolt' }, // corrected from 'kingsly'
  { value: 'dolores', label: 'Dolores Umbridge' }, // corrected from 'doloras'
  { value: 'lucius', label: 'Lucius Malfoy' },
  { value: 'vincent', label: 'Vincent Crabbe' },
  { value: 'gregory', label: 'Gregory Goyle' },
  { value: 'mrsnorris', label: 'Mrs Norris' }, // corrected from 'norris'
  { value: 'argus', label: 'Argus Filch' }
]
;

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
    if (selectedOption == null) {
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
    <div style={{ margin: '50px' }}>
      <h1 style={{ textAlign: 'center' }}>Select Your Favorite Harry Potter Character</h1>
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
        <div className="character-details">
          <img
            src={characterDetails.image}
            alt={characterDetails.name}
            className="character-image"
          />
          <div className="character-info">
            <h2>{characterDetails.name}</h2>
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
      <style jsx>{`
  .character-details {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: center;
    border: 1px solid #ddd;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #f9f9f9;
    text-align: center;
    max-width: 50%;
    margin-left: auto;
    margin-right: auto;
  }

  .character-image {
    margin-right: 20px;
    max-width: 200px;
    border-radius: 10px;
    border: 2px solid #ccc;
  }

  .character-info {
    min-width: 200px;
    text-align: left;
    padding-left: 2rem;
  }

  @media (max-width: 600px) {
    .character-details {
      flex-direction: column;
      align-items: center;
      max-width: 100%
    }

    .character-image {
      margin-right: 0;
      margin-bottom: 20px;
      max-width: 100%;
    }

    .character-info {
      text-align: left;
      padding-left: 0;
    }
  }
`}</style>
    </div>
  );
};

export default App;
