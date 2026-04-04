import React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const Dialog = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return createPortal(
    <AnimatePresence mode="wait">
      <div className="fixed inset-0 z-[9999] overflow-y-auto bg-background-custom/95 backdrop-blur-md pointer-events-auto">
        <div className="min-h-full flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="glass-card w-full max-w-lg overflow-hidden shadow-2xl border-white/10 !bg-[#0d111c] relative z-[10000]"
          >
            <div className="flex items-center justify-between p-5 sm:p-6 border-b border-white/5">
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">{title}</h3>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-white/5 rounded-full transition-colors text-muted hover:text-white"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-5 sm:p-6">
              {children}
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>,
    document.body
  );
};

export default Dialog;
