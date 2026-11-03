import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Globe, Award, Layers } from 'lucide-react';
import { COMPANY_INFO } from '../data/taarruniData';

interface HeroSectionProps {
  onRequestQuote: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onRequestQuote }) => {
  return (
    <section id="home" className="relative min-h-[92vh] flex flex-col justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Ambient background glow highlights */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-cyan-500/15 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl">
        {/* Eyebrow tag */}
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full glass-card text-xs font-semibold text-cyan-300 border border-cyan-500/20 mb-6">
          <span className="w-2 h-2 rounded-full bg-cyan-400" />
          <span>A Leading Digital Marketing & IT Solutions Company</span>
          <span className="text-slate-500" aria-hidden="true">·</span>
          <span className="text-slate-300">Est. 2005</span>
        </div>

        {/* Main Display Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08] mb-6 text-balance">
          Web Design Company in <span className="gradient-text">Bangalore</span> — Crafting Digital Experiences.
        </h1>

        {/* Value Proposition Description */}
        <p className="text-lg sm:text-xl text-slate-300 leading-relaxed mb-9 max-w-2xl font-normal">
          Taarruni Design Solutions (TDS) is a leading multimedia and web solutions provider.
          Marketing Solutions and IT Solutions are what we are known for.
        </p>

        {/* Call-to-Action Row */}
        <div className="flex flex-wrap items-center gap-4 mb-16">
          <button
            onClick={onRequestQuote}
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 shadow-xl shadow-purple-600/30 transition-all hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Request Quote</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            href="#interactive-3d-lab"
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById('interactive-3d-lab');
              if (el) {
                const navHeight = 85;
                const pos = el.getBoundingClientRect().top + window.pageYOffset - navHeight;
                window.scrollTo({ top: pos, behavior: 'smooth' });
              }
            }}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-slate-200 glass-card hover:bg-white/10 hover:text-white transition-all border border-white/15"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Interactive 3D Studio</span>
          </a>

          <a
            href="#portfolio"
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById('portfolio');
              if (el) {
                const navHeight = 85;
                const pos = el.getBoundingClientRect().top + window.pageYOffset - navHeight;
                window.scrollTo({ top: pos, behavior: 'smooth' });
              }
            }}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-slate-300 hover:text-white transition-colors"
          >
            <span>View Portfolio</span>
          </a>
        </div>
      </div>

      {/* Hero Stats Row (Single level elevation with tabular numbers) */}
      <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-4 pt-6 border-t border-white/10">
        {COMPANY_INFO.stats.map((stat, idx) => (
          <div key={idx} className="p-4 sm:p-5 rounded-2xl glass-card">
            <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight tabular-nums gradient-text-subtle mb-1">
              {stat.value}
            </div>
            <div className="text-sm font-semibold text-slate-200">{stat.label}</div>
            <div className="text-xs text-slate-400 mt-0.5">{stat.note}</div>
          </div>
        ))}
      </div>
    </section>
  );
};
