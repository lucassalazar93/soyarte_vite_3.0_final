import React from "react";
import "./RecetasSanadoras.css";

const recetas = [
  {
    nombre: "Sopa para el alma",
    imagen: "/img/sopa.png",
    etiquetas: ["🌿 Relajante", "💜 Reconfortante"],
    descripcion: "Calma el cuerpo y el alma en días fríos o emocionales.",
  },
  {
    nombre: "Pan casero integral",
    imagen: "/img/pan-artesanal.png",
    etiquetas: ["🍞 Nutritivo", "💛 Reconfortante"],
    descripcion: "Hecho con amor, ideal para compartir y reconectar.",
  },
  {
    nombre: "Infusión para dormir",
    imagen: "/img/te.png",
    etiquetas: ["🌙 Relajante", "🍋 Energizante"],
    descripcion: "Una mezcla de hierbas que ayuda a conciliar el sueño.",
  },
];

const RecetasSanadoras = () => {
  return (
    <section className="sanadoras-section seccion-alma">
      <div className="introduccion-emocional fade-in">
      <h2>🥄 Recetas con el Alma</h2>
        <p>Las recetas con propósito no solo alimentan el cuerpo,</p>
        <p>sino también abrazan el corazón.</p>
        <p className="frase-destacada">🌼 Preparaciones pensadas para esos momentos especiales:</p>
        <p>Cuando necesitas un <strong>abrazo en forma de sopa</strong> 🍲</p>
        <p>Un <strong>impulso de energía en forma de jugo</strong> 🥤</p>
        <p>O una <strong>dosis de amor propio en forma de postre</strong> 🍰</p>
        <p>Cada receta nace con una intención:</p>
        <p>motivarte, animarte, consentirte o ayudarte a soltar.</p>
        <p className="sutil">Porque aquí no solo se mezclan sabores... también se cocinan emociones. ✨</p>
      </div>

      <div className="galeria-recetas">
        {recetas.map((receta) => (
          <article className="tarjeta-receta fade-in" key={receta.nombre}>
            <img
              src={receta.imagen}
              alt={`Imagen de ${receta.nombre}`}
              className="imagen-receta"
            />
            <h3>{receta.nombre}</h3>
            <p className="etiquetas">{receta.etiquetas.join(" • ")}</p>
            <p className="descripcion">{receta.descripcion}</p>
            <a href="#recetas" className="boton-receta">Ver receta</a>
          </article>
        ))}
      </div>
    </section>
  );
};

export default RecetasSanadoras;
