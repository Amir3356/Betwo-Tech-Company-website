import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Building2 } from "lucide-react";
import { resolveProjectImageUrl } from "../../utils/projectImageUrl";

export default function Projects() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [counts, setCounts] = useState([]);
  const metricsRef = useRef(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    const apiBaseUrl = import.meta.env.VITE_API_URL || "http://localhost:5001";

    const loadProjects = async () => {
      try {
        const [contentResponse, projectsResponse] = await Promise.all([
          fetch("/data/projects.json"),
          fetch(`${apiBaseUrl}/api/projects`),
        ]);

        if (!contentResponse.ok) {
          throw new Error("Failed to load");
        }

        const jsonData = await contentResponse.json();
        const projectsJson = projectsResponse.ok ? await projectsResponse.json() : { data: [] };
        const backendProjects = Array.isArray(projectsJson?.data) ? projectsJson.data : [];

        setData({
          title: jsonData.title,
          description: jsonData.description,
          metrics: jsonData.metrics,
          categories: jsonData.categories,
          projects: [...backendProjects, ...(jsonData.projects || [])],
        });
        if (jsonData?.metrics) {
          setCounts(jsonData.metrics.map(() => "0"));
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
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

  const filteredProjects = data?.projects;

  if (loading) {
    return <section className="py-12 sm:py-16 lg:py-20 bg-slate-50 dark:bg-slate-900">Loading...</section>;
  }

  if (error || !data) {
    return <section className="py-12 sm:py-16 lg:py-20 bg-slate-50 dark:bg-slate-900">Error loading projects data</section>;
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
    <section id="projects" className="projects-section py-12 sm:py-16 lg:py-20 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <motion.div className="text-center mb-10 sm:mb-12 lg:mb-16" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }}>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">{data.title}</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-xl sm:max-w-2xl mx-auto text-base sm:text-lg">{data.description}</p>
        </motion.div>

        <motion.div ref={metricsRef} className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12 text-center" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
          {data.metrics?.map((metric, index) => (
            <motion.div key={metric.label} variants={cardVariant} whileHover={{ y: -6, scale: 1.02 }} className="rounded-2xl border border-slate-100/50 dark:border-slate-800/50 bg-white dark:bg-slate-800 px-2 sm:px-3 py-2 sm:py-3 shadow-sm">
              <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-800 dark:text-blue-400 mb-0.5">
                {counts[index] || "0"}
              </div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">{metric.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
          {filteredProjects?.map((project) => (
            <motion.div
              key={project.id}
              variants={cardVariant}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 border border-slate-200 dark:border-slate-700 group"
            >
              <div className="h-48 sm:h-56 lg:h-64 bg-slate-100 dark:bg-slate-700 relative overflow-hidden">
                {project.image ? (
                  <motion.img
                    src={resolveProjectImageUrl(project.image)}
                    alt={project.title}
                    className="h-full w-full object-scale-down p-2 transition-transform duration-300 group-hover:scale-105"
                    initial={{ scale: 0.98, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.6 }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400">
                    <Building2 size={32} className="text-fuchsia-500 sm:size-12" />
                  </div>
                )}
                <div className="absolute top-3 sm:top-4 left-3 sm:left-4 px-2 sm:px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-medium">
                  {project.category}
                </div>
              </div>

              <div className="p-4 sm:p-6">
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-2 sm:mb-3">
                  <span className="flex items-center gap-1 text-xs font-medium text-slate-500 dark:text-slate-400">
                    <CheckCircle size={12} className="text-fuchsia-500 sm:size-14" /> {project.uptime} Uptime
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">Built in {project.duration}</span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-1 sm:mb-2">
                  {project.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-3 sm:mb-4 line-clamp-2">{project.description}</p>

                </div>
              </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}