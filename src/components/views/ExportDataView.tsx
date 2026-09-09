import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Download,
  FileSpreadsheet,
  FileText,
  Calendar,
  CheckCircle2,
  Database,
  Filter,
} from 'lucide-react';

export const ExportDataView: React.FC = () => {
  const { addToast } = useApp();
  const [exportDataset, setExportDataset] = useState('transactions');
  const [format, setFormat] = useState('csv');
  const [dateRange, setDateRange] = useState('30d');
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      addToast(`EDSA dataset (${exportDataset}) exported as .${format.toUpperCase()} successfully.`, 'success');
    }, 900);
  };

  const datasets = [
    { id: 'transactions', name: 'Vending Transactions Log', desc: 'All STS pre-paid token purchases, payment refs, timestamp and kWh' },
    { id: 'customers', name: 'Customer Master Directory', desc: 'Registered meters, KYC status, contact numbers, and district zones' },
    { id: 'outages', name: 'Outage & Incident Reports', desc: 'Historical grid fault reports, feeder line logs, and restoration times' },
    { id: 'financials', name: 'Revenue & Settlement Summary', desc: 'Daily reconciliation breakdown by Orange Money, Afrimoney, Bank & OTC' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-surface p-6 rounded-2xl border border-border shadow-sm space-y-6">
        <div>
          <h3 className="text-base font-bold text-fg">Export Operational Data & Reports</h3>
          <p className="text-xs text-fg-muted mt-0.5">
            Generate regulatory extracts and audit-compliant spreadsheets for EDSA Operations & Ministry of Energy
          </p>
        </div>

        {/* Dataset Selection */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-fg">1. Select Data Category</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {datasets.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setExportDataset(item.id)}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                  exportDataset === item.id
                    ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/30 text-blue-900 dark:text-blue-200 ring-2 ring-blue-600/20'
                    : 'border-border-strong bg-surface-raised/50 dark:bg-slate-800/40 text-fg hover:border-border-strong'
                }`}
              >
                <div className="font-bold text-xs">{item.name}</div>
                <div className="text-[11px] text-fg-muted mt-1">{item.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div>
            <label className="block text-xs font-bold text-fg mb-1.5">Date Range</label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full px-3 py-2 bg-surface-raised border border-border-strong rounded-xl text-xs text-fg"
            >
              <option value="today">Today (14 Apr 2025)</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days (Current Month)</option>
              <option value="90d">Quarter 1 (Jan - Mar 2025)</option>
              <option value="1y">Year to Date (2025)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-fg mb-1.5">Format</label>
            <div className="grid grid-cols-3 gap-2">
              {['csv', 'xlsx', 'pdf'].map((fmt) => (
                <button
                  key={fmt}
                  type="button"
                  onClick={() => setFormat(fmt)}
                  className={`py-2 rounded-xl text-xs font-bold uppercase transition-all cursor-pointer ${
                    format === fmt
                      ? 'bg-blue-600 text-white'
                      : 'bg-surface-raised text-fg hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {fmt}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button
            type="button"
            disabled={isExporting}
            onClick={handleExport}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm cursor-pointer transition-all"
          >
            <Download className="w-4 h-4" />
            <span>{isExporting ? 'Generating Report...' : `Export .${format.toUpperCase()}`}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
