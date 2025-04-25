// src/components/Recetas/SeccionBrindis.jsx
import React from "react";
import "./SeccionBrindis.css";
import brindisImg from "/images/capitulo4.jpeg"; // Usa la imagen que subiste

const SeccionBrindis = () => {
  const irABrindis = () => {
    const destino = document.getElementById("recetas-bebidas");
    if (destino) {
      destino.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="seccion-capitulo bg-alterno" id="capitulo-4">
      <div className="capitulo-contenido" data-aos="fade-up"> {/* 🔁 sin "invertido" */}
        <div className="imagen">
          <img src={brindisImg} alt="Bebidas y Cócteles - El brindis final" />
        </div>

        <div className="texto">
          <h2>
            Bebidas y Cócteles <br />
            <span className="subtitulo-suspiro">El brindis final</span>
          </h2>
          <p>
            Y como todo ritual, cerramos con un brindis.{" "}
            <span className="frase-destacada">Infusiones para sanar</span>, bebidas para compartir,
            cócteles para celebrar. Este momento es <em>libertad</em>, es{" "}
            <strong>conversación</strong>, es inspiración líquida.{" "}
            <span className="frase-destacada">Aquí todo fluye… y seguimos soñando.</span>
          </p>
          <button className="btn-ir-seccion" onClick={irABrindis}>
            Brindemos 🥂
          </button>
        </div>
      </div>
    </section>
  );
};

export default SeccionBrindis;
