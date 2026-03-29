import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Search } from 'lucide-react';

const categories = [
  { id: 'all', label: 'All Logs', color: 'gray' },
  { id: 'observation', label: 'Observation', color: 'emerald' },
  { id: 'fyi', label: 'FYI', color: 'cyan' },
  { id: 'reminder', label: 'Reminder', color: 'amber' },
  { id: 'general', label: 'General', color: 'gray' }
];

const categoryStyles = {
  observation: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  fyi: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  reminder: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  general: 'bg-slate-500/10 text-slate-400 border-slate-500/20'
};

const AILog = ({ logs }) => {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filteredLogs = logs.filter(log => {
    const matchesFilter = filter === 'all' || log.category === filter;
    const matchesSearch = log.text.toLowerCase().includes(search.toLowerCase()) || 
                         log.agent.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex gap-2 overflow-x-auto no-scrollbar w-full md:w-auto">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap border ${
                filter === cat.id 
                  ? 'bg-white/10 border-white/20 text-white' 
                  : 'bg-transparent border-white/5 text-muted hover:text-white hover:bg-white/5'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
        
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
          <input
            type="text"
            placeholder="Search logs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-surface/50 border border-surface-border rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-primary-accent/50 transition-colors"
          />
        </div>
      </div>

      <div className="space-y-4 max-h-[700px] overflow-y-auto pr-4 custom-scrollbar">
        <AnimatePresence mode="popLayout">
          {filteredLogs.map((log, idx) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: idx * 0.05 }}
              className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/5 hover:border-white/10 transition-all group shadow-sm flex items-start gap-5"
            >
              <div className="w-12 h-12 rounded-xl bg-surface-border flex items-center justify-center text-2xl group-hover:scale-110 transition-transform shadow-inner border border-white/5">
                {log.agentEmoji || '🤖'}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-lg pulse-glow ${categoryStyles[log.category]}`}>
                    {log.category}
                  </span>
                  <span className="text-[10px] text-muted font-mono font-bold">just now</span>
                </div>
                <p className="text-sm font-medium text-white/90 group-hover:text-white transition-colors leading-relaxed tracking-tight">
                  {log.text}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {filteredLogs.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-muted text-sm">No log entries found for this filter.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AILog;
