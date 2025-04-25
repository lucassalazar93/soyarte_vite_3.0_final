// src/components/Navbar/Navbar.jsx
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

  useEffect(() => {
    if (carrito.length > 0) {
      setAnimarCarrito(true);
      const timer = setTimeout(() => setAnimarCarrito(false), 500);
      return () => clearTimeout(timer);
    }
  }, [carrito]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar-principal">
      <div className="logo-principal">
        <Link to="/">
          <img src="/images/logo.png" alt="Soy Arte" />
        </Link>
      </div>

      <div className="nav-menu-toggle" onClick={() => setMenuAbierto(!menuAbierto)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <ul className={`nav-links-principal ${menuAbierto ? "active" : ""}`}>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/mujeres">Mujeres</Link></li>
        <li><Link to="/bienvenida-recetas">Recetas</Link></li>
        <li><Link to="/terapia-culinaria">Terapia Culinaria</Link></li>
        <li><Link to="/tienda">Tienda</Link></li>
        <li><Link to="/blog">Blog</Link></li>
        <li><Link to="/recetas-cocinadas">Cocinadas</Link></li>
        {user?.role === "admin" && <li><Link to="/admin">Admin</Link></li>}
      </ul>

      <div className="user-cart-principal">
        <Link to="/carrito" className="cart-link-principal">
          <FaShoppingCart className={`cart-icon-principal ${animarCarrito ? "animar" : ""}`} />
          {totalCantidad > 0 && <span className="contador-carrito-principal">{totalCantidad}</span>}
          <span>Carrito</span>
        </Link>

        {user ? (
          <>
            <span className="user-name-principal">✨ {user.name?.split(" ")[0]}</span>
            <button className="logout-btn-principal" onClick={handleLogout}>Cerrar sesión</button>
          </>
        ) : (
          <>
            <Link to="/register" className="nav-link-principal">Registro</Link>
            <Link to="/login" className="nav-link-principal">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
