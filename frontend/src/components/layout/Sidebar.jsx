import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Sidebar({ isOpen, onToggle }) {
  const menuItems = [
    { label: 'Dashboard', icon: '📊' },
    { label: 'Contact Submissions', icon: '💬' },
    { label: 'Users', icon: '👥' },
    { label: 'Reports', icon: '📈' },
    { label: 'Settings', icon: '⚙️' },
  ];

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className="fixed top-4 left-4 z-40 p-2 rounded-lg bg-slate-900 dark:bg-slate-700 text-white hover:bg-slate-800 dark:hover:bg-slate-600 transition-colors"
        aria-label="Toggle Sidebar"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-slate-900 dark:bg-slate-950 text-white shadow-lg transition-transform duration-300 z-30 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-700">
          <h1 className="text-2xl font-bold text-white">Betwo Admin</h1>
        </div>

        {/* Navigation Menu */}
        <nav className="mt-8">
          <ul className="space-y-2 px-4">
            {menuItems.map((item, i) => (
              <li key={i}>
                <a
                  href="#"
                  className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-slate-800 dark:hover:bg-slate-800 transition-colors group"
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-medium group-hover:text-blue-400">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-700">
          <button className="w-full px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg font-medium transition-colors">
            Logout
          </button>
        </div>
      </aside>

      {/* Overlay when sidebar is open */}
      {isOpen && (
        <div
          onClick={onToggle}
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
        />
      )}
    </>
  );
}
