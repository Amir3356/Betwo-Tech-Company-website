import { ArrowRight, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import heroDataImport from "../../../shared/data/hero.json";
import Typed from "typed.js";
import { motion, useScroll, useTransform } from "framer-motion";
import { getAssetUrl } from "../../../assets/index.js";

/* ─── Static decorative particle positions ─── */
const PARTICLES = [
  { id: 1, x: "12%", y: "18%", size: 5, delay: 0.0, color: "bg-sky-400/60" },
  { id: 2, x: "78%", y: "12%", size: 7, delay: 0.6, color: "bg-blue-400/50" },
  {
    id: 3,
    x: "88%",
    y: "58%",
    size: 4,
    delay: 1.1,
    color: "bg-fuchsia-400/50",
  },
  { id: 4, x: "8%", y: "72%", size: 6, delay: 1.6, color: "bg-cyan-400/60" },
  { id: 5, x: "52%", y: "8%", size: 4, delay: 0.9, color: "bg-sky-300/50" },
  { id: 6, x: "62%", y: "82%", size: 3, delay: 1.3, color: "bg-purple-400/50" },
  { id: 7, x: "28%", y: "88%", size: 5, delay: 0.4, color: "bg-blue-300/60" },
  { id: 8, x: "92%", y: "32%", size: 4, delay: 1.9, color: "bg-indigo-400/50" },
  { id: 9, x: "40%", y: "6%", size: 3, delay: 0.2, color: "bg-sky-400/40" },
  { id: 10, x: "5%", y: "45%", size: 5, delay: 1.4, color: "bg-cyan-300/50" },
];

export default function Hero() {
  const [heroData] = useState(heroDataImport);
  const typedTextRef = useRef(null);

  /* ─── Scroll-based parallax transforms ─── */
  const { scrollY } = useScroll();

  // Layer 1 – deep background orbs (slowest, barely move)
  const yOrb1 = useTransform(scrollY, [0, 800], [0, 100]);
  const yOrb2 = useTransform(scrollY, [0, 800], [0, -70]);
  const yOrb3 = useTransform(scrollY, [0, 800], [0, 55]);

  // Layer 2 – geometric rings + shapes (slow)
  const yRings = useTransform(scrollY, [0, 800], [0, 80]);
  const rotateRing1 = useTransform(scrollY, [0, 800], [0, 60]);
  const rotateRing2 = useTransform(scrollY, [0, 800], [0, -40]);
  const rotateBox = useTransform(scrollY, [0, 800], [45, 90]);

  // Layer 3 – foreground particles (medium speed)
  const yParticles = useTransform(scrollY, [0, 800], [0, 180]);

  // Layer 4 – text content (medium-fast, creates natural scroll feeling)
  const yText = useTransform(scrollY, [0, 800], [0, 240]);
  const scaleText = useTransform(scrollY, [0, 800], [1, 0.96]);

  // Layer 5 – hero image (moves up = opposite direction, deepest parallax pop)
  const yImage = useTransform(scrollY, [0, 800], [0, -150]);
  const xImage = useTransform(scrollY, [0, 800], [0, 18]);
  const scaleImage = useTransform(scrollY, [0, 800], [1, 0.9]);
  const rotateImage = useTransform(scrollY, [0, 800], [0, -4]);

  // Global fade as hero leaves viewport
  const opacityHero = useTransform(scrollY, [0, 550], [1, 0]);

  /* ─── Data fetching ─── */
  // hero data is statically imported from src/data/hero.json

  /* ─── Typed.js ─── */
  useEffect(() => {
    const typedStrings =
      heroData?.typedTexts ?? (heroData?.typedText ? [heroData.typedText] : []);

    if (!typedStrings.length || !typedTextRef.current) return undefined;

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

  /* ─────────────────────── RENDER ─────────────────────── */
  return (
    <section id="home" className="relative overflow-hidden">
      {/* ══════════════════════════════════════════════════
          PARALLAX LAYER 1 — Deep background glow orbs
      ══════════════════════════════════════════════════ */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: yOrb1, opacity: opacityHero }}
      >
        {/* Top-right mega-orb */}
        <div
          className="absolute -top-32 -right-32 w-[700px] h-[700px] rounded-full
          bg-gradient-to-br from-blue-600/25 via-indigo-500/15 to-transparent
          blur-[140px]"
        />
        {/* Bottom-left orb */}
        <div
          className="absolute -bottom-20 -left-20 w-[560px] h-[560px] rounded-full
          bg-gradient-to-tr from-cyan-400/20 via-sky-500/12 to-transparent
          blur-[120px]"
        />
      </motion.div>

      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: yOrb2, opacity: opacityHero }}
      >
        {/* Centre-right fuchsia accent */}
        <div
          className="absolute top-[38%] right-[18%] w-[340px] h-[340px] rounded-full
          bg-gradient-to-bl from-fuchsia-500/18 via-purple-500/10 to-transparent
          blur-[90px]"
        />
      </motion.div>

      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: yOrb3, opacity: opacityHero }}
      >
        {/* Top-centre sky accent */}
        <div
          className="absolute top-[15%] left-[35%] w-[240px] h-[240px] rounded-full
          bg-gradient-to-br from-sky-400/22 to-transparent
          blur-[70px]"
        />
      </motion.div>

      {/* ══════════════════════════════════════════════════
          PARALLAX LAYER 2 — Geometric rings & shapes
      ══════════════════════════════════════════════════ */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: yRings, opacity: opacityHero }}
      >
        {/* Outer ring — top right */}
        <motion.div
          style={{ rotate: rotateRing1 }}
          className="absolute top-[6%] right-[6%] w-[220px] h-[220px] rounded-full
            border border-blue-400/25 dark:border-blue-400/35"
        />
        {/* Inner ring — slightly offset */}
        <motion.div
          style={{ rotate: rotateRing2 }}
          className="absolute top-[10%] right-[10%] w-[130px] h-[130px] rounded-full
            border border-sky-400/30 dark:border-sky-400/45"
        />
        {/* Tiny ring inside */}
        <div
          className="absolute top-[13%] right-[13%] w-[60px] h-[60px] rounded-full
          border border-indigo-400/20 dark:border-indigo-400/30"
        />

        {/* Rotating square — bottom left */}
        <motion.div
          style={{ rotate: rotateBox }}
          className="absolute bottom-[22%] left-[6%] w-[70px] h-[70px]
            border border-purple-400/25 dark:border-purple-400/35"
        />
        {/* Small diamond — centre left */}
        <motion.div
          style={{ rotate: rotateRing2 }}
          className="absolute top-[42%] left-[4%] w-[44px] h-[44px]
            border border-cyan-400/30 dark:border-cyan-400/40 rounded-sm"
        />
        {/* Dashed circle — bottom right area */}
        <div
          className="absolute bottom-[15%] right-[12%] w-[90px] h-[90px] rounded-full"
          style={{
            border: "1.5px dashed rgba(139,92,246,0.25)",
          }}
        />

        {/* Subtle grid dots overlay */}
        <div
          className="absolute inset-0 opacity-[0.04] dark:opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #60a5fa 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </motion.div>

      {/* ══════════════════════════════════════════════════
          PARALLAX LAYER 3 — Floating particles
      ══════════════════════════════════════════════════ */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: yParticles, opacity: opacityHero }}
      >
        {PARTICLES.map((p) => (
          <motion.div
            key={p.id}
            className={`absolute rounded-full ${p.color}`}
            style={{ left: p.x, top: p.y, width: p.size, height: p.size }}
            animate={{
              scale: [1, 1.8, 1],
              opacity: [0.4, 1, 0.4],
              y: [0, -8, 0],
            }}
            transition={{
              duration: 3 + p.delay,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>

      {/* ══════════════════════════════════════════════════
          MAIN CONTENT — centered container
      ══════════════════════════════════════════════════ */}
      <div
        className="relative px-4 sm:px-6 md:px-12 py-16 md:py-24 lg:py-32
        flex flex-col lg:flex-row items-center justify-between
        max-w-7xl mx-auto gap-12 lg:gap-20 min-h-screen"
      >
        {/* ── TEXT BLOCK (Layer 4) ── */}
        <motion.div
          style={{ y: yText, scale: scaleText, opacity: opacityHero }}
          className="flex-1 space-y-6 lg:space-y-8 text-center lg:text-left relative z-10"
        >
          {/* Badge label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
              bg-sky-50 dark:bg-sky-900/30
              border border-sky-200 dark:border-sky-700/50
              text-sky-600 dark:text-sky-300
              text-sm font-semibold tracking-wide mx-auto lg:mx-0"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500" />
            </span>
            Next-Gen Software Agency
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hero-title text-3xl sm:text-4xl md:text-5xl lg:text-7xl
              font-extrabold tracking-tight leading-tight"
          >
            {(heroData.titlePrefix ??
              (heroData.title
                ? heroData.highlightText
                  ? heroData.title.split(heroData.highlightText)[0]
                  : heroData.title
                : "")) + " "}
            <span
              ref={typedTextRef}
              className="inline-block min-w-[10ch]
                bg-gradient-to-r from-sky-500 via-blue-500 to-fuchsia-500
                dark:from-sky-300 dark:via-blue-300 dark:to-fuchsia-400
                bg-clip-text text-transparent"
            >
              {heroData.typedTexts?.[0] ??
                heroData.typedText ??
                heroData.highlightText ??
                ""}
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="hero-description text-base sm:text-lg md:text-xl
              text-slate-600 dark:text-slate-400
              max-w-2xl mx-auto lg:mx-0 px-4 lg:px-0"
          >
            {heroData.description}
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
          >
            {Array.isArray(heroData.ctaButtons) &&
              heroData.ctaButtons.length > 0 &&
              heroData.ctaButtons.map((button, index) =>
                button.primary ? (
                  <a
                    key={index}
                    href={button.link}
                    className="group btn-primary px-8 py-3.5 rounded-full
                      bg-gradient-to-r from-slate-800 to-slate-700
                      hover:from-sky-600 hover:to-blue-600
                      dark:from-sky-500 dark:to-blue-500
                      dark:hover:from-sky-400 dark:hover:to-blue-400
                      text-white font-extrabold text-lg
                      transition-all duration-300
                      flex items-center justify-center gap-2
                      shadow-lg shadow-slate-900/25
                      hover:shadow-sky-500/30 hover:shadow-xl
                      hover:-translate-y-0.5"
                  >
                    {button.text}
                    <ArrowRight
                      size={20}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </a>
                ) : (
                  <a
                    key={index}
                    href={button.link}
                    className="btn-primary px-8 py-3.5 rounded-full
                      bg-transparent border-2
                      border-slate-300 dark:border-slate-600
                      hover:border-sky-400 dark:hover:border-sky-400
                      text-slate-700 dark:text-slate-300
                      hover:text-sky-600 dark:hover:text-sky-400
                      font-extrabold text-lg
                      transition-all duration-300
                      hover:-translate-y-0.5"
                  >
                    {button.text}
                  </a>
                ),
              )}
          </motion.div>
        </motion.div>

        {/* ── IMAGE BLOCK (Layer 5 — deepest parallax pop) ── */}
        <motion.div
          style={{
            y: yImage,
            x: xImage,
            scale: scaleImage,
            rotate: rotateImage,
          }}
          className="flex-1 w-full max-w-lg flex flex-col items-center relative z-10"
        >
          {heroData.image?.src ? (
            <div className="relative w-full">
              {/* Glow halo behind image */}
              <div
                className="absolute inset-0 rounded-3xl
                bg-gradient-to-br from-sky-400/30 via-blue-500/20 to-fuchsia-500/20
                blur-[60px] scale-110 -z-10"
              />

              {/* Floating animation wrapper */}
              <motion.div
                animate={{ y: [0, -18, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative"
              >
                <img
                  src={getAssetUrl(heroData.image.src)}
                  alt={heroData.image?.alt ?? "Hero"}
                  className="w-full h-auto object-contain
                    rounded-2xl relative z-10
                    drop-shadow-[0_30px_60px_rgba(14,165,233,0.25)]
                    hover:drop-shadow-[0_40px_80px_rgba(14,165,233,0.4)]
                    transition-all duration-500 hover:scale-[1.03]"
                />

                {/* Decorative corner accent top-right */}
                <div
                  className="absolute -top-4 -right-4 w-16 h-16
                  rounded-full bg-gradient-to-br from-sky-400 to-blue-500
                  opacity-20 blur-xl"
                />

                {/* Decorative corner accent bottom-left */}
                <div
                  className="absolute -bottom-4 -left-4 w-12 h-12
                  rounded-full bg-gradient-to-tr from-fuchsia-400 to-purple-500
                  opacity-20 blur-xl"
                />
              </motion.div>
            </div>
          ) : null}
        </motion.div>
      </div>

      {/* ── Scroll Down Indicator ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
          Scroll Down
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="text-slate-400 dark:text-slate-500"
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
}
