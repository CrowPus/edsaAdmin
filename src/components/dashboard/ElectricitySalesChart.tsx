import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const ElectricitySalesChart: React.FC = () => {
  const [selectedRange, setSelectedRange] = useState('Last 7 days');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const data = [
    { day: '8 Apr', kwh: 45000, displayKwh: '45,200 kWh' },
    { day: '9 Apr', kwh: 60000, displayKwh: '59,800 kWh' },
    { day: '10 Apr', kwh: 75000, displayKwh: '74,600 kWh' },
    { day: '11 Apr', kwh: 85000, displayKwh: '84,900 kWh' },
    { day: '12 Apr', kwh: 86000, displayKwh: '86,200 kWh' },
    { day: '13 Apr', kwh: 105000, displayKwh: '105,400 kWh' },
    { day: '14 Apr', kwh: 128000, displayKwh: '128,400 kWh', isCurrent: true },
  ];

  const maxKwh = 150000;

  return (
    <div className="bg-surface border border-border rounded-2xl p-5 shadow-sm flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-bold text-fg">
          Electricity Sales
        </h2>

        {/* Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-1.5 text-xs text-fg-muted hover:text-fg dark:hover:text-slate-200 font-medium py-1 px-2.5 rounded-lg border border-border-strong bg-surface-raised/50 dark:bg-slate-800 cursor-pointer"
          >
            <span>{selectedRange}</span>
            <ChevronDown className="w-3.5 h-3.5 text-fg-muted" />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-1 w-32 bg-surface border border-border-strong rounded-xl shadow-lg py-1 z-30 text-xs animate-in fade-in">
              {['Last 7 days', 'Last 14 days', 'Last 30 days'].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setSelectedRange(item);
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 hover:bg-surface-raised dark:hover:bg-slate-700 cursor-pointer ${
                    selectedRange === item
                      ? 'font-bold text-blue-600 dark:text-blue-400'
                      : 'text-fg'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bar Chart Area */}
      <div className="relative pt-4 pb-2 flex-1 flex flex-col justify-end min-h-[160px]">
        {/* Y Axis Guide Lines */}
        <div className="absolute inset-x-0 inset-y-0 flex flex-col justify-between pointer-events-none text-[10px] text-fg-muted dark:text-fg-muted pr-2">
          <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800/60 pb-0.5">
            <span className="w-7 text-right">150K</span>
            <div className="flex-1 border-b border-dashed border-border/60 dark:border-slate-800" />
          </div>
          <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800/60 pb-0.5">
            <span className="w-7 text-right">100K</span>
            <div className="flex-1 border-b border-dashed border-border/60 dark:border-slate-800" />
          </div>
          <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800/60 pb-0.5">
            <span className="w-7 text-right">50K</span>
            <div className="flex-1 border-b border-dashed border-border/60 dark:border-slate-800" />
          </div>
          <div className="flex items-center gap-2 pb-0.5">
            <span className="w-7 text-right">0</span>
            <div className="flex-1 border-b border-border" />
          </div>
        </div>

        {/* Bars Container */}
        <div className="relative z-10 pl-9 pr-2 flex items-end justify-between gap-2 h-36">
          {data.map((item, idx) => {
            const heightPercent = Math.min(100, Math.round((item.kwh / maxKwh) * 100));
            const isToday = item.isCurrent;

            return (
              <div
                key={item.day}
                className="flex-1 flex flex-col items-center h-full justify-end group relative"
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                {/* Tooltip on Hover */}
                {hoveredIdx === idx && (
                  <div className="absolute -top-9 z-30 bg-slate-900 text-white text-[11px] py-1 px-2 rounded-lg shadow-lg font-mono whitespace-nowrap animate-in fade-in zoom-in-95">
                    {item.displayKwh}
                  </div>
                )}

                {/* Bar */}
                <div
                  className={`w-full max-w-[36px] rounded-t-xs transition-all duration-300 ${
                    isToday
                      ? 'bg-[#0052cc] hover:bg-blue-700 shadow-sm'
                      : 'bg-[#93c5fd] dark:bg-blue-500/40 hover:bg-[#60a5fa] dark:hover:bg-blue-500/60'
                  }`}
                  style={{ height: `${heightPercent}%` }}
                />

                {/* X-axis Day Label */}
                <span className="text-[10px] font-medium text-fg-muted dark:text-fg-muted mt-2 whitespace-nowrap">
                  {item.day}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
