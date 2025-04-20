import React, { useEffect, useRef } from "react";
import { FaHeart } from "react-icons/fa";
import "./VideoSection.css";

const VideoSection = () => {
  const sectionRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section ref={sectionRef} className="video-section">
      <div className="video-flex-wrapper">

        {/* 🎞️ Video con marco */}
        <div className="video-box">
          <video controls>
            <source src="/videos/histotria-soy-arte.mp4" />
            Tu navegador no soporta la etiqueta de video.
          </video>
        </div>

        {/* 💬 Texto lateral */}
        <div className="video-text-box">
          <h2>🌸 Conoce más sobre <span className="video-title">Soy Arte</span></h2>
          <p>
            Soy Arte nace desde mi propia historia: una infancia marcada por la ausencia, el maltrato y la soledad,
             que con los años me llevó a enfrentar un diagnóstico de ansiedad y depresión. En la búsqueda de sanación,
              fue en la cocina donde encontré un refugio, un lugar donde mi mente podía descansar y mi alma reconectarse.
               Así nació la Terapia Culinaria, y más tarde, esta plataforma. Soy Arte es un espacio para mujeres reales,
                valientes, sensibles y fuertes. Aquí celebramos la magia de ser mujer, compartimos experiencias, emprendimientos,
                 productos pensados para el bienestar y, sobre todo, construimos una comunidad donde sanar también es posible.
          </p>
          <a href="#blog" className="video-button">
            <FaHeart style={{ marginRight: "8px" }} />
            Ir al blog
          </a>
        </div>

      </div>
    </section>
  );
};

export default VideoSection;
