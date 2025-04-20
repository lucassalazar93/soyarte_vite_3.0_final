import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./BlogPreview.css";

const blogPosts = [
  {
    id: 1,
    title: "Tips para reconectar con tu niña interior",
    summary: "Explora ejercicios simples y poderosos para sanar desde el amor propio.",
    image: "/images/niña-interior.png",
    link: "#"
  },
  {
    id: 2,
    title: "Receta terapéutica: Galletas de avena con amor",
    summary: "Una receta sencilla para disfrutar el presente mientras horneas.",
    image: "/images/galletas-de-avena.png",
    link: "#"
  },
  {
    id: 3,
    title: "5 ideas para rituales de autocuidado",
    summary: "Crea momentos solo para ti, en conexión contigo misma.",
    image: "/images/rituales-autocuidado.png",
    link: "#"
  }
];

const BlogPreview = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section className="blog-preview-section">
      <div className="blog-hero" data-aos="fade-up">
        <h2>🌸 <span className="blog-title">Blog & Tips</span></h2>
        <p className="blog-subtitle">
          Artículos con alma, escritos para inspirarte, reconectarte y cuidarte 💗
        </p>
      </div>

      <div className="blog-cards">
        {blogPosts.map(post => (
          <div className="blog-card" key={post.id} data-aos="fade-up">
            <img src={post.image} alt={post.title} />
            <div className="blog-card-content">
              <h3>{post.title}</h3>
              <p>{post.summary}</p>
              <a href={post.link} className="read-more">Leer más</a>
            </div>
          </div>
        ))}
      </div>

      <div className="ver-todo" data-aos="fade-up">
        <a href="/" className="ver-todo-btn">Volver al inicio</a>
      </div>
    </section>
  );
};

export default BlogPreview;
