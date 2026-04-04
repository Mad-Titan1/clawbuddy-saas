import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, ChevronLeft, ChevronRight, RotateCcw, 
  Lock, Globe, Search, ArrowRight, Activity,
  Terminal as TerminalIcon, MousePointer2, ExternalLink
} from 'lucide-react';

const LiveBrowser = ({ agent, isOpen, onClose }) => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isOpen && agent?.browsingState?.active) {
      setUrl(agent.browsingState.url);
      setLoading(true);
      setProgress(0);
      
      const timer = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setLoading(false);
            clearInterval(timer);
            return 100;
          }
          return prev + Math.random() * 15;
        });
      }, 100);
      
      return () => clearInterval(timer);
    }
  }, [isOpen, agent]);

  if (!isOpen || !agent) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-12">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-background-custom/80 backdrop-blur-md"
        />
        
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="w-full max-w-6xl h-full max-h-[800px] glass-card flex flex-col overflow-hidden border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] z-10"
        >
          {/* Browser Header */}
          <div className="h-12 bg-white/5 border-b border-white/10 flex items-center px-4 gap-4 flex-shrink-0">
            <div className="flex gap-1.5 px-2">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-amber-500/50" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
            </div>
            
            <div className="flex items-center gap-1">
              <button className="p-1.5 rounded hover:bg-white/5 text-muted transition-colors"><ChevronLeft size={16} /></button>
              <button className="p-1.5 rounded hover:bg-white/5 text-muted transition-colors"><ChevronRight size={16} /></button>
              <button className="p-1.5 rounded hover:bg-white/5 text-muted transition-colors"><RotateCcw size={16} /></button>
            </div>
            
            <div className="flex-1 max-w-2xl mx-auto flex items-center gap-3 px-4 py-1.5 bg-background-custom/40 rounded-lg border border-white/5 text-xs text-white/50 font-medium relative group">
              <Lock size={12} className="text-emerald-500/70" />
              <span className="truncate group-hover:text-white transition-colors">{url}</span>
              {loading && (
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="absolute bottom-0 left-0 h-[1px] bg-primary-accent" 
                />
              )}
            </div>
            
            <button 
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-red-500/20 text-white transition-all ml-auto"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 flex overflow-hidden">
            {/* Sidebar Stats */}
            <div className="w-64 border-r border-white/5 bg-white/[0.02] p-6 hidden lg:flex flex-col gap-6">
              <div>
                <h4 className="text-[10px] font-black text-muted uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                  <Activity size={12} className="text-primary-accent" />
                  Neural Perspective
                </h4>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-2xl border border-white/10">
                    {agent.emoji}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white uppercase">{agent.name}</p>
                    <p className="text-[9px] text-muted font-black uppercase tracking-widest">{agent.role}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <p className="text-[9px] font-black text-muted uppercase tracking-widest mb-1">Active Objective</p>
                  <p className="text-[11px] font-bold text-white leading-relaxed">{agent.browsingState?.action || 'Neutral Monitoring'}</p>
                </div>
                
                <div className="p-3 rounded-xl bg-primary-accent/5 border border-primary-accent/10">
                  <p className="text-[9px] font-black text-primary-accent uppercase tracking-widest mb-1">Scanning Phase</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[11px] font-bold text-white">DOM Extraction</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-primary-accent/20 text-primary-accent font-black">STEP {agent.browsingState?.step || 1}</span>
                  </div>
                </div>
              </div>

              <div className="mt-auto pt-6 border-t border-white/5">
                <div className="flex items-center justify-between text-[10px] font-bold text-muted uppercase mb-4">
                  <span>Latency</span>
                  <span className="text-emerald-400">12ms</span>
                </div>
                <div className="flex items-center justify-between text-[10px] font-bold text-muted uppercase">
                  <span>Packet Drop</span>
                  <span className="text-white/50">0.00%</span>
                </div>
              </div>
            </div>

            {/* Main Content Area (Mock Webpage) */}
            <div className="flex-1 bg-[#0a0a0f] relative overflow-y-auto custom-scrollbar">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />
              
              {loading ? (
                <div className="h-full flex flex-col items-center justify-center gap-4">
                  <div className="w-12 h-12 border-4 border-primary-accent/20 border-t-primary-accent rounded-full animate-spin" />
                  <p className="text-[10px] font-black text-muted uppercase tracking-[0.4em] animate-pulse">Establishing Secure Tunnel</p>
                </div>
              ) : (
                <div className="p-12 space-y-8 animate-in fade-in duration-1000">
                  {/* Mock Site Content */}
                  <div className="max-w-3xl mx-auto space-y-12">
                    <div className="flex items-center gap-4 border-b border-white/10 pb-8">
                       <div className="w-12 h-12 rounded bg-white/10 flex items-center justify-center text-2xl font-black italic">gh</div>
                       <div>
                         <p className="text-sm font-bold text-white/50 tracking-tight">microsoft / autogen</p>
                         <h1 className="text-3xl font-black text-white tracking-widest uppercase glow-text-primary">Issue #142</h1>
                       </div>
                    </div>

                    <div className="space-y-6">
                      <div className="p-6 rounded-2xl bg-white/5 border border-white/10 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-60 transition-opacity">
                            <MousePointer2 size={16} className="text-primary-accent" />
                        </div>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-xs font-bold text-indigo-400">JD</div>
                          <p className="text-xs font-bold text-white">jdoe_dev <span className="text-muted font-medium ml-2">commented 2 days ago</span></p>
                        </div>
                        <p className="text-sm text-white/70 leading-relaxed font-mono">
                          I've noticed that when running multi-agent orchestrations with large histories, the protocol sync starts to lag. We need to implement a selective state hydration mechanism.
                        </p>
                        
                        {/* Agent Interaction Hover */}
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="absolute inset-0 border-2 border-primary-accent/30 pointer-events-none"
                        />
                        <div className="absolute top-2 left-2 px-2 py-1 bg-primary-accent text-white text-[8px] font-black uppercase tracking-widest rounded-md flex items-center gap-1">
                          <Search size={8} /> SCANNING SEGMENT
                        </div>
                      </div>

                      <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-xs font-bold text-emerald-400">DS</div>
                          <p className="text-xs font-bold text-white">dev_shane <span className="text-muted font-medium ml-2">commented 18 hours ago</span></p>
                        </div>
                        <p className="text-sm text-white/50 leading-relaxed font-mono italic">
                          "Attached is a log of the sync failure (sync_log_v2.txt)..."
                        </p>
                      </div>
                    </div>

                    <div className="pt-8 space-y-4">
                       <h3 className="text-xs font-black text-muted uppercase tracking-[0.2em]">Agent Action Terminal</h3>
                       <div className="p-4 rounded-xl bg-black/50 border border-white/10 font-mono text-[10px] space-y-1">
                          <p className="text-emerald-500 flex items-center gap-2"><TerminalIcon size={12} /> agent@clawmatrix:~$ web-inspect --target=".comment-body"</p>
                          <p className="text-white/60 pl-6">» Executing CSS selector scan...</p>
                          <p className="text-white/60 pl-6">» Found 12 matching nodes.</p>
                          <p className="text-cyan-400 pl-6 animate-pulse">» Extracting semantic insight from Node #1...</p>
                       </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Neural Controls Footer */}
          <div className="h-14 border-t border-white/10 bg-white/5 px-8 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                 <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Live Feed</span>
              </div>
              <div className="h-4 w-[1px] bg-white/10" />
              <div className="flex items-center gap-4 text-muted">
                <button className="hover:text-white transition-colors"><Search size={14} /></button>
                <button className="hover:text-white transition-colors"><TerminalIcon size={14} /></button>
                <button className="hover:text-white transition-colors text-primary-accent"><Activity size={14} /></button>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-[10px] font-black text-white uppercase tracking-widest hover:bg-white/10 transition-all">
                Pause Sentinel
              </button>
              <button 
                onClick={onClose}
                className="px-6 py-2 rounded-lg bg-primary-accent text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-emerald-500/20 hover:scale-105 transition-all"
              >
                Terminate Link
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default LiveBrowser;
