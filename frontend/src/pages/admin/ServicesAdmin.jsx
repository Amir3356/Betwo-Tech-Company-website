import { useEffect, useState } from "react";
import { Plus, X, LoaderCircle, Pencil, Trash2, LayoutTemplate } from "lucide-react";

const iconOptions = ["Database", "Smartphone", "Lightbulb", "LayoutTemplate", "Settings", "Repeat", "Code"];

export default function ServicesAdmin() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({ icon: "Code", title: "", description: "", points: [] });

  const apiBaseUrl = import.meta.env.VITE_API_URL || "http://localhost:5001";

  useEffect(() => {
    loadServices();
  }, [apiBaseUrl]);

  const loadServices = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${apiBaseUrl}/api/services`);
      const payload = await response.json();
      if (!response.ok) throw new Error(payload?.message || "Failed to load services.");
      setServices(payload?.data?.comprehensive?.services || []);
    } catch (err) {
      setError(err.message || "Failed to load services.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEditingIndex(null);
    setFormData({ icon: "Code", title: "", description: "", points: [] });
  };

  const openCreateModal = () => {
    resetForm();
    setIsModalOpen(true);
    setError("");
  };

  const openEditModal = (svc, index) => {
    setEditingIndex(index);
    setFormData({
      icon: svc.icon || "Code",
      title: svc.title || "",
      description: svc.description || "",
      points: Array.isArray(svc.points) ? svc.points : [],
    });
    setIsModalOpen(true);
    setError("");
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handleDelete = async (index) => {
    if (!window.confirm("Delete this service?")) return;
    setIsSubmitting(true);
    setError("");
    try {
      const response = await fetch(`${apiBaseUrl}/api/services/comprehensive/${index}`, {
        method: "DELETE", credentials: "include",
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result?.message || "Failed to delete.");
      setServices(result.data?.comprehensive?.services || []);
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
      const url = editingIndex === null
        ? `${apiBaseUrl}/api/services/comprehensive`
        : `${apiBaseUrl}/api/services/comprehensive/${editingIndex}`;
      const response = await fetch(url, {
        method: editingIndex === null ? "POST" : "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result?.message || "Failed to save service.");
      setServices(result.data?.comprehensive?.services || []);
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
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-3xl font-bold text-gray-900">Services Admin</h2>
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
            {services.map((svc, i) => (
              <article key={i} className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
                <div className="space-y-3 p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">{svc.icon}</p>
                      <h3 className="text-lg font-semibold text-gray-900 mt-1">{svc.title}</h3>
                    </div>
                  </div>
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
                      onClick={() => openEditModal(svc, i)}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                    >
                      <Pencil size={16} />
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(i)}
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
                  <h3 className="text-xl font-bold text-gray-900">{editingIndex !== null ? "Edit Service" : "Add Service"}</h3>
                  <p className="text-sm text-gray-500">
                    {editingIndex !== null ? "Update the service details shown on the public site." : "Create a new service card for the public portfolio."}
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
