import React from 'react';
import { MessageSquare, Ruler, PhoneCall, ArrowRight } from 'lucide-react';
import { useBusiness } from '../context/BusinessContext';

export const HowToEnquire: React.FC<{ onStartEnquiry: () => void }> = ({ onStartEnquiry }) => {
  const { getWhatsAppLink } = useBusiness();

  const steps = [
    {
      stepNum: "01",
      icon: <MessageSquare className="w-5 h-5 text-teal-600" />,
      title: "Tell Us What You Need",
      description: "Let us know whether you require window sections, sliding shutters, an entrance door frame, or raw aluminium extrusions."
    },
    {
      stepNum: "02",
      icon: <Ruler className="w-5 h-5 text-teal-600" />,
      title: "Share Approximate Measurements or Photo",
      description: "If available, send rough dimensions (height × width) or snap a quick photo of your wall opening or existing frame."
    },
    {
      stepNum: "03",
      icon: <PhoneCall className="w-5 h-5 text-teal-600" />,
      title: "Discuss Availability & Pricing",
      description: "Contact the shop by WhatsApp or phone to confirm in-stock colours, profile thickness, glass options, and estimated material costs."
    }
  ];

  return (
    <section id="enquire-process" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold text-teal-700 tracking-wider uppercase mb-2">
            Simple 3-Step Process
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
            How to Enquire
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Planning your aluminium door, window, or fabrication work is straightforward. Follow these steps to consult with Ansari Aluminium.
          </p>
        </div>

        {/* 3 Step Flow */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((s, idx) => (
            <div
              key={idx}
              className="relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-xs transition-shadow"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-black text-slate-300 font-display tracking-tight">
                    {s.stepNum}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center">
                    {s.icon}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2 font-display">
                  {s.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {s.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 text-[11px] text-slate-500">
                Step {idx + 1} of 3
              </div>
            </div>
          ))}
        </div>

        {/* Action Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-linear-to-r from-slate-900 to-slate-800 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div>
            <h3 className="text-lg font-bold font-display">
              Ready to discuss your aluminium requirements?
            </h3>
            <p className="text-sm text-slate-300 mt-1">
              Send us your query now or fill out our quick requirement form below.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onStartEnquiry}
              className="px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm transition-colors shadow-xs"
            >
              Fill Enquiry Form
            </button>
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-semibold text-sm transition-colors border border-slate-600"
            >
              WhatsApp Us
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
