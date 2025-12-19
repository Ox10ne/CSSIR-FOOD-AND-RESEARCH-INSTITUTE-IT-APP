
import React, { useState, useEffect } from 'react';
import { db } from '../services/dbService.ts';
import { InventoryItem } from '../types.ts';

const Inventory: React.FC = () => {
  const [items, setItems] = useState<InventoryItem[]>(db.getInventory());
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [newItem, setNewItem] = useState<Partial<InventoryItem>>({
    name: '',
    category: 'Plastics / Raw',
    stockLevel: 100,
    unit: 'units',
    zone: 'Zone A-01',
    status: 'In Stock'
  });

  useEffect(() => {
    const handleUpdate = () => setItems(db.getInventory());
    window.addEventListener('db_update', handleUpdate);
    return () => window.removeEventListener('db_update', handleUpdate);
  }, []);

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    const item: InventoryItem = {
      id: `ITM-${Math.floor(Math.random() * 9000) + 1000}`,
      name: newItem.name || 'Unnamed Item',
      category: newItem.category || 'Other',
      stockLevel: newItem.stockLevel || 0,
      unit: newItem.unit || 'units',
      zone: newItem.zone || 'Unknown',
      status: (newItem.stockLevel || 0) < 10 ? 'Critical' : (newItem.stockLevel || 0) < 30 ? 'Low Stock' : 'In Stock'
    };
    db.addInventoryItem(item);
    setIsAdding(false);
    setNewItem({ name: '', category: 'Plastics / Raw', stockLevel: 100, unit: 'units', zone: 'Zone A-01' });
  };

  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-slate-900 dark:text-white text-3xl font-black tracking-tight text-primary">Inventory Management</h1>
          <p className="text-slate-500 max-w-2xl font-medium">Manage Twellium's raw materials and finished goods database.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary-hover transition-all active:scale-95"
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
            <span>New Item</span>
          </button>
        </div>
      </div>

      {isAdding && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <form onSubmit={handleAddItem} className="bg-white dark:bg-surface-dark w-full max-w-md rounded-2xl shadow-2xl p-6 border border-slate-200 animate-in zoom-in duration-200">
            <h3 className="text-xl font-bold mb-4">Add New Inventory</h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase text-slate-500 mb-1 block">Item Name</label>
                <input required value={newItem.name} onChange={e => setNewItem({...newItem, name: e.target.value})} className="w-full h-11 px-4 rounded-xl border-slate-200 bg-slate-50 text-sm focus:ring-primary focus:border-primary" placeholder="e.g. PET Preforms" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase text-slate-500 mb-1 block">Stock (%)</label>
                  <input type="number" value={newItem.stockLevel} onChange={e => setNewItem({...newItem, stockLevel: parseInt(e.target.value)})} className="w-full h-11 px-4 rounded-xl border-slate-200 bg-slate-50 text-sm" />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase text-slate-500 mb-1 block">Zone</label>
                  <input value={newItem.zone} onChange={e => setNewItem({...newItem, zone: e.target.value})} className="w-full h-11 px-4 rounded-xl border-slate-200 bg-slate-50 text-sm" placeholder="A-12" />
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-8">
              <button type="button" onClick={() => setIsAdding(false)} className="flex-1 h-11 font-bold text-slate-500 hover:bg-slate-50 rounded-xl transition-colors">Cancel</button>
              <button type="submit" className="flex-1 h-11 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/10">Save Item</button>
            </div>
          </form>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl border border-primary/20 bg-white dark:bg-surface-dark p-6 shadow-sm overflow-hidden flex flex-col md:flex-row relative group">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-primary"></div>
          <div className="flex-1 flex flex-col justify-center gap-4">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined text-[28px]">barcode_reader</span>
              </div>
              <div>
                <p className="text-lg font-bold">Smart Scan Integration</p>
                <p className="text-slate-500 text-sm font-medium">Network scanners connected to local DB.</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 mt-2">
              <button className="flex-1 min-w-[140px] h-11 rounded-xl bg-primary text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-primary/10 hover:translate-y-[-2px] transition-all">
                <span className="material-symbols-outlined">login</span> Scan In
              </button>
              <button className="flex-1 min-w-[140px] h-11 rounded-xl bg-white border border-slate-200 font-bold text-slate-600 text-sm flex items-center justify-center gap-2 hover:bg-slate-50 transition-all">
                <span className="material-symbols-outlined">logout</span> Scan Out
              </button>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col gap-4">
          <p className="text-sm font-bold flex items-center gap-2">
            <span className="size-2 bg-primary rounded-full animate-pulse"></span>
            Database Health
          </p>
          <div className="space-y-4">
             <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500 font-bold uppercase">Total SKUs</span>
                <span className="font-black text-primary">{items.length}</span>
             </div>
             <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500 font-bold uppercase">Critical Items</span>
                <span className="font-black text-red-500">{items.filter(i => i.status === 'Critical').length}</span>
             </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-3 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex p-1 bg-slate-100 rounded-xl w-full md:w-auto">
            <button className="px-6 py-2.5 rounded-lg bg-white shadow-sm font-bold text-sm text-primary">All Stock</button>
            <button className="px-6 py-2.5 rounded-lg text-slate-500 font-bold text-sm hover:text-slate-700">Finished Goods</button>
          </div>
          <div className="relative w-full md:w-80">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-[20px]">search</span>
            <input 
              className="w-full h-11 pl-10 pr-4 rounded-xl border-slate-200 bg-slate-50 text-sm focus:ring-primary focus:border-primary" 
              placeholder="Filter by name or ID..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-[10px] uppercase text-slate-500 font-black tracking-widest">
                  <th className="px-6 py-4">Item Details</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Level</th>
                  <th className="px-6 py-4">Location</th>
                  <th className="px-6 py-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-sm">
                {filteredItems.map(item => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="px-6 py-5">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900">{item.name}</span>
                        <span className="text-[10px] font-mono text-slate-400 mt-1">UUID: {item.id}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-md">{item.category}</span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <span className="font-black text-slate-700 w-8">{item.stockLevel}%</span>
                        <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className={`h-full transition-all duration-1000 ${
                            item.status === 'Critical' ? 'bg-red-500' : 
                            item.status === 'Low Stock' ? 'bg-amber-500' : 
                            'bg-emerald-500'}`} 
                            style={{width: `${item.stockLevel}%`}}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="px-2 py-1 rounded-md bg-primary/5 text-primary text-[10px] font-black border border-primary/10">{item.zone}</span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        item.status === 'Critical' ? 'bg-red-50 text-red-600' :
                        item.status === 'Low Stock' ? 'bg-amber-50 text-amber-600' :
                        'bg-emerald-50 text-emerald-600'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
