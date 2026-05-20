import { useEffect, useState } from "react";
import axios from "axios";
import { Mail, LoaderCircle, AlertCircle, Clock3, User, AtSign, Trash2 } from "lucide-react";

function formatDate(value) {
  if (!value) return "Unknown";

  try {
    return new Intl.DateTimeFormat("en", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(value));
  } catch {
    return value;
  }
}

export default function ContactMessagesAdmin() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;

    try {
      await axios.delete(`/api/contact-messages/${id}`);
      setMessages((prev) => prev.filter((msg) => msg.id !== id));
    } catch {
      alert("Failed to delete message.");
    }
  };

  useEffect(() => {
    let isMounted = true;

    const loadMessages = async () => {
      try {
        const response = await axios.get("/api/contact-messages");

        if (isMounted) {
          setMessages(response.data?.data || []);
          setError("");
        }
      } catch {
        if (isMounted) {
          setError("Unable to load contact messages.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadMessages();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-8 md:px-10 lg:px-12">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-bold text-gray-900">Contact Messages</h2>
          <p className="max-w-2xl text-gray-500">Messages submitted from the public contact form appear here.</p>
        </div>

        {loading ? (
          <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-5 py-6 text-gray-600">
            <LoaderCircle className="h-5 w-5 animate-spin text-blue-500" />
            Loading messages...
          </div>
        ) : error ? (
          <div className="flex items-center gap-3 rounded-2xl border border-red-300 bg-red-50 px-5 py-6 text-red-600">
            <AlertCircle className="h-5 w-5" />
            {error}
          </div>
        ) : messages.length === 0 ? (
          <div className="rounded-3xl border border-gray-200 bg-white p-10 text-center text-gray-500">
            <Mail className="mx-auto mb-4 h-10 w-10 text-gray-400" />
            No contact messages yet.
          </div>
        ) : (
          <div className="grid gap-5">
            {messages.map((message) => (
              <article key={message.id} className="rounded-3xl border border-gray-200 bg-white p-6 shadow-xl">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                      <span className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-gray-700">
                        <User size={14} /> {message.name}
                      </span>
                      <span className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-gray-700">
                        <AtSign size={14} /> {message.email}
                      </span>
                      {message.subject ? (
                        <span className="rounded-full bg-blue-50 px-3 py-1 text-blue-600">{message.subject}</span>
                      ) : null}
                    </div>
                    <p className="whitespace-pre-wrap leading-7 text-gray-700">{message.message}</p>
                  </div>

                  <div className="flex shrink-0 items-center gap-2 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-500">
                    <Clock3 size={16} className="text-blue-500" />
                    {formatDate(message.created_at)}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}