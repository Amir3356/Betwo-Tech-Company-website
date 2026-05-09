import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowRight } from "lucide-react";

export default function FeaturedProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/data/featuredProjectsData.json")
      .then((response) => {
        setProjects(response.data.projects ?? []);
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

  return (
    <section id="featured-projects" className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Featured Projects</h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
          A few of the digital products and solutions we build for growing teams.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div
            key={project.id}
            className="rounded-2xl overflow-hidden border border-slate-200/70 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 shadow-lg hover:shadow-xl transition-all group"
          >
            <div className="relative h-48 overflow-hidden bg-slate-200 dark:bg-slate-800">
              <img
                src={project.image}
                alt={project.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="p-8">
              <div className="mb-4 h-2 w-16 rounded-full bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-400" />
              <h3 className="text-xl font-bold mb-3">{project.name}</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{project.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <a
          href="/projects"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-400 text-white font-medium text-lg transition-all shadow-lg shadow-blue-500/20 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/30"
        >
          4+ More Projects Available <ArrowRight size={20} />
        </a>
      </div>
    </section>
  );
}
