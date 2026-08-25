import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Globe, Building2, BookOpen, MessageSquare, LogOut, Menu } from 'lucide-react';
import { useState } from 'react';
import { logout } from '../firebase/auth';
import useAuth from '../hooks/useAuth';

const nav = [
  { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/admin/countries', icon: Globe, label: 'Countries' },
  { to: '/admin/universities', icon: Building2, label: 'Universities' },
  { to: '/admin/programmes', icon: BookOpen, label: 'Programmes' },
  { to: '/admin/enquiries', icon: MessageSquare, label: 'Enquiries' },
];

export default function AdminLayout() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white flex flex-col transition-transform duration-200 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-xl font-extrabold tracking-tight">Abroadly <span className="text-emerald-400">Admin</span></h1>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {nav.map(n => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.end}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-colors ${isActive ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
            >
              <n.icon className="w-5 h-5" />
              {n.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-800">
          <div className="text-xs text-slate-500 mb-3 truncate">{user?.email}</div>
          <button onClick={handleLogout} className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-red-400 transition-colors w-full">
            <LogOut className="w-4 h-4" /> Log out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-slate-200 px-4 sm:px-6 py-4 flex items-center gap-4">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-slate-600 hover:text-slate-900">
            <Menu className="w-6 h-6" />
          </button>
          <h2 className="text-lg font-extrabold text-slate-900">Admin Panel</h2>
        </header>
        <main className="flex-1 p-4 sm:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
