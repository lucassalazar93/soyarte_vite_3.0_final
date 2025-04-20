// ✅ src/components/Recetas/AccionesReceta.jsx
import React from "react";
import confetti from "canvas-confetti";
import "./AccionesReceta.css";

const AccionesReceta = ({ receta, cocinada, setCocinada, guardar }) => {
  const handleGuardar = () => {
    alert("📌 Receta guardada en favoritos (solo demostración)");
  };

  const handleYaCocine = () => {
    if (receta) {
      confetti({ particleCount: 150, spread: 80, origin: { y: 0.7 } });
      guardar(receta);
      setCocinada(true);
    }
  };

  const toggleModoOscuro = () => {
    document.body.classList.toggle("modo-oscuro");
  };

  return (
    <div className="acciones-usuario">
      <button className="accion-btn" onClick={handleGuardar}>📌 Guardar</button>
      <button className="accion-btn" onClick={() => window.print()}>🖨️ Imprimir</button>
      <button
        className={`accion-btn ${cocinada ? "cocinada" : ""}`}
        onClick={handleYaCocine}
        disabled={cocinada}
      >
        {cocinada ? "✅ ¡Cocinada!" : "📍 Ya la cociné"}
      </button>
      <button className="accion-btn" onClick={toggleModoOscuro}>☀️ / 🌙</button>
    </div>
  );
};

export default AccionesReceta;
