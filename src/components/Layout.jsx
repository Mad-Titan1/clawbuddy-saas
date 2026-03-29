import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout = ({ children, tabs, activeTab, onTabChange }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background-custom text-white selection:bg-primary-accent/30 overflow-x-hidden">
      <Sidebar 
        tabs={tabs} 
        activeTab={activeTab} 
        onTabChange={onTabChange} 
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />
      
      <div className={`transition-all duration-300 ${isCollapsed ? 'pl-20' : 'pl-[280px]'}`}>
        <Header />
        <main className="pt-24 pb-12 px-8 max-w-[1600px] mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
