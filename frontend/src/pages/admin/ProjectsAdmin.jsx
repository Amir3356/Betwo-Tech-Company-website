import { useEffect, useState } from "react";
import axios from "axios";
import { Layers3, Gauge, CheckCircle2 } from "lucide-react";

export default function ProjectsAdmin() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/data/projects.json")
      .then((response) => setData(response.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-8 md:px-10 lg:px-12">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex flex-col gap-2">
          <p className="text-sm uppercase tracking-[0.3em] text-blue-500">Project Overview</p>
          <h2 className="text-3xl font-bold text-gray-900">Projects</h2>
          <p className="max-w-2xl text-gray-500">This section uses the existing public projects dataset for a dashboard-style view.</p>
        </div>

        {loading ? (
          <div className="rounded-2xl border border-gray-200 bg-white px-5 py-6 text-gray-600">Loading projects...</div>
        ) : (
          <>
            <div className="grid gap-4 md:grid-cols-3">
              {(data?.metrics || []).map((metric) => (
                <div key={metric.label} className="rounded-3xl border border-gray-200 bg-white p-5">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-500">
                    <Gauge size={20} />
                  </div>
                  <div className="text-3xl font-extrabold text-gray-900">{metric.value}</div>
                  <p className="mt-1 text-sm uppercase tracking-[0.2em] text-gray-500">{metric.label}</p>
                </div>
              ))}
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {(data?.projects || []).map((project) => (
                <article key={project.id} className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl">
                  <div className="h-48 bg-gray-100">
                    <img src={project.image} alt={project.title} className="h-full w-full object-cover" />
                  </div>
                  <div className="space-y-4 p-5">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-blue-600">
                      <Layers3 size={14} /> {project.category}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
                    <p className="text-sm leading-6 text-gray-500">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle2 size={16} className="text-green-500" />
                      {project.uptime} uptime, built in {project.duration}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}