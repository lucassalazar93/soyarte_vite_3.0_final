import React, { useEffect, useState } from "react";
import "./Ingredientes.css";
import ProgresoIngredientes from "./ProgresoIngredientes";

const Ingredientes = ({ ingredientesHTML }) => {
  const [ingredientes, setIngredientes] = useState([]);

  useEffect(() => {
    if (ingredientesHTML) {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = ingredientesHTML;

      const items = Array.from(tempDiv.querySelectorAll("li")).map((li) => ({
        nombre: li.textContent.trim(),
        check: false,
      }));

      setIngredientes(items);
    }
  }, [ingredientesHTML]);

  const toggleIngrediente = (index) => {
    const nuevos = [...ingredientes];
    nuevos[index].check = !nuevos[index].check;
    setIngredientes(nuevos);
  };

  const marcarTodos = () => {
    setIngredientes(ingredientes.map((i) => ({ ...i, check: true })));
  };

  const reiniciar = () => {
    setIngredientes(ingredientes.map((i) => ({ ...i, check: false })));
  };

  const listos = ingredientes.filter((i) => i.check).length;

  if (!ingredientes.length) return null;

  return (
    <div className="ingredientes-wrapper">
      <section className="ingredientes-section" data-aos="fade-up">
        <h2>🥣 Ingredientes</h2>

        <ul className="ingredientes-lista">
          {ingredientes.map((item, i) => (
            <li key={i} className={`item ${item.check ? "completo" : ""}`}>
              <label>
                <input
                  type="checkbox"
                  checked={item.check}
                  onChange={() => toggleIngrediente(i)}
                />
                <span>{item.nombre}</span>
              </label>
            </li>
          ))}
        </ul>

        <div className="ingredientes-controles">
          <button onClick={marcarTodos}>✅ Marcar todos</button>
          <button onClick={reiniciar}>🔄 Reiniciar</button>
        </div>

        <div className="ingredientes-estado">
          {listos}/{ingredientes.length} ingredientes listos ✅
        </div>

        {listos > 0 && (
          <ProgresoIngredientes total={ingredientes.length} listos={listos} />
        )}
      </section>
    </div>
  );
};

export default Ingredientes;
