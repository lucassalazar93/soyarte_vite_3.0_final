// src/components/Tienda/CategoriasDestacadas.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CategoriasDestacadas.css";

function CategoriasDestacadas() {
  const [grupos, setGrupos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/grupos") // Asegúrate que esta ruta devuelve { nombre, slug, emoji, banner_url }
      .then((res) => setGrupos(res.data))
      .catch((err) => console.error("❌ Error al cargar grupos:", err));
  }, []);

  const handleClickCategoria = (slug) => {
    if (slug) {
      navigate(`/coleccion/${slug}`);
    }
  };

  return (
    <section className="categorias-diosas">
      <h2>🌸 Explora por categoría</h2>
      <div className="carousel-categorias">
        {grupos.map((grupo, index) => (
          <div
            key={grupo.grupo_id || index}
            className="categoria-btn"
            onClick={() => handleClickCategoria(grupo.slug)}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="circle-img">
              <img
                src={grupo.banner_url || "/images/default-circle.jpg"}
                alt={grupo.nombre}
              />
            </div>
            <span>
              {grupo.emoji || "✨"} {grupo.nombre}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CategoriasDestacadas;
