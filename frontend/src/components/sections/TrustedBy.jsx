import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Star, ShieldCheck, Users, Handshake } from "lucide-react";
import { motion } from "framer-motion";

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
        const response = await axios.get("/data/TrustedBy.json");
        setData(response.data);
        if (response.data && response.data.metrics) {
          setCounts(response.data.metrics.map(() => "0"));
        }
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
      const decimals = numStr.includes('.') ? numStr.split('.')[1].length : 0;
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
        const formatted = decimals > 0 ? value.toFixed(decimals) : Math.round(value).toString();
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
    return <section className="py-20 bg-slate-100 dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">Loading...</section>;
  }

  if (error || !data) {
    return <section className="py-20 bg-slate-100 dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">Error loading trusted-by data</section>;
  }

  return (
    <section className="trusted-by relative py-20 bg-slate-100 dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800 overflow-hidden">
      <div className="absolute -top-24 right-0 h-64 w-64 rounded-full bg-blue-400/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 left-0 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">{data.title}</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">{data.description}</p>
        </motion.div>

        {/* Metrics */}
        <motion.div
          ref={metricsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 text-center divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-slate-800"
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
              className="py-4 md:py-0 transform transition-all duration-300 hover:scale-110"
            >
              <div className="text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-blue-400 mb-2">{counts && counts[index] ? counts[index] : "0"}</div>
              <div className="text-slate-600 dark:text-slate-400 font-medium uppercase tracking-wider text-sm">{metric.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials Grid */}
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
              className="group bg-white dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between transform transition-all duration-300 hover:shadow-lg hover:-translate-y-2 hover:scale-[1.02]"
            >
              <div>
                <div className="flex gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" strokeWidth={0} />)}
                </div>
                <p className="text-slate-700 dark:text-slate-300 mb-6 italic leading-relaxed group-hover:text-slate-900 dark:group-hover:text-white">"{t.quote}"</p>
              </div>
              <div className="flex items-center gap-3 mt-auto">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-2xl shrink-0 border-2 border-transparent group-hover:border-blue-300 transition-colors">
                  {t.image ? (
                    <img src={t.image} alt={t.name} className="h-full w-full object-cover transform transition-transform duration-300 group-hover:scale-105" />
                  ) : (
                    t.initials
                  )}
                </div>
                <div>
                  <div className="font-bold text-sm text-slate-800 dark:text-white">{t.name}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">{t.role}</div>
                  <div className="text-xs font-medium text-slate-800 dark:text-blue-400 mt-0.5">{t.company}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer / Badges */}
        <motion.div
          className="relative flex flex-col lg:flex-row items-center justify-between gap-6 bg-white dark:bg-slate-800 p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <div className="flex flex-wrap justify-center lg:justify-start gap-4 md:gap-8 lg:max-w-2xl">
            {data.badges.map((badge, index) => (
              <div key={index} className="flex items-center gap-2 text-sm font-extrabold text-slate-800 dark:text-white">
                {renderIcon(badge.icon, "text-blue-400", 20)} {badge.text}
              </div>
            ))}
          </div>
          <div className="text-center lg:text-right shrink-0">
            <p className="text-slate-800 dark:text-white font-extrabold text-lg">{data.footerText}</p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}