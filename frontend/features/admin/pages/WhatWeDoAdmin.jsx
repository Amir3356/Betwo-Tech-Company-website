import { useEffect, useState } from "react";
import { Plus, X, LoaderCircle, Pencil, Trash2, Sparkles, Code } from "lucide-react";

const iconOptions = ["Code", "Database", "Smartphone", "Settings", "Globe", "Shield", "Cloud", "Palette", "BarChart", "Server", "PenTool", "Zap", "Monitor", "GitBranch", "Lightbulb", "Award", "Users", "Star", "Handshake", "LayoutTemplate", "Repeat"];

export default function WhatWeDoAdmin() {
  const [services, setServices] = useState([]);
  const [sectionMeta, setSectionMeta] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({ icon: "Code", title: "", description: "" });

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`/api/what-we-do`);
      const payload = await response.json();
      if (!response.ok) throw new Error(payload?.message || "Failed to load content.");
      const data = payload?.data || { title: "", description: "", services: [] };
      setSectionMeta({ title: data.title || "", description: data.description || "" });
      setServices(Array.isArray(data.services) ? data.services : []);
    } catch (err) {
      setError(err.message || "Failed to load content.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEditingIndex(null);
    setFormData({ icon: "Code", title: "", description: "" });
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
    });
    setIsModalOpen(true);
    setError("");
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const saveSectionMeta = async () => {
    setIsSubmitting(true);
    setError("");
    try {
      const response = await fetch(`/api/what-we-do`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: sectionMeta.title, description: sectionMeta.description, services }),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload?.message || "Failed to save section.");
    } catch (err) {
      setError(err.message || "Failed to save section.");
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
        ? `/api/what-we-do/services`
        : `/api/what-we-do/services/${editingIndex}`;
      const response = await fetch(url, {
        method: editingIndex === null ? "POST" : "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload?.message || "Failed to save service.");
      const data = payload?.data || { services: [] };
      setServices(Array.isArray(data.services) ? data.services : []);
      handleCloseModal();
    } catch (err) {
      setError(err.message || "Failed to save service.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (index) => {
    if (!window.confirm("Delete this service?")) return;
    setIsSubmitting(true);
    setError("");
    try {
      const response = await fetch(`/api/what-we-do/services/${index}`, {
        method: "DELETE", credentials: "include",
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload?.message || "Failed to delete.");
      const data = payload?.data || { services: [] };
      setServices(Array.isArray(data.services) ? data.services : []);
    } catch (err) {
      setError(err.message || "Failed to delete.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="rounded-3xl border border-gray-200 bg-white p-10 text-center text-gray-500">
        Loading What We Do content...
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

        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-lg font-bold text-gray-900">Section Content</h3>
            <button
              type="button"
              onClick={saveSectionMeta}
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? <LoaderCircle size={16} className="animate-spin" /> : <Sparkles size={16} />}
              Save Section
            </button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block space-y-2 text-sm font-medium text-gray-700">
              <span>Title</span>
              <input
                value={sectionMeta.title}
                onChange={(e) => setSectionMeta((p) => ({ ...p, title: e.target.value }))}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-blue-500"
              />
            </label>
            <label className="block space-y-2 text-sm font-medium text-gray-700">
              <span>Description</span>
              <textarea
                value={sectionMeta.description}
                onChange={(e) => setSectionMeta((p) => ({ ...p, description: e.target.value }))}
                rows={2}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-blue-500"
              />
            </label>
          </div>
        </div>

        {services.length === 0 ? (
          <div className="rounded-3xl border border-gray-200 bg-white p-10 text-center text-gray-500">
            <Code className="mx-auto mb-4 h-10 w-10 text-gray-400" />
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
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 px-0 sm:px-4">
            <div className="w-full max-w-2xl overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-white shadow-2xl max-h-[90vh] sm:max-h-none">
              <div className="flex items-center justify-between border-b border-gray-200 px-5 sm:px-6 py-3 sm:py-4 sticky top-0 bg-white">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900">{editingIndex !== null ? "Edit Service" : "Add Service"}</h3>
                  <p className="text-xs sm:text-sm text-gray-500">
                    {editingIndex !== null ? "Update the service details shown on the public site." : "Create a new service card for the public portfolio."}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="rounded-full p-1.5 sm:p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
                  aria-label="Close service form"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 px-5 sm:px-6 py-5 sm:py-6">
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
                    rows={5}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-blue-500"
                    placeholder="Service description"
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
