// ✅ src/components/Navbar/NavbarRecetas.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaSearch,
  FaHeart,
  FaUser,
  FaUtensils,
  FaMugHot,
  FaCookieBite,
  FaHome,
  FaInfoCircle,
  FaEnvelope,
} from "react-icons/fa";
import "./NavbarRecetas.css";

const NavbarRecetas = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const toggleMenu = () => setMenuAbierto(!menuAbierto);
  const cerrarMenu = () => setMenuAbierto(false);

  return (
    <>
      <nav className="navbar-recetas">
        <div className="bloque-izquierdo">
          <button className="btn-hamburguesa" onClick={toggleMenu}>
            <FaBars />
          </button>
          <Link to="/">
            <img src="/images/logo.png" alt="Soy Arte" className="logo-recetas" />
          </Link>
        </div>

        <div className="bloque-buscador">
          <div className="contenedor-busqueda">
            <FaSearch className="icono-busqueda" />
            <input
              type="text"
              className="input-busqueda"
              placeholder="Buscar recetas saludables..."
            />
          </div>
        </div>

        <div className="bloque-derecho">
          <Link to="/mi-recetario" className="btn-receta">
            <FaHeart className="icono-accion" /> Recetario
          </Link>
          <Link to="/login" className="btn-receta btn-entrar">
            <FaUser className="icono-accion" /> Mi cuenta
          </Link>
        </div>
      </nav>

      {menuAbierto && (
        <div className="menu-lateral-recetas">
          <div className="encabezado-menu">
            <h3>🍳 Explora recetas</h3>
            <button className="cerrar-menu" onClick={cerrarMenu}>
              <FaTimes />
            </button>
          </div>
          <Link to="/" onClick={cerrarMenu}><FaHome /> Inicio</Link>
          <Link to="/recetas" onClick={cerrarMenu}><FaUtensils /> Todas las recetas</Link>
          <Link to="/mi-recetario" onClick={cerrarMenu}><FaHeart /> Mi recetario</Link>
          <Link to="/recetas/desayunos" onClick={cerrarMenu}><FaMugHot /> Desayunos</Link>
          <Link to="/recetas/postres" onClick={cerrarMenu}><FaCookieBite /> Postres</Link>
          <Link to="/sobre-nosotros" onClick={cerrarMenu}><FaInfoCircle /> Sobre Nosotros</Link>
          <Link to="/contacto" onClick={cerrarMenu}><FaEnvelope /> Contacto</Link>
        </div>
      )}
    </>
  );
};

export default NavbarRecetas;
