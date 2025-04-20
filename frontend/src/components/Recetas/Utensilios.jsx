// ✅ Utensilios.jsx
import React from "react";
import "./Utensilios.css";

const Utensilios = ({ utensilios = [], marcados = [], onToggle, onMarcarTodos, onReiniciar }) => {
  const total = utensilios.length;
  const listos = utensilios.filter(u => marcados.includes(u.id)).length;

  return (
    <section className="utensilios">
      <h2 className="utensilios-titulo">🍴 Utensilios</h2>

      <div className="utensilios-grid">
        {utensilios.map((u) => (
          <button
            key={u.id}
            role="checkbox"
            aria-checked={marcados.includes(u.id)}
            className={`utensilio-chip ${marcados.includes(u.id) ? "marcado" : ""}`}
            onClick={() => onToggle(u.id)}
          >
            <span className="utensilio-icono">{u.icono || "🍽️"}</span>
            <span className="utensilio-nombre">{u.nombre}</span>
          </button>
        ))}
      </div>

      <div className="utensilios-controles">
        <button onClick={onMarcarTodos} className="accion-btn small">✔️ Marcar todos</button>
        <button onClick={onReiniciar} className="accion-btn small">🔄 Reiniciar</button>
      </div>

      <p className="progreso">{listos}/{total} utensilios listos ✅</p>
    </section>
  );
};

export default Utensilios;
