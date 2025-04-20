// ✅ src/pages/Recetas/RecetasPage.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Carousel from "../../components/Recetas/Carousel";
import RecetaDestacada from "../../components/Recetas/RecetaDestacada";
import RecetasPorCategoria from "../../components/Recetas/RecetasPorCategoria";
import FiltrosRecetas from "../../components/Recetas/FiltrosRecetas";
import "./RecetasPage.css";

const RecetasPage = () => {
  const [recetas, setRecetas] = useState([]);
  const [recetasFiltradas, setRecetasFiltradas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mostrarRecetario, setMostrarRecetario] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/recetas")
      .then((res) => {
        if (!res.ok) throw new Error("No se pudo cargar las recetas");
        return res.json();
      })
      .then((data) => {
        setRecetas(data);
        setRecetasFiltradas(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("❌ Error cargando recetas:", error);
        setError("Ocurrió un error al cargar las recetas. Intenta más tarde.");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const guardadas = JSON.parse(localStorage.getItem("recetasGuardadas") || "[]");
    setMostrarRecetario(guardadas.length > 0);
  }, [recetas]);

  const agruparPorCategoria = (recetas) => {
    return recetas.reduce((acc, receta) => {
      const categoria = receta.categoria_nombre || "Otras";
      if (!acc[categoria]) acc[categoria] = [];

      acc[categoria].push({
        id: receta.id,
        title: receta.titulo?.trim() || "Sin título",
        image: receta.imagen?.trim() || "/img/default.jpg",
        description: receta.descripcion?.trim() || "Una receta deliciosa y fácil de preparar.",
        time: receta.tiempo_preparacion || 0,
        level: receta.nivel_dificultad || "-",
        author: receta.autor || "Anónimo",
        rating: receta.calificacion || 0,
        favorita: receta.favorita || false,
        video: receta.video || null,
        youtube_link: receta.youtube_link || null,
        bloqueada: receta.bloqueada || false,
        es_paga: receta.es_paga || false,
      });

      return acc;
    }, {});
  };

  const aplicarFiltros = (filtros) => {
    const resultado = recetas.filter((receta) => {
      const coincideNombre = filtros.nombre
        ? receta.titulo.toLowerCase().includes(filtros.nombre.toLowerCase())
        : true;

      const coincideCategoria = filtros.categoria
        ? receta.categoria_nombre === filtros.categoria
        : true;

      const coincideTiempo = filtros.tiempo
        ? filtros.tiempo === "Menos de 15 min"
          ? receta.tiempo_preparacion <= 15
          : filtros.tiempo === "15-30 min"
          ? receta.tiempo_preparacion > 15 && receta.tiempo_preparacion <= 30
          : receta.tiempo_preparacion > 45
        : true;

      const coincideNivel = filtros.nivel
        ? receta.nivel_dificultad === filtros.nivel
        : true;

      const coincideAutor = filtros.autor
        ? (receta.autor || "Anónimo").toLowerCase().includes(filtros.autor.toLowerCase())
        : true;

      return (
        coincideNombre &&
        coincideCategoria &&
        coincideTiempo &&
        coincideNivel &&
        coincideAutor
      );
    });

    setRecetasFiltradas(resultado);
  };

  const sorprenderme = () => {
    if (recetasFiltradas.length > 0) {
      const aleatoria = recetasFiltradas[Math.floor(Math.random() * recetasFiltradas.length)];
      alert(`✨ Prueba esta receta: ${aleatoria.title}`);
    }
  };

  const autores = [...new Set(recetas.map((r) => r.autor || "Anónimo"))];
  const categorias = [...new Set(recetas.map((r) => r.categoria_nombre).filter(Boolean))];

  return (
    <div className="recetas-page">
      {/* ✅ Botón para ver recetario si hay recetas guardadas 
      {mostrarRecetario && (
        <div className="recetario-boton-wrapper">
          <Link to="/mi-recetario" className="boton-recetario">
            💾 Ver mi recetario
          </Link>
        </div>
      )}*/}

      <Carousel />

      <section className="recetas-destacadas">
        <h2 className="seccion-titulo">🍽️ Recetas destacadas</h2>
        {loading && <p className="cargando">Cargando recetas...</p>}
        {error && <p className="error">{error}</p>}
        {!loading && !error && <RecetaDestacada recetas={recetas} />}
      </section>

      {!loading && !error && (
        <>
          <FiltrosRecetas
            onFiltrar={aplicarFiltros}
            autores={autores}
            categorias={categorias}
            onSorprendeme={sorprenderme}
          />

          <section className="super-delicias">
            <h2 className="seccion-titulo">🍱 Explora por categoría</h2>
            <RecetasPorCategoria
              recipesByCategory={agruparPorCategoria(recetasFiltradas)}
              isAdmin={false}
            />
          </section>
        </>
      )}
    </div>
  );
};

export default RecetasPage;
