// src/components/Mujeres/HeroMujer.jsx
import React from "react";
import "./HeroMujer.css";
import { useNavigate } from "react-router-dom";

const HeroMujer = ({ nombre, cita, ciudad, ocupacion, imagen }) => {
  const navigate = useNavigate();

  return (
    <section className="hero-mujer">
      <div className="hero-left">
        <img src={imagen} alt={`Foto de ${nombre}`} />
      </div>
      <div className="hero-right">
        <h1>{nombre}</h1>
        <p className="cita">“{cita}”</p>
        <p className="info">{ciudad} — {ocupacion}</p>
        <button className="volver-btn" onClick={() => navigate("/mujeres")}>
          ← Volver a Mujeres
        </button>
      </div>
    </section>
  );
};

export default HeroMujer;
