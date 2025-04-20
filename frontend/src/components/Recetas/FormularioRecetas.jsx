import React, { useState } from "react";
import "./FormularioRecetas.css";

const FormularioRecetas = () => {
  const [receta, setReceta] = useState({
    titulo: "",
    descripcion: "",
    descripcion_larga: "",
    ingredientes: "",
    preparacion: "",
    imagen: "",
    video: "",
    audio: "",
    youtube_link: "",
    categoria: "",
    nivel_dificultad: "Fácil",
    tiempo_preparacion: "",
    porciones: "",
    autor: "Anónimo",
    calificacion: 5,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setReceta({ ...receta, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/recetas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(receta),
      });

      if (response.ok) {
        alert("✅ Receta guardada con éxito!");
        setReceta({
          titulo: "",
          descripcion: "",
          descripcion_larga: "",
          ingredientes: "",
          preparacion: "",
          imagen: "",
          video: "",
          audio: "",
          youtube_link: "",
          categoria: "",
          nivel_dificultad: "Fácil",
          tiempo_preparacion: "",
          porciones: "",
          autor: "Anónimo",
          calificacion: 5,
        });
      } else {
        alert("⚠️ Error al guardar la receta.");
      }
    } catch (error) {
      console.error("❌ Error en la solicitud:", error);
      alert("❌ Hubo un problema al conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="formulario-recetas">
      <h2>🍲 Agregar Nueva Receta</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Título:</label>
          <input
            type="text"
            name="titulo"
            placeholder="Ej: Brownie de Chocolate"
            value={receta.titulo}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Descripción Corta:</label>
          <textarea
            name="descripcion"
            placeholder="Un resumen breve de la receta..."
            value={receta.descripcion}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Descripción Larga:</label>
          <textarea
            name="descripcion_larga"
            placeholder="Historia o detalle especial del plato..."
            value={receta.descripcion_larga}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Ingredientes:</label>
          <textarea
            name="ingredientes"
            placeholder="Ej: Harina, huevos, cacao..."
            value={receta.ingredientes}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Preparación:</label>
          <textarea
            name="preparacion"
            placeholder="Paso a paso para preparar la receta..."
            value={receta.preparacion}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Imagen (nombre del archivo):</label>
          <input
            type="text"
            name="imagen"
            placeholder="Ej: brownie.jpg"
            value={receta.imagen}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Video (opcional):</label>
          <input
            type="text"
            name="video"
            value={receta.video}
            onChange={handleChange}
            placeholder="Ruta del video"
          />
        </div>

        <div className="form-group">
          <label>Audio (opcional):</label>
          <input
            type="text"
            name="audio"
            value={receta.audio}
            onChange={handleChange}
            placeholder="Ruta del audio"
          />
        </div>

        <div className="form-group">
          <label>Enlace de YouTube (opcional):</label>
          <input
            type="text"
            name="youtube_link"
            value={receta.youtube_link}
            onChange={handleChange}
            placeholder="https://youtube.com/..."
          />
        </div>

        <div className="form-group">
          <label>Categoría:</label>
          <input
            type="text"
            name="categoria"
            placeholder="Ej: Postres"
            value={receta.categoria}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Nivel de Dificultad:</label>
          <select
            name="nivel_dificultad"
            value={receta.nivel_dificultad}
            onChange={handleChange}
          >
            <option value="Fácil">Fácil</option>
            <option value="Media">Media</option>
            <option value="Difícil">Difícil</option>
          </select>
        </div>

        <div className="form-group">
          <label>Tiempo de Preparación (min):</label>
          <input
            type="number"
            name="tiempo_preparacion"
            min="1"
            value={receta.tiempo_preparacion}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Porciones:</label>
          <input
            type="number"
            name="porciones"
            min="1"
            value={receta.porciones}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Autor:</label>
          <input
            type="text"
            name="autor"
            value={receta.autor}
            onChange={handleChange}
            placeholder="Ej: Chef Lukas"
          />
        </div>

        <div className="form-group">
          <label>Calificación (1-5):</label>
          <input
            type="number"
            name="calificacion"
            min="1"
            max="5"
            value={receta.calificacion}
            onChange={handleChange}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Guardando..." : "Guardar Receta"}
        </button>
      </form>
    </div>
  );
};

export default FormularioRecetas;
