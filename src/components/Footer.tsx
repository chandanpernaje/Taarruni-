import React from 'react';
import { ExternalLink, Mail, Phone, MapPin } from 'lucide-react';
import { COMPANY_INFO } from '../data/taarruniData';
import { TaarruniLogo } from './TaarruniLogo';

export const Footer: React.FC = () => {
  const handleFooterNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.replace('#', '');
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        const navHeight = 85;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navHeight;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
        try {
          window.history.pushState(null, '', href);
        } catch {
          // ignore
        }
      }
    }
  };

  return (
    <footer className="relative border-t border-white/10 bg-[#040308] pt-16 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
        {/* Brand Information */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center">
            <TaarruniLogo size="lg" />
          </div>

          <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
            Taarruni Design Solutions (TDS) is a leading Multimedia, web solutions provider and SEM company in India. A one-stop web solution for web development orientations and Internet application development.
          </p>

          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span>Incorporated 2005</span>
            <span>·</span>
            <span>Bangalore & California</span>
          </div>

          {/* Official Partner Badges from taarruni.com */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <a
              href="http://discovery.ariba.com/profile/AN01045665902"
              target="_blank"
              rel="noreferrer"
              className="bg-white rounded-lg p-1.5 shadow hover:opacity-90 transition-opacity inline-flex items-center"
              title="View taarruni design solutions profile on Ariba Discovery"
            >
              <img
                src="/images/ariba_badge.jpg"
                alt="Ariba Discovery Verified"
                className="h-7 w-auto object-contain"
              />
            </a>

            <a
              href="https://www.nsrcel.org/start-up/"
              target="_blank"
              rel="noreferrer"
              className="bg-white rounded-lg p-1.5 shadow hover:opacity-90 transition-opacity inline-flex items-center"
              title="NSRCEL IIM Bangalore Startup Ecosystem Partner"
            >
              <img
                src="/images/nsrcel1.jpg"
                alt="NSRCEL IIMB"
                className="h-7 w-auto object-contain"
              />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="lg:col-span-3 space-y-3">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
            Navigation
          </h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li>
              <a href="#home" onClick={(e) => handleFooterNavClick(e, '#home')} className="hover:text-cyan-400 transition-colors">
                Home
              </a>
            </li>
            <li>
              <a href="#about" onClick={(e) => handleFooterNavClick(e, '#about')} className="hover:text-cyan-400 transition-colors">
                About Us
              </a>
            </li>
            <li>
              <a href="#services" onClick={(e) => handleFooterNavClick(e, '#services')} className="hover:text-cyan-400 transition-colors">
                Services & Capabilities
              </a>
            </li>
            <li>
              <a href="#interactive-3d-lab" onClick={(e) => handleFooterNavClick(e, '#interactive-3d-lab')} className="hover:text-cyan-400 transition-colors">
                3D Innovation Lab
              </a>
            </li>
            <li>
              <a href="#portfolio" onClick={(e) => handleFooterNavClick(e, '#portfolio')} className="hover:text-cyan-400 transition-colors">
                Portfolio Showcase
              </a>
            </li>
            <li>
              <a href="#testimonials" onClick={(e) => handleFooterNavClick(e, '#testimonials')} className="hover:text-cyan-400 transition-colors">
                Client Testimonials
              </a>
            </li>
            <li>
              <a href={COMPANY_INFO.contacts.blogUrl} target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors inline-flex items-center gap-1">
                <span>Company Blog</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </li>
          </ul>
        </div>

        {/* Channels & Follow */}
        <div className="lg:col-span-4 space-y-3">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
            Connect & Follow
          </h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li>
              <a
                href={COMPANY_INFO.contacts.social.facebook}
                target="_blank"
                rel="noreferrer"
                className="hover:text-purple-400 transition-colors inline-flex items-center gap-2"
              >
                <span>Facebook</span>
                <ExternalLink className="w-3 h-3 text-slate-600" />
              </a>
            </li>
            <li>
              <a
                href={COMPANY_INFO.contacts.social.twitter}
                target="_blank"
                rel="noreferrer"
                className="hover:text-cyan-400 transition-colors inline-flex items-center gap-2"
              >
                <span>Twitter / X</span>
                <ExternalLink className="w-3 h-3 text-slate-600" />
              </a>
            </li>
            <li>
              <a
                href={COMPANY_INFO.contacts.social.linkedin}
                target="_blank"
                rel="noreferrer"
                className="hover:text-cyan-400 transition-colors inline-flex items-center gap-2"
              >
                <span>LinkedIn</span>
                <ExternalLink className="w-3 h-3 text-slate-600" />
              </a>
            </li>
            <li>
              <a
                href={COMPANY_INFO.contacts.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="hover:text-emerald-400 transition-colors inline-flex items-center gap-2"
              >
                <span>WhatsApp (+91 98804 77344)</span>
                <ExternalLink className="w-3 h-3 text-slate-600" />
              </a>
            </li>
          </ul>

          <div className="pt-4 text-xs text-slate-500">
            Direct email: <a href="mailto:info@taarruni.com" className="text-slate-300 hover:text-white">info@taarruni.com</a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <div>Copyright © 2026  Taarruni Design Solutions. All rights reserved.</div>
        <div className="flex items-center gap-6">
          <span>Bangalore, India</span>
          <span>·</span>
          <span>Union City, California</span>
          <span>·</span>
          <span>Incorporated 2005</span>
        </div>
      </div>
    </footer>
  );
};
