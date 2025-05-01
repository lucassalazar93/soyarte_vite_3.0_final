// src/components/blog/BlogCard.jsx

import React from "react";
import { Link } from "react-router-dom"; // 🛣 Importante para navegar

const BlogCard = ({ post }) => {
  return (
    <div className="tarjeta-blog" data-aos="fade-up">
      {/* Imagen del artículo */}
      {post.image && (
        <img src={post.image} alt={post.title} className="imagen-blog" />
      )}

      {/* Título */}
      <h3 className="titulo-blog">{post.title}</h3>

      {/* Resumen */}
      <p className="resumen-blog">{post.summary}</p>

      {/* Botón de "Leer más" que redirige al slug */}
      <Link to={`/blog/${post.slug}`}>
        <button className="btn-leer-mas">Leer más</button>
      </Link>
    </div>
  );
};

export default BlogCard;
