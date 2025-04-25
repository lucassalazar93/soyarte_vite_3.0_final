// src/components/Recetas/SeccionPostres.jsx
import React from "react";
import "./SeccionPostres.css";
import postresImg from "/images/capitulo3.jpeg"; // Usa la imagen real subida

const SeccionPostres = () => {
  const irAPostres = () => {
    const destino = document.getElementById("recetas-postres");
    if (destino) {
      destino.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="seccion-capitulo" id="capitulo-3">
      <div className="capitulo-contenido" data-aos="fade-up">
        <div className="texto">
          <h2>
            Postres <br />
            <span className="subtitulo-suspiro">El suspiro dulce de la vida</span>
          </h2>
          <p>
            Después de nutrirnos, también merecemos la dulzura. En esta parte del viaje, celebramos el{" "}
            <span className="frase-destacada">gozo, lo pequeño y encantador</span>. Cada postre es{" "}
            <em>una caricia, una pausa</em>, una forma de decirnos: <strong>“te mereces algo bello”</strong>. Aquí,
            lo emocional se vuelve azúcar, frutas y texturas suaves que reconfortan.
          </p>
          <button className="btn-ir-seccion" onClick={irAPostres}>
            Dulzura para ti 🍰
          </button>
        </div>
        <div className="imagen">
          <img src={postresImg} alt="Postres - Dulzura emocional" />
        </div>
      </div>
    </section>
  );
};

export default SeccionPostres;
