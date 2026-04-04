import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MoreHorizontal, Plus, AlertCircle, Calendar, User, AlignLeft, CheckSquare, 
  TrendingUp, Activity, Zap, Shield, Target, Clock, ArrowRight 
} from 'lucide-react';
import Dialog from './Dialog';
import { useSettings } from '../hooks/useSettings';

const columns = [
  { id: 'todo', title: 'To Do', color: 'text-muted' },
  { id: 'doing', title: 'Doing', color: 'text-cyan-accent' },
  { id: 'needs-input', title: 'Needs Input', color: 'text-amber-accent' },
  { id: 'done', title: 'Done', color: 'text-primary-accent' }
];

const TaskBoard = ({ initialTasks, onSaveTasks }) => {
  const [tasks, setTasks] = useState(initialTasks);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTaskForm, setNewTaskForm] = useState({ title: '', priority: 'medium', column: 'todo', agent: 'Alpha' });
  const [settings] = useSettings();

  useEffect(() => {
    onSaveTasks(tasks);
  }, [tasks, onSaveTasks]);

  const stats = useMemo(() => {
    const total = tasks.length;
    const done = tasks.filter(t => t.column === 'done').length;
    const active = tasks.filter(t => t.column === 'doing').length;
    const highPriority = tasks.filter(t => t.priority === 'urgent' || t.priority === 'high').length;
    
    return {
      completionRate: total > 0 ? Math.round((done / total) * 100) : 0,
      activeLoad: active,
      threatLevel: highPriority > 3 ? 'High' : 'Nominal',
      velocity: (done / Math.max(1, total / 4)).toFixed(1)
    };
  }, [tasks]);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskForm.title.trim()) return;

    const newTask = {
      ...newTaskForm,
      id: `task-${Date.now()}`,
      progress: 0,
    };

    setTasks(prev => [...prev, newTask]);
    setNewTaskForm({ title: '', priority: 'medium', column: 'todo', agent: 'Alpha' });
    setIsAddingTask(false);
  };

  const onDragStart = (e, taskId) => {
    e.dataTransfer.setData('taskId', taskId);
  };

  const onDrop = (e, columnId) => {
    const taskId = e.dataTransfer.getData('taskId');
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, column: columnId } : t));
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const toggleSubtask = (taskId, index) => {
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        const subtasks = [...(t.subtasks || [
          { label: 'Initial Security Audit', done: true },
          { label: 'Module Refactoring', done: false },
          { label: 'Regression Testing', done: false }
        ])];
        subtasks[index] = { ...subtasks[index], done: !subtasks[index].done };
        const doneCount = subtasks.filter(s => s.done).length;
        const progress = Math.round((doneCount / subtasks.length) * 100);
        return { ...t, subtasks, progress };
      }
      return t;
    }));
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Strategic Metrics Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Completion Matrix', value: `${stats.completionRate}%`, icon: Target, color: 'text-primary-accent' },
          { label: 'Active Synapses', value: stats.activeLoad, icon: Zap, color: 'text-cyan-accent' },
          { label: 'Tactical Velocity', value: `${stats.velocity}/hr`, icon: TrendingUp, color: 'text-amber-accent' },
          { label: 'Threat Status', value: stats.threatLevel, icon: Shield, color: settings.crisisMode ? 'text-red-400' : 'text-emerald-400' },
        ].map((stat, i) => (
          <div key={i} className="glass-card p-4 border-white/5 flex items-center justify-between group hover:border-white/10 transition-all">
            <div>
              <p className="text-[10px] font-black text-muted uppercase tracking-widest mb-1">{stat.label}</p>
              <p className={`text-xl font-black ${stat.color}`}>{stat.value}</p>
            </div>
            <div className={`p-2 rounded-xl bg-white/5 ${stat.color} opacity-40 group-hover:opacity-100 transition-opacity`}>
              <stat.icon size={20} />
            </div>
          </div>
        ))}
      </div>

      <div className="flex xl:grid xl:grid-cols-4 gap-6 overflow-x-auto xl:overflow-x-visible pb-6 -mx-4 px-4 snap-x custom-scrollbar">
        {columns.map(column => (
          <div 
            key={column.id}
            onDrop={(e) => onDrop(e, column.id)}
            onDragOver={onDragOver}
            className="flex-shrink-0 w-[280px] md:w-[320px] xl:w-auto snap-center flex flex-col gap-4"
          >
            <div className="flex items-center justify-between px-2 bg-white/2 rounded-xl py-2 group/col animate-in fade-in slide-in-from-top-2 duration-500">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full bg-current ${column.color} shadow-[0_0_10px_currentColor]`} />
                <h3 className="text-[11px] font-black text-white uppercase tracking-[0.2em]">{column.title}</h3>
                <span className="text-[10px] font-black text-muted bg-white/5 px-2.5 py-0.5 rounded-lg border border-white/5">
                  {tasks.filter(t => t.column === column.id).length}
                </span>
              </div>
              <button 
                onClick={() => {
                  setNewTaskForm({ ...newTaskForm, column: column.id });
                  setIsAddingTask(true);
                }}
                className="text-muted hover:text-white transition-all hover:scale-110 opacity-0 group-hover/col:opacity-100"
              >
                <Plus size={16} />
              </button>
            </div>

            <div className="flex-1 space-y-4">
              <AnimatePresence>
                {tasks.filter(t => t.column === column.id).map(task => {
                  const isUrgent = task.priority === 'urgent' || task.priority === 'high';
                  const highlightCrisis = settings.crisisMode && isUrgent;
                  
                  return (
                    <motion.div
                      key={task.id}
                      layoutId={task.id}
                      draggable
                      onDragStart={(e) => onDragStart(e, task.id)}
                      whileHover={{ y: -5, scale: 1.01 }}
                      onClick={(e) => {
                        if (e.target.closest('button')) return;
                        setSelectedTask(task);
                      }}
                      className={`glass-card p-5 cursor-pointer border-white/5 hover:border-white/20 transition-all group relative overflow-hidden ${
                        highlightCrisis ? 'shadow-[0_0_20px_rgba(239,68,68,0.4)] border-red-500/30' : 'shadow-xl'
                      }`}
                    >
                      {/* Priority Aura */}
                      <div className={`absolute -top-12 -right-12 w-24 h-24 blur-3xl rounded-full transition-opacity duration-700 ${
                        task.priority === 'urgent' ? 'bg-red-500/20' : 
                        task.priority === 'high' ? 'bg-amber-500/20' : 'bg-cyan-500/20'
                      } ${highlightCrisis ? 'opacity-100 animate-pulse' : 'opacity-0 group-hover:opacity-100'}`} />

                      <div className="flex items-start justify-between mb-4 relative z-10">
                        <div className="flex gap-2">
                          <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded border ${
                            task.priority === 'urgent' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 
                            task.priority === 'high' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                            'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
                          }`}>
                            {task.priority}
                          </span>
                          {highlightCrisis && (
                            <span className="text-[8px] font-black uppercase px-2 py-0.5 rounded bg-red-600 text-white animate-pulse">Critical Alert</span>
                          )}
                        </div>
                        <button className="text-muted opacity-0 group-hover:opacity-100 transition-all p-1 hover:bg-white/5 rounded-lg">
                          <MoreHorizontal size={14} />
                        </button>
                      </div>
                      
                      <h4 className={`text-[13px] font-bold text-white mb-6 group-hover:text-primary-accent transition-colors leading-snug tracking-tight ${highlightCrisis ? 'text-red-400' : ''}`}>
                        {task.title}
                      </h4>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-white/5 relative z-10">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-xl bg-surface-border flex items-center justify-center text-[10px] text-white font-black border border-white/5 shadow-inner transition-all ${column.id === 'doing' ? 'shadow-[0_0_10px_rgba(16,185,129,0.3)] animate-pulse' : ''}`}>
                            {task.agent.substring(0, 2)}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[8px] text-muted font-black uppercase tracking-widest leading-none mb-1">Synapse</span>
                            <span className="text-[10px] text-white/60 font-medium">Core {Math.floor(Math.random() * 8 + 1)}</span>
                          </div>
                        </div>
                        {task.progress !== undefined && (
                          <div className="flex flex-col items-end gap-1">
                            <div className="flex items-center gap-1.5">
                              <Activity size={10} className={column.id === 'doing' ? 'text-primary-accent animate-spin-slow' : 'text-muted'} />
                              <span className="text-[10px] text-white font-black font-mono">{task.progress}%</span>
                            </div>
                            <div className="w-16 h-1 bg-white/5 rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${task.progress}%` }}
                                className={`h-full ${column.id === 'done' ? 'bg-primary-accent' : 'bg-cyan-accent shadow-[0_0_8px_rgba(6,182,212,0.5)]'}`} 
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        ))}
      </div>

      {/* Task Detail Dialog */}
      <Dialog 
        isOpen={!!selectedTask} 
        onClose={() => setSelectedTask(null)} 
        title="Tactical Intelligence"
      >
        {selectedTask && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase border ${
                  selectedTask.priority === 'urgent' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
                }`}>
                  {selectedTask.priority} Priority
                </span>
                <span className="text-[10px] text-muted font-black uppercase tracking-[0.2em]">{selectedTask.column.replace('-', ' ')}</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-bold text-muted uppercase tracking-widest">
                <Clock size={12} />
                <span>T-Minus 48h</span>
              </div>
            </div>

            <h2 className="text-2xl lg:text-3xl font-black text-white leading-[1.1] tracking-tight">
              {selectedTask.title}
            </h2>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-muted uppercase text-[9px] font-black tracking-[0.25em]">
                <AlignLeft size={14} className="text-primary-accent" />
                Mission Briefing
              </div>
              <div className="text-[13px] text-white/70 leading-relaxed font-medium bg-white/2 p-5 rounded-2xl border border-white/5 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-primary-accent opacity-30 group-hover:opacity-100 transition-opacity" />
                Agent {selectedTask.agent} is currently executing the synaptic reroute protocol for this segment. System telemetry indicates optimal synchronization. Expect completion within the designated window.
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-muted uppercase text-[9px] font-black tracking-[0.25em]">
                <CheckSquare size={14} className="text-cyan-accent" />
                Sub-Synapse Status
              </div>
              <div className="space-y-2">
                {(selectedTask.subtasks || [
                  { label: 'Initial Security Audit', done: true },
                  { label: 'Module Refactoring', done: false },
                  { label: 'Regression Testing', done: false }
                ]).map((sub, i) => (
                  <button 
                    key={i} 
                    onClick={() => toggleSubtask(selectedTask.id, i)}
                    className="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-md border-2 transition-all flex items-center justify-center ${sub.done ? 'bg-primary-accent border-primary-accent' : 'border-white/10'}`}>
                        {sub.done && <ArrowRight size={14} className="text-background-custom" />}
                      </div>
                      <span className={`text-xs font-bold ${sub.done ? 'text-white' : 'text-white/40'}`}>{sub.label}</span>
                    </div>
                    {sub.done && <span className="text-[9px] font-black text-primary-accent uppercase tracking-widest">Complete</span>}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-6 grid grid-cols-2 gap-8 border-t border-white/5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-surface-border flex items-center justify-center text-2xl shadow-2xl border border-white/5">
                  {selectedTask.agent.substring(0, 1) === 'A' ? '🧠' : '🤖'}
                </div>
                <div>
                  <p className="text-[9px] text-muted uppercase font-black tracking-widest leading-none mb-1.5">Assigned Agent</p>
                  <p className="text-sm text-white font-black">{selectedTask.agent} Processor</p>
                </div>
              </div>
              <div className="flex flex-col items-end justify-center text-right">
                <p className="text-[9px] text-muted uppercase font-black tracking-widest leading-none mb-1.5">Projected Yield</p>
                <div className="flex items-center gap-2">
                  <TrendingUp size={14} className="text-primary-accent" />
                  <p className="text-xl text-white font-black font-mono">{selectedTask.progress || 0}%</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </Dialog>
      
      {/* Add Task Dialog */}
      <Dialog 
        isOpen={isAddingTask} 
        onClose={() => setIsAddingTask(false)} 
        title="Deploy Critical Task"
      >
        <form onSubmit={handleAddTask} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-black text-muted uppercase mb-2 tracking-[0.2em]">Task Title</label>
              <input 
                autoFocus
                value={newTaskForm.title}
                onChange={(e) => setNewTaskForm({ ...newTaskForm, title: e.target.value })}
                placeholder="Initialize core neural rerouting..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white font-bold text-sm focus:outline-none focus:border-primary-accent/50 focus:ring-4 focus:ring-primary-accent/10 transition-all placeholder:text-white/10"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-black text-muted uppercase mb-2 tracking-[0.2em]">Priority</label>
                <select 
                  value={newTaskForm.priority}
                  onChange={(e) => setNewTaskForm({ ...newTaskForm, priority: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-xs font-black text-white focus:outline-none focus:border-primary-accent/50 transition-all appearance-none cursor-pointer uppercase tracking-widest"
                >
                  <option value="low" className="bg-[#0c0c14]">Nominal</option>
                  <option value="medium" className="bg-[#0c0c14]">Standard</option>
                  <option value="high" className="bg-[#0c0c14]">High</option>
                  <option value="urgent" className="bg-[#0c0c14]">Critical</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-black text-muted uppercase mb-2 tracking-[0.2em]">Assign Core</label>
                <select 
                  value={newTaskForm.agent}
                  onChange={(e) => setNewTaskForm({ ...newTaskForm, agent: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-xs font-black text-white focus:outline-none focus:border-primary-accent/50 transition-all appearance-none cursor-pointer uppercase tracking-widest"
                >
                  <option value="Alpha" className="bg-[#0c0c14]">Alpha Prime</option>
                  <option value="Dispatch" className="bg-[#0c0c14]">D-Bot Core</option>
                  <option value="Audit" className="bg-[#0c0c14]">A-Bot Sentinel</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-6">
            <button 
              type="button"
              onClick={() => setIsAddingTask(false)}
              className="flex-1 py-4 rounded-2xl border border-white/10 text-white text-xs font-black uppercase tracking-[0.2em] hover:bg-white/5 transition-all"
            >
              Abort
            </button>
            <button 
              type="submit"
              className="flex-1 py-4 rounded-2xl bg-primary-accent text-white text-xs font-black uppercase tracking-[0.2em] shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:shadow-emerald-500/50 hover:scale-[1.02] transition-all"
            >
              Init Sync
            </button>
          </div>
        </form>
      </Dialog>
    </div>
  );
};

export default TaskBoard;
