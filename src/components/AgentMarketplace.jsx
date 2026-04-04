import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, Shield, Cpu, Target, Rocket, Search, 
  Terminal, Sparkles, Plus, CheckCircle2, Clock
} from 'lucide-react';

const ArchetypeCard = ({ archetype, onDeploy }) => {
  const [isDeploying, setIsDeploying] = useState(false);
  const [isDeployed, setIsDeployed] = useState(false);

  const handleDeploy = () => {
    setIsDeploying(true);
    setTimeout(() => {
      setIsDeploying(false);
      setIsDeployed(true);
      onDeploy(archetype);
    }, 3000);
  };

  return (
    <div className="glass-card p-6 flex flex-col h-full group relative overflow-hidden transition-all duration-500 hover:border-primary-accent/30 hover:shadow-[0_0_30px_rgba(16,185,129,0.1)]">
      {/* Background Accent */}
      <div className={`absolute -right-12 -top-12 w-32 h-32 blur-3xl opacity-10 transition-opacity group-hover:opacity-20 bg-${archetype.color}`} />
      
      <div className="flex items-start justify-between mb-6">
        <div className={`w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl group-hover:scale-110 transition-all duration-500`}>
          {archetype.avatar}
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Archetype</span>
          <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[9px] font-bold text-white tracking-tighter uppercase">{archetype.tier} Tier</span>
        </div>
      </div>

      <div className="flex-1 space-y-4">
        <div>
          <h3 className="text-lg font-black text-white uppercase tracking-tight group-hover:text-primary-accent transition-colors">The {archetype.name}</h3>
          <p className="text-xs text-muted font-medium mt-1 leading-relaxed">{archetype.description}</p>
        </div>

        <div className="grid grid-cols-2 gap-3 py-4 border-y border-white/5">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-[9px] font-black text-muted uppercase tracking-widest">
              <Cpu size={10} /> Neural
            </div>
            <div className="text-sm font-bold text-white">{archetype.stats.neural}</div>
          </div>
          <div className="space-y-1 text-right">
            <div className="flex items-center gap-1.5 justify-end text-[9px] font-black text-muted uppercase tracking-widest">
              <Zap size={10} /> Speed
            </div>
            <div className="text-sm font-bold text-white">{archetype.stats.speed}</div>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em]">Core Specialties</p>
          <div className="flex flex-wrap gap-2">
            {archetype.specialties.map((s, idx) => (
              <span key={idx} className="px-2 py-0.5 rounded-lg bg-white/5 border border-white/5 text-[9px] font-bold text-white/70 uppercase tracking-tighter hover:bg-white/10 transition-colors">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8">
        <button
          disabled={isDeploying || isDeployed}
          onClick={handleDeploy}
          className={`w-full py-3.5 rounded-xl font-black text-[10px] uppercase tracking-[0.3em] transition-all relative overflow-hidden flex items-center justify-center gap-3 ${
            isDeployed ? 'bg-white/5 text-muted border border-white/10 cursor-default' : 
            isDeploying ? 'bg-white/5 text-white cursor-wait' :
            'bg-primary-accent text-background-custom shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] active:scale-95'
          }`}
        >
          {isDeploying ? (
            <>
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
              >
                <Clock size={14} />
              </motion.div>
              SYNCHRONIZING...
            </>
          ) : isDeployed ? (
            <>
              <CheckCircle2 size={14} className="text-emerald-500" />
              DEPLOYED
            </>
          ) : (
            <>
              <Rocket size={14} />
              DEPLO-SYST-CMD
            </>
          )}
          {isDeploying && (
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ duration: 3, ease: 'linear' }}
              className="absolute inset-0 bg-white/10 pointer-events-none"
            />
          )}
        </button>
      </div>
    </div>
  );
};

const marketArchetypes = [
  {
    id: 'arch-1',
    name: 'Architect',
    avatar: '🏗️',
    tier: 'Executive',
    description: 'Specializes in cross-modular system design and workflow orchestration patterns.',
    color: 'primary-accent',
    stats: { neural: '98.2', speed: '4.2ms' },
    specialties: ['Structural Logic', 'Governance', 'Optimization']
  },
  {
    id: 'arch-2',
    name: 'Auditor',
    avatar: '🔎',
    tier: 'Strategic',
    description: 'Scours neural streams for spectral anomalies and ghost-logic segments.',
    color: 'amber-accent',
    stats: { neural: '94.5', speed: '12ms' },
    specialties: ['Anomaly Detection', 'Security', 'Validation']
  },
  {
    id: 'arch-3',
    name: 'Closer',
    avatar: '⚡',
    tier: 'Tactical',
    description: 'High-throughput execution unit optimized for rapid task finalization.',
    color: 'cyan-accent',
    stats: { neural: '88.0', speed: '0.8ms' },
    specialties: ['Execution', 'Latency Redux', 'Throughput']
  },
  {
    id: 'arch-4',
    name: 'Guardian',
    avatar: '🛡️',
    tier: 'Elite',
    description: 'Neural firewall and integrity warden for sensitive enterprise data streams.',
    color: 'indigo-accent',
    stats: { neural: '99.9', speed: '2.1ms' },
    specialties: ['Encryption', 'Threat Mitigation', 'Protocol']
  }
];

const AgentMarketplace = ({ onAddAgent }) => {
  const [search, setSearch] = useState('');

  const filtered = marketArchetypes.filter(a => 
    a.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-2">
        <div>
          <h2 className="text-2xl font-black text-white glow-text-primary tracking-tighter uppercase">Agent Marketplace</h2>
          <p className="text-xs text-muted font-bold tracking-widest mt-1 opacity-60">Expand your neural workforce with specialized AI archetypes</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative group min-w-[300px]">
            <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted transition-colors group-focus-within:text-primary-accent" />
            <input 
              type="text" 
              placeholder="Filter archetypes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-xs text-white focus:outline-none focus:border-primary-accent/40 transition-all placeholder:text-muted/30 font-bold uppercase tracking-widest"
            />
          </div>
          <div className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl flex items-center gap-3">
            <Sparkles size={14} className="text-amber-accent" />
            <span className="text-[10px] font-black text-white uppercase tracking-widest">Available: 24.8M TKS</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
        <AnimatePresence mode="popLayout">
          {filtered.map((archetype) => (
            <motion.div
              key={archetype.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <ArchetypeCard 
                archetype={archetype} 
                onDeploy={(arch) => onAddAgent({
                  name: `New ${arch.name}`,
                  role: arch.name,
                  avatar: arch.avatar,
                  status: 'Active',
                  efficiency: arch.stats.neural,
                  tags: arch.specialties,
                  color: arch.color
                })}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="glass-card p-12 bg-black/40 border-white/5 relative overflow-hidden text-center group">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(16,185,129,0.05),transparent_70%)]" />
        <Terminal size={48} className="mx-auto text-muted/20 mb-6 group-hover:text-primary-accent/40 transition-colors" />
        <h3 className="text-sm font-black text-white uppercase tracking-[0.4em] mb-4">Request Custom Archetype</h3>
        <p className="max-w-xl mx-auto text-xs text-muted font-bold leading-relaxed opacity-60 uppercase tracking-widest mb-8">
          Our spectral foundries are capable of forging bespoke neural cores tailored to your specific enterprise spectral requirements.
        </p>
        <button className="px-10 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black text-white uppercase tracking-[0.2em] hover:bg-white/10 hover:border-white/20 transition-all active:scale-95">
          Initiate Forging Protocol
        </button>
      </div>
    </div>
  );
};

export default AgentMarketplace;
