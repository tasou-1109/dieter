// src/culinaate/App.js
//山﨑氏、ガンバっ!!www
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import BackgroundSlideshow from "./components/Animations/BackgroundSlideshow";
import Bubbles from "./components/Animations/Bubbles";
import WaveAnimation from "./components/Animations/WaveAnimation";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import FoodManagement from "./pages/FoodManagement/FoodManagement";
import Settings from "./pages/Settings/Settings";
import "./App.css";

export function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.state?.page) {
      setCurrentPage(location.state.page);
    }
  }, [location]);

  useEffect(() => {
    document.body.classList.toggle("dark-mode", isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const pageVariants = {
    initial: {
      opacity: 0,
      x: 300,
    },
    animate: {
      opacity: 1,
      x: 0,
    },
    exit: {
      opacity: 0,
      x: -300,
    },
  };

  const pageTransition = {
    duration: 0.5,
    ease: "easeInOut",
  };

  const getPage = () => {
    switch (currentPage) {
      case "home":
        return <Home />;
      case "about":
        return <About />;
      case "contact":
        return <Contact />;
      case "food":
        return <FoodManagement />;
      case "settings":
        return <Settings toggleDarkMode={toggleDarkMode} />;
      default:
        return <Home />;
    }
  };

  return (
    <div className={`App ${isDarkMode ? "dark-mode" : ""}`}>
      <BackgroundSlideshow />
      <div className={`gradient-overlay ${isDarkMode ? "dark" : "light"}`} />
      <Bubbles />
      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
      <WaveAnimation />
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
          transition={pageTransition}
          className="page-content"
        >
          {getPage()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
