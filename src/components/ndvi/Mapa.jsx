import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import '../../styles/ndvi/Mapa.css';
import Tabs from './Tabs';
import L from 'leaflet';
import LegendControl from './LegendControl';  
import { useSelector } from "../../context/selectorContext";
import DibujoMarcadores from './point';  // Importamos el componente
import CursorCoordinates from './CursorCoordinates';  

function Mapa({ prov, year, point }) {
  const {selectedPoint, selectedProv ,setSelectedPoint } = useSelector(); // Accedemos a los valores del contexto
  const [mapDataYear, setMapDataYear] = useState(null);
  const [outlineData, setOutlineData] = useState(null);
  const {valoresNdvi, setValoresNdvi} = useSelector();
  const {fechaGrafico, setFechaGrafico} = useSelector();
  const {PolygonPosition, setPolygonPosition } = useSelector();
  const [previousPolygonPosition, setPreviousPolygonPosition] = useState(null);
  const [loading, setLoading] = useState(true);  // Carga general
  const [center, setCenter] = useState([51.505, -0.09]);
  const [markerPosition, setMarkerPosition] = useState(point);


  useEffect(() => {
    setCenter(selectedPoint); // Esto actualizará el centro del mapa correctamente
  }, [selectedPoint]);  // Solo dependemos de selectedPoint ahora, ya que seleccionamos las coordenadas
  
  useEffect(() => {
    setMarkerPosition(selectedPoint);  // Esto mantiene la posición del marcador sincronizada con selectedPoint
  }, [selectedPoint]);

  useEffect(() => {
    setLoading(true);

    const currentPoint = selectedPoint;

  axios
      .post("https://backend-geosepa.onrender.com/getMapIdNdvi", {
        funcion: 'graficoAnual',
        prov: selectedProv,
        año: year,
        point: currentPoint  // Usamos currentPoint (puede ser markerPosition o el valor recibido como parámetro)
      })
      .then((response) => {
        const data = response.data;
        console.log("Éxito con la comunicación a la API", data);

        // Actualiza los estados con los datos de la respuesta
        setMapDataYear(data.urlYear);
        setOutlineData(data.outlineUrl); // Obtiene la URL del contorno
        setValoresNdvi(data.valoresNdviPunto);  // Actualiza los valores de nieve
        setFechaGrafico(data.fechaGrafico);  // Actualiza las fechas
        setPolygonPosition(null);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener el MapID:", error);
        setLoading(false);
      });
  }, [selectedProv, year]);  // Dependemos de markerPosition, prov, year, y point


  // Este useEffect solo se ejecutará cuando selectedPoint cambie
  useEffect(() => {
      if (!selectedPoint) return;  // Si no hay selectedPoint, no hacemos la solicitud
  
      setLoading(true);  // Iniciar el estado de carga
  
      axios
        .post("https://backend-geosepa.onrender.com/getPointNdvi", {
          funcion: 'graficoAnual',
          point: selectedPoint, // Usamos el selectedPoint para obtener los datos del punto
          año: year
        })
        .then((response) => {
          const data = response.data;
          console.log("Éxito con la comunicación a la API", data);
  
          setValoresNdvi(data.valoresNdviPunto);  // Actualiza los valores de nieve
          setFechaGrafico(data.fechaGrafico);  // Actualiza las fechas
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error al obtener el MapID:", error);
          setLoading(false);
        });
    }, [selectedPoint]);  // Este efecto depende solo de selectedPoint
  

const handleMarkerDrawn = (coordinates) => {
  if (coordinates && coordinates.lat !== undefined && coordinates.lng !== undefined) {
    // Si las coordenadas son válidas
    const coordenada = [coordinates.lat, coordinates.lng];
    setMarkerPosition(coordenada);  // Actualizamos el estado con la nueva posición
    setSelectedPoint(coordenada);   // Actualizamos las coordenadas seleccionadas
  } else {
    console.error('Coordenadas no válidas:', coordinates);
  }
};


const handlePolygonDrawn = (coordinates) => {
  // Verificamos si las coordenadas están bien formateadas
  console.log('Coordenadas recibidas:', coordinates);

  // Comprobamos si las coordenadas son válidas
  if (coordinates && coordinates.length > 0 && coordinates[0][0] !== null && coordinates[0][1] !== null) {
    // Comparamos las coordenadas antes de hacer algo (comparamos usando JSON.stringify)
    if (JSON.stringify(coordinates) !== JSON.stringify(previousPolygonPosition)) {
      console.log('Polígono dibujado con nuevas coordenadas:', coordinates);
      
      setPolygonPosition(coordinates);  // Guardamos la nueva posición del polígono
      setPreviousPolygonPosition(coordinates); // Actualizamos las coordenadas previas
    } else {
      console.log('Las coordenadas del polígono no han cambiado.');
    }
  } else {
    console.error('Las coordenadas recibidas no son válidas:', coordinates);
  }
};



  if (loading) {
    return <div className="loading-spinnerMap">
    <div className="spinnerMap"></div>
    <p>Cargando...</p>
  </div>;
  }

/*  if (loadingPolygon) {
    return <div className="loading-poly">Cargando graficos...</div>;
  }*/

  return (
    <div className="mapa-completo-container">
      <div className="mapa-row">
        <div className="mapa-completo">
          <MapContainer
            center={center}
            zoom={7}
            style={{ height: "100%", width: "100%" }}
          >
            <div id="mapYearNdvi"></div>
       {/*  <TileLayer
              url="https://wms.ign.gob.ar/geoserver/gwc/service/tms/1.0.0/capabaseargenmap@EPSG%3A3857@png/{z}/{x}/{-y}.png"
            />  */}
               <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            /> 

            {mapDataYear && (
              <TileLayer
                url={`${mapDataYear}`}
                attribution="Google Earth Engine"
                maxZoom={19}
                opacity={0.8}
              />
            )}

            {outlineData && (
              <TileLayer
                url={`${outlineData}`}
                attribution="Google Earth Engine Contorno"
                maxZoom={19}
                opacity={0.7}
              />
            )}

            <LegendControl year={year} />

            {/* Aquí pasamos las coordenadas al componente DibujoMarcadores */}
            <DibujoMarcadores onMarkerDrawn={handleMarkerDrawn}   onPolygonDrawn={handlePolygonDrawn}  markerPosition={markerPosition}/>

            <CursorCoordinates />
            
          </MapContainer>
        </div>
      </div>

      {/* Pasa los datos de las fechas y los valores de nieve al componente Tabs */}
      <Tabs fechas={fechaGrafico} valores={valoresNdvi} year={year} />

    </div>
  );
}

export default Mapa;

