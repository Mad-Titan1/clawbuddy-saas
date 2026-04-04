import React, { useMemo, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Coins, TrendingUp, Zap, Shield, Cpu, 
  ArrowUpRight, ArrowDownRight, CreditCard, 
  History, Info, ExternalLink
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, BarChart, Bar, Cell 
} from 'recharts';
import { consumptionHistory as mockConsumptionHistory } from '../data/mockData';

const TokenUsage = ({ agents = [] }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const usageStats = useMemo(() => {
    if (!Array.isArray(agents) || agents.length === 0) return {
      totalInput: 0,
      totalOutput: 0,
      totalCost: "0.00",
      avgEfficiency: "0",
      agentBreakdown: []
    };

    let totalInput = 0;
    let totalOutput = 0;
    let totalCost = 0;
    
    const agentBreakdown = agents.map(agent => {
      const usage = agent.usage || { inputTokens: 0, outputTokens: 0, avgCostPerMillion: 0 };
      const { inputTokens = 0, outputTokens = 0, avgCostPerMillion = 0 } = usage;
      const cost = ((inputTokens + outputTokens) / 1000000) * avgCostPerMillion;
      
      totalInput += inputTokens;
      totalOutput += outputTokens;
      totalCost += cost;
      
      return {
        ...agent,
        cost,
        totalTokens: inputTokens + outputTokens
      };
    });

    return {
      totalInput,
      totalOutput,
      totalCost: totalCost.toFixed(2),
      avgEfficiency: ((totalInput + totalOutput) / (totalCost || 1)).toFixed(0),
      agentBreakdown
    };
  }, [agents]);

  if (!isMounted) return <div className="h-screen flex items-center justify-center text-muted uppercase tracking-[0.3em] text-[10px] animate-pulse">Initializing Neural Ledger...</div>;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12">
      <div className="flex items-center justify-between px-2">
        <div>
          <h2 className="text-2xl font-black text-white glow-text-primary tracking-tighter uppercase">Usage Hub</h2>
          <p className="text-xs text-muted font-bold tracking-widest mt-1 opacity-60">LLM Resource Consumption & Financial Telemetry</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black text-white uppercase tracking-[0.2em] hover:bg-white/10 transition-all">
            Billing Portal
          </button>
          <button className="px-4 py-2 bg-primary-accent text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-emerald-500/20 hover:scale-105 transition-all">
            Set Budget Alert
          </button>
        </div>
      </div>

      {/* High-Level Financial Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Matrix Spend', value: `$${usageStats.totalCost}`, trend: '+12%', icon: Coins, color: 'text-primary-accent', bg: 'bg-primary-accent/10' },
          { label: 'Token Volume', value: `${((usageStats.totalInput + usageStats.totalOutput) / 1000000).toFixed(1)}M`, trend: '+5.4%', icon: Cpu, color: 'text-cyan-accent', bg: 'bg-cyan-accent/10' },
          { label: 'Avg Efficiency', value: `${usageStats.avgEfficiency} t/$`, trend: 'Optimal', icon: Zap, color: 'text-amber-accent', bg: 'bg-amber-accent/10' },
          { label: 'Active Quotas', value: '3/5', trend: 'Secure', icon: Shield, color: 'text-indigo-accent', bg: 'bg-indigo-accent/10' },
        ].map((stat, i) => (
          <div key={i} className="glass-card p-6 border-white/5 relative overflow-hidden group">
            <div className={`absolute top-0 right-0 w-24 h-24 blur-3xl opacity-10 ${stat.bg}`} />
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2.5 rounded-xl ${stat.bg} ${stat.color} border border-white/5`}>
                <stat.icon size={18} />
              </div>
              <div className="flex items-center gap-1 text-[9px] font-black text-emerald-500 uppercase">
                <ArrowUpRight size={10} />
                {stat.trend}
              </div>
            </div>
            <div>
              <p className="text-[9px] text-muted font-black uppercase tracking-[0.15em] mb-1">{stat.label}</p>
              <p className="text-2xl font-black text-white tracking-tighter">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Consumption History Chart */}
        <div className="lg:col-span-2 glass-card p-8 border-white/5">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xs font-black text-white uppercase tracking-[0.2em] flex items-center gap-2">
              <History size={14} className="text-primary-accent" />
              Daily Cost Projection (USD)
            </h3>
            <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-lg border border-white/5 text-[9px] font-bold text-muted">
              Last 7 Days
            </div>
          </div>
          <div className="h-[300px] w-full min-h-[300px] bg-white/[0.02] rounded-2xl overflow-hidden mt-6">
            {mockConsumptionHistory && mockConsumptionHistory.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockConsumptionHistory}>
                  <defs>
                    <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis 
                    dataKey="date" 
                    stroke="rgba(255,255,255,0.3)" 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false}
                    dy={10}
                  />
                  <YAxis 
                    stroke="rgba(255,255,255,0.3)" 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false}
                    tickFormatter={(val) => `$${val}`}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(10,10,15,0.95)', 
                      borderColor: 'rgba(255,255,255,0.1)',
                      borderRadius: '12px',
                      fontSize: '10px',
                      fontWeight: 'bold'
                    }}
                    itemStyle={{ color: '#10b981' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="cost" 
                    stroke="#10b981" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorCost)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
                <div className="h-full flex items-center justify-center text-muted uppercase text-[10px] tracking-widest">No consumption history found</div>
            )}
          </div>
        </div>

        {/* Model Distribution */}
        <div className="glass-card p-8 border-white/5 flex flex-col">
          <h3 className="text-xs font-black text-white uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
            <CreditCard size={14} className="text-cyan-accent" />
            Tokens by Agent
          </h3>
          <div className="flex-1 min-h-[250px] bg-white/[0.02] rounded-2xl overflow-hidden mt-6">
            {usageStats.agentBreakdown && usageStats.agentBreakdown.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={usageStats.agentBreakdown}>
                  <XAxis dataKey="name" hide />
                  <Tooltip 
                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                    contentStyle={{ backgroundColor: '#0a0a0f', borderColor: '#ffffff10', fontSize: '10px' }}
                  />
                  <Bar dataKey="totalTokens" radius={[4, 4, 0, 0]}>
                    {usageStats.agentBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
                <div className="h-full flex items-center justify-center text-muted uppercase text-[10px] tracking-widest">No distribution data</div>
            )}
          </div>
          <div className="space-y-3 mt-6">
            {usageStats.agentBreakdown.map((agent, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: agent.color }} />
                  <span className="text-[10px] font-bold text-muted uppercase tracking-tighter">{agent.name}</span>
                </div>
                <span className="text-[10px] font-black text-white">{(agent.totalTokens / 1000).toFixed(0)}k tkn</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Usage Ledger */}
      <div className="glass-card border-white/5 overflow-hidden">
        <div className="px-8 py-6 border-b border-white/5 bg-white/2 flex items-center justify-between">
            <h3 className="text-xs font-black text-white uppercase tracking-[0.2em] flex items-center gap-2">
              <TrendingUp size={14} className="text-amber-accent" />
              Resource Consumption Ledger
            </h3>
            <div className="text-[10px] font-bold text-muted uppercase tracking-widest flex items-center gap-2">
              <Info size={12} /> Live API Webhooks Active
            </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/2 border-b border-white/5">
                <th className="px-8 py-4 text-[10px] font-black text-muted uppercase tracking-widest">Agent / Project</th>
                <th className="px-8 py-4 text-[10px] font-black text-muted uppercase tracking-widest">Neural Model</th>
                <th className="px-8 py-4 text-[10px] font-black text-muted uppercase tracking-widest text-center">Input Tokens</th>
                <th className="px-8 py-4 text-[10px] font-black text-muted uppercase tracking-widest text-center">Output Tokens</th>
                <th className="px-8 py-4 text-[10px] font-black text-muted uppercase tracking-widest text-right">Estimated Cost</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {usageStats.agentBreakdown.map((agent, i) => (
                <tr key={i} className="hover:bg-white/5 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-lg border border-white/5">
                        {agent.emoji}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white group-hover:text-primary-accent transition-colors">{agent.name}</p>
                        <p className="text-[10px] text-muted font-bold uppercase tracking-widest leading-none">{agent.role}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-white/70">
                      <Zap size={10} className="text-amber-accent" />
                      {agent.usage?.model || 'Unknown'}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-center font-mono text-[11px] text-blue-400 font-bold">
                    {((agent.usage?.inputTokens || 0) / 1000).toLocaleString()}k
                  </td>
                  <td className="px-8 py-6 text-center font-mono text-[11px] text-emerald-400 font-bold">
                    {((agent.usage?.outputTokens || 0) / 1000).toLocaleString()}k
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex flex-col items-end">
                      <span className="text-sm font-black text-white">${(agent.cost || 0).toFixed(2)}</span>
                      <span className="text-[9px] font-bold text-muted uppercase tracking-tighter">Current Cycle</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-8 py-6 bg-white/2 border-t border-white/5 flex justify-center">
            <button className="flex items-center gap-2 text-[10px] font-black text-muted hover:text-white uppercase tracking-[0.2em] transition-colors">
                View Full Audit Logs <ExternalLink size={12} />
            </button>
        </div>
      </div>
    </div>
  );
};

export default TokenUsage;
