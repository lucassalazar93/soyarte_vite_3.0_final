import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./VistaInventario.css"; // Puedes usar los mismos estilos

const VistaUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [filtroNombre, setFiltroNombre] = useState("");
  const [filtroRol, setFiltroRol] = useState("");
  const [mostrarModal, setMostrarModal] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [editandoId, setEditandoId] = useState(null);
  const [formData, setFormData] = useState({});

  // ✅ Obtener usuarios y administradores
  const obtenerUsuarios = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/usuarios");
      const data = await res.json();
      if (!Array.isArray(data)) throw new Error("Respuesta no válida");
      setUsuarios(data);
    } catch (err) {
      console.error("❌ Error al cargar usuarios:", err);
      setUsuarios([]);
    }
  };

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  // ✅ Modal edición
  const abrirModalEdicion = (usuario) => {
    if (usuario.role !== "usuario") {
      alert("Solo puedes editar usuarios normales desde aquí.");
      return;
    }
    setModoEdicion(true);
    setEditandoId(usuario.id);
    setFormData({ ...usuario });
    setMostrarModal(true);
  };

  // ✅ Modal nuevo
  const abrirModalNuevo = () => {
    setModoEdicion(false);
    setFormData({});
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setEditandoId(null);
    setFormData({});
  };

  // ✅ Guardar (crear o editar usuario)
  const guardarUsuario = async () => {
    if (formData.role !== "usuario") {
      alert("Solo puedes guardar usuarios normales desde aquí.");
      return;
    }

    const metodo = modoEdicion ? "PUT" : "POST";
    const url = modoEdicion
      ? `http://localhost:5000/api/usuarios/${editandoId}`
      : "http://localhost:5000/api/usuarios";

    try {
      const res = await fetch(url, {
        method: metodo,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      if (result.error) return alert(result.error);
      cerrarModal();
      obtenerUsuarios();
    } catch (err) {
      console.error("❌ Error al guardar usuario:", err);
    }
  };

  // ✅ Eliminar (solo usuarios)
  const eliminarUsuario = async (id, role) => {
    if (role !== "usuario") {
      alert("No puedes eliminar administradores desde esta vista.");
      return;
    }
    if (!window.confirm("¿Eliminar este usuario?")) return;

    try {
      await fetch(`http://localhost:5000/api/usuarios/${id}`, {
        method: "DELETE",
      });
      obtenerUsuarios();
    } catch (err) {
      console.error("❌ Error al eliminar usuario:", err);
    }
  };

  // ✅ Cambios en formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Exportar
  const exportarExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(usuarios);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Usuarios");
    XLSX.writeFile(workbook, "usuarios_soy_arte.xlsx");
  };

  const exportarPDF = () => {
    const tabla = document.querySelector(".tabla-inventario");
    html2canvas(tabla).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
      pdf.save("usuarios_soy_arte.pdf");
    });
  };

  // ✅ Filtrar
  const usuariosFiltrados = usuarios.filter((u) => {
    const matchNombre = u.nombre_completo?.toLowerCase().includes(filtroNombre.toLowerCase());
    const matchRol = filtroRol ? u.role === filtroRol : true;
    return matchNombre && matchRol;
  });

  return (
    <div className="inventario-panel">
      <h2>👥 Gestión de Usuarios</h2>

      <div className="acciones-inventario">
        <button className="btn-agregar" onClick={abrirModalNuevo}>➕ Agregar usuario</button>
        <button className="btn-exportar" onClick={exportarExcel}>📊 Exportar a Excel</button>
        <button className="btn-exportar" onClick={exportarPDF}>📄 Exportar a PDF</button>
      </div>

      <div className="filtros-contenedor">
        <input
          type="text"
          placeholder="🔍 Buscar por nombre..."
          value={filtroNombre}
          onChange={(e) => setFiltroNombre(e.target.value)}
        />
        <select value={filtroRol} onChange={(e) => setFiltroRol(e.target.value)}>
          <option value="">Rol: Todos</option>
          <option value="usuario">Usuario</option>
          <option value="admin">Administrador</option>
        </select>
      </div>

      <table className="tabla-inventario">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Género</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuariosFiltrados.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.nombre_completo}</td>
              <td>{u.email}</td>
              <td>{u.genero || "-"}</td>
              <td>{u.role}</td>
              <td>
                <button className="btn-editar" onClick={() => abrirModalEdicion(u)}>✏️</button>
                <button className="btn-borrar" onClick={() => eliminarUsuario(u.id, u.role)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {mostrarModal && (
        <div className="modal-overlay">
          <div className="modal-contenido">
            <h3>{modoEdicion ? "✏️ Editar Usuario" : "➕ Nuevo Usuario"}</h3>
            <input name="nombre_completo" value={formData.nombre_completo || ""} onChange={handleChange} placeholder="Nombre completo" />
            <input name="email" value={formData.email || ""} onChange={handleChange} placeholder="Email" />
            <input name="password" value={formData.password || ""} onChange={handleChange} placeholder="Contraseña" type="password" />
            <input name="cedula" value={formData.cedula || ""} onChange={handleChange} placeholder="Cédula" />
            <input name="genero" value={formData.genero || ""} onChange={handleChange} placeholder="Género" />
            <input name="fecha_nacimiento" value={formData.fecha_nacimiento || ""} onChange={handleChange} type="date" />
            <select name="role" value={formData.role || "usuario"} onChange={handleChange}>
              <option value="usuario">Usuario</option>
              <option value="admin">Administrador</option>
            </select>
            <div className="modal-acciones">
              <button className="btn-guardar" onClick={guardarUsuario}>💾 Guardar</button>
              <button className="btn-cancelar" onClick={cerrarModal}>❌ Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VistaUsuarios;
