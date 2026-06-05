import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Building2 } from "lucide-react";
import { resolveProjectImageUrl } from "../../../shared/utils/projectImageUrl";

export default function ProjectDetailPage() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`/api/projects/${id}`);
        const payload = await res.json();
        if (!res.ok) throw new Error(payload.message || "Project not found.");
        setProject(payload.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) {
    return (
      <section className="py-20 bg-slate-50 dark:bg-slate-900 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-12">
          <div className="animate-pulse space-y-6">
            <div className="h-6 w-24 bg-slate-200 dark:bg-slate-700 rounded" />
            <div className="h-80 bg-slate-200 dark:bg-slate-700 rounded-3xl" />
            <div className="h-4 w-full bg-slate-200 dark:bg-slate-700 rounded" />
          </div>
        </div>
      </section>
    );
  }

  if (error || !project) {
    return (
      <section className="py-20 bg-slate-50 dark:bg-slate-900 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-12 text-center">
          <p className="text-slate-500 dark:text-slate-400 text-lg">
            {error || "Project not found."}
          </p>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 mt-6 text-sky-600 hover:text-sky-700 font-medium"
          >
            <ArrowLeft size={16} /> Back to projects
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-slate-50 dark:bg-slate-900 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-12">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-sky-600 font-medium mb-8 transition-colors"
        >
          <ArrowLeft size={16} /> Back to projects
        </Link>

        <div className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-md border border-slate-200 dark:border-slate-700">
          <div className="h-64 sm:h-80 md:h-96 bg-slate-200 dark:bg-slate-700">
            {project.image ? (
              <img
                src={resolveProjectImageUrl(project.image)}
                alt={project.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-slate-400">
                <Building2 size={64} className="text-slate-300 dark:text-slate-500" />
                <span className="text-sm text-slate-400 dark:text-slate-500">No image uploaded</span>
              </div>
            )}
          </div>

          {project.detail ? (
            <div className="p-6 sm:p-8 md:p-10">
              <div className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed whitespace-pre-wrap">
                {project.detail}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
