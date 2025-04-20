// ✅ src/components/Navbar/MenuLateral.jsx
import React from "react";
import "./MenuLateral.css";
import { FaTimes, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const MenuLateral = ({ visible, onClose, gruposCategorias }) => {
  return (
    <div className={`menu-lateral ${visible ? "abierto" : ""}`}>
      <div className="menu-header">
        <h3>🌸 Explora Soy Arte</h3>
        <button onClick={onClose} className="btn-cerrar">
          <FaTimes />
        </button>
      </div>

      <div className="menu-categorias">
        {gruposCategorias.map((grupo) => (
          <div key={grupo.grupo_id} className="grupo">
            <strong>{grupo.nombre}</strong>
            <ul>
              {grupo.categorias.map((cat) => (
                <li key={cat.categoria_id}>
                  <Link to={`/tienda#${cat.nombre.toLowerCase().replace(/\s+/g, "-")}`} onClick={onClose}>
                    {cat.nombre} <FaChevronRight size={10} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuLateral;
