// ✅ src/components/Navbar/NavbarTienda.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaSearch, FaFilter, FaShoppingCart, FaUser } from "react-icons/fa";
import axios from "axios";
import "./NavbarTienda.css";
import MenuLateral from "./MenuLateral";

const NavbarTienda = ({ onBuscar, onFiltroCategoria }) => {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [gruposCategorias, setGruposCategorias] = useState([]);

  const toggleMenu = () => setMenuAbierto(!menuAbierto);
  const toggleFiltros = () => setMostrarFiltros(!mostrarFiltros);
  const cerrarMenu = () => setMenuAbierto(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [gruposRes, categoriasRes] = await Promise.all([
          axios.get("http://localhost:5000/api/grupos"),
          axios.get("http://localhost:5000/api/categorias"),
        ]);

        const grupos = gruposRes.data.map((grupo) => ({
          ...grupo,
          categorias: categoriasRes.data.filter((c) => c.grupo_id === grupo.grupo_id),
        }));

        setGruposCategorias(grupos);
      } catch (error) {
        console.error("❌ Error al cargar grupos/categorías", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <nav className="navbar-tienda">
        <div className="bloque-izquierdo">
          <button className="btn-hamburguesa" onClick={toggleMenu}>
            <FaBars />
          </button>
          <Link to="/">
            <img src="/images/logo.png" alt="Soy Arte" className="logo-tienda" />
          </Link>
        </div>

        <div className="bloque-buscador">
          <div className="contenedor-busqueda">
            <FaSearch className="icono-busqueda" />
            <input
              type="text"
              className="input-busqueda"
              placeholder="Buscar productos mágicos..."
              value={busqueda}
              onChange={(e) => {
                setBusqueda(e.target.value);
                onBuscar && onBuscar(e.target.value);
              }}
            />
          </div>

          <button className="btn-filtros" onClick={toggleFiltros}>
            <FaFilter /> Filtros
          </button>
        </div>

        <div className="bloque-derecho">
          <Link to="/carrito" className="btn-tienda">
            <FaShoppingCart className="icono-accion" /> Carrito
          </Link>
          <Link to="/login" className="btn-tienda btn-entrar">
            <FaUser className="icono-accion" /> Mi cuenta
          </Link>
        </div>
      </nav>

      {/* 🧭 Menú lateral */}
      <MenuLateral visible={menuAbierto} onClose={cerrarMenu} gruposCategorias={gruposCategorias} />

      {/* 🎯 Filtros por categoría */}
      {mostrarFiltros && (
        <div className="panel-filtros">
          <div className="encabezado-filtros">
            <h4>🎯 Filtros</h4>
            <button className="cerrar-filtros" onClick={toggleFiltros}>
              <FaTimes />
            </button>
          </div>

          <div className="filtro-item">
            <label>Categoría:</label>
            <select onChange={(e) => onFiltroCategoria(e.target.value)}>
              <option value="">Todas</option>
              {gruposCategorias.flatMap((grupo) =>
                grupo.categorias.map((cat) => (
                  <option key={cat.categoria_id} value={cat.nombre}>
                    {cat.nombre}
                  </option>
                ))
              )}
            </select>
          </div>
        </div>
      )}
    </>
  );
};

export default NavbarTienda;
