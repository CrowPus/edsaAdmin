import React from 'react';
import { useApp } from '../../context/AppContext';
import { RefreshCw, Smartphone, CreditCard, Building2, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const PaymentsView: React.FC = () => {
  const { addToast } = useApp();

  const gateways = [
    {
      id: 'orange-money',
      name: 'Orange Money Sierra Leone',
      shortName: 'OM',
      type: 'Mobile Money USSD / API',
      color: '#ff6600',
      status: 'Active / Healthy',
      todayVolume: 'Le 2,605,344',
      share: '48.0%',
      successRate: '99.4%',
      avgLatency: '420ms',
    },
    {
      id: 'afrimoney',
      name: 'Afrimoney (Africell SL)',
      shortName: 'AF',
      type: 'Mobile Money Gateway',
      color: '#e2001a',
      status: 'Active / Healthy',
      todayVolume: 'Le 1,736,896',
      share: '32.0%',
      successRate: '99.1%',
      avgLatency: '380ms',
    },
    {
      id: 'bank-cards',
      name: 'Commercial Bank API / Visa',
      shortName: 'BK',
      type: 'Direct Bank Settlement (SLIB / Ecobank / Rokel)',
      color: '#2563eb',
      status: 'Active / Healthy',
      todayVolume: 'Le 651,336',
      share: '12.0%',
      successRate: '98.7%',
      avgLatency: '610ms',
    },
    {
      id: 'cash-counters',
      name: 'EDSA Direct Cash Counters',
      shortName: 'ED',
      type: 'Over-The-Counter POS Terminal',
      color: '#16a34a',
      status: 'Active / Healthy',
      todayVolume: 'Le 434,224',
      share: '8.0%',
      successRate: '100.0%',
      avgLatency: '120ms',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface p-5 rounded-2xl border border-border shadow-sm">
          <div className="text-xs text-fg-muted font-medium">Total Daily Routed</div>
          <div className="text-2xl font-extrabold text-fg mt-1">Le 5,427,800</div>
          <div className="text-xs text-emerald-600 dark:text-emerald-400 font-bold mt-1">Across 16,950 transactions</div>
        </div>

        <div className="bg-surface p-5 rounded-2xl border border-border shadow-sm">
          <div className="text-xs text-fg-muted font-medium">Settlement Health</div>
          <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">99.2%</div>
          <div className="text-xs text-fg-muted mt-1">Zero pending reconciliations</div>
        </div>

        <div className="bg-surface p-5 rounded-2xl border border-border shadow-sm">
          <div className="text-xs text-fg-muted font-medium">Gateway Avg Latency</div>
          <div className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 mt-1">382 ms</div>
          <div className="text-xs text-fg-muted mt-1">Under 1s SLA target</div>
        </div>

        <div className="bg-surface p-5 rounded-2xl border border-border shadow-sm">
          <div className="text-xs text-fg-muted font-medium">Bank Reconciliations</div>
          <div className="text-2xl font-extrabold text-purple-600 dark:text-purple-400 mt-1">Automated</div>
          <div className="text-xs text-fg-muted mt-1">Daily batch at 23:59 GMT</div>
        </div>
      </div>

      {/* Gateway Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {gateways.map((gw) => (
          <div
            key={gw.id}
            className="bg-surface p-6 rounded-2xl border border-border shadow-sm space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {gw.id === 'orange-money' ? (
                  <img
                    src="/orang.png"
                    alt="Orange Money"
                    className="w-10 h-10 rounded-xl object-contain p-1 bg-white dark:bg-slate-900 border border-border shadow-xs shrink-0"
                  />
                ) : gw.id === 'afrimoney' ? (
                  <img
                    src="/afrimoney.png"
                    alt="Afrimoney"
                    className="w-10 h-10 rounded-xl object-contain p-1 bg-white border border-border shadow-xs shrink-0"
                  />
                ) : gw.id === 'bank-cards' ? (
                  <img
                    src="/credit-card.png"
                    alt="Cards"
                    className="w-10 h-10 rounded-xl object-contain p-1.5 bg-white dark:bg-slate-800 border border-border shadow-xs shrink-0"
                  />
                ) : (
                  <span
                    className="w-10 h-10 rounded-xl text-white font-bold flex items-center justify-center text-sm shadow-xs shrink-0"
                    style={{ backgroundColor: gw.color }}
                  >
                    {gw.shortName}
                  </span>
                )}
                <div>
                  <h4 className="text-sm font-bold text-fg">{gw.name}</h4>
                  <span className="text-[11px] text-fg-muted">{gw.type}</span>
                </div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                {gw.status}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
              <div className="p-2.5 bg-surface-raised rounded-xl">
                <span className="text-[11px] text-fg-muted block">24h Volume</span>
                <span className="font-bold text-fg mt-0.5 block">{gw.todayVolume}</span>
              </div>
              <div className="p-2.5 bg-surface-raised rounded-xl">
                <span className="text-[11px] text-fg-muted block">Success Rate</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400 mt-0.5 block">{gw.successRate}</span>
              </div>
              <div className="p-2.5 bg-surface-raised rounded-xl">
                <span className="text-[11px] text-fg-muted block">Avg Latency</span>
                <span className="font-mono font-bold text-fg mt-0.5 block">{gw.avgLatency}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
