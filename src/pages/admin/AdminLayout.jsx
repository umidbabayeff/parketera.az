import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, LogOut } from 'lucide-react';

const AdminLayout = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'bg-white/10 text-accent-gold' : 'text-white/70 hover:bg-white/5 hover:text-white';
  };

  return (
    <div className="min-h-screen bg-bg-darker flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-bg-dark border-r border-white/5 flex flex-col">
        <div className="p-6 border-b border-white/5">
          <Link to="/" className="text-xl font-bold text-white tracking-widest uppercase">
            Parketera <span className="text-accent-gold">Admin</span>
          </Link>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <Link to="/admin" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive('/admin')}`}>
            <LayoutDashboard size={20} />
            Ümumi
          </Link>
          <Link to="/admin/products" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive('/admin/products')}`}>
            <Package size={20} />
            Məhsullar
          </Link>
        </nav>

        <div className="p-4 border-t border-white/5">
          <Link to="/" className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors">
            <LogOut size={20} />
            Sayta Qayıt
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
