import React from "react";
import { Link } from "react-router-dom";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  return (
    <div className="admin-container">
      <h2>🛠️ Panel de Administración General 🛠️</h2>

      {/* 🔧 BOTONES ORIGINALES */}
      <div className="admin-section">
        <h3>🔍 Accesos Directos</h3>
        <div className="admin-options">
          <Link to="/admin/inventario" className="admin-card">
            <i className="fas fa-box-open"></i>
            <span>Inventario</span>
          </Link>
          <Link to="/admin/usuarios" className="admin-card">
            <i className="fas fa-users-cog"></i>
            <span>Usuarios</span>
          </Link>
          <Link to="/admin/categorias" className="admin-card">
            <i className="fas fa-layer-group"></i>
            <span>Grupos & Categorías</span>
          </Link>
        </div>
      </div>

      {/* 📊 GESTIÓN DE VENTAS */}
      <div className="admin-section">
        <h3>📊 Gestión de Ventas y Pedidos</h3>
        <div className="admin-options">
          <Link to="/admin/resumen" className="admin-card">
            <i className="fas fa-chart-line"></i>
            <span>Resumen de Ventas</span>
          </Link>
          <Link to="/admin/pedidos-pendientes" className="admin-card">
            <i className="fas fa-clipboard-list"></i>
            <span>Pedidos Pendientes</span>
            <span className="badge">2</span>
          </Link>
          <Link to="/admin/pedidos-enviados" className="admin-card">
            <i className="fas fa-truck"></i>
            <span>Pedidos Enviados</span>
          </Link>
          <Link to="/admin/reportes" className="admin-card">
            <i className="fas fa-file-invoice-dollar"></i>
            <span>Reportes y Finanzas</span>
          </Link>
        </div>
      </div>

      {/* 👥 USUARIOS Y SOPORTE */}
      <div className="admin-section">
        <h3>👥 Usuarios y Soporte</h3>
        <div className="admin-options">
          <Link to="/admin/usuarios-activos" className="admin-card">
            <i className="fas fa-user-check"></i>
            <span>Usuarios Activos</span>
          </Link>
          <Link to="/admin/notificaciones" className="admin-card">
            <i className="fas fa-bell"></i>
            <span>Notificaciones</span>
            <span className="badge">5</span>
          </Link>
          <Link to="/admin/soporte" className="admin-card">
            <i className="fas fa-headset"></i>
            <span>Mensajes / Soporte</span>
          </Link>
          <Link to="/admin/devoluciones" className="admin-card">
            <i className="fas fa-undo-alt"></i>
            <span>Devoluciones</span>
          </Link>
        </div>
      </div>

      {/* 📝 CONTENIDO ADMIN */}
      <div className="admin-section">
        <h3>📝 Contenido Administrativo</h3>
        <div className="admin-options">
          <Link to="/admin/recetas" className="admin-card">
            <i className="fas fa-utensils"></i>
            <span>Recetas (Admin)</span>
          </Link>

          {/* 🔥 Nuevo botón para agregar receta
          <Link to="/admin/recetas/nueva" className="admin-card special">
            <i className="fas fa-plus-circle"></i>
            <span>Agregar Receta</span>
          </Link>*/}

          <Link to="/admin/terapia" className="admin-card">
            <i className="fas fa-heart"></i>
            <span>Terapia Culinaria</span>
          </Link>
          <Link to="/admin/mujeres" className="admin-card">
            <i className="fas fa-female"></i>
            <span>Mujeres (Admin)</span>
          </Link>
          <Link to="/admin/promociones" className="admin-card">
            <i className="fas fa-tags"></i>
            <span>Promociones</span>
          </Link>
        </div>
      </div>

      {/* ⚙️ CONFIGURACIÓN */}
      <div className="admin-section">
        <h3>⚙️ Configuración General</h3>
        <div className="admin-options">
          <Link to="/admin/configuracion" className="admin-card">
            <i className="fas fa-cogs"></i>
            <span>Configuración del sitio</span>
          </Link>
          <Link to="/admin/pagos-envios" className="admin-card">
            <i className="fas fa-credit-card"></i>
            <span>Pago y Envío</span>
          </Link>
          <Link to="/admin/permisos" className="admin-card">
            <i className="fas fa-user-shield"></i>
            <span>Permisos y Roles</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
