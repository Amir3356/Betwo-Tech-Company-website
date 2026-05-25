import { useEffect, useState } from "react";
import { LoaderCircle, Plus, Pencil, Sparkles, Trash2 } from "lucide-react";

const iconOptions = ["Code", "Database", "Smartphone", "Settings"];

export default function WhatWeDoAdmin() {
  const [content, setContent] = useState({ title: "", description: "", services: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({ icon: "Code", title: "", description: "" });

  const apiBaseUrl = import.meta.env.VITE_API_URL || "http://localhost:5001";

  useEffect(() => {
    const loadContent = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/api/what-we-do`);
        const payload = await response.json();

        if (!response.ok) {
          throw new Error(payload?.message || "Failed to load What We Do content.");
        }

        const nextContent = payload?.data || { title: "", description: "", services: [] };
        setContent(nextContent);

        if (Array.isArray(nextContent.services) && nextContent.services.length > 0) {
          const first = nextContent.services[0];
          setSelectedIndex(0);
          setEditingIndex(0);
          setFormData({
            icon: first.icon || "Code",
            title: first.title || "",
            description: first.description || "",
          });
        }
      } catch (loadError) {
        setError(loadError.message || "Failed to load What We Do content.");
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [apiBaseUrl]);

  const handleSectionChange = (event) => {
    const { name, value } = event.target;
    setContent((current) => ({ ...current, [name]: value }));
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const openNewService = () => {
    setSelectedIndex(null);
    setEditingIndex(null);
    setFormData({ icon: "Code", title: "", description: "" });
    setError("");
  };

  const selectService = (index) => {
    const service = content.services[index];
    if (!service) return;

    setSelectedIndex(index);
    setEditingIndex(index);
    setFormData({
      icon: service.icon || "Code",
      title: service.title || "",
      description: service.description || "",
    });
    setError("");
  };

  const saveSection = async () => {
    setIsSaving(true);
    setError("");

    try {
      const response = await fetch(`${apiBaseUrl}/api/what-we-do`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: content.title,
          description: content.description,
          services: content.services || [],
        }),
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload?.message || "Failed to save What We Do content.");
      }

      setContent(payload?.data || content);
    } catch (saveError) {
      setError(saveError.message || "Failed to save section content.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSaving(true);
    setError("");

    try {
      const url =
        editingIndex === null
          ? `${apiBaseUrl}/api/what-we-do/services`
          : `${apiBaseUrl}/api/what-we-do/services/${editingIndex}`;

      const response = await fetch(url, {
        method: editingIndex === null ? "POST" : "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          icon: formData.icon,
          title: formData.title,
          description: formData.description,
        }),
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload?.message || (editingIndex === null ? "Failed to add service." : "Failed to update service."));
      }

      const nextContent = payload?.data || content;
      setContent(nextContent);

      if (editingIndex === null) {
        const newIndex = Array.isArray(nextContent.services) ? nextContent.services.length - 1 : null;
        setSelectedIndex(newIndex);
        setEditingIndex(newIndex);
      } else {
        setSelectedIndex(editingIndex);
      }

      setFormData({ icon: "Code", title: "", description: "" });
    } catch (submitError) {
      setError(submitError.message || "Failed to save service.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (index) => {
    const confirmed = window.confirm("Delete this What We Do item?");
    if (!confirmed) return;

    setIsSaving(true);
    setError("");

    try {
      const response = await fetch(`${apiBaseUrl}/api/what-we-do/services/${index}`, {
        method: "DELETE",
        credentials: "include",
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload?.message || "Failed to delete service.");
      }

      const nextContent = payload?.data || content;
      setContent(nextContent);

      if (!nextContent.services?.length) {
        openNewService();
        return;
      }

      const nextIndex = Math.min(index, nextContent.services.length - 1);
      selectService(nextIndex);
    } catch (deleteError) {
      setError(deleteError.message || "Failed to delete service.");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return <div className="rounded-3xl border border-gray-200 bg-white p-10 text-center text-gray-500">Loading What We Do content...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8 md:px-6 lg:px-10 lg:py-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">What We Do Admin</h2>
            <p className="text-sm text-gray-600">A simple sidebar editor for the section title, description, and services.</p>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={saveSection}
              disabled={isSaving}
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSaving ? <LoaderCircle size={18} className="animate-spin" /> : <Sparkles size={18} />}
              Save Section
            </button>
            <button
              type="button"
              onClick={openNewService}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              <Plus size={18} />
              Add Service
            </button>
          </div>
        </div>

        {error ? <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div> : null}

        <section className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm xl:grid xl:grid-cols-[300px_1fr]">
          <aside className="border-b border-gray-200 bg-gray-50 p-4 xl:border-b-0 xl:border-r">
            <div className="rounded-2xl border border-gray-200 bg-white p-4 space-y-4 mb-4">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-gray-900">Section Content</h3>
                <p className="text-sm text-gray-500">Edit the headline shown on the public page.</p>
              </div>
              <label className="block space-y-2 text-sm font-medium text-gray-700">
                <span>Title</span>
                <input
                  name="title"
                  value={content.title}
                  onChange={handleSectionChange}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-blue-500"
                />
              </label>
              <label className="block space-y-2 text-sm font-medium text-gray-700">
                <span>Description</span>
                <textarea
                  name="description"
                  value={content.description}
                  onChange={handleSectionChange}
                  rows={4}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-blue-500"
                />
              </label>
            </div>

            <div className="mb-4 flex items-center justify-between gap-3">
              <h3 className="text-lg font-bold text-gray-900">Services</h3>
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">{content.services.length} items</span>
            </div>

            <div className="space-y-2">
              {content.services.map((service, index) => {
                const active = index === selectedIndex;

                return (
                  <button
                    key={`${service.title}-${index}`}
                    type="button"
                    onClick={() => selectService(index)}
                    className={[
                      "w-full rounded-2xl border px-4 py-3 text-left transition",
                      active
                        ? "border-blue-500 bg-blue-500/10 text-gray-900 shadow-sm"
                        : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50",
                    ].join(" ")}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">{service.icon}</p>
                        <h4 className="mt-1 truncate text-sm font-semibold text-gray-900">{service.title}</h4>
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
                <h3 className="text-xl font-bold text-gray-900">{editingIndex === null ? "Add Service" : "Edit Service"}</h3>
                <p className="text-sm text-gray-500">Choose a service from the sidebar to edit it.</p>
              </div>
              {editingIndex !== null ? (
                <button
                  type="button"
                  onClick={() => handleDelete(editingIndex)}
                  className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-100"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              ) : null}
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block space-y-2 text-sm font-medium text-gray-700">
                  <span>Icon</span>
                  <select
                    name="icon"
                    value={formData.icon}
                    onChange={handleFormChange}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-blue-500"
                  >
                    {iconOptions.map((icon) => (
                      <option key={icon} value={icon}>
                        {icon}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block space-y-2 text-sm font-medium text-gray-700">
                  <span>Title</span>
                  <input
                    name="title"
                    value={formData.title}
                    onChange={handleFormChange}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-blue-500"
                  />
                </label>
              </div>

              <label className="block space-y-2 text-sm font-medium text-gray-700">
                <span>Description</span>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleFormChange}
                  rows={7}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-blue-500"
                />
              </label>

              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                {editingIndex !== null ? (
                  <button
                    type="button"
                    onClick={openNewService}
                    className="rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                  >
                    New Service
                  </button>
                ) : null}
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
        </section>
      </div>
    </div>
  );
}
