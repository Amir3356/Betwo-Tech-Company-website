import { useEffect, useState } from "react";
import projectsImport from "../../../shared/data/projects.json";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, Layers, ArrowUpRight, X } from "lucide-react";
import { resolveProjectImageUrl } from "../../../shared/utils/projectImageUrl";

export default function Projects() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);


  useEffect(() => {
    const loadProjects = async () => {
      try {
        const jsonData = projectsImport;
        const projectsResponse = await fetch(`/api/projects`);
        const projectsJson = projectsResponse.ok ? await projectsResponse.json() : { data: [] };
        const backendProjects = Array.isArray(projectsJson?.data) ? projectsJson.data : [];

        setData({
          title: jsonData.title,
          description: jsonData.description,
          categories: jsonData.categories,
          projects: [...backendProjects, ...(jsonData.projects || [])],
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  const filteredProjects = data?.projects;

  if (loading) {
    return (
      <section className="py-12 sm:py-16 lg:py-20 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          {/* Header skeleton */}
          <div className="text-center mb-10 sm:mb-12 lg:mb-16 space-y-4">
            <div className="h-8 w-28 bg-slate-200 dark:bg-slate-700 rounded-full mx-auto animate-pulse" />
            <div className="h-10 w-64 bg-slate-200 dark:bg-slate-700 rounded-xl mx-auto animate-pulse" />
            <div className="h-5 w-80 bg-slate-200 dark:bg-slate-700 rounded-lg mx-auto animate-pulse" />
            <div className="h-1 w-20 bg-slate-200 dark:bg-slate-700 rounded-full mx-auto animate-pulse" />
          </div>
          {/* Cards skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-md animate-pulse"
              >
                <div className="h-52 sm:h-60 bg-slate-200 dark:bg-slate-700" />
                <div className="p-5 sm:p-6 space-y-3">
                  <div className="flex gap-2">
                    <div className="h-5 w-24 bg-slate-200 dark:bg-slate-700 rounded-full" />
                    <div className="h-5 w-20 bg-slate-200 dark:bg-slate-700 rounded-full" />
                  </div>
                  <div className="h-6 w-3/4 bg-slate-200 dark:bg-slate-700 rounded-lg" />
                  <div className="h-4 w-full bg-slate-200 dark:bg-slate-700 rounded" />
                  <div className="h-4 w-5/6 bg-slate-200 dark:bg-slate-700 rounded" />
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
      <section className="py-12 sm:py-16 lg:py-20 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 text-center py-20">
          <p className="text-slate-500 dark:text-slate-400 text-lg">
            Error loading projects data
          </p>
        </div>
      </section>
    );
  }

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

  return (
    <section
      id="projects"
      className="projects-section py-12 sm:py-16 lg:py-20 bg-slate-50 dark:bg-slate-900 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        {/* ── Section Header ── */}
        <motion.div
          className="text-center mb-10 sm:mb-12 lg:mb-16"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          {/* Animated badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-200/50 dark:bg-slate-700/30 border border-slate-300 dark:border-slate-600 text-slate-800 dark:text-slate-300 text-sm font-semibold mb-4">
            <Layers size={14} />
            Our Work
          </div>

          {/* Gradient title */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl md:text-7xl font-bold mb-3 sm:mb-4">
            <span className="bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
              {data.title}
            </span>
          </h2>

          <p className="text-slate-600 dark:text-slate-400 max-w-xl sm:max-w-2xl mx-auto text-base sm:text-lg">
            {data.description}
          </p>

          {/* Animated underline */}
          <motion.div
            className="h-1 bg-gradient-to-r from-slate-400 to-slate-600 dark:from-sky-500 dark:to-blue-500 rounded-full mx-auto mt-4"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          />
        </motion.div>

        {/* ── Projects Grid ── */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {filteredProjects?.map((project) => (
            <motion.div
              key={project.id}
              variants={cardVariant}
              whileHover={{ y: -12, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-fuchsia-500/10 dark:hover:shadow-blue-500/10 border border-slate-200/50 dark:border-slate-800/80 group transition-all duration-500"
            >
              {/* Image area */}
              <div className="h-52 sm:h-60 bg-slate-100 dark:bg-slate-700 relative overflow-hidden">
                {project.image ? (
                  <motion.img
                    src={resolveProjectImageUrl(project.image)}
                    alt={project.title}
                    className="h-full w-full object-scale-down p-2 transition-transform duration-500 group-hover:scale-105"
                    initial={{ scale: 0.98, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.6 }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400">
                    <Building2
                      size={32}
                      className="text-fuchsia-500 sm:size-12"
                    />
                  </div>
                )}

                {/* Dark gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />


              </div>

              {/* Card body */}
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-1 sm:mb-2">
                  {project.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-3 sm:mb-4 line-clamp-2">
                  {project.description}
                </p>
                <button
                  onClick={() => setSelectedProject(project)}
                  className="mt-auto inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 dark:border-slate-600 bg-white/80 dark:bg-slate-800/80 px-5 py-2.5 text-sm font-bold text-slate-700 dark:text-slate-200 transition-all hover:border-sky-500 hover:text-sky-600 dark:hover:border-sky-400 dark:hover:text-sky-400 hover:shadow-lg"
                >
                  View Detail <ArrowUpRight size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>


      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 py-6"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl max-h-[90vh] rounded-3xl bg-white dark:bg-slate-900 shadow-2xl flex flex-col overflow-hidden"
            >
              <div className="flex justify-between items-start p-6 md:p-8 pb-0 shrink-0">
                <div className="pr-4">
                  <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white mb-2 break-words">
                    {selectedProject.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="inline-flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 p-2 text-slate-600 shadow-sm transition-colors dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 shrink-0"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="overflow-y-auto p-6 md:p-8 pt-6 break-words text-wrap">
                <div className="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed whitespace-pre-wrap break-all md:break-words">
                  {selectedProject.detail}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
