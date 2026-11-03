import React, { useState } from 'react';
import { Search, X, Building, ExternalLink } from 'lucide-react';
import { CLIENT_ENTRIES, ClientEntry } from '../data/taarruniData';

export const ClientMarquee: React.FC = () => {
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredClients = CLIENT_ENTRIES.filter((client) =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="clients" className="relative py-14 border-y border-white/10 bg-[#090714]/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-wider text-slate-300">
          <Building className="w-4 h-4 text-cyan-400" />
          <span>Trusted by Leading Brands & Global Enterprises Across 20+ Years</span>
        </div>
        <button
          onClick={() => setIsClientModalOpen(true)}
          className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1.5 self-start sm:self-auto"
        >
          <span>Browse All 45+ Client Logos</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Infinite scrolling marquee track with authentic client logo images */}
      <div className="relative w-full overflow-hidden mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex gap-6 w-max animate-[marquee_45s_linear_infinite] hover:[animation-play-state:paused] py-2">
          {[...CLIENT_ENTRIES, ...CLIENT_ENTRIES].map((client, idx) => (
            <div
              key={idx}
              className="flex items-center justify-center bg-white px-4 py-2.5 rounded-2xl h-16 w-36 sm:w-40 shadow-md shadow-black/30 border border-white/20 transition-all duration-200 hover:scale-105 hover:shadow-cyan-500/15 group shrink-0"
              title={client.name}
            >
              <img
                src={client.image}
                alt={client.name}
                className="max-h-10 max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                loading="lazy"
                onError={(e) => {
                  // Fallback to text if image error
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent && !parent.querySelector('.fallback-name')) {
                    const span = document.createElement('span');
                    span.className = 'fallback-name text-xs font-bold text-slate-800 text-center truncate';
                    span.textContent = client.name;
                    parent.appendChild(span);
                  }
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Client Directory Modal with all 45+ client logo images */}
      {isClientModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-4xl bg-[#0f0c1e] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[88vh] flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">Client Portfolio Directory</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Taarruni has proudly engineered digital solutions for 45+ premier organizations.
                </p>
              </div>
              <button
                onClick={() => setIsClientModalOpen(false)}
                className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                aria-label="Close client directory"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search Box */}
            <div className="my-5 relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search clients (e.g. KPMG, Dell, MetLife, Havells, Henkel, Doosan)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
              />
            </div>

            {/* Client Logo Grid */}
            <div className="overflow-y-auto flex-1 pr-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
              {filteredClients.map((client, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-cyan-400 flex flex-col items-center justify-center h-24 transition-all duration-200 group"
                >
                  <img
                    src={client.image}
                    alt={client.name}
                    className="max-h-12 max-w-[85%] object-contain"
                    loading="lazy"
                  />
                  <span className="text-[10px] font-semibold text-slate-600 mt-1 truncate max-w-full">
                    {client.name}
                  </span>
                </div>
              ))}
              {filteredClients.length === 0 && (
                <div className="col-span-full py-12 text-center text-slate-400 text-sm">
                  No clients matching "{searchQuery}".
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center text-xs text-slate-400">
              <span>Showing {filteredClients.length} of {CLIENT_ENTRIES.length} brand logos</span>
              <button
                onClick={() => setIsClientModalOpen(false)}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-semibold transition-all shadow-md"
              >
                Close Directory
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
