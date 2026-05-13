import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowRight, CheckCircle } from "lucide-react";
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

export default function FeaturedProjects() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/data/Featured%20Projects.json")
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load featured projects data:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="px-6 md:px-12 py-20">Loading...</p>;
  }

  const projects = data?.projects ?? [];
  const highlights = data?.highlights ?? [];

  return (
    <section id="featured-projects" className="featured-projects py-12 px-6 md:px-12 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">{data?.title ?? "Featured Projects"}</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
            {data?.description ??
              "Real-world systems we build to streamline operations, improve visibility, and scale businesses. Each project is crafted with precision and purpose."}
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-4"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              className="rounded-xl overflow-hidden border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition-all group"
            >
              <div className="relative h-36 overflow-hidden bg-slate-200 dark:bg-slate-800">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-2 left-2 px-2 py-0.5 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-medium">
                  {project.category}
                </div>
              </div>
              <div className="p-2">
                <div className="flex items-center gap-2 mb-2">
                  <span className="flex items-center gap-1 text-xs font-medium text-slate-500 dark:text-slate-400">
                    <CheckCircle size={14} className="text-green-500" /> {project.uptime} Uptime
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">Built in {project.duration}</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">{project.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-2 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {project.technologies.slice(0, 4).map((tech, i) => (
                    <span key={i} className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-1 rounded-md text-xs font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

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
              <CheckCircle size={16} className="text-blue-500" /> {highlight}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}