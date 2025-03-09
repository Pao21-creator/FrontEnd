import React, { useEffect, useRef, useState } from 'react';
import { Chart, registerables } from 'chart.js'; // Importamos todo lo necesario
import DownloadCSVButton from '../downloadCSVButton'; // Importamos el botón de CSV
import DownloadPNGButton from '../downloadPNGButton'; // Importamos el botón de PNG
import Papa from 'papaparse';
import '../../styles/nieve/button.css';

Chart.register(...registerables); // Registramos todos los componentes de Chart.js, incluidas las escalas

const Grafico = ({ fechas, valores, year }) => {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState({ labels: [], data: [], apiData: [], apiLabels: [] });
  const [chartReady, setChartReady] = useState(false);
  const [chartInstance, setChartInstance] = useState(null); // Guardar la instancia del gráfico
  const fields = ['Fecha', 'Promedio de Nieve', 'Cobertura de Nieve'];

  // Cargar los datos CSV y procesarlos
  useEffect(() => {
    fetch('/data/PromedioNieve2001_2024.csv')
      .then((response) => response.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          complete: (result) => {
            const data = result.data;
            const labels = [];
            const dataValues = [];

            data.slice(1).forEach((row, index) => { // Ignorar la primera fila
              const fechaStr = row[0]; // Columna 1: Fecha (en formato dd/mm)
              if (fechaStr.includes('/')) {
                const [day, month] = fechaStr.split('/');
                const promedioNieve = parseFloat(row[1]); // Columna 2: Promedio de nieve (como eje Y)
                labels.push(fechaStr); // Asignamos la fecha al eje X
                dataValues.push(promedioNieve); // Asignamos el valor de nieve al eje Y
              } else {
                console.warn(`Fecha no contiene '/' en la fila ${index + 1}: ${fechaStr}`);
              }
            });

            setChartData({ 
              labels, 
              data: dataValues, 
              apiData: valores, 
              apiLabels: fechas 
            });
          },
          header: false,
          skipEmptyLines: true,
        });
      });
  }, []); // Solo se ejecuta al montar el componente

  useEffect(() => {
    if (chartData.labels.length > 0 && chartRef.current) {
      // Asegúrate de que chartRef esté listo antes de crear el gráfico
      const ctx = chartRef.current.getContext('2d');
      const newChartInstance = new Chart(ctx, {
        type: 'line', // Tipo de gráfico: línea
        data: {
          labels: chartData.labels, // Etiquetas del eje X (fechas)
          datasets: [
            {
              label: 'Promedio de Nieve 2001-2024', // Nombre del conjunto de datos (CSV)
              data: chartData.data, // Datos del eje Y (promedio de nieve desde CSV)
              fill: false,
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 2,
              tension: 0.4,
            },
            {
              label: `Cobertura de nieve ${year}`, // Nombre del conjunto de datos (API)
              data: chartData.apiData, // Datos del eje Y (promedio de nieve desde la API)
              fill: false,
              borderColor: 'rgba(255, 99, 132, 1)', // Color de la segunda línea
              borderWidth: 2,
              tension: 0.4,
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              title: {
                display: true,
                text: 'Fecha' // Título del eje X
              }
            },
            y: {
              title: {
                display: true,
                text: 'Porcentaje de Nieve (%)' // Título del eje Y
              },
              beginAtZero: true,
            }
          },
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                padding: 20, // Espacio entre las etiquetas y las casillas
                font: {
                  size: 14, // Tamaño de la fuente
                },
                boxWidth: 20, // Tamaño de las casillas
              },
              offset: 10, // Este valor separa la leyenda del gráfico
            },
          },
        }
      });

      // Guardar la instancia del gráfico correctamente
      setChartInstance(newChartInstance);
      setChartReady(true); // El gráfico está listo


    }
  }, [chartData]); // Solo se ejecuta cuando chartData cambia

  return (
    <div style={{ width: '100%', height: 'auto' }}>
      {/* Contenedor de los botones de descarga, ubicado arriba del gráfico */}
      <div className="download-buttons-container">
        <DownloadCSVButton chartData={chartData}  fields={fields} filename="datos_nieve.csv" />
        {/* Pasamos chartReady y chartInstance al botón de PNG */}
        <DownloadPNGButton chartRef={chartRef} chartReady={chartReady} chartInstance={chartInstance} />
      </div>

      {/* Canvas donde se renderiza el gráfico */}
      <div style={{ position: 'relative', height: '300px' }}>
        <canvas ref={chartRef} style={{ height: '100%', width: '100%' }}></canvas>
      </div>
    </div>
  );
};

export default Grafico;
