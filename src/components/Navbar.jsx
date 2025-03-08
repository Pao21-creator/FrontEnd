import React from 'react';
import '../styles/Navbar.css'; // Ruta hacia el archivo CSS

function Navbar() {
  return (
    <nav className="navbar _navbar-inverse navbar-fixed-top">
      <div className="navbar-new">
        <div className="navbar-content">
          {/* Contenedor para el logo izquierdo */}
          <div id="logo-navbar" className="navbar-new-content">
            <a
              id="top-left-logo-link"
              href="https://sepa.inta.gob.ar/"
              title="left logo"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                id="top-left-logo"
                src="../assets/img/SEPA.png"
                className="sprite"
                alt="SEPA logo"
              />
            </a>
          </div>

          {/* Menú de navegación */}
          <div className="menuSEPA">
            <nav>
              <ul>
                <li>
                  <a href="https://sepa.inta.gob.ar/productos/">MAS PRODUCTOS</a>
                </li>
                <li>
                  <a href="https://sepa.inta.gob.ar/equipo/">EQUIPO</a>
                </li>
                <li>
                  <a href="https://sepa.inta.gob.ar/contacto/">CONTACTO</a>
                </li>
              </ul>
            </nav>
          </div>

          {/* Contenedor para el logo derecho */}
          <div id="logo-help" className="navbar-new-content">
            <a
              id="top-right-logo-link"
              href="https://www.argentina.gob.ar/inta"
              title="right logo"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                id="top-right-logo"
                src="../assets/img/INTA.png"
                alt="INTA logo"
              />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
