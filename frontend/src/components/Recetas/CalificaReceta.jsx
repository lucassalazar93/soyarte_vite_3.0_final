// ✅ components/Recetas/CalificaReceta.jsx
import React from "react";
import "./CalificaReceta.css";

const CalificaReceta = () => {
  return (
    <div className="califica-receta">
      <h3>⭐ Califica esta receta</h3>
      <div className="estrellas">
        {[1, 2, 3, 4, 5].map((n) => (
          <span key={n}>☆</span>
        ))}
      </div>
      <textarea placeholder="¿Cómo te fue? ¿Algún tip que quieras compartir?" />
    </div>
  );
};

export default CalificaReceta;
