// ✅ src/components/Carrito/Recomendados.jsx
import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { CarritoContext } from "../../context/CarritoContext";
import BASE_URL from "../../BASE_URL";
import "./recomendados.css";

function Recomendados() {
  const [productos, setProductos] = useState([]);
  const { agregarAlCarrito } = useContext(CarritoContext);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/productos`)
      .then((res) => setProductos(res.data))
      .catch((err) => console.error("❌ Error al cargar recomendados:", err));
  }, []);

  return (
    <div className="recomendados-contenedor">
      <h3 className="recomendados-titulo">👀 No Te Vayas Sin Ver Esto...💝</h3>

      <div className="recomendados-slider">
        {productos.slice(0, 4).map((prod) => {
          const precioUnitario = prod.oferta === 1 ? prod.precio_oferta : prod.precio;
          const precioSeguro = parseFloat(precioUnitario) || 0;

          return (
            <div key={prod.product_id} className="recomendado-card">
              <span className="badge">{prod.oferta === 1 ? "En oferta" : "Nuevo"}</span>
              <Link to={`/producto/${prod.product_id}`}>
                <img
                  src={`${BASE_URL}${prod.imagen}`}
                  alt={prod.nombre}
                  onError={(e) => (e.target.src = "/img/default.jpg")}
                />
              </Link>
              <p className="nombre">{prod.nombre}</p>
              <div className="estrellas">⭐⭐⭐⭐☆</div>
              <p className="precio">
                ${precioSeguro.toLocaleString("es-CO")} COP
              </p>
              <button
                className="btn-recomendado"
                title="Haz clic para agregar este producto al carrito"
                onClick={() => agregarAlCarrito(prod)}
              >
                Agregar al carrito
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Recomendados;
