// src/components/Blog/GaleriaEntradas.jsx

import React from "react";
import { Link } from "react-router-dom";
import BASE_URL from "../../../BASE_URL";
import "./GaleriaEntradas.css";

const GaleriaEntradas = ({ entradas }) => {
  if (!entradas || entradas.length === 0) {
    return (
      <section className="galeria-entradas">
        <h2 className="titulo-galeria">📝 Todos los artículos del blog</h2>
        <p className="mensaje-vacio">No hay artículos disponibles por ahora.</p>
      </section>
    );
  }

  return (
    <section className="galeria-entradas">
      <h2 className="titulo-galeria">📝 Todos los artículos del blog</h2>

      <div className="contenedor-tarjetas">
        {entradas.map((entrada) => (
          <div className="tarjeta-entrada" key={entrada.post_id} data-aos="fade-up">
            
            {/* Badge de categoría */}
            <div className="categoria-badge">
              {entrada.categoria || "Reflexión"}
            </div>

            {/* Imagen del artículo */}
            <img
              src={entrada.imagen ? `${BASE_URL}${entrada.imagen}` : "/images/blog/default-blog.jpg"}
              alt={entrada.titulo || "Artículo de blog"}
              className="imagen-tarjeta"
              onError={(e) => (e.target.src = "/images/blog/default-blog.jpg")}
            />

            {/* Contenido de la tarjeta */}
            <div className="contenido-tarjeta">
              <h3 className="titulo-tarjeta">🌸 {entrada.titulo}</h3>

              <p className="resumen-tarjeta">
                {entrada.resumen
                  ? entrada.resumen.length > 100
                    ? `${entrada.resumen.slice(0, 100)}...`
                    : entrada.resumen
                  : "Sin resumen disponible."}
              </p>

              <Link to={`/blog/${entrada.slug}`} className="boton-leer-mas">
                Leer más →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default GaleriaEntradas;
