import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import '../../styles/nieve/Mapa.css';

function LegendControl({year}) {
  const map = useMap(); // Usamos useMap para acceder al mapa de Leaflet

  useEffect(() => {
    // Crear la leyenda en la parte inferior derecha
    const legend = L.control({ position: 'bottomright' });

    legend.onAdd = function () {
      const div = L.DomUtil.create('div', 'info legend ndvi'); // Crear un contenedor para la leyenda
      const grades = [-1, 10, 20, 30, 40, 50, 60, 70, 90];  // Los valores de los colores
      const labels = [ '#1F12D4',  '#A903D6',  '#F80100', '#C99811', '#FFFE08','#7BF319',  '#0EE517',  '#2E9936'];  // Paleta de colores

      div.innerHTML +=  '<div class="legend-title">Referencias</div>';

      // Agregar cada color y su valor correspondiente a la leyenda
      for (let i = 0; i < grades.length - 1; i++) {
        div.innerHTML +=
          '<i style="background:' + labels[i] + '"></i> ' +
          (grades[i] + 1) + ' - ' + grades[i + 1] + '<br>';
      }

      return div;
    };

    legend.addTo(map); // Añadir la leyenda al mapa

    // Verificar si el texto fijo ya está agregado en el mapa
    const mapContainerYear = document.getElementById('mapYearNdvi');
    const mapContainerProm = document.getElementById('mapProm');

    // Solo agregar el texto si no existe ya
    if (mapContainerYear && !mapContainerYear.querySelector('.fixed-textNdvi')) {
      const fixedTextYear = document.createElement('div');
      fixedTextYear.classList.add('fixed-textNdvi'); // Añadir la clase para estilo
      fixedTextYear.innerHTML = 'Promedio '+`${year}`; // El texto fijo
      mapContainerYear.appendChild(fixedTextYear);
    }

    if (mapContainerProm && !mapContainerProm.querySelector('.fixed-textNdvi')) {
      const fixedTextProm = document.createElement('div');
      fixedTextProm.classList.add('fixed-textNdvi'); // Añadir la clase para estilo
      fixedTextProm.innerHTML = 'Promedio 2001-2024'; // El texto fijo
      mapContainerProm.appendChild(fixedTextProm);
    }

    return () => {
      map.removeControl(legend); // Eliminar la leyenda al desmontar el componente

      // Eliminar los textos fijos al desmontar el componente
      if (mapContainerYear) {
        const fixedTextYear = mapContainerYear.querySelector('.fixed-textNdvi');
        if (fixedTextYear) {
          mapContainerYear.removeChild(fixedTextYear);
        }
      }
      if (mapContainerProm) {
        const fixedTextProm = mapContainerProm.querySelector('.fixed-textNdvi');
        if (fixedTextProm) {
          mapContainerProm.removeChild(fixedTextProm);
        }
      }
    };
  }, [map]);

  return null;
}

export default LegendControl;
