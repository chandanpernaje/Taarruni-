import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { COMPANY_INFO } from '../data/taarruniData';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="fixed right-6 bottom-6 z-50 flex flex-col items-end">
      {/* Popover Bubble */}
      {showTooltip && (
        <div className="mb-3 p-3.5 rounded-2xl bg-slate-900/95 border border-white/15 backdrop-blur-xl shadow-2xl max-w-xs text-xs text-slate-200 animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-center justify-between mb-1.5 pb-1 border-b border-white/10">
            <span className="font-bold text-emerald-400">Taarruni Direct Desk</span>
            <button
              onClick={() => setShowTooltip(false)}
              className="text-slate-400 hover:text-white"
              aria-label="Close message"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="leading-relaxed">
            Need an instant quote or discussion? Message our principal consultants on WhatsApp.
          </p>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={COMPANY_INFO.contacts.whatsappUrl}
        target="_blank"
        rel="noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        className="w-14 h-14 rounded-full bg-[#25d366] hover:bg-[#20ba5a] text-white flex items-center justify-center shadow-xl shadow-[#25d366]/35 transition-all hover:scale-110 active:scale-95 group focus:outline-none focus:ring-4 focus:ring-[#25d366]/40"
        aria-label="Chat with Taarruni on WhatsApp"
      >
        <MessageCircle className="w-7 h-7 drop-shadow-sm" />
      </a>
    </div>
  );
};
