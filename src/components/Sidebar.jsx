import React from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, Users, CheckSquare, ListTodo, Users2, 
  Calendar, Settings, ChevronLeft, ChevronRight, LogOut, Sparkles
} from 'lucide-react';

const Sidebar = ({ tabs, activeTab, onTabChange, isCollapsed, setIsCollapsed }) => {
  const getIcon = (id) => {
    switch (id) {
      case 'command-deck': return LayoutDashboard;
      case 'agents': return Users;
      case 'task-board': return CheckSquare;
      case 'ai-log': return ListTodo;
      case 'council': return Users2;
      case 'meetings': return Calendar;
      default: return LayoutDashboard;
    }
  };

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? '80px' : '280px' }}
      className="fixed left-0 top-0 h-screen premium-sidebar z-50 flex flex-col"
    >
      <div className="p-6 flex items-center justify-between overflow-hidden">
        {!isCollapsed && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded-lg bg-primary-accent flex items-center justify-center text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]">
              <span className="font-black text-xl">C</span>
            </div>
            <span className="font-bold text-xl tracking-tighter text-white">ClawBuddy</span>
          </motion.div>
        )}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-muted transition-colors"
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
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
              {isActive && (
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
        {!isCollapsed && (
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
    </motion.aside>
  );
};

export default Sidebar;
