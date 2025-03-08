
import React from 'react';
import Navbar from '../components/Navbar'; 
import Mapa from '../components/nieve/Mapa';     
import Sidebar from '../components/nieve/Sidebar';  
import { useSelector } from '../context/selectorContext'; // Importamos el hook
import { useLocation } from 'react-router-dom';


function Nieve() {
  const { selectedCuenca, selectedYear } = useSelector(); // Accedemos al estado 
  const location = useLocation(); 

  if (location.pathname === '/nieve') {

  return (
    <div>
      <Navbar />  

      <div className="main-container">
        {/* Barra lateral */}
        <Sidebar />

        {/* Pasamos los valores seleccionados al mapa */}
        <Mapa cuenca={selectedCuenca} year={selectedYear} />
      </div>
    </div>
  );
  } else{
    return;
  }
}

export default Nieve;

