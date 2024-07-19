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

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    console.log(`Option selected:`, selectedOption);
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
            textAlign: "left"
          }),
        }}
      />
      {selectedOption && (
        <p style={{ marginTop: '20px', fontSize: '18px' }}>
          You have selected: <strong>{selectedOption.label}</strong>
        </p>
      )}
    </div>
  );
};

export default App;
