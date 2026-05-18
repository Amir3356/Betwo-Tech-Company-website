import { Menu, X } from 'lucide-react';

export default function Sidebar({ isOpen, onToggle, onLogout }) {
  const menuItems = [
    { label: 'Contact Submissions', icon: '💬' },
    { label: 'Projects', icon: '📁' },
  ];

  return (
    <>
      {/* Toggle Button - Only visible on mobile */}
      <button
        onClick={onToggle}
        className="fixed md:hidden top-4 left-4 z-40 p-2 rounded-lg bg-slate-900 dark:bg-slate-700 text-white hover:bg-slate-800 dark:hover:bg-slate-600 transition-colors"
        aria-label="Toggle Sidebar"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar - Persistent on desktop, collapsible on mobile */}
      <aside
        className={`fixed md:relative top-0 left-0 h-screen w-64 bg-slate-900 dark:bg-slate-950 text-white shadow-lg transition-transform duration-300 z-30 ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
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
          <button 
            onClick={onLogout}
            className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 rounded-lg font-medium transition-colors text-white"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Overlay when sidebar is open on mobile */}
      {isOpen && (
        <div
          onClick={onToggle}
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
        />
      )}

      {/* Spacer for mobile layout when sidebar is open */}
      {isOpen && <div className="md:hidden" style={{ width: '16rem' }} />}
    </>
  );
}
