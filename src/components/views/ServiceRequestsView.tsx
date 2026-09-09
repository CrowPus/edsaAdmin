import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ClipboardList,
  Search,
  Send,
} from 'lucide-react';
import { ServiceRequest } from '../../types';

export const ServiceRequestsView: React.FC = () => {
  const { serviceRequests, updateServiceRequestStatus, addServiceRequestNote, addToast } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedTicket, setSelectedTicket] = useState<ServiceRequest | null>(serviceRequests[0] || null);
  const [newNote, setNewNote] = useState('');

  const filtered = serviceRequests.filter((t) => {
    const matchesSearch =
      (t.ticketNumber && t.ticketNumber.toLowerCase().includes(searchTerm.toLowerCase())) ||
      t.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (t.meterNumber && t.meterNumber.includes(searchTerm)) ||
      (t.issue && t.issue.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = statusFilter === 'ALL' || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTicket || !newNote.trim()) return;
    addServiceRequestNote(selectedTicket.id, newNote.trim());
    setNewNote('');
    addToast('Internal staff note added to ticket.', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface p-4 rounded-2xl border border-border shadow-sm">
          <div className="text-xs text-fg-muted font-medium">Open Support Tickets</div>
          <div className="text-2xl font-bold text-fg mt-1">14 Unresolved</div>
        </div>
        <div className="bg-surface p-4 rounded-2xl border border-border shadow-sm">
          <div className="text-xs text-fg-muted font-medium">Avg First Response</div>
          <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">18 mins</div>
        </div>
        <div className="bg-surface p-4 rounded-2xl border border-border shadow-sm">
          <div className="text-xs text-fg-muted font-medium">Missing Token Claims</div>
          <div className="text-2xl font-bold text-fg mt-1">6 Today</div>
        </div>
        <div className="bg-surface p-4 rounded-2xl border border-border shadow-sm">
          <div className="text-xs text-fg-muted font-medium">Customer CSAT</div>
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">94.2%</div>
        </div>
      </div>

      {/* Main 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: List */}
        <div className="lg:col-span-5 bg-surface rounded-2xl border border-border shadow-sm overflow-hidden flex flex-col h-[650px]">
          <div className="p-4 border-b border-slate-100 dark:border-slate-800 space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 text-fg-muted absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search tickets, customers or meters..."
                className="w-full pl-9 pr-3 py-2 bg-surface-raised border border-border-strong rounded-xl text-xs text-fg focus:outline-blue-600"
              />
            </div>

            <div className="flex gap-1.5 overflow-x-auto pb-1">
              {['ALL', 'New', 'Assigned', 'In Progress', 'Resolved'].map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                    statusFilter === st
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-surface-raised text-fg-muted hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
            {filtered.map((ticket) => {
              const isSelected = selectedTicket?.id === ticket.id;

              return (
                <div
                  key={ticket.id}
                  onClick={() => setSelectedTicket(ticket)}
                  className={`p-4 transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-blue-50/70 dark:bg-blue-950/40 border-l-4 border-blue-600'
                      : 'hover:bg-surface-raised dark:hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400">
                      {ticket.ticketNumber || ticket.id}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        ticket.status === 'Resolved'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : ticket.status === 'In Progress'
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                          : 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300'
                      }`}
                    >
                      {ticket.status}
                    </span>
                  </div>

                  <h4 className="font-bold text-fg text-xs mt-1">
                    {ticket.customerName}
                  </h4>
                  <p className="text-xs text-fg-muted mt-0.5 line-clamp-1">
                    {ticket.issue || ticket.description || 'Meter token generation inquiry'}
                  </p>

                  <div className="flex items-center justify-between text-[11px] text-fg-muted mt-2">
                    <span className="font-mono">Meter #{ticket.meterNumber}</span>
                    <span>{ticket.createdAt || 'Today'}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Selected Ticket Details */}
        <div className="lg:col-span-7 bg-surface rounded-2xl border border-border shadow-sm overflow-hidden flex flex-col h-[650px]">
          {selectedTicket ? (
            <div className="flex-1 flex flex-col overflow-hidden">
              <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-surface-raised/50 dark:bg-slate-800/50">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-extrabold text-blue-600 dark:text-blue-400">
                      {selectedTicket.ticketNumber || selectedTicket.id}
                    </span>
                    <span className="text-xs text-fg-muted">• {selectedTicket.district || 'Western Area Urban'}</span>
                  </div>
                  <h3 className="text-base font-bold text-fg mt-1">
                    {selectedTicket.customerName}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={selectedTicket.status}
                    onChange={(e) => updateServiceRequestStatus(selectedTicket.id, e.target.value as any)}
                    className="px-3 py-1.5 bg-surface border border-border-strong rounded-xl text-xs font-bold text-fg shadow-sm"
                  >
                    <option value="New">New</option>
                    <option value="Assigned">Assigned</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto p-5 space-y-5">
                <div className="bg-surface-raised/70 p-4 rounded-xl space-y-2 border border-slate-100 dark:border-slate-800">
                  <span className="text-xs font-bold text-fg-muted uppercase tracking-wider">Reported Issue</span>
                  <p className="text-xs text-fg leading-relaxed">
                    {selectedTicket.description || 'Customer states payment went through Orange Money but SMS receipt with 20-digit STS token was delayed due to telco latency.'}
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 bg-surface-raised rounded-xl border border-slate-100 dark:border-slate-800">
                    <span className="text-fg-muted block text-[11px]">Meter Number</span>
                    <span className="font-mono font-bold text-fg mt-0.5 block">{selectedTicket.meterNumber}</span>
                  </div>
                  <div className="p-3 bg-surface-raised rounded-xl border border-slate-100 dark:border-slate-800">
                    <span className="text-fg-muted block text-[11px]">Phone Contact</span>
                    <span className="font-mono font-bold text-fg mt-0.5 block">{selectedTicket.customerPhone || selectedTicket.phone || '+232 76 892014'}</span>
                  </div>
                  <div className="p-3 bg-surface-raised rounded-xl border border-slate-100 dark:border-slate-800">
                    <span className="text-fg-muted block text-[11px]">Category</span>
                    <span className="font-bold text-fg mt-0.5 block">{selectedTicket.category || 'Missing Token'}</span>
                  </div>
                </div>

                {/* Internal Notes Thread */}
                <div className="space-y-3 pt-2">
                  <span className="text-xs font-bold text-fg block">Internal Staff Activity & Notes</span>
                  <div className="space-y-2">
                    {(selectedTicket.internalNotes || [
                      { author: 'Customer Care Rep (Fatmata)', note: 'Checked vending server log: Token was encrypted successfully under tx #tx-1001.', timestamp: '1 hour ago' },
                      { author: 'Operations Lead (Ibrahim)', note: 'Re-sent SMS token directly to customer line. Resolved.', timestamp: '35 mins ago' }
                    ]).map((n: any, idx: number) => (
                      <div key={idx} className="p-3 bg-blue-50/40 dark:bg-slate-800/90 rounded-xl border border-blue-100/50 dark:border-slate-700 text-xs">
                        <div className="flex items-center justify-between font-bold text-fg text-[11px]">
                          <span>{n.author || 'EDSA Staff'}</span>
                          <span className="text-fg-muted font-normal">{n.timestamp || 'Today'}</span>
                        </div>
                        <p className="text-fg-muted mt-1">{n.note || n}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Note Input */}
              <form onSubmit={handleAddNote} className="p-3 border-t border-slate-100 dark:border-slate-800 flex gap-2 bg-surface-raised/50 dark:bg-slate-800/50">
                <input
                  type="text"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Add internal note or technician update..."
                  className="flex-1 px-3 py-2 bg-surface border border-border-strong rounded-xl text-xs text-fg focus:outline-blue-600"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send</span>
                </button>
              </form>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center p-8 text-center text-fg-muted text-xs">
              Select a service request from the list to view its complete audit history and update its workflow status.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
