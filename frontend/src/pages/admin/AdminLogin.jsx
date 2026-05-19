import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { LockKeyhole, UserRound, AlertCircle, LogIn } from "lucide-react";
import { isAdminAuthenticated, loginAdmin } from "../../services/adminAuth";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  console.log("AdminLogin rendered, authenticated:", isAdminAuthenticated());

  if (isAdminAuthenticated()) {
    return <Navigate to="/admin/contact-messages" replace />;
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    loginAdmin(username, password)
      .then(() => {
        navigate("/admin/contact-messages", { replace: true });
      })
      .catch(() => {
      setError("Invalid username or password.");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6 py-10 text-gray-900">
      <div className="w-full max-w-md overflow-hidden rounded-[2rem] border border-gray-300 bg-white p-8 shadow-xl sm:p-10">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-3 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/15 text-blue-500">
              <LockKeyhole size={28} />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Admin Login</h2>
            
          </div>

          {error ? (
            <div className="flex items-center gap-3 rounded-2xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-600">
              <AlertCircle size={16} />
              {error}
            </div>
          ) : null}

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 focus-within:border-blue-500">
              <UserRound size={18} className="text-gray-400" />
              <input
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="Enter username"
                className="w-full bg-transparent text-gray-900 outline-none placeholder:text-gray-400"
                autoComplete="username"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 focus-within:border-blue-500">
              <LockKeyhole size={18} className="text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter password"
                className="w-full bg-transparent text-gray-900 outline-none placeholder:text-gray-400"
                autoComplete="current-password"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-500 px-5 py-4 font-semibold text-white transition-colors hover:bg-blue-600"
          >
            <LogIn size={18} /> Sign In
          </button>
        </form>
      </div>
    </div>
  );
}