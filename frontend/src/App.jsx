import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import ContactPage from "./pages/ContactPage";
import ProjectsPage from "./pages/ProjectsPage";
import HeroChatbot from "./components/sections/HeroChatbot";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";

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
  const { pathname } = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Check if user is authenticated on mount
    const token = localStorage.getItem('adminAuthToken');
    return !!token;
  });
  const isAdmin = pathname === '/admin';

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuthToken');
    setIsAuthenticated(false);
  };

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col transition-colors duration-300">
      {!isAdmin && <Navbar />}
      <main className="grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route 
            path="/admin" 
            element={
              isAuthenticated ? (
                <AdminDashboard onLogout={handleLogout} />
              ) : (
                <AdminLogin onLoginSuccess={handleLoginSuccess} />
              )
            } 
          />
        </Routes>
      </main>
      {!isAdmin && <HeroChatbot />}
      {!isAdmin && <Footer />}
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
