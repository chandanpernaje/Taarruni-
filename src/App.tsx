import React, { useState } from 'react';
import { ThreeHeroBackground } from './components/ThreeHeroBackground';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ClientMarquee } from './components/ClientMarquee';
import { AboutSection } from './components/AboutSection';
import { Interactive3DStudio } from './components/Interactive3DStudio';
import { ServicesBento } from './components/ServicesBento';
import { PortfolioGrid } from './components/PortfolioGrid';
import { Testimonials3D } from './components/Testimonials3D';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

export default function App() {
  const [selectedServiceForQuote, setSelectedServiceForQuote] = useState<string>('Web Development');

  const scrollToContact = (serviceTitle?: string) => {
    if (serviceTitle) {
      setSelectedServiceForQuote(serviceTitle);
    }
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#06050d] text-slate-100 overflow-x-hidden">
      {/* 3D WebGL Background Scene */}
      <ThreeHeroBackground />

      {/* Foreground Content Stack */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Navigation Bar */}
        <Navbar onRequestQuote={() => scrollToContact()} />

        {/* Main Content Sections */}
        <main className="flex-1">
          {/* Hero Section */}
          <HeroSection onRequestQuote={() => scrollToContact()} />

          {/* Client Brands Marquee */}
          <ClientMarquee />

          {/* About Company & Interactive 3D Cube */}
          <AboutSection />

          {/* Interactive 3D Innovation Lab */}
          <Interactive3DStudio />

          {/* Services Bento Grid */}
          <ServicesBento onSelectServiceForQuote={(svc) => scrollToContact(svc)} />

          {/* Portfolio Showcase */}
          <PortfolioGrid onRequestQuote={() => scrollToContact()} />

          {/* 3D Perspective Testimonials Stage */}
          <Testimonials3D />

          {/* Quick Contact & Consultation */}
          <ContactSection preSelectedService={selectedServiceForQuote} />
        </main>

        {/* Footer */}
        <Footer />

        {/* Floating WhatsApp Quick Action */}
        <FloatingWhatsApp />
      </div>
    </div>
  );
}
