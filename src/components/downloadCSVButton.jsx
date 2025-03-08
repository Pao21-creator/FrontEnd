// DownloadCSVButton.jsx
import React from 'react';
import Papa from 'papaparse';

const DownloadCSVButton = ({ chartData, chartYear, fields, filename = 'grafico_datos.csv' }) => {
  const downloadCSV = () => {
    // Aseguramos que los fields tengan la misma cantidad de columnas que el chartData
    const csv = Papa.unparse({
      fields, // Usamos los fields que se pasan como props
      data: chartData.labels.map((label, index) => {
        return fields.map((field) => {
          // De acuerdo con el field, obtenemos el valor de chartData
          if (field === 'Fecha') return label;
          if (field === 'Promedio de Nieve') return chartData.data[index];
          if (field === 'Cobertura de Nieve') return chartData.apiData[index];
          if (field === 'Cobertura de Nieve2') return chartYear[index];
          if (field === 'Ndvi') return chartData.dataNdvi[index];
          if (field === 'Ndvi2') return chartYear[index];
          return ''; // Si no es un campo reconocido, asignamos un valor vacío
        });
      })
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.click();
  };

  return (
    <button onClick={downloadCSV}>CSV</button>
  );
};

export default DownloadCSVButton;
