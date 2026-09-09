import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Save, Zap, DollarSign, Shield, Bell, CheckCircle2 } from 'lucide-react';
import { TariffRate } from '../../types';

export const SystemSettingsView: React.FC = () => {
  const { tariffs, updateTariffRate, addToast } = useApp();
  const [editingTariffs, setEditingTariffs] = useState<TariffRate[]>(tariffs);
  const [gstRate, setGstRate] = useState(15.0);
  const [vendingThresholdMin, setVendingThresholdMin] = useState(10);
  const [vendingThresholdMax, setVendingThresholdMax] = useState(100000);

  const handleRateChange = (id: string, newRate: number) => {
    setEditingTariffs((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ratePerKWhLe: newRate } : t))
    );
  };

  const handleSaveTariffs = () => {
    editingTariffs.forEach((t) => {
      updateTariffRate(t.id, t.ratePerKWhLe);
    });
    addToast('Electricity tariff schedule saved successfully.', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Tariffs Section */}
      <div className="bg-surface p-6 rounded-2xl border border-border shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-base font-bold text-fg">Electricity Tariff Configuration</h3>
            <p className="text-xs text-fg-muted mt-0.5">
              Approved tariff schedule per kWh (Electricity and Water Regulatory Commission - EWRC)
            </p>
          </div>
          <button
            type="button"
            onClick={handleSaveTariffs}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer transition-all self-start sm:self-auto"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Tariff Changes</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {editingTariffs.map((t) => (
            <div
              key={t.id}
              className="p-4 rounded-xl border border-border-strong bg-surface-raised/50 dark:bg-slate-800/40 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-fg">{t.category}</span>
                <span className="text-[11px] font-mono text-fg-muted font-semibold">{t.rangeKWh || 'All kWh'}</span>
              </div>
              <p className="text-[11px] text-fg-muted">{t.description}</p>
              
              <div className="pt-2 border-t border-border/80 dark:border-slate-700 flex items-center justify-between">
                <span className="text-xs font-semibold text-fg-muted">Rate per kWh:</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-fg">Le</span>
                  <input
                    type="number"
                    step="0.1"
                    value={t.ratePerKWhLe}
                    onChange={(e) => handleRateChange(t.id, parseFloat(e.target.value) || 0)}
                    className="w-24 px-2 py-1 bg-surface border border-border-strong rounded-lg text-xs font-bold text-fg text-right focus:outline-blue-600"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* General Settings */}
      <div className="bg-surface p-6 rounded-2xl border border-border shadow-sm space-y-4">
        <h4 className="text-sm font-bold text-fg pb-3 border-b border-slate-100 dark:border-slate-800">
          Statutory Taxes & Vending Boundaries
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-fg mb-1.5">Goods & Services Tax (GST %)</label>
            <input
              type="number"
              value={gstRate}
              onChange={(e) => setGstRate(parseFloat(e.target.value) || 15)}
              className="w-full px-3 py-2 bg-surface-raised border border-border-strong rounded-xl text-xs text-fg font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-fg mb-1.5">Min Vending Amount (Le)</label>
            <input
              type="number"
              value={vendingThresholdMin}
              onChange={(e) => setVendingThresholdMin(parseFloat(e.target.value) || 10)}
              className="w-full px-3 py-2 bg-surface-raised border border-border-strong rounded-xl text-xs text-fg font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-fg mb-1.5">Max Single Vending (Le)</label>
            <input
              type="number"
              value={vendingThresholdMax}
              onChange={(e) => setVendingThresholdMax(parseFloat(e.target.value) || 100000)}
              className="w-full px-3 py-2 bg-surface-raised border border-border-strong rounded-xl text-xs text-fg font-mono"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
