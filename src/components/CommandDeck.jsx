import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Users, CheckCircle, Clock, TrendingUp } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import CountUp from './CountUp';

const MetricCard = ({ title, value, trend, icon: Icon, color }) => (
  <motion.div 
    whileHover={{ y: -6, scale: 1.02 }}
    className="glass-card p-6 flex flex-col gap-6 group transition-all duration-500 relative overflow-hidden"
  >
    <div className="absolute top-0 right-0 w-24 h-24 bg-primary-accent/5 blur-2xl -mr-12 -mt-12 opacity-0 group-hover:opacity-100 transition-opacity" />
    
    <div className="flex items-center justify-between relative z-10">
      <div className={`p-3.5 rounded-2xl bg-${color}/10 text-${color} border border-${color}/20 group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
        <Icon size={24} />
      </div>
      <div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-emerald-400 bg-emerald-400/10 px-3 py-1.5 rounded-xl border border-emerald-400/20 pulse-glow">
        <TrendingUp size={12} />
        {trend}
      </div>
    </div>
    <div className="relative z-10">
      <h3 className="text-muted text-[10px] font-black uppercase tracking-[0.2em] opacity-60">{title}</h3>
      <p className="text-4xl font-black text-white mt-1 tabular-nums tracking-tighter glow-text-primary">
        <CountUp end={value} />
      </p>
      <div className="h-1 w-full bg-white/5 rounded-full mt-4 overflow-hidden border border-white/5">
        <div className={`h-full bg-${color} shadow-[0_0_10px_rgba(0,0,0,0.5)] w-2/3 group-hover:w-full transition-all duration-700`} />
      </div>
    </div>
  </motion.div>
);

const CommandDeck = ({ activities, agents }) => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <MetricCard title="Total Tasks" value="1,284" trend="+12%" icon={CheckCircle} color="primary-accent" />
        <MetricCard title="Active Agents" value="3" trend="Stable" icon={Users} color="cyan-accent" />
        <MetricCard title="System Uptime" value="99.9%" trend="+0.1%" icon={Activity} color="emerald-accent" />
        <MetricCard title="Avg. Response" value="1.2s" trend="-0.4s" icon={Clock} color="amber-accent" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Recent Activity Feed */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Recent Activity</h2>
            <button className="text-xs text-muted hover:text-white transition-colors">View All</button>
          </div>
          <div className="glass-card overflow-hidden">
            <div className="max-h-[400px] overflow-y-auto p-2 space-y-2">
              {activities.map((activity, idx) => (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  key={activity.id}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-white/5"
                >
                  <div className="w-10 h-10 rounded-full bg-surface-border flex items-center justify-center text-xl shrink-0">
                    {activity.agent || '🤖'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white font-medium truncate">{activity.action}</p>
                    <p className="text-xs text-muted">{formatDistanceToNow(activity.time)} ago</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Agent Status Panel */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-bold text-white">Agent Status</h2>
          <div className="space-y-3">
            {agents.map((agent) => (
              <div key={agent.id} className="glass-card p-4 flex items-center gap-4 hover:border-white/10 transition-colors">
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-surface-border flex items-center justify-center text-2xl">
                    {agent.emoji || agent.avatar || '🤖'}
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-4 border-background-custom ${
                    agent.status === 'active' ? 'bg-emerald-500' : 'bg-amber-500'
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-white">{agent.name}</h4>
                  <p className="text-xs text-muted truncate">{agent.activity || 'Scaling neural nodes...'}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-muted uppercase tracking-tighter">Last Seen</p>
                  <p className="text-xs text-white font-medium">{agent.lastSeen || 'online'}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommandDeck;
