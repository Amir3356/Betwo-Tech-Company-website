import { useState, useEffect } from 'react';
import Sidebar from '../components/layout/Sidebar';

export default function AdminDashboard({ onLogout }) {
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    // Load from localStorage or default to true on desktop
    const saved = localStorage.getItem('adminSidebarOpen');
    if (saved !== null) {
      return JSON.parse(saved);
    }
    // Default to true (open) on desktop
    return window.innerWidth >= 768;
  });

  // Persist sidebar state to localStorage
  useEffect(() => {
    localStorage.setItem('adminSidebarOpen', JSON.stringify(sidebarOpen));
  }, [sidebarOpen]);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} onLogout={onLogout} />

      {/* Main Content */}
      <main className="flex-1 transition-all duration-300">
        <div className="p-8 pt-20 md:pt-8 md:pl-0">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white">
              Admin Dashboard
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              Welcome to the Betwo Tech Admin Panel
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard label="Total Submissions" value="142" color="blue" />
            <StatCard label="New This Week" value="23" color="green" />
            <StatCard label="Pending" value="8" color="yellow" />
            <StatCard label="Resolved" value="111" color="purple" />
          </div>

          {/* Recent Submissions */}
          <div className="bg-white dark:bg-slate-900 rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              Recent Contact Submissions
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-slate-200 dark:border-slate-700">
                  <tr>
                    <th className="text-left py-3 px-4 text-slate-600 dark:text-slate-300">Name</th>
                    <th className="text-left py-3 px-4 text-slate-600 dark:text-slate-300">Email</th>
                    <th className="text-left py-3 px-4 text-slate-600 dark:text-slate-300">Subject</th>
                    <th className="text-left py-3 px-4 text-slate-600 dark:text-slate-300">Date</th>
                    <th className="text-left py-3 px-4 text-slate-600 dark:text-slate-300">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800">
                    <td className="py-3 px-4 text-slate-900 dark:text-white">John Doe</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">john@example.com</td>
                    <td className="py-3 px-4 text-slate-900 dark:text-white">Website Development</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">May 18, 2026</td>
                    <td className="py-3 px-4">
                      <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 px-3 py-1 rounded-full text-sm">
                        Resolved
                      </span>
                    </td>
                  </tr>
                  <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800">
                    <td className="py-3 px-4 text-slate-900 dark:text-white">Jane Smith</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">jane@example.com</td>
                    <td className="py-3 px-4 text-slate-900 dark:text-white">App Development</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">May 17, 2026</td>
                    <td className="py-3 px-4">
                      <span className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 px-3 py-1 rounded-full text-sm">
                        Pending
                      </span>
                    </td>
                  </tr>
                  <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800">
                    <td className="py-3 px-4 text-slate-900 dark:text-white">Alex Johnson</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">alex@example.com</td>
                    <td className="py-3 px-4 text-slate-900 dark:text-white">Consulting</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">May 16, 2026</td>
                    <td className="py-3 px-4">
                      <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 px-3 py-1 rounded-full text-sm">
                        In Progress
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({ label, value, color }) {
  const colorMap = {
    blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400',
    green: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400',
    yellow: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400',
    purple: 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400',
  };

  return (
    <div className={`${colorMap[color]} p-6 rounded-lg shadow-md`}>
      <p className="text-sm font-semibold opacity-75">{label}</p>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}
