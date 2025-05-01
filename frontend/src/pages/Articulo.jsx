// src/pages/Articulo.jsx

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

import ArticuloIzquierda from "../components/Blog/Articulo/ArticuloIzquierda";
import ArticuloDerecha from "../components/Blog/Articulo/ArticuloDerecha";
import Footer from "../components/Footer/Footer";

import FraseInspiradora from "../components/Blog/Articulo/FraseInspiradora";
import BotonVolverBlog from "../components/Blog/Articulo/BotonVolverBlog";
import ComentariosBlog from "../components/Blog/Articulo/ComentariosBlog";
import ArticulosRelacionados from "../components/Blog/Articulo/ArticulosRelacionados";

import BASE_URL from "../BASE_URL";
import "./Articulo.css";

const Articulo = () => {
  const { slug } = useParams();
  const [articulo, setArticulo] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    window.scrollTo(0, 0);
    cargarArticulo();
  }, [slug]);

  const cargarArticulo = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/blog/slug/${slug}`);
      if (!res.ok) throw new Error("Artículo no encontrado");
      const data = await res.json();

      const articuloNormalizado = {
        id: data.post_id,
        titulo: data.titulo,
        resumen: data.resumen,
        pregunta: data.pregunta,
        contenido: data.contenido,
        imagen: data.imagen,
        audio_url: data.audio_url,
        musica_url: data.musica_url,
        youtube_embed: data.youtube_embed,
        fechaCreacion: data.fecha_creacion,
        autorHistoria: `Soy Arte nace desde mi propia historia: una infancia marcada por la ausencia, el maltrato y la soledad, que con los años me llevó a enfrentar un diagnóstico de ansiedad y depresión.`,
        mini_historias: normalizarCampo(data.mini_historia),
        reflexiones: normalizarCampo(data.reflexion),
      };

      setArticulo(articuloNormalizado);
      setError(false);
    } catch (error) {
      console.error("❌ Error al cargar artículo:", error);
      setError(true);
    } finally {
      setCargando(false);
    }
  };

  const normalizarCampo = (campo) => {
    if (!campo) return [];
    if (Array.isArray(campo)) return campo;
    try {
      const parsed = JSON.parse(campo);
      return Array.isArray(parsed) ? parsed : [parsed];
    } catch (e) {
      return [campo];
    }
  };

  if (cargando) {
    return (
      <div className="articulo-cargando">
        <h2>⏳ Cargando artículo...</h2>
      </div>
    );
  }

  if (error || !articulo) {
    return (
      <div className="articulo-no-encontrado">
        <h2>😢 Artículo no encontrado</h2>
        <Link to="/blog" className="volver-blog">← Volver al Blog</Link>
      </div>
    );
  }

  return (
    <>
      <section className="articulo-section">
        <div className="articulo-contenido">
          {/* IZQUIERDA */}
          <ArticuloIzquierda articulo={articulo}>
            {/* 🌸 Frase Inspiradora debe ir dentro de ArticuloIzquierda */}
            <FraseInspiradora />
          </ArticuloIzquierda>

          {/* DERECHA */}
          <ArticuloDerecha articulo={articulo} blogPosts={[]} />
        </div>

        {/* 💬 Comentarios */}
        <ComentariosBlog />


        {/* 💌 Carta desde mi cocina */}
        <section className="carta-final" data-aos="fade-up">
          <h3>💌 Carta desde mi corazón</h3>
          <p>
            Gracias por llegar hasta aquí. Esta no es solo una receta o una historia, es un susurro desde una cocina que también ha llorado, sanado y renacido.
          </p>
          <p>
            Ser mujer no es solo dar vida —es transformar el dolor en arte, el silencio en fuerza, y cada comida en un acto de amor. Aquí, entre aromas y recuerdos, aprendí que lo que nos quiebra también nos moldea.
          </p>
          <p>
            Que esta lectura abrace tu historia. Que encuentres en cada silencio un espacio seguro, y en cada plato un pedacito de ti misma. Porque sanar también se cocina.
          </p>
          <p>
            Si alguna palabra aquí te tocó, llévala contigo. Y si puedes, compártela: quizás sane a alguien más.
          </p>
          <p><strong>Desde mi cocina al alma tuya, con todo mi amor:</strong></p>
          <p className="firma-nore">Nore ✨</p>
        </section>

        {/* 📚 Artículos Relacionados */}
        <ArticulosRelacionados />


      </section>

      {/* Footer global */}
      <Footer />
    </>
  );
};

export default Articulo;
