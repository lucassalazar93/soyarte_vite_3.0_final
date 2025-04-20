import React, { useEffect, useState } from "react";
import {
  obtenerRecetasCocinadas,
  limpiarHistorialCocina,
} from "../../utils/localStorage";
import confetti from "canvas-confetti";
import "./RecetasCocinadas.css";

const RecetasCocinadas = () => {
  const [recetas, setRecetas] = useState([]);

  useEffect(() => {
    setRecetas(obtenerRecetasCocinadas());
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.5 },
    });
  }, []);

  const handleLimpiar = () => {
    if (
      window.confirm("¿Estás segura de borrar tus recuerdos cocinados? 🌸")
    ) {
      limpiarHistorialCocina();
      setRecetas([]);
    }
  };

  return (
    <div className="recetas-cocinadas-container">
      <h1 className="titulo-emocional">🍾 Tus Recetas Cocinadas 🍾</h1>
      <p className="resumen-metrica">
        ¡Has cocinado <strong>{recetas.length}</strong> recetas!
        Cada una es parte de tu viaje interior. ✨
      </p>

      {recetas.length > 0 && (
        <button onClick={handleLimpiar} className="btn-limpiar">
          🗑️ Limpiar historial
        </button>
      )}

      <div className="grid-recetas">
        {recetas.map((receta) => (
          <div className="recipe-card" key={receta.id}>
            <div className="ribbon">✅ Cocinada</div>
            {receta.imagen ? (
              <img
                src={
                  receta.imagen.startsWith("http")
                    ? receta.imagen
                    : `/img/${receta.imagen}`
                }
                alt={receta.titulo}
              />
            ) : (
              <div className="imagen-vacia">
                <p>🍲 ¡Aún no subes tu creación!</p>
                <small>Hazlo para inspirar a otras 💜</small>
              </div>
            )}
            <h3>{receta.titulo}</h3>
            <span className="etiqueta-cocinada">🏅 Cocinada</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecetasCocinadas;
