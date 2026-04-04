import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Terminal as TerminalIcon, Shield, Zap, Cpu, History } from 'lucide-react';

const Terminal = ({ isOpen, onClose, agents }) => {
  const [history, setHistory] = useState([
    { type: 'system', text: 'ClawMatrix Neural Terminal [Version 4.8.2]' },
    { type: 'system', text: '(c) 2026 Antigravity Systems. All rights reserved.' },
    { type: 'system', text: 'Type "/help" for available commands.' },
    { type: 'system', text: '' },
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim().toLowerCase();
    const newHistory = [...history, { type: 'user', text: `> ${input}` }];

    // Command Logic
    if (cmd === '/help') {
      newHistory.push({ type: 'info', text: 'Available Commands:' });
      newHistory.push({ type: 'info', text: '  /status       - Show system-wide agent status' });
      newHistory.push({ type: 'info', text: '  /agents       - List all active agents and their levels' });
      newHistory.push({ type: 'info', text: '  /clear        - Clear terminal history' });
      newHistory.push({ type: 'info', text: '  /whoami       - Display current commander credentials' });
      newHistory.push({ type: 'info', text: '  /deploy [id]  - Manually trigger agent neural sync' });
    } else if (cmd === '/status') {
      newHistory.push({ type: 'success', text: 'STATUS: OPTIMAL' });
      newHistory.push({ type: 'info', text: 'CPU Load: 42.4 tps | Memory: 3.2PB | Sync: 12ms' });
    } else if (cmd === '/agents') {
      agents.forEach(agent => {
        newHistory.push({ type: 'info', text: `[${agent.id}] ${agent.name} - LVL ${agent.level} (${agent.status})` });
      });
    } else if (cmd === '/clear') {
      setHistory([{ type: 'system', text: 'History cleared.' }]);
      setInput('');
      return;
    } else if (cmd === '/whoami') {
      newHistory.push({ type: 'info', text: 'USER: Commander Rex' });
      newHistory.push({ type: 'info', text: 'RANK: Fleet Admiral (Level 48)' });
    } else if (cmd.startsWith('/deploy')) {
      const id = cmd.split(' ')[1];
      if (id) {
        newHistory.push({ type: 'success', text: `Initiating neural sync for ${id}...` });
        setTimeout(() => {
          setHistory(prev => [...prev, { type: 'success', text: `Sync complete for ${id}. 100% data integrity verified.` }]);
        }, 1500);
      } else {
        newHistory.push({ type: 'error', text: 'Usage: /deploy [agent-id]' });
      }
    } else {
      newHistory.push({ type: 'error', text: `Unknown command: "${cmd}". Type "/help" for assistance.` });
    }

    setHistory(newHistory);
    setInput('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-2xl bg-[#0a0a0f] border-l border-white/10 z-[60] flex flex-col shadow-2xl"
          >
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/5">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary-accent/10 text-primary-accent">
                  <TerminalIcon size={18} />
                </div>
                <div>
                  <h3 className="font-black text-white uppercase tracking-wider text-sm">Neural Command Interface</h3>
                  <p className="text-[10px] text-muted font-bold uppercase tracking-widest leading-none">Security Level: 10 (Encrypted)</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-xl text-muted hover:text-white transition-all"
              >
                <X size={20} />
              </button>
            </div>

            {/* Terminal Content */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 font-mono text-sm space-y-1 custom-scrollbar selection:bg-primary-accent/30"
            >
              {history.map((line, i) => (
                <div 
                  key={i} 
                  className={`${
                    line.type === 'user' ? 'text-white font-bold' : 
                    line.type === 'info' ? 'text-blue-400' :
                    line.type === 'success' ? 'text-emerald-400' :
                    line.type === 'error' ? 'text-red-400' :
                    'text-muted'
                  }`}
                >
                  {line.text}
                </div>
              ))}
            </div>

            {/* Terminal Input */}
            <form onSubmit={handleCommand} className="p-6 bg-white/5 border-t border-white/5">
              <div className="flex items-center gap-3">
                <span className="text-primary-accent font-black select-none">λ</span>
                <input 
                  autoFocus
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Enter command..."
                  className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-white/10"
                />
              </div>
            </form>

            <div className="px-6 py-2 border-t border-white/5 flex items-center justify-between text-[9px] font-bold text-muted uppercase tracking-widest">
              <div className="flex gap-4">
                <div className="flex items-center gap-1.5"><Shield size={10} className="text-emerald-500" /> SECURE</div>
                <div className="flex items-center gap-1.5"><Zap size={10} className="text-amber-500" /> 12MS</div>
                <div className="flex items-center gap-1.5"><Cpu size={10} /> CORE-1</div>
              </div>
              <div className="flex items-center gap-1.5"><History size={10} /> SESSION: {new Date().toLocaleTimeString()}</div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Terminal;
