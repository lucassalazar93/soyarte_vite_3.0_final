import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./CategoriasDestacadas.css";

const CategoriasDestacadas = () => {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/categorias-recetas")
      .then((res) => res.json())
      .then((data) => setCategorias(data))
      .catch((err) => console.error("Error al cargar categorías:", err));
  }, []);

  return (
    <section className="categorias-destacadas">
      <h2>🍽️ Explora por categoría</h2>
      <div className="categorias-grid">
        {categorias.map((cat) => (
          <Link
            key={cat.categoria_id}
            to={`/coleccion-categoria/${cat.nombre}`}
            className="categoria-card"
          >
            <div className="emoji">📂</div>
            <h4>{cat.nombre}</h4>
            <p>{cat.descripcion}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategoriasDestacadas;
