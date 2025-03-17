// src/components/CursorCoordinates.js
import React, { useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';
import '../../styles/ndvi/cursor.css'

const CursorCoordinates = () => {
  const [cursorCoordinates, setCursorCoordinates] = useState(null);
  const map = useMap();

  useEffect(() => {
    const onMouseMove = (e) => {
      // Capturamos las coordenadas del cursor
      const { lat, lng } = e.latlng;
      setCursorCoordinates({ lat, lng });
    };

    // Registramos el evento de movimiento del mouse
    map.on('mousemove', onMouseMove);

    // Limpiamos el evento al desmontar el componente
    return () => {
      map.off('mousemove', onMouseMove);
    };
  }, [map]);

  if (!cursorCoordinates) return null;

  return (
    <div className="cursor-coordinates">
      <p>Lat: {cursorCoordinates.lat.toFixed(4)}, Lng: {cursorCoordinates.lng.toFixed(4)}</p>
    </div>
  );
};

export default CursorCoordinates;
