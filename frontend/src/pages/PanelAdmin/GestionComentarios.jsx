// src/pages/PanelAdmin/GestionComentarios.jsx

import React, { useEffect, useState } from "react";
import "./GestionComentarios.css";

const GestionComentarios = () => {
  const [comentarios, setComentarios] = useState([]);
  const [filtro, setFiltro] = useState("todos");

  useEffect(() => {
    obtenerComentarios();
  }, []);

  const obtenerComentarios = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/comentarios-blog");
      const data = await res.json();
      setComentarios(data);
    } catch (error) {
      console.error("Error al obtener comentarios:", error);
    }
  };

  const cambiarVisibilidad = async (id, visible) => {
    try {
      await fetch(`http://localhost:5000/api/comentarios-blog/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ visible: !visible }),
      });
      obtenerComentarios();
    } catch (error) {
      console.error("Error al actualizar visibilidad:", error);
    }
  };

  const comentariosFiltrados = comentarios.filter((comentario) => {
    if (filtro === "visibles") return comentario.visible;
    if (filtro === "ocultos") return !comentario.visible;
    return true;
  });

  return (
    <div className="gestion-comentarios">
      <h2>📝 Gestión de Comentarios del Blog</h2>

      <div className="filtros">
        <button className={filtro === "todos" ? "activo" : ""} onClick={() => setFiltro("todos")}>
          Todos
        </button>
        <button className={filtro === "visibles" ? "activo" : ""} onClick={() => setFiltro("visibles")}>
          Visibles
        </button>
        <button className={filtro === "ocultos" ? "activo" : ""} onClick={() => setFiltro("ocultos")}>
          Ocultos
        </button>
      </div>

      {comentariosFiltrados.length === 0 ? (
        <p className="sin-comentarios">No hay comentarios para mostrar.</p>
      ) : (
        <ul className="lista-comentarios-admin">
          {comentariosFiltrados.map((comentario) => (
            <li key={comentario.id} className={comentario.visible ? "visible" : "oculto"}>
              <p className="texto">"{comentario.texto}"</p>
              <div className="info">
                <span>{comentario.fecha}</span>
                <span>⭐ {comentario.calificacion}/5</span>
              </div>
              <button
                className="boton-toggle"
                onClick={() => cambiarVisibilidad(comentario.id, comentario.visible)}
              >
                {comentario.visible ? "Ocultar 👁️" : "Mostrar 👁️‍🗨️"}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GestionComentarios;