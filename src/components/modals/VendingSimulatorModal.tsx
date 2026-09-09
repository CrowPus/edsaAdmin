import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Zap,
  CheckCircle2,
  Copy,
  Printer,
  RotateCcw,
} from 'lucide-react';

export const VendingSimulatorModal: React.FC = () => {
  const {
    isVendingSimulatorOpen,
    setIsVendingSimulatorOpen,
    vendingPreset,
    simulateVending,
    customers,
    addToast,
    formatCurrency,
    formatNumber,
  } = useApp();

  const [meterNumber, setMeterNumber] = useState(vendingPreset?.meterNumber || '12345678901');
  const [customerName, setCustomerName] = useState(vendingPreset?.customerName || 'Fatima Kamara');
  const [amountLe, setAmountLe] = useState<number>(vendingPreset?.amountLe || 500);
  const [paymentChannel, setPaymentChannel] = useState<'Orange Money' | 'Afrimoney' | 'Card Payment' | 'Commercial Bank Cards' | string>('Orange Money');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedResult, setGeneratedResult] = useState<{
    token: string;
    unitsKWh: number;
    receiptNumber: string;
    amountLe: number;
    meterNumber: string;
    customerName: string;
    timestamp: string;
  } | null>(null);

  useEffect(() => {
    if (vendingPreset) {
      if (vendingPreset.meterNumber) setMeterNumber(vendingPreset.meterNumber);
      if (vendingPreset.customerName) setCustomerName(vendingPreset.customerName);
      if (vendingPreset.amountLe) setAmountLe(vendingPreset.amountLe);
    }
  }, [vendingPreset]);

  if (!isVendingSimulatorOpen) return null;

  // Rate estimation
  const ratePerKwh = 11.7; // Base Le per kWh
  const estimatedKwh = Number((amountLe / ratePerKwh).toFixed(1));

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!meterNumber.trim() || amountLe <= 0) {
      addToast('Please enter a valid meter number and positive amount', 'warning');
      return;
    }

    setIsGenerating(true);
    setTimeout(() => {
      const res = simulateVending({
        meterNumber,
        customerName: customerName || 'EDSA Customer',
        amountLe,
        channel: paymentChannel,
      });

      setGeneratedResult({
        token: res?.token || '5829-1049-5820-1948-2841',
        unitsKWh: res?.unitsKWh || estimatedKwh,
        receiptNumber: res?.referenceId || `REC-EDSA-${Date.now().toString().slice(-6)}`,
        amountLe,
        meterNumber,
        customerName: customerName || 'EDSA Customer',
        timestamp: new Date().toLocaleTimeString(),
      });
      setIsGenerating(false);
      addToast('STS 20-digit token generated successfully!', 'success');
    }, 600);
  };

  const copyToken = () => {
    if (generatedResult) {
      navigator.clipboard.writeText(generatedResult.token);
      addToast('STS Token copied to clipboard!', 'success');
    }
  };

  const handleReset = () => {
    setGeneratedResult(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-surface w-full max-w-xl rounded-2xl shadow-2xl border border-border overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-amber-500 via-amber-600 to-orange-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-surface/20 flex items-center justify-center text-white">
              <Zap className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h3 className="text-sm font-bold">Standard STS Vending Simulator</h3>
              <p className="text-[11px] text-amber-100">Live 20-digit token generation engine test</p>
            </div>
          </div>
          <button
            onClick={() => setIsVendingSimulatorOpen(false)}
            className="text-amber-100 hover:text-white p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {!generatedResult ? (
            <form onSubmit={handleGenerate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-fg mb-1.5">Select Sample Customer or Enter Custom Meter</label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {customers.slice(0, 4).map((c) => (
                    <button
                      type="button"
                      key={c.id}
                      onClick={() => {
                        setMeterNumber(c.meterNumber || (c.meters && c.meters[0]?.meterNumber) || '12345678901');
                        setCustomerName(c.name);
                      }}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                        meterNumber === c.meterNumber || (c.meters && meterNumber === c.meters[0]?.meterNumber)
                          ? 'bg-amber-50 border-amber-600 text-amber-900 font-bold'
                          : 'border-border text-fg-muted hover:bg-surface-raised'
                      }`}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-fg mb-1">Meter Number (11 Digits)</label>
                  <input
                    type="text"
                    value={meterNumber}
                    onChange={(e) => setMeterNumber(e.target.value)}
                    placeholder="e.g. 12345678901"
                    className="w-full px-3 py-2 bg-surface-raised border border-border-strong rounded-xl text-xs font-mono font-bold focus:bg-surface focus:outline-amber-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-fg mb-1">Customer Name</label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Customer Name"
                    className="w-full px-3 py-2 bg-surface-raised border border-border-strong rounded-xl text-xs focus:bg-surface focus:outline-amber-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-fg mb-1">Amount (Le)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-fg-muted">Le</span>
                    <input
                      type="number"
                      value={amountLe}
                      onChange={(e) => setAmountLe(Number(e.target.value))}
                      className="w-full pl-8 pr-3 py-2 bg-surface-raised border border-border-strong rounded-xl text-xs font-bold text-fg focus:bg-surface focus:outline-amber-600"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-fg mb-1">Est. Delivered Energy</label>
                  <div className="px-3 py-2 bg-surface-raised rounded-xl text-xs font-bold text-fg flex items-center justify-between">
                    <span>{estimatedKwh} kWh</span>
                    <span className="text-[10px] text-fg-muted font-normal">@ Le 11.7/kWh</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-fg mb-1.5">Payment Method Channel</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'Orange Money', label: 'Orange Money' },
                    { id: 'Afrimoney', label: 'Afrimoney' },
                    { id: 'Commercial Bank Cards', label: 'Bank / Card' },
                  ].map((m) => (
                    <button
                      type="button"
                      key={m.id}
                      onClick={() => setPaymentChannel(m.id)}
                      className={`py-2 px-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        paymentChannel === m.id
                          ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                          : 'border-border text-fg-muted hover:bg-surface-raised'
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsVendingSimulatorOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-fg-muted hover:bg-surface-raised rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isGenerating}
                  className="px-6 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold rounded-xl text-xs flex items-center gap-2 shadow-sm transition-all cursor-pointer disabled:opacity-50"
                >
                  <Zap className="w-4 h-4 fill-current" />
                  <span>{isGenerating ? 'Encrypting STS Token...' : 'Generate 20-Digit Token'}</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4 animate-in fade-in zoom-in-95">
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-emerald-900">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                <div>
                  <div className="font-bold text-sm">STS Token Successfully Generated!</div>
                  <div className="text-xs text-emerald-700">Processed by EDSA Primary Key Management Server</div>
                </div>
              </div>

              {/* Token Display Box */}
              <div className="p-5 bg-slate-950 rounded-2xl text-center space-y-2 border border-slate-800 shadow-lg">
                <span className="text-[11px] font-bold uppercase tracking-widest text-amber-400">
                  STS Pre-Paid 20-Digit Token
                </span>
                <div className="text-2xl sm:text-3xl font-mono font-black text-white tracking-widest selection:bg-amber-500 selection:text-black">
                  {generatedResult.token}
                </div>
                <div className="text-xs text-fg-muted">
                  Enter on meter keypad and press <span className="text-amber-400 font-bold">#</span> or <span className="text-amber-400 font-bold">Enter</span>
                </div>
              </div>

              {/* Receipt Summary Details */}
              <div className="p-4 bg-surface-raised rounded-2xl border border-border text-xs space-y-2">
                <div className="flex justify-between py-1 border-b border-border">
                  <span className="text-fg-muted font-medium">Customer</span>
                  <span className="font-bold text-fg">{generatedResult.customerName}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-border">
                  <span className="text-fg-muted font-medium">Meter Number</span>
                  <span className="font-mono font-bold text-fg">{generatedResult.meterNumber}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-border">
                  <span className="text-fg-muted font-medium">Units Generated</span>
                  <span className="font-bold text-emerald-600">{formatNumber(generatedResult.unitsKWh)} kWh</span>
                </div>
                <div className="flex justify-between py-1 border-b border-border">
                  <span className="text-fg-muted font-medium">Amount Paid</span>
                  <span className="font-bold text-fg">{formatCurrency(generatedResult.amountLe)}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-fg-muted font-medium">Reference Code</span>
                  <span className="font-mono text-fg-muted">{generatedResult.receiptNumber}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-4 py-2 text-xs font-bold text-fg-muted hover:bg-surface-raised rounded-xl flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Vend Another
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      window.print();
                    }}
                    className="px-4 py-2 border border-border hover:bg-surface-raised rounded-xl text-xs font-bold text-fg flex items-center gap-1.5 cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    Print Receipt
                  </button>
                  <button
                    type="button"
                    onClick={copyToken}
                    className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    Copy Token
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
