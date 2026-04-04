import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FolderCode, FileCode, Search, Server, Cloud, 
  Terminal, Globe, Book, Database, RefreshCcw,
  ChevronRight, ChevronDown, CheckCircle2, AlertCircle, Download
} from 'lucide-react';
import { neuralRepositories } from '../data/mockData';

const NeuralVault = ({ agents }) => {
  const [selectedRepoId, setSelectedRepoId] = useState(neuralRepositories[0]?.id);
  const [selectedFileId, setSelectedFileId] = useState(neuralRepositories[0]?.files[0]?.id);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [syncProgress, setSyncProgress] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const selectedRepo = neuralRepositories.find(r => r.id === selectedRepoId);
  const selectedFile = selectedRepo?.files.find(f => f.id === selectedFileId);

  const triggerSync = (repoName) => {
    setIsSyncing(true);
    setSyncProgress(0);
    const interval = setInterval(() => {
      setSyncProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsSyncing(false), 500);
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  const triggerDownload = (name) => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
    }, 2000);
  };

  const filteredRepos = neuralRepositories.filter(repo => 
    repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    repo.agentId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between px-2">
        <div>
          <h2 className="text-2xl font-black text-white glow-text-primary tracking-tighter uppercase flex items-center gap-3">
            <Database className="text-primary-accent" />
            Neural Vault
          </h2>
          <p className="text-xs text-muted font-bold tracking-widest mt-1 opacity-60 uppercase">
            Centralized Repository for Agent-Generated Applications & Scripts
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-primary-accent transition-colors" size={14} />
            <input 
              type="text"
              placeholder="SEARCH NEURAL STORAGE..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-[10px] font-bold text-white placeholder:text-muted/50 focus:outline-none focus:border-primary-accent/40 focus:ring-4 focus:ring-primary-accent/5 transition-all w-64"
            />
          </div>
          <button 
            onClick={() => triggerSync()}
            className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black text-white uppercase tracking-[0.2em] hover:bg-white/10 transition-all flex items-center gap-2"
          >
            <RefreshCcw size={14} className={isSyncing ? 'animate-spin' : ''} />
            Sync Global Repos
          </button>
        </div>
      </div>

      <div className="flex flex-1 gap-6 min-h-0">
        {/* Repo Explorer */}
        <div className="w-[350px] flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar">
          {filteredRepos.map((repo) => (
            <div 
              key={repo.id}
              className={`p-4 rounded-2xl border transition-all cursor-pointer group ${
                selectedRepoId === repo.id 
                  ? 'bg-primary-accent/10 border-primary-accent/30 shadow-lg shadow-emerald-500/5' 
                  : 'bg-white/5 border-white/10 hover:border-white/20'
              }`}
              onClick={() => {
                setSelectedRepoId(repo.id);
                setSelectedFileId(repo.files[0]?.id);
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                    {repo.emoji}
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-white uppercase tracking-tighter">{repo.name}</h4>
                    <p className="text-[10px] text-muted font-bold opacity-60">{repo.agentId}</p>
                  </div>
                </div>
                <div className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest ${
                  repo.status === 'deployed' ? 'bg-emerald-500/20 text-emerald-500' : 'bg-amber-500/20 text-amber-500'
                }`}>
                  {repo.status}
                </div>
              </div>

              <div className="flex items-center justify-between text-[8px] font-black uppercase tracking-widest text-muted group-hover:text-white/60 transition-colors">
                <div className="flex items-center gap-1.5 px-2 py-1 bg-black/20 rounded-lg">
                  <Server size={10} />
                  {repo.vps}
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 bg-black/20 rounded-lg">
                  <RefreshCcw size={10} />
                  {repo.lastSync}
                </div>
              </div>

              {selectedRepoId === repo.id && (
                <div className="mt-4 pt-4 border-t border-white/5 flex flex-col gap-1 overflow-hidden">
                  {repo.files.map((file) => (
                    <button
                      key={file.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedFileId(file.id);
                      }}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all ${
                        selectedFileId === file.id ? 'bg-white/10 text-white shadow-xl' : 'text-muted hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <FileCode size={12} className={selectedFileId === file.id ? 'text-primary-accent' : 'text-inherit'} />
                      <span className="text-[10px] font-bold tracking-tight">{file.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Source Code Viewer */}
        <div className="flex-1 glass-card overflow-hidden flex flex-col relative group">
          <AnimatePresence>
            {isSyncing && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-background-custom/80 backdrop-blur-xl"
              >
                <div className="text-center space-y-4">
                  <div className="flex items-center gap-4 text-primary-accent">
                    <Cloud className="animate-bounce" size={40} />
                    <Server className="animate-pulse" size={40} />
                  </div>
                  <h3 className="text-xl font-black text-white tracking-[0.2em] uppercase">Fetching Source Layers</h3>
                  <div className="w-80 h-1 bg-white/5 rounded-full overflow-hidden mx-auto">
                    <motion.div 
                      className="h-full bg-primary-accent"
                      initial={{ width: 0 }}
                      animate={{ width: `${syncProgress}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-muted font-bold tracking-widest uppercase">Syncing with VPS: {selectedRepo?.vps}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Viewer Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/5 bg-white/[0.02]">
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-primary-accent">
                <FolderCode size={18} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black text-white uppercase tracking-widest">{selectedRepo?.name}</span>
                  <ChevronRight size={10} className="text-muted" />
                  <span className="text-[10px] font-black text-primary-accent uppercase tracking-widest">{selectedFile?.name}</span>
                </div>
                <div className="flex items-center gap-3 mt-1">
                  <p className="text-[8px] text-muted font-bold uppercase tracking-widest">Type: {selectedFile?.language}</p>
                  <span className="w-1 h-1 rounded-full bg-white/10" />
                  <p className="text-[8px] text-muted font-bold uppercase tracking-widest">VPS: {selectedRepo?.vps}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={() => triggerDownload(selectedFile?.name)}
                disabled={isDownloading}
                className="p-2 rounded-xl bg-white/5 border border-white/10 text-muted hover:text-white transition-all relative overflow-hidden"
              >
                {isDownloading ? (
                  <RefreshCcw size={14} className="animate-spin text-primary-accent" />
                ) : (
                  <Download size={14} />
                )}
              </button>
              <div className="h-6 w-[1px] bg-white/10 mx-2" />
              <button 
                onClick={() => triggerSync()}
                className="flex items-center gap-2 px-3 py-1.5 bg-primary-accent text-background-custom text-[8px] font-black uppercase tracking-widest rounded-lg shadow-lg shadow-emerald-500/20 hover:scale-105 transition-all"
              >
                <Cloud size={10} />
                Deploy Patch
              </button>
            </div>
          </div>

          {/* Editor Placeholder */}
          <div className="flex-1 overflow-auto bg-[#0a0c14] custom-scrollbar selection:bg-primary-accent/30 p-8 font-mono relative">
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-white/[0.02] border-r border-white/5 pointer-events-none flex flex-col pt-8 items-center text-[10px] text-muted/30 gap-[4px] select-none">
              {Array.from({ length: 40 }).map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
            
            <pre className="pl-12 text-[13px] leading-relaxed">
              <code className={`language-${selectedFile?.language}`}>
                {selectedFile?.content.split('\n').map((line, i) => (
                  <div key={i} className="whitespace-pre group/line relative">
                    <span className="text-white/90">{line}</span>
                    <div className="absolute -left-12 -right-8 h-full bg-white/5 opacity-0 group-hover/line:opacity-100 pointer-events-none transition-opacity" />
                  </div>
                ))}
              </code>
            </pre>
          </div>

          {/* Footer Info */}
          <div className="p-3 border-t border-white/5 bg-white/[0.02] flex items-center justify-between text-[8px] font-black text-muted uppercase tracking-[0.2em]">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={10} className="text-emerald-500" />
                Connection Secure
              </span>
              <span className="flex items-center gap-1.5">
                <Globe size={10} />
                SSL: TLS 1.3
              </span>
            </div>
            <span>CHARACTERS: {selectedFile?.content.length} | UTF-8 | LF</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NeuralVault;
