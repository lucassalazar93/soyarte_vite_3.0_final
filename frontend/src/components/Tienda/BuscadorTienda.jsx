// ✅ src/components/Tienda/BuscadorTienda.jsx
import React from "react";
import "../../css/BuscadorTienda.css";


function BuscadorTienda({
  busqueda,
  setBusqueda,
  categoria,
  setCategoria,
  categorias = [],
  precioMin,
  setPrecioMin,
  precioMax,
  setPrecioMax
}) {
  return (
    <div className="buscador-bar">
      {/* 🔍 Buscar por texto */}
      <input
        className="buscador-input"
        type="text"
        placeholder="🔍 Buscar productos..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      {/* 🏷️ Filtro por categoría */}
      <select
        className="buscador-select"
        value={categoria}
        onChange={(e) => setCategoria(e.target.value)}
      >
        <option value="todas">Todas las categorías</option>
        {categorias.map((cat, index) => (
          <option key={index} value={cat}>
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </option>
        ))}
      </select>

      {/* 💰 Rango de precio */}
      <input
        type="number"
        className="buscador-input"
        placeholder="Mín $"
        value={precioMin}
        onChange={(e) => setPrecioMin(e.target.value)}
        min="0"
      />

      <input
        type="number"
        className="buscador-input"
        placeholder="Máx $"
        value={precioMax}
        onChange={(e) => setPrecioMax(e.target.value)}
        min="0"
      />
    </div>
  );
}

export default BuscadorTienda;
