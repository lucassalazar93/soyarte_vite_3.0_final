// src/components/Recetas/SeccionDespedida.jsx
import React from "react";
import "./SeccionDespedida.css";

const SeccionDespedida = () => {
  return (
    <section className="seccion-despedida" data-aos="fade-up">
      {/* 🌫️ Overlay de humo suave */}
      <div className="humo-overlay"></div>

      <div className="despedida-texto">
        <h2>Bienvenida a esta cocina emocional.</h2>
        <p>Una receta a la vez, vas escribiendo tu historia.</p>
        <p>Una cucharada de amor, un ingrediente de sanación.</p>
        <h3 data-aos="zoom-in">
          Aquí, en <span className="marca">Soy Arte</span>, cocinar también es <strong>crear(te)</strong>.
        </h3>
      </div>
    </section>
  );
};

export default SeccionDespedida;
