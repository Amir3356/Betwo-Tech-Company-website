import { useEffect, useState, useRef } from "react";
import { Plus, X, LoaderCircle, Pencil, Trash2, Cpu, Code, Database, Smartphone, Settings, Globe, Shield, Cloud, Palette, BarChart, Server, PenTool, Zap, Monitor, GitBranch, Lightbulb, Award, Users, Star, Handshake, LayoutTemplate, Repeat, Terminal, HardDrive, Tablet, Watch, Box, Layers, Component, Eye, Cog, Wrench, Puzzle, Package, GitPullRequest, Book, FileCode, Braces, Network, Router, Container, Boxes } from "lucide-react";

const iconMap = { Code, Database, Smartphone, Settings, Globe, Shield, Cloud, Palette, BarChart, Server, PenTool, Zap, Monitor, GitBranch, Lightbulb, Award, Users, Star, Handshake, LayoutTemplate, Repeat, Cpu, Terminal, HardDrive, Tablet, Watch, Box, Layers, Component, Eye, Cog, Wrench, Puzzle, Package, GitPullRequest, Book, FileCode, Braces, Network, Router, Container, Boxes };

const iconOptions = ["Code", "Database", "Smartphone", "Settings", "Globe", "Shield", "Cloud", "Palette", "BarChart", "Server", "PenTool", "Zap", "Monitor", "GitBranch", "Lightbulb", "Award", "Users", "Star", "Handshake", "LayoutTemplate", "Repeat", "Cpu", "Terminal", "HardDrive", "Tablet", "Watch", "Box", "Layers", "Component", "Eye", "Cog", "Wrench", "Puzzle", "Package", "GitPullRequest", "Book", "FileCode", "Braces", "Network", "Router", "Container", "Boxes"];

export default function TechStackAdmin() {
  const [items, setItems] = useState([]);
  const [sectionMeta, setSectionMeta] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(true);
  const sectionTimer = useRef(null);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ icon: "Code", name: "", category: "", description: "" });

  const loadAll = async () => {
    setLoading(true);
    setError("");

    try {
      const [stackRes, sectionRes] = await Promise.all([
        fetch("/api/tech-stack"),
        fetch("/api/tech-stack-section"),
      ]);

      const stackPayload = await stackRes.json();
      const sectionPayload = await sectionRes.json();

      if (!stackRes.ok) throw new Error(stackPayload?.message || "Failed to load tech stack.");
      if (!sectionRes.ok) throw new Error(sectionPayload?.message || "Failed to load section.");

      setItems(Array.isArray(stackPayload?.data) ? stackPayload.data : []);
      setSectionMeta({
        title: sectionPayload?.data?.title || "",
        description: sectionPayload?.data?.description || "",
      });
    } catch (err) {
      setError(err.message || "Failed to load data.");
    } finally {
      setLoading(false);
    }
  };

  const sectionMetaRef = useRef(sectionMeta);

  useEffect(() => { sectionMetaRef.current = sectionMeta; });

  useEffect(() => { loadAll(); }, []);

  const saveSectionMeta = () => {
    if (sectionTimer.current) clearTimeout(sectionTimer.current);
    sectionTimer.current = setTimeout(async () => {
      const meta = sectionMetaRef.current;
      try {
        const res = await fetch("/api/tech-stack-section", {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(meta),
        });
        if (!res.ok) {
          const result = await res.json();
          throw new Error(result?.message || "Failed to update section.");
        }
      } catch (err) {
        setError(err.message || "Failed to save section.");
      }
    }, 600);
  };

  const handleSectionChange = (e) => {
    const { name, value } = e.target;
    setSectionMeta((prev) => ({ ...prev, [name]: value }));
    saveSectionMeta();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({ icon: "Code", name: "", category: "", description: "" });
  };

  const openCreateModal = () => {
    resetForm();
    setIsModalOpen(true);
    setError("");
  };

  const openEditModal = (item) => {
    setEditingId(item.id);
    setFormData({
      icon: item.icon || "Code",
      name: item.name || "",
      category: item.category || "",
      description: item.description || "",
    });
    setIsModalOpen(true);
    setError("");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this technology permanently?")) return;
    setError("");

    try {
      const res = await fetch(`/api/tech-stack/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result?.message || "Failed to delete technology.");

      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      setError(err.message || "Failed to delete technology.");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8 md:px-6 lg:px-10 lg:py-8">
      <div className="mx-auto max-w-7xl space-y-8">

        {error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
        ) : null}

        {loading ? (
          <div className="rounded-3xl border border-gray-200 bg-white p-10 text-center text-gray-500">
            Loading...
          </div>
        ) : (
          <>
            <div className="flex flex-col items-center gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div className="text-center sm:text-left">
                <h2 className="text-3xl font-bold text-gray-900">{sectionMeta.title || "Our Tech Stack"}</h2>
                <p className="mt-1 text-base text-gray-600">{sectionMeta.description}</p>
              </div>
              <button
                type="button"
                onClick={openCreateModal}
                className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
              >
                <Plus size={18} />
                Add Technology
              </button>
            </div>

            {items.length === 0 ? (
              <div className="rounded-3xl border border-gray-200 bg-white p-10 text-center text-gray-500">
                <Cpu className="mx-auto mb-4 h-10 w-10 text-gray-400" />
                No technologies yet. Add your first one.
              </div>
            ) : (
              <div className="overflow-x-auto rounded-3xl border border-gray-200 bg-white shadow-sm">
                <table className="w-full min-w-[500px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <th className="px-3 sm:px-5 py-3 sm:py-4 font-semibold text-gray-700">Icon</th>
                      <th className="px-3 sm:px-5 py-3 sm:py-4 font-semibold text-gray-700">Name</th>
                      <th className="px-3 sm:px-5 py-3 sm:py-4 font-semibold text-gray-700">Category</th>
                      <th className="hidden sm:table-cell px-3 sm:px-5 py-3 sm:py-4 font-semibold text-gray-700">Description</th>
                      <th className="px-3 sm:px-5 py-3 sm:py-4 font-semibold text-gray-700 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr key={item.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                        <td className="px-3 sm:px-5 py-3 sm:py-4">
                          {(() => {
                            const IconComponent = iconMap[item.icon];
                            return IconComponent ? (
                              <IconComponent className="h-5 w-5 text-blue-600" />
                            ) : (
                              <Cpu className="h-5 w-5 text-gray-400" />
                            );
                          })()}
                        </td>
                        <td className="px-3 sm:px-5 py-3 sm:py-4 font-medium text-gray-900 whitespace-nowrap">{item.name}</td>
                        <td className="px-3 sm:px-5 py-3 sm:py-4 text-gray-600 whitespace-nowrap">
                          <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                            {item.category}
                          </span>
                        </td>
                        <td className="hidden sm:table-cell px-3 sm:px-5 py-3 sm:py-4 text-gray-600 max-w-xs truncate">{item.description || "-"}</td>
                        <td className="px-3 sm:px-5 py-3 sm:py-4 text-right">
                          <div className="flex flex-col gap-1.5 sm:flex-row sm:gap-2">
                            <button
                              type="button"
                              onClick={() => openEditModal(item)}
                              className="whitespace-nowrap inline-flex items-center justify-center gap-1 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                            >
                              <Pencil size={14} />
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDelete(item.id)}
                              className="whitespace-nowrap inline-flex items-center justify-center gap-1 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100"
                            >
                              <Trash2 size={14} />
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}

        {isModalOpen ? (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 px-0 sm:px-4">
            <div className="w-full max-w-lg overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-white shadow-2xl max-h-[90vh] sm:max-h-none">
              <div className="flex items-center justify-between border-b border-gray-200 px-5 sm:px-6 py-3 sm:py-4 sticky top-0 bg-white">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                    {editingId ? "Edit Technology" : "Add Technology"}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500">
                    {editingId
                      ? "Update the technology details."
                      : "Add a new technology to the stack."}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="rounded-full p-1.5 sm:p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
                  aria-label="Close form"
                >
                  <X size={18} />
                </button>
              </div>

              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  setIsSubmitting(true);
                  setError("");

                  try {
                    const sectionRes = await fetch("/api/tech-stack-section", {
                      method: "PUT",
                      credentials: "include",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(sectionMeta),
                    });

                    if (!sectionRes.ok) {
                      const err = await sectionRes.json();
                      throw new Error(err?.message || "Failed to update section.");
                    }

                    if (editingId) {
                      const res = await fetch(`/api/tech-stack/${editingId}`, {
                        method: "PUT",
                        credentials: "include",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(formData),
                      });

                      const result = await res.json();
                      if (!res.ok) throw new Error(result?.message || "Failed to update technology.");

                      setItems((prev) =>
                        prev.map((item) => (item.id === editingId ? result.data : item))
                      );
                    } else {
                      const names = formData.name.split(",").map((n) => n.trim()).filter(Boolean);

                      const newItems = [];
                      for (const name of names) {
                        const res = await fetch("/api/tech-stack", {
                          method: "POST",
                          credentials: "include",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ ...formData, name }),
                        });
                        const result = await res.json();
                        if (!res.ok) throw new Error(result?.message || "Failed to create technology.");
                        newItems.push(result.data);
                      }

                      setItems((prev) => [...newItems, ...prev]);
                    }

                    handleCloseModal();
                  } catch (err) {
                    setError(err.message || "Failed to save.");
                  } finally {
                    setIsSubmitting(false);
                  }
                }}
                className="space-y-4 px-5 sm:px-6 py-5 sm:py-6"
              >
                <div className="border-b border-gray-200 pb-4 mb-2">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Section</p>
                  <label className="space-y-2 text-sm font-medium text-gray-700">
                    <span>Title</span>
                    <input
                      name="title"
                      value={sectionMeta.title}
                      onChange={handleSectionChange}
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-blue-500"
                      placeholder="Our Tech Stack"
                    />
                  </label>
                  <label className="space-y-2 text-sm font-medium text-gray-700 mt-3">
                    <span>Description</span>
                    <textarea
                      name="description"
                      value={sectionMeta.description}
                      onChange={handleSectionChange}
                      rows={2}
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-blue-500"
                      placeholder="Cutting-edge technologies we use to build powerful solutions"
                    />
                  </label>
                </div>

                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Technology</p>
                <label className="space-y-2 text-sm font-medium text-gray-700">
                  <span>Name *</span>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-blue-500"
                    placeholder="e.g. React, Node.js, PostgreSQL"
                  />
                </label>

                <label className="space-y-2 text-sm font-medium text-gray-700">
                  <span>Icon</span>
                  <select
                    name="icon"
                    value={formData.icon}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-blue-500"
                  >
                    {iconOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </label>

                <label className="space-y-2 text-sm font-medium text-gray-700">
                  <span>Category</span>
                  <input
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-blue-500"
                    placeholder="e.g. Frontend, Backend, Database, DevOps"
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
                    {isSubmitting ? (
                      <LoaderCircle size={18} className="animate-spin" />
                    ) : (
                      <Plus size={18} />
                    )}
                    {isSubmitting
                      ? "Saving..."
                      : editingId
                      ? "Update Technology"
                      : "Save Technology"}
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
