import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, DollarSign, Users, Clock, 
  BarChart, PieChart, ArrowUpRight, Target, 
  Globe, Briefcase
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, BarChart as ReBarChart, 
  Bar, Cell, PieChart as RePieChart, Pie
} from 'recharts';

const ROI_DATA = [
  { month: 'Jan', manual: 4000, automated: 2400 },
  { month: 'Feb', manual: 3000, automated: 1398 },
  { month: 'Mar', manual: 2000, automated: 9800 },
  { month: 'Apr', manual: 2780, automated: 3908 },
  { month: 'May', manual: 1890, automated: 4800 },
  { month: 'Jun', manual: 2390, automated: 3800 },
];

const PIE_DATA = [
  { name: 'Neural Logic', value: 400, color: '#10b981' },
  { name: 'Manual Override', value: 300, color: '#06b6d4' },
  { name: 'System Idle', value: 300, color: '#f59e0b' },
  { name: 'Refactoring', value: 200, color: '#6366f1' },
];

const MetricCard = ({ label, value, trend, icon: Icon, color }) => (
  <div className="glass-card p-6 relative overflow-hidden group">
    <div className={`absolute top-0 right-0 w-24 h-24 blur-3xl opacity-10 bg-${color}`} />
    <div className="flex items-center justify-between mb-4">
      <div className={`p-2.5 rounded-xl bg-${color}/10 text-${color} border border-${color}/20`}>
        <Icon size={18} />
      </div>
      <div className="flex items-center gap-1 text-[10px] font-black text-emerald-500 uppercase tracking-tighter">
        <ArrowUpRight size={12} />
        {trend}
      </div>
    </div>
    <div>
      <p className="text-[10px] text-muted font-black uppercase tracking-widest opacity-60 mb-1">{label}</p>
      <p className="text-2xl font-black text-white tracking-tighter">{value}</p>
    </div>
  </div>
);

const ROIDashboard = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12">
      <div className="flex items-center justify-between px-2">
        <div>
          <h2 className="text-2xl font-black text-white glow-text-primary tracking-tighter uppercase">Executive ROI</h2>
          <p className="text-xs text-muted font-bold tracking-widest mt-1 opacity-60">Financial forecasting and neural efficiency analytics</p>
        </div>
        <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black text-white uppercase tracking-[0.2em] hover:bg-white/10 transition-all flex items-center gap-2">
          <Globe size={14} className="text-primary-accent" />
          Export Global Report
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard label="Total Cost Saved" value="$1.24M" trend="+12.5%" icon={DollarSign} color="emerald-500" />
        <MetricCard label="Human Hours Substituted" value="48.2K" trend="+8.2%" icon={Clock} color="cyan-500" />
        <MetricCard label="Active Workspace Nodes" value="124" trend="Stable" icon={Briefcase} color="amber-500" />
        <MetricCard label="System Efficiency" value="98.4%" trend="+0.4%" icon={Target} color="indigo-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-card p-8 min-h-[450px]">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xs font-bold text-white uppercase tracking-widest opacity-60 flex items-center gap-2">
              <TrendingUp size={14} className="text-primary-accent" />
              Human-AI Cost Parity (USD)
            </h3>
            <div className="flex gap-4">
              <div className="flex items-center gap-2 text-[9px] font-black text-muted uppercase">
                <span className="w-2 h-2 rounded-full bg-white/20" /> Manual
              </div>
              <div className="flex items-center gap-2 text-[9px] font-black text-primary-accent uppercase">
                <span className="w-2 h-2 rounded-full bg-primary-accent" /> Automated
              </div>
            </div>
          </div>
          <div className="h-[300px] w-full bg-white/[0.02] rounded-xl overflow-hidden mt-6">
            <ResponsiveContainer width="100%" height="100%" minHeight={300}>
              <AreaChart data={ROI_DATA}>
                <defs>
                  <linearGradient id="colorAuto" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis 
                  dataKey="month" 
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
                  tickFormatter={(val) => `$${val/1000}k`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(10,10,15,0.95)', 
                    borderColor: 'rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    fontSize: '10px'
                  }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="automated" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorAuto)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="manual" 
                  stroke="rgba(255,255,255,0.1)" 
                  strokeDasharray="5 5"
                  fill="transparent" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card p-8 flex flex-col h-full bg-black/20">
          <h3 className="text-xs font-bold text-white uppercase tracking-widest opacity-60 mb-8 flex items-center gap-2">
            <PieChart size={14} className="text-cyan-accent" />
            Neural Allocation
          </h3>
          <div className="flex-1 min-h-[250px] bg-white/[0.02] rounded-xl overflow-hidden mt-8">
            <ResponsiveContainer width="100%" height="100%" minHeight={250}>
              <RePieChart>
                <Pie
                  data={PIE_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {PIE_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip />
              </RePieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3 mt-4">
            {PIE_DATA.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-[10px] font-bold text-muted uppercase tracking-tighter">{item.name}</span>
                </div>
                <span className="text-[10px] font-black text-white">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ROIDashboard;
