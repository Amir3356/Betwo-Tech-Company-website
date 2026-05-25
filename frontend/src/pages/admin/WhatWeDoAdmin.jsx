import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Sparkles, X, LoaderCircle } from "lucide-react";

const iconOptions = ["Code", "Database", "Smartphone", "Settings"];

export default function WhatWeDoAdmin() {
  const [content, setContent] = useState({ title: "", description: "", services: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [serviceForm, setServiceForm] = useState({ icon: "Code", title: "", description: "" });

  const apiBaseUrl = import.meta.env.VITE_API_URL || "http://localhost:5001";

  useEffect(() => {
    const loadContent = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/api/what-we-do`);
        const payload = await response.json();

        if (!response.ok) {
          throw new Error(payload?.message || "Failed to load What We Do content.");
        }

        setContent(payload?.data || { title: "", description: "", services: [] });
      } catch (loadError) {
        setError(loadError.message || "Failed to load What We Do content.");
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [apiBaseUrl]);

  const saveContent = async (nextContent) => {
    const response = await fetch(`${apiBaseUrl}/api/what-we-do`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nextContent),
    });

    const payload = await response.json();
    if (!response.ok) {
      throw new Error(payload?.message || "Failed to save What We Do content.");
    }

    setContent(payload?.data || nextContent);
  };

  const handleContentChange = (event) => {
    const { name, value } = event.target;
    setContent((current) => ({ ...current, [name]: value }));
  };

  const handleServiceChange = (event) => {
    const { name, value } = event.target;
    setServiceForm((current) => ({ ...current, [name]: value }));
  };

  const handleAddOrUpdateService = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      if (editingIndex === null) {
        const response = await fetch(`${apiBaseUrl}/api/what-we-do/services`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(serviceForm),
        });

        const payload = await response.json();
        if (!response.ok) {
          throw new Error(payload?.message || "Failed to add service.");
        }

        setContent(payload?.data || content);
      } else {
        const response = await fetch(`${apiBaseUrl}/api/what-we-do/services/${editingIndex}`, {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(serviceForm),
        });

        const payload = await response.json();
        if (!response.ok) {
          throw new Error(payload?.message || "Failed to update service.");
        }

        setContent(payload?.data || content);
        setEditingIndex(null);
      }

      setServiceForm({ icon: "Code", title: "", description: "" });
    } catch (saveError) {
      setError(saveError.message || "Failed to save service.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditService = (index) => {
    const service = content.services[index];
    setEditingIndex(index);
    setServiceForm({ icon: service.icon, title: service.title, description: service.description });
  };

  const handleDeleteService = async (index) => {
    const confirmed = window.confirm("Delete this What We Do item?");
    if (!confirmed) return;

    try {
      const response = await fetch(`${apiBaseUrl}/api/what-we-do/services/${index}`, {
        method: "DELETE",
        credentials: "include",
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload?.message || "Failed to delete service.");
      }

      setContent(payload?.data || content);
    } catch (deleteError) {
      setError(deleteError.message || "Failed to delete service.");
    }
  };

  const handleSaveMeta = async () => {
    setIsSubmitting(true);
    setError("");

    try {
      await saveContent({ ...content, services: content.services || [] });
    } catch (saveError) {
      setError(saveError.message || "Failed to save content.");
    } finally {
      setIsSubmitting(false);
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
            <p className="text-sm text-gray-600">Manage the services shown in the public What We Do section.</p>
          </div>
          <button
            type="button"
            onClick={handleSaveMeta}
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? <LoaderCircle size={18} className="animate-spin" /> : <Sparkles size={18} />}
            Save Content
          </button>
        </div>

        {error ? <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div> : null}

        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm space-y-4">
            <h3 className="text-xl font-bold text-gray-900">Section Content</h3>
            <label className="block space-y-2 text-sm font-medium text-gray-700">
              <span>Title</span>
              <input
                name="title"
                value={content.title}
                onChange={handleContentChange}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-blue-500"
              />
            </label>
            <label className="block space-y-2 text-sm font-medium text-gray-700">
              <span>Description</span>
              <textarea
                name="description"
                value={content.description}
                onChange={handleContentChange}
                rows={5}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-blue-500"
              />
            </label>
          </section>

          <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm space-y-4">
            <h3 className="text-xl font-bold text-gray-900">{editingIndex === null ? "Add Service" : "Edit Service"}</h3>
            <form className="space-y-4" onSubmit={handleAddOrUpdateService}>
              <label className="block space-y-2 text-sm font-medium text-gray-700">
                <span>Icon</span>
                <select name="icon" value={serviceForm.icon} onChange={handleServiceChange} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-blue-500">
                  {iconOptions.map((icon) => <option key={icon} value={icon}>{icon}</option>)}
                </select>
              </label>
              <label className="block space-y-2 text-sm font-medium text-gray-700">
                <span>Title</span>
                <input name="title" value={serviceForm.title} onChange={handleServiceChange} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-blue-500" />
              </label>
              <label className="block space-y-2 text-sm font-medium text-gray-700">
                <span>Description</span>
                <textarea name="description" value={serviceForm.description} onChange={handleServiceChange} rows={5} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-blue-500" />
              </label>
              <div className="flex gap-3">
                <button type="submit" disabled={isSubmitting} className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70">
                  {editingIndex === null ? <Plus size={18} /> : <Pencil size={18} />}
                  {editingIndex === null ? "Add Service" : "Update Service"}
                </button>
                {editingIndex !== null ? (
                  <button type="button" onClick={() => { setEditingIndex(null); setServiceForm({ icon: "Code", title: "", description: "" }); }} className="rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50">
                    Cancel
                  </button>
                ) : null}
              </div>
            </form>
          </section>
        </div>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900">Services List</h3>
            <span className="text-sm text-gray-500">{content.services.length} item(s)</span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {content.services.map((service, index) => (
              <article key={`${service.title}-${index}`} className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">{service.icon}</p>
                    <h4 className="mt-2 text-lg font-semibold text-gray-900">{service.title}</h4>
                  </div>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => handleEditService(index)} className="rounded-xl border border-gray-200 bg-white p-2 text-gray-600 transition hover:bg-gray-50">
                      <Pencil size={16} />
                    </button>
                    <button type="button" onClick={() => handleDeleteService(index)} className="rounded-xl border border-red-200 bg-red-50 p-2 text-red-600 transition hover:bg-red-100">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">{service.description}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}