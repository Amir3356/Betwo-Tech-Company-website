import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import ContactPage from "./pages/ContactPage";
import ProjectsPage from "./pages/ProjectsPage";
import HeroChatbot from "./components/sections/HeroChatbot";

function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      return;
    }

    const targetId = hash.slice(1);
    let attempts = 0;
    const maxAttempts = 20;

    const scrollToTarget = () => {
      const target = document.getElementById(targetId);

      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }

      if (attempts < maxAttempts) {
        attempts += 1;
        requestAnimationFrame(scrollToTarget);
      }
    };

    scrollToTarget();
  }, [pathname, hash]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToHash />
      <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col transition-colors duration-300">
        <Navbar />
        <main className="grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
          </Routes>
        </main>
        <HeroChatbot />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
