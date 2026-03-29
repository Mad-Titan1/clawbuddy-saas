import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Code, ClipboardList, Zap, Target, Edit2, Plus, X } from 'lucide-react';
import Dialog from './Dialog';

const AgentCard = ({ agent, onEdit }) => {
  const Icon = agent.id === 'agent-alpha' ? Code : agent.id === 'dispatch-bot' ? ClipboardList : Shield;

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
            {agent.emoji}
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">{agent.name}</h3>
            <p className="text-sm text-muted font-medium uppercase tracking-wider">{agent.type}</p>
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

      <div className="grid grid-cols-2 gap-4">
        <div className="p-3 rounded-xl bg-white/5 border border-white/5">
          <div className="flex items-center gap-2 text-muted mb-1">
            <Target size={14} />
            <span className="text-[10px] font-bold uppercase">Tasks</span>
          </div>
          <p className="text-lg font-bold text-white">{agent.tasksCompleted}</p>
        </div>
        <div className="p-3 rounded-xl bg-white/5 border border-white/5">
          <div className="flex items-center gap-2 text-muted mb-1">
            <Zap size={14} />
            <span className="text-[10px] font-bold uppercase">Accuracy</span>
          </div>
          <p className="text-lg font-bold text-white">{agent.accuracy}</p>
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="text-xs font-bold text-muted uppercase tracking-widest">Core Skills</h4>
        <div className="flex flex-wrap gap-2">
          {agent.skills.map((skill) => (
            <span 
              key={skill} 
              className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-medium text-white/80"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <button className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-bold text-white transition-all active:scale-95">
        View Full Profile
      </button>
    </motion.div>
  );
};

const AgentProfiles = ({ agents, onUpdateAgents }) => {
  const [editingAgent, setEditingAgent] = useState(null);
  const [newSkill, setNewSkill] = useState('');

  const handleSave = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedAgent = {
      ...editingAgent,
      name: formData.get('name'),
      role: formData.get('role'),
      color: formData.get('color'),
    };
    
    onUpdateAgents(prev => prev.map(a => a.id === updatedAgent.id ? updatedAgent : a));
    setEditingAgent(null);
  };

  const addSkill = () => {
    if (!newSkill.trim() || editingAgent.skills.includes(newSkill)) return;
    setEditingAgent({ ...editingAgent, skills: [...editingAgent.skills, newSkill.trim()] });
    setNewSkill('');
  };

  const removeSkill = (skill) => {
    setEditingAgent({ ...editingAgent, skills: editingAgent.skills.filter(s => s !== skill) });
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {agents.map((agent) => (
          <AgentCard key={agent.id} agent={agent} onEdit={setEditingAgent} />
        ))}
      </div>

      <Dialog 
        isOpen={!!editingAgent} 
        onClose={() => setEditingAgent(null)} 
        title={`Edit ${editingAgent?.name}`}
      >
        <form onSubmit={handleSave} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-muted uppercase mb-2">Agent Name</label>
              <input 
                name="name"
                defaultValue={editingAgent?.name}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary-accent/50"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-muted uppercase mb-2">Agent Role</label>
              <input 
                name="role"
                defaultValue={editingAgent?.role}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary-accent/50"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-muted uppercase mb-2">Accent Color</label>
              <input 
                type="color"
                name="color"
                defaultValue={editingAgent?.color}
                className="w-full h-10 bg-white/5 border border-white/10 rounded-lg overflow-hidden cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-muted uppercase mb-2">Skills</label>
              <div className="flex flex-wrap gap-2 mb-3">
                {editingAgent?.skills.map(skill => (
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
              onClick={() => setEditingAgent(null)}
              className="flex-1 py-2 rounded-lg border border-white/10 text-white text-sm font-bold hover:bg-white/5 transition-all"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="flex-1 py-2 rounded-lg bg-primary-accent text-white text-sm font-bold shadow-lg hover:shadow-emerald-500/20 transition-all"
            >
              Save Changes
            </button>
          </div>
        </form>
      </Dialog>
    </>
  );
};

export default AgentProfiles;
