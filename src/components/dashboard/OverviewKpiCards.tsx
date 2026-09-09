import React from 'react';
import { Users, Gauge, Zap, CreditCard } from 'lucide-react';

export const OverviewKpiCards: React.FC = () => {
  const metrics = [
    {
      id: 'customers',
      title: 'Total Customers',
      value: '125,430',
      change: '12%',
      icon: Users,
      iconBg: 'bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400',
    },
    {
      id: 'meters',
      title: 'Active Meters',
      value: '118,924',
      change: '8%',
      icon: Gauge,
      iconBg: 'bg-teal-50 text-teal-600 dark:bg-teal-950/50 dark:text-teal-400',
    },
    {
      id: 'energy',
      title: 'Energy Sold',
      value: '542,780 kWh',
      change: '15%',
      icon: Zap,
      iconBg: 'bg-amber-50 text-amber-500 dark:bg-amber-950/50 dark:text-amber-400',
    },
    {
      id: 'revenue',
      title: 'Revenue (Le)',
      value: '5,427,800',
      change: '18%',
      icon: CreditCard,
      iconBg: 'bg-purple-50 text-purple-600 dark:bg-purple-950/50 dark:text-purple-400',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
      {metrics.map((card) => {
        const IconComponent = card.icon;
        return (
          <div
            key={card.id}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-5 shadow-2xs hover:shadow-xs transition-all flex items-center gap-4"
          >
            {/* Left Tinted Icon Container */}
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${card.iconBg}`}
            >
              <IconComponent className="w-5 h-5 stroke-[2.2]" />
            </div>

            {/* Right Metric Details */}
            <div className="flex-1 min-w-0">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 block truncate">
                {card.title}
              </span>
              <div className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight mt-0.5">
                {card.value}
              </div>
              <div className="flex items-center gap-1.5 mt-1 text-xs">
                <span className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center">
                  ↑{card.change}
                </span>
                <span className="text-slate-400 dark:text-slate-500 text-[11px]">
                  vs last month
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
