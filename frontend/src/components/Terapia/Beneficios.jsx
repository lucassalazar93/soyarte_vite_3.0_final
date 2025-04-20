import React from "react";
import "./Beneficios.css";

const beneficios = [
  {
    icono: "🧘‍♀️",
    titulo: "Reducción del estrés",
    descripcion: "Preparar alimentos con atención plena reduce la ansiedad.",
  },
  {
    icono: "🧠",
    titulo: "Mayor claridad mental",
    descripcion: "Cocinar te ayuda a ordenar pensamientos y conectar contigo.",
  },
  {
    icono: "💖",
    titulo: "Autoamor y conexión",
    descripcion: "Cada receta es una forma de cuidarte desde adentro.",
  },
];

const Beneficios = () => {
  return (
    <section className="beneficios-wrapper">
      <h2 className="beneficios-title">💛 Beneficios de cocinar conscientemente</h2>
      <p className="beneficios-subtitle">
        Porque preparar comida con amor también es una forma de sanar.
      </p>

      <div className="beneficios-container">
        {beneficios.map((b, index) => (
          <div className="beneficio-card" key={index} data-aos="fade-up">
            <div className="icono-beneficio">
              <span>{b.icono}</span>
            </div>
            <h3 className="titulo-beneficio">{b.titulo}</h3>
            <p className="descripcion-beneficio">{b.descripcion}</p>
            <em className="frase-final">Un momento para ti, cada día.</em>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Beneficios;
