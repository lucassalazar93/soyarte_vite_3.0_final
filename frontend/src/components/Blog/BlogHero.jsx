// src/components/Blog/BlogHero.jsx

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./BlogHero.css"; // Estilos que vas a actualizar también

const BlogHero = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section className="blog-hero-section">
      <div className="blog-hero-content">
        <h1 className="blog-hero-title" data-aos="zoom-in">
          🌸 Blog & Tips
        </h1>
        <p className="blog-hero-subtitle" data-aos="fade-up" data-aos-delay="300">
          Artículos con alma, escritos para inspirarte, reconectarte y cuidarte 💗
        </p>
      </div>
    </section>
  );
};

export default BlogHero;
