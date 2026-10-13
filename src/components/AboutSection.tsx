import React from 'react';
import { MapPin, CheckCircle, ShieldAlert, MessageCircleHeart } from 'lucide-react';
import { useBusiness } from '../context/BusinessContext';

export const AboutSection: React.FC = () => {
  const { config, state, setIsConfigModalOpen } = useBusiness();

  return (
    <section id="about" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Main About Story (Honest, factual, non-invented) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="text-xs font-semibold text-teal-700 tracking-wider uppercase">
              About the Shop
            </div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
              Ansari Aluminium in Siwan, Bihar
            </h2>

            <div className="space-y-4 text-slate-600 leading-relaxed text-base">
              <p>
                Founded and managed by proprietor <strong className="text-slate-900 font-semibold">{state.ownerName}</strong> with over <strong className="text-emerald-700 font-semibold">25+ years of practical experience</strong> in aluminium fabrication and window work, Ansari Aluminium is a trusted local workshop located at Hakam, on Mahadeva Road in the Siwan district of Bihar (PIN: 841227). We supply aluminium profile extrusions, glass fittings, and custom-fabricated aluminium windows and doors for residential houses, offices, and commercial establishments.
              </p>
              <p>
                As your neighbourhood window experts, our objective is straightforward: to help local customers find the appropriate aluminium sections, hardware, and window solutions for their building needs with honest advice on availability and specifications backed by two and a half decades of hands-on expertise.
              </p>
              
              {/* Mandatory Editable Location Sentence */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-sm">
                <span className="font-semibold text-slate-900">Visit or contact us: </span>
                <span>
                  Visit or contact us at{' '}
                  <span className="font-medium text-teal-800 underline decoration-teal-400">
                    {state.fullAddress}
                  </span>{' '}
                  to discuss your aluminium and window requirements.
                </span>
              </div>
            </div>

            {/* Core Values / Operational Standards */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/80">
                <h4 className="text-sm font-bold text-slate-900 font-display">
                  Clear Sizing &amp; Consultation
                </h4>
                <p className="text-xs text-slate-600 mt-1 leading-normal">
                  Open discussions regarding track thicknesses, gauge, and suitable glass panel combinations.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/80">
                <h4 className="text-sm font-bold text-slate-900 font-display">
                  Local Support
                </h4>
                <p className="text-xs text-slate-600 mt-1 leading-normal">
                  Direct mobile and WhatsApp connection with the shop at Hakam, Mahadeva Road without middlemen.
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Customer Feedback Policy & Discreet Verified Review Placeholder */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Discreet Customer Reviews Box (Anti-fabrication compliance) */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/90 shadow-2xs">
              <div className="flex items-center gap-2 mb-3">
                <MessageCircleHeart className="w-5 h-5 text-teal-600" />
                <h3 className="text-base font-bold text-slate-900 font-display">
                  Customer Reviews
                </h3>
              </div>
              
              <p className="text-sm text-slate-600 leading-relaxed">
                In adherence to transparent business practices, we do not publish unverified testimonials or fabricated star ratings.
              </p>

              <div className="mt-4 p-3.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-600">
                <p className="font-medium text-slate-900 mb-1">
                  Are you a recent customer of Ansari Aluminium?
                </p>
                <p className="text-slate-500">
                  Share your experience or finished window feedback with us directly via WhatsApp. Verified customer reviews will be featured here once submitted.
                </p>
              </div>
            </div>

            {/* Business Verification & Owner Details */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/90 shadow-2xs">
              <div className="flex items-center gap-2 text-slate-700 font-bold text-sm mb-3 font-display">
                <MapPin className="w-4 h-4 text-teal-600" />
                <span>Proprietorship &amp; Shop Summary</span>
              </div>
              <div className="space-y-2 text-xs text-slate-600">
                <p>
                  <span className="font-semibold text-slate-800">Owner / Proprietor: </span>
                  <span className="text-slate-900 font-bold">{state.ownerName}</span>
                </p>
                <p>
                  <span className="font-semibold text-slate-800">Experience: </span>
                  <span className="text-emerald-700 font-bold">25+ Years in Aluminium Work</span>
                </p>
                <p>
                  <span className="font-semibold text-slate-800">Phone &amp; WhatsApp: </span>
                  <a href={`tel:${state.phoneNumber}`} className="text-teal-700 font-bold hover:underline">
                    {state.phoneNumber}
                  </a>
                </p>
                <p>
                  <span className="font-semibold text-slate-800">Location: </span>
                  <span>Hakam, Mahadeva Road, Siwan, Bihar - 841227</span>
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] text-slate-500 leading-relaxed">
                <span className="font-semibold text-slate-700">Notice: </span>
                {config.contact.gstNotice}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
