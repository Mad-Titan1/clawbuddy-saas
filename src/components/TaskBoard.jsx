import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MoreHorizontal, Plus, AlertCircle, Calendar, User, AlignLeft, CheckSquare } from 'lucide-react';
import Dialog from './Dialog';

const columns = [
  { id: 'todo', title: 'To Do', color: 'text-muted' },
  { id: 'doing', title: 'Doing', color: 'text-cyan-accent' },
  { id: 'needs-input', title: 'Needs Input', color: 'text-amber-accent' },
  { id: 'done', title: 'Done', color: 'text-primary-accent' }
];

const TaskBoard = ({ initialTasks, onSaveTasks }) => {
  const [tasks, setTasks] = useState(initialTasks);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    onSaveTasks(tasks);
  }, [tasks, onSaveTasks]);

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

  return (
    <>
      <div className="flex gap-6 overflow-x-auto pb-6 no-scrollbar min-h-[600px]">
        {columns.map(column => (
          <div 
            key={column.id}
            onDrop={(e) => onDrop(e, column.id)}
            onDragOver={onDragOver}
            className="flex-shrink-0 w-80 flex flex-col gap-4"
          >
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full bg-current ${column.color}`} />
                <h3 className="text-sm font-bold text-white uppercase tracking-widest">{column.title}</h3>
                <span className="text-xs text-muted bg-white/5 px-2 py-0.5 rounded-full">
                  {tasks.filter(t => t.column === column.id).length}
                </span>
              </div>
              <button className="text-muted hover:text-white transition-colors">
                <Plus size={16} />
              </button>
            </div>

            <div className="flex-1 space-y-3">
              <AnimatePresence>
                {tasks.filter(t => t.column === column.id).map(task => (
                  <motion.div
                    key={task.id}
                    layoutId={task.id}
                    draggable
                    onDragStart={(e) => onDragStart(e, task.id)}
                    whileHover={{ scale: 1.02 }}
                    onClick={(e) => {
                      if (e.target.closest('button')) return;
                      setSelectedTask(task);
                    }}
                    className="glass-card p-5 cursor-pointer border-white/5 hover:border-primary-accent/30 transition-all group shadow-xl relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-primary-accent/5 blur-2xl -mr-12 -mt-12 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    <div className="flex items-start justify-between mb-4 relative z-10">
                      <span className={`text-[9px] font-black uppercase px-2.5 py-1 rounded-lg ${
                        task.priority === 'urgent' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 
                        task.priority === 'high' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                        'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                      }`}>
                        {task.priority}
                      </span>
                      <button className="text-muted opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-white/5 rounded">
                        <MoreHorizontal size={14} />
                      </button>
                    </div>
                    
                    <h4 className="text-sm font-bold text-white mb-6 group-hover:text-primary-accent transition-colors line-clamp-2 leading-relaxed tracking-tight">{task.title}</h4>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-white/5 relative z-10">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-surface-border flex items-center justify-center text-sm shadow-inner text-white font-bold border border-white/5">
                          {task.agent}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[9px] text-muted font-bold uppercase tracking-tighter leading-none">Deployer</span>
                          <span className="text-[10px] text-white/80 font-bold">Active</span>
                        </div>
                      </div>
                      {task.progress && (
                        <div className="flex flex-col items-end gap-1.5">
                          <span className="text-[10px] text-white font-mono font-bold leading-none">{task.progress}%</span>
                          <div className="w-16 h-1 bg-white/5 rounded-full overflow-hidden border border-white/5">
                            <div 
                              className="h-full bg-primary-accent shadow-[0_0_8px_rgba(16,185,129,0.5)]" 
                              style={{ width: `${task.progress}%` }} 
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        ))}
      </div>

      <Dialog 
        isOpen={!!selectedTask} 
        onClose={() => setSelectedTask(null)} 
        title="Task Intelligence"
      >
        {selectedTask && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                  selectedTask.priority === 'urgent' ? 'bg-red-500/10 text-red-400' : 'bg-cyan-500/10 text-cyan-400'
                }`}>
                  {selectedTask.priority} Priority
                </span>
                <span className="text-xs text-muted font-medium uppercase tracking-widest">{selectedTask.column}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted">
                <Calendar size={14} />
                <span>Due in 2 days</span>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-white leading-tight">
              {selectedTask.title}
            </h2>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-muted uppercase text-[10px] font-bold tracking-widest">
                <AlignLeft size={14} />
                Description
              </div>
              <p className="text-sm text-white/70 leading-relaxed italic bg-white/5 p-4 rounded-xl border border-white/5">
                "Agent {selectedTask.agent} is currently analyzing the security parameters and refactoring the core logic for this module. Preliminary scans suggest a 15% performance gain upon successful implementation."
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-muted uppercase text-[10px] font-bold tracking-widest">
                <CheckSquare size={14} />
                Sub-tasks
              </div>
              <div className="space-y-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5 group/task hover:bg-white/10 transition-colors cursor-pointer">
                    <div className={`w-4 h-4 rounded border border-white/20 flex items-center justify-center ${i === 1 ? 'bg-primary-accent/20 border-primary-accent' : ''}`}>
                      {i === 1 && <div className="w-2 h-2 rounded-sm bg-primary-accent" />}
                    </div>
                    <span className={`text-sm ${i === 1 ? 'text-white font-medium' : 'text-muted'}`}>
                      Phase {i}: {i === 1 ? 'Initial Security Audit' : i === 2 ? 'Module Refactoring' : 'Regression Testing'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 flex items-center justify-between border-t border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-surface-border flex items-center justify-center text-xl shadow-lg border border-white/5">
                  {selectedTask.agent}
                </div>
                <div>
                  <p className="text-[10px] text-muted uppercase font-bold tracking-tighter leading-none mb-1">Assigned Agent</p>
                  <p className="text-sm text-white font-bold">Active Processor</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-muted uppercase font-bold tracking-tighter leading-none mb-1">Completion</p>
                <p className="text-sm text-white font-bold font-mono">{selectedTask.progress || 0}%</p>
              </div>
            </div>
          </div>
        )}
      </Dialog>
    </>
  );
};

export default TaskBoard;
