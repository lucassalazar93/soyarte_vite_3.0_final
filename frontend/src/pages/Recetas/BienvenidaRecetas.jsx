// ✅ src/pages/Recetas/BienvenidaRecetas.jsx
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./BienvenidaRecetas.css";

// ✅ Secciones del viaje culinario
import SeccionEntradas from "../../components/Recetas/SeccionEntradas";
import SeccionPlatosFuertes from "../../components/Recetas/SeccionPlatosFuertes";
import SeccionPostres from "../../components/Recetas/SeccionPostres";
import SeccionBrindis from "../../components/Recetas/SeccionBrindis";
import SeccionDespedida from "../../components/Recetas/SeccionDespedida"; // 🌟 Importación del cierre emocional

const BienvenidaRecetas = () => {
  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
  }, []);

  // 👉 Scroll suave hacia el primer capítulo
  const irAlCapituloUno = () => {
    const seccion = document.getElementById("capitulo-1");
    if (seccion) {
      seccion.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* 🌸 Bienvenida inicial */}
      <section className="bienvenida-container">
        <div className="hero-bienvenida" data-aos="fade-up">
          <h1>
            Bienvenida al Recetario de <em>Soy Arte</em>
          </h1>
          <p>
            En cada cocina habita una historia. En cada receta, un susurro del alma.
            En <strong>Soy Arte</strong>, la cocina no es solo un espacio para alimentar el cuerpo,
            sino un refugio donde sanamos, recordamos y creamos memorias que nos abrazan.
          </p>
          <p>
            Por eso, hemos dividido este viaje culinario en cuatro momentos, como los capítulos
            de un relato que se cocina lento, con intención, con emoción.
          </p>
          <button className="btn-viaje" onClick={irAlCapituloUno}>
            Comenzar el viaje 🍽️
          </button>
        </div>
      </section>

      {/* 📖 Capítulos de la historia */}
      <SeccionEntradas />         {/* 💜 Capítulo 1 – Entradas */}
      <SeccionPlatosFuertes />    {/* 💜 Capítulo 2 – Fuertes */}
      <SeccionPostres />          {/* 💜 Capítulo 3 – Postres */}
      <SeccionBrindis />          {/* 💜 Capítulo 4 – Brindis */}

      {/* 🌙 Cierre emocional */}
      <SeccionDespedida />        {/* 💌 Despedida simbólica */}
    </>
  );
};

export default BienvenidaRecetas;
