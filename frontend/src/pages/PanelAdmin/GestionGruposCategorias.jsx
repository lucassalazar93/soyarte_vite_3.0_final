// src/pages/PanelAdmin/GestionGruposCategorias.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./GestionGruposCategorias.css";

const GestionGruposCategorias = () => {
  const [grupos, setGrupos] = useState([]);
  const [categorias, setCategorias] = useState([]);

  const [grupoActual, setGrupoActual] = useState({ nombre: "", descripcion: "" });
  const [modoGrupoEdicion, setModoGrupoEdicion] = useState(false);
  const [grupoEditandoId, setGrupoEditandoId] = useState(null);

  const [categoriaActual, setCategoriaActual] = useState({ nombre: "", descripcion: "", grupo_id: "" });
  const [modoCategoriaEdicion, setModoCategoriaEdicion] = useState(false);
  const [categoriaEditandoId, setCategoriaEditandoId] = useState(null);

  useEffect(() => {
    obtenerGrupos();
    obtenerCategorias();
  }, []);

  const obtenerGrupos = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/grupos");
      setGrupos(res.data);
    } catch (err) {
      console.error("❌ Error al obtener grupos:", err);
    }
  };

  const obtenerCategorias = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/categorias");
      setCategorias(res.data);
    } catch (err) {
      console.error("❌ Error al obtener categorías:", err);
    }
  };

  const guardarGrupo = async () => {
    if (!grupoActual.nombre.trim()) return alert("⚠️ El nombre del grupo es obligatorio.");
    try {
      if (modoGrupoEdicion) {
        await axios.put(`http://localhost:5000/api/grupos/${grupoEditandoId}`, grupoActual);
      } else {
        await axios.post("http://localhost:5000/api/grupos", grupoActual);
      }
      setGrupoActual({ nombre: "", descripcion: "" });
      setModoGrupoEdicion(false);
      obtenerGrupos();
    } catch (err) {
      console.error("❌", err);
      alert("❌ No se pudo guardar el grupo.");
    }
  };

  const guardarCategoria = async () => {
    const { nombre, grupo_id } = categoriaActual;
    if (!nombre.trim() || !grupo_id) return alert("⚠️ Nombre y grupo son obligatorios.");
    try {
      if (modoCategoriaEdicion) {
        await axios.put(`http://localhost:5000/api/categorias/${categoriaEditandoId}`, categoriaActual);
      } else {
        await axios.post("http://localhost:5000/api/categorias", categoriaActual);
      }
      setCategoriaActual({ nombre: "", descripcion: "", grupo_id: "" });
      setModoCategoriaEdicion(false);
      obtenerCategorias();
    } catch (err) {
      console.error("❌", err);
      alert("❌ No se pudo guardar la categoría.");
    }
  };

  const editarGrupo = (grupo) => {
    setModoGrupoEdicion(true);
    setGrupoEditandoId(grupo.grupo_id);
    setGrupoActual({ nombre: grupo.nombre, descripcion: grupo.descripcion });
  };

  const editarCategoria = (cat) => {
    setModoCategoriaEdicion(true);
    setCategoriaEditandoId(cat.categoria_id);
    setCategoriaActual({
      nombre: cat.nombre,
      descripcion: cat.descripcion,
      grupo_id: cat.grupo_id,
    });
  };

  const eliminarGrupo = async (id) => {
    if (window.confirm("¿Eliminar este grupo?")) {
      try {
        await axios.delete(`http://localhost:5000/api/grupos/${id}`);
        obtenerGrupos();
      } catch (err) {
        console.error("❌", err);
      }
    }
  };

  const eliminarCategoria = async (id) => {
    if (window.confirm("¿Eliminar esta categoría?")) {
      try {
        await axios.delete(`http://localhost:5000/api/categorias/${id}`);
        obtenerCategorias();
      } catch (err) {
        console.error("❌", err);
      }
    }
  };

  return (
    <section className="admin-panel-gc">
      <h1 className="titulo-seccion">📁 Panel de Grupos y Categorías</h1>

      <div className="panel-grilla">
        {/* Grupos */}
        <div className="panel-col">
          <h2>👩‍👧‍👦 Grupos</h2>
          <div className="panel-lista scroll-panel">
            {grupos.map((g) => {
              const cantidad = categorias.filter((c) => c.grupo_id === g.grupo_id).length;
              return (
                <div key={g.grupo_id} className="card-item">
                  <div className="card-header">
                    <span className="nombre">{g.nombre}</span>
                    <div className="acciones">
                      <i className="fas fa-pen" title="Editar grupo" onClick={() => editarGrupo(g)}></i>
                      <i className="fas fa-trash" title="Eliminar grupo" onClick={() => eliminarGrupo(g.grupo_id)}></i>
                    </div>
                  </div>
                  <p className="descripcion">{g.descripcion}</p>
                  <div className="badge">{cantidad} categorías</div>
                </div>
              );
            })}
          </div>

          <div className="formulario">
            <h3>{modoGrupoEdicion ? "✏️ Editar Grupo" : "➕ Crear Grupo"}</h3>
            <input
              type="text"
              placeholder="Nombre del grupo"
              value={grupoActual.nombre}
              onChange={(e) => setGrupoActual({ ...grupoActual, nombre: e.target.value })}
            />
            <input
              type="text"
              placeholder="Descripción"
              value={grupoActual.descripcion}
              onChange={(e) => setGrupoActual({ ...grupoActual, descripcion: e.target.value })}
            />
            <button onClick={guardarGrupo}>Guardar Grupo</button>
          </div>
        </div>

        {/* Categorías */}
        <div className="panel-col">
          <h2>📂 Categorías</h2>
          <div className="panel-lista scroll-panel">
            {categorias.map((cat) => {
              const grupo = grupos.find((g) => g.grupo_id === cat.grupo_id);
              return (
                <div key={cat.categoria_id} className="card-item">
                  <div className="card-header">
                    <span className="nombre">
                      {cat.nombre} <small>({grupo?.nombre || "Sin grupo"})</small>
                    </span>
                    <div className="acciones">
                      <i className="fas fa-pen" title="Editar categoría" onClick={() => editarCategoria(cat)}></i>
                      <i className="fas fa-trash" title="Eliminar categoría" onClick={() => eliminarCategoria(cat.categoria_id)}></i>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="formulario">
            <h3>{modoCategoriaEdicion ? "✏️ Editar Categoría" : "➕ Crear Categoría"}</h3>
            <input
              type="text"
              placeholder="Nombre"
              value={categoriaActual.nombre}
              onChange={(e) => setCategoriaActual({ ...categoriaActual, nombre: e.target.value })}
            />
            <input
              type="text"
              placeholder="Descripción"
              value={categoriaActual.descripcion}
              onChange={(e) => setCategoriaActual({ ...categoriaActual, descripcion: e.target.value })}
            />
            <select
              value={categoriaActual.grupo_id}
              onChange={(e) => setCategoriaActual({ ...categoriaActual, grupo_id: e.target.value })}
            >
              <option value="">Selecciona un grupo</option>
              {grupos.map((g) => (
                <option key={g.grupo_id} value={g.grupo_id}>
                  {g.nombre}
                </option>
              ))}
            </select>
            <button onClick={guardarCategoria}>Guardar Categoría</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GestionGruposCategorias;
