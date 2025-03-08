import React, { useState } from 'react';
import '../../styles/nieve/selectorAnualGrafic.css';

function SelectorAnualGrafico({ options, value, onSelectChange }) {
  const [selectedOption, setSelectedOption] = useState(options[0].value);

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedOption(selectedValue);
    onSelectChange(selectedValue);  // Llamamos a la función onSelectChange pasada como prop
  };

  return (
    <div className="selector-ContainerNdviAnualG">
      
      <label htmlFor="Años-options-grafic">Seleccione los años:</label>
      <select id="Años-options-grafic" value={value} onChange={handleSelectChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectorAnualGrafico;
