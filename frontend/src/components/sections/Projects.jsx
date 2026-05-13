import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Search, ArrowRight, CheckCircle } from "lucide-react";

export default function Projects() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [counts, setCounts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const metricsRef = useRef(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    const fetchProjectsData = async () => {
      try {
        const response = await axios.get("/data/projects.json");
        setData(response.data);
        if (response.data?.metrics) {
          setCounts(response.data.metrics.map(() => "0"));
        }
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProjectsData();
  }, []);

  useEffect(() => {
    if (!data?.metrics || !metricsRef.current) return;

    const parseMetric = (value) => {
      const text = String(value).trim();
      const match = text.match(/^([-+]?[\d,.]*\d)(.*)$/);
      if (!match) return { target: 0, suffix: text.replace(/^0*/, ""), decimals: 0 };
      const numeric = match[1].replace(/,/g, "");
      const suffix = match[2] || "";
      const target = parseFloat(numeric) || 0;
      const decimals = numeric.includes(".") ? numeric.split(".")[1].length : 0;
      return { target, suffix, decimals };
    };

    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const animateMetric = (index, target, decimals, suffix) => {
      const duration = 4000;
      const start = performance.now();

      const step = (now) => {
        const progress = Math.min(1, (now - start) / duration);
        const value = easeOutCubic(progress) * target;
        const formatted = decimals > 0 ? value.toFixed(decimals) : Math.round(value).toString();

        setCounts((current) => {
          const next = [...current];
          next[index] = `${formatted}${suffix}`;
          return next;
        });

        if (progress < 1) {
          requestAnimationFrame(step);
        }
      };

      requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animatedRef.current) {
            animatedRef.current = true;
            data.metrics.forEach((metric, index) => {
              const { target, suffix, decimals } = parseMetric(metric.value);
              animateMetric(index, target, decimals, suffix);
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(metricsRef.current);

    return () => observer.disconnect();
  }, [data]);

  const filteredProjects = data?.projects?.filter((project) => {
    const matchesCategory = activeCategory === "All" ? true : project.category === activeCategory;
    const matchesSearch =
      !searchQuery ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.some((tech) => tech.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return <section className="py-20 bg-slate-50 dark:bg-slate-900">Loading...</section>;
  }

  if (error || !data) {
    return <section className="py-20 bg-slate-50 dark:bg-slate-900">Error loading projects data</section>;
  }

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const cardVariant = {
    hidden: { opacity: 0, y: 28, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: "easeOut" } },
  };

  return (
    <section id="projects" className="projects-section py-20 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div className="text-center mb-16" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }}>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">{data.title}</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">{data.description}</p>
        </motion.div>

        <motion.div ref={metricsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 text-center" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
          {data.metrics?.map((metric, index) => (
            <motion.div key={metric.label} variants={cardVariant} whileHover={{ y: -6, scale: 1.02 }} className="rounded-2xl border border-slate-100/50 dark:border-slate-800/50 bg-white dark:bg-slate-800 px-3 py-3 shadow-sm">
              <div className="text-3xl md:text-4xl font-extrabold text-slate-800 dark:text-blue-400 mb-0.5">
                {counts[index] || "0"}
              </div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">{metric.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {data.categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              variants={fadeUp}
              whileHover={{ scale: 1.04 }}
              className={`px-5 py-2 rounded-full font-medium text-sm transition-all ${
                activeCategory === category
                  ? "bg-blue-400 text-white shadow-lg"
                  : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700"
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>

        <div className="relative mb-12 max-w-xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Search by name or technology (e.g., React, Node.js)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <p className="text-center text-slate-500 dark:text-slate-400 mb-8">
          Showing {filteredProjects?.length || 0} of {data.projects?.length || 0} projects
        </p>

        <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
          {filteredProjects?.map((project) => (
            <motion.div
              key={project.id}
              variants={cardVariant}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 border border-slate-200 dark:border-slate-700 group"
            >
              <div className="h-48 bg-slate-200 dark:bg-slate-700 relative overflow-hidden">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300"
                  initial={{ scale: 0.98, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.6 }}
                />
                <div className="absolute top-4 left-4 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-medium">
                  {project.category}
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-4 mb-3">
                  <span className="flex items-center gap-1 text-xs font-medium text-slate-500 dark:text-slate-400">
                    <CheckCircle size={14} className="text-green-500" /> {project.uptime} Uptime
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">Built in {project.duration}</span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-500 transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-5">
                  {project.technologies.map((tech, i) => (
                    <motion.span key={i} className={`px-2 py-1 rounded-md text-xs font-medium ${tech === "+1" ? "bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400" : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"}`} variants={fadeUp}>
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}