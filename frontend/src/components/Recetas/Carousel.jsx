import React, { useState, useEffect } from "react";
import "./Carousel.css";

const images = [
  {
    src: "/images/Brownie.jpeg",
    title: "Un bocado dulce, un momento para ti",
    subtitle: "Brownies, tartas y dulces que reconfortan el alma.",
    link: "/recetas/postres",
    categoria: "postre",
  },
  {
    src: "/images/pasta.jpg",
    title: "Explora el arte de la pasta",
    subtitle: "Platos que acarician el alma con cada bocado.",
    link: "/recetas/pasta",
    categoria: "pasta",
  },
  {
    src: "/images/carne.jpeg",
    title: "Carnes jugosas y llenas de sabor",
    subtitle: "La intensidad de lo hecho en casa con amor.",
    link: "/recetas/carne",
    categoria: "carne",
  },
  {
    src: "/images/sopa.jpeg",
    title: "Sopas calientes para el alma",
    subtitle: "Calor, sabor y hogar en cada cucharada.",
    link: "/recetas/sopa",
    categoria: "sopa",
  },
];

const Carousel = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const { src, title, subtitle, link, categoria } = images[current];

  return (
    <div className="carousel">
      <img
        src={src}
        alt={title}
        className="carousel-image"
        onError={(e) => (e.target.src = "/images/default.jpg")}
      />
      <div className="carousel-overlay">
        <div className="text-background">
          <h2 className="carousel-title">{title}</h2>
          <p className="carousel-subtitle">{subtitle}</p>
          <a href={link} className={`btn-carousel ${categoria}`}>
            Explorar receta
          </a>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
