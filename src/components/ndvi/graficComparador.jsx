import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Chart, registerables } from 'chart.js'; // Importamos todo lo necesario
import DownloadCSVButton from '../downloadCSVButton'; // Importamos el botón de CSV
import DownloadPNGButton from '../downloadPNGButton'; // Importamos el botón de PNG
import { useSelector } from "../../context/selectorContext";
import Papa from 'papaparse';
import '../../styles/nieve/button.css'

Chart.register(...registerables); // Registramos todos los componentes de Chart.js, incluidas las escalas

const GraficComparador = ({ fechas, valores, year2, year, prov, point }) => {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState({ labels: [], dataNdvi: [] });
  const [chartReady, setChartReady] = useState(false);
  const [chartInstance, setChartInstance] = useState(null); 
  const { polygonPosition } = useSelector();
  const [valoresNdviPunto, setValoresNdviPunto] = useState([]);
  const [fechaGrafico, setFechaGrafico] = useState([]);  // Estado para almacenar las fechas
  const [loadingGraph, setLoadingGraph] = useState(false); // Estado para controlar el loading del gráfico
  const fields = ['Fecha', 'Ndvi', 'Ndvi2'];

  // Cargar datos de la API
  useEffect(() => {
    if (polygonPosition || polygonPosition !== null || polygonPosition.length !== 0) {
      return;  // Si el polígono está vacío o si ya se está cargando, no hacemos nada.
    }
    setLoadingGraph(true); // Activar loading para el gráfico cuando empieza a cargar los datos
    axios
      .post("http://localhost:3000/getNdviYearComparador", {
        funcion : 'graficoComparativo',
        prov : prov,
        año: year2,
        point: point
      })
      .then((response) => {
        const data = response.data;
        console.log("Exitos con la comunicación a la API", data);
  
        setValoresNdviPunto(data.valoresNdviPunto);  
        setFechaGrafico(data.fechaGrafico);  // Actualiza las fechas
        setLoadingGraph(false); // Desactivar loading para el gráfico una vez que los datos estén listos
      })
      .catch((error) => {
        console.log("error es", error);
        setLoadingGraph(false); // Desactivar loading si ocurre un error
      });
  }, [prov, year2, point]); // Se ejecuta cuando cambian `cuenca` o `year`



  function reformatCoordinates(coords) {
    // Aseguramos que las coordenadas se reformatean correctamente (de [lat, lng] a [lng, lat])
    return coords.map(coord => {
      if (coord && coord.length === 2 && coord[0] !== null && coord[1] !== null) {
        return [coord[1], coord[0]];  // Cambiamos de [lat, lng] a [lng, lat]
      }
      return [null, null];  // Si la coordenada no es válida, devolvemos [null, null]
    });
  }

  

  useEffect(() => {
    if (!polygonPosition || polygonPosition === null || polygonPosition.length === 0) {
      return;  // Si el polígono está vacío o si ya se está cargando, no hacemos nada.
    }

    setLoadingGraph(true);  // Iniciar carga

    const reformattedCoordinates = reformatCoordinates(polygonPosition);
    console.log('Coordenadas reformateadas:', reformattedCoordinates);

    axios
      .post("http://localhost:3000/getPolyNdvi", {
        funcion: 'graficoAnual',
        polygon: reformattedCoordinates,  // Enviamos el polígono reformateado
        año: year2
      })
      .then((response) => {
        const data = response.data;
        console.log("Éxito con la comunicación a la API", data);

        setValoresNdviPunto(data.valoresNdviPoligono);  // Actualiza los valores de NDVI
        setFechaGrafico(data.fechaGrafico);  // Actualiza las fechas
        setLoadingGraph(false);  // Finaliza la carga
      })
      .catch((error) => {
        console.error("Error al obtener el MapID:", error);
        setLoadingGraph(false);  // Finaliza la carga en caso de error
      });
  }, [polygonPosition, year2]);




  // Cuando los datos cambian, se actualizan los datos del gráfico
  useEffect(() => {
    if (fechas && valores && fechas.length > 0 && valores.length > 0) {
      setChartData({
        labels: fechas,
        dataNdvi: valores
      });
    }
  }, [fechas, valores, prov]);

  useEffect(() => {
    // Destruimos el gráfico anterior si existe
    if (chartInstance) {
      chartInstance.destroy();
    }

    if (chartData.labels.length > 0 && chartRef.current !== null) {
      const ctx = chartRef.current.getContext('2d');
      const newChartInstance = new Chart(ctx, {
        type: 'line', // Tipo de gráfico: línea
        data: {
          labels: chartData.labels, // Etiquetas del eje X (fechas)
          datasets: [
            {
              label: 'Indice de vegetación año '+`${year}`, // Nombre del conjunto de datos (API)
              data: chartData.dataNdvi, // Datos del eje Y (promedio de nieve desde la API)
              fill: false,
              borderColor: 'rgba(255, 99, 132, 1)', // Color de la línea
              borderWidth: 2,
              tension: 0.4,
            },
            {
              label: 'Indice de vegetación año '+`${year2}`, // Nombre del conjunto de datos (API)
              data: valoresNdviPunto, // Datos del eje Y (promedio de nieve desde la API)
              fill: false,
              borderColor: 'rgba(138, 43, 226, 1)', // Color de la línea
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

      setChartInstance(newChartInstance); // Actualiza la instancia del gráfico
      setChartReady(true); // El gráfico está listo
    }
  }, [chartData, valoresNdviPunto]); // Re-renderiza cuando los datos cambian

  return (
    <div style={{ width: '100%', height: 'auto' }}>
      {/* Contenedor de los botones de descarga, ubicado arriba del gráfico */}
      <div className="download-buttons-container">
        <DownloadCSVButton chartData={chartData} chartYear={valoresNdviPunto} fields={fields} filename="datos_ndvi.csv"/>
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
};

export default GraficComparador;
