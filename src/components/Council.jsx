import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { councilSessions } from '../data/mockData';
import { ChevronDown, MessageSquare, Shield, Users, Timer, Sparkles, Users2 } from 'lucide-react';

const Council = () => {
  const [expandedSession, setExpandedSession] = useState(1);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between px-2">
        <div>
          <h2 className="text-2xl font-black text-white glow-text-primary tracking-tighter">High Council</h2>
          <p className="text-xs text-muted font-bold uppercase tracking-widest opacity-60">Consensus-driven autonomous decision layer</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-primary-accent/10 border border-primary-accent/20 rounded-xl flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary-accent pulse-glow" />
            <span className="text-[10px] font-bold text-white uppercase tracking-tighter">Quorum Reached</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-card p-8 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-accent/5 blur-3xl -mr-32 -mt-32 group-hover:bg-primary-accent/10 transition-colors" />
          <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-8 opacity-60 flex items-center gap-2">
            <Sparkles size={14} className="text-primary-accent" />
            Active Propositions
          </h3>
          <div className="space-y-6">
            {[
              { title: 'Fleet Expansion Protocol', support: 84, time: '2m ago' },
              { title: 'Resource Allocation v3', support: 92, time: '12m ago' },
              { title: 'Ethical Barrier Audit', support: 100, time: '1h ago' }
            ].map((prop, i) => (
              <div key={i} className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/5 hover:border-white/10 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-bold text-white tracking-tight">{prop.title}</h4>
                  <span className="text-[10px] text-muted font-mono">{prop.time}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${prop.support}%` }}
                      transition={{ duration: 1, delay: i * 0.2 }}
                      className="h-full bg-primary-accent shadow-[0_0_10px_rgba(16,185,129,0.4)]"
                    />
                  </div>
                  <span className="text-xs font-bold text-primary-accent glow-text-primary">{prop.support}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-8 shadow-2xl flex flex-col items-center justify-center text-center space-y-6">
          <div className="w-24 h-24 rounded-full bg-primary-accent/10 flex items-center justify-center border border-primary-accent/20 pulse-glow mb-2">
            <Users2 size={40} className="text-primary-accent" />
          </div>
          <div>
            <h4 className="text-xl font-bold text-white mb-2">Council Deliberation</h4>
            <p className="text-sm text-muted max-w-xs mx-auto leading-relaxed">The High Council is currently analyzing Fleet Beta performance metrics. Consensus expected in 4m 12s.</p>
          </div>
          <button className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold uppercase tracking-widest text-white transition-all hover:scale-105 active:scale-95 shadow-lg">
            View Analytics
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {councilSessions.map((session) => (
          <div key={session.id} className="glass-card overflow-hidden">
            <button
              onClick={() => setExpandedSession(expandedSession === session.id ? null : session.id)}
              className="w-full p-6 flex items-start justify-between text-left hover:bg-white/5 transition-colors"
            >
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    session.status === 'active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-slate-500/10 text-slate-400 border border-slate-500/20'
                  }`}>
                    {session.status}
                  </span>
                  <div className="flex items-center gap-1 text-[10px] text-muted font-bold uppercase">
                    <MessageSquare size={12} />
                    {session.messages.length} Messages
                  </div>
                </div>
                
                <h3 className="text-lg font-bold text-white group-hover:text-primary-accent transition-colors">
                  {session.question}
                </h3>

                <div className="flex flex-wrap gap-2">
                  {session.participants.map((p) => (
                    <div key={p.name} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/5 group/p">
                      <span className="text-sm">{p.emoji}</span>
                      <span className="text-xs font-medium text-white/80">{p.name}</span>
                      <div className="flex items-center gap-1 text-[10px] text-muted uppercase tracking-tighter ml-1">
                        <span className="text-emerald-400">{p.sent}</span>/{p.limit}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <ChevronDown 
                className={`text-muted transition-transform duration-300 ${expandedSession === session.id ? 'rotate-180' : ''}`} 
                size={20} 
              />
            </button>

            <AnimatePresence>
              {expandedSession === session.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-t border-white/5 bg-white/[0.02]"
                >
                  <div className="p-6 space-y-6 max-h-[500px] overflow-y-auto custom-scrollbar">
                    {session.messages.map((msg, idx) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex gap-4 items-start"
                      >
                        <div className="w-8 h-8 rounded-lg bg-surface-border flex items-center justify-center text-lg shrink-0">
                          {msg.agentEmoji}
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-white">{msg.agentName}</span>
                              <span className="text-[10px] text-muted-foreground bg-white/5 px-1.5 rounded">#{msg.msgNum}</span>
                            </div>
                            <span className="text-[10px] text-muted">{msg.time}</span>
                          </div>
                          <div className="p-3 rounded-xl rounded-tl-none bg-surface/80 border border-white/5 text-sm text-muted leading-relaxed">
                            {msg.text}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    
                    {session.status === 'active' && (
                      <div className="flex items-center gap-2 text-[10px] text-emerald-400 font-bold uppercase tracking-widest pl-12 animate-pulse">
                        <Timer size={12} />
                        Agent Alpha is typing...
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Council;
