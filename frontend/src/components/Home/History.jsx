import React from "react";
import "./History.css";

const History = () => {
  return (
    <section className="history-section full-width">
      <div className="history-content">
        <div className="history-text">
          <h2>🌸 <span className="highlight-title">Nuestra Historia</span></h2>
          <p>
            'Soy Arte' nació como un espacio de expresión, sanación y empoderamiento femenino. 
            Fue creado con la visión de brindar una comunidad segura donde cada mujer pueda reconectarse con su esencia,
            compartir experiencias y fortalecer su bienestar emocional a través del arte, la cocina, el autocuidado y la sororidad.
          </p>
          <p>
            Nuestro propósito es claro: acompañar a cada mujer en su proceso personal, emocional y creativo, ofreciéndole herramientas
            que la conecten con su niña interior, su fuerza y su voz. Somos una comunidad que transforma vidas desde el amor propio.
          </p>
        </div>
        <div className="history-image">
          <img src="/images/historia-soyarte.png" alt="Nuestra historia" />
        </div>
      </div>
    </section>
  );
};

export default History;
