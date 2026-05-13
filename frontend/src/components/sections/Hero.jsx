import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Typed from "typed.js";
import { motion } from "framer-motion";

export default function Hero() {
  const [heroData, setHeroData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const typedTextRef = useRef(null);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const response = await axios.get("/data/hero.json");
        setHeroData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchHeroData();
  }, []);

  useEffect(() => {
    const typedStrings = heroData?.typedTexts ?? (heroData?.typedText ? [heroData.typedText] : []);

    if (!typedStrings.length || !typedTextRef.current) {
      return undefined;
    }

    const typed = new Typed(typedTextRef.current, {
      strings: typedStrings,
      typeSpeed: 80,
      backSpeed: 40,
      backDelay: 1800,
      startDelay: 250,
      loop: true,
      showCursor: false,
    });

    return () => typed.destroy();
  }, [heroData]);

  

  if (loading) {
    return <section id="home" className="px-6 md:px-12 py-20 md:py-32 flex items-center justify-center max-w-7xl mx-auto">Loading...</section>;
  }

  if (error || !heroData) {
    return <section id="home" className="px-6 md:px-12 py-20 md:py-32 flex items-center justify-center max-w-7xl mx-auto">Error loading hero data</section>;
  }

  return (
    <section 
      id="home" 
      className="relative px-6 md:px-12 py-20 md:py-32 flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto gap-12 overflow-hidden"
    >
      <div 
        className="flex-1 space-y-8 text-center md:text-left relative z-10"
      >
        <h1 className="hero-title text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
          {(
            heroData.titlePrefix ??
            (heroData.title
              ? heroData.highlightText
                ? heroData.title.split(heroData.highlightText)[0]
                : heroData.title
              : "")
          ) + " "}
          <span ref={typedTextRef} className="inline-block min-w-[12ch] text-blue-400">
            {(heroData.typedTexts?.[0] ?? heroData.typedText ?? heroData.highlightText ?? "")}
          </span>
        </h1>
        <p className="hero-description text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto md:mx-0">
          {heroData.description}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          {Array.isArray(heroData.ctaButtons) && heroData.ctaButtons.length > 0 &&
            heroData.ctaButtons.map((button, index) => (
              button.primary ? (
                <a
                  key={index}
                  href={button.link}
                  className="btn-primary px-8 py-3 rounded-full bg-slate-800 hover:bg-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-extrabold text-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-slate-900/20"
                >
                  {button.text} <ArrowRight size={20} />
                </a>
              ) : (
                <a
                  key={index}
                  href={button.link}
                  className="btn-primary px-8 py-3 rounded-full bg-slate-800 hover:bg-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-extrabold text-lg transition-colors shadow-sm"
                >
                  {button.text}
                </a>
              )
            ))}
        </div>
      </div>

      <div 
        className="flex-1 w-full max-w-lg flex flex-col items-center relative z-10"
      >
        {heroData.image?.src ? (
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            <img 
              src={heroData.image.src} 
              alt={heroData.image?.alt ?? "Hero"} 
              className="w-full h-auto object-contain transform transition-all duration-500 hover:scale-105 hover:shadow-2xl rounded-2xl relative z-10" 
            />
          </motion.div>
        ) : null}
      </div>
    </section>
  );
}
