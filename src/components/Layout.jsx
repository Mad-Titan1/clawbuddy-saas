import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { useSettings } from '../hooks/useSettings';

const Layout = ({ children, tabs, activeTab, onTabChange, onSearchClick, onTerminalClick }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [settings] = useSettings();

  return (
    <div 
      data-crisis={settings.crisisMode}
      className="flex min-h-screen bg-background-custom font-sans text-white selection:bg-primary-accent/30 selection:text-white overflow-x-hidden transition-colors duration-700"
    >
      <Sidebar 
        tabs={tabs} 
        activeTab={activeTab} 
        onTabChange={(id) => {
          onTabChange(id);
          setIsMobileOpen(false);
        }} 
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />
      
      <div className="flex-1 flex flex-col min-w-0 transition-all duration-300">
        <Header 
          onSearchClick={onSearchClick} 
          onTerminalClick={onTerminalClick}
          onMenuClick={() => setIsMobileOpen(true)} 
        />
        <main className="flex-1 overflow-y-auto custom-scrollbar px-4 lg:px-8 pb-12">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
