import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AlertTriangle, Plus, Search, Radio, CheckCircle2, Clock, MapPin, Wrench } from 'lucide-react';
import { OutageSeverity, OutageStatus } from '../../types';

export const OutagesView: React.FC = () => {
  const { outages, setSelectedOutage, setIsNewOutageModalOpen } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filteredOutages = outages.filter((o) => {
    const matchesSearch =
      o.substation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (o.feederLine && o.feederLine.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (o.district && o.district.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (o.title && o.title.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = statusFilter === 'ALL' || o.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Top Stat Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface p-4 rounded-2xl border border-border shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs text-fg-muted font-medium">Active Grid Incidents</div>
            <div className="text-2xl font-bold text-fg mt-1">4 Active</div>
          </div>
          <div className="p-3 bg-red-50 dark:bg-red-950/60 text-red-600 dark:text-red-400 rounded-xl">
            <AlertTriangle className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-surface p-4 rounded-2xl border border-border shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs text-fg-muted font-medium">Affected Customers</div>
            <div className="text-2xl font-bold text-fg mt-1">~7,250</div>
          </div>
          <div className="p-3 bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 rounded-xl">
            <Radio className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-surface p-4 rounded-2xl border border-border shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs text-fg-muted font-medium">Dispatched Field Crews</div>
            <div className="text-2xl font-bold text-fg mt-1">3 Crews</div>
          </div>
          <div className="p-3 bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 rounded-xl">
            <Wrench className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-surface p-4 rounded-2xl border border-border shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs text-fg-muted font-medium">Resolved Today</div>
            <div className="text-2xl font-bold text-fg mt-1">12 Feeder Lines</div>
          </div>
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-xl">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-surface rounded-2xl border border-border shadow-sm overflow-hidden">
        {/* Controls */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-fg-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by substation, feeder line or district..."
              className="w-full pl-9 pr-3 py-2 bg-surface-raised border border-border-strong rounded-xl text-xs text-fg focus:bg-surface dark:focus:bg-slate-800 focus:outline-blue-600"
            />
          </div>

          <div className="flex items-center gap-2.5 w-full md:w-auto justify-between">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-surface-raised border border-border-strong rounded-xl text-xs font-medium text-fg focus:outline-blue-600"
            >
              <option value="ALL">All Statuses</option>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>

            <button
              onClick={() => setIsNewOutageModalOpen(true)}
              className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Log Incident</span>
            </button>
          </div>
        </div>

        {/* List of Outages */}
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {filteredOutages.map((outage) => {
            const isCritical = outage.severity === 'Critical' || outage.severity === 'High';

            return (
              <div
                key={outage.id}
                onClick={() => setSelectedOutage(outage)}
                className="p-4 sm:p-5 hover:bg-surface-raised/80 dark:hover:bg-slate-800/60 transition-colors cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3.5">
                  <div
                    className={`p-2.5 rounded-xl shrink-0 mt-0.5 ${
                      isCritical
                        ? 'bg-red-50 dark:bg-red-950/60 text-red-600 dark:text-red-400'
                        : 'bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400'
                    }`}
                  >
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-bold text-fg text-sm">
                        {outage.substation}
                      </h4>
                      <span className="text-xs text-fg-muted">• {outage.feederLine || 'Feeder 04'}</span>
                      <span
                        className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                          isCritical
                            ? 'bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-300'
                            : 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300'
                        }`}
                      >
                        {outage.severity}
                      </span>
                    </div>
                    <p className="text-xs text-fg-muted mt-1">
                      {outage.district || 'Western Area Urban'} • {outage.cause || 'Power interruption on 33kV line'}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-[11px] text-fg-muted">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {outage.district || 'Western Area Urban'}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {outage.timeAgo || '2 hours ago'}
                      </span>
                      <span>~{outage.affectedCustomers || 1200} affected consumers</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      outage.status === 'Resolved'
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400'
                        : outage.status === 'In Progress'
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-400'
                        : 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-400'
                    }`}
                  >
                    {outage.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
