import React from 'react';
import { Phone, MessageCircle, MapPin, ShieldCheck, Clock } from 'lucide-react';
import { useBusiness } from '../context/BusinessContext';
import { ASSET_IMAGES } from '../assets/assetMap';
import { isShopOpenNow } from '../config/businessConfig';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { config, state, getWhatsAppLink, getCallLink } = useBusiness();
  const shopStatus = isShopOpenNow();
  const currentYear = 2026;

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Brand Info & Mission */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full p-0.5 bg-linear-to-tr from-emerald-500 via-slate-200 to-amber-400 shadow-md shrink-0 overflow-hidden ring-1 ring-slate-700">
                <img
                  src={ASSET_IMAGES.ansariLogo}
                  alt="Ansari Aluminium Official Logo"
                  className="w-full h-full object-contain rounded-full bg-slate-950"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="text-xl font-bold text-white font-display tracking-tight">
                {config.name}
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Aluminium window, door, and fabrication shop at Hakam, Mahadeva Road, Siwan, Bihar - 841227. Quality aluminium products and window expertise.
            </p>

            <div className="text-xs text-slate-300">
              <span className="text-slate-400">Proprietor: </span>
              <span className="font-bold text-teal-300">{state.ownerName}</span>
              <span className="text-slate-500"> · </span>
              <span className="text-emerald-400 font-semibold">25+ Years Experience</span>
            </div>

            <div className="pt-1 text-xs text-teal-400 italic font-medium">
              “{config.tagline}”
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-display">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('hero')}
                  className="hover:text-white transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('products')}
                  className="hover:text-white transition-colors"
                >
                  Products &amp; Fabrication Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('why-us')}
                  className="hover:text-white transition-colors"
                >
                  Why Contact Ansari Aluminium
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('gallery')}
                  className="hover:text-white transition-colors"
                >
                  Shop &amp; Materials Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('enquire-process')}
                  className="hover:text-white transition-colors"
                >
                  How to Enquire
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors"
                >
                  About the Shop
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white transition-colors"
                >
                  Contact &amp; Location
                </button>
              </li>
            </ul>
          </div>

          {/* Location & Contact */}
          <div className="lg:col-span-5 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-display">
              Shop Location
            </h4>
            
            <div className="space-y-3.5 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-300 font-medium">Address: </span>
                  <p className="text-slate-300 font-semibold mt-0.5">
                    {state.fullAddress}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Hakam, Mahadeva Road, Siwan, Bihar - 841227
                  </p>
                </div>
              </div>

              {/* Shop Timings Row */}
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-300 font-medium">Shop Timings: </span>
                    <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded-sm ${
                      shopStatus.isOpen ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/30' : 'bg-slate-900 text-amber-400 border border-amber-500/30'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        shopStatus.isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
                      }`} />
                      {shopStatus.label}
                    </span>
                  </div>
                  <p className="text-slate-200 font-semibold mt-0.5">
                    7:00 AM – 7:00 PM
                  </p>
                  <p className="text-[11px] text-teal-400 mt-0.5">
                    Open Daily (Monday to Sunday)
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Mobile & WhatsApp quick action */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href={getCallLink()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 hover:text-white hover:border-slate-700 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-teal-400" />
                <span>{state.isPhoneConfigured ? state.phoneNumber : "Call Shop"}</span>
              </a>

              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-600/20 border border-teal-500/40 text-xs text-teal-300 hover:bg-teal-600/30 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-teal-400" />
                <span>WhatsApp</span>
              </a>
            </div>

          </div>

        </div>

        {/* Bottom Bar: Copyright & Compliance Notice */}
        <div className="mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {currentYear} Ansari Aluminium. All rights reserved.
          </div>
          <div className="text-[11px] text-slate-500 text-center sm:text-right">
            Local aluminium products, window and door fabrication at Hakam, Mahadeva Road, Siwan, Bihar - 841227.
          </div>
        </div>

      </div>
    </footer>
  );
};
