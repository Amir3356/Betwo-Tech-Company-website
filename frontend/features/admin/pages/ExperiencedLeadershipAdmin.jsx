import { useEffect, useState } from "react";
import { Plus, X, LoaderCircle, Pencil, Trash2, Users } from "lucide-react";

export default function ExperiencedLeadershipAdmin() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    bio: "",
    linkedin: "",
    display_order: 0,
  });

  const loadAll = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/experienced-leadership");
      const payload = await res.json();
      if (!res.ok) throw new Error(payload?.message || "Failed to load leadership.");
      setItems(Array.isArray(payload?.data) ? payload.data : []);
    } catch (err) {
      setError(err.message || "Failed to load data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadAll(); }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({ name: "", position: "", bio: "", linkedin: "", display_order: 0 });
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
      linkedin: item.linkedin || "",
      display_order: item.display_order ?? 0,
    });
    setIsModalOpen(true);
    setError("");
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
            <div className="flex flex-col items-center gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div className="text-center sm:text-left">
                <h2 className="text-3xl font-bold text-gray-900">Experienced Leadership</h2>
                <p className="mt-1 text-base text-gray-600">Manage your leadership team members.</p>
              </div>
              <button
                type="button"
                onClick={openCreateModal}
                className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
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
                      <th className="px-3 sm:px-5 py-3 sm:py-4 font-semibold text-gray-700">Order</th>
                      <th className="px-3 sm:px-5 py-3 sm:py-4 font-semibold text-gray-700">Name</th>
                      <th className="px-3 sm:px-5 py-3 sm:py-4 font-semibold text-gray-700">Position</th>
                      <th className="hidden sm:table-cell px-3 sm:px-5 py-3 sm:py-4 font-semibold text-gray-700">Bio</th>
                      <th className="hidden md:table-cell px-3 sm:px-5 py-3 sm:py-4 font-semibold text-gray-700">LinkedIn</th>
                      <th className="px-3 sm:px-5 py-3 sm:py-4 font-semibold text-gray-700 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr key={item.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                        <td className="px-3 sm:px-5 py-3 sm:py-4 text-gray-600">{item.display_order}</td>
                        <td className="px-3 sm:px-5 py-3 sm:py-4 font-medium text-gray-900">{item.name}</td>
                        <td className="px-3 sm:px-5 py-3 sm:py-4 text-gray-600">
                          <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                            {item.position || "-"}
                          </span>
                        </td>
                        <td className="hidden sm:table-cell px-3 sm:px-5 py-3 sm:py-4 text-gray-600 max-w-xs truncate">{item.bio || "-"}</td>
                        <td className="hidden md:table-cell px-3 sm:px-5 py-3 sm:py-4 text-gray-600 max-w-[180px] truncate">{item.linkedin || "-"}</td>
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
                    {editingId ? "Edit Member" : "Add Member"}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500">
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
                    if (editingId) {
                      const res = await fetch(`/api/experienced-leadership/${editingId}`, {
                        method: "PUT",
                        credentials: "include",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(formData),
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
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(formData),
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
                className="space-y-4 px-5 sm:px-6 py-5 sm:py-6"
              >
                <label className="space-y-2 text-sm font-medium text-gray-700">
                  <span>Name *</span>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-blue-500"
                    placeholder="e.g. John Doe"
                  />
                </label>

                <label className="space-y-2 text-sm font-medium text-gray-700">
                  <span>Position</span>
                  <input
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-blue-500"
                    placeholder="e.g. CEO, CTO, Head of Engineering"
                  />
                </label>

                <label className="space-y-2 text-sm font-medium text-gray-700">
                  <span>Bio</span>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows={3}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-blue-500"
                    placeholder="Brief biography of the leadership member"
                  />
                </label>

                <label className="space-y-2 text-sm font-medium text-gray-700">
                  <span>LinkedIn URL</span>
                  <input
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-blue-500"
                    placeholder="https://linkedin.com/in/..."
                  />
                </label>

                <label className="space-y-2 text-sm font-medium text-gray-700">
                  <span>Display Order</span>
                  <input
                    name="display_order"
                    type="number"
                    value={formData.display_order}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-blue-500"
                    placeholder="0"
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
