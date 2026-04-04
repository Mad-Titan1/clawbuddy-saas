import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Cpu, Activity, Database, Zap, HardDrive, ShieldAlert, 
  Terminal, BarChart3, Binary, CloudLightning
} from 'lucide-react';

const StatBox = ({ label, value, subtext, icon: Icon, color }) => (
  <div className="glass-card p-6 flex items-start justify-between group transition-all duration-500 hover:border-white/10">
    <div>
      <p className="text-[10px] text-muted font-black uppercase tracking-widest opacity-60 mb-2">{label}</p>
      <p className="text-2xl font-black text-white tracking-tighter mb-1">{value}</p>
      <p className={`text-[10px] font-bold ${color} opacity-80`}>{subtext}</p>
    </div>
    <div className={`p-3 rounded-xl bg-${color.split('-')[1]}/10 text-${color.split('-')[1]} border border-${color.split('-')[1]}/20 shadow-lg group-hover:scale-110 transition-transform`}>
      <Icon size={20} />
    </div>
  </div>
);

const ResourceMonitor = () => {
  const [load, setLoad] = useState(42.4);
  const [memory, setMemory] = useState(64.2);
  const [log, setLog] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoad(l => +(l + (Math.random() - 0.5) * 4).toFixed(1));
      setMemory(m => +(m + (Math.random() - 0.5) * 2).toFixed(1));
      
      const events = [
        'NEURAL_BUFFER_FLUSH', 'SPECTRAL_DATA_SYNC', 'TOKEN_ENRICHMENT_COMPLETE',
        'KERNEL_OPTIMIZATION', 'HIVE_CONCURRENCY_PEAK', 'LATENCY_SPIKE_RESOLVED'
      ];
      const newEntry = `[${new Date().toLocaleTimeString()}] ${events[Math.floor(Math.random() * events.length)]} - ADMIRAL_LEVEL_OVERRIDE`;
      setLog(prev => [newEntry, ...prev].slice(0, 15));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12">
      <div className="flex items-center justify-between px-2">
        <div>
          <h2 className="text-2xl font-black text-white glow-text-primary tracking-tighter uppercase">System Telemetry</h2>
          <p className="text-xs text-muted font-bold tracking-widest mt-1 opacity-60">Low-level neural hardware and spectral resource orchestration</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-2">
            <Activity size={14} className="text-emerald-400 animate-pulse" />
            <span className="text-[10px] font-black text-white uppercase tracking-tighter">System Nominal</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatBox label="Neural Load" value={`${load} TPS`} subtext="+4.2% Peak" icon={Cpu} color="text-emerald-400" />
        <StatBox label="Memory Allocation" value={`${memory}%`} subtext="Buffer: 12.4GB" icon={Database} color="text-cyan-400" />
        <StatBox label="Token Throughput" value="1.2M/min" subtext="Stable Stream" icon={Zap} color="text-amber-400" />
        <StatBox label="Security Integrity" value="99.99%" subtext="Shields Active" icon={ShieldAlert} color="text-indigo-400" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-card p-8 shadow-2xl relative overflow-hidden group min-h-[400px]">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-accent/5 blur-3xl -mr-32 -mt-32 group-hover:bg-primary-accent/10 transition-colors" />
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xs font-bold text-white uppercase tracking-widest opacity-60 flex items-center gap-2">
              <BarChart3 size={14} className="text-primary-accent" />
              Spectral Frequency Analysis
            </h3>
          </div>
          <div className="flex items-end gap-1.5 h-64">
            {[...Array(40)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ height: 20 }}
                animate={{ height: Math.random() * 100 + 40 }}
                transition={{ 
                  repeat: Infinity, 
                  repeatType: "reverse", 
                  duration: 0.8 + Math.random(),
                  delay: i * 0.02
                }}
                className={`flex-1 rounded-t-sm ${i > 25 ? 'bg-cyan-accent/40' : 'bg-primary-accent/40'} border-t border-white/10`}
              />
            ))}
          </div>
          <div className="flex items-center justify-between mt-6 text-[9px] font-bold text-muted uppercase tracking-widest opacity-40">
            <span>0hz - Base Layer</span>
            <span>2.4Ghz - Spectral Peak</span>
            <span>5.0Ghz - Neural Burst</span>
          </div>
        </div>

        <div className="glass-card p-8 shadow-2xl bg-black/40 border-white/5 flex flex-col h-full">
          <h3 className="text-xs font-bold text-white uppercase tracking-widest opacity-60 mb-6 flex items-center gap-2">
            <Terminal size={14} className="text-amber-accent" />
            System Kernel Log
          </h3>
          <div className="flex-1 font-mono text-[10px] space-y-3 overflow-hidden">
            {log.map((entry, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1 - idx * 0.05, x: 0 }}
                className={idx === 0 ? 'text-primary-accent font-black' : 'text-muted'}
              >
                {entry}
              </motion.div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2 text-[9px] font-black text-white uppercase opacity-40">
              <Binary size={12} />
              Hex Output: 0x4f...2a
            </div>
            <CloudLightning size={14} className="text-primary-accent animate-pulse" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-card p-8 flex items-center gap-8 relative overflow-hidden group">
          <div className="p-4 rounded-2xl bg-white/5 text-primary-accent border border-white/10 shadow-lg group-hover:rotate-12 transition-transform">
            <HardDrive size={32} />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-black text-white uppercase tracking-widest">Cold Storage Indexing</span>
              <span className="text-xs font-bold text-primary-accent">82%</span>
            </div>
            <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '82%' }}
                className="h-full bg-gradient-to-r from-primary-accent to-cyan-accent shadow-[0_0_15px_rgba(16,185,129,0.5)]"
              />
            </div>
          </div>
        </div>
        <div className="glass-card p-8 flex items-center gap-8 relative overflow-hidden group cursor-pointer hover:bg-white/[0.03]">
          <div className="p-4 rounded-2xl bg-white/5 text-amber-accent border border-white/10 shadow-lg group-hover:scale-110 transition-transform">
            <Activity size={32} />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-black text-white uppercase tracking-widest mb-1">System Audit In Progress</h4>
            <p className="text-[10px] text-muted font-bold opacity-60 leading-relaxed uppercase">Scouring neural kernels for spectral anomalies and ghost-logic segments...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceMonitor;
