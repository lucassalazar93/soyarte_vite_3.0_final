import React from "react";
import "./RecetaDestacada.css";

const categorias = [
  { nombre: "Postres", imagen: "/images/postre.PNG" },
  { nombre: "Carnes", imagen: "/images/carne.PNG" },
  { nombre: "Pastas", imagen: "/images/pasta.PNG" },
  { nombre: "Ensaladas", imagen: "/images/ensalada.PNG" },
  { nombre: "Sopas", imagen: "/images/sopa.PNG" },
  { nombre: "Panes", imagen: "/images/panes.PNG" },
  { nombre: "Bebidas", imagen: "/images/bebidas.PNG" },
];

const normalizarId = (nombre) =>
  nombre
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const scrollToCategoria = (id) => {
  const seccion = document.getElementById(normalizarId(id));
  if (seccion) {
    seccion.scrollIntoView({ behavior: "smooth" });
  }
};

const RecetaDestacada = () => {
  return (
    <div className="categorias-destacadas">
      <div className="categorias-contenedor">
        {categorias.map((cat, index) => (
          <div
            key={index}
            className="categoria-item"
            onClick={() => scrollToCategoria(cat.nombre)}
          >
            <img src={cat.imagen} alt={cat.nombre} className="categoria-img" />
            <p className="categoria-nombre">{cat.nombre}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecetaDestacada;
