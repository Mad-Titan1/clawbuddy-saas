import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, Settings, ChevronLeft, ChevronRight, LogOut, Sparkles,
  Network, Cpu, MessageSquare, ShoppingBag, TrendingUp, CheckSquare, ListTodo, Users, Users2, LayoutDashboard,
  Menu, X, Share2, Coins, FolderCode
} from 'lucide-react';

const Sidebar = ({ tabs, activeTab, onTabChange, isCollapsed, setIsCollapsed, isMobileOpen, setIsMobileOpen }) => {
  const getIcon = (id) => {
    switch (id) {
      case 'command-deck': return LayoutDashboard;
      case 'flow-state': return Share2;
      case 'agents': return Users;
      case 'task-board': return CheckSquare;
      case 'ai-log': return ListTodo;
      case 'neural-map': return Network;
      case 'system-monitor': return Cpu;
      case 'comm-hub': return MessageSquare;
      case 'marketplace': return ShoppingBag;
      case 'roi': return TrendingUp;
      case 'usage-hub': return Coins;
      case 'neural-vault': return FolderCode;
      case 'council': return Users2;
      case 'meetings': return Calendar;
      default: return LayoutDashboard;
    }
  };

  const SidebarContent = () => (
    <>
      <div className="p-6 flex items-center justify-between border-b border-white/5 h-[88px]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary-accent flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.4)]">
            <span className="text-xl font-black text-background-custom italic">C</span>
          </div>
          {!isCollapsed && <span className="text-xl font-black text-white tracking-tighter whitespace-nowrap">ClawMatrix</span>}
        </div>
        
        <button 
          onClick={() => isMobileOpen ? setIsMobileOpen(false) : setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-xl bg-white/5 border border-white/10 text-muted hover:text-white transition-all"
        >
          {isMobileOpen ? <X size={20} /> : (isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />)}
        </button>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto no-scrollbar">
        {tabs.map((tab) => {
          const Icon = getIcon(tab.id);
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all group relative ${
                isActive ? 'nav-item-active' : 'text-muted hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon size={20} className={isActive ? 'text-primary-accent' : 'text-inherit'} />
              {!isCollapsed && (
                <span className="font-medium text-sm whitespace-nowrap">{tab.label}</span>
              )}
              {isActive && !isCollapsed && (
                <motion.div 
                  layoutId="sidebar-active"
                  className="absolute right-2 w-1.5 h-1.5 rounded-full bg-primary-accent shadow-[0_0_10px_rgba(16,185,129,0.8)]"
                />
              )}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/5 space-y-4">
        {!isCollapsed && !isMobileOpen && (
          <div className="p-3 rounded-xl bg-primary-accent/5 border border-primary-accent/10">
            <div className="flex items-center gap-2 text-[10px] font-bold text-primary-accent uppercase tracking-widest mb-2">
              <Sparkles size={10} />
              Pro Plan Active
            </div>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
              <div className="h-full w-2/3 bg-primary-accent" />
            </div>
          </div>
        )}
        
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-muted hover:text-red-400 hover:bg-red-500/5 transition-all group">
          <LogOut size={20} />
          {!isCollapsed && <span className="font-medium text-sm">Logout</span>}
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <div className="lg:hidden fixed inset-0 z-[100] flex">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-[280px] h-full bg-background-custom border-r border-white/5 flex flex-col shadow-2xl z-[101]"
            >
              <SidebarContent />
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar (Persistent) */}
      <aside 
        className={`hidden lg:flex flex-col sticky top-0 h-screen bg-background-custom border-r border-white/5 transition-all duration-300 flex-shrink-0 ${
          isCollapsed ? 'w-20' : 'w-[280px]'
        }`}
      >
        <SidebarContent />
      </aside>
    </>
  );
};

export default Sidebar;
