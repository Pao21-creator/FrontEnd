// DownloadPNGButton.jsx
import React from 'react';

const DownloadPNGButton = ({ chartRef, chartReady, chartInstance }) => {
  const downloadPNG = () => {
    // Verificamos si el gráfico está listo y si chartInstance está disponible
    if (chartReady && chartInstance) {
      const imageUrl = chartInstance.toBase64Image(); // Usamos la instancia del gráfico
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = 'grafico.png';
      link.click();
    } else {
      console.error('El gráfico no está cargado o no está disponible');
    }
  };

  return (
    <button onClick={downloadPNG} disabled={!chartReady}>
      PNG
    </button>
  );
};

export default DownloadPNGButton;
