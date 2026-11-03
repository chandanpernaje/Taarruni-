import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Send,
  MessageCircle,
  CheckCircle,
  Copy,
  ExternalLink,
} from 'lucide-react';
import { COMPANY_INFO } from '../data/taarruniData';

interface ContactSectionProps {
  preSelectedService?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ preSelectedService }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: preSelectedService || 'Web Development',
    message: '',
  });

  const [submittedType, setSubmittedType] = useState<'whatsapp' | 'email' | null>(null);
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);

  const servicesList = [
    'Web Development',
    'Digital Marketing/SEO',
    'Printing & Signage',
    '3D Animation & Multimedia',
    'E-Commerce Development',
  ];

  const handleCopyAddress = (address: string, city: string) => {
    navigator.clipboard.writeText(address);
    setCopiedAddress(city);
    setTimeout(() => setCopiedAddress(null), 2500);
  };

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.message) return;

    const messageText = `*New Inquiry via Taarruni Website*\n\n*Name:* ${formData.name}\n*Email:* ${formData.email}\n*Phone:* ${formData.phone}\n*Service:* ${formData.service}\n*Message:* ${formData.message}`;

    const whatsappUrl = `https://api.whatsapp.com/send?phone=${COMPANY_INFO.contacts.whatsappNumber}&text=${encodeURIComponent(
      messageText
    )}`;

    window.open(whatsappUrl, '_blank');
    setSubmittedType('whatsapp');
  };

  const handleDirectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.message) return;
    setSubmittedType('email');
  };

  return (
    <section id="contact" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      <div className="max-w-3xl mb-14">
        <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-cyan-400 uppercase mb-3">
          <span>● Quick Contact & Quote Consultation</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
          Share Your <span className="gradient-text">Project Requirements</span>
        </h2>
        <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
          Connect directly with our team in Bangalore or California. Get a comprehensive consultation and transparent quote for your web, marketing, or multimedia project.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Column */}
        <div className="lg:col-span-7 rounded-3xl glass-panel p-6 sm:p-8 border border-white/10 shadow-2xl relative">
          {submittedType ? (
            <div className="py-12 text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-4">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                {submittedType === 'whatsapp' ? 'WhatsApp Chat Initiated!' : 'Inquiry Received!'}
              </h3>
              <p className="text-slate-300 text-sm max-w-md leading-relaxed mb-6">
                Thank you, <span className="text-white font-semibold">{formData.name}</span>. Our senior technical consultant will review your request regarding{' '}
                <span className="text-cyan-400">{formData.service}</span> and reach out to you within 24 business hours.
              </p>
              <button
                onClick={() => {
                  setSubmittedType(null);
                  setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    service: 'Web Development',
                    message: '',
                  });
                }}
                className="px-6 py-2.5 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/15 text-white transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleWhatsAppSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Donna Hamlin"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. contact@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 98804 77344"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Service Required *
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#141126] border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                  >
                    {servicesList.map((svc) => (
                      <option key={svc} value={svc} className="bg-[#0f0c1e] text-white">
                        {svc}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Project Details / Message *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tell us about your project requirements, scope, target audience, or timelines..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-[#25d366] hover:bg-[#20ba5a] shadow-lg shadow-[#25d366]/20 transition-all hover:-translate-y-0.5 active:translate-y-0"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send via WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={handleDirectSubmit}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 shadow-lg shadow-purple-500/20 transition-all hover:-translate-y-0.5 active:translate-y-0"
                >
                  <Send className="w-4 h-4" />
                  <span>Direct Web Request</span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Office Contact Info Cards */}
        <div className="lg:col-span-5 space-y-4">
          {/* Bangalore Head Office */}
          <div className="p-6 rounded-3xl glass-card border border-white/10">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                Head Office · Bangalore, India
              </span>
              <button
                onClick={() =>
                  handleCopyAddress(COMPANY_INFO.offices[0].address, COMPANY_INFO.offices[0].city)
                }
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
                title="Copy address"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copiedAddress === COMPANY_INFO.offices[0].city ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
            <h4 className="text-lg font-bold text-white mb-2">{COMPANY_INFO.offices[0].address}</h4>
            <div className="mt-4 pt-4 border-t border-white/10 space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-cyan-400" />
                <a href="tel:+918026561646" className="hover:text-white transition-colors">
                  +91 80 26561646
                </a>
                <span>·</span>
                <a href="tel:+919880477344" className="hover:text-white transition-colors">
                  +91 98804 77344
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <a href={`mailto:${COMPANY_INFO.contacts.email}`} className="hover:text-white transition-colors">
                  {COMPANY_INFO.contacts.email}
                </a>
              </div>
            </div>
          </div>

          {/* USA Office */}
          <div className="p-6 rounded-3xl glass-card border border-white/10">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                USA Office · California
              </span>
              <button
                onClick={() =>
                  handleCopyAddress(COMPANY_INFO.offices[1].address, COMPANY_INFO.offices[1].city)
                }
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
                title="Copy address"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copiedAddress === COMPANY_INFO.offices[1].city ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
            <h4 className="text-lg font-bold text-white mb-2">{COMPANY_INFO.offices[1].address}</h4>
            <div className="mt-4 pt-4 border-t border-white/10 space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-purple-400" />
                <a href="tel:+919880477344" className="hover:text-white transition-colors">
                  +91 98804 77344
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-purple-400" />
                <a href={`mailto:${COMPANY_INFO.contacts.email}`} className="hover:text-white transition-colors">
                  {COMPANY_INFO.contacts.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
