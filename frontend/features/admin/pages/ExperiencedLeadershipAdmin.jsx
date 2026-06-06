import { useEffect, useState } from "react";
import { Plus, X, LoaderCircle, Pencil, Trash2, Users, Save, Upload } from "lucide-react";

export default function ExperiencedLeadershipAdmin() {
  const [items, setItems] = useState([]);
  const [sectionMeta, setSectionMeta] = useState({ title: "", subtitle: "", description: "" });
  const [loading, setLoading] = useState(true);
  const [sectionSaving, setSectionSaving] = useState(false);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    bio: "",
    image: null,
  });

  const loadAll = async () => {
    setLoading(true);
    setError("");

    try {
      const [membersRes, sectionRes] = await Promise.all([
        fetch("/api/experienced-leadership"),
        fetch("/api/experienced-leadership-section"),
      ]);

      const membersPayload = await membersRes.json();
      const sectionPayload = await sectionRes.json();

      if (!membersRes.ok) throw new Error(membersPayload?.message || "Failed to load leadership.");
      if (!sectionRes.ok) throw new Error(sectionPayload?.message || "Failed to load section.");

      setItems(Array.isArray(membersPayload?.data) ? membersPayload.data : []);
      setSectionMeta({
        title: sectionPayload?.data?.title || "",
        subtitle: sectionPayload?.data?.subtitle || "",
        description: sectionPayload?.data?.description || "",
      });
    } catch (err) {
      setError(err.message || "Failed to load data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadAll(); }, []);

  const saveSectionMeta = async () => {
    setSectionSaving(true);
    setError("");
    try {
      const res = await fetch("/api/experienced-leadership-section", {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sectionMeta),
      });
      if (!res.ok) {
        const result = await res.json();
        throw new Error(result?.message || "Failed to update section.");
      }
    } catch (err) {
      setError(err.message || "Failed to save section.");
    } finally {
      setSectionSaving(false);
    }
  };

  const handleSectionChange = (e) => {
    const { name, value } = e.target;
    setSectionMeta((prev) => ({ ...prev, [name]: value }));
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({ name: "", position: "", bio: "", image: null });
  };

  const openCreateModal = () => {
    resetForm();
    setIsModalOpen(true);
    setError("");
  };

  const openEditModal = (item) => {
    setEditingId(item.id);
    setFormData({
      name: item.name || "",
      position: item.position || "",
      bio: item.bio || "",
      image: null,
    });
    setError("");
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this leadership member permanently?")) return;
    setError("");

    try {
      const res = await fetch(`/api/experienced-leadership/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result?.message || "Failed to delete.");

      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      setError(err.message || "Failed to delete.");
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
            {/* Section Meta */}
            <div className="rounded-3xl border border-gray-200 bg-white p-4 sm:p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Section</p>
                <button
                  type="button"
                  onClick={saveSectionMeta}
                  disabled={sectionSaving}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 sm:py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:opacity-70"
                >
                  {sectionSaving ? (
                    <LoaderCircle size={16} className="animate-spin" />
                  ) : (
                    <Save size={16} />
                  )}
                  {sectionSaving ? "Saving..." : "Save Section"}
                </button>
              </div>
              <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
                <label className="space-y-1.5 sm:space-y-2 text-sm font-medium text-gray-700">
                  <span>Title</span>
                  <input
                    name="title"
                    value={sectionMeta.title}
                    onChange={handleSectionChange}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 sm:px-4 py-2.5 sm:py-3 text-sm outline-none focus:border-blue-500"
                  />
                </label>
                <label className="space-y-1.5 sm:space-y-2 text-sm font-medium text-gray-700">
                  <span>Subtitle</span>
                  <input
                    name="subtitle"
                    value={sectionMeta.subtitle}
                    onChange={handleSectionChange}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 sm:px-4 py-2.5 sm:py-3 text-sm outline-none focus:border-blue-500"
                  />
                </label>
              </div>
              <label className="space-y-1.5 sm:space-y-2 text-sm font-medium text-gray-700 mt-3 sm:mt-4 block">
                <span>Description</span>
                <textarea
                  name="description"
                  value={sectionMeta.description}
                  onChange={handleSectionChange}
                  rows={3}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 sm:px-4 py-2.5 sm:py-3 text-sm outline-none focus:border-blue-500"
                />
              </label>
            </div>

            <div className="flex flex-col items-center gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div className="text-center sm:text-left">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Members</h2>
                <p className="text-xs sm:text-sm text-gray-500">Manage your leadership team members.</p>
              </div>
              <button
                type="button"
                onClick={openCreateModal}
                className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 sm:py-3 text-sm font-medium text-white transition hover:bg-blue-700"
              >
                <Plus size={18} />
                Add Member
              </button>
            </div>

            {items.length === 0 ? (
              <div className="rounded-3xl border border-gray-200 bg-white p-10 text-center text-gray-500">
                <Users className="mx-auto mb-4 h-10 w-10 text-gray-400" />
                No leadership members yet. Add your first one.
              </div>
            ) : (
              <div className="overflow-x-auto rounded-3xl border border-gray-200 bg-white shadow-sm">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <th className="px-2 sm:px-5 py-2 sm:py-4 font-semibold text-gray-700 text-xs sm:text-sm">Image</th>
                      <th className="px-2 sm:px-5 py-2 sm:py-4 font-semibold text-gray-700 text-xs sm:text-sm">Name</th>
                      <th className="px-2 sm:px-5 py-2 sm:py-4 font-semibold text-gray-700 text-xs sm:text-sm">Position</th>
                      <th className="hidden sm:table-cell px-3 sm:px-5 py-3 sm:py-4 font-semibold text-gray-700">Bio</th>
                      <th className="px-2 sm:px-5 py-2 sm:py-4 font-semibold text-gray-700 text-right text-xs sm:text-sm">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr key={item.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                        <td className="px-2 sm:px-5 py-2 sm:py-4">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-8 w-8 sm:h-10 sm:w-10 rounded-full object-cover"
                            />
                          ) : (
                            <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-400">
                              <Users size={14} />
                            </div>
                          )}
                        </td>
                        <td className="px-2 sm:px-5 py-2 sm:py-4 font-medium text-gray-900 text-xs sm:text-sm">{item.name}</td>
                        <td className="px-2 sm:px-5 py-2 sm:py-4 text-gray-600">
                          <span className="inline-block rounded-full bg-blue-100 px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium text-blue-700">
                            {item.position || "-"}
                          </span>
                        </td>
                        <td className="hidden sm:table-cell px-3 sm:px-5 py-3 sm:py-4 text-gray-600 max-w-xs truncate">{item.bio || "-"}</td>
                        <td className="px-2 sm:px-5 py-2 sm:py-4 text-right">
                          <div className="flex flex-col gap-1 sm:flex-row sm:gap-2">
                            <button
                              type="button"
                              onClick={() => openEditModal(item)}
                              className="whitespace-nowrap inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-1.5 sm:px-3 py-1.5 sm:py-2 text-[11px] sm:text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                            >
                              <Pencil size={12} />
                              <span className="ml-1 sm:ml-1.5">Edit</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDelete(item.id)}
                              className="whitespace-nowrap inline-flex items-center justify-center rounded-xl border border-red-200 bg-red-50 px-1.5 sm:px-3 py-1.5 sm:py-2 text-[11px] sm:text-sm font-medium text-red-600 transition hover:bg-red-100"
                            >
                              <Trash2 size={12} />
                              <span className="ml-1 sm:ml-1.5">Delete</span>
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
            <div className="w-full max-w-lg overflow-y-auto rounded-t-2xl sm:rounded-3xl bg-white shadow-2xl max-h-[95vh] sm:max-h-none">
              <div className="flex items-center justify-between border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4 sticky top-0 bg-white">
                <div>
                  <h3 className="text-base sm:text-xl font-bold text-gray-900">
                    {editingId ? "Edit Member" : "Add Member"}
                  </h3>
                  <p className="text-[11px] sm:text-sm text-gray-500">
                    {editingId
                      ? "Update the leadership member details."
                      : "Add a new member to the leadership team."}
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
                    const body = new FormData();
                    body.append("name", formData.name);
                    body.append("position", formData.position);
                    body.append("bio", formData.bio);
                    if (formData.image) {
                      body.append("image", formData.image);
                    }

                    if (editingId) {
                      const res = await fetch(`/api/experienced-leadership/${editingId}`, {
                        method: "PUT",
                        credentials: "include",
                        body,
                      });

                      const result = await res.json();
                      if (!res.ok) throw new Error(result?.message || "Failed to update.");

                      setItems((prev) =>
                        prev.map((item) => (item.id === editingId ? result.data : item))
                      );
                    } else {
                      const res = await fetch("/api/experienced-leadership", {
                        method: "POST",
                        credentials: "include",
                        body,
                      });

                      const result = await res.json();
                      if (!res.ok) throw new Error(result?.message || "Failed to create.");

                      setItems((prev) => [result.data, ...prev]);
                    }

                    handleCloseModal();
                  } catch (err) {
                    setError(err.message || "Failed to save.");
                  } finally {
                    setIsSubmitting(false);
                  }
                }}
                className="space-y-3 sm:space-y-4 px-4 sm:px-6 py-4 sm:py-6"
              >
                <label className="space-y-2 text-sm font-medium text-gray-700">
                  <span>Image</span>
                  <div className="flex items-center gap-4">
                    {editingId && !formData.image ? (
                      <img
                        src={items.find((i) => i.id === editingId)?.image || ""}
                        alt="Current"
                        className="h-14 w-14 rounded-full object-cover border"
                      />
                    ) : formData.image ? (
                      <img
                        src={URL.createObjectURL(formData.image)}
                        alt="Preview"
                        className="h-14 w-14 rounded-full object-cover border"
                      />
                    ) : null}
                    <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-gray-600 hover:bg-gray-100">
                      <Upload size={14} />
                      Choose Image
                      <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                </label>

                <label className="space-y-1.5 sm:space-y-2 text-sm font-medium text-gray-700">
                  <span>Name *</span>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 sm:px-4 py-2.5 sm:py-3 text-sm outline-none focus:border-blue-500"
                    placeholder="e.g. John Doe"
                  />
                </label>

                <label className="space-y-1.5 sm:space-y-2 text-sm font-medium text-gray-700">
                  <span>Position</span>
                  <input
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 sm:px-4 py-2.5 sm:py-3 text-sm outline-none focus:border-blue-500"
                    placeholder="e.g. CEO, CTO, Head of Engineering"
                  />
                </label>

                <label className="space-y-1.5 sm:space-y-2 text-sm font-medium text-gray-700">
                  <span>Bio</span>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows={3}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 sm:px-4 py-2.5 sm:py-3 text-sm outline-none focus:border-blue-500"
                    placeholder="Brief biography of the leadership member"
                  />
                </label>

                <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="w-full sm:w-auto rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <LoaderCircle size={18} className="animate-spin" />
                    ) : (
                      <Plus size={18} />
                    )}
                    {isSubmitting
                      ? "Saving..."
                      : editingId
                      ? "Update Member"
                      : "Save Member"}
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
