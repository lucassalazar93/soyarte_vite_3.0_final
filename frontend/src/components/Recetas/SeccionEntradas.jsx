// src/components/Recetas/SeccionEntradas.jsx
import React from "react";
import "./SeccionEntradas.css";
import entradaImg from "/images/capitulo1.jpeg";

const SeccionEntradas = () => {
  // Función para hacer scroll a la sección de entradas reales
  const irAEntradasReales = () => {
    const seccion = document.getElementById("recetas-entradas"); // Asegúrate de tener este ID en la sección objetivo
    if (seccion) {
      seccion.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="seccion-capitulo" id="capitulo-1">
      <div className="capitulo-contenido" data-aos="fade-up">
        <div className="texto">
          <h2>
            Entradas y Acompañantes
            <span className="subtitulo-suspiro">El primer suspiro</span>
          </h2>
          <p>
            Todo comienza con un gesto suave. Una entrada, un acompañante, un sabor que despierta. Aquí nacen los primeros aromas, los que abren el apetito pero también el corazón. Como quien da el primer paso en una danza o extiende la mano para un abrazo.{" "}
            <span className="frase-destacada">
              Pequeños platos que anuncian algo grande.
            </span>
          </p>

          {/* 🎯 Botón que lleva a sección de recetas de entradas */}
          <button className="btn-ir-seccion" onClick={irAEntradasReales}>
            Ver recetas de entradas 🍞
          </button>
        </div>

        <div className="imagen">
          <img src={entradaImg} alt="Entradas y acompañantes" />
        </div>
      </div>
    </section>
  );
};

export default SeccionEntradas;
