import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Chart, registerables } from 'chart.js'; // Importamos todo lo necesario
import DownloadCSVButton from '../downloadCSVButton'; // Importamos el botón de CSV
import DownloadPNGButton from '../downloadPNGButton'; // Importamos el botón de PNG
import Papa from 'papaparse';
import '../../styles/nieve/button.css'

Chart.register(...registerables); // Registramos todos los componentes de Chart.js, incluidas las escalas

const GraficComparador = ({ fechas, valores, year2, year, cuenca }) => {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState({ labels: [], data: [], apiData: [], apiLabels: [] });
  const [chartReady, setChartReady] = useState(false);
  const [chartInstance, setChartInstance] = useState(null); // Guardar la instancia del gráfico
  const fields = ['Fecha', 'Promedio de Nieve', `Cobertura de Nieve`, 'Cobertura de Nieve2'];

  const [valoresDeNievePorFecha, setValoresDeNievePorFecha] = useState([]);  // Estado para almacenar los valores de nieve
  const [fechaGrafico, setFechaGrafico] = useState([]);  // Estado para almacenar las fechas
  const [loadingGraph, setLoadingGraph] = useState(false); // Estado para controlar el loading del gráfico


  const cleanDate = (fechaStr) => {
  return fechaStr.trim(); // Eliminar posibles espacios adicionales
};
  
  const isValidDate = (fechaStr) => {
  // Validar que la fecha tenga el formato dd/mm
  const regex = /^\d{2}\/\d{2}$/;
  return regex.test(fechaStr);
};

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
            let fechaStr = cleanDate(row[0]); // Limpiar posibles espacios extra
            if (isValidDate(fechaStr)) {
              const [day, month] = fechaStr.split('/');
              const promedioNieve = parseFloat(row[1]); // Columna 2: Promedio de nieve (como eje Y)
              labels.push(fechaStr); // Asignamos la fecha al eje X
              dataValues.push(promedioNieve); // Asignamos el valor de nieve al eje Y
            } else {
              console.warn(`Fecha mal formada o vacía en la fila ${index + 1}: ${fechaStr}`);
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
    setLoadingGraph(true); // Activar loading para el gráfico cuando empieza a cargar los datos
    
    axios
      .post("https://backend-geosepa.onrender.com/getCuencaYearComparador", {
        funcion : 'graficoComparativo',
        cuenca : cuenca,
        año: year2
      })
      .then((response) => {
        const data = response.data;
        console.log("Exitos con la comunicación a la API", data);
  
        setValoresDeNievePorFecha(data.valoresDeNievePorFecha);  // Actualiza los valores de nieve
        setFechaGrafico(data.fechaGrafico);  // Actualiza las fechas
        setLoadingGraph(false); // Desactivar loading para el gráfico una vez que los datos estén listos
      })
      .catch((error) => {
        console.log("error es", error);
        setLoadingGraph(false); // Desactivar loading si ocurre un error
      });
  }, [cuenca, year2]); // Se ejecuta cuando cambian `cuenca` o `year`
  


  useEffect(() => {
    if (chartRef.current) { 
      const ctx = chartRef.current.getContext('2d');
      
      if (window.chartInstance) {
        window.chartInstance.destroy(); // Destruir la instancia anterior
      }
      window.chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
          labels: chartData.labels,
          datasets: [
            {
              label: 'Promedio de Nieve 2001-2024',
              data: chartData.data,
              fill: false,
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 2,
              tension: 0.4,
            },
            {
              label: `Cobertura de nieve ${year}`,
              data: chartData.apiData,
              fill: false,
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 2,
              tension: 0.4,
            },
            {
              label: `Cobertura de nieve ${year2}`,
              data: valoresDeNievePorFecha,
              fill: false,
              borderColor: 'rgba(138, 43, 226, 1)',
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
                text: 'Fecha'
              }
            },
            y: {
              title: {
                display: true,
                text: 'Porcentaje de Nieve (%)'
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
          },
        }
      });

      setChartInstance( window.chartInstance);
      setChartReady(true); // El gráfico está listo

    }
  }, [chartData, valoresDeNievePorFecha]); // Asegúrate de pasar correctamente los datos
  
  
  

  return (
    <div style={{ width: '100%', height: 'auto' }}>
      {/* Contenedor de los botones de descarga, ubicado arriba del gráfico */}
      <div className="download-buttons-container">
        <DownloadCSVButton chartData={chartData} chartYear={valoresDeNievePorFecha} fields={fields} filename="datos_nieve.csv"/>
        <DownloadPNGButton chartRef={chartRef} chartReady={chartReady} chartInstance={chartInstance} />
      </div>
  
      {/* Mostrar un spinner o mensaje mientras los datos se cargan */}
      {loadingGraph ? (
        <div>Cargando Gráfico...</div> // Puedes reemplazar esto con un componente de spinner o un mensaje personalizado
      ) : (
        // Canvas donde se renderiza el gráfico
        <div style={{ position: 'relative', height: '300px' }}>
          <canvas ref={chartRef} style={{ height: '100%', width: '100%' }}></canvas>
        </div>
      )}
    </div>
  );
  
}
export default GraficComparador;
