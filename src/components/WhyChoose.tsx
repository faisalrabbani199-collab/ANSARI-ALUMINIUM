import React from 'react';
import { MapPin, MessageSquareText, SlidersHorizontal, PhoneCall, CheckCircle2 } from 'lucide-react';

export const WhyChoose: React.FC = () => {
  const points = [
    {
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-600" />,
      title: "25+ Years Industry Experience",
      description: "Over 25 years of hands-on fabrication experience by proprietor Abdul Qayyum Ansari, ensuring precision measurement, durable joins, and dependable window and door solutions."
    },
    {
      icon: <MapPin className="w-5 h-5 text-teal-600" />,
      title: "Local Neighbourhood Shop",
      description: "Conveniently located at Hakam, Mahadeva Road, Siwan, Bihar - 841227. Serving homeowners, builders, and fabricators in Siwan and surrounding areas."
    },
    {
      icon: <SlidersHorizontal className="w-5 h-5 text-teal-600" />,
      title: "Direct Consultation on Your Project",
      description: "Discuss frame profiles, glass options, sliding track layouts, or shutter fittings suitable for your exact room openings and architectural needs."
    },
    {
      icon: <PhoneCall className="w-5 h-5 text-teal-600" />,
      title: "Direct Access via Phone & WhatsApp",
      description: "Direct contact with the shop owner on +91 73523521195 to share rough measurements, discuss material availability, or get straight answers."
    }
  ];

  return (
    <section id="why-us" className="py-16 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold text-teal-700 tracking-wider uppercase mb-2">
            Local &amp; Reliable
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
            Why Contact Ansari Aluminium
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            We focus on honest customer communication, appropriate aluminium materials for local construction, and direct access when you need assistance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {points.map((pt, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-slate-50 border border-slate-200/90 hover:border-slate-300 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center mb-4 shadow-2xs">
                {pt.icon}
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2 font-display">
                {pt.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {pt.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
