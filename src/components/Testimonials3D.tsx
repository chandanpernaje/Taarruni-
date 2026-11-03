import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star, MessageSquare } from 'lucide-react';
import { TESTIMONIALS } from '../data/taarruniData';

export const Testimonials3D: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const total = TESTIMONIALS.length;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  // Autoplay with hover pause
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 6500);
    return () => clearInterval(interval);
  }, [isPaused, currentIndex]);

  return (
    <section id="testimonials" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-28">
      {/* Target anchor for client speak / endorsements */}
      <span id="client-speak" className="absolute -top-24 left-0 block h-0 w-0" aria-hidden="true" />
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-cyan-400 uppercase mb-3">
          <MessageSquare className="w-4 h-4" />
          <span>Client Speak & Authentic Endorsements</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
          Words of <span className="gradient-text">Appreciation</span>
        </h2>
        <p className="text-slate-400 text-base sm:text-lg">
          Decades of trusted engineering relationships. Hear directly from founders, creative directors, and business executives who rely on TDS.
        </p>
      </div>

      {/* 3D Perspective Stage Container */}
      <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="relative h-[420px] sm:h-[380px] max-w-4xl mx-auto flex items-center justify-center [perspective:1200px]"
      >
        {TESTIMONIALS.map((testimonial, idx) => {
          let diff = idx - currentIndex;
          if (diff > total / 2) diff -= total;
          if (diff < -total / 2) diff += total;

          const absDiff = Math.abs(diff);
          const isCenter = diff === 0;

          // Responsive spacing offset
          const spacing = typeof window !== 'undefined' && window.innerWidth < 640 ? 120 : 260;

          // Compute 3D translation & rotation
          const translateX = diff * spacing;
          const translateZ = -absDiff * 140;
          const rotateY = -diff * 22;
          const opacity = absDiff > 2 ? 0 : 1 - absDiff * 0.32;
          const zIndex = 20 - absDiff;

          return (
            <div
              key={testimonial.id}
              style={{
                transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg)`,
                opacity: opacity,
                zIndex: zIndex,
                pointerEvents: isCenter ? 'auto' : 'none',
                transition: 'transform 0.65s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.65s',
              }}
              className="absolute w-[90%] sm:w-[580px] rounded-3xl glass-card p-6 sm:p-8 border border-white/15 shadow-2xl backdrop-blur-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-purple-400/30" />
                </div>

                <p className="text-slate-200 text-sm sm:text-base leading-relaxed italic mb-6">
                  “{testimonial.quote}”
                </p>
              </div>

              <div className="flex items-center gap-3.5 pt-4 border-t border-white/10">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-sm font-bold text-white shadow-md">
                  {testimonial.initials}
                </div>
                <div>
                  <div className="font-bold text-white text-sm sm:text-base">{testimonial.author}</div>
                  <div className="text-xs text-cyan-400 font-medium">
                    {testimonial.role} {testimonial.company ? `· ${testimonial.company}` : ''}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Control Buttons & Indicators */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <button
          onClick={prevSlide}
          className="p-3 rounded-full bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/10 shadow-lg transition-transform active:scale-95"
          aria-label="Previous Testimonial"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Indicators */}
        <div className="flex items-center gap-1.5">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-2 rounded-full transition-all ${
                currentIndex === i ? 'w-6 bg-gradient-to-r from-purple-500 to-cyan-400' : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="p-3 rounded-full bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/10 shadow-lg transition-transform active:scale-95"
          aria-label="Next Testimonial"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
};
