// src/components/Tienda/OfertasDestacadas.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./OfertasDestacadas.css";
import BASE_URL from "../../BASE_URL"; // ✅ Asegúrate que exista este archivo

const OfertasDestacadas = ({ productos }) => {
  const top5 = productos.slice(0, 5); // ✅ Solo los primeros 5

  const obtenerRutaImagen = (ruta) =>
    ruta?.startsWith("/uploads") ? `${BASE_URL}${ruta}` : "/img/default.jpg";

  return (
    <section className="ofertas-home">
      <h2 className="titulo-oferta-home">🔥 Ofertas destacadas 🔥</h2>
      <div className="fila-ofertas">
        {top5.map((prod) => (
          <div key={prod.product_id} className="card-oferta">
            <img
              src={obtenerRutaImagen(prod.imagen)}
              alt={prod.nombre}
              onError={(e) => (e.target.src = "/img/default.jpg")}
            />
            <h4>{prod.nombre}</h4>
            <p className="precio-anterior">
              Antes: ${parseInt(prod.precio).toLocaleString("es-CO")}
            </p>
            <p className="precio-oferta">
              Ahora: ${parseInt(prod.precio_oferta).toLocaleString("es-CO")}
            </p>
            <Link
              to={`/coleccion-oferta/${prod.categoria_nombre || "general"}`}
              className="btn-ver-mas"
            >
              Ver más
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OfertasDestacadas;
