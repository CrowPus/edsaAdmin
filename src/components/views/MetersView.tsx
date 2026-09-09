import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Gauge, Search, Radio, Wifi, AlertTriangle, Cpu, Zap, Activity } from 'lucide-react';
import { mockMeters } from '../../mock/data';

export const MetersView: React.FC = () => {
  const { addToast, setIsVendingSimulatorOpen } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [pingingId, setPingingId] = useState<string | null>(null);

  const metersList = mockMeters || [];

  const filteredMeters = metersList.filter((m) => {
    const matchesSearch =
      m.meterNumber.includes(searchTerm) ||
      (m.customerName && m.customerName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (m.feederLine && m.feederLine.toLowerCase().includes(searchTerm.toLowerCase())) ||
      m.substation.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = typeFilter === 'ALL' || m.type === typeFilter;
    const matchesStatus = statusFilter === 'ALL' || m.status === statusFilter;

    return matchesSearch && matchesType && matchesStatus;
  });

  const handlePing = (meterNumber: string) => {
    setPingingId(meterNumber);
    setTimeout(() => {
      setPingingId(null);
      addToast(`Meter #${meterNumber} AMI Ping response: OK (Latency 48ms, Signal -74dBm)`, 'success');
    }, 700);
  };

  return (
    <div className="space-y-6">
      {/* Top Stat Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface p-4 rounded-2xl border border-border shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 rounded-xl">
            <Gauge className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-fg-muted font-medium">Total Meter Fleet</div>
            <div className="text-xl font-bold text-fg">128,430</div>
          </div>
        </div>

        <div className="bg-surface p-4 rounded-2xl border border-border shadow-sm flex items-center gap-4">
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-xl">
            <Wifi className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-fg-muted font-medium">Smart AMI Communicating</div>
            <div className="text-xl font-bold text-fg">16,240</div>
          </div>
        </div>

        <div className="bg-surface p-4 rounded-2xl border border-border shadow-sm flex items-center gap-4">
          <div className="p-3 bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 rounded-xl">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-fg-muted font-medium">STS Keypad Meters</div>
            <div className="text-xl font-bold text-fg">112,190</div>
          </div>
        </div>

        <div className="bg-surface p-4 rounded-2xl border border-border shadow-sm flex items-center gap-4">
          <div className="p-3 bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 rounded-xl">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-fg-muted font-medium">Tamper Alerts (YTD)</div>
            <div className="text-xl font-bold text-fg">18 Resolved</div>
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-surface rounded-2xl border border-border shadow-sm overflow-hidden">
        {/* Controls */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-fg-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by meter number, customer or feeder..."
              className="w-full pl-9 pr-3 py-2 bg-surface-raised border border-border-strong rounded-xl text-xs text-fg focus:bg-surface dark:focus:bg-slate-800 focus:outline-blue-600"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-2 bg-surface-raised border border-border-strong rounded-xl text-xs font-medium text-fg focus:outline-blue-600"
            >
              <option value="ALL">All Meter Types</option>
              <option value="STS Single-Phase">STS Single-Phase</option>
              <option value="STS 3-Phase">STS 3-Phase</option>
              <option value="Smart AMI Pre-paid">Smart AMI Pre-paid</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-surface-raised border border-border-strong rounded-xl text-xs font-medium text-fg focus:outline-blue-600"
            >
              <option value="ALL">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Faulty">Faulty</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-[11px] font-semibold text-fg-muted dark:text-fg-muted">
                <th className="py-3 px-4 font-medium">Meter Number</th>
                <th className="py-3 px-4 font-medium">Assigned Customer</th>
                <th className="py-3 px-4 font-medium">Type & Spec</th>
                <th className="py-3 px-4 font-medium">Substation / Feeder</th>
                <th className="py-3 px-4 font-medium">Est. Remaining</th>
                <th className="py-3 px-4 font-medium">Status</th>
                <th className="py-3 px-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredMeters.map((m) => (
                <tr
                  key={m.meterNumber}
                  className="hover:bg-surface-raised/80 dark:hover:bg-slate-800/60 transition-colors"
                >
                  <td className="py-3 px-4 font-mono font-bold text-fg">
                    {m.meterNumber}
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-semibold text-fg">{m.customerName || 'EDSA Customer'}</div>
                    <div className="text-[11px] text-fg-muted font-mono">{m.customerId || 'CUST-001'}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-medium text-fg">{m.type}</div>
                    <div className="text-[11px] text-fg-muted">{m.firmware || 'STS-4.1.8'}</div>
                  </td>
                  <td className="py-3 px-4 text-fg-muted">
                    <div>{m.substation}</div>
                    <div className="text-[11px] text-fg-muted">{m.feederLine || 'Feeder 04'}</div>
                  </td>
                  <td className="py-3 px-4 font-mono font-semibold text-fg">
                    {m.estimatedRemainingKWh || 45.2} kWh
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100/80 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400">
                      Active
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handlePing(m.meterNumber)}
                        disabled={pingingId === m.meterNumber}
                        className="px-2.5 py-1 bg-surface-raised hover:bg-slate-200 dark:hover:bg-slate-700 text-fg rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1"
                        title="Ping AMI Telemetry"
                      >
                        <Radio className={`w-3.5 h-3.5 ${pingingId === m.meterNumber ? 'animate-spin text-blue-600' : ''}`} />
                        <span>{pingingId === m.meterNumber ? 'Pinging...' : 'Ping'}</span>
                      </button>
                      <button
                        onClick={() => setIsVendingSimulatorOpen(true)}
                        className="px-2.5 py-1 bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/60 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <Zap className="w-3.5 h-3.5" />
                        <span>Vend</span>
                      </button>
                    </div>
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
