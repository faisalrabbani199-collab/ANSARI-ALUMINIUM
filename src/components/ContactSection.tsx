import React, { useState } from 'react';
import { 
  Phone, 
  MessageCircle, 
  MapPin, 
  Clock,
  ExternalLink,
  Copy,
  Check,
  FileText,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { useBusiness } from '../context/BusinessContext';
import { isShopOpenNow } from '../config/businessConfig';

export const ContactSection: React.FC = () => {
  const { config, state, getWhatsAppLink, getCallLink, openEnquiryModal } = useBusiness();
  const [copiedAddress, setCopiedAddress] = useState(false);
  const shopStatus = isShopOpenNow();

  const handleCopyAddress = () => {
    const textToCopy = state.fullAddress;
    navigator.clipboard.writeText(textToCopy);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  const openGoogleMapsSearch = () => {
    const query = encodeURIComponent("Mahadeva Road Hakam Siwan Bihar 841227");
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-slate-100/70 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold text-teal-700 tracking-wider uppercase mb-2">
            Get in Touch
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
            Contact &amp; Shop Location
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Reach out by phone, WhatsApp, or open our quick enquiry modal to discuss your windows, doors, or custom aluminium fabrication requirements.
          </p>
        </div>

        {/* 4 Core Contact & Timing Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          
          {/* Card 1: Direct Phone Call */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 shadow-2xs">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 font-display">
                    Direct Phone Call
                  </h3>
                  <p className="text-xs text-slate-500">
                    Talk directly to {state.ownerName}
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Call us directly during working hours to enquire about section stock, current prices, and workshop timings.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <a
                href={getCallLink()}
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors shadow-2xs"
              >
                <Phone className="w-4 h-4 text-teal-400" />
                <span>Call {state.phoneNumber}</span>
              </a>
              <p className="text-[11px] text-slate-500 mt-2 text-center">
                Proprietor: <span className="font-semibold text-slate-700">{state.ownerName}</span> (25+ Yrs Exp)
              </p>
            </div>
          </div>

          {/* Card 2: WhatsApp Messaging */}
          <div className="p-6 rounded-2xl bg-white border border-teal-200/70 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-xl bg-teal-600 text-white flex items-center justify-center shadow-2xs">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 font-display">
                    WhatsApp Chat
                  </h3>
                  <p className="text-xs text-slate-500">
                    Share photos &amp; opening dimensions
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Send photos of your window opening, door frame, or rough measurements for instant assistance from the shop owner.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-2">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white font-bold text-xs transition-colors shadow-2xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
              <p className="text-[11px] text-slate-500 text-center">
                WhatsApp: <span className="font-semibold text-slate-700">{state.phoneNumber}</span>
              </p>
            </div>
          </div>

          {/* Card 3: Shop Operating Hours */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-700 shadow-2xs">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 font-display">
                    Shop Timings
                  </h3>
                  <p className="text-xs text-slate-500">
                    Open Daily
                  </p>
                </div>
              </div>

              <div className="space-y-1.5 mb-4">
                <div className="text-xl font-extrabold text-slate-900 tracking-tight font-display">
                  7:00 AM – 7:00 PM
                </div>
                <p className="text-xs font-semibold text-teal-800">
                  Monday to Sunday (All 7 Days)
                </p>
                <p className="text-[11px] text-slate-500 leading-relaxed pt-1">
                  Enquiries, material selection, and fabrication consultations welcome.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <div className={`flex items-center justify-between p-2 rounded-xl text-xs font-semibold ${
                shopStatus.isOpen ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-slate-100 text-slate-700 border border-slate-200'
              }`}>
                <span className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${
                    shopStatus.isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
                  }`} />
                  <span>{shopStatus.label}</span>
                </span>
                <span className="text-[10px] font-normal text-slate-500">
                  {shopStatus.subLabel}
                </span>
              </div>
            </div>
          </div>

          {/* Card 4: Shop Address & Location */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 shadow-2xs">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 font-display">
                      Shop Address
                    </h3>
                    <p className="text-xs text-slate-500">
                      Hakam, Mahadeva Road, Siwan
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleCopyAddress}
                  className="text-xs text-slate-500 hover:text-slate-800 p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
                  title="Copy address"
                >
                  {copiedAddress ? <Check className="w-3.5 h-3.5 text-teal-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              <div className="text-xs text-slate-700 space-y-1.5 mt-2">
                <p className="font-semibold text-slate-900 leading-snug">
                  {state.fullAddress}
                </p>
                <p className="text-[11px] text-slate-500">
                  Landmark: Mahadeva Road, Hakam, Siwan, Bihar - 841227
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <button
                onClick={openGoogleMapsSearch}
                className="inline-flex items-center justify-center gap-1.5 w-full py-2 px-3 text-xs text-teal-700 hover:text-teal-800 hover:bg-teal-50/60 rounded-xl font-semibold border border-teal-200 transition-colors"
              >
                <span>View on Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* High-Conversion Modal Trigger Banner (Replaces bulky embedded form) */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-teal-950 text-white p-6 sm:p-8 border border-slate-800 shadow-xl">
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            <div className="max-w-2xl">
              <div className="text-xs font-bold text-teal-400 tracking-wider uppercase mb-2">
                Fast Requirement Enquiry
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-display text-white tracking-tight">
                Have a Specific Aluminium or Window Project Requirement?
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                Click below to open our quick requirement enquiry form. Enter your name, approximate opening dimensions, and glass or profile preferences. We will format everything and send it directly to Abdul Qayyum Ansari on WhatsApp.
              </p>
              
              <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>25+ Years Craftsmanship</span>
                </span>
                <span className="text-slate-600">·</span>
                <span>GSTIN: {state.gstNumber || '10AAWPQ6678G1Z4'}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <button
                onClick={openEnquiryModal}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm tracking-wide shadow-lg shadow-teal-500/20 transition-all duration-150 active:scale-95 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-teal-400"
              >
                <FileText className="w-4 h-4 text-slate-950" />
                <span>Open Enquiry Form</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-300 hover:text-white font-semibold text-sm border border-slate-700 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat Direct</span>
              </a>
            </div>

          </div>

          {/* Subtle Background Geometric Accent */}
          <div className="absolute right-0 top-0 -bottom-8 w-1/3 bg-radial from-teal-500/10 via-transparent to-transparent pointer-events-none" />
        </div>

      </div>
    </section>
  );
};
