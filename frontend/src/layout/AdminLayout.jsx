import { NavLink, Outlet, Navigate, useNavigate } from "react-router-dom";
import { Mail, LayoutGrid, Shield, ChevronRight, LogOut } from "lucide-react";
import { isAdminAuthenticated, logoutAdmin } from "../services/adminAuth";

const navigation = [
  { label: "Contact Messages", to: "/admin/contact-messages", icon: Mail },
  { label: "Projects", to: "/admin/projects", icon: LayoutGrid },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const authenticated = isAdminAuthenticated();

  if (!authenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  const handleLogout = () => {
    logoutAdmin().finally(() => {
      navigate("/admin/login", { replace: true });
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <div className="flex min-h-screen">
        <aside className="sticky top-0 h-screen w-[280px] shrink-0 border-r border-gray-200 bg-white px-5 py-6">
          <div className="mb-8 flex items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/15 text-blue-500">
              <Shield size={22} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-gray-500">Admin Panel</p>
              <h1 className="text-lg font-bold text-gray-900">Betwo Tech</h1>
            </div>
          </div>

          <nav className="space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.to}
                  to={item.to}
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
            onClick={handleLogout}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:border-red-500/50 hover:bg-red-50 hover:text-red-600"
          >
            <LogOut size={16} /> Logout
          </button>
        </aside>

        <main className="flex-1 overflow-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}