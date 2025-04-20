// src/components/Carrito/Checkout.jsx
import React, { useContext, useEffect, useState } from "react";
import { CarritoContext } from "../../context/CarritoContext";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../BASE_URL";
import "./checkout.css";

const Checkout = () => {
  const { carrito, totalCarrito, vaciarCarrito } = useContext(CarritoContext);
  const navigate = useNavigate();

  const [datos, setDatos] = useState({
    nombre: "",
    email: "",
    telefono: "",
    direccion: "",
    ciudad: "",
    departamento: "",
    indicaciones: "",
    recordar: false,
    envio: "gratis",
  });

  useEffect(() => {
    const guardados = JSON.parse(localStorage.getItem("checkoutDatos"));
    if (guardados) setDatos({ ...guardados, recordar: true });
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDatos((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const camposRequeridos = ["nombre", "email", "direccion"];
    const incompletos = camposRequeridos.some((campo) => !datos[campo]);

    if (incompletos) {
      alert("⚠️ Por favor completa todos los campos requeridos.");
      return;
    }

    if (datos.recordar) {
      localStorage.setItem("checkoutDatos", JSON.stringify(datos));
    } else {
      localStorage.removeItem("checkoutDatos");
    }

    vaciarCarrito();
    navigate("/checkoutGracias");
  };

  return (
    <div className="checkout-page">
      <div className="checkout-form-container">
        {/* 📋 Formulario Izquierdo */}
        <div className="card">
          <h1>🚚 Datos Para Envio 📦</h1>
          <p>Llena los datos para que la magia llegue a tu hogar ✨</p>

          <form onSubmit={handleSubmit} className="formulario-checkout">
            <input
              type="text"
              name="nombre"
              value={datos.nombre}
              onChange={handleChange}
              placeholder="👤 Escribe tu nombre mágico..."
              required
            />
            <input
              type="email"
              name="email"
              value={datos.email}
              onChange={handleChange}
              placeholder="📧 Tu correo encantado..."
              required
            />
            <input
              type="tel"
              name="telefono"
              value={datos.telefono}
              onChange={handleChange}
              placeholder="📞 Número de contacto"
            />
            <input
              type="text"
              name="direccion"
              value={datos.direccion}
              onChange={handleChange}
              placeholder="🏠 Dirección de envío"
              required
            />
            <input
              type="text"
              name="ciudad"
              value={datos.ciudad}
              onChange={handleChange}
              placeholder="🏙️ Ciudad"
            />
            <input
              type="text"
              name="departamento"
              value={datos.departamento}
              onChange={handleChange}
              placeholder="🌄 Departamento o Región"
            />
            <textarea
              name="indicaciones"
              value={datos.indicaciones}
              onChange={handleChange}
              placeholder="📝 ¿Algo especial para el repartidor?"
            ></textarea>

            {/* 🌸 Opciones de envío visuales tipo tarjeta */}
            <div className="envio-opciones-tarjetas">
              <label className={`opcion-envio ${datos.envio === "gratis" ? "activo" : ""}`}>
                <input
                  type="radio"
                  name="envio"
                  value="gratis"
                  checked={datos.envio === "gratis"}
                  onChange={handleChange}
                />
                <div className="contenido-envio">
                  <span className="icono-envio">📦</span>
                  <div>
                    <p className="titulo-envio">Envío nacional (4 días)</p>
                    <p className="costo-envio">Gratis</p>
                  </div>
                </div>
              </label>

              <label className={`opcion-envio ${datos.envio === "express" ? "activo" : ""}`}>
                <input
                  type="radio"
                  name="envio"
                  value="express"
                  checked={datos.envio === "express"}
                  onChange={handleChange}
                />
                <div className="contenido-envio">
                  <span className="icono-envio">🚀</span>
                  <div>
                    <p className="titulo-envio">Entrega hoy (solo área urbana)</p>
                    <p className="costo-envio">$10.000 COP</p>
                  </div>
                </div>
              </label>
            </div>

            {/* ✨ Recordar */}
            <label className="checkbox-recordar">
              <input
                type="checkbox"
                name="recordar"
                checked={datos.recordar}
                onChange={handleChange}
              />
              Recordar mis datos para la próxima ✨
            </label>

            <p className="mensaje-final">
              ✨ Gracias por llevar un pedacito de arte contigo ✨
            </p>

            <button className="btn-finalizar-checkout" type="submit">
              🪄 Confirmar pedido y pagar
            </button>
          </form>
        </div>

        {/* 🧾 Resumen Derecha */}
        <div className="resumen-pedido">
          <h2>🧾 Resumen del pedido</h2>
          {carrito.map((item) => {
            const precioUnitario =
              item.oferta === 1 ? item.precio_oferta : item.precio;
            const subtotal = parseInt(precioUnitario) * item.cantidad;

            return (
              <div key={item.product_id} className="producto-item">
                <img
                  src={`${BASE_URL}${item.imagen}`}
                  alt={item.nombre}
                  onError={(e) => (e.target.src = "/img/default.jpg")}
                />
                <div>
                  <p className="nombre">{item.nombre}</p>
                  <p className="precio">
                    {item.cantidad} x ${parseInt(precioUnitario).toLocaleString("es-CO")}
                  </p>
                </div>
              </div>
            );
          })}

          <hr />
          <p>
            🚚 Envío:
            <strong>
              {" "}
              {datos.envio === "express" ? "$10.000 COP" : "Gratis"}
            </strong>
          </p>
          <p>
            💖 Total a pagar:{" "}
            <span className="monto-total">
              $
              {(totalCarrito + (datos.envio === "express" ? 10000 : 0)).toLocaleString(
                "es-CO"
              )}{" "}
              COP
            </span>
          </p>

          <div className="checkout-seguridad">
            <ul>
              <li>🔒 Pago seguro con cifrado SSL</li>
              <li>💳 Aceptamos Nequi, PSE, Visa y Mastercard</li>
              <li>📦 Garantía de devolución en 7 días</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
