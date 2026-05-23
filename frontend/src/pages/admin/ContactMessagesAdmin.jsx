import { Mail } from "lucide-react";

export default function ContactMessagesAdmin() {
  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8 md:px-6 lg:px-10 lg:py-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-bold text-gray-900">Contact Messages</h2>
        </div>

        <div className="rounded-3xl border border-gray-200 bg-white p-10 text-center text-gray-500">
          <Mail className="mx-auto mb-4 h-10 w-10 text-gray-400" />
          No contact messages yet.
        </div>
      </div>
    </div>
  );
}
