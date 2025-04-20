import React, { useState, useEffect } from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import BASE_URL from "../../BASE_URL";
import IngredienteInput from "../../components/Recetas/IngredienteInput";
import "./RecetaForm.css";

const RecetaForm = ({ receta = {}, setReceta, modoEdicion, recetaId, cerrarModal, recargar }) => {
  const [enviando, setEnviando] = useState(false);
  const [previewImagen, setPreviewImagen] = useState("");
  const [grupos, setGrupos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriasFiltradas, setCategoriasFiltradas] = useState([]);
  const [utensilios, setUtensilios] = useState([]);
  const [utensiliosSeleccionados, setUtensiliosSeleccionados] = useState([]);
  const [pasos, setPasos] = useState([{ descripcion: "", tiempo: "", imagen: null }]);
  const [ingredientesLista, setIngredientesLista] = useState([]);

  useEffect(() => {
    if (receta?.imagen && typeof receta.imagen === "string") {
      setPreviewImagen(`${BASE_URL}${receta.imagen}`);
    }

    fetch(`${BASE_URL}/api/grupos/recetas`).then(res => res.json()).then(setGrupos);
    fetch(`${BASE_URL}/api/categorias/recetas`).then(res => res.json()).then(setCategorias);
    fetch(`${BASE_URL}/api/utensilios`).then(res => res.json()).then(setUtensilios);

    if (receta.utensilios_ids) setUtensiliosSeleccionados(receta.utensilios_ids);

    if (receta.ingredientes) {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = receta.ingredientes;
      const items = Array.from(tempDiv.querySelectorAll("li")).map(li => li.textContent.trim());
      setIngredientesLista(items);
    }
  }, [receta]);

  useEffect(() => {
    if (receta.grupo_id) {
      const filtradas = categorias.filter(c => c.grupo_id === parseInt(receta.grupo_id));
      setCategoriasFiltradas(filtradas);
    } else {
      setCategoriasFiltradas([]);
    }
  }, [receta.grupo_id, categorias]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    setReceta(prev => ({ ...prev, [name]: val }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setReceta(prev => ({ ...prev, imagen: file }));
      setPreviewImagen(URL.createObjectURL(file));
    }
  };

  const toggleUtensilio = (id) => {
    setUtensiliosSeleccionados(prev =>
      prev.includes(id) ? prev.filter(u => u !== id) : [...prev, id]
    );
  };

  const handlePasoChange = (index, field, value) => {
    const nuevosPasos = [...pasos];
    nuevosPasos[index][field] = value;
    setPasos(nuevosPasos);
  };

  const agregarPaso = () => {
    setPasos(prev => [...prev, { descripcion: "", tiempo: "", imagen: null }]);
  };

  const eliminarPaso = (index) => {
    setPasos(prev => prev.filter((_, i) => i !== index));
  };

  const handleGuardar = async () => {
    // ✅ Validación profesional de campos obligatorios
    if (
      !receta.titulo?.trim() ||
      !receta.grupo_id ||
      !receta.categoria_id ||
      !receta.nivel_dificultad?.trim()
    ) {
      alert("❌ Por favor completa los campos obligatorios: título, grupo, categoría y nivel de dificultad.");
      console.log("🧠 Estado actual de receta:", receta);
      return;
    }

    const ingredientesHTML = `<ul>${ingredientesLista.map(i => `<li>${i}</li>`).join("")}</ul>`;
    const recetaConIngredientes = { ...receta, ingredientes: ingredientesHTML };

    const form = new FormData();
    Object.entries(recetaConIngredientes).forEach(([key, value]) => {
      if (value !== undefined && value !== null && !(value instanceof File)) {
        form.append(key, value);
      }
    });

    if (receta.imagen instanceof File) form.append("imagen", receta.imagen);
    utensiliosSeleccionados.forEach(id => form.append("utensilios[]", id));

    pasos.forEach((paso, index) => {
      form.append(`pasos[${index}][numero]`, index + 1);
      form.append(`pasos[${index}][descripcion]`, paso.descripcion);
      form.append(`pasos[${index}][tiempo]`, paso.tiempo);
      if (paso.imagen instanceof File) {
        form.append(`imagen_paso_${index}`, paso.imagen);
      }
    });

    try {
      setEnviando(true);
      const res = await fetch(`${BASE_URL}/api/recetas${modoEdicion ? `/${recetaId}` : ""}`, {
        method: modoEdicion ? "PUT" : "POST",
        body: form,
      });
      const result = await res.json();
      if (result.error) return alert("❌ Error: " + result.error);
      alert("✅ Receta guardada correctamente.");
      cerrarModal();
      recargar();
    } catch (err) {
      console.error("❌ Error al guardar receta:", err);
      alert("❌ Error inesperado al guardar.");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="producto-modal-overlay">
      <div className="producto-modal-contenido">
        <h3>{modoEdicion ? "✏️ Editar Receta" : "➕ Nueva Receta"}</h3>

        <div className="form-scroll">
          <input name="titulo" value={receta.titulo || ""} onChange={handleChange} placeholder="Título de la receta" />
          <input name="autor" value={receta.autor || ""} onChange={handleChange} placeholder="👩‍🍳 Autor o autora de la receta" />
          <textarea name="descripcion" value={receta.descripcion || ""} onChange={handleChange} placeholder="Descripción corta" />
          <SunEditor defaultValue={receta.descripcion_larga || ""} onChange={val => setReceta(prev => ({ ...prev, descripcion_larga: val }))} height="180px" />

          <select name="grupo_id" value={receta.grupo_id || ""} onChange={handleChange}>
            <option value="">Selecciona un grupo</option>
            {grupos.map(g => <option key={g.grupo_id} value={g.grupo_id}>{g.nombre}</option>)}
          </select>

          <select name="categoria_id" value={receta.categoria_id || ""} onChange={handleChange} disabled={!receta.grupo_id}>
            <option value="">Selecciona una categoría</option>
            {categoriasFiltradas.map(c => <option key={c.categoria_id} value={c.categoria_id}>{c.nombre}</option>)}
          </select>

          <input type="number" name="tiempo_preparacion" value={receta.tiempo_preparacion || ""} onChange={handleChange} placeholder="Tiempo (min)" />

          <select name="nivel_dificultad" value={receta.nivel_dificultad || ""} onChange={handleChange}>
            <option value="">Nivel de dificultad</option>
            <option value="Fácil">Fácil</option>
            <option value="Media">Media</option>
            <option value="Difícil">Difícil</option>
          </select>

          <IngredienteInput ingredientes={ingredientesLista} setIngredientes={setIngredientesLista} />

          <label>📖 Preparación:</label>
          <SunEditor defaultValue={receta.preparacion || ""} onChange={val => setReceta(prev => ({ ...prev, preparacion: val }))} height="150px" />

          <input type="text" name="video" value={receta.video || ""} onChange={handleChange} placeholder="Link de video (opcional)" />
          <input type="text" name="audio" value={receta.audio || ""} onChange={handleChange} placeholder="Link de audio (opcional)" />
          <input type="text" name="youtube_link" value={receta.youtube_link || ""} onChange={handleChange} placeholder="Link YouTube (opcional)" />

          <input type="file" accept="image/*" onChange={handleFileChange} />
          {previewImagen && <div className="preview-imagen-contenedor"><img src={previewImagen} alt="Vista previa" className="preview-img" /></div>}

          <div className="switch-contenedor">
            <label>Versión paga</label>
            <label className="switch">
              <input type="checkbox" name="es_paga" checked={receta.es_paga || false} onChange={handleChange} />
              <span className="slider round"></span>
            </label>
          </div>

          <div className="switch-contenedor">
            <label>Bloquear receta</label>
            <label className="switch">
              <input type="checkbox" name="bloqueada" checked={receta.bloqueada || false} onChange={handleChange} />
              <span className="slider round"></span>
            </label>
          </div>

          <div className="utensilios-header">
            <strong>🍴 Utensilios:</strong>
            <p className="contador-utensilios">🧺 Has seleccionado: {utensiliosSeleccionados.length}</p>
          </div>

          <div className="utensilios-grid">
            {utensilios.map((u) => (
              <div key={u.id} className={`card-utensilio ${utensiliosSeleccionados.includes(u.id) ? "selected" : ""}`} onClick={() => toggleUtensilio(u.id)}>
                <div className="utensilio-icono">{u.icono}</div>
                <div className="utensilio-nombre">{u.nombre}</div>
                {utensiliosSeleccionados.includes(u.id) && <div className="utensilio-check">✔</div>}
              </div>
            ))}
          </div>

          <div className="pasos">
            <h4>👣 Paso a paso</h4>
            {pasos.map((paso, i) => (
              <div key={i} className="paso-item">
                <input type="text" placeholder={`Paso ${i + 1}`} value={paso.descripcion} onChange={e => handlePasoChange(i, "descripcion", e.target.value)} />
                <input type="number" placeholder="Tiempo estimado" value={paso.tiempo} onChange={e => handlePasoChange(i, "tiempo", e.target.value)} />
                <input type="file" accept="image/*" onChange={e => handlePasoChange(i, "imagen", e.target.files[0])} />
                <button type="button" onClick={() => eliminarPaso(i)}>🗑️</button>
              </div>
            ))}
            <button type="button" onClick={agregarPaso}>➕ Agregar paso</button>
          </div>
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

export default RecetaForm;
