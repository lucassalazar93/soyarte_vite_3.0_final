// src/components/Tienda/ProductosEnOferta.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./ProductosEnOferta.css"; // Asegúrate de que este archivo exista con estilos

function ProductosEnOferta({ productos, onAgregar }) {
  // ✅ Construye la URL absoluta de la imagen (desde backend)
  const obtenerRutaImagen = (ruta) => {
    if (!ruta) return "/img/default.jpg"; // Imagen por defecto
    return ruta.startsWith("/uploads")
      ? `http://localhost:5000${ruta}`
      : "/img/default.jpg";
  };

  // ✅ Agrupar productos por categoría (usa 'categoria_nombre' del backend)
  const productosPorCategoria = productos.reduce((acc, producto) => {
    const categoria = producto.categoria_nombre || "Sin Categoría";
    if (!acc[categoria]) acc[categoria] = [];
    acc[categoria].push(producto);
    return acc;
  }, {});

  return (
    <>
      {Object.entries(productosPorCategoria).map(
        ([categoria, productosCategoria]) => (
          <section
            key={categoria}
            id={categoria.toLowerCase().replace(/\s/g, "-")}
            className="productos-oferta-promocion"
          >
            <h2>🔥 {categoria} en Oferta 🔥</h2>

            <div className="productos-grid">
              {productosCategoria.map((producto) => (
                <div key={producto.product_id} className="producto-card">
                  <div className="card h-100">
                    {/* Enlace al detalle del producto */}
                    <Link
                      to={`/producto/${producto.product_id}`}
                      className="link-producto"
                    >
                      <img
                        src={obtenerRutaImagen(producto.imagen)}
                        alt={producto.nombre}
                        className="card-img-top"
                        onError={(e) => {
                          console.warn("❌ Imagen no cargó:", producto.imagen);
                          e.target.src = "/img/default.jpg";
                        }}
                      />

                      <div className="card-body">
                        <h5 className="card-title">{producto.nombre}</h5>

                        <p className="card-text text-muted">
                          <del>
                            Antes: $
                            {parseInt(producto.precio).toLocaleString("es-CO")}
                          </del>
                        </p>

                        <p className="card-text text-danger fw-bold">
                          Ahora: $
                          {parseInt(producto.precio_oferta).toLocaleString(
                            "es-CO"
                          )}
                        </p>
                      </div>
                    </Link>

                    {/* Botón agregar al carrito */}
                    <div className="card-footer">
                      <button
                        className="btn-agregar"
                        onClick={() => onAgregar(producto)}
                      >
                        Agregar al carrito
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )
      )}
    </>
  );
}

export default ProductosEnOferta;
