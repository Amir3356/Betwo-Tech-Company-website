import { useEffect, useState } from "react";
import {
  LoaderCircle, Plus, Pencil, Trash2, Settings, LayoutTemplate,
  Database, Smartphone, Lightbulb, Repeat, Sparkles, ListOrdered
} from "lucide-react";

const iconOptions = ["Database", "Smartphone", "Lightbulb", "LayoutTemplate", "Settings", "Repeat", "Code"];

const sections = [
  { id: "comprehensive", label: "Comprehensive Services", icon: LayoutTemplate },
  { id: "hero", label: "Hero Section", icon: Settings },
  { id: "deepdives", label: "Feature Deep Dives", icon: Sparkles },
  { id: "process", label: "Process Steps", icon: ListOrdered },
];

export default function ServicesAdmin() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [activeSection, setActiveSection] = useState("comprehensive");
  const [selectedServiceIndex, setSelectedServiceIndex] = useState(null);
  const [editingServiceIndex, setEditingServiceIndex] = useState(null);
  const [serviceForm, setServiceForm] = useState({ icon: "Database", title: "", description: "", points: [] });
  const [comprehensiveMeta, setComprehensiveMeta] = useState({ title: "", description: "" });

  const [heroForm, setHeroForm] = useState({ title: "", highlightTitle: "", description: "", image: "" });

  const [deepDivesMeta, setDeepDivesMeta] = useState({ title: "", description: "" });
  const [selectedDiveIndex, setSelectedDiveIndex] = useState(null);
  const [editingDiveIndex, setEditingDiveIndex] = useState(null);
  const [diveForm, setDiveForm] = useState({
    title: "", description: "", features: [], benefits: [], tech: [], image: "", reverse: false,
  });

  const [processMeta, setProcessMeta] = useState({ title: "" });
  const [selectedStepIndex, setSelectedStepIndex] = useState(null);
  const [editingStepIndex, setEditingStepIndex] = useState(null);
  const [stepForm, setStepForm] = useState({ number: "", title: "", description: "" });

  const apiBaseUrl = import.meta.env.VITE_API_URL || "http://localhost:5001";

  useEffect(() => {
    loadContent();
  }, [apiBaseUrl]);

  const loadContent = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${apiBaseUrl}/api/services`);
      const payload = await response.json();
      if (!response.ok) throw new Error(payload?.message || "Failed to load services.");
      const content = payload?.data || null;
      setData(content);
      if (content) {
        setComprehensiveMeta({
          title: content.comprehensive?.title || "",
          description: content.comprehensive?.description || "",
        });
        setHeroForm({
          title: content.hero?.title || "",
          highlightTitle: content.hero?.highlightTitle || "",
          description: content.hero?.description || "",
          image: content.hero?.image || "",
        });
        setDeepDivesMeta({
          title: content.featureDeepDivesSection?.title || "",
          description: content.featureDeepDivesSection?.description || "",
        });
        setProcessMeta({ title: content.process?.title || "" });

        if (Array.isArray(content.comprehensive?.services) && content.comprehensive.services.length > 0) {
          selectService(0);
        }
        if (Array.isArray(content.featureDeepDives) && content.featureDeepDives.length > 0) {
          selectDive(0);
        }
        if (Array.isArray(content.process?.steps) && content.process.steps.length > 0) {
          selectStep(0);
        }
      }
    } catch (err) {
      setError(err.message || "Failed to load services.");
    } finally {
      setLoading(false);
    }
  };

  const selectService = (index) => {
    const svc = data?.comprehensive?.services?.[index];
    if (!svc) return;
    setSelectedServiceIndex(index);
    setEditingServiceIndex(index);
    setServiceForm({
      icon: svc.icon || "Database",
      title: svc.title || "",
      description: svc.description || "",
      points: Array.isArray(svc.points) ? svc.points : [],
    });
    setError("");
  };

  const openNewService = () => {
    setSelectedServiceIndex(null);
    setEditingServiceIndex(null);
    setServiceForm({ icon: "Database", title: "", description: "", points: [] });
    setError("");
  };

  const selectDive = (index) => {
    const dive = data?.featureDeepDives?.[index];
    if (!dive) return;
    setSelectedDiveIndex(index);
    setEditingDiveIndex(index);
    setDiveForm({
      title: dive.title || "",
      description: dive.description || "",
      features: Array.isArray(dive.features) ? dive.features : [],
      benefits: Array.isArray(dive.benefits) ? dive.benefits : [],
      tech: Array.isArray(dive.tech) ? dive.tech : [],
      image: dive.image || "",
      reverse: !!dive.reverse,
    });
    setError("");
  };

  const openNewDive = () => {
    setSelectedDiveIndex(null);
    setEditingDiveIndex(null);
    setDiveForm({ title: "", description: "", features: [], benefits: [], tech: [], image: "", reverse: false });
    setError("");
  };

  const selectStep = (index) => {
    const step = data?.process?.steps?.[index];
    if (!step) return;
    setSelectedStepIndex(index);
    setEditingStepIndex(index);
    setStepForm({
      number: step.number || "",
      title: step.title || "",
      description: step.description || "",
    });
    setError("");
  };

  const openNewStep = () => {
    setSelectedStepIndex(null);
    setEditingStepIndex(null);
    setStepForm({ number: "", title: "", description: "" });
    setError("");
  };

  const saveFullContent = async () => {
    setIsSaving(true);
    setError("");
    try {
      const payload = {
        ...data,
        comprehensive: { ...data.comprehensive, ...comprehensiveMeta },
        hero: { ...heroForm },
        featureDeepDivesSection: { ...deepDivesMeta },
        process: { ...processMeta },
      };
      const response = await fetch(`${apiBaseUrl}/api/services`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result?.message || "Failed to save.");
      setData(result.data);
    } catch (err) {
      setError(err.message || "Failed to save.");
    } finally {
      setIsSaving(false);
    }
  };

  const submitService = async (event) => {
    event.preventDefault();
    setIsSaving(true);
    setError("");
    try {
      const url = editingServiceIndex === null
        ? `${apiBaseUrl}/api/services/comprehensive`
        : `${apiBaseUrl}/api/services/comprehensive/${editingServiceIndex}`;
      const response = await fetch(url, {
        method: editingServiceIndex === null ? "POST" : "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(serviceForm),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result?.message || "Failed to save service.");
      setData(result.data);
      if (editingServiceIndex === null) {
        const newIdx = Array.isArray(result.data.comprehensive?.services) ? result.data.comprehensive.services.length - 1 : null;
        setSelectedServiceIndex(newIdx);
        setEditingServiceIndex(newIdx);
      }
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
      setData(result.data);
      if (!result.data.comprehensive?.services?.length) {
        openNewService();
      } else {
        const nextIdx = Math.min(index, result.data.comprehensive.services.length - 1);
        selectService(nextIdx);
      }
    } catch (err) {
      setError(err.message || "Failed to delete.");
    } finally {
      setIsSaving(false);
    }
  };

  const submitDive = async (event) => {
    event.preventDefault();
    setIsSaving(true);
    setError("");
    try {
      const url = editingDiveIndex === null
        ? `${apiBaseUrl}/api/services/deepdives`
        : `${apiBaseUrl}/api/services/deepdives/${editingDiveIndex}`;
      const response = await fetch(url, {
        method: editingDiveIndex === null ? "POST" : "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(diveForm),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result?.message || "Failed to save deep dive.");
      setData(result.data);
      if (editingDiveIndex === null) {
        const newIdx = Array.isArray(result.data.featureDeepDives) ? result.data.featureDeepDives.length - 1 : null;
        setSelectedDiveIndex(newIdx);
        setEditingDiveIndex(newIdx);
      }
    } catch (err) {
      setError(err.message || "Failed to save deep dive.");
    } finally {
      setIsSaving(false);
    }
  };

  const deleteDive = async (index) => {
    if (!window.confirm("Delete this deep dive?")) return;
    setIsSaving(true);
    setError("");
    try {
      const response = await fetch(`${apiBaseUrl}/api/services/deepdives/${index}`, {
        method: "DELETE", credentials: "include",
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result?.message || "Failed to delete.");
      setData(result.data);
      if (!result.data.featureDeepDives?.length) {
        openNewDive();
      } else {
        const nextIdx = Math.min(index, result.data.featureDeepDives.length - 1);
        selectDive(nextIdx);
      }
    } catch (err) {
      setError(err.message || "Failed to delete.");
    } finally {
      setIsSaving(false);
    }
  };

  const submitStep = async (event) => {
    event.preventDefault();
    setIsSaving(true);
    setError("");
    try {
      const url = editingStepIndex === null
        ? `${apiBaseUrl}/api/services/process-steps`
        : `${apiBaseUrl}/api/services/process-steps/${editingStepIndex}`;
      const response = await fetch(url, {
        method: editingStepIndex === null ? "POST" : "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(stepForm),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result?.message || "Failed to save step.");
      setData(result.data);
      if (editingStepIndex === null) {
        const newIdx = Array.isArray(result.data.process?.steps) ? result.data.process.steps.length - 1 : null;
        setSelectedStepIndex(newIdx);
        setEditingStepIndex(newIdx);
      }
    } catch (err) {
      setError(err.message || "Failed to save step.");
    } finally {
      setIsSaving(false);
    }
  };

  const deleteStep = async (index) => {
    if (!window.confirm("Delete this process step?")) return;
    setIsSaving(true);
    setError("");
    try {
      const response = await fetch(`${apiBaseUrl}/api/services/process-steps/${index}`, {
        method: "DELETE", credentials: "include",
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result?.message || "Failed to delete.");
      setData(result.data);
      if (!result.data.process?.steps?.length) {
        openNewStep();
      } else {
        const nextIdx = Math.min(index, result.data.process.steps.length - 1);
        selectStep(nextIdx);
      }
    } catch (err) {
      setError(err.message || "Failed to delete.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleArrayField = (setter, field, value) => {
    const items = value.split(",").map((s) => s.trim()).filter(Boolean);
    setter((prev) => ({ ...prev, [field]: items }));
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
          <button
            type="button"
            onClick={saveFullContent}
            disabled={isSaving}
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSaving ? <LoaderCircle size={18} className="animate-spin" /> : <Settings size={18} />}
            Save All Changes
          </button>
        </div>

        {error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
        ) : null}

        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm xl:grid xl:grid-cols-[220px_1fr]">
          <aside className="border-b border-gray-200 bg-gray-50 p-4 xl:border-b-0 xl:border-r">
            <nav className="space-y-2">
              {sections.map((sec) => {
                const Icon = sec.icon;
                const active = activeSection === sec.id;
                return (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => setActiveSection(sec.id)}
                    className={[
                      "w-full rounded-2xl border px-4 py-3 text-left transition flex items-center gap-3",
                      active
                        ? "border-blue-500 bg-blue-500/10 text-gray-900 shadow-sm"
                        : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50",
                    ].join(" ")}
                  >
                    <Icon size={18} className="shrink-0" />
                    <span className="font-medium">{sec.label}</span>
                  </button>
                );
              })}
            </nav>
          </aside>

          <div className="p-6">
            {activeSection === "hero" && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900">Hero Section</h3>
                <p className="text-sm text-gray-500">Edit the hero banner shown at the top of the Services page.</p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block space-y-2 text-sm font-medium text-gray-700">
                    <span>Title</span>
                    <input
                      value={heroForm.title}
                      onChange={(e) => setHeroForm((p) => ({ ...p, title: e.target.value }))}
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-blue-500"
                    />
                  </label>
                  <label className="block space-y-2 text-sm font-medium text-gray-700">
                    <span>Highlight Title</span>
                    <input
                      value={heroForm.highlightTitle}
                      onChange={(e) => setHeroForm((p) => ({ ...p, highlightTitle: e.target.value }))}
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-blue-500"
                    />
                  </label>
                </div>
                <label className="block space-y-2 text-sm font-medium text-gray-700">
                  <span>Description</span>
                  <textarea
                    value={heroForm.description}
                    onChange={(e) => setHeroForm((p) => ({ ...p, description: e.target.value }))}
                    rows={3}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-blue-500"
                  />
                </label>
                <label className="block space-y-2 text-sm font-medium text-gray-700">
                  <span>Image URL</span>
                  <input
                    value={heroForm.image}
                    onChange={(e) => setHeroForm((p) => ({ ...p, image: e.target.value }))}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-blue-500"
                    placeholder="https://..."
                  />
                </label>
              </div>
            )}

            {activeSection === "comprehensive" && (
              <div className="xl:grid xl:grid-cols-[260px_1fr] xl:gap-6">
                <div>
                  <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 space-y-4 mb-4">
                    <h3 className="text-lg font-bold text-gray-900">Section Content</h3>
                    <label className="block space-y-2 text-sm font-medium text-gray-700">
                      <span>Title</span>
                      <input
                        value={comprehensiveMeta.title}
                        onChange={(e) => setComprehensiveMeta((p) => ({ ...p, title: e.target.value }))}
                        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-blue-500"
                      />
                    </label>
                    <label className="block space-y-2 text-sm font-medium text-gray-700">
                      <span>Description</span>
                      <textarea
                        value={comprehensiveMeta.description}
                        onChange={(e) => setComprehensiveMeta((p) => ({ ...p, description: e.target.value }))}
                        rows={3}
                        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-blue-500"
                      />
                    </label>
                  </div>

                  <div className="mb-4 flex items-center justify-between gap-3">
                    <h3 className="text-lg font-bold text-gray-900">Services</h3>
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                      {data?.comprehensive?.services?.length || 0} items
                    </span>
                  </div>

                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={openNewService}
                      className="w-full rounded-2xl border border-dashed border-gray-300 px-4 py-3 text-sm font-medium text-blue-600 hover:border-blue-400 hover:bg-blue-50 transition flex items-center justify-center gap-2"
                    >
                      <Plus size={16} /> Add Service
                    </button>
                    {data?.comprehensive?.services?.map((svc, i) => {
                      const active = i === selectedServiceIndex;
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
                </div>

                <div className="space-y-4 mt-6 xl:mt-0">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {editingServiceIndex === null ? "Add Service" : "Edit Service"}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {editingServiceIndex === null
                          ? "Fill in the details for the new service."
                          : "Edit the selected service details."}
                      </p>
                    </div>
                    {editingServiceIndex !== null && (
                      <button
                        type="button"
                        onClick={() => deleteService(editingServiceIndex)}
                        className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-100"
                      >
                        <Trash2 size={16} /> Delete
                      </button>
                    )}
                  </div>

                  <form className="space-y-4" onSubmit={submitService}>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="block space-y-2 text-sm font-medium text-gray-700">
                        <span>Icon</span>
                        <select
                          value={serviceForm.icon}
                          onChange={(e) => setServiceForm((p) => ({ ...p, icon: e.target.value }))}
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
                          value={serviceForm.title}
                          onChange={(e) => setServiceForm((p) => ({ ...p, title: e.target.value }))}
                          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-blue-500"
                        />
                      </label>
                    </div>
                    <label className="block space-y-2 text-sm font-medium text-gray-700">
                      <span>Description</span>
                      <textarea
                        value={serviceForm.description}
                        onChange={(e) => setServiceForm((p) => ({ ...p, description: e.target.value }))}
                        rows={4}
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-blue-500"
                      />
                    </label>
                    <label className="block space-y-2 text-sm font-medium text-gray-700">
                      <span>Points (comma-separated)</span>
                      <input
                        value={serviceForm.points.join(", ")}
                        onChange={(e) => handleArrayField(setServiceForm, "points", e.target.value)}
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-blue-500"
                        placeholder="Point 1, Point 2, Point 3"
                      />
                    </label>
                    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                      {editingServiceIndex !== null && (
                        <button
                          type="button"
                          onClick={openNewService}
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
                        {isSaving ? <LoaderCircle size={18} className="animate-spin" /> : editingServiceIndex === null ? <Plus size={18} /> : <Pencil size={18} />}
                        {editingServiceIndex === null ? "Add Service" : "Update Service"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {activeSection === "deepdives" && (
              <div className="xl:grid xl:grid-cols-[260px_1fr] xl:gap-6">
                <div>
                  <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 space-y-4 mb-4">
                    <h3 className="text-lg font-bold text-gray-900">Section Content</h3>
                    <label className="block space-y-2 text-sm font-medium text-gray-700">
                      <span>Title</span>
                      <input
                        value={deepDivesMeta.title}
                        onChange={(e) => setDeepDivesMeta((p) => ({ ...p, title: e.target.value }))}
                        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-blue-500"
                      />
                    </label>
                    <label className="block space-y-2 text-sm font-medium text-gray-700">
                      <span>Description</span>
                      <textarea
                        value={deepDivesMeta.description}
                        onChange={(e) => setDeepDivesMeta((p) => ({ ...p, description: e.target.value }))}
                        rows={3}
                        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-blue-500"
                      />
                    </label>
                  </div>

                  <div className="mb-4 flex items-center justify-between gap-3">
                    <h3 className="text-lg font-bold text-gray-900">Deep Dives</h3>
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                      {data?.featureDeepDives?.length || 0} items
                    </span>
                  </div>

                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={openNewDive}
                      className="w-full rounded-2xl border border-dashed border-gray-300 px-4 py-3 text-sm font-medium text-blue-600 hover:border-blue-400 hover:bg-blue-50 transition flex items-center justify-center gap-2"
                    >
                      <Plus size={16} /> Add Deep Dive
                    </button>
                    {data?.featureDeepDives?.map((dive, i) => {
                      const active = i === selectedDiveIndex;
                      return (
                        <button
                          key={i}
                          type="button"
                          onClick={() => selectDive(i)}
                          className={[
                            "w-full rounded-2xl border px-4 py-3 text-left transition",
                            active
                              ? "border-blue-500 bg-blue-500/10 text-gray-900 shadow-sm"
                              : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50",
                          ].join(" ")}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <h4 className="truncate text-sm font-semibold text-gray-900">{dive.title}</h4>
                            </div>
                            <Pencil size={14} className="shrink-0 text-gray-400" />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-4 mt-6 xl:mt-0">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {editingDiveIndex === null ? "Add Deep Dive" : "Edit Deep Dive"}
                      </h3>
                    </div>
                    {editingDiveIndex !== null && (
                      <button
                        type="button"
                        onClick={() => deleteDive(editingDiveIndex)}
                        className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-100"
                      >
                        <Trash2 size={16} /> Delete
                      </button>
                    )}
                  </div>

                  <form className="space-y-4" onSubmit={submitDive}>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="block space-y-2 text-sm font-medium text-gray-700">
                        <span>Title</span>
                        <input
                          value={diveForm.title}
                          onChange={(e) => setDiveForm((p) => ({ ...p, title: e.target.value }))}
                          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-blue-500"
                        />
                      </label>
                      <label className="block space-y-2 text-sm font-medium text-gray-700">
                        <span>Image URL</span>
                        <input
                          value={diveForm.image}
                          onChange={(e) => setDiveForm((p) => ({ ...p, image: e.target.value }))}
                          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-blue-500"
                        />
                      </label>
                    </div>
                    <label className="block space-y-2 text-sm font-medium text-gray-700">
                      <span>Description</span>
                      <textarea
                        value={diveForm.description}
                        onChange={(e) => setDiveForm((p) => ({ ...p, description: e.target.value }))}
                        rows={3}
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-blue-500"
                      />
                    </label>
                    <div className="grid gap-4 sm:grid-cols-3">
                      <label className="block space-y-2 text-sm font-medium text-gray-700">
                        <span>Features (comma-separated)</span>
                        <input
                          value={diveForm.features.join(", ")}
                          onChange={(e) => handleArrayField(setDiveForm, "features", e.target.value)}
                          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-blue-500"
                        />
                      </label>
                      <label className="block space-y-2 text-sm font-medium text-gray-700">
                        <span>Benefits (comma-separated)</span>
                        <input
                          value={diveForm.benefits.join(", ")}
                          onChange={(e) => handleArrayField(setDiveForm, "benefits", e.target.value)}
                          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-blue-500"
                        />
                      </label>
                      <label className="block space-y-2 text-sm font-medium text-gray-700">
                        <span>Tech (comma-separated)</span>
                        <input
                          value={diveForm.tech.join(", ")}
                          onChange={(e) => handleArrayField(setDiveForm, "tech", e.target.value)}
                          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-blue-500"
                        />
                      </label>
                    </div>
                    <label className="flex items-center gap-3 text-sm font-medium text-gray-700">
                      <input
                        type="checkbox"
                        checked={diveForm.reverse}
                        onChange={(e) => setDiveForm((p) => ({ ...p, reverse: e.target.checked }))}
                        className="h-4 w-4 rounded border-gray-300"
                      />
                      Reverse layout (image on left)
                    </label>
                    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                      {editingDiveIndex !== null && (
                        <button
                          type="button"
                          onClick={openNewDive}
                          className="rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                        >
                          New Deep Dive
                        </button>
                      )}
                      <button
                        type="submit"
                        disabled={isSaving}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
                      >
                        {isSaving ? <LoaderCircle size={18} className="animate-spin" /> : editingDiveIndex === null ? <Plus size={18} /> : <Pencil size={18} />}
                        {editingDiveIndex === null ? "Add Deep Dive" : "Update Deep Dive"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {activeSection === "process" && (
              <div className="xl:grid xl:grid-cols-[260px_1fr] xl:gap-6">
                <div>
                  <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 space-y-4 mb-4">
                    <h3 className="text-lg font-bold text-gray-900">Section Content</h3>
                    <label className="block space-y-2 text-sm font-medium text-gray-700">
                      <span>Title</span>
                      <input
                        value={processMeta.title}
                        onChange={(e) => setProcessMeta((p) => ({ ...p, title: e.target.value }))}
                        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-blue-500"
                      />
                    </label>
                  </div>

                  <div className="mb-4 flex items-center justify-between gap-3">
                    <h3 className="text-lg font-bold text-gray-900">Steps</h3>
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                      {data?.process?.steps?.length || 0} items
                    </span>
                  </div>

                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={openNewStep}
                      className="w-full rounded-2xl border border-dashed border-gray-300 px-4 py-3 text-sm font-medium text-blue-600 hover:border-blue-400 hover:bg-blue-50 transition flex items-center justify-center gap-2"
                    >
                      <Plus size={16} /> Add Step
                    </button>
                    {data?.process?.steps?.map((step, i) => {
                      const active = i === selectedStepIndex;
                      return (
                        <button
                          key={i}
                          type="button"
                          onClick={() => selectStep(i)}
                          className={[
                            "w-full rounded-2xl border px-4 py-3 text-left transition",
                            active
                              ? "border-blue-500 bg-blue-500/10 text-gray-900 shadow-sm"
                              : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50",
                          ].join(" ")}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <p className="text-xs font-semibold text-blue-600">{step.number}</p>
                              <h4 className="mt-1 truncate text-sm font-semibold text-gray-900">{step.title}</h4>
                            </div>
                            <Pencil size={14} className="shrink-0 text-gray-400" />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-4 mt-6 xl:mt-0">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {editingStepIndex === null ? "Add Step" : "Edit Step"}
                      </h3>
                    </div>
                    {editingStepIndex !== null && (
                      <button
                        type="button"
                        onClick={() => deleteStep(editingStepIndex)}
                        className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-100"
                      >
                        <Trash2 size={16} /> Delete
                      </button>
                    )}
                  </div>

                  <form className="space-y-4" onSubmit={submitStep}>
                    <div className="grid gap-4 sm:grid-cols-3">
                      <label className="block space-y-2 text-sm font-medium text-gray-700">
                        <span>Number</span>
                        <input
                          value={stepForm.number}
                          onChange={(e) => setStepForm((p) => ({ ...p, number: e.target.value }))}
                          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-blue-500"
                          placeholder="01"
                        />
                      </label>
                      <label className="block space-y-2 text-sm font-medium text-gray-700 sm:col-span-2">
                        <span>Title</span>
                        <input
                          value={stepForm.title}
                          onChange={(e) => setStepForm((p) => ({ ...p, title: e.target.value }))}
                          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-blue-500"
                        />
                      </label>
                    </div>
                    <label className="block space-y-2 text-sm font-medium text-gray-700">
                      <span>Description</span>
                      <textarea
                        value={stepForm.description}
                        onChange={(e) => setStepForm((p) => ({ ...p, description: e.target.value }))}
                        rows={3}
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-blue-500"
                      />
                    </label>
                    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                      {editingStepIndex !== null && (
                        <button
                          type="button"
                          onClick={openNewStep}
                          className="rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                        >
                          New Step
                        </button>
                      )}
                      <button
                        type="submit"
                        disabled={isSaving}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
                      >
                        {isSaving ? <LoaderCircle size={18} className="animate-spin" /> : editingStepIndex === null ? <Plus size={18} /> : <Pencil size={18} />}
                        {editingStepIndex === null ? "Add Step" : "Update Step"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
