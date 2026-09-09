import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Shield, Search, Filter, Download } from 'lucide-react';

export const AuditLogsView: React.FC = () => {
  const { auditLogs, addToast } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAction, setFilterAction] = useState('ALL');

  const filteredLogs = auditLogs.filter((log) => {
    const adminName = log.adminName || '';
    const action = log.action || '';
    const details = log.details || '';
    const resource = log.resource || '';

    const matchesSearch =
      adminName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = filterAction === 'ALL' || log.result === filterAction;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header Stat & Controls */}
      <div className="bg-surface p-5 rounded-2xl border border-border shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-fg flex items-center gap-2">
            <Shield className="w-4 h-4 text-blue-600" />
            Administrative System Audit Logs
          </h3>
          <p className="text-xs text-fg-muted mt-0.5">
            Immutable log of administrative events, role switches, and token calculations.
          </p>
        </div>

        <button
          type="button"
          onClick={() => addToast('Audit trail extracted to secure CSV archive.', 'info')}
          className="px-3.5 py-2 bg-surface-raised hover:bg-slate-200 dark:hover:bg-slate-700 text-fg rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer self-start md:self-auto"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Audit Log</span>
        </button>
      </div>

      {/* Main Table Card */}
      <div className="bg-surface rounded-2xl border border-border shadow-sm overflow-hidden">
        {/* Search filter */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-fg-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search user, action, resource..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-surface-raised border border-border-strong rounded-xl text-xs text-fg focus:outline-blue-600"
            />
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <Filter className="w-3.5 h-3.5 text-fg-muted" />
            <select
              value={filterAction}
              onChange={(e) => setFilterAction(e.target.value)}
              className="px-3 py-2 bg-surface-raised border border-border-strong rounded-xl text-xs text-fg focus:outline-blue-600"
            >
              <option value="ALL">All Outcomes</option>
              <option value="Success">Success Only</option>
              <option value="Warning">Warning Only</option>
              <option value="Failed">Failed Only</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-fg-muted">
            <thead className="bg-surface-raised/80 text-fg-muted font-semibold border-b border-slate-100 dark:border-slate-800">
              <tr>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Admin User</th>
                <th className="py-3 px-4">Action</th>
                <th className="py-3 px-4">Target Resource</th>
                <th className="py-3 px-4">Details</th>
                <th className="py-3 px-4">Outcome</th>
                <th className="py-3 px-4">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-surface-raised/80 dark:hover:bg-slate-800/40">
                  <td className="py-3 px-4 text-fg-muted font-mono text-[11px] whitespace-nowrap">
                    {log.timestamp}
                  </td>
                  <td className="py-3 px-4 font-bold text-fg">
                    {log.adminName}
                    <div className="text-[10px] text-fg-muted font-normal">{log.adminRole}</div>
                  </td>
                  <td className="py-3 px-4 font-medium text-fg">{log.action}</td>
                  <td className="py-3 px-4 font-mono text-fg-muted text-[11px]">{log.resource}</td>
                  <td className="py-3 px-4 max-w-xs truncate">{log.details}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                        log.result === 'Success'
                          ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-400'
                          : log.result === 'Warning'
                          ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-400'
                          : 'bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-400'
                      }`}
                    >
                      {log.result}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono text-fg-muted text-[11px]">{log.ipAddress}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
