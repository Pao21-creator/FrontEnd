// TextoDescriptivo.jsx
import React from 'react';
import '../../styles/nieve/textDescriptivo.css';

function TextoDescriptivo({ title, description, description2 }) {
  return (
    <div className="text-container">
      <h2>{title}</h2>
      <br/>
      <p>{description}</p>
      <br/>
      <p>{description2}</p>
    </div>
  );
}

export default TextoDescriptivo;
