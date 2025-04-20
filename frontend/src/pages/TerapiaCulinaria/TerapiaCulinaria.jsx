import React from "react";
import "./TerapiaCulinaria.css";
import Beneficios from "../../components/Terapia/Beneficios";
import RecetasSanadoras from "../../components/Terapia/RecetasSanadoras";
import BeneficiosTerapeuticos from "../../components/Terapia/BeneficiosTerapeuticos";
import VideosTestimonios from "../../components/Terapia/VideosTestimonios";
import BloquesSanadores from "../../components/Terapia/BloquesSanadores";
import HistoriasAlma from "../../components/Terapia/HistoriasAlma";
import DesafioSanador from "../../components/Terapia/DesafioSanador";
import DiarioCulinario from "./DiarioCulinario";
import LlamadoYTest from "../../components/Terapia/LlamadoYTest";








const TerapiaCulinaria = () => {
  return (
    <div>
      {/* 🟣 Hero Principal */}
      <section className="hero-terapia">
        <div className="hero-degradado" />
        <div className="hero-content">
          <h1>🧘‍♀️ Terapia Culinaria</h1>
          <p>Sana desde la raíz, una receta a la vez.</p>
          <a href="#recetas" className="hero-button">
            💜 Comienza tu viaje sanador
          </a>
        </div>
      </section>


      {/* 🌱 Cocinar también es sanar */}
      <section className="sanar-section">
        <div className="sanar-container">
          <div className="sanar-texto">
            <h2>👨‍🍳 Cocinar también es sanar</h2>
            <p>
              La Terapia Culinaria es mucho más que cocinar: es sanar con amor. Es ese momento en la cocina donde las manos se llenan de harina, pero el alma se aligera. Donde cada receta se convierte en una pausa para respirar, sentir y reconectar contigo misma. Cocinar deja de ser una obligación y se transforma en una forma de autocuidado, de canalizar emociones y encontrar paz en medio del caos. Aquí, cada ingrediente tiene un propósito, y cada preparación es una invitación a mirarte con más ternura.
            </p>
            <a href="#recetas" className="sanar-btn">
              🍲 Ver recetas para reconectar conmigo
            </a>
          </div>

          <div className="sanar-img">
            <img src="/img/terapia-culinaria-2.png" alt="Persona cocinando con calma" />
          </div>
        </div>
      </section>

      {/* ✅ Beneficios de cocinar */}
      <Beneficios />

      {/* ✅ Recetas sanadoras dinámicas */}
      <RecetasSanadoras />

      {/* ✅ beneficios  */}
      <BeneficiosTerapeuticos />

      {/* 🌿 Bloques sanadores */}
      <BloquesSanadores />

      {/* ✅ beneficios  */}
      <VideosTestimonios />

      {/* ✅ Historias que nutren el alma */}
      <HistoriasAlma />

      {/* ✅ desafio sanador*/}
      <DesafioSanador />

      {/* ✅ diario culinario */}
      <DiarioCulinario />

      {/* ✅ test y llamado */}
      <LlamadoYTest />

    </div>
  );
};

export default TerapiaCulinaria;
