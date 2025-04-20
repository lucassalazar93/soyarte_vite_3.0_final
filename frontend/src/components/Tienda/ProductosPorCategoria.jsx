// ✅ src/components/Tienda/ProductosPorCategoria.jsx
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import BASE_URL from "../../BASE_URL";
import "./ProductosPorCategoria.css";

const ICONOS_GRUPOS = {
  Joyas: "💎",
  Accesorios: "👜",
  Zapatos: "👟",
  "Cuidado personal": "🧴",
  Niñas: "🧒",
  Adolescentes: "👧",
  Ropa: "👗",
};

function ProductosPorCategoria({ productos, onAgregar }) {
  const navigate = useNavigate();

  // 🧠 Agrupar productos por grupo y categoría
  const agrupados = productos.reduce((acc, prod) => {
    const grupo = prod.grupo_nombre || "Otros";
    const categoria = prod.categoria_nombre || "Sin categoría";
    if (!acc[grupo]) acc[grupo] = {};
    if (!acc[grupo][categoria]) acc[grupo][categoria] = [];
    acc[grupo][categoria].push(prod);
    return acc;
  }, {});

  // ✨ Animación al hacer scroll
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    });
    document.querySelectorAll(".productos-categoria").forEach((seccion) =>
      observer.observe(seccion)
    );
  }, []);

  const obtenerRutaImagen = (ruta) =>
    ruta?.startsWith("/uploads") ? `${BASE_URL}${ruta}` : "/img/default.jpg";

  return (
    <>
      {Object.entries(agrupados).map(([grupo, categorias]) => {
        const emoji = ICONOS_GRUPOS[grupo] || "🛍️";
        const slug = categorias[Object.keys(categorias)[0]][0]?.grupo_slug;

        return (
          <section key={grupo} className="productos-grupo">
            <div className="encabezado-grupo">
              <h2 className="titulo-grupo">
                {emoji} {grupo}
              </h2>
              <p className="subtexto-grupo">
                Explora lo mejor de nuestra colección de {grupo.toLowerCase()}.
              </p>
              {slug && (
                <button
                  className="btn-ver-todo"
                  onClick={() => navigate(`/coleccion/${slug}`)}
                >
                  Ver todo {grupo}
                </button>
              )}
            </div>

            {Object.entries(categorias).map(([categoria, items]) => (
              <div
                key={categoria}
                id={categoria.toLowerCase().replace(/\s+/g, "-")}
                className="productos-categoria"
              >
                <div className="productos-grid">
                  {items.map((producto) => (
                    <div key={producto.product_id} className="producto-card">
                      <div className="card h-100">
                        <Link
                          to={`/producto/${producto.product_id}`}
                          className="link-producto"
                        >
                          <img
                            src={obtenerRutaImagen(producto.imagen)}
                            alt={producto.nombre}
                            className="card-img-top"
                            onError={(e) => (e.target.src = "/img/default.jpg")}
                          />
                          <div className="card-body">
                            <h5 className="card-title">{producto.nombre}</h5>
                            {producto.oferta ? (
                              <>
                                <p className="card-text text-muted">
                                  <del>
                                    ${parseInt(producto.precio).toLocaleString("es-CO")}
                                  </del>
                                </p>
                                <p className="card-text text-danger fw-bold">
                                  Ahora: ${parseInt(producto.precio_oferta).toLocaleString("es-CO")}
                                </p>
                              </>
                            ) : (
                              <p className="card-text text-success">
                                Precio: ${parseInt(producto.precio).toLocaleString("es-CO")}
                              </p>
                            )}
                          </div>
                        </Link>
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
              </div>
            ))}
          </section>
        );
      })}
    </>
  );
}

export default ProductosPorCategoria;
