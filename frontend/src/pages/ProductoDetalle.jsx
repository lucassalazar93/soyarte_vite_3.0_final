// src/pages/ProductoDetalle.jsx
import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { CarritoContext } from "../context/CarritoContext";
import BASE_URL from "../BASE_URL";
import "./ProductoDetalle.css";

const ProductoDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);
  const [sugeridos, setSugeridos] = useState([]);
  const { agregarAlCarrito } = useContext(CarritoContext);

  useEffect(() => {
    axios.get(`${BASE_URL}/api/productos`)
      .then((res) => {
        const productos = res.data;
        const encontrado = productos.find(p => p.product_id === parseInt(id));
        const aleatorios = productos
          .filter(p => p.product_id !== parseInt(id))
          .sort(() => 0.5 - Math.random())
          .slice(0, 2);

        setProducto(encontrado);
        setSugeridos(aleatorios);
      })
      .catch((err) => {
        console.error("Error al cargar producto:", err);
      });
  }, [id]);

  if (!producto) return <p className="cargando">Cargando producto...</p>;

  return (
    <div className="producto-detalle">
      <div className="producto-imagen">
        <div className="zoom-container">
          <img
            src={`${BASE_URL}${producto.imagen}`}
            alt={producto.nombre}
            className="zoomable"
            onError={(e) => (e.target.src = "/img/default.jpg")}
          />
        </div>

        <button className="btn-volver" onClick={() => navigate("/tienda")}>
          ⬅ Volver a la Tienda 🛍️
        </button>

        {producto.grupo_slug && (
          <button
            className="btn-volver-secundario"
            onClick={() => navigate(`/coleccion/${producto.grupo_slug}`)}
          >
            🔍 Ver todos los {producto.grupo_nombre?.toLowerCase() || 'productos'}
          </button>
        )}

        {/* 🎯 Sugerencias visuales */}
        <div className="sugeridos-en-detalle">
          <h3>🪄 Tal vez también te encante...</h3>
          <div className="sugeridos-grid">
            {sugeridos.map((prod) => (
              <div className="sugerido-card" key={prod.product_id}>
                <img src={`${BASE_URL}${prod.imagen}`} alt={prod.nombre} />
                <h4>{prod.nombre}</h4>
                <p className="precio">${parseInt(prod.precio).toLocaleString("es-CO")}</p>
                <button
                  className="btn-vermas"
                  onClick={() => navigate(`/producto/${prod.product_id}`)}
                >
                  Ver más
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="producto-info">
        <h2 className="titulo-interactivo">{producto.nombre}</h2>

        <div
          className="descripcion"
          dangerouslySetInnerHTML={{ __html: producto.descripcion }}
        ></div>

        <div className="precio-contenedor">
          {producto.oferta ? (
            <>
              <span className="precio-original">
                Antes: ${parseInt(producto.precio).toLocaleString("es-CO")}
              </span>
              <span className="precio-oferta">
                Ahora: ${parseInt(producto.precio_oferta).toLocaleString("es-CO")}
              </span>
            </>
          ) : (
            <span className="precio-destacado">
              Precio: ${parseInt(producto.precio).toLocaleString("es-CO")}
            </span>
          )}
        </div>

        <button
          className="btn-agregar-carrito-animado"
          onClick={() => agregarAlCarrito(producto)}
        >
          🛒 ¡Agregar al carrito!
        </button>
      </div>
    </div>
  );
};

export default ProductoDetalle;
