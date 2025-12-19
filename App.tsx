
import React, { useState } from 'react';
import Login from './components/Login.tsx';
import Dashboard from './components/Dashboard.tsx';
import Inventory from './components/Inventory.tsx';
import FleetTracking from './components/FleetTracking.tsx';
import SecurityCCTV from './components/SecurityCCTV.tsx';
import AccessControl from './components/AccessControl.tsx';
import AIChat from './components/AIChat.tsx';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="flex h-screen w-full bg-background-light text-slate-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col shrink-0 z-30">
        <div className="p-6 border-b flex items-center gap-3">
          <div className="size-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-2xl font-bold">token</span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-sm font-bold leading-tight">Twellium SCM</h1>
            <p className="text-slate-500 text-xs">Admin Portal</p>
          </div>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
            { id: 'inventory', label: 'Inventory', icon: 'inventory_2' },
            { id: 'access', label: 'Access Control', icon: 'person_pin_circle' },
            { id: 'fleet', label: 'Fleet Tracking', icon: 'local_shipping' },
            { id: 'cctv', label: 'Security CCTV', icon: 'videocam' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                currentView === item.id 
                  ? 'bg-primary/10 text-primary' 
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span className={`material-symbols-outlined text-xl ${currentView === item.id ? 'fill-1' : ''}`}>
                {item.icon}
              </span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t space-y-1">
          <button className="flex items-center gap-3 w-full px-4 py-2 rounded-lg text-sm text-slate-600 hover:bg-slate-50 transition-colors">
            <span className="material-symbols-outlined text-xl">settings</span>
            Settings
          </button>
          <button 
            onClick={() => setIsAuthenticated(false)}
            className="flex items-center gap-3 w-full px-4 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50 transition-colors"
          >
            <span className="material-symbols-outlined text-xl">logout</span>
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between shrink-0 z-20">
          <div className="flex flex-col">
            <h1 className="text-xl font-bold tracking-tight capitalize">
              {currentView.replace(/_/g, ' ')} Overview
            </h1>
            <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
              <span>{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              <span className="size-1 bg-slate-300 rounded-full"></span>
              <div className="flex items-center gap-1.5 text-emerald-600 font-medium">
                <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                System Online
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
             <div className="relative w-64 hidden md:block">
                <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-[20px]">search</span>
                <input className="w-full h-10 pl-10 pr-4 rounded-lg bg-slate-100 border-0 text-sm focus:ring-2 focus:ring-primary/20" placeholder="Global search..." />
             </div>
             <button className="size-10 flex items-center justify-center rounded-lg hover:bg-slate-100 relative text-slate-500">
                <span className="material-symbols-outlined">notifications</span>
                <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white"></span>
             </button>
             <div className="h-8 w-px bg-slate-200 mx-1"></div>
             <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium">Alex M.</p>
                  <p className="text-xs text-slate-500">Logistics Manager</p>
                </div>
                <div className="size-9 rounded-full bg-slate-200 border-2 border-white shadow-sm overflow-hidden">
                   <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBjuif-E2g9cEpcToEs_RDw8UoDY4NfQZ2P3S4qBA3sLs10sAM2OOjJ9N9FuRhiefCrvFCcHRXSBTiYkSj2Y73XAVXEDJYo1o51lsV7U-9LMHjwvRrdUimk-g-PmQwfSM1Rbtii5DDTIiQfTIMSQJSzjgiRAMdnY7gdBrHBpRxkt8HJ4EtKgHnxB4UGBXG3KDwaPrdQBTo6JVUzm8WvVFkwaGn7UQfL3dcHwD-EJO3LS4unrCZc8gFAChC2f_GoJ092v27RAElLwAuN" alt="User" />
                </div>
             </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 bg-slate-50/50">
          {currentView === 'dashboard' && <Dashboard />}
          {currentView === 'inventory' && <Inventory />}
          {currentView === 'fleet' && <FleetTracking />}
          {currentView === 'cctv' && <SecurityCCTV />}
          {currentView === 'access' && <AccessControl />}
        </div>
      </main>

      <AIChat />
    </div>
  );
};

export default App;
