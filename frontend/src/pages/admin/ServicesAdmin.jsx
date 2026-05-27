import { useEffect, useState } from "react";
import {
  LoaderCircle, Plus, Pencil, Trash2, Settings
} from "lucide-react";

const iconOptions = ["Database", "Smartphone", "Lightbulb", "LayoutTemplate", "Settings", "Repeat", "Code"];

export default function ServicesAdmin() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
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
      const items = payload?.data?.comprehensive?.services || [];
      setServices(items);
    } catch (err) {
      setError(err.message || "Failed to load services.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEditingIndex(null);
    setFormData({ icon: "Code", title: "", description: "", points: [] });
    setError("");
  };

  const selectService = (index) => {
    const svc = services[index];
    if (!svc) return;
    setEditingIndex(index);
    setFormData({
      icon: svc.icon || "Code",
      title: svc.title || "",
      description: svc.description || "",
      points: Array.isArray(svc.points) ? svc.points : [],
    });
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSaving(true);
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
      const items = result.data?.comprehensive?.services || [];
      setServices(items);
      resetForm();
    } catch (err) {
      setError(err.message || "Failed to save service.");
    } finally {
      setIsSaving(false);
    }
  };

  const deleteService = async (index) => {
    if (!window.confirm("Delete this service?")) return;
    setIsSaving(true);
    setError("");
    try {
      const response = await fetch(`${apiBaseUrl}/api/services/comprehensive/${index}`, {
        method: "DELETE", credentials: "include",
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result?.message || "Failed to delete.");
      const items = result.data?.comprehensive?.services || [];
      setServices(items);
      if (editingIndex === index) resetForm();
    } catch (err) {
      setError(err.message || "Failed to delete.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleArrayField = (field, value) => {
    const items = value.split(",").map((s) => s.trim()).filter(Boolean);
    setFormData((prev) => ({ ...prev, [field]: items }));
  };

  if (loading) {
    return (
      <div className="rounded-3xl border border-gray-200 bg-white p-10 text-center text-gray-500">
        Loading services content...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8 md:px-6 lg:px-10 lg:py-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Services Admin</h2>
            <p className="text-sm text-gray-600">Manage all services content shown on the public site.</p>
          </div>
        </div>

        {error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
        ) : null}

        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm xl:grid xl:grid-cols-[300px_1fr]">
          <aside className="border-b border-gray-200 bg-gray-50 p-4 xl:border-b-0 xl:border-r">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h3 className="text-lg font-bold text-gray-900">Services</h3>
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                {services.length} items
              </span>
            </div>

            <div className="space-y-2">
              <button
                type="button"
                onClick={resetForm}
                className="w-full rounded-2xl border border-dashed border-gray-300 px-4 py-3 text-sm font-medium text-blue-600 hover:border-blue-400 hover:bg-blue-50 transition flex items-center justify-center gap-2"
              >
                <Plus size={16} /> Add Service
              </button>
              {services.map((svc, i) => {
                const active = i === editingIndex;
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => selectService(i)}
                    className={[
                      "w-full rounded-2xl border px-4 py-3 text-left transition",
                      active
                        ? "border-blue-500 bg-blue-500/10 text-gray-900 shadow-sm"
                        : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50",
                    ].join(" ")}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">{svc.icon}</p>
                        <h4 className="mt-1 truncate text-sm font-semibold text-gray-900">{svc.title}</h4>
                      </div>
                      <Pencil size={14} className="shrink-0 text-gray-400" />
                    </div>
                  </button>
                );
              })}
            </div>
          </aside>

          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  {editingIndex === null ? "Add Service" : "Edit Service"}
                </h3>
                <p className="text-sm text-gray-500">
                  {editingIndex === null
                    ? "Fill in the details for the new service."
                    : "Edit the selected service details."}
                </p>
              </div>
              {editingIndex !== null && (
                <button
                  type="button"
                  onClick={() => deleteService(editingIndex)}
                  className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-100"
                >
                  <Trash2 size={16} /> Delete
                </button>
              )}
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block space-y-2 text-sm font-medium text-gray-700">
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
                <label className="block space-y-2 text-sm font-medium text-gray-700">
                  <span>Title</span>
                  <input
                    value={formData.title}
                    onChange={(e) => setFormData((p) => ({ ...p, title: e.target.value }))}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-blue-500"
                  />
                </label>
              </div>
              <label className="block space-y-2 text-sm font-medium text-gray-700">
                <span>Description</span>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData((p) => ({ ...p, description: e.target.value }))}
                  rows={4}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-blue-500"
                />
              </label>
              <label className="block space-y-2 text-sm font-medium text-gray-700">
                <span>Points (comma-separated)</span>
                <input
                  value={formData.points.join(", ")}
                  onChange={(e) => handleArrayField("points", e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-blue-500"
                  placeholder="Point 1, Point 2, Point 3"
                />
              </label>
              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                {editingIndex !== null && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                  >
                    New Service
                  </button>
                )}
                <button
                  type="submit"
                  disabled={isSaving}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSaving ? <LoaderCircle size={18} className="animate-spin" /> : editingIndex === null ? <Plus size={18} /> : <Pencil size={18} />}
                  {editingIndex === null ? "Add Service" : "Update Service"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
