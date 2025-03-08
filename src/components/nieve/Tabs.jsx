import React, { useState } from "react";
import "../../styles/Tabs.css";
import Grafico from "./grafic";
import { useSelector } from "../../context/selectorContext";
import SelectorAnualGrafico from "./selectorAnualGrafico";
import GraficComparador from "./graficComparador";

function Tabs({ fechas, valores, year }) {
  const [activeTab, setActiveTab] = useState(0); // Estado para manejar la pestaña activa
  const { selectedYearGrafic, handleYearGraficSelectChange, selectedCuenca } =
    useSelector();

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const yearOptions = [
    { value: 2001, label: "2001" },
    { value: 2002, label: "2002" },
    { value: 2003, label: "2003" },
    { value: 2004, label: "2004" },
    { value: 2005, label: "2005" },
    { value: 2006, label: "2006" },
    { value: 2007, label: "2007" },
    { value: 2008, label: "2008" },
    { value: 2009, label: "2009" },
    { value: 2010, label: "2010" },
    { value: 2011, label: "2011" },
    { value: 2012, label: "2012" },
    { value: 2013, label: "2013" },
    { value: 2014, label: "2014" },
    { value: 2015, label: "2015" },
    { value: 2016, label: "2016" },
    { value: 2017, label: "2017" },
    { value: 2018, label: "2018" },
    { value: 2019, label: "2019" },
    { value: 2020, label: "2020" },
    { value: 2021, label: "2021" },
    { value: 2022, label: "2022" },
    { value: 2023, label: "2023" },
    { value: 2024, label: "2024" },
  ];

  return (
    <div className="tabs-container">
      {/* Pestañas */}
      <div className="tabs">
        <div
          className={`tab ${activeTab === 0 ? "active" : ""}`}
          onClick={() => handleTabClick(0)}
        >
          Serie Anual
        </div>
        <div
          className={`tab ${activeTab === 1 ? "active" : ""}`}
          onClick={() => handleTabClick(1)}
        >
          Comparador de series anuales
        </div>
      </div>

      {/* Contenido de las pestañas */}
      <div className="tab-content-container">
        <div className={`tab-content ${activeTab === 0 ? "active" : ""}`}>
          <h3>Serie de cobertura nival de la cuenca</h3>
          {/* Pasa las fechas y los valores a Grafico como props */}
          <div id="grafico">
            <Grafico fechas={fechas} valores={valores} year={year} />
          </div>
        </div>
        <div className={`tab-content ${activeTab === 1 ? "active" : ""}`}>
          <div className="tab-content-header">
            <h3>
              Comparador interanual de cobertura nivel {year} vs{" "}
              {selectedYearGrafic}
            </h3>

            <SelectorAnualGrafico
              options={yearOptions}
              value= {selectedYearGrafic || 2023}
              onSelectChange={handleYearGraficSelectChange}
            />
          </div>

          <div id="grafico">
            <GraficComparador
              fechas={fechas}
              valores={valores}
              year2={selectedYearGrafic}
              year={year}
              cuenca={selectedCuenca}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tabs;
