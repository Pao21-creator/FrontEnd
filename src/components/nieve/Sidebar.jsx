// Sidebar.jsx
import React from 'react';
import SelectorCuenca from './SelectorCuenca';
import SelectorAño from './SelectorAño';
import TextoDescriptivo from './textDescriptivo';
import { useSelector } from '../../context/selectorContext'; // Importamos el hook
import '../../styles/nieve/Sidebar.css';

function Sidebar() {
  const { selectedCuenca, selectedYear, handleCuencaSelectChange, handleYearSelectChange } = useSelector();

  const cuencaOptions = [
    { value: 'barrancasygrande', label: 'Río Colorado' },
    { value: 'cuenca2', label: 'Cuenca 2' },
    { value: 'cuenca3', label: 'Cuenca 3' }
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
    { value: 2024 , label: '2024' },
    { value: 2025 , label: '2025' },
  ];

  return (
    <div className="sidebar">
      {/* Componente de texto descriptivo */}
      <TextoDescriptivo 
        title="Estimación de Nieve"
        description="Esta plataforma permite visualizar la cobertura de nieve en las principales cuencas hídricas desde el año 2001 en adelante."
        description2="La información utilizada en este estudio proviene de imágenes satelitales MODIS, específicamente del producto MOD10A2, que tiene una resolución espacial de 500 metros y una frecuencia de adquisición cada 8 días. Este producto fue obtenido del sitio web de NSIDC (https://nsidc.org/)."
      />

      {/* Selector de cuenca */}
      <SelectorCuenca 
        options={cuencaOptions}
        value={selectedCuenca}
        onSelectChange={handleCuencaSelectChange}
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
