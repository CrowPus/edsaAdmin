import React, { useMemo } from 'react';

export const PaymentMethodsChart: React.FC = () => {
  const methods = [
    { name: 'Orange Money', percentage: 48, color: '#f97316' },
    { name: 'Afrimoney', percentage: 28, color: '#e11d48' },
    { name: 'Card Payment', percentage: 18, color: '#2563eb' },
    { name: 'Others', percentage: 6, color: '#9333ea' },
  ];

  // SVG Donut dimensions
  const size = 150;
  const strokeWidth = 24;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Compute exact strokeDasharray and strokeDashoffset deterministically
  const segments = useMemo(() => {
    let accumulated = 0;
    return methods.map((item) => {
      const strokeDasharray = `${(item.percentage / 100) * circumference} ${circumference}`;
      const strokeDashoffset = -((accumulated / 100) * circumference);
      accumulated += item.percentage;
      return {
        ...item,
        strokeDasharray,
        strokeDashoffset,
      };
    });
  }, [circumference]);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-2xs flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-base font-bold text-slate-900 dark:text-white">
          Payment Methods
        </h2>
      </div>

      {/* Chart & Legend Grid */}
      <div className="flex items-center justify-between gap-4 py-2 flex-1">
        {/* Donut Chart */}
        <div className="relative flex items-center justify-center shrink-0">
          <svg width={size} height={size} className="rotate-[-90deg]">
            {segments.map((item) => (
              <circle
                key={item.name}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="transparent"
                stroke={item.color}
                strokeWidth={strokeWidth}
                strokeDasharray={item.strokeDasharray}
                strokeDashoffset={item.strokeDashoffset}
                className="transition-all duration-500"
              />
            ))}
          </svg>

          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
            <span className="text-sm font-extrabold text-fg tracking-tight font-sans">
              5,427,800
            </span>
            <span className="text-[11px] font-medium text-fg-muted dark:text-fg-muted">
              Le
            </span>
          </div>
        </div>

        {/* Legend List */}
        <div className="flex-1 space-y-2.5 pl-2">
          {methods.map((item) => (
            <div key={item.name} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-fg-muted font-medium">
                  {item.name}
                </span>
              </div>
              <span className="font-semibold text-fg font-mono">
                {item.percentage}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
