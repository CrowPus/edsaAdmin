import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  TrendingUp,
  Download,
  Users,
  Zap,
  DollarSign,
  Activity,
  Calendar,
} from 'lucide-react';
import { mockDailySales, mockDistrictStats } from '../../mock/data';

export const AnalyticsView: React.FC = () => {
  const { kpis, formatCurrency, formatNumber, addToast } = useApp();
  const [timeRange, setTimeRange] = useState('7d');

  return (
    <div className="space-y-6">
      {/* Top Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface p-5 rounded-2xl border border-border shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-fg-muted uppercase tracking-wider">Total Sales Volume</span>
            <div className="p-2 bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 rounded-xl">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-fg font-sans">
            542,780 <span className="text-sm font-semibold text-fg-muted font-sans">kWh</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-bold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+15.2% vs previous week</span>
          </div>
        </div>

        <div className="bg-surface p-5 rounded-2xl border border-border shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-fg-muted uppercase tracking-wider">Total Revenue</span>
            <div className="p-2 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-xl">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-fg font-sans">
            Le 5,427,800
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-bold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+18.4% vs last month</span>
          </div>
        </div>

        <div className="bg-surface p-5 rounded-2xl border border-border shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-fg-muted uppercase tracking-wider">Vending Load</span>
            <div className="p-2 bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 rounded-xl">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-fg font-sans">
            16,950 <span className="text-sm font-semibold text-fg-muted font-sans">Tokens</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-blue-600 dark:text-blue-400 font-bold">
            <span>Peak hour: 18:00 - 21:00 GMT</span>
          </div>
        </div>

        <div className="bg-surface p-5 rounded-2xl border border-border shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-fg-muted uppercase tracking-wider">Active Customers</span>
            <div className="p-2 bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 rounded-xl">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-fg font-sans">
            125,430
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-bold">
            <span>98.6% active pre-paid rate</span>
          </div>
        </div>
      </div>

      {/* Main Analytics Graphs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Daily Sales Chart */}
        <div className="lg:col-span-8 bg-surface p-6 rounded-2xl border border-border shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-fg">Daily Electricity Sales Volume (kWh)</h3>
              <p className="text-xs text-fg-muted mt-0.5">Energy dispatched across prepaid customer meters</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex bg-surface-raised p-1 rounded-xl">
                {['7d', '14d', '30d'].map((r) => (
                  <button
                    key={r}
                    onClick={() => setTimeRange(r)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold uppercase transition-colors cursor-pointer ${
                      timeRange === r
                        ? 'bg-surface dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm'
                        : 'text-fg-muted'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
              <button
                onClick={() => addToast('Exporting Analytics CSV dataset...', 'info')}
                className="p-2 text-fg-muted hover:text-fg dark:hover:text-white hover:bg-surface-raised dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="h-64 flex items-end justify-between gap-3 pt-4 px-2">
            {(mockDailySales || []).map((d: any, idx: number) => {
              const maxKwh = 150000;
              const heightPct = Math.min(100, Math.round((d.salesKWh / maxKwh) * 100));
              const isToday = idx === (mockDailySales || []).length - 1;

              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  <div className="text-[10px] text-fg-muted opacity-0 group-hover:opacity-100 transition-opacity font-mono">
                    {Math.round(d.salesKWh / 1000)}k
                  </div>
                  <div className="w-full max-w-[42px] bg-surface-raised rounded-t-lg overflow-hidden flex flex-col justify-end h-full">
                    <div
                      className={`w-full rounded-t-lg transition-all duration-300 ${
                        isToday ? 'bg-blue-600 dark:bg-blue-500' : 'bg-blue-200 dark:bg-blue-400/40 group-hover:bg-blue-300'
                      }`}
                      style={{ height: `${heightPct}%` }}
                    />
                  </div>
                  <span className="text-[11px] font-medium text-fg-muted whitespace-nowrap">
                    {d.day}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Regional District Distribution */}
        <div className="lg:col-span-4 bg-surface p-6 rounded-2xl border border-border shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-fg">Regional Distribution</h3>
              <p className="text-xs text-fg-muted mt-0.5">District customer breakdown</p>
            </div>
          </div>

          <div className="space-y-4 pt-2">
            {(mockDistrictStats || []).map((dist: any) => (
              <div key={dist.name} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-fg dark:text-slate-200">{dist.name}</span>
                  <span className="text-fg-muted font-mono">{dist.sharePct}%</span>
                </div>
                <div className="w-full h-2 bg-surface-raised rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 dark:bg-blue-500 rounded-full"
                    style={{ width: `${dist.sharePct}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] text-fg-muted">
                  <span>{formatNumber(dist.customers)} customers</span>
                  <span>{formatCurrency(dist.revenueLe)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
