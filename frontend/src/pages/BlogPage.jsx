// src/pages/BlogPage.jsx

import { useEffect, useState } from "react";
import BlogPreviewSwiper from "../components/Blog/BlogPreview/BlogPreviewSwiper"; // Carrusel de artículos destacados
import GaleriaEntradas from "../components/Blog/GaleriaEntradas/GaleriaEntradas";
import Footer from "../components/Footer/Footer";
import BASE_URL from "../BASE_URL";

const BlogPage = () => {
  const [entradas, setEntradas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const cargarEntradas = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/blog`);
        if (!res.ok) throw new Error("No se pudieron cargar las entradas");

        const data = await res.json();
        setEntradas(data);
        setError(false);
      } catch (error) {
        console.error("❌ Error al cargar entradas:", error);
        setError(true);
      } finally {
        setCargando(false);
      }
    };

    cargarEntradas();
  }, []);

  if (cargando) {
    return (
      <div style={{ textAlign: "center", marginTop: "5rem" }}>
        <h2>⏳ Cargando entradas...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", marginTop: "5rem" }}>
        <h2>😢 Error al cargar el blog</h2>
        <p>Inténtalo más tarde.</p>
      </div>
    );
  }

  return (
    <>
      {/* Carrusel de destacados */}
      <section style={{ marginTop: "2rem", marginBottom: "4rem" }}>
        <BlogPreviewSwiper entradas={entradas} soloDestacado />
      </section>

      {/* Galería de todas las entradas */}
      <GaleriaEntradas entradas={entradas} />

      {/* Footer del sitio */}
      <Footer />
    </>
  );
};

export default BlogPage;
