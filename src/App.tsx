/**
 * Ansari Aluminium - Official Website
 * Hakam, Mahadeva Road, Siwan, Bihar - 841227
 */

import React, { useState, useEffect } from 'react';
import { BusinessProvider, useBusiness } from './context/BusinessContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductServices } from './components/ProductServices';
import { WhyChoose } from './components/WhyChoose';
import { Gallery } from './components/Gallery';
import { HowToEnquire } from './components/HowToEnquire';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { EnquiryModal } from './components/EnquiryModal';
import { Phone, MessageCircle, FileText } from 'lucide-react';

const MainLayout: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const { state, getWhatsAppLink, getCallLink, openEnquiryModal } = useBusiness();

  // Handle smooth scroll navigation
  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const navOffset = 70;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sectionIds = ['hero', 'products', 'why-us', 'gallery', 'enquire-process', 'about', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans pb-20 sm:pb-0">
      
      {/* Sticky Header Navigation */}
      <Navbar activeSection={activeSection} onNavigate={scrollToSection} />

      {/* Main Content Sections */}
      <main className="grow">
        <Hero 
          onExploreProducts={() => scrollToSection('products')} 
          onOpenContact={() => scrollToSection('contact')} 
        />
        <ProductServices />
        <WhyChoose />
        <Gallery />
        <HowToEnquire onStartEnquiry={openEnquiryModal} />
        <AboutSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer onNavigate={scrollToSection} />

      {/* Mobile Sticky Action Bar (<15% of viewport height, thumb-friendly, safe-area padded) */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-30 px-3 py-2 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 flex items-center gap-2 shadow-2xl pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        <a
          href={getCallLink()}
          className="flex-1 min-h-[44px] inline-flex items-center justify-center gap-1.5 px-2.5 rounded-xl bg-slate-900 text-white font-semibold text-xs border border-slate-800 active:scale-95 transition-transform"
        >
          <Phone className="w-4 h-4 text-teal-400 shrink-0" />
          <span>Call</span>
        </a>

        <button
          onClick={openEnquiryModal}
          className="flex-1 min-h-[44px] inline-flex items-center justify-center gap-1.5 px-2.5 rounded-xl bg-teal-950/80 text-teal-300 font-semibold text-xs border border-teal-500/40 active:scale-95 transition-transform"
        >
          <FileText className="w-4 h-4 text-teal-400 shrink-0" />
          <span>Enquiry</span>
        </button>

        <a
          href={getWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 min-h-[44px] inline-flex items-center justify-center gap-1.5 px-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs shadow-md active:scale-95 transition-transform"
        >
          <MessageCircle className="w-4 h-4 fill-current shrink-0" />
          <span>WhatsApp</span>
        </a>
      </div>

      {/* Requirement Enquiry Modal Popup */}
      <EnquiryModal />

    </div>
  );
};

export default function App() {
  return (
    <BusinessProvider>
      <MainLayout />
    </BusinessProvider>
  );
}
