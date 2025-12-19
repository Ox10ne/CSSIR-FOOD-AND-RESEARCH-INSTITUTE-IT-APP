
import React from 'react';
import { MOCK_ACTIVITY, MOCK_ACCESS_LOGS } from '../constants.ts';

const Dashboard: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Top Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Stock Value', value: '$1.2M', sub: '+2.4%', icon: 'attach_money', color: 'blue' },
          { label: 'Active Trucks', value: '5', sub: 'In transit', icon: 'local_shipping', color: 'indigo' },
          { label: 'Personnel On-site', value: '42', sub: 'Authorized', icon: 'groups', color: 'emerald' },
          { label: 'Pending Orders', value: '14', sub: 'In warehouse', icon: 'pending_actions', color: 'purple' },
        ].map((card, i) => (
          <div key={i} className="bg-white dark:bg-[#151c2b] p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-1">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">{card.label}</span>
              <span className={`p-1.5 bg-${card.color}-50 dark:bg-${card.color}-900/20 rounded-md text-${card.color}-600`}>
                <span className="material-symbols-outlined text-[20px]">{card.icon}</span>
              </span>
            </div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{card.value}</p>
            <span className={`text-xs ${card.color === 'emerald' ? 'text-emerald-600' : 'text-slate-500'} font-medium`}>{card.sub}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column: Inventory & Access Mix */}
        <div className="xl:col-span-2 flex flex-col gap-6">
          <div className="bg-white dark:bg-[#151c2b] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col overflow-hidden h-full">
             <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                <h3 className="font-bold text-slate-900 dark:text-white">Inventory Quick View</h3>
                <button className="text-sm text-primary font-medium">Manage Stock</button>
             </div>
             <div className="overflow-x-auto">
               <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 dark:bg-slate-800/50 text-xs uppercase text-slate-500 font-semibold">
                    <tr>
                      <th className="px-5 py-3 text-slate-500 dark:text-slate-400">Item</th>
                      <th className="px-5 py-3 text-slate-500 dark:text-slate-400">Status</th>
                      <th className="px-5 py-3 text-slate-500 dark:text-slate-400 text-right">Stock Level</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                     <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                        <td className="px-5 py-4">
                          <div className="flex flex-col">
                            <span className="font-bold text-slate-900 dark:text-white">Raw Sugar</span>
                            <span className="text-[10px] text-slate-500">Bulk Sack (kg)</span>
                          </div>
                        </td>
                        <td className="px-5 py-4"><span className="text-red-500 text-xs font-bold uppercase tracking-wider bg-red-50 dark:bg-red-900/10 px-2 py-0.5 rounded">Low Stock</span></td>
                        <td className="px-5 py-4 text-right">
                          <div className="flex items-center justify-end gap-3">
                            <span className="font-mono font-bold">12%</span>
                            <div className="w-20 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                              <div className="h-full bg-red-500" style={{width: '12%'}}></div>
                            </div>
                          </div>
                        </td>
                     </tr>
                     <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                        <td className="px-5 py-4">
                          <div className="flex flex-col">
                            <span className="font-bold text-slate-900 dark:text-white">PET Preforms</span>
                            <span className="text-[10px] text-slate-500">Clear Units</span>
                          </div>
                        </td>
                        <td className="px-5 py-4"><span className="text-emerald-500 text-xs font-bold uppercase tracking-wider bg-emerald-50 dark:bg-emerald-900/10 px-2 py-0.5 rounded">Healthy</span></td>
                        <td className="px-5 py-4 text-right">
                          <div className="flex items-center justify-end gap-3">
                            <span className="font-mono font-bold">84%</span>
                            <div className="w-20 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                              <div className="h-full bg-emerald-500" style={{width: '84%'}}></div>
                            </div>
                          </div>
                        </td>
                     </tr>
                  </tbody>
               </table>
             </div>
          </div>

          <div className="bg-white dark:bg-[#151c2b] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden h-64 flex flex-col">
            <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <h3 className="font-bold">Recent Access Logs</h3>
              <button className="text-xs text-primary font-bold">Monitor All Doors</button>
            </div>
            <div className="flex-1 overflow-y-auto">
              {MOCK_ACCESS_LOGS.slice(0, 5).map((log, i) => (
                <div key={i} className="px-5 py-3 flex items-center justify-between border-b border-slate-50 dark:border-slate-800/50 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className={`size-2 rounded-full ${log.status === 'Authorized' ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
                    <div>
                      <p className="text-xs font-bold">{log.personName}</p>
                      <p className="text-[10px] text-slate-500 uppercase">{log.doorName}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-mono text-slate-400">{log.timestamp}</p>
                    <p className={`text-[10px] font-bold ${log.type === 'Entry' ? 'text-emerald-600' : 'text-slate-400'}`}>{log.type}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: CCTV & Alerts */}
        <div className="flex flex-col gap-6">
          <div className="bg-white dark:bg-[#151c2b] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
              <span className="material-symbols-outlined text-red-500 animate-pulse text-[18px]">fiber_manual_record</span>
              <h3 className="font-bold">CCTV Feeds</h3>
            </div>
            <div className="p-4 grid grid-cols-2 gap-3">
              {[1,2,3,4].map(i => (
                <div key={i} className="aspect-video bg-[#0f172a] rounded-lg overflow-hidden relative flex items-center justify-center border border-slate-800 group cursor-pointer hover:border-primary/50 transition-colors">
                   <div className="flex flex-col items-center justify-center text-slate-700 group-hover:text-primary transition-colors">
                      <span className="material-symbols-outlined text-[32px]">videocam</span>
                      <span className="text-[6px] font-mono uppercase tracking-widest mt-1">Channel 0{i}</span>
                   </div>
                   <div className="absolute top-1 left-1 bg-black/60 px-1 rounded text-[8px] text-white font-bold">CAM-0{i}</div>
                   <div className="absolute bottom-1 right-1">
                      <span className="size-1.5 bg-emerald-500 rounded-full block animate-pulse"></span>
                   </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-[#151c2b] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col min-h-[300px]">
             <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                <h3 className="font-bold">Recent Alerts</h3>
                <button className="text-xs text-primary font-bold hover:underline">View All</button>
             </div>
             <div className="flex-1 overflow-y-auto p-2 space-y-1">
                {MOCK_ACTIVITY.map(log => (
                  <div key={log.id} className="flex gap-3 p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg transition-colors cursor-pointer group border border-transparent hover:border-slate-100 dark:hover:border-slate-700">
                    <div className={`shrink-0 size-8 rounded-full flex items-center justify-center ${
                      log.type === 'security' ? 'bg-red-50 text-red-600' :
                      log.type === 'restock' ? 'bg-emerald-50 text-emerald-600' :
                      'bg-slate-100 text-slate-600'
                    }`}>
                      <span className="material-symbols-outlined text-[18px]">
                        {log.type === 'security' ? 'warning' : log.type === 'restock' ? 'inventory_2' : 'info'}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight">{log.title}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">{log.description}</p>
                      <p className="text-[10px] text-slate-400 font-medium mt-1 uppercase">{log.timestamp}</p>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
