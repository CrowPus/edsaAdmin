import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Activity, RefreshCw, Server } from 'lucide-react';

export const SystemStatusModal: React.FC = () => {
  const { isSystemStatusModalOpen, setIsSystemStatusModalOpen, systemServices, addToast } = useApp();

  if (!isSystemStatusModalOpen) return null;

  const handleRefresh = () => {
    addToast('Pinged all EDSA microservices & payment gateways.', 'info');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-surface w-full max-w-2xl rounded-2xl shadow-2xl border border-border overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-surface-raised/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-fg">System Services & Gateway Status</h3>
              <p className="text-xs text-fg-muted">Live health telemetry of vending, billing & network infrastructure</p>
            </div>
          </div>
          <button
            onClick={() => setIsSystemStatusModalOpen(false)}
            className="p-1.5 text-fg-muted hover:text-fg rounded-xl hover:bg-surface-raised transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {systemServices.map((svc) => (
              <div
                key={svc.id}
                className="p-4 rounded-xl border border-border/80 bg-surface-raised/50 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Server className="w-4 h-4 text-fg-muted" />
                      <span className="font-bold text-xs text-fg">{svc.name}</span>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                        svc.status === 'Online'
                          ? 'bg-emerald-100 text-emerald-800'
                          : svc.status === 'Degraded'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {svc.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-fg-muted mt-2 leading-relaxed">
                    {svc.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 mt-3 border-t border-border/60 text-[10px] text-fg-muted">
                  <span>Latency: {svc.latencyMs}ms</span>
                  <span>Uptime: {svc.uptimePercent}%</span>
                  <span>Heartbeat: {svc.lastHeartbeat}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 bg-surface-raised border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-fg-muted">Overall Cluster Health: 99.8% Nominal</span>
          <button
            onClick={handleRefresh}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Check Heartbeats
          </button>
        </div>
      </div>
    </div>
  );
};
