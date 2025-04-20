import React from "react";
import "./CheckoutGracias.css";
import { Link } from "react-router-dom";

function CheckoutGracias() {
  return (
    <div className="gracias-page">
      <div className="gracias-card">
        {/* 🎉 Encabezado emocional */}
        <h1>🎉 ¡Gracias por tu compra!</h1>
        <p className="gracias-subtitulo">
          Tu pedido fue recibido con amor 💜 y estará en camino muy pronto.
        </p>

        {/* 🌟 Ilustración mágica */}
        <div className="gracias-ilustracion">
          <img
            src="/img/paquete-mistico.png"
            alt="Paquete mágico"
            loading="lazy"
          />
        </div>

        {/* 📦 Detalles del pedido */}
        <div className="gracias-detalles">
          <p>✉️ Te enviamos un correo con los detalles de tu pedido.</p>
          <p>
            📦 Número de orden: <strong>#SOY-ART-57892</strong>
          </p>
        </div>

        {/* 🔗 Botones de navegación */}
        <div className="gracias-botones">
          <Link to="/tienda" className="btn-volver-tienda">
            Seguir explorando productos
          </Link>
          <Link to="/" className="btn-home">
            Ir al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CheckoutGracias;
