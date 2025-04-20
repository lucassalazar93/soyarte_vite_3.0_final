import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../BASE_URL";
import "./ColeccionGrupo.css";
import { CarritoContext } from "../context/CarritoContext";
import ToastNotificacion from "../components/UI/ToastNotificacion";
import BannerGrupo from "../components/Tienda/BannerGrupo";

const ColeccionGrupo = () => {
  const { grupo } = useParams();
  const [productos, setProductos] = useState([]);
  const [mostrarToast, setMostrarToast] = useState(false);
  const { agregarAlCarrito } = useContext(CarritoContext);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/productos`)
      .then((res) => {
        const filtrados = res.data.filter(
          (prod) =>
            prod.grupo_slug?.toLowerCase() === grupo.toLowerCase()
        );
        setProductos(filtrados);
      })
      .catch((err) =>
        console.error("❌ Error al cargar productos", err)
      );
  }, [grupo]);

  const agruparPorCategoria = (productos) => {
    return productos.reduce((acc, prod) => {
      const categoria = prod.categoria_nombre || "Sin categoría";
      if (!acc[categoria]) acc[categoria] = [];
      acc[categoria].push(prod);
      return acc;
    }, {});
  };

  const productosAgrupados = agruparPorCategoria(productos);

  const obtenerRutaImagen = (ruta) =>
    ruta?.startsWith("/uploads") ? `${BASE_URL}${ruta}` : "/img/default.jpg";

  const handleAgregar = (producto) => {
    agregarAlCarrito(producto);
    setMostrarToast(true);
    setTimeout(() => setMostrarToast(false), 3000);
  };

  return (
    <div className="coleccion-grupo">
      <BannerGrupo grupo={grupo} />
      <h1 className="titulo-grupo-coleccion">✨ {grupo}</h1>

      {productos.length === 0 ? (
        <p className="mensaje-cargando">Cargando colección...</p>
      ) : (
        Object.entries(productosAgrupados).map(([categoria, items]) => (
          <section key={categoria} className="bloque-categoria-coleccion">
            <h2 className="titulo-categoria-coleccion">{categoria}</h2>
            <div className="productos-grid">
              {items.map((producto) => (
                <div key={producto.product_id} className="producto-card">
                  <Link to={`/producto/${producto.product_id}`}>
                    <img
                      src={obtenerRutaImagen(producto.imagen)}
                      alt={producto.nombre}
                      className="card-img-top"
                      onError={(e) => (e.target.src = "/img/default.jpg")}
                    />
                  </Link>
                  <div className="card-body">
                    <Link
                      to={`/producto/${producto.product_id}`}
                      className="card-title link-producto-titulo"
                    >
                      <h5>{producto.nombre}</h5>
                    </Link>
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
                  <div className="card-footer">
                    <button
                      className="btn-agregar"
                      onClick={() => handleAgregar(producto)}
                    >
                      Agregar al carrito
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))
      )}

      <ToastNotificacion
        mensaje="Producto añadido al carrito"
        visible={mostrarToast}
      />
    </div>
  );
};

export default ColeccionGrupo;
