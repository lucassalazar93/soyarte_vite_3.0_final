// src/components/Recetas/RecetasPorCategoria.jsx
import React from "react";
import styles from "./RecetasPorCategoria.module.css";
import { Link } from "react-router-dom";
import TarjetaReceta from "./TarjetaReceta"; // ✅ Nuevo

const categoriaIconos = {
  Postres: "🍰",
  Pastas: "🍝",
  Carnes: "🥩",
  Sopas: "🥣",
  Ensaladas: "🥗",
  Panes: "🥐",
  Bebidas: "🍹",
  Americana: "🍔",
  Mexicana: "🌮",
  Italiana: "🍕",
  Japonesa: "🍣",
  Desayuno: "🥞",
  Otras: "🍽️",
};

function RecetasPorCategoria({ recipesByCategory, isAdmin = false }) {
  if (!recipesByCategory || typeof recipesByCategory !== "object") return null;

  return (
    <article className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.mainTitle}>Recetas por categoría 🍽</h1>
        <p className={styles.subtitle}>
          Encuentra inspiración según tus antojos o el momento del día.
        </p>
      </header>

      {Object.entries(recipesByCategory).map(([categoria, recetas]) => (
        <section key={categoria} id={categoria.toLowerCase()} className={styles.categorySection}>
          <Link to={`/coleccion-categoria/${categoria}`} className={styles.categoryTitle}>
            {categoriaIconos[categoria] || categoriaIconos["Otras"]} {categoria}
          </Link>

          <div className={styles.grid}>
            {recetas.slice(0, 4).map((receta) => (
              <TarjetaReceta key={receta.id} receta={receta} esAdmin={isAdmin} />
            ))}
          </div>

          {recetas.length > 4 && (
            <div className={styles.verMasWrapper}>
              <Link to={`/coleccion-categoria/${categoria}`} className={styles.verMasButton}>
                👀 Ver más recetas de {categoria}
              </Link>
            </div>
          )}
        </section>
      ))}
    </article>
  );
}

export default RecetasPorCategoria;
