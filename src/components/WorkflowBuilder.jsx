import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Plus, Zap, Play, Pause, RotateCcw, MousePointer2, X } from 'lucide-react';

const WorkflowBuilder = ({ agents, tasks }) => {
  const [selectedNode, setSelectedNode] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);

  // Layout logic for a vertical workflow view
  const workflowNodes = useMemo(() => {
    const nodes = [];
    const stepHeight = 150;
    const startY = 100;

    // Layer 1: Agents (Source)
    (agents || []).forEach((agent, i) => {
      if (!agent) return;
      nodes.push({
        ...agent,
        x: 150 + i * 250,
        y: startY,
        type: 'agent',
        label: agent.name || 'Unnamed Agent',
        color: agent.color || '#10b981'
      });
    });

    // Layer 2: Active Tasks
    const activeTasks = (tasks || []).filter(t => t && (t.column === 'doing' || t.column === 'todo'));
    activeTasks.forEach((task, i) => {
      nodes.push({
        ...task,
        x: 150 + i * 200,
        y: startY + stepHeight * 1.5,
        type: 'task',
        label: task.title || 'Untitled Task',
        color: '#06b6d4'
      });
    });

    return nodes;
  }, [agents, tasks]);

  const connections = useMemo(() => {
    const links = [];
    workflowNodes.filter(n => n.type === 'task').forEach(task => {
      // Find agent that matches task's emoji or role
      const agent = workflowNodes.find(n => n.type === 'agent' && (n.emoji === task.agent || n.id === task.agentId));
      if (agent) {
        links.push({ source: agent, target: task });
      }
    });
    return links;
  }, [workflowNodes]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight uppercase">Flow State</h2>
          <p className="text-sm text-muted font-medium">Orchestrate agent dependencies and task triggers</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-white/5 border border-white/10 rounded-xl p-1">
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className={`p-2 rounded-lg transition-all ${isPlaying ? 'bg-primary-accent text-white shadow-lg shadow-emerald-500/20' : 'text-muted hover:text-white'}`}
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            </button>
            <button 
              className="p-2 rounded-lg text-muted hover:text-white transition-all"
              onClick={() => setSelectedNode(null)}
            >
              <RotateCcw size={18} />
            </button>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-white hover:bg-white/10 transition-all">
            <Share2 size={14} />
            Export Flow
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary-accent text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-500/20 hover:scale-105 transition-all">
            <Plus size={14} />
            Add Trigger
          </button>
        </div>
      </div>

      <div className="glass-card h-[600px] relative overflow-hidden bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] bg-repeat">
        {/* Canvas Background Grid */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
          style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} 
        />

        <svg className="w-full h-full">
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orientation="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="rgba(255,255,255,0.2)" />
            </marker>
          </defs>

          {/* Connection Lines */}
          {connections.map((link, i) => {
            const path = `M ${link.source.x} ${link.source.y + 40} C ${link.source.x} ${link.source.y + 120}, ${link.target.x} ${link.target.y - 120}, ${link.target.x} ${link.target.y - 30}`;
            return (
              <g key={i}>
                <path 
                  d={path} 
                  fill="none" 
                  stroke="white" 
                  strokeWidth="2" 
                  strokeOpacity="0.05"
                  markerEnd="url(#arrowhead)"
                />
                <motion.path 
                  d={path} 
                  fill="none" 
                  stroke={link.source.color} 
                  strokeWidth="2" 
                  strokeOpacity="0.4"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
                {isPlaying && (
                  <motion.circle r="3" fill={link.source.color}>
                    <animateMotion dur="3s" repeatCount="indefinite" path={path} />
                  </motion.circle>
                )}
              </g>
            );
          })}

          {/* Logic Nodes */}
          {workflowNodes.map((node, i) => (
            <motion.g 
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => setSelectedNode(node)}
              className="cursor-pointer"
            >
              {/* Node Shadow/Glow */}
              <rect 
                x={node.x - 75} y={node.y - 30} width="150" height="60" rx="12"
                fill={node.color} opacity="0.05"
                className="blur-xl"
              />
              
              {/* Main Node Body */}
              <rect 
                x={node.x - 75} y={node.y - 30} width="150" height="60" rx="12"
                fill="#0d111c" stroke={selectedNode?.id === node.id ? node.color : "rgba(255,255,255,0.08)"}
                strokeWidth={selectedNode?.id === node.id ? "2" : "1"}
              />

              {/* Node Header */}
              <rect 
                x={node.x - 75} y={node.y - 30} width="150" height="24" rx="12"
                fill={node.color} opacity="0.1" 
              />
              
              {/* Icon/Type Label */}
              <text x={node.x - 65} y={node.y - 14} className="text-[8px] font-black uppercase tracking-widest" fill={node.color}>
                {node.type}
              </text>

              {/* Emoji/Avatar */}
              <text x={node.x - 60} y={node.y + 12} className="text-lg">
                {node.emoji || '📋'}
              </text>

              {/* Label */}
              <text x={node.x - 35} y={node.y + 10} className="text-[10px] font-bold" fill="white">
                {(node.label || '').length > 15 ? (node.label || '').substring(0, 15) + '...' : (node.label || '')}
              </text>

              {/* Ports */}
              <circle cx={node.x} cy={node.y - 30} r="3" fill="rgba(255,255,255,0.2)" />
              <circle cx={node.x} cy={node.y + 30} r="3" fill="rgba(255,255,255,0.2)" />
            </motion.g>
          ))}
        </svg>

        {/* Floating HUD */}
        <div className="absolute top-6 left-6 flex items-center gap-2 px-3 py-1.5 bg-background-custom/60 backdrop-blur-md rounded-lg border border-white/5 text-[10px] font-bold text-muted">
          <MousePointer2 size={12} />
          SELECT NODES TO VIEW DEPENDENCIES
        </div>

        <AnimatePresence>
          {selectedNode && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-6 left-1/2 -translate-x-1/2 glass-card p-6 w-[400px] border-white/10 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{selectedNode.emoji || '📋'}</div>
                  <div>
                    <h4 className="font-bold text-white text-sm">{selectedNode.label}</h4>
                    <p className="text-[10px] text-muted uppercase tracking-widest">{selectedNode.type} ID: {selectedNode.id}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedNode(null)} className="text-muted hover:text-white"><X size={16} /></button>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-center">
                  <p className="text-[8px] font-bold text-muted uppercase mb-1">Status</p>
                  <p className="text-xs font-black text-primary-accent uppercase">{selectedNode.status || 'Active'}</p>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-center">
                  <p className="text-[8px] font-bold text-muted uppercase mb-1">Sync Latency</p>
                  <p className="text-xs font-black text-white">0.02ms</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-primary-accent">
                <Zap size={12} className="animate-pulse" />
                <span className="text-[9px] font-black uppercase tracking-widest">Real-time Telemetry Processing</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default WorkflowBuilder;
