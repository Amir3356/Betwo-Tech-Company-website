import { Link, useLocation } from "react-router-dom";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDarkMode } from "../../shared/hooks/useDarkMode";
import navDataImport from "../../shared/data/navbar.json";
import { getAssetUrl } from "../../assets/index.js";

export default function Navbar() {
  const [darkMode, setDarkMode] = useDarkMode();
  const [navData] = useState(navDataImport);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // navigation data is statically imported from src/data/navigation.json

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const brand = navData?.brand || { name: "Betwoch Tech", logo: "B" };
  const links = navData?.links || [
    { text: "Home", path: "/" },
    { text: "About Us", path: "/about" },
    { text: "Services", path: "/services" },
    { text: "Projects", path: "/projects" },
    { text: "Contact Us", path: "/contact" },
  ];
  const cta = navData?.cta || { text: "Get Started", link: "#contact" };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`sticky top-0 z-50 px-6 md:px-12 flex justify-between items-center transition-all duration-300
        ${
          scrolled
            ? "py-2 bg-white/95 dark:bg-slate-900/95 shadow-lg shadow-slate-900/10 border-b border-slate-200/80 dark:border-slate-800/80"
            : "py-4 bg-white/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800"
        }
        backdrop-blur-md`}
    >
      {/* Brand */}
      <Link to="/" className="flex items-center gap-3 group">
        <img
          src={getAssetUrl("Betwo tech logo.jpg")}
          alt="Betwo Tech logo"
          className="w-16 h-16 object-contain rounded-lg transition-transform duration-300 group-hover:scale-105"
        />
        <span className="brand-name text-2xl font-bold text-slate-900 dark:text-sky-400 transition-colors duration-300">
          {brand.name}
        </span>
      </Link>

      {/* Desktop Nav */}
      <nav className="hidden md:flex gap-1 font-semibold dark:font-bold text-slate-700 dark:text-slate-100 items-center">
        {links.map((link, i) => {
          const isActive = location.pathname === link.path;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.4, ease: "easeOut" }}
            >
              <Link
                to={link.path}
                className={`relative px-3 py-2 rounded-lg transition-all duration-300 group flex flex-col items-center
                  ${
                    isActive
                       ? "text-slate-900 font-bold dark:text-sky-400"
                      : "hover:text-slate-900 dark:hover:text-sky-400"
                  }`}
              >
                {link.text}
                {isActive ? (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-slate-800 dark:bg-gradient-to-r dark:from-sky-500 dark:to-blue-500 rounded-full" />
                ) : (
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-slate-800 dark:bg-gradient-to-r dark:from-sky-500 dark:to-blue-500 transition-all duration-300 group-hover:w-full rounded-full" />
                )}
              </Link>
            </motion.div>
          );
        })}
      </nav>

      {/* Right Controls */}
      <div className="relative flex items-center gap-2 md:gap-4">
        {/* Dark mode toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-center text-slate-600 dark:text-slate-300"
          aria-label={darkMode ? "Switch to Light mode" : "Switch to Dark mode"}
        >
          <AnimatePresence mode="wait" initial={false}>
            {darkMode ? (
              <motion.span
                key="sun"
                initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.25 }}
              >
                <Sun size={20} className="text-amber-400" />
              </motion.span>
            ) : (
              <motion.span
                key="moon"
                initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.25 }}
              >
                <Moon size={20} className="text-slate-700" />
              </motion.span>
            )}
          </AnimatePresence>
        </button>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-700 dark:text-slate-300"
          aria-label="Toggle Menu"
        >
          <AnimatePresence mode="wait" initial={false}>
            {isOpen ? (
              <motion.span
                key="x"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={24} />
              </motion.span>
            ) : (
              <motion.span
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu size={24} />
              </motion.span>
            )}
          </AnimatePresence>
        </button>

        {/* CTA Button */}
        <a
          href={cta.link}
          className="btn-primary hidden md:flex items-center justify-center px-5 py-2 rounded-full
            bg-gradient-to-r from-slate-800 to-slate-700 hover:from-sky-600 hover:to-blue-600
            dark:from-sky-500 dark:to-blue-500 dark:hover:from-sky-400 dark:hover:to-blue-400
            text-white font-extrabold transition-all duration-300 hover:-translate-y-0.5
            shadow-md hover:shadow-sky-500/30 ml-2"
        >
          {cta.text}
        </a>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute top-full left-0 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 md:hidden overflow-hidden"
          >
            <nav className="flex flex-col p-6 gap-1 font-semibold dark:font-bold text-slate-700 dark:text-slate-100">
              {links.map((link, i) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={i}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`relative px-4 py-3 rounded-xl transition-all duration-300 group
                      ${
                        isActive
                          ? "text-slate-900 font-bold dark:text-sky-400 bg-sky-50 dark:bg-sky-900/20"
                          : "hover:text-slate-900 dark:hover:text-sky-400 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                      }`}
                  >
                    <span className="flex items-center gap-2">
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-500 inline-block" />
                      )}
                      {link.text}
                    </span>
                  </Link>
                );
              })}
              <a
                href={cta.link}
                onClick={() => setIsOpen(false)}
                className="btn-primary mt-3 text-center px-5 py-3 rounded-full
                  bg-gradient-to-r from-slate-800 to-slate-700 hover:from-sky-600 hover:to-blue-600
                  dark:from-sky-500 dark:to-blue-500 dark:hover:from-sky-400 dark:hover:to-blue-400
                  text-white font-extrabold transition-all duration-300 shadow-md"
              >
                {cta.text}
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
