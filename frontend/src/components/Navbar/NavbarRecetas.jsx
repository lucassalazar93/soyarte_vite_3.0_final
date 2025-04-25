import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaHeart,
  FaUser,
  FaUtensils,
  FaMugHot,
  FaCookieBite,
  FaHome,
  FaInfoCircle,
  FaEnvelope,
  FaLightbulb,
} from "react-icons/fa";
import FiltrosRecetas from "./FiltrosRecetas";
import "./NavbarRecetas.css";

const frases = [
  "Cocinar también es una forma de sanar el alma 💜",
  "Cada receta guarda una historia por contar 🍲",
  "Una receta puede ser el abrazo que necesitas 🤗",
  "Sazonar con amor es el mejor ingrediente 💫",
  "Cocinar es un acto de amor propio 🌸",
];

const NavbarRecetas = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [fraseAleatoria, setFraseAleatoria] = useState("");
  const [mostrarFiltrosRecetas, setMostrarFiltrosRecetas] = useState(false);

  // Mostrar frase aleatoria al cargar
  useEffect(() => {
    const frase = frases[Math.floor(Math.random() * frases.length)];
    setFraseAleatoria(frase);
  }, []);

  const toggleMenu = () => setMenuAbierto(!menuAbierto);
  const cerrarMenu = () => setMenuAbierto(false);

  return (
    <>
      <nav className="navbar-recetas">
        {/* IZQUIERDA */}
        <div className="navbar-recetas__bloque-izquierdo">
          <button className="navbar-recetas__btn-hamburguesa" onClick={toggleMenu}>
            <FaBars />
          </button>
          <Link to="/">
            <img src="/images/logo.png" alt="Logo Soy Arte" className="navbar-recetas__logo" />
          </Link>
        </div>

        {/* FRASE CENTRAL */}
        <div className="navbar-recetas__frase-central">
          <FaLightbulb className="navbar-recetas__icono-frase" />
          <span>{fraseAleatoria}</span>
        </div>

        {/* DERECHA */}
        <div className="navbar-recetas__bloque-derecho">
          <Link
            to="#"
            onClick={() => setMostrarFiltrosRecetas(!mostrarFiltrosRecetas)}
            className="navbar-recetas__btn navbar-recetas__btn--filtros"
          >
            🎛️ Filtros
          </Link>
          <Link to="/mi-recetario" className="navbar-recetas__btn">
            <FaHeart className="navbar-recetas__icono" /> Recetario
          </Link>
          <Link to="/login" className="navbar-recetas__btn navbar-recetas__btn--entrar">
            <FaUser className="navbar-recetas__icono" /> Mi cuenta
          </Link>
        </div>
      </nav>

      {/* MENÚ LATERAL */}
      {menuAbierto && (
        <div className="navbar-recetas__menu-lateral">
          <div className="navbar-recetas__menu-encabezado">
            <h3>🍽️ Explora recetas</h3>
            <button
              className="navbar-recetas__btn-cerrar"
              onClick={cerrarMenu}
              title="Cerrar menú lateral"
            >
              <FaTimes />
            </button>
          </div>

          <Link to="/bienvenida-recetas" onClick={cerrarMenu} className="link-bienvenida-recetas">
            🌸 Inicio del Recetario
          </Link>
          <Link to="/" onClick={cerrarMenu}><FaHome /> Inicio</Link>
          <Link to="/recetas" onClick={cerrarMenu}><FaUtensils /> Todas las recetas</Link>
          <Link to="/mi-recetario" onClick={cerrarMenu}><FaHeart /> Mi recetario</Link>
          <Link to="/recetas/desayunos" onClick={cerrarMenu}><FaMugHot /> Desayunos</Link>
          <Link to="/recetas/postres" onClick={cerrarMenu}><FaCookieBite /> Postres</Link>
          <Link to="/sobre-nosotros" onClick={cerrarMenu}><FaInfoCircle /> Sobre Nosotros</Link>
          <Link to="/contacto" onClick={cerrarMenu}><FaEnvelope /> Contacto</Link>
        </div>
      )}

      {/* 🎛️ FILTROS */}
      {mostrarFiltrosRecetas && (
        <FiltrosRecetas
          onFiltrar={(f) => console.log("Filtros aplicados:", f)}
          onSorprendeme={() => alert("🎲 Receta sorpresa lista 🍽️")}
          categorias={["Postres", "Sopas", "Tartas", "Ensaladas"]}
          autores={["Lukas", "Nore", "Chef Luna"]}
        />
      )}
    </>
  );
};

export default NavbarRecetas;
