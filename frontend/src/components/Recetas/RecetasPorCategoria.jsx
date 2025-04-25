// ✅ src/components/Recetas/RecetasPorCategoria.jsx
import React from "react";
import styles from "./RecetasPorCategoria.module.css";
import { Link } from "react-router-dom";
import TarjetaReceta from "./TarjetaReceta";

// Swiper para vista móvil
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

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

  const esMovil = window.innerWidth <= 768;

  return (
    <article className={styles.container}>
      {/*<header className={styles.header}>
        <h1 className={styles.mainTitle}>Recetas por categoría 🍽</h1>
        <p className={styles.subtitle}>
          Encuentra inspiración según tus antojos o el momento del día.
        </p>
      </header>*/}

      {Object.entries(recipesByCategory).map(([categoria, recetas]) => (
        <section key={categoria} className={styles.categorySection}>
          <Link to={`/coleccion-categoria/${categoria}`} className={styles.categoryTitle}>
            {categoriaIconos[categoria] || categoriaIconos["Otras"]} {categoria}
          </Link>

          {/* Vista móvil: carrusel deslizable con Swiper */}
          {esMovil ? (
            <Swiper
              spaceBetween={15}
              slidesPerView={1.2}
              style={{ padding: "1rem 0" }}
            >
              {recetas.slice(0, 4).map((receta) => (
                <SwiperSlide key={receta.id}>
                  <TarjetaReceta receta={receta} esAdmin={isAdmin} />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            // Vista escritorio: grilla con animaciones y hover
            <div className={styles.grid}>
              {recetas.slice(0, 4).map((receta, index) => (
                <div key={receta.id} style={{ animationDelay: `${index * 0.1}s` }}>
                  <TarjetaReceta receta={receta} esAdmin={isAdmin} />
                </div>
              ))}
            </div>
          )}

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
