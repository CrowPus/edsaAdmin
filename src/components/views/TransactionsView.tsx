import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, CheckCircle2, Clock, XCircle, Eye, Download, RefreshCw, FileText, Smartphone } from 'lucide-react';
import { Transaction } from '../../types';

export const TransactionsView: React.FC = () => {
  const {
    transactions,
    setSelectedTransaction,
    formatCurrency,
    formatNumber,
    retryTransaction,
    setIsVendingSimulatorOpen,
    addToast,
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [methodFilter, setMethodFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filteredTransactions = transactions.filter((t) => {
    const matchesSearch =
      t.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.meterNumber.includes(searchTerm) ||
      (t.referenceId && t.referenceId.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (t.token && t.token.includes(searchTerm));

    const matchesMethod = methodFilter === 'ALL' || t.paymentMethod === methodFilter;
    const matchesStatus = statusFilter === 'ALL' || t.status === statusFilter;

    return matchesSearch && matchesMethod && matchesStatus;
  });

  const getMethodBadge = (method: string) => {
    switch (method) {
      case 'Orange Money':
        return (
          <div className="flex items-center gap-2">
            <img
              src="/orang.png"
              alt="Orange Money"
              className="w-5 h-5 rounded-md object-contain shrink-0"
            />
            <span className="text-fg font-medium">{method}</span>
          </div>
        );
      case 'Afrimoney':
        return (
          <div className="flex items-center gap-2">
            <img
              src="/afrimoney.png"
              alt="Afrimoney"
              className="w-5 h-5 rounded-md object-contain shadow-xs shrink-0 bg-white"
            />
            <span className="text-fg font-medium">{method}</span>
          </div>
        );
      case 'Card Payment':
      case 'Visa / Mastercard':
      case 'Bank / Card':
        return (
          <div className="flex items-center gap-2">
            <img
              src="/credit-card.png"
              alt="Card Payment"
              className="w-5 h-5 rounded-md object-contain shadow-xs shrink-0"
            />
            <span className="text-fg font-medium">Card Payment</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-md bg-emerald-600 text-white flex items-center justify-center text-[9px] font-bold shadow-xs shrink-0">
              AG
            </span>
            <span className="text-fg font-medium">{method}</span>
          </div>
        );
    }
  };

  const getStatusBadge = (status: Transaction['status']) => {
    switch (status) {
      case 'Success':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100/80 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400">
            <CheckCircle2 className="w-3 h-3" />
            <span>Success</span>
          </span>
        );
      case 'Pending':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-100/80 text-amber-800 dark:bg-amber-950/60 dark:text-amber-400">
            <Clock className="w-3 h-3" />
            <span>Pending</span>
          </span>
        );
      case 'Failed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-red-100/80 text-red-800 dark:bg-red-950/60 dark:text-red-400">
            <XCircle className="w-3 h-3" />
            <span>Failed</span>
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Stat Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface p-4 rounded-2xl border border-border shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 rounded-xl">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-fg-muted font-medium">Daily Vending Total</div>
            <div className="text-xl font-bold text-fg">Le 5,427,800</div>
          </div>
        </div>

        <div className="bg-surface p-4 rounded-2xl border border-border shadow-sm flex items-center gap-4">
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-xl">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-fg-muted font-medium">Successful Tokens (24h)</div>
            <div className="text-xl font-bold text-fg">16,950</div>
          </div>
        </div>

        <div className="bg-surface p-4 rounded-2xl border border-border shadow-sm flex items-center gap-4">
          <div className="p-3 bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 rounded-xl">
            <Smartphone className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-fg-muted font-medium">Mobile Money Share</div>
            <div className="text-xl font-bold text-fg">80.0%</div>
          </div>
        </div>

        <div className="bg-surface p-4 rounded-2xl border border-border shadow-sm flex items-center gap-4">
          <div className="p-3 bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 rounded-xl">
            <RefreshCw className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-fg-muted font-medium">Reconciled Rate</div>
            <div className="text-xl font-bold text-fg">99.98%</div>
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
              placeholder="Search by customer, meter, reference or token..."
              className="w-full pl-9 pr-3 py-2 bg-surface-raised border border-border-strong rounded-xl text-xs text-fg focus:bg-surface dark:focus:bg-slate-800 focus:outline-blue-600"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
            <select
              value={methodFilter}
              onChange={(e) => setMethodFilter(e.target.value)}
              className="px-3 py-2 bg-surface-raised border border-border-strong rounded-xl text-xs font-medium text-fg focus:outline-blue-600"
            >
              <option value="ALL">All Payment Channels</option>
              <option value="Orange Money">Orange Money</option>
              <option value="Afrimoney">Afrimoney</option>
              <option value="Card Payment">Card Payment</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-surface-raised border border-border-strong rounded-xl text-xs font-medium text-fg focus:outline-blue-600"
            >
              <option value="ALL">All Statuses</option>
              <option value="Success">Success</option>
              <option value="Pending">Pending</option>
              <option value="Failed">Failed</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-[11px] font-semibold text-fg-muted dark:text-fg-muted">
                <th className="py-3 px-4 font-medium">Customer</th>
                <th className="py-3 px-4 font-medium">Meter Number</th>
                <th className="py-3 px-4 font-medium">Amount</th>
                <th className="py-3 px-4 font-medium">Units (kWh)</th>
                <th className="py-3 px-4 font-medium">Channel</th>
                <th className="py-3 px-4 font-medium">Status</th>
                <th className="py-3 px-4 font-medium">Timestamp</th>
                <th className="py-3 px-4 font-medium text-right">Receipt / Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredTransactions.map((tx) => (
                <tr
                  key={tx.id}
                  onClick={() => setSelectedTransaction(tx)}
                  className="hover:bg-surface-raised/80 dark:hover:bg-slate-800/60 transition-colors cursor-pointer"
                >
                  <td className="py-3 px-4 font-bold text-fg">
                    {tx.customerName}
                  </td>
                  <td className="py-3 px-4 font-mono text-fg-muted">
                    {tx.meterNumber}
                  </td>
                  <td className="py-3 px-4 font-bold text-fg font-mono">
                    {formatCurrency(tx.amountLe || tx.amount || 500)}
                  </td>
                  <td className="py-3 px-4 font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                    +{tx.unitsKWh || tx.units || 42.7} kWh
                  </td>
                  <td className="py-3 px-4">
                    {getMethodBadge(tx.paymentMethod)}
                  </td>
                  <td className="py-3 px-4">
                    {getStatusBadge(tx.status)}
                  </td>
                  <td className="py-3 px-4 text-fg-muted">
                    {tx.date || '14 Apr, 10:24'}
                  </td>
                  <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => setSelectedTransaction(tx)}
                      className="px-2.5 py-1 bg-surface-raised hover:bg-slate-200 dark:hover:bg-slate-700 text-fg rounded-lg text-xs font-semibold transition-colors cursor-pointer inline-flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Token</span>
                    </button>
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
