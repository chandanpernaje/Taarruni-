import React, { useState } from 'react';
import { Award, Globe, ShieldCheck, CheckCircle2, RotateCw, ZoomIn, X, ExternalLink } from 'lucide-react';
import { COMPANY_INFO } from '../data/taarruniData';

export const AboutSection: React.FC = () => {
  const [cubeRotation, setCubeRotation] = useState({ x: -15, y: 35 });
  const [isHovered, setIsHovered] = useState(false);
  const [isInfographicOpen, setIsInfographicOpen] = useState(false);

  const cubeFaces = [
    { label: 'Web Design', transform: 'translateZ(90px)', color: 'from-purple-600/60 to-cyan-500/60' },
    { label: 'SEO / SEM', transform: 'rotateY(90deg) translateZ(90px)', color: 'from-cyan-500/60 to-emerald-500/60' },
    { label: '3D Animation', transform: 'rotateY(180deg) translateZ(90px)', color: 'from-pink-500/60 to-purple-600/60' },
    { label: 'E-Commerce', transform: 'rotateY(-90deg) translateZ(90px)', color: 'from-amber-500/60 to-pink-500/60' },
    { label: 'CMS Architecture', transform: 'rotateX(90deg) translateZ(90px)', color: 'from-purple-600/60 to-blue-600/60' },
    { label: 'Print Media', transform: 'rotateX(-90deg) translateZ(90px)', color: 'from-indigo-600/60 to-cyan-500/60' },
  ];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * -70;
    const y = ((e.clientX - rect.left) / rect.width - 0.5) * 70;
    setCubeRotation({ x, y });
  };

  const handleMouseLeave = () => {
    setCubeRotation({ x: -15, y: 35 });
    setIsHovered(false);
  };

  return (
    <section id="about" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
        {/* Left Column: Authentic History & Copy */}
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-cyan-400 uppercase mb-3">
            <span>● Who We Are</span>
            <span aria-hidden="true">·</span>
            <span>Est. 2005 in Bangalore</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            Multimedia & Web Solutions Since <span className="gradient-text">2005</span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-6 font-normal">
            Taarruni Design Solutions (TDS) is a leading Multimedia and web solutions provider.
            Incorporated in 2005 at Bangalore, India, the company presents itself as a prominent brand
            widely known for delivering an array of services in the field of designing and development
            for web designing, multimedia development services (2D/3D animation), web application development,
            Flash programming, E-Commerce programming services, SEO (Search Engine Optimization),
            SEM (Search Engine Marketing) and print media.
          </p>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-8">
            Headquartered in Bangalore with our US liaison office in Union City, California, we
            bridge agile full-stack engineering with pan-India branding and international digital
            marketing campaigns.
          </p>

          {/* Core Strengths Checklist */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            {[
              'Bespoke Web & IT Architecture',
              'Multi-disciplinary 2D & 3D Animation',
              'Pan-India Outdoor & Signage Branding',
              'Search Marketing for India & US Markets',
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2.5 text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          {/* Quick Dual Office Trust Markers */}
          <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-white/10 text-xs text-slate-300">
            <div className="flex items-center gap-2 bg-white/5 px-3.5 py-2 rounded-xl border border-white/10">
              <Globe className="w-4 h-4 text-purple-400" />
              <span>Head Office: Basavanagudi, Bangalore, India</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 px-3.5 py-2 rounded-xl border border-white/10">
              <Globe className="w-4 h-4 text-cyan-400" />
              <span>US Office: Union City, CA, USA</span>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Interactive Capability Cube */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          <div className="w-full max-w-sm rounded-3xl glass-panel p-8 flex flex-col items-center border border-white/10 shadow-2xl relative overflow-hidden">
            <div className="text-center mb-6">
              <span className="text-[11px] font-bold tracking-widest text-slate-400 uppercase">
                Interactive Capability Cube
              </span>
              <p className="text-xs text-cyan-400 mt-1">Hover & move cursor to inspect faces</p>
            </div>

            {/* 3D Cube Container */}
            <div
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={handleMouseLeave}
              className="relative w-[200px] h-[200px] my-6 cursor-grab [perspective:900px] select-none"
            >
              <div
                style={{
                  transform: `rotateX(${cubeRotation.x}deg) rotateY(${cubeRotation.y}deg)`,
                  transformStyle: 'preserve-3d',
                  transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.8s ease-out',
                }}
                className={`w-full h-full relative ${!isHovered ? 'animate-[spin_18s_linear_infinite]' : ''}`}
              >
                {cubeFaces.map((face, index) => (
                  <div
                    key={index}
                    style={{
                      transform: face.transform,
                    }}
                    className={`absolute inset-0 rounded-2xl border border-white/20 bg-gradient-to-br ${face.color} backdrop-blur-md flex flex-col items-center justify-center p-3 text-center shadow-lg`}
                  >
                    <span className="font-extrabold text-sm sm:text-base text-white tracking-tight drop-shadow-md">
                      {face.label}
                    </span>
                    <span className="text-[9px] uppercase tracking-wider text-cyan-200 mt-1 font-mono">
                      TDS Core
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom mini stats */}
            <div className="w-full grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-white/10 text-center">
              <div>
                <div className="text-xl font-extrabold text-white">2005</div>
                <div className="text-[11px] text-slate-400">Incorporation</div>
              </div>
              <div>
                <div className="text-xl font-extrabold text-white">45+</div>
                <div className="text-[11px] text-slate-400">Client Brands</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Official Taarruni Solution Blueprint Infographic Card */}
      <div className="rounded-3xl glass-card p-6 sm:p-8 border border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400">
              <Award className="w-4 h-4" />
              <span>Official Taarruni Architecture Blueprint</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              360° End-to-End <span className="gradient-text">Capability Map</span>
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Explore Taarruni's complete ecosystem blueprint spanning Web Development, Cloud Web Hosting, Digital Marketing, Search Engine Optimization, Printing & Signage, Startup Acceleration, and Web Application Engineering.
            </p>
            <div className="pt-2">
              <button
                onClick={() => setIsInfographicOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 transition-all shadow-md shadow-purple-500/20"
              >
                <ZoomIn className="w-4 h-4" />
                <span>View Full-Resolution Blueprint</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 flex justify-center">
            <div
              onClick={() => setIsInfographicOpen(true)}
              className="relative rounded-2xl overflow-hidden bg-white p-3 shadow-2xl cursor-pointer group hover:scale-[1.02] transition-transform max-w-md w-full border border-white/20"
            >
              <img
                src={COMPANY_INFO.infographic.imageUrl}
                alt={COMPANY_INFO.infographic.title}
                className="w-full h-auto object-contain rounded-xl"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-xs rounded-2xl">
                <span className="px-4 py-2 rounded-full bg-slate-900/90 text-white text-xs font-semibold flex items-center gap-2 shadow-lg">
                  <ZoomIn className="w-4 h-4 text-cyan-400" />
                  <span>Click to Expand Blueprint</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Infographic Lightbox Modal */}
      {isInfographicOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="relative w-full max-w-4xl bg-[#0f0c1e] border border-white/20 rounded-3xl p-6 shadow-2xl max-h-[92vh] flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <div>
                <h3 className="text-xl font-bold text-white">{COMPANY_INFO.infographic.title}</h3>
                <p className="text-xs text-slate-400">{COMPANY_INFO.infographic.caption}</p>
              </div>
              <button
                onClick={() => setIsInfographicOpen(false)}
                className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                aria-label="Close blueprint modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-auto flex-1 flex items-center justify-center p-2 bg-white rounded-2xl">
              <img
                src={COMPANY_INFO.infographic.imageUrl}
                alt={COMPANY_INFO.infographic.title}
                className="max-h-[70vh] w-auto object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
