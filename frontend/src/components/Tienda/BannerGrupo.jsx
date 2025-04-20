import React from "react";
import { Link } from "react-router-dom";
import "./bannerGrupo.css";

const imagenesGrupo = {
  Joyas: "/images/banners/banner-joyas.jpeg",
  Accesorios: "/images/banners/grupo-accesorios.jpg",
  Zapatos: "/images/banners/hero-zapatos.jpeg",
  Adolescentes: "/images/banners/grupo-ado.jpg",
  "Cuidado personal": "/images/banners/grupo-cuidado.jpg",
  default: "/images/banners/banner-generico.jpg",
};

const emojisGrupo = {
  Joyas: "💎",
  Accesorios: "👜",
  Zapatos: "👠",
  Adolescentes: "💃",
  "Cuidado personal": "🧴",
};

const descripciones = {
  Joyas: "Detalles que iluminan tu esencia.",
  Accesorios: "Complementa tu magia con estilo.",
  Zapatos: "Camina con propósito y elegancia.",
  Adolescentes: "Expresa tu brillo con cada prenda.",
  "Cuidado personal": "Tu bienestar también es arte.",
};

const BannerGrupo = ({ grupo }) => {
  const claveGrupo = Object.keys(imagenesGrupo).find(
    key => key.toLowerCase() === grupo.toLowerCase()
  );
  const imagen = imagenesGrupo[claveGrupo] || imagenesGrupo.default;
  const emoji = emojisGrupo[claveGrupo] || "✨";
  const descripcion = descripciones[claveGrupo] || "Explora productos únicos para ti.";

  return (
    <div className="banner-grupo" style={{ backgroundImage: `url(${imagen})` }}>
      <div className="contenido-banner">
        <h1>{emoji} {grupo.toLowerCase()}</h1>
        <p>{descripcion}</p>
        <Link to="/tienda" className="btn-volver-tienda">
          ← Volver a la tienda
        </Link>
      </div>
    </div>
  );
};

export default BannerGrupo;
