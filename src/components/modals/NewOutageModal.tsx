import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Send } from 'lucide-react';
import { OutageSeverity } from '../../types';

export const NewOutageModal: React.FC = () => {
  const { isNewOutageModalOpen, setIsNewOutageModalOpen, logNewOutage, addToast } = useApp();

  const [substation, setSubstation] = useState('');
  const [district, setDistrict] = useState('Western Area Urban');
  const [feederLine, setFeederLine] = useState('');
  const [severity, setSeverity] = useState<OutageSeverity>('High');
  const [cause, setCause] = useState('');
  const [affectedCustomers, setAffectedCustomers] = useState(1500);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isNewOutageModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!substation.trim() || !feederLine.trim()) {
      addToast('Please enter both substation name and feeder line', 'warning');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      logNewOutage({
        title: `${substation} - ${feederLine}`,
        substation,
        district,
        feederLine,
        severity,
        status: 'New',
        affectedCustomers: Number(affectedCustomers),
        cause: cause || 'Under Technical Investigation',
      });
      setIsSubmitting(false);
      setIsNewOutageModalOpen(false);
      addToast('Grid incident logged and dispatched to field teams!', 'success');
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-surface w-full max-w-lg rounded-2xl shadow-2xl border border-border overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-red-700 to-red-600 text-white flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold">Log Grid Incident / Power Outage</h3>
            <p className="text-[11px] text-red-100">Record feeder trip, scheduled shutdown or fault</p>
          </div>
          <button
            onClick={() => setIsNewOutageModalOpen(false)}
            className="text-red-200 hover:text-white p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-fg mb-1.5">Substation</label>
              <input
                type="text"
                value={substation}
                onChange={(e) => setSubstation(e.target.value)}
                placeholder="e.g. Kingtom Primary"
                className="w-full px-3 py-2 bg-surface-raised border border-border-strong rounded-xl text-xs focus:bg-surface focus:outline-red-600"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-fg mb-1.5">Feeder Line</label>
              <input
                type="text"
                value={feederLine}
                onChange={(e) => setFeederLine(e.target.value)}
                placeholder="e.g. Feeder 04 Pademba"
                className="w-full px-3 py-2 bg-surface-raised border border-border-strong rounded-xl text-xs focus:bg-surface focus:outline-red-600"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-fg mb-1.5">District / Region</label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full px-3 py-2 bg-surface-raised border border-border-strong rounded-xl text-xs"
              >
                <option value="Western Area Urban">Western Area Urban (Freetown)</option>
                <option value="Western Area Rural">Western Area Rural</option>
                <option value="Southern (Bo)">Southern (Bo District)</option>
                <option value="Eastern (Kenema & Kono)">Eastern (Kenema & Kono)</option>
                <option value="Northern (Makeni & Port Loko)">Northern (Makeni & Port Loko)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-fg mb-1.5">Severity Level</label>
              <select
                value={severity}
                onChange={(e) => setSeverity(e.target.value as OutageSeverity)}
                className="w-full px-3 py-2 bg-surface-raised border border-border-strong rounded-xl text-xs font-bold text-red-700"
              >
                <option value="Critical">Critical (Transmission Grid)</option>
                <option value="High">High (Major Substation)</option>
                <option value="Medium">Medium (Feeder Line / Area)</option>
                <option value="Low">Low (Localized Transformer)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-fg mb-1.5">Estimated Affected Customers</label>
            <input
              type="number"
              value={affectedCustomers}
              onChange={(e) => setAffectedCustomers(Number(e.target.value))}
              className="w-full px-3 py-2 bg-surface-raised border border-border-strong rounded-xl text-xs font-mono font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-fg mb-1.5">Cause / Technical Diagnosis</label>
            <textarea
              value={cause}
              onChange={(e) => setCause(e.target.value)}
              rows={2}
              placeholder="e.g. 33kV Vacuum Circuit Breaker tripped on overcurrent after storm..."
              className="w-full px-3 py-2 bg-surface-raised border border-border-strong rounded-xl text-xs focus:bg-surface focus:outline-red-600"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsNewOutageModalOpen(false)}
              className="px-4 py-2 text-xs font-bold text-fg-muted hover:bg-surface-raised rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSubmitting ? 'Logging...' : 'Dispatch Incident Log'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
