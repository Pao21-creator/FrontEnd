import React from 'react';
import Navbar from '../components/Navbar';
import Carousel from '../components/Carousel';
import '../styles/home/home.css';

function Home() {
  return (
    <div className="home">
      {/* Navbar en la parte superior */}
      <Navbar />

      {/* Texto en la parte superior */}
      <div className="header-text">
        <h1>SEPA</h1>
        <h2>Herramientas satelitales para el seguimiento de la producción agropecuaria</h2>
 
        <p>El Área de Observatorio Permanente de los Agroecosistemas del Instituto de Clima y Agua (CIRN-INTA), ha elaborado una iniciativa para la difusión de productos satelitales y agrometeorológicos que resulten útiles para la toma de decisiones agropecuarias con información recibida en antenas propias en Castelar, Buenos Aires, razón por la cual no se muestra la región bicontinental de Antártida e islas del Atlántico sur por encontrarse fuera de los límites de captura.</p>
      </div>

      {/* Contenedor principal con fondo degradado y el carrusel centrado */}
      <div className="main-containerHome">
        <Carousel /> {/* El carrusel estará centrado y abajo */}
      </div>
      
  
     
    </div>
  );
}

export default Home;
