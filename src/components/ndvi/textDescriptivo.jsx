// TextoDescriptivo.jsx
import React from 'react';
import '../../styles/ndvi/textDescriptivo.css';

function TextoDescriptivo({ title, description, description2 }) {
  return (
    <div className="text-containerNdvi">
      <h2>{title}</h2>
      <br/>
      <p>{description}</p>
      <br/>
      <p>{description2}</p>
    </div>
  );
}

export default TextoDescriptivo;
