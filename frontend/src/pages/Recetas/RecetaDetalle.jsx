import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  guardarRecetaCocinada,
  obtenerRecetasCocinadas,
} from "../../utils/localStorage";

import "aos/dist/aos.css";
import "./RecetaDetalle.css";

// 🧩 Componentes
import HeroReceta from "../../components/Recetas/HeroReceta";
import AccionesReceta from "../../components/Recetas/AccionesReceta";
import Ingredientes from "../../components/Recetas/Ingredientes";
import Utensilios from "../../components/Recetas/Utensilios";
import PasoAPaso from "../../components/Recetas/PasoAPaso";
import CierreReceta from "../../components/Recetas/CierreReceta";
import RecetasAleatorias from "../../components/Recetas/RecetasAleatorias";

const RecetaDetalle = () => {
  const { id } = useParams();
  const [receta, setReceta] = useState(null);
  const [utensiliosMarcados, setUtensiliosMarcados] = useState(() => {
    const saved = localStorage.getItem("utensiliosMarcados");
    return saved ? JSON.parse(saved) : [];
  });
  const [cocinada, setCocinada] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/api/recetas/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setReceta(data);
        const cocinadas = obtenerRecetasCocinadas();
        const yaEsta = cocinadas.some((r) => r.id === data.id);
        setCocinada(yaEsta);
      })
      .catch((err) => console.error("Error al cargar receta:", err));
  }, [id]);

  useEffect(() => {
    localStorage.setItem("utensiliosMarcados", JSON.stringify(utensiliosMarcados));
  }, [utensiliosMarcados]);

  const toggleUtensilio = (utensilioId) => {
    setUtensiliosMarcados((prev) =>
      prev.includes(utensilioId)
        ? prev.filter((id) => id !== utensilioId)
        : [...prev, utensilioId]
    );
  };

  const marcarTodos = () => {
    if (receta?.utensilios) {
      const todos = receta.utensilios.map((u) => u.id);
      setUtensiliosMarcados(todos);
    }
  };

  const reiniciar = () => setUtensiliosMarcados([]);

  if (!receta) return <p className="loading">Cargando receta...</p>;

  return (
    <div className="receta-detalle-container">
      {/* 🖼️ Hero con imagen y datos principales */}
      <HeroReceta receta={receta} />

      {/* 🧂 Ingredientes + 🍴 Utensilios */}
      <div className="bloque-inferior">
        <Ingredientes ingredientesHTML={receta.ingredientes} />

        {receta.utensilios?.length > 0 && (
          <Utensilios
            utensilios={receta.utensilios}
            marcados={utensiliosMarcados}
            onToggle={toggleUtensilio}
            onMarcarTodos={marcarTodos}
            onReiniciar={reiniciar}
          />
        )}
      </div>

      {/* 🎯 Acciones principales del usuario */}
      <AccionesReceta
        receta={receta}
        cocinada={cocinada}
        setCocinada={setCocinada}
        guardar={guardarRecetaCocinada}
      />

      {/* ✅ Mensaje si ya la cocinó */}
      {cocinada && (
        <p className="mensaje-exito">
          🎉 ¡Bien hecho chef! Esta receta ahora forma parte de tu historial.
        </p>
      )}

      {/* 👣 Paso a paso visual */}
      <PasoAPaso recetaId={receta.id} />

      {/* ⭐ Sección emocional final con calificación y compartir */}
      <CierreReceta />

      {/* 🔄 Recetas relacionadas (aleatorias) */}
      <RecetasAleatorias />
    </div>
  );
};

export default RecetaDetalle;
