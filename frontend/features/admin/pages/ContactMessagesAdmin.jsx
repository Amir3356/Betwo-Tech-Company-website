import { useEffect, useState } from "react";
import { Mail, Trash2 } from "lucide-react";

export default function ContactMessagesAdmin() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadMessages = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(`/api/contact-messages`, {
          credentials: "include",
        });

        const payload = await response.json();

        if (!response.ok) {
          throw new Error(payload?.message || "Failed to load messages.");
        }

        setMessages(Array.isArray(payload?.data) ? payload.data : []);
      } catch (fetchError) {
        setError(fetchError.message || "Failed to load messages.");
      } finally {
        setLoading(false);
      }
    };

    loadMessages();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/contact-messages/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload?.message || "Failed to delete message.");
      }

      setMessages((prev) => prev.filter((message) => message.id !== id));
    } catch (deleteError) {
      setError(deleteError.message || "Failed to delete message.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8 md:px-6 lg:px-10 lg:py-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Contact Messages</h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">View and manage messages from the contact form.</p>
          </div>
        </div>

        {error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        {loading ? (
          <div className="rounded-3xl border border-gray-200 bg-white p-10 text-center text-gray-500">
            Loading messages...
          </div>
        ) : messages.length === 0 ? (
          <div className="rounded-3xl border border-gray-200 bg-white p-10 text-center text-gray-500">
            <Mail className="mx-auto mb-4 h-10 w-10 text-gray-400" />
            No contact messages yet.
          </div>
        ) : (
          <div className="grid gap-4">
            {messages.map((message) => (
              <article key={message.id} className="rounded-2xl sm:rounded-3xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
                <div className="flex flex-col gap-3 sm:gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="space-y-2 sm:space-y-3 min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900">{message.name}</h3>
                      <span className="rounded-full bg-gray-100 px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium text-gray-600">#{message.id}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 break-all">
                      <span className="font-medium text-gray-800">Email:</span> {message.email}
                    </p>
                    {message.subject ? (
                      <p className="text-xs sm:text-sm text-gray-600">
                        <span className="font-medium text-gray-800">Subject:</span> {message.subject}
                      </p>
                    ) : null}
                    <p className="whitespace-pre-wrap text-xs sm:text-sm leading-5 sm:leading-6 text-gray-700">{message.message}</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDelete(message.id)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl sm:rounded-2xl border border-red-200 bg-red-50 px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-red-600 transition-colors hover:bg-red-100"
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
