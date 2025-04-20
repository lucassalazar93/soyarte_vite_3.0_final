import React, { useState, useEffect } from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import axios from "axios";
import "./ProductoForm.css";

const ProductoForm = ({
  formData,
  handleChange,
  guardarProducto,
  cerrarModal,
  modoEdicion,
}) => {
  const [previewImage, setPreviewImage] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [categoriasFiltradas, setCategoriasFiltradas] = useState([]);
  const [grupos, setGrupos] = useState([]);
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5000/api/categorias").then((res) => setCategorias(res.data));
    axios.get("http://localhost:5000/api/grupos").then((res) => setGrupos(res.data));
  }, []);

  useEffect(() => {
    if (modoEdicion && formData.imagen && typeof formData.imagen === "string") {
      setPreviewImage(`http://localhost:5000${formData.imagen}`);
    }
  }, [modoEdicion, formData.imagen]);

  useEffect(() => {
    if (formData.grupo_id) {
      const filtradas = categorias.filter((cat) => cat.grupo_id === parseInt(formData.grupo_id));
      setCategoriasFiltradas(filtradas);
    }
  }, [formData.grupo_id, categorias]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      handleChange({
        target: {
          name: "imagen",
          value: file,
          files: [file],
        },
      });
    }
  };

  const handleGuardar = async () => {
    if (!formData.nombre || !formData.precio || !formData.stock || !formData.categoria_id || !formData.grupo_id) {
      alert("⚠️ Completa todos los campos requeridos.");
      return;
    }

    try {
      setEnviando(true);
      await guardarProducto();
      alert("✅ Producto guardado correctamente.");
    } catch (error) {
      console.error("❌ Error:", error);
      alert("❌ Ocurrió un error al guardar.");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="producto-modal-overlay">
      <div className="producto-modal-contenido">
        <h3>{modoEdicion ? "✏️ Editar Producto" : "➕ Nuevo Producto"}</h3>

        <div className="form-scroll">
          <input
            name="nombre"
            value={formData.nombre || ""}
            onChange={handleChange}
            placeholder="Nombre del producto"
          />

          <input
            name="precio"
            type="number"
            value={formData.precio || ""}
            onChange={handleChange}
            placeholder="Precio"
          />

          <input
            name="stock"
            type="number"
            value={formData.stock || ""}
            onChange={handleChange}
            placeholder="Stock disponible"
          />

          <label>Descripción:</label>
          <SunEditor
            defaultValue={formData.descripcion || ""}
            onChange={(value) => handleChange({ target: { name: "descripcion", value } })}
            height="160px"
          />

          <select
            name="grupo_id"
            value={formData.grupo_id || ""}
            onChange={(e) => {
              handleChange(e);
              const grupoId = parseInt(e.target.value);
              const filtradas = categorias.filter((cat) => cat.grupo_id === grupoId);
              setCategoriasFiltradas(filtradas);
            }}
          >
            <option value="">Selecciona un grupo</option>
            {grupos.map((grupo) => (
              <option key={grupo.grupo_id} value={grupo.grupo_id}>
                {grupo.nombre}
              </option>
            ))}
          </select>

          <select
            name="categoria_id"
            value={formData.categoria_id || ""}
            onChange={handleChange}
            disabled={!formData.grupo_id}
          >
            <option value="">Selecciona una categoría</option>
            {categoriasFiltradas.map((cat) => (
              <option key={cat.categoria_id} value={cat.categoria_id}>
                {cat.nombre}
              </option>
            ))}
          </select>

          <input
            type="file"
            name="imagen"
            accept="image/*"
            onChange={handleFileChange}
          />

          {previewImage && (
            <div className="preview-imagen-contenedor">
              <img src={previewImage} alt="Vista previa" className="preview-img" />
            </div>
          )}

          <select
            name="oferta"
            value={formData.oferta || 0}
            onChange={handleChange}
          >
            <option value={0}>¿Está en oferta? No</option>
            <option value={1}>Sí</option>
          </select>

          <input
            name="precio_oferta"
            type="number"
            value={formData.precio_oferta || ""}
            onChange={handleChange}
            placeholder="Precio con oferta"
          />
        </div>

        <div className="producto-modal-acciones">
          <button onClick={handleGuardar} disabled={enviando}>
            {enviando ? "⏳ Guardando..." : "💾 Guardar"}
          </button>
          <button onClick={cerrarModal}>❌ Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default ProductoForm;
