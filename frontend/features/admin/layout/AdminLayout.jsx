import { useState, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Mail, LayoutGrid, Shield, ChevronRight, LogOut, Menu, X, Sparkles, Settings, Cpu } from "lucide-react";

const navigation = [
  { label: "Contact Messages", to: "/admin/contact-messages", icon: Mail },
  { label: "Projects", to: "/admin/projects", icon: LayoutGrid },
  { label: "Services", to: "/admin/services", icon: Settings },
  { label: "What We Do", to: "/admin/what-we-do", icon: Sparkles },
  { label: "Our Tech Stack", to: "/admin/tech-stack", icon: Cpu },
];

function SidebarNav({ onNavigate, onLogout }) {
  return (
    <>
      <div className="mb-8 flex items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/15 text-blue-500">
          <Shield size={22} />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-gray-500 font-bold">Admin Panel</p>
          <h1 className="text-lg font-bold text-gray-900">Betwo Tech</h1>
        </div>
      </div>

      <nav className="space-y-2 flex-1">
        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onNavigate}
              className={({ isActive }) =>
                [
                  "group flex items-center justify-between rounded-2xl border px-4 py-3 transition-all",
                  isActive
                    ? "border-blue-500 bg-blue-500/10 text-gray-900 shadow-lg shadow-blue-500/10"
                    : "border-gray-200 bg-gray-50 text-gray-700 hover:border-gray-300 hover:bg-gray-100",
                ].join(" ")
              }
            >
              <span className="flex items-center gap-3">
                <Icon size={18} className="shrink-0" />
                <span className="font-medium">{item.label}</span>
              </span>
              <ChevronRight size={16} className="opacity-50 transition-transform group-hover:translate-x-1" />
            </NavLink>
          );
        })}
      </nav>

      <button
        type="button"
        onClick={onLogout}
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:border-red-500/50 hover:bg-red-50 hover:text-red-600"
      >
        <LogOut size={16} /> Logout
      </button>
    </>
  );
}

export default function AdminLayout() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/admin/me", { credentials: "include" });
        if (!res.ok) throw new Error();
      } catch {
        navigate("/admin/login", { replace: true });
        return;
      }
      setCheckingAuth(false);
    };
    checkAuth();
  }, [navigate]);

  if (checkingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="text-gray-500">Checking authentication...</div>
      </div>
    );
  }

  const handleLogout = async () => {
    try {
      await fetch(`/api/admin/logout`, {
        method: "POST", credentials: "include",
      });
    } catch {}
    window.location.href = "/admin/login";
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <div className="flex min-h-screen">
        <aside className="sticky top-0 hidden lg:flex h-screen w-[280px] shrink-0 border-r border-gray-200 bg-white px-5 py-6 flex-col">
          <SidebarNav onNavigate={() => setIsMobileOpen(false)} onLogout={handleLogout} />
        </aside>

        <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200 px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-blue-500/15 text-blue-500">
              <Shield size={16} className="sm:size-[18px]" />
            </div>
            <h1 className="text-base sm:text-lg font-bold text-gray-900">Betwo Tech</h1>
          </div>
          <button
            onClick={() => setIsMobileOpen(true)}
            className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100"
          >
            <Menu size={22} className="sm:size-6" />
          </button>
        </div>

        {isMobileOpen && (
          <div className="lg:hidden fixed inset-0 z-50">
            <div className="absolute inset-0 bg-black/50" onClick={() => setIsMobileOpen(false)} />
            <aside className="absolute left-0 top-0 h-screen w-[260px] sm:w-[280px] bg-white px-4 sm:px-5 py-4 sm:py-6 flex flex-col">
              <div className="flex items-center justify-end mb-4 sm:mb-6">
                <button onClick={() => setIsMobileOpen(false)} className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100">
                  <X size={20} className="sm:size-6" />
                </button>
              </div>
              <SidebarNav onNavigate={() => setIsMobileOpen(false)} onLogout={handleLogout} />
            </aside>
          </div>
        )}

        <main className="flex-1 overflow-hidden lg:pt-0 pt-14 sm:pt-16">
          <div className="lg:p-8 p-3 sm:p-4">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
