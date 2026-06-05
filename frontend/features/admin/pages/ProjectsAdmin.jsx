import { useEffect, useState } from "react";
import { Plus, Building2, X, Upload, LoaderCircle, Pencil, Trash2 } from "lucide-react";
import { resolveProjectImageUrl } from "../../../shared/utils/projectImageUrl";

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    detail: "",
    image: null,
  });

  useEffect(() => {
    const loadProjects = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(`/api/projects`);
        const payload = await response.json();

        if (!response.ok) {
          throw new Error(payload?.message || "Failed to load projects.");
        }

        setProjects(Array.isArray(payload?.data) ? payload.data : []);
      } catch (loadError) {
        setError(loadError.message || "Failed to load projects.");
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  const handleChange = (event) => {
    const { name, value, files } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: files ? files[0] : value,
    }));
  };

  const resetForm = () => {
    setEditingProjectId(null);
    setFormData({
      title: "",
      description: "",
      detail: "",
      image: null,
    });
  };

  const openCreateModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const openEditModal = (project) => {
    setEditingProjectId(project.id);
    setFormData({
      title: project.title || "",
      description: project.description || "",
      detail: project.detail || "",
      image: null,
    });
    setIsModalOpen(true);
    setError("");
  };

  const handleDelete = async (id) => {
    const shouldDelete = window.confirm("Delete this project permanently?");
    if (!shouldDelete) return;

    setError("");

    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.message || "Failed to delete project.");
      }

      setProjects((current) => current.filter((project) => project.id !== id));
    } catch (deleteError) {
      setError(deleteError.message || "Failed to delete project.");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8 md:px-6 lg:px-10 lg:py-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
          <button
            type="button"
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            <Plus size={18} />
            Add Project
          </button>
        </div>

        {error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        {loading ? (
          <div className="rounded-3xl border border-gray-200 bg-white p-10 text-center text-gray-500">
            Loading projects...
          </div>
        ) : projects.length === 0 ? (
          <div className="rounded-3xl border border-gray-200 bg-white p-10 text-center text-gray-500">
            <Building2 className="mx-auto mb-4 h-10 w-10 text-gray-400" />
            No projects yet.
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <article key={project.id} className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
                <div className="aspect-[16/10] bg-gray-100">
                  {project.image ? (
                    <img
                      src={resolveProjectImageUrl(project.image)}
                      alt={project.title}
                      className="h-full w-full object-contain bg-white/70 p-2"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-gray-400">
                      <Building2 size={40} />
                    </div>
                  )}
                </div>
                <div className="space-y-3 p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
                    </div>
                  </div>
                  <p className="text-sm leading-6 text-gray-600 line-clamp-3">{project.description}</p>

                  <div className="flex gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => openEditModal(project)}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                    >
                      <Pencil size={16} />
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(project.id)}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-100"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {isModalOpen ? (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 px-0 sm:px-4">
            <div className="w-full max-w-2xl overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-white shadow-2xl max-h-[90vh] sm:max-h-none">
              <div className="flex items-center justify-between border-b border-gray-200 px-5 sm:px-6 py-3 sm:py-4 sticky top-0 bg-white">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900">{editingProjectId ? "Edit Project" : "Add Project"}</h3>
                  <p className="text-xs sm:text-sm text-gray-500">
                    {editingProjectId ? "Update the project details shown on the public site." : "Create a new project card for the public portfolio."}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="rounded-full p-1.5 sm:p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
                  aria-label="Close project form"
                >
                  <X size={18} />
                </button>
              </div>

              <form
                onSubmit={async (event) => {
                  event.preventDefault();
                  setIsSubmitting(true);
                  setError("");

                  try {
                    const payload = new FormData();
                    payload.append("title", formData.title);
                    payload.append("description", formData.description);
                    payload.append("detail", formData.detail);

                    if (formData.image) {
                      payload.append("image", formData.image);
                    }

                    const endpoint = editingProjectId
                      ? `/api/projects/${editingProjectId}`
                      : `/api/projects`;

                    const response = await fetch(endpoint, {
                      method: editingProjectId ? "PUT" : "POST",
                      credentials: "include",
                      body: payload,
                    });

                    const result = await response.json();

                    if (!response.ok) {
                      throw new Error(result?.message || (editingProjectId ? "Failed to update project." : "Failed to create project."));
                    }

                    setProjects((current) => {
                      if (editingProjectId) {
                        return current.map((project) => (project.id === editingProjectId ? result.data : project));
                      }

                      return [result.data, ...current];
                    });

                    handleCloseModal();
                  } catch (submitError) {
                    setError(submitError.message || "Failed to save project.");
                  } finally {
                    setIsSubmitting(false);
                  }
                }}
                className="space-y-4 px-5 sm:px-6 py-5 sm:py-6"
              >
                <label className="space-y-2 text-sm font-medium text-gray-700">
                  <span>Title</span>
                  <input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-blue-500"
                    placeholder="Project title"
                  />
                </label>

                <label className="space-y-2 text-sm font-medium text-gray-700">
                  <span>Description</span>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={5}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-blue-500"
                    placeholder="Project description"
                  />
                </label>

                <label className="space-y-2 text-sm font-medium text-gray-700">
                  <span>View Detail Description</span>
                  <textarea
                    name="detail"
                    value={formData.detail}
                    onChange={handleChange}
                    rows={5}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-blue-500"
                    placeholder="Detailed description shown on the project detail page"
                  />
                </label>

                <label className="space-y-2 text-sm font-medium text-gray-700">
                  <span>Image</span>
                  <div className="flex items-center gap-3 rounded-xl border border-dashed border-gray-300 bg-gray-50 px-4 py-4">
                    <Upload size={18} className="text-gray-500 shrink-0" />
                    <input
                      name="image"
                      type="file"
                      accept="image/*"
                      onChange={handleChange}
                      className="w-full text-sm text-gray-600 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-blue-700"
                    />
                  </div>
                </label>

                <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isSubmitting ? <LoaderCircle size={18} className="animate-spin" /> : <Plus size={18} />}
                    {isSubmitting ? "Saving..." : editingProjectId ? "Update Project" : "Save Project"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
