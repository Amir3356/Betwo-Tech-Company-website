import { useState } from "react";
import {
  Plus,
  Building2,
} from "lucide-react";

export default function ProjectsAdmin() {
  const [projects] = useState([]);

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8 md:px-6 lg:px-10 lg:py-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-3xl font-bold text-gray-900">Projects</h2>
          <button
            disabled
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700 opacity-50 cursor-not-allowed"
          >
            <Plus size={18} />
            Add Project
          </button>
        </div>

        {projects.length === 0 ? (
          <div className="rounded-3xl border border-gray-200 bg-white p-10 text-center text-gray-500">
            <Building2 className="mx-auto mb-4 h-10 w-10 text-gray-400" />
            No projects yet.
          </div>
        ) : null}
      </div>
    </div>
  );
}
