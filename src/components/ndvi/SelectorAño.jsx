import React, { useState } from 'react';
import '../../styles/ndvi/selectorAño.css';

function SelectorAño({ options, value, onSelectChange }) {
  const [selectedOption, setSelectedOption] = useState(options[0].value);

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedOption(selectedValue);
    onSelectChange(selectedValue);  // Llamamos a la función onSelectChange pasada como prop
  };

  return (
    <div className="selector-containerAñoNdvi">
      <label htmlFor="Años-options">Seleccione el año:</label>
      <select id="Años-options" value={value} onChange={handleSelectChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectorAño;
