import React, { useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-draw';
import 'leaflet-draw/dist/leaflet.draw.css';
import { useSelector } from "../../context/selectorContext";

const DibujoMarcadores = ({ onMarkerDrawn, onPolygonDrawn, markerPosition }) => {
  const map = useMap();
  const { PolygonPosition, setPolygonPosition } = useSelector();
  const [drawnItems, setDrawnItems] = useState(null); // Crear estado para el grupo de elementos dibujados
  const [Poly, setPoly] = useState(PolygonPosition); // Estado para el polígono
  const [Mark, setMark] = useState(markerPosition);
  const [polygonArea, setPolygonArea] = useState(null); // Agregar estado para el área

  useEffect(() => {
    // Configurar los textos y tooltips en español antes de inicializar el control de dibujo
    L.drawLocal.draw.toolbar.finish.title = "Finalizar dibujo";
    L.drawLocal.draw.toolbar.finish.text = "Finalizar";
    L.drawLocal.draw.toolbar.actions.title = "Cancelar dibujo";
    L.drawLocal.draw.toolbar.actions.text = "Cancelar";
    L.drawLocal.draw.toolbar.undo.title = "Eliminar el último punto dibujado";
    L.drawLocal.draw.toolbar.undo.text = "Eliminar el último punto";
    L.drawLocal.draw.handlers.marker.tooltip.start = "Click sobre el mapa para posicionar el marcador";
    L.drawLocal.draw.handlers.polygon.tooltip.start = "Click para comenzar a dibujar la forma";
    L.drawLocal.draw.handlers.polygon.tooltip.cont = "Click para continuar dibujando la forma";
    L.drawLocal.draw.handlers.polygon.tooltip.end = "Click en el primer punto para cerrar la forma";

    // Inicializamos el grupo de elementos una sola vez
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
        featureGroup: drawnItems, // Usamos 'drawnItems' aquí
      }
    });
    map.addControl(drawControl);

    // Función que elimina todos los elementos en el grupo de dibujos
    const removeAllLayers = () => {
      drawnItems.clearLayers();
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
          drawnItems.addLayer(layer);
          onMarkerDrawn(latlng);  
          setMark(latlng); // Actualizar marcador
          setPoly(null); // Limpiar polígono
          setPolygonPosition(null);
          setPolygonArea(null);
        } else {
          console.error('Coordenadas de marcador indefinidas:', lat, lng);
        }
      }

      if (e.layerType === 'polygon') {
        const latlngs = layer.getLatLngs(); // Coordenadas del polígono
      
        if (Array.isArray(latlngs) && latlngs.length > 0 && Array.isArray(latlngs[0])) {
          const polygonCoordinates = latlngs[0].map(latlng => [latlng.lat, latlng.lng]);
      
          // Añadir el nuevo polígono al grupo
          drawnItems.addLayer(layer);
          onPolygonDrawn(polygonCoordinates);
          setPoly(polygonCoordinates); // Actualizar polígono

          const area = L.GeometryUtil.geodesicArea(layer.getLatLngs()[0]); // Cálculo en metros cuadrados
          const areaInKm2 = area / 1000000; // Convertir a km²
          setPolygonArea(areaInKm2); // Establecer el área en el estado

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
      const existingMarker = L.marker(Mark);
      drawnItems.addLayer(existingMarker); // Agregar el marcador inicial
      console.log("Marcador agregado desde el estado", Mark); // Verificar marcador

      setPolygonArea(null);
    }

    // Verificar si PolygonPosition tiene un valor válido
    if (Poly && Array.isArray(Poly) && Poly.length > 0) {
      console.log('Agregando polígono desde el estado:', Poly); // Verificar si se entra en esta parte
      const existingPolygon = L.polygon(Poly);
      drawnItems.addLayer(existingPolygon); // Agregar el polígono inicial
    } else {
      console.log('No se encontró PolygonPosition válido', Poly); // Si no entra en la condición
    }

    const areaControl = L.control({ position: 'topright' });
    areaControl.onAdd = () => {
      const div = L.DomUtil.create('div', 'leaflet-control-area');
      div.innerHTML = `<strong>Área del Polígono:</strong> ${polygonArea ? polygonArea.toFixed(2) : '0.00'} km²`;
      return div;
    };
    areaControl.addTo(map);

    // Cleanup: eliminar el control de dibujo cuando el componente se desmonte
    return () => {
      map.removeControl(drawControl);
      map.removeLayer(drawnItems);
      map.removeControl(areaControl);  // Limpiar el control del área
    };
  }, [markerPosition, PolygonPosition, onMarkerDrawn, Poly]); // Dependencias actualizadas

  return null; // Este componente no necesita renderizar nada directamente
};

export default DibujoMarcadores;
