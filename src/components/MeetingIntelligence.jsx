import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer
} from 'recharts';
import { 
  Calendar, TrendingUp, CheckSquare, Clock, Search, Globe, ChevronDown, 
  ExternalLink, Share2, Sparkles, Filter, Play, FileText, CheckCircle2,
  Users2
} from 'lucide-react';
import { meetings } from '../data/mockData';
import DOMPurify from 'dompurify';
import { format, parseISO } from 'date-fns';
import CountUp from './CountUp';

const COLORS = ['#10b981', '#06b6d4', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

const meetingVolumeData = [
  { day: 'Mon', count: 4 },
  { day: 'Tue', count: 7 },
  { day: 'Wed', count: 5 },
  { day: 'Thu', count: 8 },
  { day: 'Fri', count: 3 },
];

const meetingTypeData = [
  { name: 'Internal', value: 45 },
  { name: 'Client', value: 25 },
  { name: 'Sales', value: 15 },
  { name: 'Recruiting', value: 10 },
  { name: 'Other', value: 5 },
];

const KPICard = ({ title, value, trend, icon: Icon, color }) => (
  <motion.div 
    whileHover={{ y: -4, scale: 1.02 }}
    className="glass-card p-6 flex items-center gap-6 group transition-all duration-300"
  >
    <div className={`p-3.5 rounded-2xl bg-${color}/10 text-${color} border border-${color}/20 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
      <Icon size={24} />
    </div>
    <div className="flex-1">
      <p className="text-[10px] text-muted font-black uppercase tracking-widest opacity-60 mb-1">{title}</p>
      <div className="flex items-end justify-between">
        <p className="text-2xl font-black text-white leading-none">
          <CountUp end={value} />
          {title.includes('Avg') && 'm'}
        </p>
        <span className="text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full border border-emerald-400/20">
          {trend}
        </span>
      </div>
    </div>
  </motion.div>
);

const MeetingIntelligence = () => {
  const [search, setSearch] = useState('');
  const [expandedMeeting, setExpandedMeeting] = useState(null);
  const [selectedType, setSelectedType] = useState(null);

  const filteredMeetings = meetings.filter(m => 
    (m.title?.toLowerCase().includes(search.toLowerCase()) || m.description?.toLowerCase().includes(search.toLowerCase())) &&
    (!selectedType || m.type === selectedType)
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12">
      <div className="flex items-center justify-between px-2">
        <div>
          <h2 className="text-2xl font-black text-white glow-text-primary tracking-tighter">Meeting Intelligence</h2>
          <p className="text-xs text-muted font-bold uppercase tracking-widest mt-1 opacity-60">Synchronous neural correlation and action mapping</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-bold text-white uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-2">
            <Filter size={14} />
            Advanced Filters
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard title="Total Meetings" value="247" trend="+12%" icon={Calendar} color="emerald-400" />
        <KPICard title="Live Participants" value="12" trend="Active" icon={Users2} color="cyan-400" />
        <KPICard title="Open Tasks" value="48" trend="-5%" icon={CheckSquare} color="amber-400" />
        <KPICard title="Avg Duration" value="34" trend="Stable" icon={Clock} color="purple-400" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-card p-8 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-accent/5 blur-3xl -mr-32 -mt-32 group-hover:bg-primary-accent/10 transition-colors" />
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xs font-bold text-white uppercase tracking-widest opacity-60 flex items-center gap-2">
              <TrendingUp size={14} className="text-primary-accent" />
              Volume Analysis
            </h3>
            <div className="flex gap-2">
              {['7D', '30D', '90D'].map(p => (
                <button key={p} className={`px-3 py-1.5 rounded-lg text-[10px] font-bold ${p === '7D' ? 'bg-primary-accent text-background-custom shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-white/5 text-muted hover:text-white transition-colors'}`}>
                  {p}
                </button>
              ))}
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={meetingVolumeData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis 
                  dataKey="day" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }} 
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0d111c', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', fontSize: '10px', boxShadow: '0 10px 40px rgba(0,0,0,0.5)' }}
                  itemStyle={{ color: '#10b981', fontWeight: 800 }}
                  labelStyle={{ color: '#fff', marginBottom: '4px', fontWeight: 800 }}
                />
                <Bar 
                  dataKey="count" 
                  fill="#10b981" 
                  radius={[4, 4, 0, 0]} 
                  fillOpacity={0.8}
                >
                  {meetingVolumeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === meetingVolumeData.length - 1 ? '#10b981' : 'rgba(16, 185, 129, 0.3)'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card p-8 shadow-2xl relative overflow-hidden group flex flex-col items-center">
          <h3 className="text-xs font-bold text-white uppercase tracking-widest opacity-60 self-start mb-8 flex items-center gap-2">
            <Globe size={14} className="text-cyan-accent" />
            Category Distribution
          </h3>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={meetingTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={8}
                  dataKey="value"
                  stroke="none"
                >
                  {meetingTypeData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[index % COLORS.length]} 
                      style={{ 
                        filter: selectedType === entry.name ? 'drop-shadow(0 0 8px currentColor)' : 'none',
                        cursor: 'pointer'
                      }}
                      onClick={() => setSelectedType(entry.name === selectedType ? null : entry.name)}
                    />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0d111c', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', fontSize: '10px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-4 w-full mt-6">
            {meetingTypeData.map((type, idx) => (
              <div 
                key={idx} 
                className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                  selectedType === type.name 
                    ? 'bg-white/10 border-white/20 scale-[1.02]' 
                    : 'bg-white/[0.02] border-white/5 hover:bg-white/5'
                }`}
                onClick={() => setSelectedType(type.name === selectedType ? null : type.name)}
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                  <span className="text-[10px] font-bold text-white opacity-90">{type.name}</span>
                </div>
                <div className="text-xs font-black text-white ml-3.5 tracking-tight">{type.value}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={16} />
            <input
              type="text"
              placeholder="Search meetings by title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-3 text-sm text-white focus:outline-none focus:border-primary-accent/50 transition-all placeholder:text-muted/50"
            />
          </div>
          <div className="flex items-center gap-4 text-[10px] font-bold text-muted uppercase tracking-widest hidden md:flex">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.8)]" />
              Complete
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_5px_rgba(245,158,11,0.8)]" />
              Executing
            </span>
          </div>
        </div>

        <div className="space-y-4">
          {filteredMeetings.map((meeting) => (
            <div 
              key={meeting.id} 
              className={`glass-card overflow-hidden shadow-xl border-l-4 ${
                meeting.type === 'Internal' ? 'border-primary-accent/40' : 'border-cyan-accent/40'
              } group`}
            >
              <button
                onClick={() => setExpandedMeeting(expandedMeeting === meeting.id ? null : meeting.id)}
                className="w-full px-8 py-6 flex items-center justify-between hover:bg-white/[0.02] transition-colors"
              >
                <div className="flex items-center gap-6 text-left">
                  <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 shadow-inner group-hover:bg-white/[0.08] transition-all group-hover:scale-110">
                    <Calendar size={20} className="text-primary-accent" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-lg bg-white/5 text-blue-400 border border-blue-400/20">
                        {meeting.type}
                      </span>
                      <span className="text-xs text-muted font-bold tracking-tight">
                        {format(parseISO(meeting.startTime || meeting.date || '2024-03-24'), 'MMM dd, HH:mm')}
                      </span>
                    </div>
                    <h4 className="text-lg font-black text-white tracking-tight group-hover:text-primary-accent transition-colors">
                      {meeting.title || meeting.description}
                    </h4>
                  </div>
                </div>
                <div className="flex items-center gap-8">
                  <div className="hidden md:flex -space-x-3">
                    {(meeting.participants || meeting.attendees || []).slice(0, 4).map((p, i) => (
                      <div 
                        key={i} 
                        className="w-9 h-9 rounded-xl border-4 border-background-custom bg-white/10 flex items-center justify-center shadow-lg relative overflow-hidden"
                        title={typeof p === 'string' ? p : p.name}
                      >
                        <span className="text-sm">{typeof p === 'string' ? p[0] : (p.avatar || '🤖')}</span>
                      </div>
                    ))}
                  </div>
                  <ChevronDown 
                    size={20} 
                    className={`text-muted transition-transform duration-500 ${expandedMeeting === meeting.id ? 'rotate-180 text-primary-accent' : ''}`} 
                  />
                </div>
              </button>

              <AnimatePresence>
                {expandedMeeting === meeting.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="border-t border-white/5 bg-white/[0.02] p-10 space-y-10"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                      <div className="lg:col-span-2 space-y-6">
                        <h5 className="text-[10px] font-black text-muted uppercase tracking-[0.2em] flex items-center gap-3">
                          <FileText size={16} className="text-primary-accent" />
                          Neural Summary
                        </h5>
                        <div 
                          className="text-white/80 text-base leading-relaxed prose prose-invert max-w-none font-medium tracking-tight"
                          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(meeting.summary || 'Summary not available.') }}
                        />
                      </div>
                      <div className="space-y-6">
                        <h5 className="text-[10px] font-black text-muted uppercase tracking-[0.2em] flex items-center gap-3">
                          <CheckCircle2 size={16} className="text-cyan-accent" />
                          Action Mapping
                        </h5>
                        <div className="space-y-3">
                          {(meeting.action_items || []).map((item, idx) => (
                            <div key={idx} className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5 group/ai hover:border-white/10 hover:bg-white/[0.05] transition-all">
                              <div className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-all ${item.done ? 'bg-primary-accent/20 border-primary-accent text-primary-accent shadow-[0_0_10px_rgba(16,185,129,0.3)]' : 'border-white/20'}`}>
                                {item.done && <CheckCircle2 size={12} />}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className={`text-sm font-bold ${item.done ? 'text-muted/60 line-through' : 'text-white'} leading-tight`}>{item.task}</p>
                                <p className="text-[9px] text-muted font-black uppercase tracking-widest mt-1 opacity-60">{item.assignee}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="bg-background-custom/40 rounded-3xl p-6 border border-white/5 space-y-6 shadow-2xl relative overflow-hidden group/player">
                      <div className="absolute inset-0 bg-gradient-to-r from-primary-accent/0 via-primary-accent/[0.03] to-primary-accent/0 -translate-x-full group-hover/player:animate-shimmer" />
                      <div className="flex items-center justify-between relative z-10">
                        <div className="flex items-center gap-4">
                          <button className="w-12 h-12 rounded-2xl bg-primary-accent flex items-center justify-center text-background-custom shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:scale-105 active:scale-95 transition-all">
                            <Play size={20} fill="currentColor" />
                          </button>
                          <div>
                            <p className="text-sm font-black text-white tracking-widest uppercase">CORRELATION_AUDIT_332.neural</p>
                            <p className="text-[10px] text-muted font-mono font-bold mt-1 tracking-tighter">03:45 <span className="opacity-30 mx-1">/</span> 12:20</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 h-8">
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map(i => (
                            <motion.div 
                              key={i}
                              animate={{ height: [6, 24, 10, 32, 8] }}
                              transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.05 }}
                              className="w-1.5 bg-primary-accent/30 rounded-full"
                            />
                          ))}
                        </div>
                      </div>
                      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 relative z-10">
                        <motion.div 
                          initial={{ width: '0%' }}
                          animate={{ width: '30.4%' }}
                          className="h-full bg-primary-accent shadow-[0_0_15px_rgba(16,185,129,0.5)]" 
                        />
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-between p-6 rounded-3xl bg-primary-accent/5 border border-primary-accent/10 shadow-lg group/insights">
                      <div className="flex items-center gap-4 text-primary-accent mb-6 md:mb-0">
                        <div className="p-2.5 bg-primary-accent/10 rounded-xl pulse-glow">
                          <Sparkles size={18} className="animate-pulse" />
                        </div>
                        <div className="text-left">
                          <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 block">AI Synthesis insight</span>
                          <span className="text-sm text-white/90 font-bold tracking-tight">{meeting.ai_insights || 'Intelligence analysis complete.'}</span>
                        </div>
                      </div>
                      <div className="flex gap-3 w-full md:w-auto">
                        <button 
                          onClick={() => {
                            const btn = document.getElementById(`gen-${meeting.id}`);
                            btn.innerHTML = '<span class="animate-spin mr-2">◌</span> Generating...';
                            btn.disabled = true;
                            setTimeout(() => {
                              btn.innerHTML = '<span class="mr-2">✓</span> Proposal Created';
                              btn.classList.add('bg-emerald-500/20', 'text-emerald-400', 'border-emerald-500/30');
                              btn.classList.remove('bg-primary-accent', 'text-background-custom');
                            }, 2000);
                          }}
                          id={`gen-${meeting.id}`}
                          className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-primary-accent text-background-custom rounded-xl text-xs font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                        >
                          <FileText size={16} />
                          Gen Proposal
                        </button>
                        <button className="flex-1 md:flex-none flex items-center justify-center gap-3 px-6 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold uppercase tracking-widest border border-white/10 transition-all hover:border-white/20">
                          <ExternalLink size={16} />
                          Recording
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MeetingIntelligence;
