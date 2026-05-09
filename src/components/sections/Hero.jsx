import { ArrowRight } from "lucide-react";
import heroImage from "../../assets/Background image.png";

export default function Hero() {
  return (
    <section id="home" className="px-6 md:px-12 py-20 md:py-32 flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto gap-12">
      <div className="flex-1 space-y-8 text-center md:text-left">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
          Innovating the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-400">Future</span> of Technology
        </h1>
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto md:mx-0">
          Betwoch Tech specializes in building cutting-edge software solutions that empower businesses to scale and thrive in the digital age.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <a href="#services" className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-400 hover:from-blue-600 hover:via-sky-400 hover:to-cyan-300 text-white font-medium text-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20">
            Our Services <ArrowRight size={20} />
          </a>
          <a href="#contact" className="px-8 py-3 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 font-medium text-lg transition-colors shadow-sm">
            Contact Us
          </a>
        </div>
      </div>
      <div className="flex-1 w-full max-w-lg">
        <img
          src={heroImage}
          alt="Betwoch Tech hero visual"
          className="w-full h-auto object-contain"
        />
      </div>
    </section>
  );
}
