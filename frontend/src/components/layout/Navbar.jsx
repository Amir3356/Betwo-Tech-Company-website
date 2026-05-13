import { Link } from "react-router-dom";
import { Sun, Moon, Globe, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useDarkMode } from "../../hooks/useDarkMode";

export default function Navbar() {
  const [darkMode, setDarkMode] = useDarkMode();
  const [navData, setNavData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  const languageOptions = ["English", "Amharic", "Afan Oromo", "Tigrigna"];

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
      <Link to="/" className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-slate-900 dark:bg-blue-400 flex items-center justify-center text-white font-bold text-xl">
          {brand.logo}
        </div>
        <span className="text-xl font-bold text-slate-900 dark:text-blue-400">
          {brand.name}
        </span>
      </Link>
      
      <nav className="hidden md:flex gap-6 font-semibold dark:font-bold text-slate-700 dark:text-slate-100 items-center">
        {links.map((link, i) => {
          const isContactUs = link.text === "Contact Us";
          
          return isContactUs ? (
            <Link 
              key={i} 
              to={link.path} 
              className="relative px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 dark:from-blue-400 dark:to-cyan-400 text-white dark:text-slate-900 font-extrabold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50 dark:hover:shadow-blue-400/50 hover:scale-105 hover:-translate-y-0.5 group overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                {link.text}
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 dark:from-cyan-400 dark:to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
          ) : (
            <Link 
              key={i} 
              to={link.path} 
              className="relative px-2 py-1 transition-all duration-300 group hover:text-slate-900 dark:hover:text-blue-400 hover:scale-105 hover:bg-slate-100 dark:hover:bg-blue-900/20 rounded-lg"
            >
              {link.text}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-slate-900 dark:bg-blue-400 transition-all duration-300 group-hover:w-full rounded-full"></span>
            </Link>
          );
        })}
      </nav>

      <div className="relative flex items-center gap-2 md:gap-4">
        <div className="relative">
          <button 
            onClick={() => setIsLanguageOpen((open) => !open)}
            className="flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-800/70 px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            aria-label="Change Language"
            aria-expanded={isLanguageOpen}
          >
            <Globe size={18} />
            <span className="hidden sm:inline">{selectedLanguage}</span>
          </button>
          {isLanguageOpen && (
            <div className="absolute right-0 top-full mt-2 w-44 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-xl">
              {languageOptions.map((language) => (
                <button
                  key={language}
                  onClick={() => {
                    setSelectedLanguage(language);
                    setIsLanguageOpen(false);
                  }}
                  className={`w-full px-4 py-3 text-left text-sm transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 ${
                    selectedLanguage === language
                      ? "bg-slate-100 dark:bg-slate-800 text-blue-500 font-semibold"
                      : "text-slate-700 dark:text-slate-200"
                  }`}
                >
                  {language}
                </button>
              ))}
            </div>
          )}
        </div>
        <button 
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors flex items-center justify-center text-slate-600 dark:text-slate-300"
          aria-label="Toggle Brightness"
        >
          {darkMode ? <Sun size={20} className="text-amber-400" /> : <Moon size={20} className="text-slate-700" />}
        </button>
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="md:hidden p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <a href={cta.link} className="hidden md:flex items-center justify-center px-5 py-2 rounded-full bg-slate-900 hover:bg-slate-800 dark:bg-sky-400 dark:hover:bg-sky-500 text-white dark:text-black font-extrabold transition-all ml-2">
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
                className="px-4 py-3 rounded-lg transition-all duration-300 hover:text-slate-900 dark:hover:text-blue-400 hover:scale-105 hover:bg-slate-100 dark:hover:bg-blue-900/20"
              >
                {link.text}
              </Link>
            ))}
            <a 
              href={cta.link} 
              onClick={() => setIsOpen(false)}
              className="mt-2 text-center px-5 py-3 rounded-full bg-slate-900 dark:bg-sky-400 hover:bg-slate-800 dark:hover:bg-sky-500 text-white dark:text-black font-extrabold"
            >
              {cta.text}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}