import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Play,
  CheckCircle2,
  Copy,
  Activity,
  Cpu,
  Clock,
  Search,
} from 'lucide-react';
import { VendingRecord } from '../../types';

export const VendingView: React.FC = () => {
  const { vendingRecords, openVendingSimulator, addToast, formatNumber } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRecords = vendingRecords.filter((v: VendingRecord) =>
    (v.meterNumber || '').includes(searchTerm) ||
    (v.requestId || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (v.customerName || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const copyToken = (token: string) => {
    navigator.clipboard.writeText(token);
    addToast('20-Digit STS Token copied to clipboard!', 'info');
  };

  return (
    <div className="space-y-6">
      {/* Top Controls */}
      <div className="bg-surface p-5 rounded-2xl border border-border shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-fg">STS Pre-paid Vending Engine</h3>
          <p className="text-xs text-fg-muted mt-0.5">
            Real-time STS Key Management, 20-digit token generation and encryption server
          </p>
        </div>

        <button
          onClick={() => openVendingSimulator()}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer self-start sm:self-auto"
        >
          <Play className="w-4 h-4 fill-white" />
          <span>Launch STS Token Generator</span>
        </button>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface p-4 rounded-xl border border-border shadow-sm flex items-center gap-3">
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-lg">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-fg-muted font-medium">Generation Success Rate</div>
            <div className="text-xl font-bold text-fg">99.98%</div>
          </div>
        </div>

        <div className="bg-surface p-4 rounded-xl border border-border shadow-sm flex items-center gap-3">
          <div className="p-3 bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 rounded-lg">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-fg-muted font-medium">Avg Encryption Time</div>
            <div className="text-xl font-bold text-fg">42 ms</div>
          </div>
        </div>

        <div className="bg-surface p-4 rounded-xl border border-border shadow-sm flex items-center gap-3">
          <div className="p-3 bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 rounded-lg">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-fg-muted font-medium">Key Management Server</div>
            <div className="text-xl font-bold text-fg">HSM Online</div>
          </div>
        </div>

        <div className="bg-surface p-4 rounded-xl border border-border shadow-sm flex items-center gap-3">
          <div className="p-3 bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 rounded-lg">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-fg-muted font-medium">Tokens Today</div>
            <div className="text-xl font-bold text-fg">16,950</div>
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-surface rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="relative w-72">
            <Search className="w-4 h-4 text-fg-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search token, meter, or customer..."
              className="w-full pl-9 pr-3 py-1.5 bg-surface-raised border border-border-strong rounded-xl text-xs text-fg focus:outline-blue-600"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-fg-muted">
            <thead className="bg-surface-raised/80 text-fg-muted font-semibold border-b border-slate-100 dark:border-slate-800">
              <tr>
                <th className="py-3 px-4">Request ID</th>
                <th className="py-3 px-4">Customer & Meter</th>
                <th className="py-3 px-4">Amount & Units</th>
                <th className="py-3 px-4">Generated 20-Digit Token</th>
                <th className="py-3 px-4">Channel</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredRecords.map((rec) => (
                <tr key={rec.id} className="hover:bg-surface-raised/80 dark:hover:bg-slate-800/40">
                  <td className="py-3.5 px-4 font-mono font-bold text-fg">
                    {rec.requestId}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-fg">{rec.customerName}</div>
                    <div className="text-[11px] font-mono text-fg-muted">Meter #{rec.meterNumber}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-fg">Le {formatNumber(rec.amountLe)}</div>
                    <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">{rec.unitsKWh} kWh</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/80 px-2 py-1 rounded-md border border-amber-200 dark:border-amber-800">
                        {rec.token || rec.tokenGenerated || '4829-1049-5820-1948-2841'}
                      </span>
                      <button
                        onClick={() => copyToken(rec.token || rec.tokenGenerated || '4829-1049-5820-1948-2841')}
                        className="p-1 text-fg-muted hover:text-fg dark:hover:text-slate-200 cursor-pointer"
                        title="Copy token"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-surface-raised text-fg">
                      {rec.channel || rec.paymentMethod || 'Orange Money'}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Success</span>
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-fg-muted text-[11px]">
                    {rec.timestamp}
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
