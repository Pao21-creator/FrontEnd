import React from 'react';
import SelectorProv from './SelectorProv';
import SelectorAño from './SelectorAño';
import TextoDescriptivo from './textDescriptivo';
import { useSelector } from '../../context/selectorContext'; // Importamos el hook
import '../../styles/ndvi/Sidebar.css';

function Sidebar() {
  const { selectedProv, selectedYear, handleProvSelectChange, handleYearSelectChange, selectedPoint } = useSelector();

  const provOptions = [
    { value: 'BuenosAires', label: 'Buenos Aires' },
    { value: 'Catamarca', label: 'Catamarca' },
    { value: 'Chaco', label: 'Chaco' },
    { value: 'Chubut', label: 'Chubut' },
    { value: 'Córdoba', label: 'Córdoba' },
    { value: 'Corrientes', label: 'Corrientes' },
    { value: 'EntreRios', label: 'Entre Ríos' },
    { value: 'Formosa', label: 'Formosa' },
    { value: 'Jujuy', label: 'Jujuy' },
    { value: 'LaPampa', label: 'La Pampa' },
    { value: 'LaRioja', label: 'La Rioja' },
    { value: 'Mendoza', label: 'Mendoza' },
    { value: 'Misiones', label: 'Misiones' },
    { value: 'Neuquen', label: 'Neuquén' },
    { value: 'RioNegro', label: 'Río Negro' },
    { value: 'Salta', label: 'Salta' },
    { value: 'SanJuan', label: 'San Juan' },
    { value: 'SanLuis', label: 'San Luis' },
    { value: 'SantaCruz', label: 'Santa Cruz' },
    { value: 'SantaFe', label: 'Santa Fe' },
    { value: 'SantiagodelEstero', label: 'Santiago del Estero' },
    { value: 'TierradelFuego', label: 'Tierra del Fuego' },
    { value: 'Tucuman', label: 'Tucumán' }
  ];
  

  const yearOptions = [
    { value: 2001 , label: '2001' },
    { value: 2002 , label: '2002' },
    { value: 2003 , label: '2003' },
    { value: 2004 , label: '2004' },
    { value: 2005 , label: '2005' },
    { value: 2006 , label: '2006' },
    { value: 2007 , label: '2007' },
    { value: 2008 , label: '2008' },
    { value: 2009 , label: '2009' },
    { value: 2010 , label: '2010' },
    { value: 2011 , label: '2011' },
    { value: 2012 , label: '2012' },
    { value: 2013 , label: '2013' },
    { value: 2014 , label: '2014' },
    { value: 2015 , label: '2015' },
    { value: 2016 , label: '2016' },
    { value: 2017 , label: '2017' },
    { value: 2018 , label: '2018' },
    { value: 2019 , label: '2019' },
    { value: 2020 , label: '2020' },
    { value: 2021 , label: '2021' },
    { value: 2022 , label: '2022' },
    { value: 2023 , label: '2023' },
    { value: 2024 , label: '2024' }
  ];

  return (
    <div className="sidebarNdvi">
      {/* Componente de texto descriptivo */}
      <TextoDescriptivo 
        title="Índices de vegetación"
        description="Esta plataforma permite visualizar el índice de vegetación normalizado (IVN; NDVI en inglés) que se calcula tomando los valores máximos para una composición de imágenes correspondientes a 16 días. Se contabilizan los 16 días a partir del 1º de enero de cada año, obteniéndose un total de 23 imágenes anuales."
        description2="Se utilizan imágenes del sensor MODIS de los satélites AQUA-TERRA con una resolución espacial de 6,25 hectáreas (250 m)."
      />

      {/* Selector de cuenca */}
      <SelectorProv
        options={provOptions}
        value={selectedProv}
        onSelectChange={handleProvSelectChange}
      />
      
      {/* Selector de año */}
      <SelectorAño 
        options={yearOptions}
        value={selectedYear || 2004}
        onSelectChange={handleYearSelectChange}
      />

    </div>
  );
}

export default Sidebar;

