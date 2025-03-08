import React, { useEffect, useRef, useState } from 'react';
import { Chart, registerables } from 'chart.js'; // Importamos todo lo necesario
import DownloadCSVButton from '../downloadCSVButton'; // Importamos el botón de CSV
import DownloadPNGButton from '../downloadPNGButton'; // Importamos el botón de PNG
import '../../styles/nieve/button.css';

Chart.register(...registerables); // Registramos todos los componentes de Chart.js, incluidas las escalas

const Grafico = ({ fechas, valores, year }) => {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState({ labels: [], dataNdvi: [] });
  const [chartReady, setChartReady] = useState(false);
  const [chartInstance, setChartInstance] = useState(null); // Guardar la instancia del gráfico
  const fields = ['Fecha','Ndvi'];

  useEffect(() => {
    if (fechas && valores && fechas.length > 0 && valores.length > 0) {
      setChartData({
        labels: fechas,
        dataNdvi: valores,
      });
    }
  }, [fechas, valores]); // Dependemos de las props de fechas y valores

  useEffect(() => {
    if (chartData.labels.length > 0) {
      const ctx = chartRef.current.getContext('2d');
      
      // Destruir el gráfico anterior si existe
      if (ctx.chart) {
        ctx.chart.destroy();
      }

      // Crear el nuevo gráfico
      const chart = new Chart(ctx, {
        type: 'line', // Tipo de gráfico: línea
        data: {
          labels: chartData.labels, // Etiquetas del eje X (fechas)
          datasets: [
            {
              label: `Indice de vegetacion año ${year}`, // Nombre del conjunto de datos (API)
              data: chartData.dataNdvi, // Datos del eje Y (promedio de nieve desde la API)
              fill: false,
              borderColor: 'rgba(255, 99, 132, 1)', // Color de la línea
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
                text: 'Ndvi' // Título del eje Y
              },
              beginAtZero: true,
            }
          },
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                padding: 20,
                font: {
                  size: 14,
                },
                boxWidth: 20,
              },
              offset: 10,
            },
          }
        }
      });

      // Guardamos la instancia del gráfico en el canvas para futuras referencias
      ctx.chart = chart;
      setChartInstance(chart);
      setChartReady(true);
    }
  }, [chartData, valores, year]); // Re-renderiza cuando los datos cambian

  return (
    <div style={{ width: '100%', height: 'auto' }}>
      {/* Contenedor de los botones de descarga, ubicado arriba del gráfico */}
      <div className="download-buttons-container">
        <DownloadCSVButton chartData={chartData}  fields={fields} filename="datos_ndvi.csv"/>
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
