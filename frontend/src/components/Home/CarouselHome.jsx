import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./CarouselHome.css";

const images = [
  { src: "/images/mujersoyarte1.webp", text: "Descubre las últimas tendencias", button: "Explorar", link: "/tendencias" },
  { src: "/images/plato3.jpeg", text: "Nuevas recetas cada semana", button: "Ver recetas", link: "/recetas" },
  { src: "/images/comunidad.jpeg", text: "Conéctate con nuestra comunidad", button: "Unirme", link: "/comunidad" },
  { src: "/images/terapiaCulinaria.jpeg", text: "La mejor Terapia Culinaria", button: "Conocer", link: "/terapia-culinaria" },
  { src: "/images/productossoyarte.jpeg", text: "Compra productos exclusivos", button: "Ir a la tienda", link: "/tienda" },
];

const CarouselHome = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // 🔄 Cambia la imagen cada 5 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="carousel-home">
      {images.map((img, index) => (
        <div key={index} className={`carousel-slide ${index === currentIndex ? "active" : ""}`}>
          <img src={img.src} alt={`Slide ${index + 1}`} />
          <div className="carousel-text">
            <h2>{img.text}</h2>
            <Link to={img.link} className="carousel-button">
              {img.button}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CarouselHome;
