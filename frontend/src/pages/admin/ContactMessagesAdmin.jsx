import { useEffect, useState } from "react";
import axios from "axios";
import { Mail, LoaderCircle, AlertCircle, Clock3, User, AtSign } from "lucide-react";

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
    <div className="min-h-screen bg-slate-950 px-6 py-8 md:px-10 lg:px-12">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex flex-col gap-2">
          <p className="text-sm uppercase tracking-[0.3em] text-blue-400">Contact Inbox</p>
          <h2 className="text-3xl font-bold text-white">Contact Messages</h2>
          <p className="max-w-2xl text-slate-400">Messages submitted from the public contact form appear here.</p>
        </div>

        {loading ? (
          <div className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/70 px-5 py-6 text-slate-300">
            <LoaderCircle className="h-5 w-5 animate-spin text-blue-400" />
            Loading messages...
          </div>
        ) : error ? (
          <div className="flex items-center gap-3 rounded-2xl border border-red-900 bg-red-950/40 px-5 py-6 text-red-200">
            <AlertCircle className="h-5 w-5" />
            {error}
          </div>
        ) : messages.length === 0 ? (
          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-10 text-center text-slate-400">
            <Mail className="mx-auto mb-4 h-10 w-10 text-slate-500" />
            No contact messages yet.
          </div>
        ) : (
          <div className="grid gap-5">
            {messages.map((message) => (
              <article key={message.id} className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl shadow-black/10">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-3 text-sm text-slate-400">
                      <span className="inline-flex items-center gap-2 rounded-full bg-slate-800 px-3 py-1 text-slate-200">
                        <User size={14} /> {message.name}
                      </span>
                      <span className="inline-flex items-center gap-2 rounded-full bg-slate-800 px-3 py-1 text-slate-200">
                        <AtSign size={14} /> {message.email}
                      </span>
                      {message.subject ? (
                        <span className="rounded-full bg-blue-500/10 px-3 py-1 text-blue-300">{message.subject}</span>
                      ) : null}
                    </div>
                    <p className="whitespace-pre-wrap leading-7 text-slate-200">{message.message}</p>
                  </div>

                  <div className="flex shrink-0 items-center gap-2 rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-400">
                    <Clock3 size={16} className="text-blue-400" />
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