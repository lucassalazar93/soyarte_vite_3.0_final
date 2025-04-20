// ✅ src/pages/Tienda.jsx
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import "./tienda.css";
import { Link } from "react-router-dom";

// 🧩 Componentes visuales
import HeroTiendaCarrusel from "../components/Tienda/HeroTienda";
import CategoriasDestacadas from "../components/Tienda/CategoriasDestacadas";
import BeneficiosBar from "../components/Tienda/BeneficiosBar";
import SeccionPromocional from "../components/Tienda/SeccionPromocional";
import OfertasDestacadas from "../components/Tienda/OfertasDestacadas";
import ProductosPorCategoria from "../components/Tienda/ProductosPorCategoria";

// 🛒 Contexto del carrito
import { CarritoContext } from "../context/CarritoContext";
import ToastNotificacion from "../components/UI/ToastNotificacion";

function Tienda() {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("todas");
  const [precioMin, setPrecioMin] = useState("");
  const [precioMax, setPrecioMax] = useState("");
  const [soloStock, setSoloStock] = useState(false);
  const [mostrarToast, setMostrarToast] = useState(false);
  const [mostrarPromo, setMostrarPromo] = useState(true);

  const { agregarAlCarrito } = useContext(CarritoContext);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/productos")
      .then((res) => setProductos(res.data))
      .catch((err) => console.error("❌ Error al cargar productos", err));
  }, []);

  // 📌 Scroll automático al seleccionar categoría
  const scrollToProductos = () => {
    setTimeout(() => {
      const seccion = document.getElementById("productos");
      if (seccion) seccion.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  const handleCategoriaSeleccionada = (cat) => {
    setCategoria(cat);
    scrollToProductos();
  };

  // 🎯 Filtrado dinámico
  const productosFiltrados = productos.filter((p) => {
    const coincideNombre = p.nombre.toLowerCase().includes(busqueda.toLowerCase());
    const coincideCategoria = categoria === "todas" || p.categoria_nombre === categoria;
    const precio = parseInt(p.precio);
    const dentroRangoMin = precioMin === "" || precio >= parseInt(precioMin);
    const dentroRangoMax = precioMax === "" || precio <= parseInt(precioMax);
    const disponibleStock = !soloStock || p.stock > 0;

    return coincideNombre && coincideCategoria && dentroRangoMin && dentroRangoMax && disponibleStock;
  });

  const productosEnOferta = productosFiltrados.filter((p) => p.oferta === 1);
  const productosNormales = productosFiltrados.filter((p) => p.oferta !== 1);

  const handleAgregarAlCarrito = (producto) => {
    agregarAlCarrito(producto);
    setMostrarToast(true);
    setTimeout(() => setMostrarToast(false), 3000);
  };

  return (
    <div className="pagina-tienda">
      {/* 🌟 Hero principal */}
      <div className="hero-wrapper">
        <HeroTiendaCarrusel />
      </div>

      {/* 🎁 Barra de beneficios */}
      <BeneficiosBar />

      {/* 📱 Categorías visuales */}
      <CategoriasDestacadas onSelectCategoria={handleCategoriaSeleccionada} />

      {/* 🟣 Sección promocional opcional */}
      {mostrarPromo && <SeccionPromocional onClose={() => setMostrarPromo(false)} />}

      {/* 🛍️ Productos renderizados */}
      {productos.length === 0 ? (
        <p className="tienda-loader">Cargando productos...</p>
      ) : (
        <>
          {/* 🔥 Productos en oferta */}
          <OfertasDestacadas productos={productosEnOferta} />

          {/* 🧩 Productos normales por categoría */}
          <ProductosPorCategoria
            productos={productosNormales}
            onAgregar={handleAgregarAlCarrito}
          />
        </>
      )}

      {/* ✅ Notificación */}
      <ToastNotificacion
        mensaje="Producto añadido al carrito"
        visible={mostrarToast}
      />
    </div>
  );
}

export default Tienda;
