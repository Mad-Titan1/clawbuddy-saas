import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Zap, Shield, Cpu, Activity, Info } from 'lucide-react';

const NeuralMap = ({ agents, tasks, activities }) => {
  const [selectedNode, setSelectedNode] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [timeRange, setTimeRange] = useState(100);
  const [isLive, setIsLive] = useState(true);

  // Simple Force-ish layout logic
  const nodes = useMemo(() => {
    const center = { x: 400, y: 300, id: 'core', type: 'core', label: 'ClawMatrix Core' };
    
    // Filter agents based on timeRange (simulated)
    const filteredAgents = (agents || []).slice(0, Math.ceil((agents.length * timeRange) / 100));
    const agentNodes = filteredAgents.map((agent, i) => {
      const angle = (i / agents.length) * Math.PI * 2;
      const radius = 180;
      return {
        ...agent,
        id: agent.id,
        x: center.x + Math.cos(angle) * radius,
        y: center.y + Math.sin(angle) * radius,
        type: 'agent',
        label: agent.name
      };
    });

    const activeTasks = (tasks || []).filter(t => t.status === 'Executing' || t.status === 'In Progress');
    const filteredTasks = activeTasks.slice(0, Math.ceil((activeTasks.length * timeRange) / 100));
    const taskNodes = filteredTasks.map((task, i) => {
      const angle = (i / activeTasks.length) * Math.PI * 2 + 0.5;
      const radius = 320;
      return {
        ...task,
        id: `task-${task.id}`,
        x: center.x + Math.cos(angle) * radius,
        y: center.y + Math.sin(angle) * radius,
        type: 'task',
        label: task.title
      };
    });

    return [center, ...agentNodes, ...taskNodes];
  }, [agents, tasks]);

  const connections = useMemo(() => {
    const links = [];
    const core = nodes.find(n => n.id === 'core');
    
    nodes.forEach(node => {
      if (node.type === 'agent') {
        links.push({ source: core, target: node, status: 'active', strength: 2 });
      }
      if (node.type === 'task') {
        // Link task to its assignee agent
        const assignee = nodes.find(n => n.type === 'agent' && n.name === node.assignee);
        if (assignee) {
          links.push({ source: assignee, target: node, status: 'streaming', strength: 1 });
        } else {
          links.push({ source: core, target: node, status: 'pending', strength: 0.5 });
        }
      }
    });
    return links;
  }, [nodes]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between px-2">
        <div>
          <h2 className="text-2xl font-black text-white glow-text-primary tracking-tighter uppercase">Neural Mapping</h2>
          <p className="text-xs text-muted font-bold tracking-widest mt-1 opacity-60">Real-time synaptic correlation of the agent-task matrix</p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2 text-[10px] font-bold text-muted uppercase">
            <span className="w-2 h-2 rounded-full bg-primary-accent shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
            Neural Flow
          </div>
          <div className="flex items-center gap-2 text-[10px] font-bold text-muted uppercase">
            <span className="w-2 h-2 rounded-full bg-cyan-accent shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
            Active Tasks
          </div>
        </div>
      </div>

      <div className="glass-card p-4 lg:p-8 h-[500px] lg:h-[700px] relative overflow-hidden group">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.05),transparent_70%)] pointer-events-none" />
        
        {/* SVG Visualization */}
        <svg 
          viewBox="0 0 1000 700" 
          className="w-full h-full cursor-crosshair"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Defs for Glows */}
          <defs>
            <filter id="glow-primary">
              <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <linearGradient id="grad-active" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(16,185,129,0.1)" />
              <stop offset="50%" stopColor="#10b981" />
              <stop offset="100%" stopColor="rgba(16,185,129,0.1)" />
            </linearGradient>
          </defs>

          {/* Links */}
          {connections.map((link, i) => (
            <g key={i}>
              <motion.line
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.2 }}
                x1={link.source.x} y1={link.source.y}
                x2={link.target.x} y2={link.target.y}
                stroke="white"
                strokeWidth={link.strength}
                transition={{ duration: 1.5, delay: i * 0.1 }}
              />
              {link.status === 'streaming' && (
                <motion.circle
                  r="3"
                  fill="#10b981"
                  filter="url(#glow-primary)"
                >
                  <animateMotion
                    dur="3s"
                    repeatCount="indefinite"
                    path={`M ${link.source.x} ${link.source.y} L ${link.target.x} ${link.target.y}`}
                  />
                </motion.circle>
              )}
            </g>
          ))}

          {/* Nodes */}
          {nodes.map((node) => (
            <motion.g
              key={node.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: selectedNode === node.id ? 1.2 : 1, 
                opacity: 1 
              }}
              whileHover={{ scale: 1.1 }}
              onHoverStart={() => setHoveredNode(node)}
              onHoverEnd={() => setHoveredNode(null)}
              onClick={() => setSelectedNode(node.id === selectedNode ? null : node.id)}
              className="cursor-pointer"
            >
              {/* Node Background Glow */}
              {selectedNode === node.id && (
                <circle
                  cx={node.x} cy={node.y} r={node.type === 'core' ? 60 : 25}
                  fill={node.type === 'core' ? 'rgba(16,185,129,0.15)' : 'rgba(6,182,212,0.15)'}
                  className="animate-pulse"
                />
              )}

              {/* Main Circular Node */}
              <circle
                cx={node.x} cy={node.y}
                r={node.type === 'core' ? 40 : node.type === 'agent' ? 18 : 12}
                className={`${
                  node.type === 'core' ? 'fill-primary-accent' : 
                  node.type === 'agent' ? 'fill-background-custom stroke-primary-accent stroke-2' : 
                  'fill-background-custom stroke-cyan-accent stroke-1 shadow-glow'
                }`}
                style={{ filter: node.type === 'core' ? 'url(#glow-primary)' : 'none' }}
              />

              {/* Icon/Emoji for node */}
              <text
                x={node.x} y={node.y + 5}
                textAnchor="middle"
                className="text-[14px] pointer-events-none select-none"
              >
                {node.type === 'core' ? '💠' : node.avatar || (node.type === 'task' ? '📋' : '🤖')}
              </text>

              {/* Label */}
              <text
                x={node.x} y={node.y + (node.type === 'core' ? 60 : 40)}
                textAnchor="middle"
                className={`text-[9px] font-black uppercase tracking-[0.2em] pointer-events-none select-none transition-opacity ${
                  hoveredNode?.id === node.id || selectedNode === node.id ? 'opacity-100' : 'opacity-40'
                }`}
                fill="white"
              >
                {node.label}
              </text>
            </motion.g>
          ))}
        </svg>

        {/* Node Detail HUD */}
        <AnimatePresence>
          {(hoveredNode || selectedNode) && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="absolute right-6 top-6 w-80 glass-card p-6 border-white/10 shadow-2xl backdrop-blur-2xl z-20"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-2xl border border-white/10">
                    {(hoveredNode || nodes.find(n => n.id === selectedNode))?.avatar || '💠'}
                  </div>
                  <div>
                    <h4 className="font-black text-white uppercase tracking-wider text-sm">{(hoveredNode || nodes.find(n => n.id === selectedNode))?.label}</h4>
                    <p className="text-[10px] text-muted font-bold uppercase tracking-widest">{(hoveredNode || nodes.find(n => n.id === selectedNode))?.type}</p>
                  </div>
                </div>
                {selectedNode && (
                  <button onClick={() => setSelectedNode(null)} className="text-muted hover:text-white transition-colors">
                    <Zap size={14} />
                  </button>
                )}
              </div>

              {((hoveredNode || nodes.find(n => n.id === selectedNode))?.type === 'agent') && (() => {
                const node = hoveredNode || nodes.find(n => n.id === selectedNode);
                const currentTask = (tasks || []).find(t => t.assignee === node.name || t.agent === node.emoji);
                const agentActivities = (activities || []).filter(a => a.agent === node.emoji || a.agentName === node.name).slice(0, 3);
                
                return (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-muted uppercase tracking-tighter">Current Objective</span>
                      <span className="text-[10px] font-black text-cyan-accent uppercase">{currentTask ? 'Active' : 'Idle'}</span>
                    </div>
                    
                    <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                      <p className="text-xs font-bold text-white mb-1">{currentTask?.title || 'Awaiting assignment...'}</p>
                      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${currentTask?.progress || 0}%` }}
                          className="h-full bg-cyan-accent"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h5 className="text-[9px] font-black text-muted uppercase tracking-[0.25em]">Neural Activity Log</h5>
                      <div className="space-y-2">
                        {agentActivities.length > 0 ? agentActivities.map((act, i) => (
                          <div key={i} className="flex gap-2 items-start py-1 border-b border-white/5 last:border-0">
                            <div className="w-1 h-1 rounded-full bg-primary-accent mt-1.5 flex-shrink-0" />
                            <p className="text-[10px] text-white/70 leading-tight font-medium">{act.action}</p>
                          </div>
                        )) : (
                          <p className="text-[10px] text-muted italic">No recent historical data.</p>
                        )}
                      </div>
                    </div>

                    <div className="pt-2">
                      <div className="flex items-center justify-between text-[10px] font-bold text-muted uppercase tracking-tighter mb-1.5">
                        <span>Reliability Score</span>
                        <span className="text-primary-accent">{node.accuracy || '98%'}</span>
                      </div>
                      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden mb-6">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: node.accuracy || '98%' }}
                          className="h-full bg-primary-accent"
                        />
                      </div>

                      <button 
                         onClick={(e) => {
                           e.stopPropagation();
                           const originalAgent = agents?.find(a => a.id === (node.id || node.agentId));
                           if (originalAgent && originalAgent.onViewBrowser) {
                             originalAgent.onViewBrowser(originalAgent);
                           } else if (node.onViewBrowser) {
                             node.onViewBrowser(node);
                           }
                         }}
                         disabled={!node.browsingState?.active}
                         className={`w-full py-2.5 rounded-xl border font-bold text-[10px] uppercase tracking-widest transition-all active:scale-95 flex items-center justify-center gap-2 ${
                           node.browsingState?.active 
                             ? 'bg-cyan-accent/20 border-cyan-accent/30 text-cyan-accent hover:bg-cyan-accent/30 shadow-[0_0_15px_rgba(6,182,212,0.2)]' 
                             : 'bg-white/5 border-white/10 text-muted opacity-50 cursor-not-allowed'
                         }`}
                      >
                         <Globe size={14} />
                         {node.browsingState?.active ? 'Neural Perspective' : 'No Active Link'}
                      </button>
                    </div>
                  </div>
                );
              })()}

              {((hoveredNode || nodes.find(n => n.id === selectedNode))?.type === 'task') && (
                <div className="space-y-4">
                  <p className="text-xs text-muted leading-relaxed font-medium">{(hoveredNode || nodes.find(n => n.id === selectedNode)).description || 'Executing system-wide correlation protocol...'}</p>
                  <div className="p-3 rounded-xl bg-cyan-accent/5 border border-cyan-accent/20 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-cyan-accent uppercase">Priority</span>
                    <span className="text-[10px] font-black text-white uppercase">{(hoveredNode || nodes.find(n => n.id === selectedNode)).priority}</span>
                  </div>
                </div>
              )}

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2 text-primary-accent">
                <Activity size={12} className="animate-pulse" />
                <span className="text-[9px] font-black uppercase tracking-widest">Active Neural Link</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* HUD Overlay Elements */}
        <div className="absolute left-6 bottom-6 flex flex-col gap-2">
          <div className="flex items-center gap-3 px-4 py-2 bg-background-custom/60 backdrop-blur-md rounded-xl border border-white/5">
            <Cpu size={14} className="text-primary-accent" />
            <span className="text-[10px] font-black text-white uppercase tracking-wider">Neural Load: 42.4 tps</span>
          </div>
          <div className="flex items-center gap-3 px-4 py-2 bg-background-custom/60 backdrop-blur-md rounded-xl border border-white/5">
            <Zap size={14} className="text-amber-accent" />
            <span className="text-[10px] font-black text-white uppercase tracking-wider">Sync Latency: 12ms</span>
          </div>
        </div>

        {/* Time Machine HUD */}
        <div className="absolute right-6 bottom-6 flex flex-col gap-3 w-64 bg-background-custom/60 backdrop-blur-md p-4 rounded-2xl border border-white/5 shadow-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`w-1.5 h-1.5 rounded-full ${isLive ? 'bg-primary-accent animate-pulse shadow-[0_0_8px_rgba(16,185,129,1)]' : 'bg-muted'}`} />
              <span className="text-[10px] font-black text-white uppercase tracking-widest">{isLive ? 'Live Sync' : 'History Mode'}</span>
            </div>
            <button 
              onClick={() => {
                setIsLive(!isLive);
                if (!isLive) setTimeRange(100);
              }}
              className="text-[9px] font-bold text-primary-accent hover:underline uppercase tracking-tighter"
            >
              {isLive ? 'Enter History' : 'Back to Live'}
            </button>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center text-[8px] font-bold text-muted uppercase tracking-tighter">
              <span>T-24H</span>
              <span>NOW</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={timeRange} 
              disabled={isLive}
              onChange={(e) => setTimeRange(parseInt(e.target.value))}
              className={`w-full h-1 rounded-full appearance-none bg-white/10 accent-primary-accent cursor-pointer ${isLive ? 'opacity-20 cursor-not-allowed' : 'opacity-100'}`}
            />
          </div>
          
          <div className="flex items-center gap-2 text-muted">
            <Info size={10} />
            <span className="text-[8px] font-medium leading-tight">Scrub to visualize historical synaptic growth and task allocation.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NeuralMap;
