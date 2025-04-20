import React, { useEffect, useState } from "react";
import "./HeroTienda.css"; // ✅ Asegúrate que esté bien escrita la ruta y nombre

const slides = [
  {
    image: "/images/hero-1.jpeg",
    title: "Elige productos que reflejan tu esencia",
    text: "Diseños creados para mujeres reales que inspiran.",
    button: "Comprar ahora"
  },
  {
    image: "/images/hero-2.jpeg",
    title: "Arte que transforma",
    text: "Cada detalle cuenta. Vive el estilo Soy Arte.",
    button: "Descubrir más"
  },
  {
    image: "/images/hero-3.jpeg",
    title: "Expresa tu belleza única",
    text: "Piezas pensadas para empoderarte y brillar.",
    button: "Explora la colección"
  }
];

function HeroTienda() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero-tienda-section">
      <div className="carousel-container">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`carousel-slide ${index === currentSlide ? "active" : ""}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="carousel-text">
              <h2>{slide.title}</h2>
              <p>{slide.text}</p>
              <button>{slide.button}</button>
            </div>
          </div>
        ))}
        <div className="carousel-dots">
          {slides.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentSlide ? "active" : ""}`}
              onClick={() => setCurrentSlide(index)}
            ></span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HeroTienda;
