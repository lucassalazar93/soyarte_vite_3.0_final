import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./ColeccionCategoria.css";

const ColeccionCategoria = () => {
  const { nombre } = useParams();
  const [recetas, setRecetas] = useState([]);
  const [loading, setLoading] = useState(true);

  // Función para normalizar texto (sin tildes, lowercase)
  const normalizarTexto = (str) =>
    str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

  useEffect(() => {
    fetch("http://localhost:5000/api/recetas")
      .then((res) => res.json())
      .then((data) => {
        const filtradas = data.filter((rec) => {
          if (!rec.categoria_nombre || !nombre) return false;
          return (
            normalizarTexto(rec.categoria_nombre) ===
            normalizarTexto(nombre)
          );
        });
        setRecetas(filtradas);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Error cargando recetas por categoría:", err);
        setLoading(false);
      });
  }, [nombre]);

  return (
    <div className="coleccion-categoria-page">
      <h1 className="titulo-categoria">🍴 Recetas de {nombre}</h1>

      {loading ? (
        <p className="mensaje-cargando">Cargando recetas...</p>
      ) : recetas.length === 0 ? (
        <p className="mensaje-vacio">
          No hay recetas disponibles en esta categoría.
        </p>
      ) : (
        <div className="grid-recetas">
          {recetas.map((receta) => (
            <div key={receta.id} className="receta-card">
              <img
                src={`http://localhost:5000${receta.imagen}`}
                alt={receta.titulo}
                className="receta-img"
                onError={(e) => (e.target.src = "/img/default.jpg")}
              />
              <h3>{receta.titulo}</h3>
              <p>{receta.descripcion}</p>
              <Link to={`/recetas/${receta.id}`} className="btn-ver-receta">
                Ver receta
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ColeccionCategoria;
