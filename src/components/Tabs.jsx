import React from 'react';
import { motion } from 'framer-motion';

const Tabs = ({ tabs, activeTab, onTabChange }) => {
  return (
    <nav className="flex items-center gap-2 p-1 glass-card bg-surface/50 border-surface-border overflow-x-auto no-scrollbar">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-lg whitespace-nowrap ${
            activeTab === tab.id ? 'text-white' : 'text-muted hover:text-white hover:bg-white/5'
          }`}
        >
          {activeTab === tab.id && (
            <motion.div
              layoutId="active-tab"
              className="absolute inset-0 bg-primary-accent/10 border border-primary-accent/20 rounded-lg -z-0"
              transition={{ type: "spring", duration: 0.5 }}
            />
          )}
          <span className="relative z-10">{tab.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default Tabs;
