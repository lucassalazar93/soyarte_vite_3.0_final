import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { CarritoContext } from "../../context/CarritoContext";
import { useAuth } from "../../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const { carrito } = useContext(CarritoContext);
  const { user, logout } = useAuth();
  const totalCantidad = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  const [animarCarrito, setAnimarCarrito] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(false);

  // 🎯 Efecto para animar ícono de carrito cuando se agrega algo
  useEffect(() => {
    if (carrito.length > 0) {
      setAnimarCarrito(true);
      const timer = setTimeout(() => setAnimarCarrito(false), 500);
      return () => clearTimeout(timer);
    }
  }, [carrito]);

  const handleLogout = () => {
    logout();           // ✅ Limpia la sesión
    navigate("/");      // 🔁 Redirige al inicio
  };

  return (
    <nav className="navbar">
      {/* 🎨 Logo principal */}
      <div className="logo">
        <Link to="/">
          <img src="/images/logo.png" alt="Soy Arte" />
        </Link>
      </div>

      {/* 🍔 Botón de menú para móvil */}
      <div className="nav-menu-toggle" onClick={() => setMenuAbierto(!menuAbierto)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* 🌸 Enlaces principales */}
      <ul className={`nav-links ${menuAbierto ? "active" : ""}`}>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/mujeres">Mujeres</Link></li>
        <li><Link to="/recetas">Recetas</Link></li>
        <li><Link to="/terapia-culinaria">Terapia Culinaria</Link></li>
        <li><Link to="/tienda">Tienda</Link></li>
        <li><Link to="/blog">Blog</Link></li> {/* ✅ NUEVO */}
        <li><Link to="/recetas-cocinadas">Cocinadas</Link></li>
        {user?.role === "admin" && <li><Link to="/admin">Admin</Link></li>}
      </ul>

      {/* 🛍️ Carrito y usuario */}
      <div className="user-cart-section">
        <Link to="/carrito" className="cart-link">
          <FaShoppingCart className={`cart-icon ${animarCarrito ? "animar" : ""}`} />
          {totalCantidad > 0 && <span className="contador-carrito">{totalCantidad}</span>}
          <span>Carrito</span>
        </Link>

        {user ? (
          <>
            <span className="user-name">✨ {user.name?.split(" ")[0]}</span>
            <button className="logout-btn" onClick={handleLogout}>Cerrar sesión</button>
          </>
        ) : (
          <>
            <Link to="/register" className="nav-link">Registro</Link>
            <Link to="/login" className="nav-link">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
