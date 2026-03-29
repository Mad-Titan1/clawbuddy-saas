import { useEffect } from 'react';
import { agents } from '../data/mockData';

const ACTIONS = [
  "Optimizing database indices",
  "Tapping into secondary power grid",
  "Analyzing encrypted traffic",
  "Recalibrating neural weights",
  "Reviewing firewall logs",
  "Syncing with remote cluster",
  "Detecting latent data anomalies",
  "Clearing temporary cache buffers"
];

const LOG_MESSAGES = [
  "Notified of a minor latency spike in Zone B.",
  "System health report generated: 99.98% green.",
  "New security patch downloaded and staged.",
  "Observation: Query patterns shifted towards read-heavy.",
  "Resource alert: Memory usage at 74%.",
  "Sync complete: All nodes updated successfully."
];

export function useSimulation({ setActivities, setLogs, setAgents }) {
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly update an agent's activity
      const randomAgentIdx = Math.floor(Math.random() * 3);
      const randomAction = ACTIONS[Math.floor(Math.random() * ACTIONS.length)];
      
      setAgents(prev => prev.map((agent, i) => 
        i === randomAgentIdx ? { ...agent, activity: randomAction, lastSeen: 'just now' } : agent
      ));

      // Randomly add a new activity
      const newActivity = {
        id: Date.now(),
        agent: agents[randomAgentIdx].emoji,
        action: randomAction,
        time: new Date()
      };
      setActivities(prev => [newActivity, ...prev].slice(0, 10));

      // Randomly add a log message
      if (Math.random() > 0.5) {
        const newLog = {
          id: Date.now() + 1,
          agent: agents[randomAgentIdx].name,
          text: LOG_MESSAGES[Math.floor(Math.random() * LOG_MESSAGES.length)],
          category: Math.random() > 0.7 ? 'fyi' : 'observation'
        };
        setLogs(prev => [newLog, ...prev].slice(0, 20));
      }
    }, 15000); // Update every 15 seconds for more "live" feel

    return () => clearInterval(interval);
  }, [setActivities, setLogs, setAgents]);
}
