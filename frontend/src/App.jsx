import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

// 🌐 Layout general
import Navbar from "./components/Navbar/Navbar";
import NavbarTienda from "./components/Navbar/NavbarTienda";
import NavbarRecetas from "./components/Navbar/NavbarRecetas";
import Footer from "./components/Footer/Footer";
import SocialFloating from "./components/SocialFloating/SocialFloating";
import Munequita from "./components/UI/Munequita"; // ✅ NUEVO

// 🏠 Páginas públicas
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Recuperar from "./pages/Recuperar";
import BlogPage from "./pages/BlogPage";

// 🛍️ Tienda
import Tienda from "./pages/Tienda";
import Coleccion from "./pages/Coleccion";
import ColeccionOferta from "./pages/ColeccionOferta";
import ColeccionGrupo from "./pages/ColeccionGrupo";
import ProductoDetalle from "./pages/ProductoDetalle";

// 🛒 Carrito
import Carrito from "./components/Carrito/Carrito";
import Checkout from "./components/Carrito/Checkout";
import CheckoutGracias from "./pages/CheckoutGracias";

// 👩 Mujeres
import MujeresInspiran from "./components/Mujeres/MujeresInspiran";
import MujerDetalle from "./components/Mujeres/MujerDetalle";

// 🍽️ Recetas
import RecetasPage from "./pages/Recetas/RecetasPage";
import RecetaDetalle from "./pages/Recetas/RecetaDetalle";
import RecetasCocinadas from "./pages/Recetas/RecetasCocinadas";
import MiRecetario from "./pages/Recetas/MiRecetario";
import ColeccionCategoria from "./pages/Recetas/ColeccionCategoria";

// 🧘 Terapia
import TerapiaCulinaria from "./pages/TerapiaCulinaria/TerapiaCulinaria";
import RecetasSanadorasPage from "./pages/TerapiaCulinaria/RecetasSanadorasPage";
import DiarioCulinario from "./pages/TerapiaCulinaria/DiarioCulinario";

// 🔐 Admin
import AdminDashboard from "./pages/PanelAdmin/AdminDashboard";
import VistaInventario from "./pages/PanelAdmin/VistaInventario";
import VistaUsuarios from "./pages/PanelAdmin/VistaUsuarios";
import GestionGruposCategorias from "./pages/PanelAdmin/GestionGruposCategorias";
import VistaRecetas from "./pages/Recetas/AdminRecetas/VistaRecetas";
import AgregarRecetaGeneral from "./pages/Recetas/AdminRecetas/AgregarRecetaGeneral";
import EditarRecetaGeneral from "./pages/Recetas/AdminRecetas/EditarRecetaGeneral";
import AgregarRecetaTerapia from "./pages/AdminTerapia/AgregarRecetaTerapia";

// 🔒 Rutas protegidas
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  const location = useLocation();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  // 🔒 Ocultar layout en login y register
  const ocultarLayout = ["/login", "/register"].includes(location.pathname);
  const esTienda = location.pathname.startsWith("/tienda");

  // 🍽️ Detectar rutas de recetas (incluye recetario y colecciones)
  const esRutaRecetas =
    location.pathname.startsWith("/recetas") ||
    location.pathname.startsWith("/mi-recetario") ||
    location.pathname.startsWith("/coleccion-categoria");

  return (
    <>
      {/* ✅ Mostrar navbar según la sección actual */}
      {!ocultarLayout &&
        (esRutaRecetas ? (
          <NavbarRecetas />
        ) : esTienda ? (
          <NavbarTienda />
        ) : (
          <Navbar />
        ))}

      {!ocultarLayout && <SocialFloating />}
      {!ocultarLayout && <Munequita />} {/* ✅ Muñequita de ayuda */}

      <Routes>
        {/* 🌐 Páginas públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/recuperar" element={<Recuperar />} />

        {/* 👩 Mujeres */}
        <Route path="/mujeres" element={<MujeresInspiran />} />
        <Route path="/mujeres/:id" element={<MujerDetalle />} />

        {/* 🍽️ Recetas */}
        <Route path="/recetas" element={<RecetasPage />} />
        <Route path="/recetas/:id" element={<RecetaDetalle />} />
        <Route path="/mi-recetario" element={<MiRecetario />} />
        <Route path="/coleccion-categoria/:categoria" element={<ColeccionCategoria />} />
        <Route
          path="/recetas-cocinadas"
          element={
            <PrivateRoute roles={["usuario", "admin"]}>
              <RecetasCocinadas />
            </PrivateRoute>
          }
        />

        {/* 🛍️ Tienda */}
        <Route path="/tienda" element={<Tienda />} />
        <Route path="/coleccion" element={<Coleccion />} />
        <Route path="/coleccion-oferta/:categoria" element={<ColeccionOferta />} />
        <Route path="/coleccion/:grupo" element={<ColeccionGrupo />} />
        <Route path="/producto/:id" element={<ProductoDetalle />} />

        {/* 🛒 Carrito */}
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/gracias" element={<CheckoutGracias />} />

        {/* 🧘 Terapia */}
        <Route path="/terapia-culinaria" element={<TerapiaCulinaria />} />
        <Route path="/terapia-culinaria/recetas" element={<RecetasSanadorasPage />} />
        <Route
          path="/terapia-culinaria/diario"
          element={
            <PrivateRoute roles={["usuario", "admin"]}>
              <DiarioCulinario />
            </PrivateRoute>
          }
        />

        {/* 🛠️ Admin */}
        <Route
          path="/admin"
          element={
            <PrivateRoute roles={["admin"]}>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/inventario"
          element={
            <PrivateRoute roles={["admin"]}>
              <VistaInventario />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/usuarios"
          element={
            <PrivateRoute roles={["admin"]}>
              <VistaUsuarios />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/categorias"
          element={
            <PrivateRoute roles={["admin"]}>
              <GestionGruposCategorias />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/recetas"
          element={
            <PrivateRoute roles={["admin"]}>
              <VistaRecetas />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/recetas/agregar"
          element={
            <PrivateRoute roles={["admin"]}>
              <AgregarRecetaGeneral />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/recetas/editar/:id"
          element={
            <PrivateRoute roles={["admin"]}>
              <EditarRecetaGeneral />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/terapia/agregar"
          element={
            <PrivateRoute roles={["admin"]}>
              <AgregarRecetaTerapia />
            </PrivateRoute>
          }
        />
      </Routes>

      {/* ✅ Mostrar footer si corresponde */}
      {!ocultarLayout && <Footer />}
    </>
  );
}

export default App;
