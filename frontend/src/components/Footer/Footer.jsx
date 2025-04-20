import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter, FaEnvelope } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      {/* 🌷 Logo y slogan */}
      <div className="footer-top">
        <img src="/images/logo.png" alt="Soy Arte" className="footer-logo" />
        <p className="footer-slogan">La magia de ser mujer.</p>
      </div>

      {/* 🔗 Navegación rápida */}
      <nav className="footer-links">
        <Link to="/">Inicio</Link>
        <Link to="/recetas">Recetas</Link>
        <Link to="/blog">Blog</Link>
        <Link to="/terapia-culinaria">Terapia Culinaria</Link>
        <Link to="/tienda">Tienda</Link>
      </nav>

      {/* 🌸 Redes sociales */}
      <div className="social-icons">
        <a href="https://facebook.com" target="_blank" rel="noreferrer" className="icon facebook">
          <FaFacebookF />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noreferrer" className="icon instagram">
          <FaInstagram />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noreferrer" className="icon twitter">
          <FaTwitter />
        </a>
        <a href="mailto:soyarte@gmail.com" target="_blank" rel="noreferrer" className="icon email">
          <FaEnvelope />
        </a>
      </div>

      {/* 💌 Formulario de registro */}
      <div className="register-form">
        <h3>💌 Regístrate para recibir novedades</h3>
        <form>
          <input type="email" placeholder="Tu correo electrónico" required />
          <button type="submit">Registrarse</button>
        </form>
      </div>

      {/* 📜 Legal */}
      <div className="footer-legal">
        <Link to="/terminos-y-condiciones">Términos y Condiciones</Link>
        <Link to="/politica-de-privacidad">Política de Privacidad</Link>
      </div>

      {/* 🧁 Créditos y cierre */}
      <p className="footer-copy">
        Hecho con 💜 por mujeres creativas — Crea. Cocina. Comparte. Sé arte. <br />
        &copy; {new Date().getFullYear()} Soy Arte
      </p>

      <p className="footer-dev">
        Diseñado con pasión por <strong>Lucas Salazar</strong> 💻
      </p>
    </footer>
  );
};

export default Footer;
