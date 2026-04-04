import React, { useState, useEffect } from 'react';
import { Settings, Search, Bell, ChevronDown, Menu, Shield, Zap, Info, LogOut, Trash2, CheckCircle2, AlertTriangle, Flame, Terminal as TerminalIcon } from 'lucide-react';
import Dialog from './Dialog';
import { useSettings } from '../hooks/useSettings';

const Header = ({ onSearchClick, onTerminalClick, onMenuClick }) => {
  const [activeModal, setActiveModal] = useState(null);
  const [settings, updateSetting] = useSettings();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Neural sync complete', time: '2m ago', type: 'success', read: false },
    { id: 2, title: 'Energy levels critical', time: '15m ago', type: 'warning', read: false },
    { id: 3, title: 'New mission received', time: '1h ago', type: 'info', read: false }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const dismissNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const handleLogout = () => {
    // In a real app, this would clear auth tokens and redirect
    window.location.reload(); 
  };

  return (
    <header className="px-4 lg:px-8 py-4 lg:py-6 sticky top-0 bg-background-custom/80 backdrop-blur-md z-40 border-b border-white/5">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 lg:gap-8 min-w-0">
          <button 
            onClick={onMenuClick}
            className="lg:hidden p-2.5 glass-card border-white/10 text-white/70 hover:text-white transition-all active:scale-90 flex-shrink-0"
          >
            <Menu size={20} />
          </button>
          <div className="min-w-0">
            <h2 className="text-lg lg:text-2xl font-bold text-white glow-text-primary tracking-tight truncate">Mission Control</h2>
            <p className={`text-[9px] font-medium uppercase tracking-widest hidden md:block ${settings.crisisMode ? 'text-red-500 animate-pulse' : 'text-muted opacity-60'}`}>
              {settings.crisisMode ? 'Critical Alert • All Systems Defensive' : 'System Operational • All Agents Active'}
            </p>
          </div>

          <div 
            onClick={onSearchClick}
            className="hidden xl:flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-xl focus-within:border-primary-accent/50 focus-within:bg-white/10 transition-all cursor-text xl:w-96 group"
          >
            <Search size={16} className="text-muted group-focus-within:text-primary-accent transition-colors" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="bg-transparent border-none outline-none text-sm text-white placeholder:text-muted/50 w-full"
            />
            <div className="hidden lg:flex items-center gap-1 px-1.5 py-0.5 bg-white/5 border border-white/10 rounded text-[10px] text-muted font-mono">
              <span className="text-[8px]">⌘</span>K
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 lg:gap-6 flex-shrink-0">
          <div className="flex items-center gap-1 lg:gap-2">
            <button 
              onClick={() => updateSetting('crisisMode', !settings.crisisMode)}
              className={`p-2 lg:p-2.5 rounded-xl transition-all ${
                settings.crisisMode 
                  ? 'bg-red-500 text-white crisis-pulse' 
                  : 'hover:bg-red-500/10 text-muted hover:text-red-500'
              }`}
              title={settings.crisisMode ? "Deactivate Crisis Mode" : "Activate Crisis Mode"}
            >
              <Flame size={18} fill={settings.crisisMode ? "currentColor" : "none"} />
            </button>
            <button 
              onClick={onTerminalClick}
              className="p-2 lg:p-2.5 hover:bg-white/10 rounded-xl text-muted hover:text-white transition-all"
              title="Open Agent Terminal"
            >
              <TerminalIcon size={18} />
            </button>
            <button 
              onClick={() => setActiveModal('notifications')}
              className="p-2 lg:p-2.5 hover:bg-white/10 rounded-xl text-muted hover:text-white transition-all relative"
            >
              <Bell size={18} />
              {unreadCount > 0 && (
                <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-red-500 rounded-full border-2 border-background-custom"></span>
              )}
            </button>
            <button 
              onClick={() => setActiveModal('settings')}
              className="p-2 lg:p-2.5 hover:bg-white/10 rounded-xl text-muted hover:text-white transition-all"
            >
              <Settings size={18} />
            </button>
          </div>

          <div className="hidden xs:block h-8 w-px bg-white/5" />

          <button 
            onClick={() => setActiveModal('profile')}
            className="flex items-center gap-2 lg:gap-3 p-1 lg:p-1.5 lg:pr-3 hover:bg-white/5 border border-transparent hover:border-white/10 rounded-2xl transition-all group"
          >
            <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-xl bg-gradient-to-br from-primary-accent to-cyan-accent p-[1px]">
              <div className="w-full h-full rounded-[11px] bg-background-custom flex items-center justify-center overflow-hidden">
                <img 
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
                  alt="User" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="text-left hidden md:block">
              <p className="text-xs lg:text-sm font-bold text-white group-hover:text-primary-accent transition-colors">Commander Rex</p>
              <p className="text-[9px] lg:text-[10px] text-muted font-bold uppercase tracking-tighter">Fleet Admiral</p>
            </div>
            <ChevronDown size={14} className="text-muted group-hover:text-white transition-colors" />
          </button>
        </div>
      </div>

      <Dialog 
        isOpen={!!activeModal} 
        onClose={() => {
          setActiveModal(null);
          setShowLogoutConfirm(false);
        }} 
        title={activeModal?.charAt(0).toUpperCase() + activeModal?.slice(1)}
      >
        {activeModal === 'notifications' && (
          <div className="space-y-4">
            {notifications.length > 0 ? (
              <>
                <div className="space-y-2">
                  {notifications.map(notif => (
                    <div key={notif.id} className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-start gap-3 group relative transition-all hover:bg-white/[0.07]">
                      <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                        notif.type === 'success' ? 'bg-emerald-500' : 
                        notif.type === 'warning' ? 'bg-amber-500' : 'bg-blue-500'
                      }`} />
                      <div className="flex-1">
                        <p className="text-sm font-bold text-white leading-none mb-1">{notif.title}</p>
                        <p className="text-[10px] text-muted font-medium">{notif.time}</p>
                      </div>
                      <button 
                        onClick={() => dismissNotification(notif.id)}
                        className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-white/10 rounded-lg text-muted hover:text-red-400 transition-all"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
                <button 
                  onClick={clearAllNotifications}
                  className="w-full py-3 text-xs font-bold text-muted hover:text-white transition-colors uppercase tracking-widest border border-dashed border-white/10 rounded-xl"
                >
                  Clear All Notifications
                </button>
              </>
            ) : (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-muted">
                  <Bell size={24} className="opacity-20" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">All Clear</p>
                  <p className="text-xs text-muted">No new alerts from the field.</p>
                </div>
              </div>
            )}
          </div>
        )}

        {activeModal === 'settings' && (
          <div className="space-y-6">
            <div className="space-y-4">
              <label className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 cursor-pointer hover:bg-white/10 transition-all group">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500"><Shield size={18} /></div>
                  <div className="text-left">
                    <span className="text-sm font-bold text-white block">Enhanced Security</span>
                    <span className="text-[10px] text-muted">Multi-layer encryption active</span>
                  </div>
                </div>
                <input 
                  type="checkbox" 
                  checked={settings.enhancedSecurity}
                  onChange={(e) => updateSetting('enhancedSecurity', e.target.checked)}
                  className="w-4 h-4 rounded border-white/10 bg-transparent text-primary-accent focus:ring-primary-accent transition-all cursor-pointer" 
                />
              </label>
              <label className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 cursor-pointer hover:bg-white/10 transition-all group">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500"><Zap size={18} /></div>
                  <div className="text-left">
                    <span className="text-sm font-bold text-white block">Performance Mode</span>
                    <span className="text-[10px] text-muted">Prioritize computational speed</span>
                  </div>
                </div>
                <input 
                  type="checkbox" 
                  checked={settings.performanceMode}
                  onChange={(e) => updateSetting('performanceMode', e.target.checked)}
                  className="w-4 h-4 rounded border-white/10 bg-transparent text-primary-accent focus:ring-primary-accent transition-all cursor-pointer" 
                />
              </label>
            </div>
            <div className="pt-4 border-t border-white/5">
              <p className="text-[10px] font-bold text-muted uppercase tracking-widest mb-4">System Telemetry</p>
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-muted">Firmware Version</span>
                  <span className="text-white font-mono">v4.8.2-stable</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-muted">Node Status</span>
                  <span className="text-emerald-500 font-bold uppercase flex items-center gap-1">
                    <CheckCircle2 size={12} /> Optimal
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeModal === 'profile' && (
          <div className="space-y-6">
            {!showLogoutConfirm ? (
              <>
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-accent to-cyan-accent p-[1px]">
                    <div className="w-full h-full rounded-[15px] bg-background-custom overflow-hidden">
                      <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Felix" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-white">Commander Rex</h4>
                    <p className="text-xs font-bold text-primary-accent uppercase tracking-tighter">Level 48 Fleet Admiral</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5 items-center flex flex-col gap-1">
                    <p className="text-[9px] font-black text-muted uppercase tracking-widest">Active Ops</p>
                    <p className="text-xl font-black text-white">12</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5 items-center flex flex-col gap-1">
                    <p className="text-[9px] font-black text-muted uppercase tracking-widest">Success Rate</p>
                    <p className="text-xl font-black text-emerald-500">99.4%</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <button className="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all text-sm font-bold group">
                    <div className="flex items-center gap-3">
                      <Info size={18} className="text-muted group-hover:text-primary-accent transition-colors" />
                      <span className="text-white">Account Details</span>
                    </div>
                    <ChevronDown size={14} className="-rotate-90 text-muted" />
                  </button>
                  <button 
                    onClick={() => setShowLogoutConfirm(true)}
                    className="w-full flex items-center gap-3 p-4 rounded-xl bg-red-500/5 hover:bg-red-500/10 border border-red-500/10 transition-all text-sm font-bold text-red-500"
                  >
                    <LogOut size={18} />
                    Logout Session
                  </button>
                </div>
              </>
            ) : (
              <div className="py-6 text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center mx-auto ring-4 ring-red-500/5">
                  <AlertTriangle size={32} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white">Terminate Session?</h4>
                  <p className="text-sm text-muted mt-2 px-6">You will need to re-authenticate with your neural link to regain access to Mission Control.</p>
                </div>
                <div className="flex gap-3">
                  <button 
                    onClick={() => setShowLogoutConfirm(false)}
                    className="flex-1 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white text-sm font-bold transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleLogout}
                    className="flex-1 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-bold transition-all shadow-lg shadow-red-500/20"
                  >
                    Yes, Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </Dialog>
    </header>
  );
};

export default Header;
