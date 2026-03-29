import React from 'react';
import { Settings, Search, Bell, ChevronDown } from 'lucide-react';

const Header = () => {
  return (
    <header className="px-8 py-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div>
            <h2 className="text-2xl font-bold text-white glow-text-primary">Mission Control</h2>
            <p className="text-xs text-muted font-medium uppercase tracking-widest opacity-60">System Operational • All Agents Active</p>
          </div>

          <div className="hidden lg:flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-xl focus-within:border-primary-accent/50 focus-within:bg-white/10 transition-all cursor-text w-96 group">
            <Search size={16} className="text-muted group-focus-within:text-primary-accent transition-colors" />
            <input 
              type="text" 
              placeholder="Search agents, tasks, or logs..." 
              className="bg-transparent border-none outline-none text-sm text-white placeholder:text-muted/50 w-full"
            />
            <div className="flex items-center gap-1 px-1.5 py-0.5 bg-white/5 border border-white/10 rounded text-[10px] text-muted font-mono">
              <span className="text-[8px]">⌘</span>K
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <button className="p-2.5 hover:bg-white/10 rounded-xl text-muted hover:text-white transition-all relative">
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-background-custom"></span>
            </button>
            <button className="p-2.5 hover:bg-white/10 rounded-xl text-muted hover:text-white transition-all">
              <Settings size={20} />
            </button>
          </div>

          <div className="h-8 w-px bg-white/5" />

          <button className="flex items-center gap-3 p-1.5 pr-3 hover:bg-white/5 border border-transparent hover:border-white/10 rounded-2xl transition-all group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-accent to-cyan-accent p-[1px]">
              <div className="w-full h-full rounded-[11px] bg-background-custom flex items-center justify-center overflow-hidden">
                <img 
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
                  alt="User" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-sm font-bold text-white group-hover:text-primary-accent transition-colors">Commander Rex</p>
              <p className="text-[10px] text-muted font-bold uppercase tracking-tighter">Fleet Admiral</p>
            </div>
            <ChevronDown size={14} className="text-muted group-hover:text-white transition-colors" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
