import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import Navbar from "./features/layout/Navbar";
import Footer from "./features/layout/Footer";
import Home from "./features/home/pages/Home";
import AboutPage from "./features/about/pages/AboutPage";
import ServicesPage from "./features/services/pages/ServicesPage";
import ContactPage from "./features/contact/pages/ContactPage";
import ProjectsPage from "./features/projects/pages/ProjectsPage";
import ProjectDetailPage from "./features/projects/pages/ProjectDetailPage";
import HeroChatbot from "./shared/components/HeroChatbot";
import AdminLayout from "./features/admin/layout/AdminLayout";
import AdminHome from "./features/admin/pages/AdminHome";
import AdminLogin from "./features/admin/pages/AdminLogin";
import ContactMessagesAdmin from "./features/admin/pages/ContactMessagesAdmin";
import ProjectsAdmin from "./features/admin/pages/ProjectsAdmin";
import ServicesAdmin from "./features/admin/pages/ServicesAdmin";
import WhatWeDoAdmin from "./features/admin/pages/WhatWeDoAdmin";
import TechStackAdmin from "./features/admin/pages/TechStackAdmin";

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

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col transition-colors duration-300">
      {!isAdminRoute && <Navbar />}
      <main className={isAdminRoute ? "grow" : "grow"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:id" element={<ProjectDetailPage />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
          <Route path="/admin/*" element={<AdminLayout />}>
            <Route index element={<AdminHome />} />
            <Route path="contact-messages" element={<ContactMessagesAdmin />} />
            <Route path="projects" element={<ProjectsAdmin />} />
            <Route path="services" element={<ServicesAdmin />} />
            <Route path="what-we-do" element={<WhatWeDoAdmin />} />
            <Route path="tech-stack" element={<TechStackAdmin />} />
          </Route>
          <Route path="*" element={<div className="p-10 text-white">No route matched: {location.pathname}</div>} />
        </Routes>
      </main>
      {!isAdminRoute && <HeroChatbot />}
      {!isAdminRoute && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <ScrollToHash />
      <AppContent />
    </Router>
  );
}

export default App;
