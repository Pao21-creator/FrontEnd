import React, { createContext, useState, useContext, useEffect } from 'react';

// Creamos el contexto
const SelectorContext = createContext();

// Proveedor del contexto que envolverá toda la aplicación
export const SelectorProvider = ({ children }) => {
  const [selectedCuenca, setSelectedCuenca] = useState('barrancasygrande'); // Estado para la cuenca seleccionada
  const [selectedProv, setSelectedProv] = useState('BuenosAires'); // Estado para la prov seleccionada
  const [selectedYear, setSelectedYear] = useState(2004); // Estado para el año seleccionado
  const [selectedYearGrafic, setSelectedYearGrafic] = useState(2023);
  const [selectedPoint, setSelectedPoint] = useState([-34.6037, -58.3816]); // Inicializamos con las coordenadas de Buenos Aires

  const [fechaGrafico, setFechaGrafico] = useState();
  const [valoresNdvi, setValoresNdvi] = useState();
  const [ polygonPosition, setPolygonPosition] =  useState();


  const provCoordinates = {
    'BuenosAires': [-34.6037, -58.3816], // La Plata, Capital de Buenos Aires
    'CABA': [-34.6118, -58.4173], // Ciudad Autónoma de Buenos Aires
    'Catamarca': [-28.4683, -65.7794], // San Fernando del Valle de Catamarca
    'Chaco': [-27.4497, -58.9869], // Resistencia
    'Chubut': [-45.8660, -67.5000], // Rawson
    'Córdoba': [-31.4201, -64.1888], // Córdoba
    'Corrientes': [-27.4677, -58.8293], // Corrientes
    'EntreRios': [-32.9468, -60.6393], // Paraná
    'Formosa': [-26.1844, -58.1817], // Formosa
    'Jujuy': [-24.1854, -65.2993], // San Salvador de Jujuy
    'LaPampa': [-36.6167, -64.2833], // Santa Rosa
    'LaRioja': [-29.4136, -66.8483], // La Rioja
    'Mendoza': [-32.8894, -68.8440], // Mendoza
    'Misiones': [-26.1804, -54.7000], // Posadas
    'Neuquen': [-38.9516, -68.0593], // Neuquén
    'RioNegro': [-39.0336, -67.9606], // Viedma
    'Salta': [-24.7831, -65.4083], // Salta
    'SanJuan': [-31.5374, -68.5369], // San Juan
    'SanLuis': [-33.2950, -66.3355], // San Luis
    'SantaCruz': [-49.3040, -68.2193], // Río Gallegos
    'SantaFe': [-31.6333, -60.7000], // Santa Fe
    'SantiagodelEstero': [-27.8000, -64.2667], // Santiago del Estero
    'TierradelFuego': [-54.8019, -68.3029], // Ushuaia
    'Tucuman': [-26.8190, -65.2175], // San Miguel de Tucumán
    'default': [-34.6037, -58.3816], // BsAs (default)
  };
  
  

  // Funciones para actualizar los valores de cuenca y año
  const handleCuencaSelectChange = (newSelectedCuenca) => {
    setSelectedCuenca(newSelectedCuenca);
  };

  const handleProvSelectChange = (newSelectedProv) => {
    setSelectedProv(newSelectedProv); // Actualiza la provincia
    const newPoint = provCoordinates[newSelectedProv] || provCoordinates['default'];  // Si no existe la provincia, usa el valor por defecto
    setSelectedPoint(newPoint);  // Actualiza las coordenadas con el punto correspondiente a la nueva provincia
  };
  

  const handleYearSelectChange = (newSelectedYear) => {
    setSelectedYear(newSelectedYear);
  };

  const handleYearGraficSelectChange = (newSelectedYearGrafic) => {
    setSelectedYearGrafic(newSelectedYearGrafic);
  };

  return (
    <SelectorContext.Provider
      value={{
        selectedCuenca,
        selectedProv,
        selectedYear,
        selectedYearGrafic,
        selectedPoint, // Proveemos el estado de las coordenadas al contexto
        fechaGrafico,
        valoresNdvi,
        polygonPosition,
        handleCuencaSelectChange,
        handleYearSelectChange,
        handleYearGraficSelectChange,
        handleProvSelectChange,
        setSelectedPoint,
        setFechaGrafico,
        setValoresNdvi,
        setPolygonPosition
      }}
    >
      {children}
    </SelectorContext.Provider>
  );
};

// Hook para usar el contexto en los componentes
export const useSelector = () => {
  return useContext(SelectorContext);
};
