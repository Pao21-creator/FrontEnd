// Selector.jsx
import React, { useState } from 'react';
import '../../styles/nieve/selectorCuenca.css';

function SelectorCuenca({ options, value, onSelectChange }) {
  const [selectedOption, setSelectedOption] = useState(options[0].value);

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedOption(selectedValue);
    onSelectChange(selectedValue);  // Llamamos a la función onSelectChange pasada como prop
  };

  return (
    <div className="selector-containerCuenca">
      <label htmlFor="map-options">Selecciona una cuenca:</label>
      <select id="map-options" value={value} onChange={handleSelectChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectorCuenca;
