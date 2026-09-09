import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, AlertTriangle, Wrench, MessageSquare, Send } from 'lucide-react';
import { OutageStatus } from '../../types';

export const OutageManagementModal: React.FC = () => {
  const { selectedOutage, setSelectedOutage, updateOutageStatus, assignOutageCrew, addOutageNote, addToast } = useApp();
  const [newNote, setNewNote] = useState('');
  const [selectedCrew, setSelectedCrew] = useState('');

  if (!selectedOutage) return null;

  const outage = selectedOutage;

  const handleStatusChange = (status: OutageStatus) => {
    updateOutageStatus(outage.id, status);
    addToast(`Outage status updated to ${status}.`, 'info');
  };

  const handleCrewAssign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCrew.trim()) return;
    assignOutageCrew(outage.id, selectedCrew.trim());
    addToast(`Field technician ${selectedCrew} assigned to dispatch.`, 'success');
    setSelectedCrew('');
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    addOutageNote(outage.id, newNote.trim());
    addToast('Incident log note recorded.', 'info');
    setNewNote('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75">
      <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh] text-slate-900 dark:text-white">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/80">
          <div className="flex items-center gap-3">
            <div
              className={`p-2.5 rounded-xl ${
                outage.severity === 'critical' || outage.severity === 'high' || outage.severity === 'High'
                  ? 'bg-red-50 text-red-600 dark:bg-red-950/60 dark:text-red-400'
                  : 'bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400'
              }`}
            >
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">{outage.title || outage.substation}</h3>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-md bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200">
                  {outage.substation}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Feeder: {outage.feederLine || 'Primary'} • {outage.district || 'Western Area'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setSelectedOutage(null)}
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Status Progression Workflow */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">Operational State</label>
            <div className="grid grid-cols-4 gap-2">
              {(['Open', 'Assigned', 'In Progress', 'Resolved'] as OutageStatus[]).map((st) => (
                <button
                  key={st}
                  onClick={() => handleStatusChange(st)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    outage.status === st
                      ? 'bg-blue-600 text-white shadow-xs scale-[1.02]'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/70 rounded-xl border border-slate-200 dark:border-slate-700">
              <div className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase">Estimated Impact</div>
              <div className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                {(outage.affectedCustomers || 0).toLocaleString()} Customers
              </div>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/70 rounded-xl border border-slate-200 dark:border-slate-700">
              <div className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase">Reported Time</div>
              <div className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                {outage.timeAgo || outage.reportedAt || 'Just now'}
              </div>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/70 rounded-xl border border-slate-200 dark:border-slate-700">
              <div className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase">Severity</div>
              <div className="text-sm font-bold text-red-600 dark:text-red-400 mt-1 uppercase">
                {outage.severity || 'High'}
              </div>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/70 rounded-xl border border-slate-200 dark:border-slate-700">
              <div className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase">Assigned Crew</div>
              <div className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                {outage.assignedCrew || outage.crewAssigned || 'Pending'}
              </div>
            </div>
          </div>

          {/* Dispatch Field Maintenance Crew Form */}
          <form onSubmit={handleCrewAssign} className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
            <div className="flex items-center gap-2">
              <Wrench className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <label className="text-xs font-bold text-slate-900 dark:text-white">
                Dispatch Field Maintenance Crew
              </label>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={selectedCrew}
                onChange={(e) => setSelectedCrew(e.target.value)}
                placeholder="e.g. Unit Alpha (Eng. Momoh & Technicians)"
                className="flex-1 px-3.5 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-blue-600"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Wrench className="w-3.5 h-3.5" />
                Assign
              </button>
            </div>
          </form>

          {/* Timeline & Notes Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-slate-500 dark:text-slate-400" />
              <label className="text-xs font-bold text-slate-900 dark:text-white">
                Dispatch Timeline & Field Notes
              </label>
            </div>

            <div className="space-y-2 max-h-48 overflow-y-auto">
              {(!outage.notes || outage.notes.length === 0) ? (
                <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl text-xs text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                  No field notes recorded yet for this incident.
                </div>
              ) : (
                outage.notes.map((n: any, idx: number) => (
                  <div key={idx} className="p-3 bg-slate-50 dark:bg-slate-800/70 rounded-xl text-xs border border-slate-200 dark:border-slate-700">
                    <p className="text-slate-800 dark:text-slate-200">{typeof n === 'string' ? n : n.note}</p>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 block">
                      {typeof n === 'string' ? 'Internal Log' : `${n.author} • ${n.timestamp}`}
                    </span>
                  </div>
                ))
              )}
            </div>

            {/* Add Note Form */}
            <form onSubmit={handleAddNote} className="flex gap-2">
              <input
                type="text"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Add technician observation or resolution note..."
                className="flex-1 px-3.5 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-blue-600"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-slate-900 dark:bg-slate-700 hover:bg-slate-800 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                Add Note
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};