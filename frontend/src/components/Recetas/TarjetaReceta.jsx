// src/components/Recetas/TarjetaReceta.jsx
import React, { useState, useEffect } from "react";
import "./TarjetaReceta.css";

const TarjetaReceta = ({ receta, esAdmin }) => {
  const [desbloqueada, setDesbloqueada] = useState(false);
  const [guardada, setGuardada] = useState(false);

  const bloqueada = receta.bloqueada && !esAdmin && !desbloqueada;

  // Leer recetas guardadas desde localStorage
  useEffect(() => {
    const guardadas = JSON.parse(localStorage.getItem("recetasGuardadas")) || [];
    setGuardada(guardadas.includes(receta.id));
  }, [receta.id]);

  // Alternar guardado
  const toggleGuardar = () => {
    const guardadas = JSON.parse(localStorage.getItem("recetasGuardadas")) || [];
    let nuevas;

    if (guardadas.includes(receta.id)) {
      nuevas = guardadas.filter(id => id !== receta.id);
      setGuardada(false);
    } else {
      nuevas = [...guardadas, receta.id];
      setGuardada(true);
    }

    localStorage.setItem("recetasGuardadas", JSON.stringify(nuevas));
  };

  return (
    <div className={`card-receta ${bloqueada ? "blur" : ""}`}>
      {/* 💖 Ribbon si es favorita */}
      {receta.favorita && (
        <div className="ribbon">💖 Favorita</div>
      )}

      {/* 🔒 Overlay si está bloqueada */}
      {bloqueada && (
        <div className="overlay-bloqueada">
          <span className="icono-candado">🔒</span>
          <button onClick={() => setDesbloqueada(true)}>Desbloquear</button>
        </div>
      )}

      {/* 💎 Badge premium */}
      {receta.es_paga && !bloqueada && (
        <span className="badge-premium">💎 Premium</span>
      )}

      {/* 📸 Imagen */}
      <img
        src={`http://localhost:5000${receta.image}`}
        alt={receta.titulo}
        className="imagen-receta"
        onError={(e) => (e.target.src = "/img/default.jpg")}
      />

      {/* 🎬 Video si existe */}
      {(receta.video || receta.youtube_link) && (
        <div className="video-icon">🎬</div>
      )}

      {/* 💡 Contenido */}
      <div className="contenido">
        <h3 className="titulo">{receta.titulo}</h3>
        <p className="descripcion">{receta.descripcion || "Una receta deliciosa y fácil de preparar."}</p>

        <ul className="detalles">
          <li>👩‍🍳 <strong>Autor:</strong> {receta.autor || "Anónimo"}</li>
          <li>⏱️ <strong>Tiempo:</strong> {receta.tiempo_preparacion || "0"} min</li>
          <li>📄 <strong>Dificultad:</strong> {receta.nivel_dificultad || "-"}</li>
          <li>⭐ <strong>Calificación:</strong> {receta.calificacion || 0} / 5</li>
        </ul>

        <div className="acciones-receta">
          {!bloqueada && (
            <a href={`/recetas/${receta.id}`} className="boton">🍽️ Ver receta</a>
          )}

          <button
            className={`guardar-btn ${guardada ? "guardada" : ""}`}
            onClick={toggleGuardar}
          >
            {guardada ? "💚 Guardada" : "❤️ Guardar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TarjetaReceta;
