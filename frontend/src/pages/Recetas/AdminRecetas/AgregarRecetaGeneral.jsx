import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./AgregarRecetaGeneral.css";

const AgregarRecetaGeneral = () => {
  const [receta, setReceta] = useState({
    titulo: "",
    descripcion: "",
    descripcion_larga: "",
    categoria: "",
    tiempo_preparacion: "",
    nivel_dificultad: "",
    ingredientes: "",
    preparacion: "",
    imagen: "",
    video: "",
    audio: "",
    youtube_link: "",
    autor: "Admin",
    calificacion: 5
  });

  const handleChange = (e) => {
    setReceta({ ...receta, [e.target.name]: e.target.value });
  };

  const handleQuillChange = (value, field) => {
    setReceta({ ...receta, [field]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/recetas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(receta),
      });

      if (response.ok) {
        alert("🎉 Receta guardada correctamente");
        setReceta({
          titulo: "",
          descripcion: "",
          descripcion_larga: "",
          categoria: "",
          tiempo_preparacion: "",
          nivel_dificultad: "",
          ingredientes: "",
          preparacion: "",
          imagen: "",
          video: "",
          audio: "",
          youtube_link: "",
          autor: "Admin",
          calificacion: 5
        });
      } else {
        alert("⚠️ Error al guardar la receta.");
      }
    } catch (error) {
      console.error("❌ Error al enviar la receta:", error);
      alert("❌ Ocurrió un error al guardar.");
    }
  };

  return (
    <div className="agregar-receta-general">
      <h2>🍲 Agregar Receta General</h2>
      <form className="formulario-general" onSubmit={handleSubmit}>
        <label>Título:</label>
        <input type="text" name="titulo" value={receta.titulo} onChange={handleChange} required />

        <label>Descripción corta:</label>
        <textarea name="descripcion" value={receta.descripcion} onChange={handleChange} required />

        <label>Descripción larga:</label>
        <textarea name="descripcion_larga" value={receta.descripcion_larga} onChange={handleChange} />

        <label>Categoría:</label>
        <input type="text" name="categoria" value={receta.categoria} onChange={handleChange} required />

        <label>Tiempo de preparación (min):</label>
        <input type="number" name="tiempo_preparacion" value={receta.tiempo_preparacion} onChange={handleChange} required />

        <label>Nivel de dificultad:</label>
        <select name="nivel_dificultad" value={receta.nivel_dificultad} onChange={handleChange} required>
          <option value="">Selecciona</option>
          <option value="Fácil">Fácil</option>
          <option value="Media">Media</option>
          <option value="Difícil">Difícil</option>
        </select>

        <label>Ingredientes:</label>
        <ReactQuill
          theme="snow"
          value={receta.ingredientes}
          onChange={(value) => handleQuillChange(value, "ingredientes")}
        />

        <label>Preparación paso a paso:</label>
        <ReactQuill
          theme="snow"
          value={receta.preparacion}
          onChange={(value) => handleQuillChange(value, "preparacion")}
        />

        <label>URL de imagen:</label>
        <input type="text" name="imagen" value={receta.imagen} onChange={handleChange} />

        <label>Video (URL):</label>
        <input type="text" name="video" value={receta.video} onChange={handleChange} />

        <label>Audio (URL):</label>
        <input type="text" name="audio" value={receta.audio} onChange={handleChange} />

        <label>Enlace a YouTube:</label>
        <input type="text" name="youtube_link" value={receta.youtube_link} onChange={handleChange} />

        <button type="submit" className="btn-general-guardar">Guardar Receta</button>
      </form>
    </div>
  );
};

export default AgregarRecetaGeneral;
