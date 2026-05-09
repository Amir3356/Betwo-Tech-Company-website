import { Link } from "react-router-dom";
import { Sun, Moon, Globe } from "lucide-react";
import { useDarkMode } from "../../hooks/useDarkMode";

export default function Navbar() {
  const [darkMode, setDarkMode] = useDarkMode();

  return (
    <header className="sticky top-0 z-50 py-4 px-6 md:px-12 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
      <Link to="/" className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-400 flex items-center justify-center text-white font-bold text-xl">
          B
        </div>
        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-400">
          Betwoch Tech
        </span>
      </Link>
      
      <nav className="hidden md:flex gap-6 font-semibold text-slate-700 dark:text-slate-200 items-center">
        <Link to="/" className="px-2 py-1 rounded-md transition-all hover:-translate-y-1 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500">Home</Link>
        <Link to="/about" className="px-2 py-1 rounded-md transition-all hover:-translate-y-1 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500">About Us</Link>
        <Link to="/services" className="px-2 py-1 rounded-md transition-all hover:-translate-y-1 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500">Services</Link>
        <Link to="/#projects" className="px-2 py-1 rounded-md transition-all hover:-translate-y-1 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500">Projects</Link>
        <Link to="/contact" className="px-2 py-1 rounded-md transition-all hover:-translate-y-1 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500">Contact Us</Link>
      </nav>

      <div className="flex items-center gap-2 md:gap-4">
        <button 
          className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors flex items-center justify-center text-slate-600 dark:text-slate-300"
          aria-label="Change Language"
        >
          <Globe size={20} />
        </button>
        <button 
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors flex items-center justify-center"
          aria-label="Toggle Brightness"
        >
          {darkMode ? <Sun size={20} className="text-amber-400" /> : <Moon size={20} className="text-slate-600" />}
        </button>
        <a href="#contact" className="hidden md:flex items-center justify-center px-5 py-2 rounded-full bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-400 hover:from-blue-600 hover:via-sky-400 hover:to-cyan-300 text-white font-medium transition-all ml-2">
          Get Started
        </a>
      </div>
    </header>
  );
}
