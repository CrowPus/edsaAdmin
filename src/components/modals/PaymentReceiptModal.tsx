import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Copy, Printer, Zap } from 'lucide-react';

export const PaymentReceiptModal: React.FC = () => {
  const { selectedTransaction, setSelectedTransaction, addToast, formatCurrency } = useApp();

  if (!selectedTransaction) return null;

  const tx = selectedTransaction;

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    addToast(`${label} copied to clipboard!`, 'info');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75">
      <div className="bg-white dark:bg-slate-900 w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh] text-slate-900 dark:text-white">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/60">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 rounded-xl">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Transaction Details</h3>
                <span
                  className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-md ${
                    tx.status === 'Success'
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400'
                      : tx.status === 'Pending'
                      ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-400'
                      : 'bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-400'
                  }`}
                >
                  {tx.status}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                Ref: {tx.referenceId || tx.reference || tx.id}
              </p>
            </div>
          </div>
          <button
            onClick={() => setSelectedTransaction(null)}
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-5 bg-white dark:bg-slate-900">
          {/* STS Token Box */}
          <div className="p-4 bg-amber-50 dark:bg-amber-950/30 rounded-2xl border border-amber-200/80 dark:border-amber-800/40">
            <div className="text-[10px] font-bold text-amber-800 dark:text-amber-400 uppercase tracking-wider mb-1">
              STS 20-Digit Pre-Paid Token
            </div>
            <div className="text-lg font-mono font-bold text-slate-900 dark:text-white tracking-wider flex items-center justify-between">
              <span>{tx.token || tx.stsToken || '4829-1049-5820-1948-2841'}</span>
              <button
                onClick={() => copyToClipboard(tx.token || tx.stsToken || '4829-1049-5820-1948-2841', 'Token')}
                className="p-1.5 text-amber-800 dark:text-amber-300 hover:bg-amber-200/60 dark:hover:bg-amber-900/60 rounded-lg transition-colors cursor-pointer"
                title="Copy Token"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
            <div className="text-[11px] text-amber-700 dark:text-amber-400/80 mt-1">
              Enter this 20-digit PIN directly into meter keypad followed by #
            </div>
          </div>

          {/* Breakdown Grid */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200/80 dark:border-slate-700/60">
              <span className="text-slate-500 dark:text-slate-400 font-medium">Customer Name</span>
              <p className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">{tx.customerName || 'Fatima Kamara'}</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200/80 dark:border-slate-700/60">
              <span className="text-slate-500 dark:text-slate-400 font-medium">Meter Number</span>
              <p className="text-sm font-mono font-bold text-slate-900 dark:text-white mt-0.5">{tx.meterNumber}</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200/80 dark:border-slate-700/60">
              <span className="text-slate-500 dark:text-slate-400 font-medium">Amount Paid</span>
              <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
                {formatCurrency(tx.amountLe || tx.amount || 500)}
              </p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200/80 dark:border-slate-700/60">
              <span className="text-slate-500 dark:text-slate-400 font-medium">Energy Delivered</span>
              <p className="text-sm font-bold text-blue-600 dark:text-blue-400 mt-0.5">
                {tx.unitsKWh || tx.units || 42.7} kWh
              </p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200/80 dark:border-slate-700/60">
              <span className="text-slate-500 dark:text-slate-400 font-medium">Payment Gateway</span>
              <div className="flex items-center gap-2 mt-1">
                {(tx.paymentMethod || '').includes('Afrimoney') ? (
                  <img src="/afrimoney.png" alt="Afrimoney" className="w-5 h-5 rounded-md object-contain bg-white shadow-xs shrink-0" />
                ) : (tx.paymentMethod || '').includes('Card') || (tx.paymentMethod || '').includes('Bank') ? (
                  <img src="/credit-card.png" alt="Cards" className="w-5 h-5 rounded-md object-contain shadow-xs shrink-0" />
                ) : (
                  <img src="/orang.png" alt="Orange Money" className="w-5 h-5 rounded-md object-contain shrink-0" />
                )}
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  {tx.paymentMethod || tx.channel || 'Orange Money'}
                </p>
              </div>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200/80 dark:border-slate-700/60">
              <span className="text-slate-500 dark:text-slate-400 font-medium">Timestamp</span>
              <p className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">{tx.date || tx.timestamp || '14 Apr 2025, 10:24'}</p>
            </div>
          </div>

          {/* Detailed Tax Breakdown Table */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 space-y-2 text-xs">
            <div className="font-bold text-slate-700 dark:text-slate-300 pb-2 border-b border-slate-200 dark:border-slate-700">
              Tariff & Tax Decomposition (Le)
            </div>
            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span>Gross Energy Cost (Lifeline Tier)</span>
              <span className="font-mono text-slate-900 dark:text-white">Le 415.00</span>
            </div>
            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span>Goods & Services Tax (GST 15%)</span>
              <span className="font-mono text-slate-900 dark:text-white">Le 75.00</span>
            </div>
            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span>Service & Meter Maintenance Fee</span>
              <span className="font-mono text-slate-900 dark:text-white">Le 10.00</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-slate-900 dark:text-white pt-2 border-t border-slate-200 dark:border-slate-700">
              <span>Total Debited</span>
              <span className="font-mono text-emerald-600 dark:text-emerald-400">
                {formatCurrency(tx.amountLe || tx.amount || 500)}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 flex items-center justify-between">
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            Print Receipt
          </button>
          <button
            onClick={() => setSelectedTransaction(null)}
            className="px-5 py-2 bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};