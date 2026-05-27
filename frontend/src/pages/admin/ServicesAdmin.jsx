import { useEffect, useState } from "react";
import { Plus, X, LoaderCircle, Pencil, Trash2, Upload, LayoutTemplate } from "lucide-react";

const apiBaseUrl = import.meta.env.VITE_API_URL || "http://localhost:5001";

const iconOptions = ["Database", "Smartphone", "Lightbulb", "LayoutTemplate", "Settings", "Repeat", "Code"];

function resolveImageUrl(image) {
  if (!image) return "";
  if (/^https?:\/\//i.test(image)) return image;
  if (image.startsWith("/storage/")) return `${apiBaseUrl}${image}`;
  return image;
}

export default function ServicesAdmin() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ icon: "Code", title: "", description: "", points: [], image: null });

  useEffect(() => {
    loadServices();
  }, [apiBaseUrl]);

  const loadServices = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${apiBaseUrl}/api/services/comprehensive-table`, { credentials: "include" });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload?.message || "Failed to load services.");
      setServices(payload?.data || []);
    } catch (err) {
      setError(err.message || "Failed to load services.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({ icon: "Code", title: "", description: "", points: [], image: null });
  };

  const openCreateModal = () => {
    resetForm();
    setIsModalOpen(true);
    setError("");
  };

  const openEditModal = (svc) => {
    setEditingId(svc.id);
    setFormData({
      icon: svc.icon || "Code",
      title: svc.title || "",
      description: svc.description || "",
      points: Array.isArray(svc.points) ? svc.points : [],
      image: null,
    });
    setIsModalOpen(true);
    setError("");
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handleFileChange = (e) => {
    setFormData((p) => ({ ...p, image: e.target.files[0] || null }));
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this service?")) return;
    setIsSubmitting(true);
    setError("");
    try {
      const response = await fetch(`${apiBaseUrl}/api/services/comprehensive-table/${id}`, {
        method: "DELETE", credentials: "include",
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result?.message || "Failed to delete.");
      setServices(result.data || []);
    } catch (err) {
      setError(err.message || "Failed to delete.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");
    try {
      const url = editingId === null
        ? `${apiBaseUrl}/api/services/comprehensive-table`
        : `${apiBaseUrl}/api/services/comprehensive-table/${editingId}`;
      const payload = new FormData();
      payload.append("icon", formData.icon);
      payload.append("title", formData.title);
      payload.append("description", formData.description);
      payload.append("points", JSON.stringify(formData.points));
      if (formData.image) {
        payload.append("image", formData.image);
      }
      const response = await fetch(url, {
        method: editingId === null ? "POST" : "PUT",
        credentials: "include",
        body: payload,
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result?.message || "Failed to save service.");
      await loadServices();
      handleCloseModal();
    } catch (err) {
      setError(err.message || "Failed to save service.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleArrayField = (field, value) => {
    const items = value.split(",").map((s) => s.trim()).filter(Boolean);
    setFormData((prev) => ({ ...prev, [field]: items }));
  };

  if (loading) {
    return (
      <div className="rounded-3xl border border-gray-200 bg-white p-10 text-center text-gray-500">
        Loading services...
      </div>
    );
  }

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
            Add Service
          </button>
        </div>

        {error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
        ) : null}

        {services.length === 0 ? (
          <div className="rounded-3xl border border-gray-200 bg-white p-10 text-center text-gray-500">
            <LayoutTemplate className="mx-auto mb-4 h-10 w-10 text-gray-400" />
            No services yet.
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {services.map((svc) => (
              <article key={svc.id} className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
                <div className="space-y-3 p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">{svc.icon}</p>
                      <h3 className="text-lg font-semibold text-gray-900 mt-1">{svc.title}</h3>
                    </div>
                  </div>
                  {svc.image && (
                    <div className="aspect-[16/10] bg-gray-100 rounded-xl overflow-hidden">
                      <img src={resolveImageUrl(svc.image)} alt={svc.title} className="h-full w-full object-contain bg-white/70 p-2" />
                    </div>
                  )}
                  <p className="text-sm leading-6 text-gray-600 line-clamp-3">{svc.description}</p>
                  {svc.points?.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {svc.points.map((pt, idx) => (
                        <span key={idx} className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-600">{pt}</span>
                      ))}
                    </div>
                  )}
                  <div className="flex gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => openEditModal(svc)}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                    >
                      <Pencil size={16} />
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(svc.id)}
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
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6">
            <div className="w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl">
              <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{editingId !== null ? "Edit Service" : "Add Service"}</h3>
                  <p className="text-sm text-gray-500">
                    {editingId !== null ? "Update the service details shown on the public site." : "Create a new service card for the public portfolio."}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
                  aria-label="Close service form"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 px-6 py-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="space-y-2 text-sm font-medium text-gray-700">
                    <span>Icon</span>
                    <select
                      value={formData.icon}
                      onChange={(e) => setFormData((p) => ({ ...p, icon: e.target.value }))}
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-blue-500"
                    >
                      {iconOptions.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </label>
                  <label className="space-y-2 text-sm font-medium text-gray-700">
                    <span>Title</span>
                    <input
                      value={formData.title}
                      onChange={(e) => setFormData((p) => ({ ...p, title: e.target.value }))}
                      required
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-blue-500"
                      placeholder="Service title"
                    />
                  </label>
                </div>

                <label className="space-y-2 text-sm font-medium text-gray-700">
                  <span>Description</span>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData((p) => ({ ...p, description: e.target.value }))}
                    rows={4}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-blue-500"
                    placeholder="Service description"
                  />
                </label>

                <label className="space-y-2 text-sm font-medium text-gray-700">
                  <span>Points (comma-separated)</span>
                  <input
                    value={formData.points.join(", ")}
                    onChange={(e) => handleArrayField("points", e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-blue-500"
                    placeholder="Point 1, Point 2, Point 3"
                  />
                </label>

                <label className="space-y-2 text-sm font-medium text-gray-700">
                  <span>Image</span>
                  <div className="flex items-center gap-3 rounded-xl border border-dashed border-gray-300 bg-gray-50 px-4 py-4">
                    <Upload size={18} className="text-gray-500" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
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
                    {isSubmitting ? "Saving..." : editingIndex !== null ? "Update Service" : "Save Service"}
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
