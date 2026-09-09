import React from 'react';
import { useApp } from '../../context/AppContext';

export const SystemStatusCard: React.FC = () => {
  const { setIsSystemStatusModalOpen } = useApp();

  const services = [
    { name: 'Vending Service', status: 'Online', color: 'bg-emerald-500', textColor: 'text-emerald-600 dark:text-emerald-400' },
    { name: 'Payment Gateway', status: 'Online', color: 'bg-emerald-500', textColor: 'text-emerald-600 dark:text-emerald-400' },
    { name: 'Customer Portal', status: 'Online', color: 'bg-emerald-500', textColor: 'text-emerald-600 dark:text-emerald-400' },
    { name: 'Mobile App', status: 'Online', color: 'bg-emerald-500', textColor: 'text-emerald-600 dark:text-emerald-400' },
    { name: 'Notification Service', status: 'Degraded', color: 'bg-amber-500', textColor: 'text-amber-600 dark:text-amber-400' },
    { name: 'Database', status: 'Online', color: 'bg-emerald-500', textColor: 'text-emerald-600 dark:text-emerald-400' },
  ];

  return (
    <div className="bg-surface border border-border rounded-2xl p-5 shadow-sm flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-bold text-fg">
          System Status
        </h2>
        <button
          onClick={() => setIsSystemStatusModalOpen(true)}
          className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
        >
          View All
        </button>
      </div>

      {/* Services List */}
      <div className="space-y-3.5 flex-1 justify-center flex flex-col">
        {services.map((svc) => (
          <div key={svc.name} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5">
              <span className={`w-2 h-2 rounded-full shrink-0 ${svc.color}`} />
              <span className="text-fg font-medium">
                {svc.name}
              </span>
            </div>
            <span className={`font-semibold ${svc.textColor}`}>
              {svc.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
