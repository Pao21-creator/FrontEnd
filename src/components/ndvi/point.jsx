import React, { useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-draw';
import 'leaflet-draw/dist/leaflet.draw.css';
import { useSelector } from "../../context/selectorContext";

const DibujoMarcadores = ({ onMarkerDrawn, onPolygonDrawn, markerPosition }) => {
  const map = useMap();
  const [drawnMarker, setDrawnMarker] = useState(null);
  const [drawnPolygon, setDrawnPolygon] = useState(null);
  const { setPolygonPosition } = useSelector();

  useEffect(() => {
    // Crear el grupo de elementos que contendrá los marcadores y polígonos
    const drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);

    // Configuramos el control de dibujo para agregar tanto marcadores como polígonos
    const drawControl = new L.Control.Draw({
      draw: {
        marker: true,
        polygon: true, // Activamos la opción para dibujar polígonos
        polyline: false,
        rectangle: false,
        circle: false,  // Deshabilitamos la opción para dibujar círculos
        circlemarker: false
      },
      edit: {
        featureGroup: drawnItems, // Deshabilita la edición después de dibujar
      }
    });
    map.addControl(drawControl);

    // Evento que se dispara cuando se crea un marcador o polígono
    map.on('draw:created', (e) => {
      const { layer } = e;

      // Si el tipo de layer es un marcador
      if (e.layerType === 'marker') {
        const latlng = layer.getLatLng(); // Coordenadas de un marcador (único punto)
        const { lat, lng } = latlng;

        // Verificar si las coordenadas no son indefinidas
        if (lat !== undefined && lng !== undefined) {
          // Eliminar el polígono cuando se dibuja un marcador
          if (drawnPolygon) {
            drawnItems.removeLayer(drawnPolygon); // Eliminar el polígono
            setPolygonPosition(null);
          }

          onMarkerDrawn({ lat, lng }); // Llamar a la función del callback para el marcador
        } else {
          console.error('Coordenadas de marcador indefinidas:', lat, lng);
        }

        // Añadir marcador al grupo
        drawnItems.addLayer(layer);
        setDrawnMarker(layer); // Establecer el marcador dibujado
      }

      // Si el tipo de layer es un polígono
      if (e.layerType === 'polygon') {
        const latlngs = layer.getLatLngs(); // Coordenadas de un polígono (array de puntos)

        // Verificar que tenemos coordenadas válidas
        if (latlngs && latlngs.length > 0) {
          const polygonCoordinates = latlngs[0].map(latlng => [latlng.lat, latlng.lng]); 

          // Llamamos a la función con las coordenadas del polígono
          onPolygonDrawn(polygonCoordinates);
        } else {
          console.error('Coordenadas del polígono indefinidas:', latlngs);
        }

        // Añadir polígono al grupo
        drawnItems.addLayer(layer);
        setDrawnPolygon(layer); // Establecer el polígono dibujado
      }
    });

    // Si ya tienes una posición de marcador, lo dibujamos en el mapa
    if (markerPosition) {
      const existingMarker = L.marker(markerPosition);
      drawnItems.addLayer(existingMarker);
      setDrawnMarker(existingMarker); // Guardar el marcador
    }

    // Cleanup: eliminar el control de dibujo cuando el componente se desmonte
    return () => {
      map.removeControl(drawControl);
      map.removeLayer(drawnItems);
    };
  }, [map, onMarkerDrawn, onPolygonDrawn, markerPosition, drawnPolygon]);

  return null; // Este componente no necesita renderizar nada directamente
};

export default DibujoMarcadores;
