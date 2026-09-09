import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { Shield, Plus, Search, CheckCircle2, UserCheck, Lock } from 'lucide-react';
import { mockStaffUsers } from '../../mock/data';

export const UsersRolesView: React.FC = () => {
  const { currentRole, switchRole, addToast } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const rolesList: { role: UserRole; desc: string; access: string }[] = [
    {
      role: 'Super Admin',
      desc: 'Complete global administrative privileges, tariff adjustments, user management, and HSM key controls',
      access: 'Full Access (All Modules)',
    },
    {
      role: 'Executive Management',
      desc: 'National macro analytics, grid uptime, financial revenue tracking, and executive dashboards',
      access: 'High-level Analytics & Overview',
    },
    {
      role: 'Finance & Settlement',
      desc: 'Revenue assurance, payment gateway reconciliation, Orange Money/Afrimoney settlements',
      access: 'Transactions, Gateways & Reports',
    },
    {
      role: 'Operations & Grid Dispatch',
      desc: 'Substation monitoring, outage logging, technician crew dispatching, and feeder lines',
      access: 'Outages, Meters & Incidents',
    },
    {
      role: 'Customer Service',
      desc: 'Customer lookup, STS token reprints, complaints management, and ticket resolution',
      access: 'Customers, Tickets & Simulator',
    },
    {
      role: 'Auditor / Read Only',
      desc: 'Read-only access for compliance auditors, Sierra Leone Ministry of Energy and external observers',
      access: 'Read-Only Logs & Exports',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Active Role Switcher Banner */}
      <div className="bg-blue-900 text-white p-6 rounded-2xl shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="text-xs text-blue-200 font-semibold uppercase tracking-wider">
              Role-Based Access Control Simulator
            </div>
            <h3 className="text-lg font-bold mt-1">Current Active Perspective: {currentRole}</h3>
          </div>
          <span className="px-3 py-1 bg-amber-400 text-slate-950 text-xs font-bold rounded-lg self-start sm:self-auto">
            Simulated Session
          </span>
        </div>

        <p className="text-xs text-blue-100 leading-relaxed max-w-3xl">
          Switch roles below to test how different EDSA department staff (Commercial, Dispatch, Customer Care, Audit) experience the platform:
        </p>

        <div className="flex flex-wrap gap-2 pt-2 border-t border-blue-800">
          {rolesList.map((r) => (
            <button
              key={r.role}
              type="button"
              onClick={() => {
                switchRole(r.role);
                addToast(`Perspective changed to ${r.role}`, 'info');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                currentRole === r.role
                  ? 'bg-amber-400 text-slate-950 shadow-md font-extrabold'
                  : 'bg-surface/10 text-white hover:bg-surface/20'
              }`}
            >
              {r.role}
            </button>
          ))}
        </div>
      </div>

      {/* Staff Users Table */}
      <div className="bg-surface rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <h4 className="text-sm font-bold text-fg">Authorized Administrative Staff</h4>
          <span className="text-xs text-fg-muted">6 Registered Accounts</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-fg-muted">
            <thead className="bg-surface-raised/80 text-fg-muted font-semibold border-b border-slate-100 dark:border-slate-800">
              <tr>
                <th className="py-3 px-4">Staff Member</th>
                <th className="py-3 px-4">Assigned Role</th>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4">Last Active</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {mockStaffUsers.map((u) => (
                <tr key={u.id} className="hover:bg-surface-raised/80 dark:hover:bg-slate-800/40">
                  <td className="py-3.5 px-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs">
                      {u.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-fg">{u.name}</div>
                      <div className="text-[11px] text-fg-muted">{u.email}</div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-surface-raised text-fg">
                      {u.role}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">{u.department}</td>
                  <td className="py-3.5 px-4 text-fg-muted text-[11px]">{u.lastActive}</td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Active
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
