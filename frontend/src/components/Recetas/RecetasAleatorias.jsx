import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaRandom } from "react-icons/fa";
import "./RecetasAleatorias.css";

const RecetasAleatorias = () => {
  const [recetas, setRecetas] = useState([]);
  const [recetasAleatorias, setRecetasAleatorias] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/recetas")
      .then((res) => res.json())
      .then((data) => {
        setRecetas(data);
        seleccionarAleatorias(data);
      })
      .catch((err) => console.error("Error al cargar recetas:", err));
  }, []);

  const seleccionarAleatorias = (lista) => {
    const mezcladas = [...lista].sort(() => 0.5 - Math.random());
    const seleccionadas = mezcladas.slice(0, 4);
    setRecetasAleatorias(seleccionadas);
  };

  const recargar = () => seleccionarAleatorias(recetas);

  return (
    <section className="recetas-aleatorias">
      <h2>✨ Sigue tu viaje como chef</h2>
      <p>Cada receta es una nueva aventura. ¿Con cuál te animas ahora?</p>

      <div className="galeria-recetas">
        {recetasAleatorias.length === 0 ? (
          <p className="cargando">Cargando recetas deliciosas...</p>
        ) : (
          recetasAleatorias.map((receta) => (
            <div key={receta.id} className="tarjeta-receta">
              <img
                src={`http://localhost:5000${receta.imagen}`}
                alt={receta.titulo}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/img/default.jpg";
                }}
              />
              <h4>{receta.titulo}</h4>
              <p className="meta">
                ⏱️ {receta.tiempo_preparacion} min · ⭐ {receta.calificacion}/5
              </p>
              <Link to={`/recetas/${receta.id}`} className="btn-ver">
                Ver receta
              </Link>
            </div>
          ))
        )}
      </div>

      <div className="acciones">
        <button className="btn-recargar" onClick={recargar}>
          <FaRandom /> Mostrar otras recetas
        </button>
      </div>
    </section>
  );
};

export default RecetasAleatorias;
