import { Link } from "react-router-dom";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useDarkMode } from "../../hooks/useDarkMode";

export default function Navbar() {
  const [darkMode, setDarkMode] = useDarkMode();
  const [navData, setNavData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetch("/data/navigation.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load navigation data: ${response.status}`);
        }

        return response.json();
      })
      .then((data) => setNavData(data))
      .catch(console.error);
  }, []);

  const brand = navData?.brand || { name: "Betwoch Tech", logo: "B" };
  const links = navData?.links || [
    { text: "Home", path: "/" },
    { text: "About Us", path: "/about" },
    { text: "Services", path: "/services" },
    { text: "Projects", path: "/projects" },
    { text: "Contact Us", path: "/contact" }
  ];
  const cta = navData?.cta || { text: "Get Started", link: "#contact" };

  return (
    <header className="sticky top-0 z-50 py-4 px-6 md:px-12 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
      <Link to="/" className="flex items-center gap-3">
        <img
          src="/assets/Betwo tech logo.jpg"
          alt="Betwo Tech logo"
          className="w-16 h-16 object-contain rounded-lg"
        />
        <span className="brand-name text-2xl font-bold text-slate-900 dark:text-blue-400">
          {brand.name}
        </span>
      </Link>
      
      <nav className="hidden md:flex gap-6 font-semibold dark:font-bold text-slate-700 dark:text-slate-100 items-center">
        {links.map((link, i) => (
          <Link 
            key={i} 
            to={link.path} 
            className="relative px-3 py-2 rounded-lg transition-all duration-300 group hover:text-black dark:hover:text-slate-300"
          >
            {link.text}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black dark:bg-slate-300 transition-all duration-300 group-hover:w-full rounded-full"></span>
          </Link>
        ))}
      </nav>

      <div className="relative flex items-center gap-2 md:gap-4">
        <button 
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors flex items-center justify-center text-slate-600 dark:text-slate-300"
          aria-label={darkMode ? "Switch to Light mode" : "Switch to Dark mode"}
          title={darkMode ? "Switch to Light mode" : "Switch to Dark mode"}
        >
          {/* If currently dark, show Sun icon (switch to light). If currently light, show Moon icon (switch to dark). */}
          {darkMode ? <Sun size={20} className="text-amber-400" /> : <Moon size={20} className="text-slate-700" />}
        </button>
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="md:hidden p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <a href={cta.link} className="btn-primary hidden md:flex items-center justify-center px-5 py-2 rounded-full bg-slate-800 hover:bg-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-extrabold transition-all ml-2">
          {cta.text}
        </a>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 md:hidden">
          <nav className="flex flex-col p-6 gap-4 font-semibold dark:font-bold text-slate-700 dark:text-slate-100">
            {links.map((link, i) => (
              <Link 
                key={i} 
                to={link.path} 
                onClick={() => setIsOpen(false)}
                className="relative px-4 py-3 rounded-lg transition-all duration-300 group hover:text-black dark:hover:text-slate-300"
              >
                {link.text}
                <span className="absolute bottom-1 left-0 w-0 h-0.5 bg-black dark:bg-slate-300 transition-all duration-300 group-hover:w-full rounded-full"></span>
              </Link>
            ))}
            <a 
              href={cta.link} 
              onClick={() => setIsOpen(false)}
              className="btn-primary mt-2 text-center px-5 py-3 rounded-full bg-slate-800 hover:bg-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-extrabold transition-all"
            >
              {cta.text}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}