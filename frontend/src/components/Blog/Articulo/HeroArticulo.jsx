// src/components/blog/HeroArticulo.jsx
import React from "react";
import BASE_URL from "../../../BASE_URL";
import "./HeroArticulo.css";

const HeroArticulo = ({ titulo, resumen, imagen }) => {
  // ✅ Asegurar que la URL apunte a /uploads/imagenes-blog/ sin error
  const imagenUrl = imagen?.startsWith("http")
    ? imagen
    : `${BASE_URL}${imagen.startsWith("/uploads") ? imagen : `/uploads/imagenes-blog/${imagen}`}`;

  return (
    <section className="hero-articulo">
      {imagen && (
        <img
          src={imagenUrl}
          alt={titulo}
          className="articulo-imagen"
          onError={(e) => {
            e.target.style.display = "none";
            console.warn("⚠️ Imagen no cargada:", imagenUrl);
          }}
          data-aos="fade-down"
          data-aos-duration="1000"
        />
      )}

      <h1
        className="articulo-titulo"
        data-aos="fade-up"
        data-aos-delay="200"
        data-aos-duration="1000"
      >
        {titulo}
      </h1>

      <p
        className="articulo-introduccion"
        data-aos="fade-up"
        data-aos-delay="400"
        data-aos-duration="1000"
      >
        {resumen}
      </p>
    </section>
  );
};

export default HeroArticulo;
