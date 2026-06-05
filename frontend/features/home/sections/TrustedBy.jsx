import { useEffect, useState, useRef } from "react";
import trustedByImport from "../../../shared/data/TrustedBy.json";
import { Star, ShieldCheck, Users, Handshake } from "lucide-react";
import { motion } from "framer-motion";
import { getAssetUrl } from "../../../assets/index.js";

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: [0.34, 1.56, 0.64, 1],
    },
  },
};

const iconMap = {
  ShieldCheck,
  Users,
  Handshake,
};

export default function TrustedBy() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [counts, setCounts] = useState([]);
  const metricsRef = useRef(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    const fetchTrustedByData = async () => {
      try {
        const responseData = trustedByImport;
        setData(responseData);
        if (responseData && responseData.metrics) setCounts(responseData.metrics.map(() => "0"));
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTrustedByData();
  }, []);

  useEffect(() => {
    if (!data || !data.metrics || !metricsRef.current) return;

    const parseMetric = (val) => {
      const s = String(val).trim();
      const m = s.match(/^([-+]?\d*[\d,.]*\.?\d*)(.*)$/);
      if (!m) return { target: 0, suffix: "", decimals: 0 };
      const numStr = m[1].replace(/,/g, "");
      const suffix = m[2] || "";
      const target = parseFloat(numStr) || 0;
      const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;
      return { target, suffix, decimals };
    };

    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const animateIndex = (i, target, decimals, suffix) => {
      const duration = 5000;
      const start = performance.now();

      const step = (now) => {
        const elapsed = now - start;
        const progress = Math.min(1, elapsed / duration);
        const value = easeOutCubic(progress) * target;
        const formatted =
          decimals > 0 ? value.toFixed(decimals) : Math.round(value).toString();
        setCounts((prev) => {
          const copy = [...prev];
          copy[i] = formatted + suffix;
          return copy;
        });
        if (progress < 1) requestAnimationFrame(step);
      };

      requestAnimationFrame(step);
    };

    const handleIntersect = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !animatedRef.current) {
          animatedRef.current = true;
          data.metrics.forEach((metric, i) => {
            const { target, suffix, decimals } = parseMetric(metric.value);
            animateIndex(i, target, decimals, suffix);
          });
          observer.disconnect();
        }
      });
    };

    const obs = new IntersectionObserver(handleIntersect, { threshold: 0.2 });
    obs.observe(metricsRef.current);

    return () => obs.disconnect();
  }, [data]);

  const renderIcon = (iconName, className, size) => {
    const Icon = iconMap[iconName];
    return Icon ? <Icon className={className} size={size} /> : null;
  };

  if (loading) {
    return (
      <section className="py-20 bg-slate-100 dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          {/* Header skeleton */}
          <div className="text-center mb-16 space-y-4">
            <div className="h-8 w-40 bg-slate-200 dark:bg-slate-700 rounded-full mx-auto animate-pulse" />
            <div className="h-10 w-72 bg-slate-200 dark:bg-slate-700 rounded-xl mx-auto animate-pulse" />
            <div className="h-5 w-96 bg-slate-200 dark:bg-slate-700 rounded-lg mx-auto animate-pulse" />
          </div>
          {/* Metrics skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-white dark:bg-slate-800 rounded-2xl p-8 animate-pulse text-center"
              >
                <div className="h-12 w-32 bg-slate-200 dark:bg-slate-700 rounded-lg mx-auto mb-3" />
                <div className="h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded mx-auto" />
              </div>
            ))}
          </div>
          {/* Testimonials skeleton */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-white dark:bg-slate-800 rounded-2xl p-6 animate-pulse space-y-3"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <div
                      key={j}
                      className="h-4 w-4 bg-slate-200 dark:bg-slate-700 rounded"
                    />
                  ))}
                </div>
                <div className="h-4 w-full bg-slate-200 dark:bg-slate-700 rounded" />
                <div className="h-4 w-5/6 bg-slate-200 dark:bg-slate-700 rounded" />
                <div className="h-4 w-4/5 bg-slate-200 dark:bg-slate-700 rounded" />
                <div className="flex items-center gap-3 mt-4 pt-2">
                  <div className="h-16 w-16 rounded-full bg-slate-200 dark:bg-slate-700 shrink-0" />
                  <div className="space-y-2 flex-1">
                    <div className="h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded" />
                    <div className="h-3 w-20 bg-slate-200 dark:bg-slate-700 rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || !data) {
    return (
      <section className="py-20 bg-slate-100 dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 text-center py-20">
          <p className="text-slate-500 dark:text-slate-400 text-lg">
            Error loading trusted-by data
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="trusted-by relative py-12 sm:py-16 md:py-20 bg-slate-100 dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800 overflow-hidden">
      {/* ── Background orbs ── */}
      <div className="absolute -top-24 right-0 h-64 w-64 rounded-full bg-blue-400/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 left-0 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 h-48 w-48 rounded-full bg-fuchsia-400/[0.08] blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 left-1/3 h-56 w-56 rounded-full bg-amber-400/[0.06] blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        {/* ── Section Header ── */}
        <motion.div
          className="text-center mb-10 sm:mb-16"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Section badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-200/50 dark:bg-slate-700/30 border border-slate-300 dark:border-slate-600 text-slate-800 dark:text-slate-300 text-sm font-semibold mb-4">
            <Star size={14} fill="currentColor" />
            Trusted By Leaders
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4">
            {data.title}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
            {data.description}
          </p>
        </motion.div>

        {/* ── Metrics — glass cards ── */}
        <motion.div
          ref={metricsRef}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-10 sm:mb-16"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {data.metrics.map((metric, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -6, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              className="bg-white dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 sm:p-8 text-center"
            >
              <div className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-300">
                {counts && counts[index] ? counts[index] : "0"}
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-widest mt-2 font-semibold">
                {metric.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Testimonials Grid ── */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {data.testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              className="relative group bg-white dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-500/50 transition-colors shadow-sm hover:shadow-xl hover:shadow-blue-500/10 flex flex-col justify-between"
            >
              {/* Large decorative quote mark */}
              <div
                aria-hidden="true"
                className="absolute top-4 right-4 text-6xl font-serif text-slate-100 dark:text-slate-700/50 leading-none select-none pointer-events-none"
              >
                &ldquo;
              </div>

              <div>
                {/* Animated stars */}
                <div className="flex gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08, type: "spring" }}
                    >
                      <Star size={16} fill="currentColor" strokeWidth={0} />
                    </motion.div>
                  ))}
                </div>

                <p className="text-slate-700 dark:text-slate-300 mb-6 italic leading-relaxed group-hover:text-slate-900 dark:group-hover:text-white">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-3 mt-auto">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-2xl shrink-0 border-2 border-transparent group-hover:border-blue-300 transition-colors">
                  {t.image ? (
                    <img
                      src={getAssetUrl(t.image)}
                      alt={t.name}
                      className="h-full w-full object-cover transform transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    t.initials
                  )}
                </div>
                <div>
                  <div className="font-bold text-sm text-slate-800 dark:text-white">
                    {t.name}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {t.role}
                  </div>
                  <div className="text-xs font-medium text-slate-800 dark:text-blue-400 mt-0.5">
                    {t.company}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Footer / Badges ── */}
        <motion.div
          className="relative flex flex-col lg:flex-row items-center justify-between gap-6 bg-white dark:bg-slate-800 p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <div className="flex flex-wrap justify-center lg:justify-start gap-4 md:gap-6 lg:max-w-2xl">
            {data.badges.map((badge, index) => (
              <div
                key={index}
                className="flex items-center gap-2.5 bg-slate-50 dark:bg-slate-700/50 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600/50 text-sm font-bold text-slate-800 dark:text-white"
              >
                {renderIcon(
                  badge.icon,
                  "text-slate-800 dark:text-slate-300",
                  20,
                )}
                {badge.text}
              </div>
            ))}
          </div>
          <div className="text-center lg:text-right shrink-0">
            <p className="text-slate-800 dark:text-white font-extrabold text-lg">
              {data.footerText}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
