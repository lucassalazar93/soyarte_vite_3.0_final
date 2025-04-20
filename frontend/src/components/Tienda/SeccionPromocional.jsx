// src/components/Tienda/SeccionPromocional.jsx
import React, { useState } from "react";
import "./SeccionPromocional.css";
import { Link } from "react-router-dom";
import BASE_URL from "../../BASE_URL"; // ✅ Centraliza ruta si usas imágenes del backend en el futuro

function SeccionPromocional() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <section className="seccion-promocional" data-aos="fade-up">
      <button className="cerrar-promo" onClick={() => setVisible(false)}>✖</button>

      <div className="promo-contenido">
        <div className="promo-texto">
          <h2>Nueva Colección: Soy Fuego 🔥</h2>
          <p className="descripcion">
            Inspirada en la energía femenina que arde.<br />
            Prendas que abrazan tu forma de florecer.
          </p>
          <Link to="/coleccion" className="boton-explorar">
            Ver colección
          </Link>
        </div>

        <div className="promo-imagen">
          <img
            src="/images/soyfuego.jpg"
            alt="Banner de colección Soy Fuego"
            onError={(e) => (e.target.src = "/img/default.jpg")}
          />
        </div>
      </div>
    </section>
  );
}

export default SeccionPromocional;
