import React from 'react';
import { useApp } from '../../context/AppContext';
import { AlertTriangle } from 'lucide-react';

export const RecentOutagesCard: React.FC = () => {
  const { setSelectedOutage, setActiveSection } = useApp();

  const outages = [
    {
      id: 'out-1',
      title: 'Freetown Central',
      issue: 'Power outage',
      time: '2 hours ago',
      status: 'Open',
      statusColor: 'bg-red-50 text-red-600 border border-red-200/80 dark:bg-red-950/40 dark:text-red-400 dark:border-red-900/40',
    },
    {
      id: 'out-2',
      title: 'Congo Town',
      issue: 'Low voltage',
      time: '4 hours ago',
      status: 'Open',
      statusColor: 'bg-red-50 text-red-600 border border-red-200/80 dark:bg-red-950/40 dark:text-red-400 dark:border-red-900/40',
    },
    {
      id: 'out-3',
      title: 'Wellington',
      issue: 'Power outage',
      time: '6 hours ago',
      status: 'In Progress',
      statusColor: 'bg-amber-50 text-amber-600 border border-amber-200/80 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-900/40',
    },
    {
      id: 'out-4',
      title: 'Leicester Peak',
      issue: 'Transformer issue',
      time: '8 hours ago',
      status: 'Open',
      statusColor: 'bg-red-50 text-red-600 border border-red-200/80 dark:bg-red-950/40 dark:text-red-400 dark:border-red-900/40',
    },
    {
      id: 'out-5',
      title: 'Aberdeen',
      issue: 'Power outage',
      time: '12 hours ago',
      status: 'Resolved',
      statusColor: 'bg-emerald-50 text-emerald-600 border border-emerald-200/80 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-900/40',
    },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-2xs">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-bold text-slate-900 dark:text-white">
          Recent Outage Reports
        </h2>
        <button
          onClick={() => setActiveSection('outages')}
          className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
        >
          View All
        </button>
      </div>

      {/* List */}
      <div className="divide-y divide-slate-100 dark:divide-slate-800">
        {outages.map((item) => (
          <div
            key={item.id}
            onClick={() =>
              setSelectedOutage({
                id: item.id,
                title: item.title,
                substation: `${item.title} Substation`,
                severity: 'High',
                status: item.status as any,
                timeAgo: item.time,
                reportedAt: item.time,
                affectedCustomers: 1200,
              })
            }
            className="py-3 first:pt-0 last:pb-0 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors rounded-lg px-1 cursor-pointer"
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5 text-red-500 shrink-0">
                <AlertTriangle className="w-4 h-4 fill-red-500/10" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900 dark:text-white">
                  {item.title}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  {item.issue}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[11px] text-slate-400 dark:text-slate-500 whitespace-nowrap">
                {item.time}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-[11px] font-semibold ${item.statusColor}`}
              >
                {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
