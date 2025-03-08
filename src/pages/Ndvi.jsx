import React from 'react';
import Navbar from '../components/Navbar'; 
import Mapa from '../components/ndvi/Mapa';     
import Sidebar from '../components/ndvi/Sidebar';  
import { useSelector } from '../context/selectorContext'; // Importamos el hook
import { useLocation } from 'react-router-dom';

function Ndvi() {
  const { selectedProv, selectedYear, selectedPoint } = useSelector(); // Accedemos al estado global
  const location = useLocation(); // Para obtener la ruta actual

  if(location.pathname === '/ndvi'){
  return (
    <div>
      <Navbar />  

      <div className="main-container">
        {/* Barra lateral */}
        <Sidebar />

        {/* Pasamos los valores seleccionados al mapa */}
        <Mapa prov={selectedProv} year={selectedYear} point={selectedPoint}/>
      </div>
    </div>
  );
} else {
  return 0;
}

}

export default Ndvi;

