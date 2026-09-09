import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, Zap, Eye, Users, ShieldCheck, AlertTriangle } from 'lucide-react';

export const CustomersView: React.FC = () => {
  const { customers, setSelectedCustomer, setIsVendingSimulatorOpen, formatCurrency } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [districtFilter, setDistrictFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filteredCustomers = customers.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.includes(searchTerm) ||
      (c.meterNumber && c.meterNumber.includes(searchTerm)) ||
      c.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDistrict = districtFilter === 'ALL' || c.district === districtFilter;
    const matchesStatus =
      statusFilter === 'ALL' ||
      (statusFilter === 'Active' && (c.status === 'Active' || c.accountStatus === 'Active')) ||
      (statusFilter === 'Suspended' && (c.status === 'Suspended' || c.accountStatus === 'Suspended'));

    return matchesSearch && matchesDistrict && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Top Stat Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface p-4 rounded-2xl border border-border shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 rounded-xl">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-fg-muted font-medium">Total Registered Customers</div>
            <div className="text-xl font-bold text-fg">125,430</div>
          </div>
        </div>

        <div className="bg-surface p-4 rounded-2xl border border-border shadow-sm flex items-center gap-4">
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-xl">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-fg-muted font-medium">Active Meter Accounts</div>
            <div className="text-xl font-bold text-fg">118,924</div>
          </div>
        </div>

        <div className="bg-surface p-4 rounded-2xl border border-border shadow-sm flex items-center gap-4">
          <div className="p-3 bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 rounded-xl">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-fg-muted font-medium">STS Pre-paid Users</div>
            <div className="text-xl font-bold text-fg">112,480</div>
          </div>
        </div>

        <div className="bg-surface p-4 rounded-2xl border border-border shadow-sm flex items-center gap-4">
          <div className="p-3 bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 rounded-xl">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-fg-muted font-medium">Flagged / Suspended</div>
            <div className="text-xl font-bold text-fg">314</div>
          </div>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-surface rounded-2xl border border-border shadow-sm overflow-hidden">
        {/* Filter Controls */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-fg-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by customer name, meter, phone or ID..."
              className="w-full pl-9 pr-3 py-2 bg-surface-raised border border-border-strong rounded-xl text-xs text-fg focus:bg-surface dark:focus:bg-slate-800 focus:outline-blue-600"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
            <select
              value={districtFilter}
              onChange={(e) => setDistrictFilter(e.target.value)}
              className="px-3 py-2 bg-surface-raised border border-border-strong rounded-xl text-xs font-medium text-fg focus:outline-blue-600"
            >
              <option value="ALL">All Districts</option>
              <option value="Western Area Urban">Western Area Urban</option>
              <option value="Western Area Rural">Western Area Rural</option>
              <option value="Southern (Bo)">Southern (Bo)</option>
              <option value="Eastern (Kenema)">Eastern (Kenema)</option>
              <option value="Northern (Makeni)">Northern (Makeni)</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-surface-raised border border-border-strong rounded-xl text-xs font-medium text-fg focus:outline-blue-600"
            >
              <option value="ALL">All Statuses</option>
              <option value="Active">Active Only</option>
              <option value="Suspended">Suspended</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-[11px] font-semibold text-fg-muted dark:text-fg-muted">
                <th className="py-3 px-4 font-medium">Customer Name & ID</th>
                <th className="py-3 px-4 font-medium">Contact Phone</th>
                <th className="py-3 px-4 font-medium">District / Substation</th>
                <th className="py-3 px-4 font-medium">Meter Number</th>
                <th className="py-3 px-4 font-medium">Tariff Class</th>
                <th className="py-3 px-4 font-medium">Lifetime Spend</th>
                <th className="py-3 px-4 font-medium">Status</th>
                <th className="py-3 px-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredCustomers.map((c) => {
                const isSuspended = c.status === 'Suspended' || c.accountStatus === 'Suspended';

                return (
                  <tr
                    key={c.id}
                    onClick={() => setSelectedCustomer(c)}
                    className="hover:bg-surface-raised/80 dark:hover:bg-slate-800/60 transition-colors cursor-pointer"
                  >
                    <td className="py-3 px-4">
                      <div className="font-bold text-fg">{c.name}</div>
                      <div className="text-[11px] text-fg-muted font-mono">{c.id}</div>
                    </td>
                    <td className="py-3 px-4 text-fg-muted font-mono">
                      {c.phone}
                    </td>
                    <td className="py-3 px-4 text-fg-muted">
                      <div>{c.district}</div>
                      <div className="text-[11px] text-fg-muted truncate max-w-[150px]">{c.address}</div>
                    </td>
                    <td className="py-3 px-4 font-mono font-medium text-fg">
                      {c.meterNumber || c.meters?.[0]?.meterNumber || '12345678901'}
                    </td>
                    <td className="py-3 px-4 text-fg-muted">
                      {c.tariffCategory || 'Domestic Normal'}
                    </td>
                    <td className="py-3 px-4 font-semibold text-fg font-mono">
                      {formatCurrency(c.totalSpendLe || 14850)}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                          !isSuspended
                            ? 'bg-emerald-100/80 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400'
                            : 'bg-red-100/80 text-red-800 dark:bg-red-950/60 dark:text-red-400'
                        }`}
                      >
                        {!isSuspended ? 'Active' : 'Suspended'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedCustomer(c)}
                          className="p-1.5 text-fg-muted hover:text-fg dark:hover:text-slate-200 hover:bg-surface-raised dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                          title="View Profile"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setIsVendingSimulatorOpen(true);
                          }}
                          className="px-2.5 py-1 bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/60 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
                          title="Generate Pre-paid Token"
                        >
                          <Zap className="w-3.5 h-3.5" />
                          <span>Vend</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
