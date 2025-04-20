import React from "react";

const UsuarioForm = ({
  formData,
  handleChange,
  guardarUsuario,
  cerrarModal,
  modoEdicion,
}) => {
  return (
    <div className="modal-overlay">
      <div className="modal-contenido">
        <h3>{modoEdicion ? "✏️ Editar Usuaria" : "👩‍💻 Nueva Usuaria"}</h3>

        <input
          name="nombre_completo"
          value={formData.nombre_completo || ""}
          onChange={handleChange}
          placeholder="Nombre completo"
        />

        <input
          name="email"
          type="email"
          value={formData.email || ""}
          onChange={handleChange}
          placeholder="Correo electrónico"
        />

        <input
          name="password"
          type="password"
          value={formData.password || ""}
          onChange={handleChange}
          placeholder="Contraseña"
        />

        <input
          name="cedula"
          value={formData.cedula || ""}
          onChange={handleChange}
          placeholder="Cédula"
        />

        <select
          name="genero"
          value={formData.genero || ""}
          onChange={handleChange}
        >
          <option value="">Seleccionar género</option>
          <option value="femenino">Femenino</option>
          <option value="masculino">Masculino</option>
          <option value="otro">Otro</option>
        </select>

        <input
          name="fecha_nacimiento"
          type="date"
          value={formData.fecha_nacimiento || ""}
          onChange={handleChange}
        />

        <select
          name="role"
          value={formData.role || "usuario"}
          onChange={handleChange}
        >
          <option value="usuario">Usuario</option>
          <option value="admin">Administrador</option>
        </select>

        <div className="modal-acciones">
          <button className="btn-guardar" onClick={guardarUsuario}>
            💾 Guardar
          </button>
          <button className="btn-cancelar" onClick={cerrarModal}>
            ❌ Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default UsuarioForm;
