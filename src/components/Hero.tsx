import React from 'react';
import { Phone, MessageCircle, MapPin, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useBusiness } from '../context/BusinessContext';
import { ASSET_IMAGES } from '../assets/assetMap';

interface HeroProps {
  onExploreProducts: () => void;
  onOpenContact: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreProducts, onOpenContact }) => {
  const { state, config, getWhatsAppLink, getCallLink } = useBusiness();

  return (
    <section id="hero" className="relative overflow-hidden bg-slate-900 text-white pt-10 pb-16 lg:py-20 border-b border-slate-800">
      {/* Background Architectural Mesh & Subtle Lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal-900/30 via-slate-900/90 to-slate-950 pointer-events-none" />
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#cbd5e1 1px, transparent 1px), linear-gradient(90deg, #cbd5e1 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Headline, Subtitle, CTAs */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            
            {/* Subtle Local Shop Identity Badge (Unboxed text with saffron accent) */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold tracking-wider text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-emerald-400 font-bold">25+ Years Experience</span>
              <span className="text-slate-500">·</span>
              <span className="text-amber-400">Hakam, Mahadeva Road</span>
              <span className="text-slate-500">·</span>
              <span className="text-slate-400">Siwan, Bihar - 841227</span>
              <span className="text-slate-500">·</span>
              <span className="text-teal-400 font-medium">Window Expert</span>
              <span className="text-slate-500">·</span>
              <span className="text-slate-300">Proprietor: <span className="text-white font-bold">{state.ownerName}</span></span>
            </div>

            {/* Big Prominent ANSARI ALUMINIUM with Official Logo Medallion */}
            <div className="pt-2 flex items-center gap-3.5 sm:gap-5">
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full p-1 bg-linear-to-tr from-emerald-500 via-slate-100 to-amber-400 shadow-xl shadow-emerald-950/50 shrink-0 ring-2 ring-emerald-400/40 overflow-hidden">
                <img
                  src={ASSET_IMAGES.ansariLogo}
                  alt="Ansari Aluminium Official Logo Medallion"
                  className="w-full h-full object-contain rounded-full bg-slate-950"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="flex flex-col">
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-black tracking-tight text-emerald-400 uppercase font-display leading-none">
                  Ansari Aluminium
                </div>
                <div className="text-xs sm:text-sm font-bold tracking-wider text-slate-300 mt-1 uppercase flex items-center gap-2">
                  <span>Window Expert &amp; Fabrication</span>
                  <span className="text-slate-500">·</span>
                  <span className="text-amber-400 text-xs font-semibold">Siwan</span>
                </div>
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.15rem] font-extrabold tracking-tight text-white leading-[1.15] text-balance font-display">
              Aluminium Windows, Doors &amp; Fabrication for Your Home
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Explore aluminium materials and window solutions from your local neighbourhood shop. Contact us to discuss your requirements.
            </p>

            {/* CTAs: "Call the Shop" & "Chat on WhatsApp" */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <a
                href={getCallLink()}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm sm:text-base transition-all duration-150 shadow-lg shadow-teal-500/20 active:scale-[0.98] focus:outline-hidden focus-visible:ring-2 focus-visible:ring-teal-400"
              >
                <Phone className="w-4 h-4 text-slate-950 fill-current" />
                <span>Call the Shop</span>
              </a>

              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-300 hover:text-white border border-slate-700 font-semibold text-sm sm:text-base transition-all duration-150 active:scale-[0.98] focus:outline-hidden focus-visible:ring-2 focus-visible:ring-teal-400"
              >
                <MessageCircle className="w-4 h-4 fill-current text-teal-400" />
                <span>Chat on WhatsApp</span>
              </a>

              <button
                onClick={onExploreProducts}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-3 text-slate-400 hover:text-white text-xs sm:text-sm font-medium transition-colors sm:ml-2"
              >
                <span>View Products</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Trust Strip: strictly factual, non-invented wording */}
            <div className="pt-4 border-t border-slate-800/80">
              <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-slate-400">
                <div className="flex items-center gap-1.5 font-medium text-emerald-400">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>25+ Years Experience</span>
                </div>
                <span className="text-slate-600">·</span>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>Local Neighbourhood Shop</span>
                </div>
                <span className="text-slate-600">·</span>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>Product Enquiries Welcome</span>
                </div>
                <span className="text-slate-600">·</span>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>Custom Fabrication</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Feature Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl p-1 bg-linear-to-b from-slate-700/60 via-slate-800 to-slate-900 border border-slate-700 shadow-2xl overflow-hidden group">
              
              {/* Image Frame */}
              <div className="relative aspect-4/3 w-full rounded-xl overflow-hidden bg-slate-800">
                <img
                  src={ASSET_IMAGES.heroWindows}
                  alt="Modern aluminium glass window and door architectural installation"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual Overlay Scrim */}
                <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none" />

                {/* Floating Experience Badge */}
                <div className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-slate-900/90 backdrop-blur-md border border-slate-700 text-xs font-bold text-emerald-400 flex items-center gap-1.5 shadow-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>25+ Years of Craftsmanship</span>
                </div>

                {/* Floating Architectural Note Badge */}
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-lg bg-slate-900/90 backdrop-blur-md border border-slate-700/80 text-xs">
                  <div className="flex items-center justify-between text-slate-200">
                    <span className="font-semibold text-white">Aluminium Framing &amp; Glass Solutions</span>
                    <span className="text-amber-400 text-[11px] font-medium">Hakam, Siwan, Bihar</span>
                  </div>
                  <p className="text-slate-400 text-[11px] mt-1 line-clamp-1">
                    Quality sliding windows, casements, and door framing fabricated to your required dimensions.
                  </p>
                </div>
              </div>

              {/* Tagline Footer inside card */}
              <div className="px-4 py-3 bg-slate-950/60 flex items-center justify-between text-xs text-slate-300">
                <span className="italic text-slate-400">“{config.tagline}” · <span className="not-italic text-slate-200 font-semibold">{state.ownerName}</span></span>
                <span className="text-[11px] text-teal-400 font-medium">Window Expert</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
