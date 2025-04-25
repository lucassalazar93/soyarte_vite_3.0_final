// src/components/Recetas/SeccionPlatosFuertes.jsx
import React from "react";
import "./SeccionPlatosFuertes.css";
import fuertesImg from "/images/capitulo2.png";

const SeccionPlatosFuertes = () => {
  const irAPlatosFuertes = () => {
    const destino = document.getElementById("recetas-fuertes");
    if (destino) {
      destino.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="seccion-capitulo bg-alterno" id="capitulo-2">
      <div className="capitulo-contenido" data-aos="fade-up"> {/* ✅ sin "invertido" */}
        <div className="imagen">
          <img src={fuertesImg} alt="Platos Fuertes - Cocina con alma" />
        </div>

        <div className="texto">
          <h2>
            Platos Fuertes <br />
            <span className="subtitulo-suspiro">El corazón de la historia</span>
          </h2>
          <p>
            Aquí está el alma del relato. Recetas que <strong>sostienen</strong>,{" "}
            <strong>nutren</strong>, que nos recuerdan de dónde venimos. Son esos platos que se preparan{" "}
            <span className="frase-destacada">con tiempo y memoria</span>, como lo hacía la abuela, como lo reinventamos
            nosotras. <em>Cocinar estos platos es un acto de resistencia y amor propio.</em>
          </p>
          <button className="btn-ir-seccion" onClick={irAPlatosFuertes}>
            Ir al corazón 🍲
          </button>
        </div>
      </div>
    </section>
  );
};

export default SeccionPlatosFuertes;
