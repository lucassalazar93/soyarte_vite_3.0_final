// src/pages/Admin/VistaRedSanadora.jsx
import React, { useEffect, useState } from "react";
import BASE_URL from "../../BASE_URL";
import "./VistaRedSanadora.css";

const VistaRedSanadora = () => {
  const [registros, setRegistros] = useState([]);
  const [filtro, setFiltro] = useState("");

  useEffect(() => {
    obtenerRegistros();
  }, []);

  const obtenerRegistros = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/red-sanadora`);
      const data = await res.json();
      setRegistros(data);
    } catch (err) {
      console.error("❌ Error al cargar registros de Red Sanadora:", err);
    }
  };

  const actualizarEstado = async (id, nuevoEstado) => {
    try {
      await fetch(`${BASE_URL}/api/red-sanadora/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ estado: nuevoEstado }),
      });
      setRegistros((prev) =>
        prev.map((r) => (r.id === id ? { ...r, estado: nuevoEstado } : r))
      );
    } catch (err) {
      console.error("❌ Error al actualizar estado:", err);
    }
  };

  const registrosFiltrados = registros.filter((registro) =>
    [registro.nombre, registro.correo, registro.telefono, registro.estado]
      .join(" ")
      .toLowerCase()
      .includes(filtro.toLowerCase())
  );

  return (
    <div className="vista-red-sanadora">
      <h2>🌸 Red Sanadora - Contactos Recibidos</h2>

      <div className="filtro-red">
        <input
          type="text"
          placeholder="Buscar por nombre, email, WhatsApp o estado"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        />
      </div>

      <table className="tabla-red">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>WhatsApp</th>
            <th>Fecha</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {registrosFiltrados.length === 0 ? (
            <tr>
              <td colSpan="6" className="no-datos">No se encontraron registros.</td>
            </tr>
          ) : (
            registrosFiltrados.map((registro) => (
              <tr key={registro.id}>
                <td>{registro.id}</td>
                <td>{registro.nombre}</td>
                <td>{registro.correo || "-"}</td>
                <td>{registro.telefono || "-"}</td>
                <td>{new Date(registro.fecha).toLocaleString()}</td>
                <td>
                  <select
                    value={registro.estado || "Pendiente"}
                    onChange={(e) => actualizarEstado(registro.id, e.target.value)}
                    className={`estado ${registro.estado?.toLowerCase().replace(/\s/g, "-")}`}
                  >
                    <option value="Pendiente">Pendiente</option>
                    <option value="En proceso">En proceso</option>
                    <option value="Contactado">Contactado</option>
                    <option value="Finalizado">Finalizado</option>
                  </select>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default VistaRedSanadora;
