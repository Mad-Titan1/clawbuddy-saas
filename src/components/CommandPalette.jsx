import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Command, LayoutDashboard, Users, CheckSquare, 
  ListTodo, Network, Users2, Calendar, Zap, Plus, 
  LogOut, Settings, Bell, Globe
} from 'lucide-react';

const CommandPalette = ({ isOpen, setIsOpen, tabs, activeTab, onTabChange, agents, tasks }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const items = useMemo(() => {
    const list = [
      // Navigation
      ...tabs.map(t => ({ id: t.id, label: `Go to ${t.label}`, type: 'nav', icon: Network })),
      // Actions
      { id: 'add-task', label: 'Create New Task', type: 'action', icon: Plus },
      { id: 'deploy-agent', label: 'Deploy New Agent', type: 'action', icon: Zap },
      { id: 'logout', label: 'Logout Session', type: 'action', icon: LogOut },
      // Agents
      ...(agents || []).map(a => ({ id: `agent-${a.id}`, label: `View Agent: ${a.name}`, type: 'agent', icon: Users })),
      // Tasks
      ...(tasks || []).slice(0, 5).map(t => ({ id: `task-${t.id}`, label: `View Task: ${t.title}`, type: 'task', icon: CheckSquare }))
    ];

    if (!query) return list;
    return list.filter(item => 
      item.label.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, tabs, agents, tasks]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleSelect = useCallback((item) => {
    if (!item) return;

    if (item.type === 'nav') {
      onTabChange(item.id);
    } else if (item.type === 'agent') {
      onTabChange('agents'); // In a real app, this might open a specific agent profile
    } else if (item.type === 'task') {
      onTabChange('task-board');
    }

    setIsOpen(false);
  }, [onTabChange, setIsOpen]);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % items.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + items.length) % items.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      handleSelect(items[selectedIndex]);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="fixed left-1/2 top-[15%] -translate-x-1/2 w-full max-w-2xl glass-card border-white/10 shadow-[0_32px_128px_rgba(0,0,0,0.8)] z-[101] overflow-hidden"
          >
            <div className="flex items-center gap-4 px-6 py-4 border-b border-white/5 bg-white/[0.02]">
              <Search className="text-primary-accent" size={20} />
              <input
                ref={inputRef}
                type="text"
                placeholder="Type a command or search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="bg-transparent border-none outline-none text-lg text-white placeholder:text-muted/30 w-full font-medium"
              />
              <div className="flex items-center gap-1.5 px-2 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] text-muted font-mono font-black">
                ESC
              </div>
            </div>

            <div className="max-h-[450px] overflow-y-auto p-2 custom-scrollbar">
              {items.length === 0 ? (
                <div className="p-12 text-center">
                  <Globe size={32} className="mx-auto text-muted mb-4 opacity-20" />
                  <p className="text-sm text-muted font-bold uppercase tracking-widest">No results found for "{query}"</p>
                </div>
              ) : (
                <div className="space-y-1">
                  {items.map((item, index) => {
                    const Icon = item.icon;
                    const isSelected = index === selectedIndex;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleSelect(item)}
                        onMouseEnter={() => setSelectedIndex(index)}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                          isSelected ? 'bg-primary-accent text-background-custom shadow-lg scale-[1.01]' : 'text-white/60 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <Icon size={18} />
                          <span className="text-sm font-bold tracking-tight">{item.label}</span>
                        </div>
                        {isSelected && (
                          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest opacity-60">
                            Enter
                            <Command size={10} />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="px-6 py-4 border-t border-white/5 bg-white/[0.02] flex items-center justify-between text-[10px] font-black text-muted uppercase tracking-[0.2em]">
              <div className="flex gap-6">
                <span className="flex items-center gap-2"><span className="px-1.5 py-0.5 bg-white/10 rounded">↑↓</span> To Navigate</span>
                <span className="flex items-center gap-2"><span className="px-1.5 py-0.5 bg-white/10 rounded">↵</span> To Select</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap size={12} className="text-primary-accent" />
                Spectral Engine Active
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};


export default CommandPalette;
