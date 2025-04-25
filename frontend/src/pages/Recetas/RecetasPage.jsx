import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RecetaDestacada from "../../components/Recetas/RecetaDestacada";
import RecetasPorCategoria from "../../components/Recetas/RecetasPorCategoria";
import "./RecetasPage.css";

const RecetasPage = () => {
  const [recetas, setRecetas] = useState([]);
  const [recetasFiltradas, setRecetasFiltradas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // 🧠 Cargar recetas desde backend
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

  // 🧁 Agrupar recetas por categoría
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

  return (
    <div className="recetas-page">
      {/* 📌 Receta destacada */}
      <section className="recetas-destacadas">
        {loading && <p className="cargando">Cargando recetas...</p>}
        {error && <p className="error">{error}</p>}
        {!loading && !error && <RecetaDestacada recetas={recetas} />}
      </section>

      {/* 📚 Recetas agrupadas por categoría */}
      {!loading && !error && (
        <section className="super-delicias">
          <RecetasPorCategoria
            recipesByCategory={agruparPorCategoria(recetasFiltradas)}
            isAdmin={false}
          />
        </section>
      )}
    </div>
  );
};

export default RecetasPage;
