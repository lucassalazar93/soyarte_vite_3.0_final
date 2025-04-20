import React from "react";

// 🧭 Navegación y UI flotante
import Navbar from "../components/Navbar/Navbar";
import SocialFloating from "../components/SocialFloating/SocialFloating";

// 🎠 Secciones principales
import CarouselHome from "../components/Home/CarouselHome";
import Categories from "../components/Home/Categories";
import About from "../components/Home/About";
import VideoSection from "../components/Home/VideoSection";
import BlogPreview from "../components/Blog/BlogPreview"; // ✅ Ahora está aquí
import InspiringWomen from "../components/Home/InspiringWomen";
import History from "../components/Home/History";
import MapSection from "../components/Home/MapSection";

import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <SocialFloating />
      <CarouselHome />
      <Categories />
      <About />
      <VideoSection />

      <BlogPreview />

      <InspiringWomen />
      <History />
      <MapSection />
    </div>
  );
};

export default Home;
