// src/components/Recetas/HeroReceta.jsx
import React from "react";
import "./HeroReceta.css";

const HeroReceta = ({ receta }) => {
  return (
    <section className="hero-receta">
      <div className="hero-columna-izquierda">
        <img
          src={`http://localhost:5000${receta.imagen}`}
          alt={receta.titulo}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/img/default.jpg";
          }}
        />
      </div>

      <div className="hero-columna-derecha">
        <h1 className="hero-titulo">{receta.titulo}</h1>
        <p className="hero-descripcion" dangerouslySetInnerHTML={{ __html: receta.descripcion_larga }} />

        <ul className="hero-datos">
          <li><strong>⏱️ Tiempo:</strong> {receta.tiempo_preparacion} min</li>
          <li><strong>📑 Dificultad:</strong> {receta.nivel_dificultad}</li>
          <li><strong>👩‍🍳 Autor:</strong> {receta.autor}</li>
          <li><strong>⭐ Calificación:</strong> {receta.calificacion} / 5</li>
        </ul>
      </div>
    </section>
  );
};

export default HeroReceta;
