
import React, { useState, useEffect, useRef } from 'react';
import { MOCK_VEHICLES } from '../constants.ts';
import { Vehicle } from '../types.ts';

declare const L: any;

const FleetTracking: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>(MOCK_VEHICLES[0].id);
  const [filter, setFilter] = useState<'All' | 'Moving' | 'Stopped' | 'Alert'>('All');
  const mapRef = useRef<any>(null);
  const markersRef = useRef<{ [key: string]: any }>({});

  const selectedVehicle = MOCK_VEHICLES.find(v => v.id === selectedId) || MOCK_VEHICLES[0];

  useEffect(() => {
    // Initialize Leaflet Map
    if (!mapRef.current) {
      mapRef.current = L.map('fleet-map', {
        zoomControl: false,
        attributionControl: false
      }).setView([5.6037, -0.1870], 8);

      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        maxZoom: 19
      }).addTo(mapRef.current);
    }

    // Cleanup and Refresh Markers
    Object.values(markersRef.current).forEach(m => m.remove());
    markersRef.current = {};

    MOCK_VEHICLES.forEach(v => {
      const color = v.status === 'Alert' ? '#ef4444' : v.status === 'Stopped' ? '#64748b' : '#135bec';
      
      const marker = L.circleMarker([v.coordinates.lat, v.coordinates.lng], {
        radius: v.id === selectedId ? 10 : 7,
        fillColor: color,
        color: '#fff',
        weight: 3,
        opacity: 1,
        fillOpacity: 0.9
      }).addTo(mapRef.current);

      marker.bindTooltip(`<b>${v.id}</b><br>${v.driver}`, { direction: 'top' });
      markersRef.current[v.id] = marker;
    });

    return () => {};
  }, [selectedId]);

  useEffect(() => {
    if (mapRef.current && selectedVehicle) {
      mapRef.current.flyTo([selectedVehicle.coordinates.lat, selectedVehicle.coordinates.lng], 10, {
        duration: 1.5
      });
    }
  }, [selectedId]);

  const filteredVehicles = MOCK_VEHICLES.filter(v => {
    if (filter === 'All') return true;
    if (filter === 'Moving') return v.speed > 0;
    if (filter === 'Stopped') return v.speed === 0;
    if (filter === 'Alert') return v.status === 'Alert';
    return true;
  });

  return (
    <div className="flex h-full w-full -m-8 relative overflow-hidden">
      <aside className="w-[400px] flex flex-col bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-10 shrink-0 h-full shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-slate-800 dark:text-slate-200">Active Deliveries</h2>
            <span className="bg-primary/10 dark:bg-primary/20 text-primary text-xs font-bold px-2 py-1 rounded-full">24 Live</span>
          </div>
          
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined text-[18px]">filter_list</span>
            <input className="w-full bg-slate-50 dark:bg-slate-800 border-none text-sm rounded-lg pl-9 pr-4 py-2 focus:ring-1 focus:ring-primary placeholder:text-slate-400 dark:text-white transition-all" placeholder="Filter by driver or route..." type="text"/>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {(['All', 'Moving', 'Stopped', 'Alert'] as const).map(f => (
              <button 
                key={f}
                onClick={() => setFilter(f)}
                className={`whitespace-nowrap px-3 py-1.5 text-xs font-medium rounded-md transition-colors shadow-sm ${
                  filter === f 
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900' 
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {filteredVehicles.map(v => (
            <div 
              key={v.id}
              onClick={() => setSelectedId(v.id)}
              className={`group flex flex-col gap-2 p-3 rounded-lg border cursor-pointer transition-all relative overflow-hidden ${
                selectedId === v.id 
                  ? 'bg-primary/5 dark:bg-primary/10 border-primary/20' 
                  : 'bg-white dark:bg-slate-800/50 border-transparent hover:border-slate-200 dark:hover:border-slate-700 hover:bg-slate-50'
              }`}
            >
              {selectedId === v.id && <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`size-10 rounded-full flex items-center justify-center shadow-sm border ${
                    selectedId === v.id ? 'bg-white dark:bg-slate-800 text-primary border-slate-100' : 'bg-slate-50 dark:bg-slate-800 text-slate-400 border-slate-100'
                  }`}>
                    <span className="material-symbols-outlined">local_shipping</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">{v.id}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{v.route}</p>
                  </div>
                </div>
                <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
                  v.status === 'On Track' ? 'bg-green-100 text-green-700' :
                  v.status === 'Alert' ? 'bg-red-100 text-red-700' :
                  v.status === 'Delayed' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-slate-100 text-slate-500'
                }`}>
                  {v.status}
                </span>
              </div>
              
              <div className="pl-[52px]">
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 mb-1">
                  <div className={`h-full rounded-full bg-primary`} style={{width: `${v.progress}%`}}></div>
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 dark:text-slate-500 font-medium uppercase tracking-wider">
                  <span>Driver: {v.driver}</span>
                  <span>ETA: {v.eta}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </aside>

      <main className="flex-1 relative bg-slate-100 dark:bg-slate-900 h-full overflow-hidden">
        <div id="fleet-map" className="absolute inset-0 z-0"></div>

        <div className="absolute top-6 left-6 z-20 w-[320px] bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden">
          <div className="bg-primary px-4 py-3 flex items-center justify-between text-white">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px]">local_shipping</span>
              <span className="font-semibold text-sm">{selectedVehicle.id}</span>
            </div>
            <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded uppercase tracking-wider font-bold">
              {selectedVehicle.speed > 0 ? 'In Transit' : 'Idle'}
            </span>
          </div>
          <div className="p-4 flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-50 dark:bg-slate-800 p-2 rounded-lg border border-slate-100 dark:border-slate-700">
                <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold mb-1">Speed</p>
                <p className="text-lg font-bold text-slate-900 dark:text-white">{selectedVehicle.speed} <span className="text-xs font-normal text-slate-400">km/h</span></p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800 p-2 rounded-lg border border-slate-100 dark:border-slate-700">
                <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold mb-1">Fuel</p>
                <p className="text-lg font-bold text-slate-900 dark:text-white">{selectedVehicle.fuel} <span className="text-xs font-normal text-slate-400">%</span></p>
              </div>
            </div>
            
            <div className="flex flex-col gap-3 relative pl-2">
              <div className="absolute left-[5px] top-2 bottom-2 w-0.5 bg-slate-200 dark:bg-slate-700"></div>
              <div className="relative flex items-center gap-3">
                <div className={`size-2.5 rounded-full ring-4 ring-white dark:ring-slate-900 z-10 ${selectedVehicle.status === 'Alert' ? 'bg-red-500' : 'bg-green-500'}`}></div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-slate-900 dark:text-white">{selectedVehicle.lastCheckpoint}</p>
                  <p className="text-[10px] text-slate-400">Current Status</p>
                </div>
              </div>
              <div className="relative flex items-center gap-3 opacity-60">
                <div className="size-2.5 rounded-full bg-slate-300 dark:bg-slate-600 ring-4 ring-white dark:ring-slate-900 z-10"></div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-slate-900 dark:text-white">GPS Coordinate</p>
                  <p className="text-[10px] text-slate-400">{selectedVehicle.coordinates.lat}, {selectedVehicle.coordinates.lng}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-2 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button className="flex-1 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 rounded border border-slate-200 dark:border-slate-700 transition-colors">History</button>
              <button className="flex-1 py-2 text-xs font-semibold text-white bg-primary hover:bg-blue-600 rounded shadow-sm transition-colors">Contact Driver</button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 right-6 z-20 flex flex-col gap-2">
          <button 
            onClick={() => mapRef.current?.setView([selectedVehicle.coordinates.lat, selectedVehicle.coordinates.lng], 12)}
            className="size-10 bg-white dark:bg-slate-800 rounded-lg shadow-lg flex items-center justify-center text-slate-700 dark:text-white hover:bg-slate-50 hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined">my_location</span>
          </button>
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg flex flex-col overflow-hidden">
            <button 
              onClick={() => mapRef.current?.zoomIn()}
              className="size-10 flex items-center justify-center text-slate-700 dark:text-white hover:bg-slate-50 transition-colors border-b border-slate-100 dark:border-slate-700"
            >
              <span className="material-symbols-outlined">add</span>
            </button>
            <button 
              onClick={() => mapRef.current?.zoomOut()}
              className="size-10 flex items-center justify-center text-slate-700 dark:text-white hover:bg-slate-50 transition-colors"
            >
              <span className="material-symbols-outlined">remove</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FleetTracking;
