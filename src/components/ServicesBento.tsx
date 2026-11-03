import React, { useState } from 'react';
import {
  TrendingUp,
  Code2,
  Building2,
  Search,
  Film,
  ArrowRight,
  CheckCircle,
  X,
  Layers,
  Sparkles,
  Globe,
  ShoppingCart,
  ShieldCheck,
} from 'lucide-react';
import { SERVICES, ServiceItem } from '../data/taarruniData';

interface ServicesBentoProps {
  onSelectServiceForQuote: (serviceTitle: string) => void;
}

export const ServicesBento: React.FC<ServicesBentoProps> = ({ onSelectServiceForQuote }) => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  // Card mouse tilt effect handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mx', `${x}px`);
    card.style.setProperty('--my', `${y}px`);
  };

  return (
    <section id="services" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      <div className="max-w-3xl mb-14">
        <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-cyan-400 uppercase mb-3">
          <span>● Comprehensive Digital Agency Capabilities</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
          Services <span className="gradient-text">We Are Known For</span>
        </h2>
        <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
          From high-performance CMS platforms, e-commerce architectures, and secure IT development to digital marketing, all India branding, and multimedia animation.
        </p>
      </div>

      {/* Asymmetric Bento Grid featuring original icons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1: Marketing Solutions (Spans 2 columns on lg) */}
        <div
          onMouseMove={handleMouseMove}
          onClick={() => setSelectedService(SERVICES[0])}
          className="lg:col-span-2 group relative p-8 rounded-3xl glass-card hover:border-purple-500/40 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between"
        >
          <div className="absolute top-0 right-0 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-purple-500/15 transition-all" />

          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="w-16 h-16 rounded-2xl bg-white p-2.5 shadow-md border border-white/20 flex items-center justify-center">
                <img
                  src="/images/online-marketing-icon.png"
                  alt="Marketing Solutions"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                Core Pillar
              </span>
            </div>

            <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
              {SERVICES[0].title}
            </h3>
            <p className="text-slate-300 text-base mb-6 leading-relaxed max-w-xl">
              {SERVICES[0].description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {SERVICES[0].bullets.map((bullet, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-sm text-slate-300">
                  <CheckCircle className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <span>{bullet}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-white/10 text-sm font-semibold text-purple-400 group-hover:text-cyan-400 transition-colors">
            <span>Explore Service Scope & Deliverables</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card 2: IT Solutions */}
        <div
          onMouseMove={handleMouseMove}
          onClick={() => setSelectedService(SERVICES[1])}
          className="group relative p-8 rounded-3xl glass-card hover:border-cyan-500/40 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between"
        >
          <div className="absolute top-0 right-0 w-60 h-60 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/15 transition-all" />

          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="w-16 h-16 rounded-2xl bg-white p-2.5 shadow-md border border-white/20 flex items-center justify-center">
                <img
                  src="/images/cms-development-icon.png"
                  alt="IT Solutions"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                Engineering
              </span>
            </div>

            <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
              {SERVICES[1].title}
            </h3>
            <p className="text-slate-300 text-sm mb-6 leading-relaxed">
              {SERVICES[1].shortDesc}
            </p>

            <ul className="space-y-2 mb-6 text-sm text-slate-300">
              {SERVICES[1].bullets.map((bullet, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-white/10 text-sm font-semibold text-cyan-400 group-hover:text-white transition-colors">
            <span>View Architecture</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card 3: CMS Development */}
        <div
          onMouseMove={handleMouseMove}
          onClick={() => setSelectedService(SERVICES[2])}
          className="group relative p-8 rounded-3xl glass-card hover:border-blue-500/40 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between"
        >
          <div>
            <div className="w-16 h-16 rounded-2xl bg-white p-2.5 shadow-md border border-white/20 flex items-center justify-center mb-6">
              <img
                src="/images/cms-development-icon.png"
                alt="CMS Development"
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
              {SERVICES[2].title}
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm mb-6 leading-relaxed">
              {SERVICES[2].shortDesc}
            </p>
            <ul className="space-y-2 mb-6 text-xs text-slate-400">
              {SERVICES[2].bullets.slice(0, 3).map((b, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs font-semibold text-blue-400">
            <span>Learn More</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card 4: Portal Development */}
        <div
          onMouseMove={handleMouseMove}
          onClick={() => setSelectedService(SERVICES[3])}
          className="group relative p-8 rounded-3xl glass-card hover:border-teal-500/40 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between"
        >
          <div>
            <div className="w-16 h-16 rounded-2xl bg-white p-2.5 shadow-md border border-white/20 flex items-center justify-center mb-6">
              <img
                src="/images/portal-development-icon.png"
                alt="Portal Development"
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-teal-300 transition-colors">
              {SERVICES[3].title}
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm mb-6 leading-relaxed">
              {SERVICES[3].shortDesc}
            </p>
            <ul className="space-y-2 mb-6 text-xs text-slate-400">
              {SERVICES[3].bullets.slice(0, 3).map((b, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs font-semibold text-teal-400">
            <span>Learn More</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card 5: E-Commerce Development */}
        <div
          onMouseMove={handleMouseMove}
          onClick={() => setSelectedService(SERVICES[4])}
          className="group relative p-8 rounded-3xl glass-card hover:border-emerald-500/40 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between"
        >
          <div>
            <div className="w-16 h-16 rounded-2xl bg-white p-2.5 shadow-md border border-white/20 flex items-center justify-center mb-6">
              <img
                src="/images/ecommerce-development-icon.png"
                alt="E-Commerce Development"
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
              {SERVICES[4].title}
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm mb-6 leading-relaxed">
              {SERVICES[4].shortDesc}
            </p>
            <ul className="space-y-2 mb-6 text-xs text-slate-400">
              {SERVICES[4].bullets.slice(0, 3).map((b, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs font-semibold text-emerald-400">
            <span>Learn More</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card 6: All India Branding */}
        <div
          onMouseMove={handleMouseMove}
          onClick={() => setSelectedService(SERVICES[5])}
          className="group relative p-8 rounded-3xl glass-card hover:border-amber-500/40 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between"
        >
          <div>
            <div className="w-16 h-16 rounded-2xl bg-white p-2.5 shadow-md border border-white/20 flex items-center justify-center mb-6">
              <img
                src="/images/comprehensive-marketing-icon.png"
                alt="All India Branding"
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
              {SERVICES[5].title}
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm mb-6 leading-relaxed">
              {SERVICES[5].shortDesc}
            </p>
            <ul className="space-y-2 mb-6 text-xs text-slate-400">
              {SERVICES[5].bullets.map((b, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs font-semibold text-amber-400">
            <span>Learn More</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card 7: SEO Services */}
        <div
          onMouseMove={handleMouseMove}
          onClick={() => setSelectedService(SERVICES[6])}
          className="group relative p-8 rounded-3xl glass-card hover:border-cyan-500/40 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between"
        >
          <div>
            <div className="w-16 h-16 rounded-2xl bg-white p-2.5 shadow-md border border-white/20 flex items-center justify-center mb-6">
              <img
                src="/images/secure-it-development-icon.png"
                alt="SEO Services"
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
              {SERVICES[6].title}
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm mb-6 leading-relaxed">
              {SERVICES[6].shortDesc}
            </p>
            <ul className="space-y-2 mb-6 text-xs text-slate-400">
              {SERVICES[6].bullets.map((b, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs font-semibold text-cyan-400">
            <span>Learn More</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card 8: Multimedia Development */}
        <div
          onMouseMove={handleMouseMove}
          onClick={() => setSelectedService(SERVICES[7])}
          className="group relative p-8 rounded-3xl glass-card hover:border-pink-500/40 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between"
        >
          <div>
            <div className="w-16 h-16 rounded-2xl bg-white p-2.5 shadow-md border border-white/20 flex items-center justify-center mb-6">
              <img
                src="/images/custom-it-development-icon.png"
                alt="Multimedia Development"
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-pink-300 transition-colors">
              {SERVICES[7].title}
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm mb-6 leading-relaxed">
              {SERVICES[7].shortDesc}
            </p>
            <ul className="space-y-2 mb-6 text-xs text-slate-400">
              {SERVICES[7].bullets.map((b, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-400" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs font-semibold text-pink-400">
            <span>Learn More</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-[#0f0c1e] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div className="flex items-center gap-3">
                {selectedService.iconImage ? (
                  <div className="w-12 h-12 rounded-xl bg-white p-2 shadow flex items-center justify-center">
                    <img
                      src={selectedService.iconImage}
                      alt={selectedService.title}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                    <Layers className="w-6 h-6 text-purple-400" />
                  </div>
                )}
                <div>
                  <h3 className="text-xl font-bold text-white">{selectedService.title}</h3>
                  <span className="text-xs text-cyan-400 font-medium">Taarruni Core Offering</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedService(null)}
                className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                aria-label="Close service details"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
              {selectedService.description}
            </p>

            <div className="mb-6">
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                Scope & Key Capabilities
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedService.bullets.map((bullet, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                    <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                Standard Deliverables
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedService.deliverables.map((item, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
              <button
                onClick={() => setSelectedService(null)}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const serviceName = selectedService.title;
                  setSelectedService(null);
                  onSelectServiceForQuote(serviceName);
                }}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 shadow-lg shadow-purple-500/25 transition-all"
              >
                Request Quote for {selectedService.title}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
