import { useEffect, useState } from "react";
import axios from "axios";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/data/projectsData.json")
      .then((response) => {
        const mapped = (response.data.projects ?? []).slice(0, 3).map((project) => ({
          title: project.name,
          description: project.description,
        }));
        setProjects(mapped);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load projects section data:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="px-6 md:px-12 py-20">Loading...</p>;
  }

  return (
    <section id="projects" className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Projects</h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
          A few of the digital products and solutions we build for growing teams.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {projects.map((project) => (
          <article
            key={project.title}
            className="rounded-2xl border border-slate-200/70 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 backdrop-blur-sm p-8 shadow-lg"
          >
            <div className="mb-4 h-2 w-16 rounded-full bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-400" />
            <h3 className="text-xl font-bold mb-3">{project.title}</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{project.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
