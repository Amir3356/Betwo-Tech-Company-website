import { useEffect, useState, useRef } from "react";
import { ArrowRight, CheckCircle, Building2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { resolveProjectImageUrl } from "../../../shared/utils/projectImageUrl";
import projectsImport from "../../../shared/data/projects.json";

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

export default function FeaturedProjects() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        // static content from local JSON
        const contentJson = projectsImport;
        const projectsResponse = await fetch(`/api/projects`);
        const projectsJson = projectsResponse.ok ? await projectsResponse.json() : { data: [] };

        const publicProjects = Array.isArray(projectsJson?.data)
          ? projectsJson.data.map((project) => ({ ...project, source: "dynamic" }))
          : [];
        const staticProjects = (contentJson.projects || []).map((project) => ({
          ...project,
          source: "static",
        }));
        const mergedProjects = [...publicProjects, ...staticProjects];

        setData({
          title: "Featured Projects",
          description:
            "Real-world systems we build to streamline operations, improve visibility, and scale businesses. Each project is crafted with precision and purpose.",
          projects: mergedProjects,
          moreProjectsText: "View All Projects",
          highlights: ["Enterprise Grade", "Production Ready", "Scalable Architecture"],
        });
      } catch {
        setData({
          title: "Featured Projects",
          description:
            "Real-world systems we build to streamline operations, improve visibility, and scale businesses. Each project is crafted with precision and purpose.",
          projects: [],
          moreProjectsText: "View All Projects",
          highlights: ["Enterprise Grade", "Production Ready", "Scalable Architecture"],
        });
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  if (loading) {
    return <p className="px-6 md:px-12 py-20">Loading...</p>;
  }

  const projects = (data?.projects ?? []).slice(0, 3);
  const highlights = data?.highlights ?? [];

  return (
    <section ref={sectionRef} id="featured-projects" className="featured-projects relative py-20 sm:py-28 px-4 sm:px-6 md:px-12 bg-slate-50 dark:bg-slate-950 overflow-hidden">
      {/* Decorative gradient background elements */}
      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-transparent to-slate-100/50 dark:to-slate-900/50 pointer-events-none -z-10"></div>
      <div className="absolute top-1/4 -right-40 w-[600px] h-[600px] bg-fuchsia-500/5 dark:bg-blue-500/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>
      
      <div className="max-w-7xl mx-auto z-10">
        <motion.div
          className="text-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4">{data?.title ?? "Featured Projects"}</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
            {data?.description ??
              "Real-world systems we build to streamline operations, improve visibility, and scale businesses. Each project is crafted with precision and purpose."}
          </p>
        </motion.div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10"
        >
          {projects.map((project, index) => {
            return (
            <motion.div
              key={`${project.source || "project"}-${project.id}`}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{ y: -12, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="rounded-2xl overflow-hidden border border-slate-200/50 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl shadow-lg hover:shadow-2xl hover:shadow-fuchsia-500/10 dark:hover:shadow-blue-500/10 transition-all duration-500 group flex flex-col"
            >
              <div className="relative h-56 overflow-hidden bg-slate-100 dark:bg-slate-800">
                {project.image ? (
                  <img
                    src={resolveProjectImageUrl(project.image)}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400">
                    <Building2 size={48} className="text-sky-500 dark:text-sky-300 transition-transform duration-500 group-hover:scale-125 group-hover:rotate-3" />
                  </div>
                )}
                {/* Image overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
              </div>
              <div className="p-6 md:p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white">{project.title}</h3>
                 <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4 flex-grow">{project.description}</p>
                 <button
                   onClick={() => setSelectedProject(project)}
                   className="mt-auto inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 dark:border-slate-600 bg-white/80 dark:bg-slate-800/80 px-5 py-2.5 text-sm font-bold text-slate-700 dark:text-slate-200 transition-all hover:border-sky-500 hover:text-sky-600 dark:hover:border-sky-400 dark:hover:text-sky-400 hover:shadow-lg"
                 >
                   View Detail <ArrowRight size={16} />
                 </button>
                </div>
              </motion.div>
            );
          })}
        </div>

          <motion.div
            className="text-center mt-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <a
            href="/projects"
            className="btn-primary inline-flex items-center gap-2 px-8 py-3 rounded-full bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-extrabold text-lg transition-all shadow-lg shadow-slate-900/20 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/30"
          >
            {data?.moreProjectsText ?? "View All Projects"} <ArrowRight size={20} />
          </a>
        </motion.div>

        <motion.div
          className="flex justify-center gap-6 mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45 }}
        >
          {highlights.map((highlight) => (
            <div key={highlight} className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400">
              <CheckCircle size={16} className="text-sky-500 dark:text-sky-300" /> {highlight}
            </div>
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
              {/* Header with Title & Close Button */}
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

              {/* Scrollable Detail Body */}
              <div className="overflow-y-auto p-6 md:p-8 pt-6">
                <div className="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed whitespace-pre-wrap break-words">
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