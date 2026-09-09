import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Bell,
  Plus,
  Send,
  Smartphone,
  Globe,
  Radio,
  CheckCircle2,
  Calendar,
} from 'lucide-react';
import { NotificationAnnouncement } from '../../types';

export const NotificationsView: React.FC = () => {
  const { notifications, setIsNewNotificationModalOpen, addToast } = useApp();
  const [filterType, setFilterType] = useState('ALL');

  const filtered = notifications.filter((n) => {
    if (filterType === 'ALL') return true;
    return n.type === filterType;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-surface p-5 rounded-2xl border border-border shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-fg">Broadcast Alerts & Customer Notices</h3>
          <p className="text-xs text-fg-muted mt-0.5">
            Dispatched SMS, Mobile App push notifications, and web announcements to EDSA consumers
          </p>
        </div>

        <button
          onClick={() => setIsNewNotificationModalOpen(true)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Broadcast Alert</span>
        </button>
      </div>

      {/* Broadcast Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-surface p-5 rounded-2xl border border-border shadow-sm space-y-3 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3">
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    item.type === 'Emergency Outage'
                      ? 'bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-300'
                      : item.type === 'Maintenance'
                      ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300'
                      : 'bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300'
                  }`}
                >
                  {item.type || 'General Notice'}
                </span>
                <span className="text-[11px] text-fg-muted font-medium">{item.sentAt || 'Today'}</span>
              </div>

              <h4 className="text-sm font-bold text-fg mt-2.5">
                {item.title}
              </h4>
              <p className="text-xs text-fg-muted leading-relaxed mt-1.5 bg-surface-raised/60 p-3 rounded-xl">
                {item.content || item.message}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-fg-muted">
              <span>Target: <strong className="text-fg">{item.targetDistrict || 'All Districts'}</strong></span>
              <span className="flex items-center gap-1">
                <Send className="w-3 h-3" />
                {(item.channels || ['SMS', 'Push']).join(', ')}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
