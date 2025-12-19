
import React, { useState, useEffect } from 'react';
import { MOCK_CAMERAS } from '../constants.ts';
import { Camera } from '../types.ts';

const SecurityCCTV: React.FC = () => {
  const [selectedZone, setSelectedZone] = useState<Camera['zone'] | 'All'>('All');
  const [activeCamId, setActiveCamId] = useState<string>(MOCK_CAMERAS[0].id);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const filteredCameras = MOCK_CAMERAS.filter(c => selectedZone === 'All' || c.zone === selectedZone);
  const activeCamera = MOCK_CAMERAS.find(c => c.id === activeCamId) || MOCK_CAMERAS[0];

  return (
    <div className="flex h-full w-full -m-8 relative bg-[#0a0f18] text-slate-300 overflow-hidden">
      {/* Sidebar - Camera List & Zones */}
      <aside className="w-72 bg-[#111827] border-r border-slate-800 flex flex-col shrink-0">
        <div className="p-4 border-b border-slate-800">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">Industrial Zones</h2>
          <div className="flex flex-col gap-1">
            {(['All', 'Warehouse', 'Perimeter', 'Loading Dock', 'Production'] as const).map(zone => (
              <button
                key={zone}
                onClick={() => setSelectedZone(zone)}
                className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                  selectedZone === zone ? 'bg-primary/20 text-primary font-bold' : 'hover:bg-slate-800'
                }`}
              >
                <span>{zone}</span>
                <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded">
                  {zone === 'All' ? MOCK_CAMERAS.length : MOCK_CAMERAS.filter(c => c.zone === zone).length}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-2">Camera Feeds</h2>
          {filteredCameras.map(cam => (
            <button
              key={cam.id}
              onClick={() => setActiveCamId(cam.id)}
              className={`flex items-center gap-3 p-2 rounded-lg text-left transition-all border ${
                activeCamId === cam.id ? 'border-primary bg-primary/5' : 'border-transparent hover:bg-slate-800'
              }`}
            >
              <div className={`size-2 rounded-full ${
                cam.status === 'online' ? 'bg-emerald-500' : cam.status === 'warning' ? 'bg-amber-500' : 'bg-red-500'
              }`}></div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-100">{cam.name}</span>
                <span className="text-[10px] text-slate-500">{cam.id} • {cam.zone}</span>
              </div>
              {cam.aiDetection && (
                <span className="ml-auto material-symbols-outlined text-[16px] text-primary animate-pulse">psychology</span>
              )}
            </button>
          ))}
        </div>
      </aside>

      {/* Main Surveillance Area */}
      <main className="flex-1 flex flex-col overflow-hidden bg-black">
        {/* Top Bar Info */}
        <div className="h-12 bg-[#111827]/80 border-b border-slate-800 px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-red-500 animate-pulse text-[18px]">fiber_manual_record</span>
              <span className="text-xs font-bold uppercase tracking-widest text-slate-100">Live Feedback</span>
            </div>
            <div className="h-4 w-px bg-slate-700"></div>
            <span className="text-xs font-mono text-slate-400">{currentTime.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-4">
             <div className="flex bg-slate-800 rounded-md p-0.5">
               <button className="px-3 py-1 text-[10px] font-bold bg-slate-700 text-white rounded">Grid</button>
               <button className="px-3 py-1 text-[10px] font-bold text-slate-500">Focus</button>
             </div>
          </div>
        </div>

        {/* Viewport */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-1 p-1 overflow-hidden">
          {/* Main Focused View */}
          <div className="relative bg-[#1a1f2e] border border-slate-800 group overflow-hidden lg:row-span-2 lg:col-span-1 flex items-center justify-center">
             {/* Camera Icon Placeholder */}
             <div className="flex flex-col items-center justify-center text-slate-700/50">
                <span className="material-symbols-outlined text-[120px]">videocam</span>
                <span className="text-sm font-mono tracking-widest mt-4">ESTABLISHING ENCRYPTED LINK...</span>
             </div>
             
             {/* Technical Overlays */}
             <div className="absolute inset-0 p-6 flex flex-col justify-between pointer-events-none">
                <div className="flex justify-between items-start">
                   <div className="bg-black/60 backdrop-blur px-3 py-2 rounded border border-white/10">
                      <p className="text-[10px] font-bold text-primary mb-0.5">SOURCE: {activeCamera.id}</p>
                      <p className="text-sm font-black text-white uppercase">{activeCamera.name}</p>
                   </div>
                   <div className="flex flex-col gap-2 items-end">
                      <div className="bg-red-600 text-white px-2 py-1 rounded text-[10px] font-black tracking-tighter animate-pulse">REC</div>
                      <div className="bg-black/60 backdrop-blur px-2 py-1 rounded border border-white/10 text-[10px] font-mono">FR: 30.00 FPS</div>
                   </div>
                </div>

                <div className="flex justify-between items-end">
                   <div className="flex flex-col gap-2">
                      {activeCamera.aiDetection && (
                        <div className="bg-primary/20 backdrop-blur-md border border-primary/50 text-primary px-3 py-2 rounded flex items-center gap-2">
                           <span className="material-symbols-outlined text-[18px]">visibility</span>
                           <span className="text-xs font-bold uppercase">Detection: {activeCamera.aiDetection}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-4 bg-black/40 p-2 rounded text-[10px] font-mono text-slate-400">
                        <span>LAT: 5.6037° N</span>
                        <span>LNG: 0.1870° W</span>
                      </div>
                   </div>
                   <div className="flex gap-2 pointer-events-auto">
                      <button className="size-10 bg-black/60 hover:bg-primary/80 rounded-full flex items-center justify-center transition-colors">
                        <span className="material-symbols-outlined text-[20px]">videocam</span>
                      </button>
                      <button className="size-10 bg-black/60 hover:bg-primary/80 rounded-full flex items-center justify-center transition-colors">
                        <span className="material-symbols-outlined text-[20px]">photo_camera</span>
                      </button>
                   </div>
                </div>
             </div>

             {/* Simulated Crosshair */}
             <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-20">
                <div className="size-64 border border-white rounded-full"></div>
                <div className="absolute w-full h-px bg-white"></div>
                <div className="absolute h-full w-px bg-white"></div>
             </div>
          </div>

          {/* Grid of Other Feeds */}
          <div className="grid grid-cols-2 gap-1 overflow-y-auto pr-1">
            {MOCK_CAMERAS.filter(c => c.id !== activeCamId && (selectedZone === 'All' || c.zone === selectedZone)).map(cam => (
              <div 
                key={cam.id} 
                onClick={() => setActiveCamId(cam.id)}
                className="relative aspect-video bg-[#151926] border border-slate-800 hover:border-primary/50 cursor-pointer transition-all overflow-hidden flex items-center justify-center"
              >
                <div className="flex flex-col items-center justify-center text-slate-800">
                    <span className="material-symbols-outlined text-[48px]">videocam</span>
                    <span className="text-[8px] font-mono mt-2 tracking-tighter">{cam.id}</span>
                </div>
                
                <div className="absolute top-2 left-2 bg-black/70 px-1.5 py-0.5 rounded text-[8px] font-bold text-white flex items-center gap-1">
                  <span className={`size-1 rounded-full ${cam.status === 'online' ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
                  {cam.id}
                </div>
                {cam.aiDetection && (
                   <div className="absolute inset-0 border-2 border-primary/30 m-2 rounded pointer-events-none">
                     <span className="absolute -top-1 -left-1 bg-primary text-[6px] px-1 text-white uppercase">{cam.aiDetection}</span>
                   </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Control Center Bottom Bar */}
        <div className="h-24 bg-[#111827] border-t border-slate-800 px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-8">
            <div className="flex flex-col gap-1">
               <span className="text-[10px] font-bold text-slate-500 uppercase">PTZ Controls</span>
               <div className="flex gap-1">
                  <button className="size-8 bg-slate-800 rounded hover:bg-slate-700 flex items-center justify-center"><span className="material-symbols-outlined text-[18px]">keyboard_arrow_left</span></button>
                  <div className="flex flex-col gap-1">
                    <button className="size-8 bg-slate-800 rounded hover:bg-slate-700 flex items-center justify-center"><span className="material-symbols-outlined text-[18px]">keyboard_arrow_up</span></button>
                    <button className="size-8 bg-slate-800 rounded hover:bg-slate-700 flex items-center justify-center"><span className="material-symbols-outlined text-[18px]">keyboard_arrow_down</span></button>
                  </div>
                  <button className="size-8 bg-slate-800 rounded hover:bg-slate-700 flex items-center justify-center"><span className="material-symbols-outlined text-[18px]">keyboard_arrow_right</span></button>
               </div>
            </div>
            
            <div className="flex flex-col gap-1">
               <span className="text-[10px] font-bold text-slate-500 uppercase">Optics</span>
               <div className="flex gap-2">
                  <div className="bg-slate-800 rounded flex overflow-hidden">
                    <button className="px-3 py-2 hover:bg-slate-700"><span className="material-symbols-outlined text-[18px]">zoom_in</span></button>
                    <button className="px-3 py-2 hover:bg-slate-700"><span className="material-symbols-outlined text-[18px]">zoom_out</span></button>
                  </div>
                  <button className="px-3 py-2 bg-slate-800 rounded hover:bg-slate-700"><span className="material-symbols-outlined text-[18px]">flare</span></button>
               </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
             <button className="flex flex-col items-center gap-1 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300">
                <span className="material-symbols-outlined">history</span>
                <span className="text-[10px] font-bold uppercase">Playback</span>
             </button>
             <button className="flex flex-col items-center gap-1 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300">
                <span className="material-symbols-outlined">shield</span>
                <span className="text-[10px] font-bold uppercase">Protocol</span>
             </button>
             <div className="h-10 w-px bg-slate-800"></div>
             <button className="flex items-center gap-3 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-red-900/20 active:scale-95">
                <span className="material-symbols-outlined animate-bounce">notifications_active</span>
                <span>EMERGENCY ALERT</span>
             </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SecurityCCTV;
