import { useEffect, useState } from "react";

export default function ServicesAdmin() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const apiBaseUrl = import.meta.env.VITE_API_URL || "http://localhost:5001";

  useEffect(() => {
    const loadContent = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(`${apiBaseUrl}/api/services`);
        const payload = await response.json();
        if (!response.ok) throw new Error(payload?.message || "Failed to load services.");
      } catch (err) {
        setError(err.message || "Failed to load services.");
      } finally {
        setLoading(false);
      }
    };
    loadContent();
  }, [apiBaseUrl]);

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
      </div>
    </div>
  );
}
