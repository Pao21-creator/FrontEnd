import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SelectorProvider } from './context/selectorContext'; // Asegúrate de importar el SelectorProvider
import Focos from './pages/Focos.jsx';
import Nieve from './pages/Nieve.jsx';
import Ndvi from './pages/Ndvi.jsx';
import Nevadas from './pages/Nevadas.jsx';
import Home from './pages/Home'; 
import './styles/App.css';

function App() {
  return (
    <Router>

        {/* Rutas que cambian según la URL */}
        <SelectorProvider>
          <Routes>
            <Route path="/" element={<Home />} />
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
