import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, Bot, User, MessageSquare, Shield, 
  Sparkles, Terminal, Cpu, Zap, Radio
} from 'lucide-react';

const CommunicationHub = ({ agents }) => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Nexus-7', type: 'agent', text: 'Spectral integrity check at 98.4%. Proceeding with kernel sync.', time: '22:42:01' },
    { id: 2, sender: 'Alpha-9', type: 'agent', text: 'Wait. Ghost-logic detected in Sector 4. Holding sync.', time: '22:42:05' },
    { id: 3, sender: 'Nexus-7', type: 'agent', text: 'Sector 4 logic cleared. It was a phantom trace. Resuming.', time: '22:42:10' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    
    const newMsg = {
      id: Date.now(),
      sender: 'Commander',
      type: 'user',
      text: inputValue,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    };
    
    setMessages(prev => [...prev, newMsg]);
    setInputValue('');

    // Simulate agent response
    setTimeout(() => {
      const response = {
        id: Date.now() + 1,
        sender: 'Nexus-7',
        type: 'agent',
        text: 'Acknowledged, Commander. Priority override received. Recalibrating neural weights.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      };
      setMessages(prev => [...prev, response]);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] lg:h-[calc(100vh-180px)] space-y-4 lg:space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between px-2">
        <div>
          <h2 className="text-xl lg:text-2xl font-black text-white glow-text-primary tracking-tighter uppercase">Neural Communication</h2>
          <p className="text-[10px] text-muted font-bold tracking-widest mt-1 opacity-60 hidden sm:block">Inter-agent whisper streams and commander override portal</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg">
            <Radio size={12} className="text-cyan-accent animate-pulse" />
            <span className="text-[10px] font-black text-white uppercase tracking-tighter">Live Stream</span>
          </div>
        </div>
      </div>

      <div className="flex-1 glass-card flex flex-col overflow-hidden bg-background-custom/40 border-white/5">
        {/* Chat Header */}
        <div className="px-6 py-4 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-primary-accent/10 border border-primary-accent/20 flex items-center justify-center text-primary-accent">
              <MessageSquare size={18} />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-widest">Spectral Logic Channel</h3>
              <p className="text-[10px] text-muted font-bold uppercase tracking-tighter opacity-60">Active Agents: {agents?.length || 0}</p>
            </div>
          </div>
          <Shield size={16} className="text-muted opacity-40" />
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex items-start gap-4 ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${
                msg.type === 'user' 
                  ? 'bg-cyan-accent/10 border-cyan-accent/30 text-cyan-accent shadow-[0_0_15px_rgba(6,182,212,0.2)]' 
                  : 'bg-primary-accent/10 border-primary-accent/30 text-primary-accent shadow-[0_0_15px_rgba(16,185,129,0.2)]'
              }`}>
                {msg.type === 'user' ? <User size={18} /> : <Bot size={18} />}
              </div>
              <div className={`max-w-[85%] lg:max-w-[70%] space-y-2 ${msg.type === 'user' ? 'text-right' : ''}`}>
                <div className="flex items-center gap-3 justify-start flex-row-reverse">
                  <span className="text-[10px] font-black text-white uppercase tracking-wider">{msg.sender}</span>
                  <span className="text-[9px] font-bold text-muted uppercase tracking-tighter opacity-40">{msg.time}</span>
                </div>
                <div className={`p-4 rounded-2xl border text-sm font-medium leading-relaxed ${
                  msg.type === 'user'
                    ? 'bg-white/5 border-white/10 text-white rounded-tr-none'
                    : 'bg-white/[0.02] border-white/5 text-white/80 rounded-tl-none shadow-xl'
                }`}>
                  {msg.text}
                </div>
                {msg.type === 'agent' && (
                  <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-primary-accent/60 mt-1">
                    <Cpu size={10} />
                    Verified Neural Trace
                  </div>
                )}
              </div>
            </motion.div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-6 border-t border-white/5 bg-white/[0.01]">
          <div className="relative group">
            <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary-accent/20 to-transparent" />
            <div className="flex gap-4">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Direct manual override to entire swarm..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-sm text-white placeholder:text-muted/30 focus:outline-none focus:border-primary-accent/50 focus:bg-white/10 transition-all"
              />
              <button
                onClick={handleSend}
                className="w-12 h-12 rounded-xl bg-primary-accent text-background-custom flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:scale-105 active:scale-95 transition-all group-hover:shadow-[0_0_30px_rgba(16,185,129,0.6)]"
              >
                <Send size={18} />
              </button>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-6">
                <button className="flex items-center gap-2 text-[10px] font-black text-muted hover:text-white uppercase tracking-widest transition-colors">
                  <Zap size={12} className="text-amber-accent" />
                  Priority Flash
                </button>
                <button className="flex items-center gap-2 text-[10px] font-black text-muted hover:text-white uppercase tracking-widest transition-colors">
                  <Shield size={12} className="text-indigo-accent" />
                  Security Lock
                </button>
              </div>
              <div className="text-[10px] font-black text-muted/30 uppercase tracking-widest">
                Press ↵ to Execute
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunicationHub;
