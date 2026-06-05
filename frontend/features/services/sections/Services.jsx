import { useEffect, useState, useRef } from "react";
import axios from "axios";
import servicesDataImport from "../../../shared/data/services.json";
import { motion } from "framer-motion";
import { LayoutTemplate, CheckCircle, Zap } from "lucide-react";

function resolveImageUrl(image) {
  if (!image) return "";
  if (/^https?:\/\//i.test(image)) return image;
  if (image.startsWith("/storage/")) return image;
  return image;
}

export default function Services() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [counts, setCounts] = useState([]);
  const statsRef = useRef(null);
  const animatedRef = useRef(false);
  const hero = data?.hero || {
    title: "Services",
    highlightTitle: "",
    description: "",
    stats: [],
  };
  const comprehensive = data?.comprehensive || {
    title: " Our Services",
    description: "",
    services: [],
  };
  const featureDeepDivesSection = data?.featureDeepDivesSection || {
    title: "",
    description: "",
  };
  const featureDeepDives = data?.featureDeepDives || [];
  const process = data?.process || { title: "", steps: [] };

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await axios.get(`/api/services`);
        const payload = response.data?.data;
        if (payload) {
          setData(payload);
          if (payload?.hero?.stats)
            setCounts(payload.hero.stats.map(() => "0"));
        }
      } catch {
        // Use local static data as fallback
        try {
          const fallbackData = servicesDataImport;
          setData(fallbackData);
          if (fallbackData?.hero?.stats) setCounts(fallbackData.hero.stats.map(() => "0"));
        } catch (err) {
          console.error("Failed to load services data:", err);
        }
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    if (!hero.stats.length || !statsRef.current) return;
    const parseStat = (value) => {
      const text = String(value).trim();
      const match = text.match(/^([-+]?[\d,.]*\.?\d*)(.*)$/);
      if (!match) return { target: 0, suffix: "", decimals: 0 };
      const numberText = match[1].replace(/,/g, "");
      const suffix = match[2] || "";
      const target = parseFloat(numberText) || 0;
      const decimals = numberText.includes(".")
        ? numberText.split(".")[1].length
        : 0;
      return { target, suffix, decimals };
    };
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
    const animateIndex = (index, target, decimals, suffix) => {
      const duration = 4500;
      const start = performance.now();
      const step = (now) => {
        const elapsed = now - start;
        const progress = Math.min(1, elapsed / duration);
        const value = easeOutCubic(progress) * target;
        const formatted =
          decimals > 0 ? value.toFixed(decimals) : Math.round(value).toString();
        setCounts((prev) => {
          const next = [...prev];
          next[index] = formatted + suffix;
          return next;
        });
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    const handleIntersect = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !animatedRef.current) {
          animatedRef.current = true;
          hero.stats.forEach((stat, index) => {
            const { target, suffix, decimals } = parseStat(stat.value);
            animateIndex(index, target, decimals, suffix);
          });
          observer.disconnect();
        }
      });
    };
    const observer = new IntersectionObserver(handleIntersect, {
      threshold: 0.2,
    });
    observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, [data]);

  if (loading)
    return (
      <p className="px-4 sm:px-6 md:px-12 py-12 sm:py-16 lg:py-20">
        Loading...
      </p>
    );
  if (!data) return null;

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.08 },
    },
  };
  const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };
  const cardVariant = {
    hidden: { opacity: 0, y: 28, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.55, ease: "easeOut" },
    },
  };
  const iconVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: "easeOut" },
    },
  };

  return (
    <section className="services-section bg-white dark:bg-slate-950 pt-20 sm:pt-24 lg:pt-32 overflow-hidden">
      {/* ── Hero ── */}
      {hero && hero.title && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16 lg:mb-24">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
          >
            <motion.div className="space-y-6 lg:space-y-8" variants={fadeUp}>
              <motion.h1
                className="text-2xl sm:text-3xl lg:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white leading-tight"
                variants={fadeUp}
              >
                {hero.title}
                {hero.highlightTitle ? (
                  <>
                    <br className="hidden sm:block" />
                    <span className="bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
                      {hero.highlightTitle}
                    </span>
                  </>
                ) : null}
              </motion.h1>
              <motion.p
                className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-400"
                variants={fadeUp}
              >
                {hero.description}
              </motion.p>
              {hero.stats && hero.stats.length > 0 && (
                <motion.div
                  ref={statsRef}
                  className="grid grid-cols-3 gap-3 sm:gap-6 pt-6 sm:pt-10"
                  variants={sectionVariants}
                >
                  {hero.stats.map((stat, i) => (
                    <motion.div
                      key={i}
                      variants={cardVariant}
                      whileHover={{ scale: 1.02, y: -2 }}
                      className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-slate-200 dark:border-slate-700 p-4 text-center shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                    >
                      <p className="text-2xl font-black bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
                        {counts[i] || "0"}
                      </p>
                      <p className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400 mt-0.5 sm:mt-1">
                        {stat.label}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </div>
      )}

      {/* ── Comprehensive Services ── */}
      <div id="our-services" className="bg-slate-50 dark:bg-slate-900 py-12 sm:py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 lg:mb-16 space-y-3 sm:space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-200/50 dark:bg-slate-700/30 border border-slate-300 dark:border-slate-600 text-slate-800 dark:text-slate-300 text-sm font-semibold">
              <Zap size={14} /> Comprehensive Solutions
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
              Our Services
            </h2>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400">
              {comprehensive.description}
            </p>
          </div>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {comprehensive.services.map((service, i) => (
              <motion.div
                key={i}
                className="group relative bg-white dark:bg-slate-950 p-5 sm:p-6 lg:p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden"
                variants={cardVariant}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                {/* Accent line on hover */}
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-slate-700 to-slate-500 dark:from-blue-500 dark:to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-2xl" />
                {service.image && (
                  <div className="aspect-[16/10] bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden mb-4 sm:mb-6">
                    <img
                      src={resolveImageUrl(service.image)}
                      alt={service.title}
                      className="h-full w-full object-scale-down p-2"
                    />
                  </div>
                )}
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2 sm:mb-3 transition-colors duration-300 group-hover:text-slate-700 dark:group-hover:text-slate-200">
                  {service.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 transition-colors duration-300 group-hover:text-slate-800 dark:group-hover:text-slate-300">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Feature Deep Dives ── */}
      <div
        id="how-we-bring-your-vision-to-life"
        className="py-12 sm:py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 lg:mb-20 space-y-3 sm:space-y-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
            {featureDeepDivesSection.title}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400">
            {featureDeepDivesSection.description}
          </p>
        </div>
        <motion.div
          className="space-y-12 sm:space-y-16 lg:space-y-24"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.18 }}
        >
          {featureDeepDives.map((item, i) => (
            <motion.div
              key={i}
              className={`group flex flex-col lg:flex-row gap-8 lg:gap-12 items-center ${item.reverse ? "lg:flex-row-reverse" : ""}`}
              variants={cardVariant}
              whileHover={{ scale: 1.01 }}
            >
              <div className="flex-1 space-y-4 sm:space-y-6">
                <span className="inline-block bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm">
                  Featured Service
                </span>
                <motion.h3
                  className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white"
                  variants={fadeUp}
                >
                  {item.title}
                </motion.h3>
                <motion.p
                  className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-400"
                  variants={fadeUp}
                >
                  {item.description}
                </motion.p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 pt-2 sm:pt-4">
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white mb-2 sm:mb-3">
                      Key Features
                    </h4>
                    <ul className="space-y-1.5 sm:space-y-2">
                      {item.features.map((f, idx) => (
                        <motion.li
                          key={idx}
                          className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-sm"
                          variants={iconVariants}
                        >
                          <CheckCircle className="w-4 h-4 text-blue-500 shrink-0" />{" "}
                          {f}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white mb-2 sm:mb-3">
                      Benefits
                    </h4>
                    <ul className="space-y-1.5 sm:space-y-2">
                      {item.benefits.map((b, idx) => (
                        <motion.li
                          key={idx}
                          className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-sm"
                          variants={iconVariants}
                        >
                          <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />{" "}
                          {b}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="pt-4 sm:pt-6 border-t border-slate-200 dark:border-slate-800">
                  <h4 className="font-bold text-slate-900 dark:text-white mb-2 sm:mb-3 text-sm uppercase tracking-wider">
                    Technologies We Use
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {item.tech.map((t, idx) => (
                      <motion.span
                        key={idx}
                        className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700/40 px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm font-medium hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors cursor-default"
                        variants={iconVariants}
                      >
                        {t}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex-1 w-full relative mt-6 lg:mt-0">
                <motion.div
                  className="w-full max-w-lg mx-auto aspect-[5/4] bg-linear-to-tr from-blue-100 to-indigo-50 dark:from-slate-800 dark:to-slate-900 rounded-2xl sm:rounded-3xl overflow-hidden flex items-center justify-center border border-slate-200 dark:border-slate-700 transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg"
                  variants={cardVariant}
                >
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <LayoutTemplate className="w-16 sm:w-24 lg:w-32 h-16 sm:h-24 lg:h-32 text-blue-200 dark:text-blue-900/50" />
                  )}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ── Dual Marquee Stripe ── */}
      <div className="py-4 sm:py-6 bg-slate-300 dark:bg-slate-700 overflow-hidden relative border-y border-slate-400/50 dark:border-slate-600/50 shadow-md flex flex-col gap-2">
        {/* Row 1 — scrolls left */}
        <div className="flex overflow-hidden whitespace-nowrap">
          <motion.div
            className="flex gap-4 sm:gap-8 items-center text-white text-sm sm:text-base md:text-lg font-bold uppercase tracking-widest"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 30, repeat: Infinity }}
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-4 sm:gap-8 min-w-max"
              >
                <span>Innovation</span>
                <span className="text-blue-200 dark:text-blue-300">✦</span>
                <span>Excellence</span>
                <span className="text-blue-200 dark:text-blue-300">✦</span>
                <span>Quality</span>
                <span className="text-blue-200 dark:text-blue-300">✦</span>
                <span>Technology</span>
                <span className="text-blue-200 dark:text-blue-300">✦</span>
                <span>Design</span>
                <span className="text-blue-200 dark:text-blue-300">✦</span>
                <span>Development</span>
                <span className="text-blue-200 dark:text-blue-300">✦</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Process ── */}
      <div className="bg-slate-50 dark:bg-slate-900/50 py-16 sm:py-24 lg:py-32 text-slate-900 dark:text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 dark:bg-purple-600/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24 space-y-4">
            <motion.h2
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-black dark:text-transparent dark:bg-clip-text dark:bg-linear-to-r dark:from-blue-400 dark:to-indigo-400"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Our Process
            </motion.h2>
            <motion.h3
              className="text-xl sm:text-2xl md:text-3xl font-medium text-slate-700 dark:text-slate-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {process.title}
            </motion.h3>
          </div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {process.steps.map((step, i) => (
              <motion.div
                key={i}
                className="relative group p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md hover:shadow-2xl hover:shadow-blue-500/10 dark:shadow-none dark:hover:shadow-blue-500/20 hover:border-blue-500/50 dark:hover:border-blue-400/50 transition-all duration-300 z-10 overflow-hidden"
                variants={cardVariant}
                whileHover={{ y: -8 }}
              >
                <div className="relative z-10">
                  <h4 className="text-xl sm:text-2xl font-bold mb-3 text-slate-900 dark:text-white">
                    {step.title}
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
