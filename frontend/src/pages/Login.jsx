import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaLock, FaRegEnvelope } from "react-icons/fa";
import SplashScreen from "./SplashScreen";
import { useAuth } from "../context/AuthContext"; // ✅
import "./Login.css";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [mostrarSplash, setMostrarSplash] = useState(true);
  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ usar AuthContext

  useEffect(() => {
    const timer = setTimeout(() => setMostrarSplash(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      setError("❌ Todos los campos son obligatorios.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (response.ok) {
        login(result.user); // ✅ guardar en contexto

        if (result.user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/recetas");
        }
      } else {
        setError(result.error || "Credenciales incorrectas.");
      }
    } catch (err) {
      console.error("❌ Error de conexión:", err);
      setError("❌ Error al conectar con el servidor.");
    }
  };

  if (mostrarSplash) return <SplashScreen />;

  return (
    <div className="login-page">
      <div className="left-panel">
        <div className="welcome-box">
          <h2>🌸 Bienvenida de nuevo</h2>
          <p>“Inicia sesión para seguir creando tu versión más auténtica.”</p>
          <span>“Soy arte, soy fuerza, soy historia.”</span>
        </div>
      </div>

      <div className="right-panel">
        <form className="form-login" onSubmit={handleSubmit}>
          <h2>Iniciar Sesión</h2>

          {error && <div className="error-message">{error}</div>}

          <div className="input-group">
            <FaRegEnvelope />
            <input
              type="email"
              name="email"
              placeholder="Correo mágico"
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <FaLock />
            <input
              type="password"
              name="password"
              placeholder="Contraseña secreta"
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="login-button">Entrar</button>

          <div className="login-options">
            <span onClick={() => navigate("/register")}>
              ¿Aún no tienes cuenta? Regístrate aquí
            </span>
            <a className="invitada-link" href="/recetas">🕊️ Ingresa como invitada</a>
          </div>

          <p className="mini-historia" style={{ textAlign: "center", marginTop: "1rem", fontStyle: "italic", fontSize: "0.9rem" }}>
            “Cada vez que entras aquí, estás apostando por ti.”<br />
            <strong>¡Bienvenida al arte de ser tú! 🎨</strong>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
