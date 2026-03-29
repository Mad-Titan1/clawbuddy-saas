import React, { useState } from 'react';
import Layout from './components/Layout';
import Tabs from './components/Tabs';
import { motion, AnimatePresence } from 'framer-motion';
import CommandDeck from './components/CommandDeck';
import AgentProfiles from './components/AgentProfiles';
import TaskBoard from './components/TaskBoard';
import AILog from './components/AILog';
import Council from './components/Council';
import MeetingIntelligence from './components/MeetingIntelligence';

import useLocalStorage from './hooks/useLocalStorage';
import { useSimulation } from './hooks/useSimulation';
import { activities as initialActivities, agents as initialAgents, logs as initialLogs, tasks as initialTasks } from './data/mockData';

const tabs = [
  { id: 'command-deck', label: 'Command Deck' },
  { id: 'agents', label: 'Agents' },
  { id: 'task-board', label: 'Task Board' },
  { id: 'ai-log', label: 'AI Log' },
  { id: 'council', label: 'Council' },
  { id: 'meetings', label: 'Meetings' },
];

function App() {
  const [activeTab, setActiveTab] = useState('command-deck');
  
  // Persisted state
  const [activities, setActivities] = useLocalStorage('clawmatrix_activities', initialActivities);
  const [agents, setAgents] = useLocalStorage('clawmatrix_agents', initialAgents);
  const [logs, setLogs] = useLocalStorage('clawmatrix_logs', initialLogs);
  const [tasks, setTasks] = useLocalStorage('clawmatrix_tasks', initialTasks);

  // Run live simulation
  useSimulation({ setActivities, setLogs, setAgents });

  const renderTabContent = () => {
    switch (activeTab) {
      case 'command-deck': 
        return <CommandDeck activities={activities} agents={agents} />;
      case 'agents': 
        return <AgentProfiles agents={agents} onUpdateAgents={setAgents} />;
      case 'task-board': 
        return <TaskBoard initialTasks={tasks} onSaveTasks={setTasks} />;
      case 'ai-log': 
        return <AILog logs={logs} />;
      case 'council': 
        return <Council />;
      case 'meetings': 
        return <MeetingIntelligence />;
      default: 
        return <CommandDeck activities={activities} agents={agents} />;
    }
  };

  return (
    <Layout tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab}>
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
  );
}

export default App;
