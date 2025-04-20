// src/components/Register.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaIdCard, FaLock, FaRegEnvelope } from "react-icons/fa";
import SplashScreen from "./SplashScreen";
import "./Register.css";

function Register() {
  const [form, setForm] = useState({
    full_name: "",
    id_number: "",
    email: "",
    confirm_email: "",
    dob_day: "",
    dob_month: "",
    dob_year: "",
    gender: "",
    password: "",
    confirm_password: "",
    role: "usuario",
    admin_code: "",
  });

  const [error, setError] = useState("");
  const [welcomeMessage, setWelcomeMessage] = useState("🌟 Bienvenida, mujer mágica");
  const [mostrarSplash, setMostrarSplash] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setMostrarSplash(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === "full_name") {
      const nombreLimpio = value.trim().split(" ")[0]?.toLowerCase();
      setWelcomeMessage(`🌟 Bienvenida, <i>${nombreLimpio}</i>`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const camposObligatorios = [
      "full_name",
      "id_number",
      "email",
      "confirm_email",
      "dob_day",
      "dob_month",
      "dob_year",
      "gender",
      "password",
      "confirm_password",
    ];

    for (let campo of camposObligatorios) {
      if (!form[campo]) {
        setError("❌ Todos los campos son obligatorios.");
        return;
      }
    }

    if (form.email !== form.confirm_email) {
      setError("❌ Los correos electrónicos no coinciden.");
      return;
    }

    if (form.password !== form.confirm_password) {
      setError("❌ Las contraseñas no coinciden.");
      return;
    }

    const fechaNacimiento = `${form.dob_year.padStart(4, "0")}-${form.dob_month.padStart(2, "0")}-${form.dob_day.padStart(2, "0")}`;

    if (isNaN(Date.parse(fechaNacimiento))) {
      setError("❌ La fecha de nacimiento no es válida.");
      return;
    }

    const formData = {
      full_name: form.full_name.trim(),
      id_number: form.id_number.trim(),
      email: form.email.trim(),
      password: form.password,
      gender: form.gender,
      fecha_nacimiento: fechaNacimiento,
      role: form.role,
    };

    if (form.role === "admin" && form.admin_code.trim() !== "") {
      formData.admin_code = form.admin_code.trim();
    }

    try {
      const response = await fetch("http://localhost:5000/api/admin/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        alert("✨ Registro exitoso. Bienvenida a tu espacio sagrado.");
        navigate("/login");
      } else {
        setError(result.error || "Error del servidor.");
      }
    } catch (err) {
      console.error("❌ Error de conexión:", err);
      setError("❌ Error de conexión con el servidor.");
    }
  };

  if (mostrarSplash) return <SplashScreen />;

  return (
    <div className="register-container">
      <div className="register-left">
        <div className="welcome-box">
          <h2>✨ Bienvenida a tu espacio sagrado</h2>
          <p>“Regístrate para descubrir el arte de cuidarte desde adentro.”</p>
          <span>“Soy arte, soy raíz, soy luz.”</span>
        </div>
      </div>

      <div className="register-right">
        <form className="form-box" onSubmit={handleSubmit}>
          <h2>Crear Cuenta</h2>
          <p className="saludo-form" dangerouslySetInnerHTML={{ __html: welcomeMessage }}></p>
          {error && <div className="error-message">{error}</div>}

          <div className="input-group">
            <FaUser />
            <input name="full_name" placeholder="¿Cómo te llamamos con cariño?" onChange={handleChange} />
          </div>

          <div className="input-group">
            <FaIdCard />
            <input name="id_number" placeholder="Tu número de identidad" onChange={handleChange} />
          </div>

          <div className="input-group">
            <FaRegEnvelope />
            <input type="email" name="email" placeholder="Tu email" onChange={handleChange} />
          </div>

          <div className="input-group">
            <FaRegEnvelope />
            <input type="email" name="confirm_email" placeholder="Confirma tu email" onChange={handleChange} />
          </div>

          <div className="dob-row">
            <input name="dob_day" placeholder="Día" onChange={handleChange} />
            <input name="dob_month" placeholder="Mes" onChange={handleChange} />
            <input name="dob_year" placeholder="Año" onChange={handleChange} />
          </div>

          <select name="gender" value={form.gender} onChange={handleChange} className="role-select">
            <option value="">Selecciona tu género</option>
            <option value="femenino">Femenino</option>
            <option value="masculino">Masculino</option>
            <option value="otro">Otro</option>
          </select>

          <div className="input-group">
            <FaLock />
            <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} />
          </div>

          <div className="input-group">
            <FaLock />
            <input type="password" name="confirm_password" placeholder="Confirma contraseña" onChange={handleChange} />
          </div>

          <select name="role" value={form.role} onChange={handleChange} className="role-select">
            <option value="usuario">👤 Usuario</option>
            <option value="admin">🔑 Administradora</option>
          </select>

          {form.role === "admin" && (
            <div className="input-group">
              <FaLock />
              <input name="admin_code" placeholder="Código secreto" onChange={handleChange} />
            </div>
          )}

          <button className="register-button" type="submit">Registrar</button>

          <div className="login-link">
            ¿Ya tienes cuenta? <span onClick={() => navigate("/login")}>Inicia sesión aquí</span>
          </div>

          <div className="guest-access">
            🕊️ ¿Solo quieres explorar? <a className="invitada-link" href="/recetas">Ingresa como invitada</a>
          </div>

          <p className="mini-historia">
            “Una vez, una mujer decidió cuidarse… y su mundo cambió.”<br />
            <strong>¡Tú puedes ser esa mujer! 🌸</strong>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
