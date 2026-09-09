import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, X, Users, Gauge, FileText, AlertTriangle } from 'lucide-react';
import { NavSection } from '../../types';

export const GlobalSearchModal: React.FC = () => {
  const {
    isGlobalSearchOpen,
    setIsGlobalSearchOpen,
    globalSearchQuery,
    setGlobalSearchQuery,
    customers,
    transactions,
    outages,
    meters,
    setSelectedCustomer,
    setSelectedTransaction,
    setSelectedOutage,
    setActiveSection,
    formatCurrency,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'all' | 'customers' | 'meters' | 'transactions' | 'outages'>('all');

  if (!isGlobalSearchOpen) return null;

  const query = globalSearchQuery.toLowerCase().trim();

  const matchedCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(query) ||
      (c.meterNumber || '').includes(query) ||
      (c.phone || '').includes(query) ||
      c.id.toLowerCase().includes(query)
  );

  const matchedMeters = meters.filter(
    (m) =>
      m.meterNumber.includes(query) ||
      (m.customerName || '').toLowerCase().includes(query) ||
      (m.substation || '').toLowerCase().includes(query)
  );

  const matchedTransactions = transactions.filter(
    (t) =>
      t.id.toLowerCase().includes(query) ||
      (t.referenceId || '').toLowerCase().includes(query) ||
      (t.meterNumber || '').includes(query) ||
      t.customerName.toLowerCase().includes(query) ||
      (t.token || t.stsToken || t.tokenGenerated || '').includes(query)
  );

  const matchedOutages = outages.filter(
    (o) =>
      (o.title || '').toLowerCase().includes(query) ||
      (o.substation || '').toLowerCase().includes(query) ||
      (o.feederLine || '').toLowerCase().includes(query) ||
      (o.district || '').toLowerCase().includes(query)
  );

  const totalResults =
    matchedCustomers.length +
    matchedMeters.length +
    matchedTransactions.length +
    matchedOutages.length;

  const handleSelectCustomer = (c: any) => {
    setSelectedCustomer(c);
    setIsGlobalSearchOpen(false);
  };

  const handleSelectTransaction = (t: any) => {
    setSelectedTransaction(t);
    setIsGlobalSearchOpen(false);
  };

  const handleSelectOutage = (o: any) => {
    setSelectedOutage(o);
    setIsGlobalSearchOpen(false);
  };

  const handleNavigateSection = (section: NavSection) => {
    setActiveSection(section);
    setIsGlobalSearchOpen(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in"
      onClick={() => setIsGlobalSearchOpen(false)}
    >
      <div
        className="w-full max-w-2xl bg-surface rounded-2xl shadow-2xl border border-border overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="p-4 border-b border-border flex items-center gap-3 bg-surface-raised/50">
          <Search className="w-5 h-5 text-fg-muted" />
          <input
            type="text"
            autoFocus
            value={globalSearchQuery}
            onChange={(e) => setGlobalSearchQuery(e.target.value)}
            placeholder="Search customers, 11-digit meters, 20-digit tokens, outages, or transactions..."
            className="w-full bg-transparent text-sm font-medium text-fg placeholder:text-fg-muted focus:outline-hidden"
          />
          {globalSearchQuery && (
            <button
              onClick={() => setGlobalSearchQuery('')}
              className="p-1 hover:bg-slate-200 rounded-lg text-fg-muted hover:text-fg-muted"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono font-bold text-fg-muted bg-surface-raised border border-border rounded-md">
            ESC
          </kbd>
        </div>

        {/* Filter tabs */}
        <div className="flex border-b border-slate-100 px-4 gap-2 text-xs font-bold text-fg-muted overflow-x-auto">
          {[
            { id: 'all', label: `All (${totalResults})` },
            { id: 'customers', label: `Customers (${matchedCustomers.length})` },
            { id: 'meters', label: `Meters (${matchedMeters.length})` },
            { id: 'transactions', label: `Transactions (${matchedTransactions.length})` },
            { id: 'outages', label: `Outages (${matchedOutages.length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-2.5 px-2 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent hover:text-fg'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Results Container */}
        <div className="p-4 overflow-y-auto space-y-4 max-h-[60vh]">
          {totalResults === 0 ? (
            <div className="py-12 text-center text-fg-muted text-xs">
              No matching records found for "{globalSearchQuery}"
            </div>
          ) : (
            <>
              {/* Customers section */}
              {(activeTab === 'all' || activeTab === 'customers') && matchedCustomers.length > 0 && (
                <div>
                  <div className="text-[10px] font-bold text-fg-muted uppercase tracking-wider mb-2 flex items-center justify-between">
                    <span>Customers ({matchedCustomers.length})</span>
                    <button
                      onClick={() => handleNavigateSection('customers')}
                      className="text-blue-600 hover:underline cursor-pointer"
                    >
                      View all in Customers →
                    </button>
                  </div>
                  <div className="space-y-1.5">
                    {matchedCustomers.slice(0, 3).map((c) => (
                      <div
                        key={c.id}
                        onClick={() => handleSelectCustomer(c)}
                        className="p-3 bg-surface-raised hover:bg-blue-50/60 rounded-xl border border-border/60 transition-colors flex items-center justify-between cursor-pointer group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                            <Users className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-fg group-hover:text-blue-600">
                              {c.name}
                            </div>
                            <div className="text-[11px] text-fg-muted flex items-center gap-2">
                              <span>ID: {c.id}</span>
                              <span>•</span>
                              <span className="font-mono">Meter: {c.meterNumber || (c.meters && c.meters[0]?.meterNumber)}</span>
                            </div>
                          </div>
                        </div>
                        <span className="text-[11px] font-bold text-fg bg-surface px-2 py-0.5 rounded-md border border-border">
                          {c.district}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Transactions section */}
              {(activeTab === 'all' || activeTab === 'transactions') && matchedTransactions.length > 0 && (
                <div>
                  <div className="text-[10px] font-bold text-fg-muted uppercase tracking-wider mb-2 flex items-center justify-between">
                    <span>Vending Transactions ({matchedTransactions.length})</span>
                    <button
                      onClick={() => handleNavigateSection('transactions')}
                      className="text-blue-600 hover:underline cursor-pointer"
                    >
                      View all in Transactions →
                    </button>
                  </div>
                  <div className="space-y-1.5">
                    {matchedTransactions.slice(0, 3).map((t) => (
                      <div
                        key={t.id}
                        onClick={() => handleSelectTransaction(t)}
                        className="p-3 bg-surface-raised hover:bg-blue-50/60 rounded-xl border border-border/60 transition-colors flex items-center justify-between cursor-pointer group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-xs">
                            <FileText className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-fg group-hover:text-blue-600">
                              {t.customerName} - {formatCurrency(t.amountLe || t.amount)}
                            </div>
                            <div className="text-[11px] text-fg-muted flex items-center gap-2 font-mono">
                              <span>Ref: {t.referenceId || t.reference || t.id}</span>
                              <span>•</span>
                              <span>Token: {t.token || t.stsToken || t.tokenGenerated || 'N/A'}</span>
                            </div>
                          </div>
                        </div>
                        <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                          {t.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Meters section */}
              {(activeTab === 'all' || activeTab === 'meters') && matchedMeters.length > 0 && (
                <div>
                  <div className="text-[10px] font-bold text-fg-muted uppercase tracking-wider mb-2 flex items-center justify-between">
                    <span>Meters & Grid Nodes ({matchedMeters.length})</span>
                    <button
                      onClick={() => handleNavigateSection('meters')}
                      className="text-blue-600 hover:underline cursor-pointer"
                    >
                      View all in Meters →
                    </button>
                  </div>
                  <div className="space-y-1.5">
                    {matchedMeters.slice(0, 3).map((m) => (
                      <div
                        key={m.meterNumber}
                        onClick={() => handleNavigateSection('meters')}
                        className="p-3 bg-surface-raised hover:bg-blue-50/60 rounded-xl border border-border/60 transition-colors flex items-center justify-between cursor-pointer group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-xs">
                            <Gauge className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-mono font-bold text-fg group-hover:text-blue-600">
                              {m.meterNumber}
                            </div>
                            <div className="text-[11px] text-fg-muted">
                              {m.customerName} • {m.type}
                            </div>
                          </div>
                        </div>
                        <span className="text-[11px] font-semibold text-fg-muted bg-surface px-2 py-0.5 rounded-md border border-border">
                          {m.substation || m.district}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Outages section */}
              {(activeTab === 'all' || activeTab === 'outages') && matchedOutages.length > 0 && (
                <div>
                  <div className="text-[10px] font-bold text-fg-muted uppercase tracking-wider mb-2 flex items-center justify-between">
                    <span>Grid Outages & Incidents ({matchedOutages.length})</span>
                    <button
                      onClick={() => handleNavigateSection('outages')}
                      className="text-blue-600 hover:underline cursor-pointer"
                    >
                      View all in Outages →
                    </button>
                  </div>
                  <div className="space-y-1.5">
                    {matchedOutages.slice(0, 3).map((o) => (
                      <div
                        key={o.id}
                        onClick={() => handleSelectOutage(o)}
                        className="p-3 bg-surface-raised hover:bg-blue-50/60 rounded-xl border border-border/60 transition-colors flex items-center justify-between cursor-pointer group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-red-100 text-red-700 flex items-center justify-center font-bold text-xs">
                            <AlertTriangle className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-fg group-hover:text-blue-600">
                              {o.title}
                            </div>
                            <div className="text-[11px] text-fg-muted">
                              {o.substation} • {o.feederLine || o.district}
                            </div>
                          </div>
                        </div>
                        <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                          {o.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
