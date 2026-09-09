import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Phone, Mail, MapPin, Zap, ShieldCheck } from 'lucide-react';

export const CustomerDetailDrawer: React.FC = () => {
  const {
    selectedCustomer,
    setSelectedCustomer,
    setIsVendingSimulatorOpen,
    formatCurrency,
    formatNumber,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'meters' | 'transactions'>('overview');

  if (!selectedCustomer) return null;

  const customer = selectedCustomer;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/50 backdrop-blur-xs flex justify-end">
      <div className="bg-surface w-full max-w-md h-full shadow-2xl flex flex-col border-l border-border">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-surface-raised/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
              {customer.name
                .split(' ')
                .map((n) => n[0])
                .join('')
                .slice(0, 2)}
            </div>
            <div>
              <h3 className="text-base font-bold text-fg">{customer.name}</h3>
              <p className="text-xs text-fg-muted font-mono">ID: {customer.id}</p>
            </div>
          </div>
          <button
            onClick={() => setSelectedCustomer(null)}
            className="p-1.5 text-fg-muted hover:text-fg rounded-xl hover:bg-surface-raised transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border px-5 text-xs font-bold bg-surface-raised/30">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-3 border-b-2 cursor-pointer transition-colors ${
              activeTab === 'overview'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-fg-muted hover:text-fg'
            }`}
          >
            Customer Profile
          </button>
          <button
            onClick={() => setActiveTab('meters')}
            className={`py-3 px-3 border-b-2 cursor-pointer transition-colors ${
              activeTab === 'meters'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-fg-muted hover:text-fg'
            }`}
          >
            Meters ({customer.meters?.length || 1})
          </button>
          <button
            onClick={() => setActiveTab('transactions')}
            className={`py-3 px-3 border-b-2 cursor-pointer transition-colors ${
              activeTab === 'transactions'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-fg-muted hover:text-fg'
            }`}
          >
            Billing History
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5 text-xs">
          {activeTab === 'overview' && (
            <>
              {/* Status Badge */}
              <div className="flex items-center justify-between p-3.5 bg-surface-raised rounded-xl border border-border/60">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span className="font-bold text-fg">Account Status</span>
                </div>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    customer.status === 'Active' || customer.accountStatus === 'Active'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {customer.status || customer.accountStatus || 'Active'}
                </span>
              </div>

              {/* Contact Info */}
              <div className="space-y-3">
                <h4 className="font-bold text-fg text-xs uppercase tracking-wider">Contact & Address</h4>
                <div className="p-4 bg-surface-raised rounded-xl border border-border/60 space-y-2.5">
                  <div className="flex items-center gap-2 text-fg">
                    <Phone className="w-4 h-4 text-fg-muted" />
                    <span>{customer.phone}</span>
                  </div>
                  {customer.email && (
                    <div className="flex items-center gap-2 text-fg">
                      <Mail className="w-4 h-4 text-fg-muted" />
                      <span>{customer.email}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-fg">
                    <MapPin className="w-4 h-4 text-fg-muted" />
                    <span>{customer.address}, {customer.district}</span>
                  </div>
                </div>
              </div>

              {/* Consumption Stats */}
              <div className="space-y-3">
                <h4 className="font-bold text-fg text-xs uppercase tracking-wider">Lifetime Statistics</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-surface-raised rounded-xl border border-border/60">
                    <span className="text-fg-muted font-medium">Total Spend</span>
                    <p className="text-sm font-bold text-fg mt-0.5">
                      {formatCurrency(customer.totalSpendLe || 14850)}
                    </p>
                  </div>
                  <div className="p-3 bg-surface-raised rounded-xl border border-border/60">
                    <span className="text-fg-muted font-medium">Total Consumed</span>
                    <p className="text-sm font-bold text-emerald-600 mt-0.5">
                      {formatNumber(customer.totalUnitsKWh || 1269)} kWh
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'meters' && (
            <div className="space-y-3">
              {(customer.meters || [
                {
                  meterNumber: customer.meterNumber || '12345678901',
                  type: 'STS Single-Phase',
                  district: customer.district,
                  status: 'Active',
                  installationDate: '12 Jan 2023',
                },
              ]).map((m, idx) => (
                <div key={idx} className="p-4 bg-surface-raised rounded-xl border border-border space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-amber-500" />
                      <span className="font-mono font-bold text-fg">{m.meterNumber}</span>
                    </div>
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-md text-[10px] font-bold">
                      {m.status || 'Active'}
                    </span>
                  </div>
                  <div className="text-fg-muted text-[11px] space-y-0.5">
                    <div>Type: {m.type}</div>
                    <div>District: {m.district}</div>
                    <div>Installed: {m.installationDate}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'transactions' && (
            <div className="space-y-3">
              <div className="p-3 bg-surface-raised rounded-xl border border-border text-center text-fg-muted py-6">
                <p>Showing latest STS token transactions</p>
                <div className="mt-3 font-mono font-bold text-fg text-xs">
                  Latest: 4829-1049-5820-1948-2841
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="p-4 bg-surface-raised border-t border-slate-100 flex gap-2">
          <button
            onClick={() => {
              setIsVendingSimulatorOpen(true);
            }}
            className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Zap className="w-4 h-4" />
            Vend Electricity Token
          </button>
        </div>
      </div>
    </div>
  );
};
