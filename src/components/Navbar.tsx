import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, Menu, X, FileText, Clock } from 'lucide-react';
import { useBusiness } from '../context/BusinessContext';
import { ASSET_IMAGES } from '../assets/assetMap';
import { isShopOpenNow } from '../config/businessConfig';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate }) => {
  const { state, getWhatsAppLink, getCallLink, openEnquiryModal } = useBusiness();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const shopStatus = isShopOpenNow();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'hero', label: 'Home' },
    { id: 'products', label: 'Products & Services' },
    { id: 'why-us', label: 'Why Us' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'enquire-process', label: 'How to Enquire' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        scrolled
          ? 'bg-slate-900/95 backdrop-blur-md shadow-md py-3 text-white border-b border-slate-800'
          : 'bg-white/95 backdrop-blur-md shadow-xs py-4 text-slate-900 border-b border-slate-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* Zone 1: Brand Wordmark (Strict single line, display font) */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => handleNavClick('hero')}
              className="flex items-center gap-2 text-left group focus:outline-hidden focus-visible:ring-2 focus-visible:ring-teal-500 rounded-sm"
              aria-label="Ansari Aluminium Home"
            >
              {/* Official Ansari Aluminium Embossed Logo Medallion */}
              <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full p-0.5 bg-linear-to-tr from-emerald-600 via-slate-200 to-amber-500 shadow-md group-hover:scale-105 transition-transform duration-200 shrink-0 overflow-hidden ring-1 ring-slate-400/20">
                <img
                  src={ASSET_IMAGES.ansariLogo}
                  alt="Ansari Aluminium Logo"
                  className="w-full h-full object-contain rounded-full bg-slate-950"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="flex flex-col">
                <span className={`text-xl font-extrabold tracking-tight font-display whitespace-nowrap leading-none ${
                  scrolled ? 'text-white' : 'text-slate-900'
                }`}>
                  Ansari Aluminium
                </span>
                <span className={`text-[11px] font-medium tracking-wide mt-0.5 ${
                  scrolled ? 'text-teal-400' : 'text-teal-700'
                }`}>
                  Window Experts · 25+ Years Experience
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`transition-colors duration-150 relative py-1 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-teal-500 rounded-sm whitespace-nowrap ${
                    scrolled
                      ? isActive
                        ? 'text-teal-400 font-semibold'
                        : 'text-slate-300 hover:text-white'
                      : isActive
                        ? 'text-teal-700 font-semibold'
                        : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-teal-500 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action CTAs */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Shop Operating Hours Badge */}
            <div
              className={`hidden xl:inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
                scrolled
                  ? 'border-slate-700/80 bg-slate-800/80 text-slate-200'
                  : 'border-slate-200/90 bg-white text-slate-700 shadow-2xs'
              }`}
              title="Shop Working Hours: 7:00 AM - 7:00 PM (Monday to Sunday)"
            >
              <Clock className="w-3.5 h-3.5 text-teal-600 shrink-0" />
              <div className="flex items-center gap-1.5 whitespace-nowrap">
                <span className="font-semibold text-slate-900">7:00 AM – 7:00 PM</span>
                <span className="text-slate-300">·</span>
                <span className={`inline-flex items-center gap-1 font-bold text-[11px] ${
                  shopStatus.isOpen ? 'text-emerald-600' : 'text-amber-600'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    shopStatus.isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
                  }`} />
                  {shopStatus.label}
                </span>
              </div>
            </div>

            {/* Quick Call Button */}
            <a
              href={getCallLink()}
              className={`hidden sm:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors duration-150 whitespace-nowrap border focus:outline-hidden focus-visible:ring-2 focus-visible:ring-teal-500 ${
                scrolled
                  ? 'border-slate-700 bg-slate-800 text-slate-100 hover:bg-slate-700'
                  : 'border-slate-300 bg-white text-slate-800 hover:bg-slate-100 shadow-xs'
              }`}
              title={state.isPhoneConfigured ? `Call ${state.phoneNumber}` : "Click to call shop"}
            >
              <Phone className="w-3.5 h-3.5 text-teal-500" />
              <span>{state.isPhoneConfigured ? state.phoneNumber : "Call Shop"}</span>
            </a>

            {/* WhatsApp Us Button */}
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg text-white bg-teal-600 hover:bg-teal-700 active:bg-teal-800 transition-colors duration-150 whitespace-nowrap shadow-xs focus:outline-hidden focus-visible:ring-2 focus-visible:ring-teal-500"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>WhatsApp Us</span>
            </a>

            {/* Send Enquiry Button */}
            <button
              onClick={openEnquiryModal}
              className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all duration-150 whitespace-nowrap border shadow-xs active:scale-95 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-teal-500 ${
                scrolled
                  ? 'border-teal-500/80 bg-teal-500/20 text-teal-300 hover:bg-teal-500 hover:text-slate-950 font-bold'
                  : 'border-teal-700 bg-teal-700 text-white hover:bg-teal-800 shadow-sm'
              }`}
              title="Open Requirement Enquiry Form"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Send Enquiry</span>
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 rounded-lg border transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-teal-500 ${
                scrolled
                  ? 'border-slate-700 text-slate-200 hover:bg-slate-800'
                  : 'border-slate-200 text-slate-800 hover:bg-slate-100'
              }`}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white text-slate-900 px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-2 duration-150">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`w-full text-left px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-teal-50 text-teal-800 font-semibold'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-2">
            {/* Mobile Timing Banner */}
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs">
              <div className="flex items-center gap-2 text-slate-800">
                <Clock className="w-4 h-4 text-teal-600 shrink-0" />
                <span className="font-semibold">7:00 AM – 7:00 PM (Daily)</span>
              </div>
              <span className={`inline-flex items-center gap-1 text-[11px] font-bold ${
                shopStatus.isOpen ? 'text-emerald-600' : 'text-amber-600'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${
                  shopStatus.isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
                }`} />
                {shopStatus.label}
              </span>
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openEnquiryModal();
              }}
              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg bg-teal-700 text-white font-semibold text-sm hover:bg-teal-800 transition-colors shadow-xs"
            >
              <FileText className="w-4 h-4" />
              <span>Send Requirement Enquiry</span>
            </button>
            <a
              href={getCallLink()}
              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg border border-slate-300 text-slate-800 font-semibold text-sm hover:bg-slate-50 transition-colors"
            >
              <Phone className="w-4 h-4 text-teal-600" />
              <span>{state.isPhoneConfigured ? state.phoneNumber : "Call Ansari Aluminium"}</span>
            </a>
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg bg-teal-600 text-white font-semibold text-sm hover:bg-teal-700 transition-colors shadow-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
