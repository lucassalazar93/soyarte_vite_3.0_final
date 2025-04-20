import React, { useState } from "react";
import "./AgregarRecetaTerapia.css";


const AgregarRecetaTerapia = () => {
  const [form, setForm] = useState({
    titulo: "",
    emocion: "",
    beneficios: "",
    ingredientes: "",
    preparacion: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("🌿 Receta terapéutica enviada:", form);
  };

  return (
    <section className="form-receta">
      <h2>Agregar Receta Terapéutica</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="titulo" placeholder="Título sanador" onChange={handleChange} />
        <input type="text" name="emocion" placeholder="Emoción asociada" onChange={handleChange} />
        <textarea name="beneficios" placeholder="Beneficios terapéuticos" onChange={handleChange} />
        <textarea name="ingredientes" placeholder="Ingredientes" onChange={handleChange} />
        <textarea name="preparacion" placeholder="Paso a paso" onChange={handleChange} />
        <button type="submit">Guardar Receta</button>
      </form>
    </section>
  );
};

export default AgregarRecetaTerapia;
