import React, { useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';
import L, { LatLng } from 'leaflet';
import 'leaflet-draw';
import 'leaflet-draw/dist/leaflet.draw.css';
import { useSelector } from "../../context/selectorContext";

const DibujoMarcadores = ({ onMarkerDrawn, onPolygonDrawn, markerPosition }) => {
  const map = useMap();
  const { PolygonPosition, setPolygonPosition } = useSelector();
  const [drawnItems, setDrawnItems] = useState(null); // Crear estado para el grupo de elementos dibujados
  const [Poly, setPoly] = useState(PolygonPosition); // Estado para el polígono
  const [Mark, setMark] = useState(markerPosition);

  useEffect(() => {
    // Inicializamos el grupo de elementos una sola vez
    const featureGroup = new L.FeatureGroup();
    map.addLayer(featureGroup);
    setDrawnItems(featureGroup);

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
        featureGroup: featureGroup, // Deshabilita la edición después de dibujar
      }
    });
    map.addControl(drawControl);

    // Función que elimina todos los elementos en el grupo de dibujos
    const removeAllLayers = () => {
      featureGroup.clearLayers();
    };

    // Evento que se dispara cuando se crea un marcador o polígono
    map.on('draw:created', (e) => {
      const { layer } = e;

      // Limpiar todos los elementos antes de añadir el nuevo marcador o polígono
      removeAllLayers();

      // Si el tipo de layer es un marcador
      if (e.layerType === 'marker') {
        const latlng = layer.getLatLng(); // Coordenadas del marcador
        const { lat, lng } = latlng;
      
        if (lat !== undefined && lng !== undefined) {
          // Añadir el nuevo marcador al grupo
          featureGroup.addLayer(layer);
          onMarkerDrawn(latlng);  
          setMark(latlng); // Actualizar marcador
          setPoly(null); // Limpiar polígono
        } else {
          console.error('Coordenadas de marcador indefinidas:', lat, lng);
        }
      }

      if (e.layerType === 'polygon') {
        const latlngs = layer.getLatLngs(); // Coordenadas del polígono
      
        if (Array.isArray(latlngs) && latlngs.length > 0 && Array.isArray(latlngs[0])) {
          const polygonCoordinates = latlngs[0].map(latlng => [latlng.lat, latlng.lng]);
      
          // Añadir el nuevo polígono al grupo
          featureGroup.addLayer(layer);
          onPolygonDrawn(polygonCoordinates);
          setPoly(polygonCoordinates); // Actualizar polígono
          setMark(null); // Limpiar marcador
        } else {
          console.error('Coordenadas del polígono indefinidas o vacías:', latlngs);
        }
      }
    });

    // Verificar las coordenadas de PolygonPosition
    console.log('PolygonPosition al inicio del useEffect:', PolygonPosition);

    // Si ya tienes una posición de marcador, lo dibujamos en el mapa
    if (Mark) {
      const existingMarker = L.marker(markerPosition);
      featureGroup.addLayer(existingMarker); // Agregar el marcador inicial
      console.log("Marcador agregado desde el estado", Mark); // Verificar marcador
    }

    // Verificar si PolygonPosition tiene un valor válido
    if (Poly && Array.isArray(Poly) && Poly.length > 0) {
      console.log('Agregando polígono desde el estado:', Poly); // Verificar si se entra en esta parte
      const existingPolygon = L.polygon(Poly);
      featureGroup.addLayer(existingPolygon); // Agregar el polígono inicial
    } else {
      console.log('No se encontró PolygonPosition válido', Poly); // Si no entra en la condición
    }

    // Cleanup: eliminar el control de dibujo cuando el componente se desmonte
    return () => {
      map.removeControl(drawControl);
      map.removeLayer(featureGroup);
    };
  }, [markerPosition, PolygonPosition, onMarkerDrawn]); // Dependencias actualizadas

  return null; // Este componente no necesita renderizar nada directamente
};

export default DibujoMarcadores;
