import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Bell, Send } from 'lucide-react';
import { NotificationTarget } from '../../types';

export const NewNotificationModal: React.FC = () => {
  const { isNewNotificationModalOpen, setIsNewNotificationModalOpen, publishNotification, addToast } = useApp();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [targetDistrict, setTargetDistrict] = useState<NotificationTarget>('All Customers & Districts');
  const [channels, setChannels] = useState<string[]>(['SMS', 'Mobile App Push']);
  const [type, setType] = useState<any>('Maintenance');
  const [isSending, setIsSending] = useState(false);

  if (!isNewNotificationModalOpen) return null;

  const handleToggleChannel = (ch: string) => {
    if (channels.includes(ch)) {
      if (channels.length > 1) {
        setChannels(channels.filter((c) => c !== ch));
      }
    } else {
      setChannels([...channels, ch]);
    }
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      addToast('Please enter both title and message content', 'warning');
      return;
    }

    setIsSending(true);
    setTimeout(() => {
      publishNotification({
        title,
        content,
        message: content,
        type,
        targetDistrict,
        channels: channels as any[],
      });
      setIsSending(false);
      setIsNewNotificationModalOpen(false);
      addToast('Broadcast alert sent successfully to customers!', 'success');
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-surface w-full max-w-lg rounded-2xl shadow-2xl border border-border overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-slate-900 to-slate-800 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold">New Broadcast Announcement</h3>
              <p className="text-[11px] text-slate-300">Push notification & SMS alert to customers</p>
            </div>
          </div>
          <button
            onClick={() => setIsNewNotificationModalOpen(false)}
            className="text-fg-muted hover:text-white p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSend} className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-bold text-fg mb-1">Alert Category</label>
            <div className="grid grid-cols-3 gap-2">
              {['Maintenance', 'Emergency Outage', 'Tariff Notice', 'General Info'].map((cat) => (
                <button
                  type="button"
                  key={cat}
                  onClick={() => setType(cat)}
                  className={`py-1.5 px-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                    type === cat
                      ? 'bg-blue-50 border-blue-600 text-blue-700'
                      : 'border-border text-fg-muted hover:bg-surface-raised'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-fg mb-1">Title / Headline</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Scheduled Grid Maintenance - Kingtom & CBD"
              className="w-full px-3.5 py-2.5 bg-surface-raised border border-border-strong rounded-xl text-xs focus:bg-surface focus:outline-blue-600"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-fg mb-1">Target Audience Region</label>
            <select
              value={targetDistrict}
              onChange={(e) => setTargetDistrict(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-surface-raised border border-border-strong rounded-xl text-xs focus:bg-surface focus:outline-blue-600"
            >
              <option value="All Customers & Districts">All Customers & Districts (Nationwide)</option>
              <option value="Western Area Urban (Freetown)">Western Area Urban (Freetown Central & West)</option>
              <option value="Western Area Rural">Western Area Rural (Waterloo, Regent, Goderich)</option>
              <option value="Southern Region (Bo)">Southern Region (Bo District)</option>
              <option value="Eastern Region (Kenema)">Eastern Region (Kenema & Kono)</option>
              <option value="Northern Region (Makeni)">Northern Region (Makeni & Port Loko)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-fg mb-1">Message Body</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={3}
              placeholder="Provide exact outage hours, affected lines, safety precautions and restoration estimate..."
              className="w-full px-3.5 py-2.5 bg-surface-raised border border-border-strong rounded-xl text-xs focus:bg-surface focus:outline-blue-600"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-fg mb-1.5">Delivery Channels</label>
            <div className="flex flex-wrap gap-2">
              {['SMS', 'Mobile App Push', 'In-App Alert', 'Web Banner'].map((ch) => (
                <button
                  type="button"
                  key={ch}
                  onClick={() => handleToggleChannel(ch)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition-all cursor-pointer ${
                    channels.includes(ch)
                      ? 'bg-emerald-50 border-emerald-600 text-emerald-700 font-bold'
                      : 'border-border text-fg-muted hover:bg-surface-raised'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${channels.includes(ch) ? 'bg-emerald-600' : 'bg-slate-300'}`} />
                  {ch}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsNewNotificationModalOpen(false)}
              className="px-4 py-2 text-xs font-bold text-fg-muted hover:bg-surface-raised rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSending}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSending ? 'Transmitting...' : 'Send Broadcast Alert'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
