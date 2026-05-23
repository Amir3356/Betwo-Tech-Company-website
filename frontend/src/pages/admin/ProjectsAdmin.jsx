import { useEffect, useState } from "react";
import axios from "axios";
import {
  LoaderCircle,
  AlertCircle,
  Plus,
  Pencil,
  Trash2,
  X,
  Image,
  Building2,
  Upload,
} from "lucide-react";

const INITIAL_FORM = {
  title: "",
  category: "",
  uptime: "99.9%",
  duration: "",
  description: "",
  image: null,
  imagePreview: null,
};

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  const fetchProjects = async () => {
    try {
      const response = await axios.get("/api/projects");
      setProjects(response.data?.data || []);
      setError("");
    } catch {
      setError("Unable to load projects.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const openCreateModal = () => {
    setEditingProject(null);
    setFormData(INITIAL_FORM);
    setFormError("");
    setIsModalOpen(true);
  };

  const openEditModal = (project) => {
    setEditingProject(project);
    setFormData({
      title: project.title || "",
      category: project.category || "",
      uptime: project.uptime || "99.9%",
      duration: project.duration || "",
      description: project.description || "",
      image: null,
      imagePreview: project.image || null,
    });
    setFormError("");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProject(null);
    setFormData(INITIAL_FORM);
    setFormError("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        image: file,
        imagePreview: previewUrl,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setFormError("");

    try {
      const formPayload = new FormData();
      formPayload.append("title", formData.title);
      formPayload.append("category", formData.category);
      formPayload.append("uptime", formData.uptime);
      formPayload.append("duration", formData.duration);
      formPayload.append("description", formData.description);
      if (formData.image) {
        formPayload.append("image", formData.image);
      }

      if (editingProject) {
        await axios.post(`/api/projects/${editingProject.id}`, formPayload);
      } else {
        await axios.post("/api/projects", formPayload);
      }
      await fetchProjects();
      closeModal();
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        // Handle validation errors
        const firstError = Object.values(err.response.data.errors)[0][0];
        setFormError(firstError);
      } else if (err.response && err.response.data && err.response.data.message) {
        setFormError(err.response.data.message);
      } else {
        setFormError("Failed to save project.");
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (project) => {
    if (!window.confirm(`Delete "${project.title}"?`)) return;

    try {
      await axios.delete(`/api/projects/${project.id}`);
      await fetchProjects();
    } catch {
      alert("Failed to delete project.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8 md:px-6 lg:px-10 lg:py-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-3xl font-bold text-gray-900">Projects</h2>
          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            <Plus size={18} />
            Add Project
          </button>
        </div>

        {loading ? (
          <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-5 py-6 text-gray-600">
            <LoaderCircle className="h-5 w-5 animate-spin text-blue-500" />
            Loading projects...
          </div>
        ) : error ? (
          <div className="flex items-center gap-3 rounded-2xl border border-red-300 bg-red-50 px-5 py-6 text-red-600">
            <AlertCircle className="h-5 w-5" />
            {error}
          </div>
        ) : projects.length === 0 ? (
          <div className="rounded-3xl border border-gray-200 bg-white p-10 text-center text-gray-500">
            <Building2 className="mx-auto mb-4 h-10 w-10 text-gray-400" />
            No projects yet. Click "Add Project" to create one.
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <article
                key={project.id}
                className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition hover:shadow-lg"
              >
                <div className="aspect-[16/10] w-full overflow-hidden bg-gray-100">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-full w-full object-cover transition group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-gray-400">
                      <Image size={40} />
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
                      {project.category}
                    </span>
                    <span className="text-xs text-gray-500">{project.uptime}</span>
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">
                    {project.title}
                  </h3>
                  <p className="mb-4 text-sm text-gray-500 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                    <span className="text-sm text-gray-500">{project.duration}</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEditModal(project)}
                        className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-blue-600"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(project)}
                        className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-red-600"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">
                {editingProject ? "Edit Project" : "Add New Project"}
              </h3>
              <button
                onClick={closeModal}
                className="rounded-lg p-2 hover:bg-gray-100"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            {formError && (
              <div className="mb-4 rounded-xl border border-red-300 bg-red-50 p-3 text-sm text-red-600">
                {formError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  placeholder="Project title"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    placeholder="Enter category (e.g. ERP, CRM)"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Duration
                  </label>
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    placeholder="e.g., 8 weeks"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Uptime
                  </label>
                  <input
                    type="text"
                    name="uptime"
                    value={formData.uptime}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    placeholder="e.g., 99.9%"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Image
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                    />
                    <div className="flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-gray-500 hover:bg-gray-50">
                      <Upload size={18} />
                      <span className="truncate text-sm">
                        {formData.image?.name || "Choose image"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {formData.imagePreview && (
                <div className="rounded-xl border border-gray-200 p-3">
                  <p className="mb-2 text-sm font-medium text-gray-700">Preview:</p>
                  <img
                    src={formData.imagePreview}
                    alt="Preview"
                    className="h-32 w-full rounded-lg object-cover"
                  />
                </div>
              )}

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  placeholder="Project description"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                >
                  {saving && <LoaderCircle className="h-4 w-4 animate-spin" />}
                  {editingProject ? "Update Project" : "Create Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}