import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SelectorProvider } from './context/selectorContext'; // Asegúrate de importar el SelectorProvider
import Focos from './pages/Focos.jsx';
import Nieve from './pages/Nieve.jsx';
import Ndvi from './pages/Ndvi.jsx';
import Nevadas from './pages/Nevadas.jsx';
import Navbar from './components/Navbar.jsx';


function App() {
  return (
    <Router>
      {/* Coloca el Navbar y el h1 dentro del Router */}
      <div>
        <Navbar />
        <h1>Bienvenido a la Página</h1>
      </div>

      {/* Rutas que cambian según la URL */}
      <SelectorProvider>
      <Routes>
        {/* Ruta para la página de Nieve, envuelves Ndvi en SelectorProvider */}
        <Route path="/nieve" element={<Nieve />} />
        <Route path="/focos" element={<Focos />} />  
        <Route path="/nevadas" element={<Nevadas />} /> 
        <Route path="/ndvi" element={<Ndvi />} />  
      </Routes>
      </SelectorProvider>
    </Router>
  );
}

export default App;