// src/pages/Recetas/AdminRecetas/EditarRecetaGeneral.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./EditarRecetaGeneral.css";

const EditarRecetaGeneral = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [receta, setReceta] = useState({
    titulo: "",
    descripcion: "",
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
  });

  useEffect(() => {
    const fetchReceta = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/recetas/${id}`);
        const data = await response.json();
        setReceta(data);
      } catch (error) {
        console.error("❌ Error al cargar la receta:", error);
      }
    };
    fetchReceta();
  }, [id]);

  const handleChange = (e) => {
    setReceta({ ...receta, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/recetas/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(receta),
      });

      if (response.ok) {
        alert("✅ Receta actualizada con éxito!");
        navigate("/recetas");
      } else {
        alert("⚠️ Error al actualizar la receta.");
      }
    } catch (error) {
      console.error("❌ Error en la solicitud:", error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("¿Seguro que deseas eliminar esta receta?")) {
      try {
        const response = await fetch(`http://localhost:5000/api/recetas/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          alert("🗑️ Receta eliminada con éxito!");
          navigate("/recetas");
        } else {
          alert("⚠️ Error al eliminar la receta.");
        }
      } catch (error) {
        console.error("❌ Error en la eliminación:", error);
      }
    }
  };

  return (
    <div className="admin-container">
      <h2 className="titulo-editar">✏️ Editar Receta</h2>
      <form onSubmit={handleSubmit} className="formulario-editar">
        <div className="columnas">
          <div className="columna">
            <label>Título:</label>
            <input type="text" name="titulo" value={receta.titulo} onChange={handleChange} required />

            <label>Descripción:</label>
            <textarea name="descripcion" value={receta.descripcion} onChange={handleChange} required />

            <label>Ingredientes:</label>
            <textarea name="ingredientes" value={receta.ingredientes} onChange={handleChange} required />

            <label>Preparación:</label>
            <textarea name="preparacion" value={receta.preparacion} onChange={handleChange} required />

            <label>Categoría:</label>
            <input type="text" name="categoria" value={receta.categoria} onChange={handleChange} required />

            <label>Nivel de dificultad:</label>
            <select name="nivel_dificultad" value={receta.nivel_dificultad} onChange={handleChange}>
              <option value="Fácil">Fácil</option>
              <option value="Media">Media</option>
              <option value="Difícil">Difícil</option>
            </select>

            <label>Tiempo de preparación (min):</label>
            <input type="number" name="tiempo_preparacion" value={receta.tiempo_preparacion} onChange={handleChange} required />

            <label>Porciones:</label>
            <input type="number" name="porciones" value={receta.porciones} onChange={handleChange} required />
          </div>

          <div className="columna">
            <label>Imagen URL:</label>
            <input type="text" name="imagen" value={receta.imagen} onChange={handleChange} />
            {receta.imagen && <img src={receta.imagen} alt="Vista previa" className="vista-previa" />}

            <label>Video URL:</label>
            <input type="text" name="video" value={receta.video} onChange={handleChange} />
            {receta.video && (
              <iframe
                width="100%"
                height="200"
                src={receta.video}
                title="Video"
                className="vista-previa"
              ></iframe>
            )}

            <label>Audio URL:</label>
            <input type="text" name="audio" value={receta.audio} onChange={handleChange} />

            <label>Enlace YouTube:</label>
            <input type="text" name="youtube_link" value={receta.youtube_link} onChange={handleChange} />
          </div>
        </div>

        <div className="botones">
          <button type="submit" className="btn-guardar">Guardar Cambios</button>
          <button type="button" className="btn-eliminar" onClick={handleDelete}>Eliminar Receta</button>
          <button type="button" className="btn-cancelar" onClick={() => navigate("/recetas")}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default EditarRecetaGeneral;
