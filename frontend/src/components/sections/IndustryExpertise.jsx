import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { ArrowRight, ShieldCheck, Cpu, HeadphonesIcon } from "lucide-react";
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

function AnimatedNumber({ target, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;
    const num = parseFloat(target.replace(/[^0-9.]/g, ""));
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * num));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [hasStarted, target, duration]);

  return <span ref={ref} className="text-slate-900 dark:text-blue-400">{count}{suffix}</span>;
}

const badgeIcons = {
  "Industry Compliant": ShieldCheck,
  "Cutting-edge Technology": Cpu,
  "24/7 Dedicated Support": HeadphonesIcon,
};

export default function IndustryExpertise() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/data/industriesSolutions.json")
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load industries data:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="px-6 md:px-12 py-20">Loading...</p>;
  }

  if (!data) {
    return null;
  }

  return (
    <section id="industries" className="industry-expertise py-20 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">{data.title}</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-3xl mx-auto text-lg">
            {data.description}
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-3 gap-8 mb-16 max-w-2xl mx-auto text-center divide-x divide-slate-200 dark:divide-slate-800"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {data.stats.map((stat) => {
            const numMatch = stat.value.match(/^(\d+\.?\d*)/);
            const suffix = stat.value.replace(/^(\d+\.?\d*)/, "");
            const numValue = numMatch ? numMatch[1] : stat.value;
            return (
              <motion.div
                key={stat.label}
                variants={cardVariants}
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
              >
                <div className="text-3xl md:text-4xl font-extrabold mb-1">
                  <AnimatedNumber target={numValue} suffix={suffix} />
                </div>
                <div className="text-sm font-semibold text-slate-600 dark:text-slate-400">{stat.label}</div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Industry Cards */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {data.industries.map((industry) => (
            <motion.div
              key={industry.name}
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              className="group bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 p-8 shadow-sm transform transition-all duration-300 hover:shadow-lg hover:-translate-y-2 hover:scale-[1.02]"
            >
              <div className="mb-2">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-400/10 text-slate-900 dark:text-blue-400">
                  {industry.tag}
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1 transition-colors duration-300 group-hover:text-blue-600">{industry.name}</h3>
              <p className="text-sm font-semibold text-slate-900 dark:text-blue-400 mb-4">{industry.metric}</p>
              <p className="text-slate-700 dark:text-slate-400 leading-relaxed mb-6 transition-colors duration-300 group-hover:text-slate-900 dark:group-hover:text-slate-200">{industry.description}</p>
              <a
                href={industry.link}
                className="inline-flex items-center gap-2 text-slate-900 dark:text-blue-400 font-semibold hover:gap-3 transition-all text-sm"
              >
                Learn more <ArrowRight size={16} />
              </a>
            </motion.div>
          ))}
        </motion.div>

        {/* Badges */}
        <motion.div
          className="flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {data.badges.map((badge) => {
            const Icon = badgeIcons[badge];
            return (
              <div
                key={badge}
                className="flex items-center gap-3 bg-white dark:bg-slate-800/50 px-6 py-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm transform transition-all duration-300 hover:shadow-md hover:-translate-y-1 hover:scale-[1.02]"
              >
                {Icon && <Icon className="w-5 h-5 text-slate-900 dark:text-blue-500" />}
                <span className="font-semibold text-slate-800 dark:text-slate-200">{badge}</span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}