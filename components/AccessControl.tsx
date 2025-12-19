
import React, { useState, useEffect } from 'react';
import { db } from '../services/dbService.ts';
import { AccessRecord } from '../types.ts';

const AccessControl: React.FC = () => {
  const [logs, setLogs] = useState<AccessRecord[]>(db.getAccessLogs());
  const [filter, setFilter] = useState<'All' | 'Authorized' | 'Denied' | 'Alerts'>('All');

  useEffect(() => {
    const handleUpdate = () => setLogs(db.getAccessLogs());
    window.addEventListener('db_update', handleUpdate);
    return () => window.removeEventListener('db_update', handleUpdate);
  }, []);

  const simulateScan = () => {
    const names = ['Emmanuel K.', 'Linda O.', 'Kofi A.', 'Unknown Person', 'Ama B.'];
    const depts = ['Logistics', 'Security', 'Maintenance', 'External'];
    const doors = ['Main Gate', 'Warehouse A Entrance', 'Silo 1 Restricted', 'Admin Office'];
    
    const randomName = names[Math.floor(Math.random() * names.length)];
    const isDenied = randomName === 'Unknown Person';

    const newRecord: AccessRecord = {
      id: `ACC-${Date.now().toString().slice(-4)}`,
      personName: randomName,
      department: depts[Math.floor(Math.random() * depts.length)],
      doorName: doors[Math.floor(Math.random() * doors.length)],
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      status: isDenied ? 'Denied' : Math.random() > 0.9 ? 'Tailgating Alert' : 'Authorized',
      type: Math.random() > 0.2 ? 'Entry' : 'Exit'
    };
    
    db.addAccessRecord(newRecord);
  };

  const filteredLogs = logs.filter(log => {
    if (filter === 'All') return true;
    if (filter === 'Authorized') return log.status === 'Authorized';
    if (filter === 'Denied') return log.status === 'Denied';
    if (filter === 'Alerts') return log.status === 'Tailgating Alert';
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6 flex flex-col h-full">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-black text-primary tracking-tight">Personnel Monitoring</h1>
          <p className="text-slate-500 font-medium">Real-time access control from factory door sensors.</p>
        </div>
        <button 
          onClick={simulateScan}
          className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-2xl font-bold shadow-xl shadow-primary/20 transition-all active:scale-95 flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-[20px]">sensors</span>
          Simulate Network Scan
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Inside Factory', value: '42', icon: 'groups', color: 'blue' },
          { label: 'Authorized Today', value: logs.filter(l => l.status === 'Authorized').length, icon: 'check_circle', color: 'emerald' },
          { label: 'Security Alerts', value: logs.filter(l => l.status !== 'Authorized').length, icon: 'gpp_maybe', color: 'red' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between group hover:border-primary/30 transition-all">
            <div>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">{stat.label}</p>
              <p className="text-3xl font-black text-slate-900">{stat.value}</p>
            </div>
            <div className={`size-14 rounded-2xl bg-${stat.color}-50 flex items-center justify-center text-${stat.color}-600 group-hover:scale-110 transition-transform`}>
              <span className="material-symbols-outlined text-[32px]">{stat.icon}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col flex-1 bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden min-h-[500px]">
        <div className="px-6 py-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/50">
          <div className="flex items-center gap-6">
            <h2 className="font-black text-lg text-slate-800 uppercase tracking-tight">Live Entry Stream</h2>
            <div className="flex bg-slate-200/50 p-1.5 rounded-xl">
              {(['All', 'Authorized', 'Denied', 'Alerts'] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-5 py-2 text-xs font-black rounded-lg transition-all ${
                    filter === f ? 'bg-white shadow-md text-primary' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          <button 
            onClick={() => db.clearLogs()}
            className="text-[10px] font-black text-red-500 uppercase tracking-widest hover:underline"
          >
            Clear Log Database
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 bg-white text-[10px] uppercase font-black text-slate-400 border-b border-slate-100 z-10 shadow-sm">
              <tr>
                <th className="px-8 py-4">Personnel</th>
                <th className="px-8 py-4">Point of Access</th>
                <th className="px-8 py-4">Timestamp</th>
                <th className="px-8 py-4">Action</th>
                <th className="px-8 py-4 text-right">Verification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredLogs.map(log => (
                <tr key={log.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className={`size-10 rounded-full flex items-center justify-center text-white font-bold shadow-md ${
                        log.status === 'Denied' ? 'bg-red-500' : 'bg-primary'
                      }`}>
                        {log.personName.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-black text-slate-900">{log.personName}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">{log.department}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-700">{log.doorName}</span>
                      <span className="text-[9px] font-mono text-slate-400 uppercase tracking-tighter">Terminal: {log.id}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-xs font-mono font-bold text-slate-500">{log.timestamp}</td>
                  <td className="px-8 py-5">
                    <span className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border ${
                      log.type === 'Entry' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-slate-100 text-slate-600 border-slate-200'
                    }`}>
                      {log.type}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <span className={`text-[10px] font-black uppercase tracking-widest ${
                        log.status === 'Authorized' ? 'text-emerald-600' : 
                        log.status === 'Denied' ? 'text-red-600' : 
                        'text-amber-600'
                      }`}>
                        {log.status}
                      </span>
                      <span className={`size-2.5 rounded-full ${
                        log.status === 'Authorized' ? 'bg-emerald-500' : 
                        log.status === 'Denied' ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)] animate-pulse' : 
                        'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]'
                      }`}></span>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredLogs.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-20 text-center">
                    <span className="material-symbols-outlined text-slate-200 text-6xl block mb-4">search_off</span>
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No records found in database</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AccessControl;
