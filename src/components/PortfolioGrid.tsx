import React, { useState } from 'react';
import {
  ExternalLink,
  Layers,
  Monitor,
  ShoppingCart,
  Box,
  MapPin,
  TrendingUp,
  Home,
  Target,
  Palette,
  X,
  ArrowRight,
  Maximize2,
} from 'lucide-react';
import { PORTFOLIO, PortfolioItem } from '../data/taarruniData';

interface PortfolioGridProps {
  onRequestQuote: () => void;
}

export const PortfolioGrid: React.FC<PortfolioGridProps> = ({ onRequestQuote }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);

  const categories = ['All', 'Web & IT', 'SEO', 'Marketing'];

  const filteredProjects =
    activeCategory === 'All'
      ? PORTFOLIO
      : PORTFOLIO.filter((item) => item.category.includes(activeCategory));

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -14;
    card.style.transform = `perspective(900px) rotateX(${y}deg) rotateY(${x}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  return (
    <section id="portfolio" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-cyan-400 uppercase mb-3">
            <span>● Selected Works & Client Case Studies</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Our <span className="gradient-text">Portfolio</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl">
            Real production systems engineered by Taarruni, from enterprise CMS deployments to search engine dominance.
          </p>
        </div>

        {/* Category filter tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-white/5 rounded-2xl border border-white/10 overflow-x-auto max-w-full">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 3x3 Project Grid with real production screenshots */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredProjects.map((project, idx) => (
          <div
            key={project.id}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={() => setSelectedProject(project)}
            style={{
              transition: 'transform 0.15s ease-out, border-color 0.3s ease',
            }}
            className="group relative rounded-3xl glass-card p-5 border border-white/10 hover:border-purple-500/50 cursor-pointer overflow-hidden flex flex-col justify-between"
          >
            {/* Real Project Screenshot Container */}
            <div className="relative h-48 w-full rounded-2xl overflow-hidden mb-5 bg-slate-900 border border-white/10">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover object-top filter brightness-95 group-hover:brightness-105 group-hover:scale-105 transition-all duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06050d] via-transparent to-transparent opacity-60" />

              <span className="absolute top-3 left-3 text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-cyan-300 border border-white/15">
                {project.tag}
              </span>

              <span className="absolute top-3 right-3 text-[10px] font-bold tracking-wider uppercase px-2 py-1 rounded-md bg-purple-600/80 text-white">
                0{idx + 1}
              </span>

              <div className="absolute bottom-3 right-3 p-2 rounded-full bg-black/60 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>
            </div>

            <div>
              <div className="text-[11px] font-medium text-slate-400 mb-1">{project.client}</div>
              <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-2 line-clamp-1">
                {project.title}
              </h3>
              <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed mb-4">
                {project.description}
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-300 group-hover:text-cyan-400 font-semibold transition-colors">
              <span>View Full Case Study</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      {/* Project Case Study Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-[#0f0c1e] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-white/10 mb-6">
              <div>
                <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                  {selectedProject.tag} · {selectedProject.client}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">{selectedProject.title}</h3>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                aria-label="Close project details"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Real Project Image in Modal */}
            <div className="w-full rounded-2xl overflow-hidden border border-white/15 shadow-xl mb-6 bg-black/50">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-auto max-h-72 object-cover object-top"
              />
            </div>

            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              {selectedProject.description}
            </p>

            {/* Deliverables */}
            <div className="mb-6">
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2.5">
                Key Deliverables
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedProject.deliverables.map((deliv, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span>{deliv}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technologies */}
            <div className="mb-8">
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2.5">
                Technologies & Architecture
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-cyan-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setSelectedProject(null);
                  onRequestQuote();
                }}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 shadow-lg shadow-purple-500/25 transition-all"
              >
                Request Similar Project
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
