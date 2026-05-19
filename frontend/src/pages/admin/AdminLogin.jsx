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
    <div className="min-h-screen bg-slate-950 px-6 py-10 text-slate-100">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-900/80 shadow-2xl shadow-black/30 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="hidden flex-col justify-center border-r border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950/60 p-10 lg:flex">
            <div className="space-y-4">
              <h1 className="text-4xl font-black leading-tight text-white">Admin Dashboard</h1>
              <p className="max-w-md text-sm leading-7 text-slate-400">
                Sign in to continue to the admin panel.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center p-8 sm:p-10">
            <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
              <div className="space-y-3 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/15 text-blue-400">
                  <LockKeyhole size={28} />
                </div>
                <h2 className="text-3xl font-bold text-white">Admin Login</h2>
                <p className="text-sm text-slate-400">Enter your username and password to continue.</p>
              </div>

              {error ? (
                <div className="flex items-center gap-3 rounded-2xl border border-red-900 bg-red-950/50 px-4 py-3 text-sm text-red-200">
                  <AlertCircle size={16} />
                  {error}
                </div>
              ) : null}

              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-300">Username</label>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 focus-within:border-blue-500">
                  <UserRound size={18} className="text-slate-500" />
                  <input
                    type="text"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    placeholder="Enter username"
                    className="w-full bg-transparent text-white outline-none placeholder:text-slate-600"
                    autoComplete="username"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-300">Password</label>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 focus-within:border-blue-500">
                  <LockKeyhole size={18} className="text-slate-500" />
                  <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter password"
                    className="w-full bg-transparent text-white outline-none placeholder:text-slate-600"
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
      </div>
    </div>
  );
}