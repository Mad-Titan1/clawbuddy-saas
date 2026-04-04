import React, { useState, useEffect, useRef, useMemo } from 'react';
import Layout from './components/Layout';
import Tabs from './components/Tabs';
import { motion, AnimatePresence } from 'framer-motion';
import CommandDeck from './components/CommandDeck';
import AgentProfiles from './components/AgentProfiles';
import TaskBoard from './components/TaskBoard';
import AILog from './components/AILog';
import Council from './components/Council';
import MeetingIntelligence from './components/MeetingIntelligence';
import NeuralMap from './components/NeuralMap';
import CommandPalette from './components/CommandPalette';
import ResourceMonitor from './components/ResourceMonitor';
import CommunicationHub from './components/CommunicationHub';
import AgentMarketplace from './components/AgentMarketplace';
import ROIDashboard from './components/ROIDashboard';
import Terminal from './components/Terminal';
import WorkflowBuilder from './components/WorkflowBuilder';
import LiveBrowser from './components/LiveBrowser';
import NeuralVault from './components/NeuralVault';

import useLocalStorage from './hooks/useLocalStorage';
import { useSimulation } from './hooks/useSimulation';
import { activities as initialActivities, agents as initialAgents, logs as initialLogs, tasks as initialTasks } from './data/mockData';

const tabs = [
  { id: 'command-deck', label: 'Command Deck' },
  { id: 'flow-state', label: 'Flow State' },
  { id: 'agents', label: 'Agents' },
  { id: 'task-board', label: 'Task Board' },
  { id: 'ai-log', label: 'AI Log' },
  { id: 'neural-map', label: 'Neural Map' },
  { id: 'system-monitor', label: 'System Monitor' },
  { id: 'comm-hub', label: 'Comm Hub' },
  { id: 'marketplace', label: 'Marketplace' },
  { id: 'roi', label: 'ROI' },
  { id: 'usage-hub', label: 'Usage Hub' },
  { id: 'neural-vault', label: 'Neural Vault' },
  { id: 'council', label: 'Council' },
  { id: 'meetings', label: 'Meetings' },
];

function App() {
  const [activeTab, setActiveTab] = useState('command-deck');
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [viewingAgentBrowser, setViewingAgentBrowser] = useState(null);
  
  // Persisted state
  const [activities, setActivities] = useLocalStorage('clawmatrix_activities', initialActivities);
  const [agents, setAgents] = useLocalStorage('clawmatrix_agents', initialAgents);
  const [logs, setLogs] = useLocalStorage('clawmatrix_logs', initialLogs);
  const [tasks, setTasks] = useLocalStorage('clawmatrix_tasks', initialTasks);

  // Migration: Ensure agents have telemetry from initialAgents if missing in localStorage
  const migrationRef = useRef(false);
  useEffect(() => {
    if (migrationRef.current || !agents || !Array.isArray(agents)) return;
    
    let needsMigration = false;
    const mergedAgents = agents.map(agent => {
      const initial = initialAgents.find(ia => ia.id === agent.id);
      if (initial) {
        const needsUsage = !agent.usage && initial.usage;
        const needsBrowsing = !agent.browsingState && initial.browsingState;
        if (needsUsage || needsBrowsing) {
          needsMigration = true;
          return {
            ...agent,
            usage: agent.usage || initial.usage,
            browsingState: agent.browsingState || initial.browsingState
          };
        }
      }
      return agent;
    });

    if (needsMigration) {
      setAgents(mergedAgents);
    }
    migrationRef.current = true;
  }, [agents, setAgents]);

  // Run live simulation
  useSimulation({ setActivities, setLogs, setAgents });


  // Add global CMD+K listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'command-deck': 
        return <CommandDeck activities={activities} agents={agentsWithCallbacks} />;
      case 'flow-state': 
        return <WorkflowBuilder agents={agentsWithCallbacks} tasks={tasks} />;
      case 'agents': 
        return <AgentProfiles agents={agentsWithCallbacks} onUpdateAgents={setAgents} />;
      case 'task-board': 
        return <TaskBoard initialTasks={tasks} onSaveTasks={setTasks} />;
      case 'ai-log': 
        return <AILog logs={logs} />;
      case 'neural-map': 
        return <NeuralMap agents={agentsWithCallbacks} tasks={tasks} activities={activities} />;
      case 'system-monitor': 
        return <ResourceMonitor />;
      case 'comm-hub': 
        return <CommunicationHub agents={agents} />;
      case 'marketplace': 
        return <AgentMarketplace onAddAgent={(newAgent) => setAgents([...agents, { ...newAgent, id: agents.length + 1 }])} />;
      case 'roi': 
        return <ROIDashboard />;
      case 'usage-hub': 
        return <TokenUsage agents={agentsWithCallbacks} />;
      case 'neural-vault': 
        return <NeuralVault agents={agentsWithCallbacks} />;
      case 'council': 
        return <Council />;
      case 'meetings': 
        return <MeetingIntelligence />;
      default: 
        return <CommandDeck activities={activities} agents={agents} />;
    }
  };

  const agentsWithCallbacks = useMemo(() => {
    if (!Array.isArray(agents)) return [];
    return agents.map(agent => ({
      ...agent,
      onViewBrowser: (a) => setViewingAgentBrowser(a)
    }));
  }, [agents]);

  return (
    <>
      <Layout 
        tabs={tabs} 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        onSearchClick={() => setIsCommandPaletteOpen(true)}
        onTerminalClick={() => setIsTerminalOpen(true)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.02, y: -10 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {renderTabContent()}
          </motion.div>
        </AnimatePresence>
      </Layout>

      <CommandPalette 
        isOpen={isCommandPaletteOpen} 
        setIsOpen={setIsCommandPaletteOpen}
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        agents={agents}
        tasks={tasks}
      />

      <Terminal 
        isOpen={isTerminalOpen} 
        onClose={() => setIsTerminalOpen(false)} 
        agents={agentsWithCallbacks}
      />

      <LiveBrowser 
        agent={viewingAgentBrowser}
        isOpen={!!viewingAgentBrowser}
        onClose={() => setViewingAgentBrowser(null)}
      />
    </>
  );
}

export default App;
