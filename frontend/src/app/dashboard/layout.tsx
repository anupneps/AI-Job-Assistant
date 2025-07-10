'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { logout } from '../utils/auth';
import { useRouter } from 'next/navigation';
import { Home, FileText, User, Settings, LogOut, Menu, X } from 'lucide-react';

const navItems = [
  { key: 'dashboard', label: 'Dashboard', icon: Home, href: '/dashboard' },
  { key: 'applications-list', label: 'Applications', icon: FileText, href: '/applications-list' },
  { key: 'profile', label: 'Profile', icon: User, href: '/profile' },
  { key: 'settings', label: 'Settings', icon: Settings, href: '/settings' },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const isActive = (href: string) => pathname === href;

  return (
    <div className="min-h-screen flex bg-transparent">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-white/20 backdrop-blur-xl border-r border-white/30 dark:bg-white/10 dark:border-white/20 shadow-2xl transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>
        <div className="flex flex-col h-full p-6 pt-8 pb-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-400 via-indigo-400 to-blue-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">JL</span>
              </div>
              <span className="text-xl font-bold text-slate-800 dark:text-white">JobLens AI</span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X size={20} className="text-slate-600 dark:text-slate-300" />
            </button>
          </div>

          {/* Profile Avatar */}
          <div className="flex flex-col items-center mb-10">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 via-indigo-400 to-blue-500 flex items-center justify-center mb-2 shadow-lg">
              <Image src="/favicon.ico" alt="Profile" width={48} height={48} className="rounded-full" />
            </div>
            <span className="text-lg font-semibold text-slate-800 dark:text-white">User</span>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-2 flex-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all hover:bg-white/20 dark:hover:bg-white/10 ${
                    isActive(item.href) 
                      ? 'bg-blue-500/20 dark:bg-blue-500/30 text-blue-700 dark:text-blue-300' 
                      : 'text-slate-700 dark:text-slate-300'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon size={20} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-red-600 hover:bg-red-100/40 dark:hover:bg-red-700/30 transition-all"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Header */}
        <div className="md:hidden bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border-b border-white/30 dark:border-white/20 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-400 via-indigo-400 to-blue-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">JL</span>
              </div>
              <span className="text-xl font-bold text-slate-800 dark:text-white">JobLens AI</span>
            </div>
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <Menu size={20} className="text-slate-600 dark:text-slate-300" />
            </button>
          </div>
        </div>

        {/* Page Content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
} 