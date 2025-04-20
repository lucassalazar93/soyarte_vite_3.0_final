import React, { useEffect, useState } from "react";
import TarjetaReceta from "../../components/Recetas/TarjetaReceta";
import "./MiRecetario.css";

const MiRecetario = () => {
  const [recetas, setRecetas] = useState([]);
  const [guardadas, setGuardadas] = useState([]);

  useEffect(() => {
    const idsGuardadas = JSON.parse(localStorage.getItem("recetasGuardadas")) || [];
    setGuardadas(idsGuardadas);

    fetch("http://localhost:5000/api/recetas")
      .then(res => res.json())
      .then(data => {
        const filtradas = data.filter(receta => idsGuardadas.includes(receta.id));
        setRecetas(filtradas);
      })
      .catch(error => console.error("❌ Error al cargar recetas:", error));
  }, []);

  return (
    <div className="mi-recetario">
      <h1>🍳 Mi Recetario</h1>
      <p className="intro">Estas son las recetas que has guardado con amor 💖.</p>

      {recetas.length === 0 ? (
        <p className="vacio">Aún no has guardado ninguna receta. ¡Explora y guarda tus favoritas!</p>
      ) : (
        <div className="grid-recetas">
          {recetas.map(receta => (
            <TarjetaReceta key={receta.id} receta={receta} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MiRecetario;
