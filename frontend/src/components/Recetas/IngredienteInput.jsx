import React, { useState } from "react";
import "./IngredienteInput.css";

const IngredienteInput = ({ ingredientes, setIngredientes }) => {
  const [nuevo, setNuevo] = useState("");

  const agregar = () => {
    if (nuevo.trim()) {
      setIngredientes([...ingredientes, nuevo.trim()]);
      setNuevo("");
    }
  };

  const eliminar = (index) => {
    const copia = [...ingredientes];
    copia.splice(index, 1);
    setIngredientes(copia);
  };

  return (
    <div className="ingrediente-input-wrapper">
      <label>🧂 Ingredientes:</label>
      <div className="input-group">
        <input
          type="text"
          value={nuevo}
          onChange={(e) => setNuevo(e.target.value)}
          placeholder="Ej: 170 g de carne molida"
        />
        <button type="button" onClick={agregar}>Agregar</button>
      </div>

      <ul className="ingrediente-lista">
        {ingredientes.map((item, i) => (
          <li key={i}>
            {item}
            <button onClick={() => eliminar(i)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IngredienteInput;
