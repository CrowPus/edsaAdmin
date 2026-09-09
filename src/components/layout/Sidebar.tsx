import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  Users,
  Gauge,
  FileText,
  CreditCard,
  Zap,
  AlertTriangle,
  ClipboardList,
  Bell,
  BarChart3,
  FileSpreadsheet,
  Download,
  UserCheck,
  Settings,
  ShieldCheck,
  X,
} from 'lucide-react';
import { NavSection } from '../../types';

interface NavItem {
  id: NavSection;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const Sidebar: React.FC = () => {
  const {
    activeSection,
    setActiveSection,
    isSidebarOpen,
    setIsSidebarOpen,
  } = useApp();

  const navGroups: { group?: string; items: NavItem[] }[] = [
    {
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
      ],
    },
    {
      group: 'CUSTOMERS',
      items: [
        { id: 'customers', label: 'Customers', icon: Users },
        { id: 'meters', label: 'Meters', icon: Gauge },
        { id: 'transactions', label: 'Transactions', icon: FileText },
        { id: 'payments', label: 'Payments', icon: CreditCard },
      ],
    },
    {
      group: 'OPERATIONS',
      items: [
        { id: 'vending', label: 'Vending', icon: Zap },
        { id: 'outages', label: 'Outage Reports', icon: AlertTriangle },
        { id: 'services', label: 'Service Requests', icon: ClipboardList },
        { id: 'notifications', label: 'Notifications', icon: Bell },
      ],
    },
    {
      group: 'REPORTS',
      items: [
        { id: 'analytics', label: 'Analytics', icon: BarChart3 },
        { id: 'reports', label: 'Reports', icon: FileSpreadsheet },
        { id: 'exports', label: 'Export Data', icon: Download },
      ],
    },
    {
      group: 'SETTINGS',
      items: [
        { id: 'users', label: 'Users & Roles', icon: UserCheck },
        { id: 'settings', label: 'System Settings', icon: Settings },
        { id: 'audit', label: 'Audit Logs', icon: ShieldCheck },
      ],
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 pb-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex flex-col items-start gap-1">
            <div className="flex items-center gap-2">
              <img
                src="/edsa.png"
                alt="EDSA Sierra Leone"
                className="h-10 w-auto object-contain dark:hidden"
              />
              <img
                src="/edsa-white-logo.png"
                alt="EDSA Sierra Leone"
                className="h-10 w-auto object-contain hidden dark:block"
              />
              <div className="flex flex-col">
                <span className="font-extrabold text-slate-900 dark:text-white text-lg tracking-tight leading-tight">
                  EDSA
                </span>
                <span className="text-[9px] font-semibold text-slate-500 dark:text-slate-400 leading-none">
                  Electricity Distribution & Supply
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Close sidebar navigation"
            className="lg:hidden p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 overflow-y-auto px-3.5 py-4 space-y-5 scrollbar-thin">
          {navGroups.map((group, gIdx) => (
            <div key={gIdx} className="space-y-1">
              {group.group && (
                <div className="px-3 pb-1 text-[10px] font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase">
                  {group.group}
                </div>
              )}
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveSection(item.id);
                      setIsSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#0052cc] text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400 dark:text-slate-500'}`} />
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
};