import React from 'react';
import { useApp } from '../../context/AppContext';

export const TransactionsTable: React.FC = () => {
  const { setSelectedTransaction, setActiveSection } = useApp();

  const transactions = [
    {
      id: 'tx-1',
      customer: 'Fatima Kamara',
      meterNumber: '12345678901',
      amount: 'Le 500',
      units: '42.7 kWh',
      method: 'Orange Money',
      status: 'Success',
      date: '14 Apr, 10:24',
    },
    {
      id: 'tx-2',
      customer: 'Samuel Conteh',
      meterNumber: '98765432109',
      amount: 'Le 1,000',
      units: '85.4 kWh',
      method: 'Afrimoney',
      status: 'Success',
      date: '14 Apr, 09:18',
    },
    {
      id: 'tx-3',
      customer: 'Mariama Sesay',
      meterNumber: '45678912345',
      amount: 'Le 250',
      units: '21.3 kWh',
      method: 'Card Payment',
      status: 'Success',
      date: '14 Apr, 08:45',
    },
    {
      id: 'tx-4',
      customer: 'Ibrahim Kargbo',
      meterNumber: '78912345678',
      amount: 'Le 500',
      units: '42.1 kWh',
      method: 'Orange Money',
      status: 'Success',
      date: '14 Apr, 07:32',
    },
    {
      id: 'tx-5',
      customer: 'Isata Bangura',
      meterNumber: '32165498701',
      amount: 'Le 1,000',
      units: '80.6 kWh',
      method: 'Afrimoney',
      status: 'Success',
      date: '14 Apr, 06:11',
    },
  ];

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
            <span className="text-fg font-medium">Orange Money</span>
          </div>
        );
      case 'Afrimoney':
        return (
          <div className="flex items-center gap-2">
            <img
              src="/afrimoney.png"
              alt="Afrimoney"
              className="w-5 h-5 rounded-md object-contain bg-white shadow-xs shrink-0"
            />
            <span className="text-fg font-medium">Afrimoney</span>
          </div>
        );
      case 'Card Payment':
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
            <span className="w-5 h-5 rounded-md bg-purple-600 text-white flex items-center justify-center text-[10px] font-bold shadow-xs shrink-0">
              OT
            </span>
            <span className="text-fg font-medium">{method}</span>
          </div>
        );
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-2xs">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-bold text-slate-900 dark:text-white">
          Recent Transactions
        </h2>
        <button
          onClick={() => setActiveSection('transactions')}
          className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
        >
          View All
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left">
          <thead>
            <tr className="text-slate-400 dark:text-slate-500 font-semibold border-b border-slate-100 dark:border-slate-800 text-[11px] uppercase tracking-wider">
              <th className="pb-3 font-semibold">Customer</th>
              <th className="pb-3 font-semibold">Meter Number</th>
              <th className="pb-3 font-semibold">Amount</th>
              <th className="pb-3 font-semibold">Units</th>
              <th className="pb-3 font-semibold">Payment Method</th>
              <th className="pb-3 font-semibold">Status</th>
              <th className="pb-3 font-semibold text-right">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40">
            {transactions.map((tx) => (
              <tr
                key={tx.id}
                onClick={() =>
                  setSelectedTransaction({
                    id: tx.id,
                    customerName: tx.customer,
                    meterNumber: tx.meterNumber,
                    amountLe: Number(tx.amount.replace(/[^0-9]/g, '')),
                    unitsKWh: Number(tx.units.replace(/[^0-9.]/g, '')),
                    paymentMethod: tx.method as any,
                    status: 'Success',
                    date: tx.date,
                    timestamp: tx.date,
                    referenceId: `TXN-${Math.floor(100000 + Math.random() * 900000)}`,
                    tariffCategory: 'Domestic Residential',
                  })
                }
                className="hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors cursor-pointer group"
              >
                {/* Customer */}
                <td className="py-3.5 pr-3">
                  <span className="font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {tx.customer}
                  </span>
                </td>

                {/* Meter Number */}
                <td className="py-3.5 pr-3 font-mono text-slate-500 dark:text-slate-400">
                  {tx.meterNumber}
                </td>

                {/* Amount */}
                <td className="py-3.5 pr-3 font-bold text-slate-900 dark:text-white">
                  {tx.amount}
                </td>

                {/* Units */}
                <td className="py-3.5 pr-3 text-slate-600 dark:text-slate-300 font-medium">
                  {tx.units}
                </td>

                {/* Payment Method */}
                <td className="py-3.5 pr-3">
                  {getMethodBadge(tx.method)}
                </td>

                {/* Status */}
                <td className="py-3.5 pr-3">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200/80 dark:border-emerald-800/60">
                    {tx.status}
                  </span>
                </td>

                {/* Date */}
                <td className="py-3.5 text-slate-500 dark:text-slate-400 text-right whitespace-nowrap">
                  {tx.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
