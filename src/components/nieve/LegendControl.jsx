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
      const div = L.DomUtil.create('div', 'info legend'); // Crear un contenedor para la leyenda
      const grades = [-1, 40, 80, 120, 160, 200];  // Los valores de los colores
      const labels = ['#eff6f0', '#acdcec', '#68bcf8', '#3480fc', '#121bd1'];  // Paleta de colores

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
    const mapContainerYear = document.getElementById('mapYear');
    const mapContainerProm = document.getElementById('mapProm');

    // Solo agregar el texto si no existe ya
    if (mapContainerYear && !mapContainerYear.querySelector('.fixed-text')) {
      const fixedTextYear = document.createElement('div');
      fixedTextYear.classList.add('fixed-text'); // Añadir la clase para estilo
      fixedTextYear.innerHTML = 'Promedio '+`${year}`; // El texto fijo
      mapContainerYear.appendChild(fixedTextYear);
    }

    if (mapContainerProm && !mapContainerProm.querySelector('.fixed-text')) {
      const fixedTextProm = document.createElement('div');
      fixedTextProm.classList.add('fixed-text'); // Añadir la clase para estilo
      fixedTextProm.innerHTML = 'Promedio 2001-2024'; // El texto fijo
      mapContainerProm.appendChild(fixedTextProm);
    }

    return () => {
      map.removeControl(legend); // Eliminar la leyenda al desmontar el componente

      // Eliminar los textos fijos al desmontar el componente
      if (mapContainerYear) {
        const fixedTextYear = mapContainerYear.querySelector('.fixed-text');
        if (fixedTextYear) {
          mapContainerYear.removeChild(fixedTextYear);
        }
      }
      if (mapContainerProm) {
        const fixedTextProm = mapContainerProm.querySelector('.fixed-text');
        if (fixedTextProm) {
          mapContainerProm.removeChild(fixedTextProm);
        }
      }
    };
  }, [map]);

  return null;
}

export default LegendControl;
