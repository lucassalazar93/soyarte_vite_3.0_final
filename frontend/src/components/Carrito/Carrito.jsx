// src/components/Carrito/Carrito.jsx
import React, { useContext, useState } from "react";
import { CarritoContext } from "../../context/CarritoContext";
import { useNavigate } from "react-router-dom";
import Recomendados from "./Recomendados";
import BASE_URL from "../../BASE_URL";
import "./carrito.css";

const Carrito = () => {
  const {
    carrito,
    agregarAlCarrito,
    disminuirCantidad,
    eliminarDelCarrito,
    vaciarCarrito,
    totalCarrito,
  } = useContext(CarritoContext);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAction = async (action) => {
    setLoading(true);
    try {
      await action();
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const irAFormularioCheckout = () => {
    navigate("/checkout");
  };

  const irATienda = () => {
    navigate("/tienda");
  };

  return (
    <div className="carrito-page">
      {/* 🎀 Hero emocional */}
      <section className="hero-carrito">
        <h1>🛍️ Mi Carrito</h1>
        <p>✨ Estás a un paso de llevar arte contigo</p>
      </section>

      {/* 🧺 Productos */}
      <section className="productos-carrito">
        {carrito.length === 0 ? (
          <div className="empty-carrito">
            <img src="/img/sad-bag.png" alt="Bolsa vacía" />
            <p>Tu carrito está esperando por una chispa de magia ✨</p>
            <button className="descubre-btn" onClick={irATienda}>
              Ir a descubrir productos
            </button>
          </div>
        ) : (
          carrito.map((item) => {
            const precioUnitario =
              item.oferta === 1 ? item.precio_oferta : item.precio;
            const precioSeguro = parseFloat(precioUnitario) || 0;

            return (
              <div className="card-producto" key={item.product_id}>
                <div className="carrito-img-container">
                  <img
                    src={`${BASE_URL}${item.imagen}`}
                    alt={item.nombre}
                    className="img-carrito-producto"
                    onError={(e) => (e.target.src = "/img/default.jpg")}
                  />
                </div>
                <h2>{item.nombre}</h2>
                <p className="descripcion">¡Más amor, más arte! Agrega otra unidad 💜</p>
                <p className="precio">
                  Precio unitario: <span>${precioSeguro.toLocaleString("es-CO")}</span>
                </p>
                <div className="acciones">
                  <button
                    onClick={() => disminuirCantidad(item.product_id)}
                    disabled={item.cantidad <= 1}
                  >
                    -
                  </button>
                  <span>{item.cantidad}</span>
                  <button onClick={() => agregarAlCarrito(item)}>+</button>
                  <button
                    className="trash"
                    onClick={() => eliminarDelCarrito(item.product_id)}
                  >
                    🗑️
                  </button>
                </div>
                <p className="total">
                  Total: ${(precioSeguro * item.cantidad).toLocaleString("es-CO")} COP
                </p>
              </div>
            );
          })
        )}
      </section>

      {/* 🧾 Resumen de compra */}
      {carrito.length > 0 && (
        <section className="checkout-info">
          <h2>Total: <span>${totalCarrito.toLocaleString("es-CO")} COP</span></h2>
          <ul>
            <li>🚚 Envío gratis desde $100.000</li>
            <li>🔐 Pago seguro y cifrado</li>
            <li>🎁 Empaque con amor</li>
          </ul>
          <div className="acciones-checkout">
            <button
              className="btn-vaciar"
              onClick={() => handleAction(vaciarCarrito)}
              disabled={loading}
            >
              {loading ? "Cargando..." : "Vaciar carrito"}
            </button>
            <button className="btn-finalizar" onClick={irAFormularioCheckout}>
              Finalizar compra
            </button>
          </div>
        </section>
      )}

      {/* 💖 Recomendaciones */}
      <section className="recomendados">
        <Recomendados />
      </section>
    </div>
  );
};

export default Carrito;
