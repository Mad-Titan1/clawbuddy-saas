import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Code, ClipboardList, Zap, Target, Edit2, Plus, X, Globe, Activity } from 'lucide-react';
import Dialog from './Dialog';

const AgentCard = ({ agent, onEdit }) => {
  const Icon = agent.role?.toLowerCase().includes('engineer') ? Code : 
               agent.role?.toLowerCase().includes('coordinator') ? ClipboardList : Shield;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="glass-card p-6 flex flex-col gap-6 relative overflow-hidden group"
    >
      <div 
        className="absolute top-0 right-0 w-32 h-32 bg-current opacity-5 blur-3xl -mr-16 -mt-16 transition-opacity group-hover:opacity-10"
        style={{ color: agent.color }}
      />
      
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-surface-border flex items-center justify-center text-4xl shadow-xl border border-white/5">
            {agent.emoji || agent.avatar || '🤖'}
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">{agent.name}</h3>
            <div className="flex items-center gap-2">
              <span className="text-[10px] bg-primary-accent/20 text-primary-accent border border-primary-accent/30 px-1.5 py-0.5 rounded font-black tracking-tighter uppercase">LVL {agent.level || 1}</span>
              <p className="text-xs text-muted font-medium uppercase tracking-wider">{agent.type}</p>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => onEdit(agent)}
            className="p-2 rounded-lg bg-white/5 border border-white/10 text-muted hover:text-white transition-colors hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]"
          >
            <Edit2 size={16} />
          </button>
          <div 
            className="p-2 rounded-lg border border-white/5 bg-white/5"
            style={{ color: agent.color }}
          >
            <Icon size={16} />
          </div>
        </div>
      </div>

      <div className="space-y-1.5">
        <div className="flex justify-between items-end px-0.5">
          <span className="text-[9px] font-black text-muted uppercase tracking-widest">Neural Progress (XP)</span>
          <span className="text-[9px] font-black text-white/50 underline decoration-primary-accent/30 underline-offset-2 tracking-tighter">{agent.xp || 0} / {agent.maxXp || 1000}</span>
        </div>
        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${((agent.xp || 0) / (agent.maxXp || 1000)) * 100}%` }}
            className="h-full bg-gradient-to-r from-primary-accent to-cyan-accent relative"
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse" />
          </motion.div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-3 rounded-xl bg-white/5 border border-white/5">
          <div className="flex items-center gap-2 text-muted mb-1">
            <Target size={14} />
            <span className="text-[10px] font-bold uppercase">Tasks</span>
          </div>
          <p className="text-lg font-bold text-white">{agent.tasksCompleted || 0}</p>
        </div>
        <div className="p-3 rounded-xl bg-white/5 border border-white/5">
          <div className="flex items-center gap-2 text-muted mb-1">
            <Zap size={14} />
            <span className="text-[10px] font-bold uppercase">Accuracy</span>
          </div>
          <p className="text-lg font-bold text-white">{agent.accuracy || agent.efficiency || '95%'}</p>
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="text-xs font-bold text-muted uppercase tracking-widest">Core Skills</h4>
        <div className="flex flex-wrap gap-2">
          {(agent.skills || agent.tags || []).map((skill) => (
            <span 
              key={skill} 
              className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-medium text-white/80"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <button 
          onClick={() => agent.onViewBrowser?.(agent)}
          disabled={!agent.browsingState?.active}
          className={`flex-1 py-3 rounded-xl border font-bold text-[10px] uppercase tracking-widest transition-all active:scale-95 flex items-center justify-center gap-2 ${
            agent.browsingState?.active 
              ? 'bg-primary-accent/10 border-primary-accent/30 text-primary-accent hover:bg-primary-accent/20' 
              : 'bg-white/5 border-white/10 text-muted opacity-50 cursor-not-allowed'
          }`}
        >
          {agent.browsingState?.active && <motion.div animate={{ opacity: [1, 0.4, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}><Activity size={12} /></motion.div>}
          {agent.browsingState?.active ? 'Jack In Live' : 'No Web Link'}
        </button>
        <button className="flex-1 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] font-bold text-white uppercase tracking-widest transition-all active:scale-95">
          Full Profile
        </button>
      </div>
    </motion.div>
  );
};

const AgentProfiles = ({ agents, onUpdateAgents }) => {
  const [editingAgent, setEditingAgent] = useState(null);
  const [isAddingAgent, setIsAddingAgent] = useState(false);
  const [newAgentForm, setNewAgentForm] = useState({ name: '', role: '', color: '#10b981', skills: [], emoji: '🤖' });
  const [newSkill, setNewSkill] = useState('');

  const currentAgent = editingAgent || (isAddingAgent ? newAgentForm : null);

  const handleSave = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedData = {
      name: formData.get('name'),
      role: formData.get('role'),
      color: formData.get('color'),
    };
    
    if (editingAgent) {
      onUpdateAgents(prev => prev.map(a => a.id === editingAgent.id ? { ...editingAgent, ...updatedData } : a));
      setEditingAgent(null);
    } else {
      const newAgent = {
        ...newAgentForm,
        ...updatedData,
        id: `agent-${Date.now()}`,
        status: 'idle',
        type: 'AUTONOMOUS',
        tasksCompleted: 0,
        accuracy: '95%'
      };
      onUpdateAgents(prev => [...prev, newAgent]);
      setIsAddingAgent(false);
      setNewAgentForm({ name: '', role: '', color: '#10b981', skills: [], emoji: '🤖' });
    }
  };

  const addSkill = () => {
    if (!newSkill.trim() || currentAgent.skills.includes(newSkill)) return;
    const updatedSkills = [...currentAgent.skills, newSkill.trim()];
    if (editingAgent) {
      setEditingAgent({ ...editingAgent, skills: updatedSkills });
    } else {
      setNewAgentForm({ ...newAgentForm, skills: updatedSkills });
    }
    setNewSkill('');
  };

  const removeSkill = (skill) => {
    const updatedSkills = currentAgent.skills.filter(s => s !== skill);
    if (editingAgent) {
      setEditingAgent({ ...editingAgent, skills: updatedSkills });
    } else {
      setNewAgentForm({ ...newAgentForm, skills: updatedSkills });
    }
  };

  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight">Active Agents</h2>
          <p className="text-muted text-sm font-medium">Manage and deploy your autonomous workforce</p>
        </div>
        <button 
          onClick={() => setIsAddingAgent(true)}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-accent text-white font-bold text-sm shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-emerald-500/40 transition-all active:scale-95"
        >
          <Plus size={18} />
          New Agent
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {agents.map((agent) => (
          <AgentCard key={agent.id} agent={agent} onEdit={setEditingAgent} />
        ))}
      </div>

      <Dialog 
        isOpen={!!currentAgent} 
        onClose={() => { setEditingAgent(null); setIsAddingAgent(false); }} 
        title={editingAgent ? `Edit ${editingAgent.name}` : "Deploy New Agent"}
      >
        <form onSubmit={handleSave} className="space-y-6">
          <div className="space-y-4">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-4xl shadow-xl">
                {currentAgent?.emoji || '🤖'}
              </div>
            </div>
            
            <div>
              <label className="block text-xs font-bold text-muted uppercase mb-2">Agent Name</label>
              <input 
                autoFocus
                name="name"
                defaultValue={currentAgent?.name}
                placeholder="Agent Alpha..."
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary-accent/50"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-muted uppercase mb-2">Agent Role</label>
              <input 
                name="role"
                defaultValue={currentAgent?.role}
                placeholder="Systems Engineer..."
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary-accent/50"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-muted uppercase mb-2">Accent Color</label>
              <input 
                type="color"
                name="color"
                defaultValue={currentAgent?.color}
                className="w-full h-10 bg-white/5 border border-white/10 rounded-lg overflow-hidden cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-muted uppercase mb-2">Skills</label>
              <div className="flex flex-wrap gap-2 mb-3">
                {currentAgent?.skills.map(skill => (
                  <span key={skill} className="flex items-center gap-1 px-2 py-1 bg-primary-accent/10 border border-primary-accent/20 rounded text-[10px] text-primary-accent">
                    {skill}
                    <button type="button" onClick={() => removeSkill(skill)}><X size={10} /></button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input 
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                  placeholder="Add skill..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-xs text-white outline-none"
                />
                <button 
                  type="button"
                  onClick={addSkill}
                  className="p-1 rounded bg-primary-accent text-white"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button 
              type="button"
              onClick={() => { setEditingAgent(null); setIsAddingAgent(false); }}
              className="flex-1 py-2 rounded-lg border border-white/10 text-white text-sm font-bold hover:bg-white/5 transition-all"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="flex-1 py-2 rounded-lg bg-primary-accent text-white text-sm font-bold shadow-lg hover:shadow-emerald-500/20 transition-all"
            >
              {editingAgent ? 'Save Changes' : 'Deploy Agent'}
            </button>
          </div>
        </form>
      </Dialog>
    </>
  );
};

export default AgentProfiles;
