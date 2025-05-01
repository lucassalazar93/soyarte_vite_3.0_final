import React, { useEffect, useState } from "react";

// 🧭 Navegación y UI flotante
import Navbar from "../components/Navbar/Navbar";
import SocialFloating from "../components/SocialFloating/SocialFloating";

// 🎠 Secciones principales
import CarouselHome from "../components/Home/CarouselHome";
import Categories from "../components/Home/Categories";
import About from "../components/Home/About";
import VideoSection from "../components/Home/VideoSection";
import BlogPreviewSwiper from "../components/Blog/BlogPreview/BlogPreviewSwiper";
import InspiringWomen from "../components/Home/InspiringWomen";
import History from "../components/Home/History";
import MapSection from "../components/Home/MapSection";
import Footer from "../components/Footer/Footer";

import BASE_URL from "../BASE_URL"; // Para cargar las entradas
import "./Home.css";

const Home = () => {
  const [entradas, setEntradas] = useState([]);

  useEffect(() => {
    const cargarEntradas = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/blog`);
        const data = await res.json();
        setEntradas(data);
      } catch (error) {
        console.error("❌ Error al cargar artículos:", error);
      }
    };

    cargarEntradas();
  }, []);

  return (
    <div className="home-container">
      <SocialFloating />
      <CarouselHome />
      <Categories />
      <About />
      <VideoSection />

      {/* Blog Preview en Home */}
      <section style={{ marginTop: "4rem", marginBottom: "4rem" }}>
        <h2 className="home-blog-title">📝 Últimas historias del blog</h2>
        <BlogPreviewSwiper entradas={entradas.slice(0, 3)} />
      </section>

      <InspiringWomen />
      <History />
      <MapSection />
      <Footer />
    </div>
  );
};

export default Home;
