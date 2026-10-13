import React, { useState } from 'react';
import { 
  Phone, 
  MessageCircle, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  AlertCircle,
  ExternalLink,
  Mail,
  Copy,
  Check
} from 'lucide-react';
import { useBusiness } from '../context/BusinessContext';

export const ContactSection: React.FC = () => {
  const { config, state, getWhatsAppLink, getCallLink, setIsConfigModalOpen } = useBusiness();

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    serviceInterest: 'Aluminium Windows',
    message: '',
  });

  const [formErrors, setFormErrors] = useState<{ name?: string; phone?: string }>({});
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);
  const [copiedAddress, setCopiedAddress] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = () => {
    const errors: { name?: string; phone?: string } = {};
    if (!formData.name.trim()) {
      errors.name = 'Please provide your name';
    }
    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      errors.phone = 'Please provide a valid 10-digit mobile number';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Compose formatted enquiry message for WhatsApp
    const enquiryText = `*New Customer Enquiry - Ansari Aluminium*
Name: ${formData.name}
Phone: ${formData.phone}
Product Interest: ${formData.serviceInterest}
Requirements: ${formData.message || 'I would like to enquire about availability and pricing.'}`;

    setSubmittedMessage(enquiryText);
  };

  const handleSendViaWhatsApp = () => {
    if (!submittedMessage) return;
    const link = config.createWhatsAppLink(
      submittedMessage,
      state.isPhoneConfigured ? state.phoneNumber.replace(/\D/g, '') : undefined
    );
    window.open(link, '_blank');
  };

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
            Contact &amp; Location
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Reach out by phone, WhatsApp, or through the direct enquiry form to discuss your window, door, or aluminium fabrication needs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Contact Cards & Shop Details */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Phone Card */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 font-display">
                      Direct Phone Call
                    </h3>
                    <p className="text-xs text-slate-500">
                      Talk directly to {state.ownerName}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100">
                <a
                  href={getCallLink()}
                  className="text-base font-bold text-teal-700 hover:text-teal-800 tracking-wide inline-flex items-center gap-2"
                >
                  <span>{state.phoneNumber}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <p className="text-[11px] text-slate-500 mt-1">
                  Proprietor: <span className="font-semibold text-slate-700">{state.ownerName}</span> · <span className="text-emerald-700 font-bold">25+ Years Experience</span>
                </p>
              </div>
            </div>

            {/* WhatsApp Card */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 font-display">
                      WhatsApp Messaging
                    </h3>
                    <p className="text-xs text-slate-500">
                      Send photos, measurements &amp; queries
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs transition-colors shadow-2xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp ({state.phoneNumber})</span>
                </a>
                <p className="text-[11px] text-slate-500 text-center">
                  Instant mobile response from {state.ownerName}
                </p>
              </div>
            </div>

            {/* Address & Landmark Card */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 font-display">
                      Shop Address &amp; Location
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

              <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-700 space-y-2">
                <p className="font-semibold text-slate-900 leading-relaxed">
                  {state.fullAddress}
                </p>
                <p className="text-[11px] text-slate-500">
                  <span className="font-semibold text-slate-700">Landmark &amp; PIN: </span>
                  Mahadeva Road, Hakam, Siwan, Bihar - 841227
                </p>

                <div className="pt-2">
                  <button
                    onClick={openGoogleMapsSearch}
                    className="inline-flex items-center gap-1.5 text-xs text-teal-700 hover:text-teal-800 font-semibold"
                  >
                    <span>View Area on Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Opening Hours Card */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 font-display">
                    Opening Hours
                  </h3>
                  <p className="text-xs text-slate-500">
                    Visiting and enquiry timings
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-700">
                {state.isHoursConfirmed ? (
                  <p className="font-medium text-slate-800">{state.openingHours}</p>
                ) : (
                  <div className="space-y-1">
                    <span className="font-mono text-[11px] text-slate-500 bg-slate-50 px-2 py-1 rounded-sm border block">
                      {config.contact.openingHoursPlaceholder}
                    </span>
                    <p className="text-[11px] text-slate-500 italic">
                      Contact via phone or WhatsApp to verify current shop timing.
                    </p>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
              
              <div className="mb-6">
                <h3 className="text-lg font-bold text-slate-900 font-display">
                  Send a Requirement Enquiry
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Fill in your project details. We will prepare your enquiry to send directly via WhatsApp to Ansari Aluminium.
                </p>
              </div>

              {submittedMessage ? (
                <div className="p-6 rounded-xl bg-teal-50 border border-teal-200 text-teal-900 space-y-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-6 h-6 text-teal-600 shrink-0" />
                    <div>
                      <h4 className="font-bold text-sm">Enquiry Ready to Dispatch</h4>
                      <p className="text-xs text-teal-700">
                        Your requirement summary has been generated. Since there is no automated email server connected, click below to deliver this directly to Ansari Aluminium on WhatsApp.
                      </p>
                    </div>
                  </div>

                  {/* Message Preview */}
                  <div className="p-3 bg-white rounded-lg border border-teal-200 text-xs font-mono text-slate-700 whitespace-pre-line">
                    {submittedMessage}
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      onClick={handleSendViaWhatsApp}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-xs"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Send to Shop WhatsApp</span>
                    </button>
                    <button
                      onClick={() => setSubmittedMessage(null)}
                      className="text-xs text-slate-600 hover:text-slate-900 underline"
                    >
                      Edit enquiry details
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* Name Field */}
                  <div>
                    <label htmlFor="name" className="block text-xs font-semibold text-slate-700 mb-1">
                      Your Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Ramesh Kumar"
                      className={`w-full px-3.5 py-2.5 rounded-xl text-sm border bg-slate-50/50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-teal-500 transition-colors ${
                        formErrors.name ? 'border-rose-400' : 'border-slate-300'
                      }`}
                    />
                    {formErrors.name && (
                      <p className="text-[11px] text-rose-500 mt-1">{formErrors.name}</p>
                    )}
                  </div>

                  {/* Phone Field */}
                  <div>
                    <label htmlFor="phone" className="block text-xs font-semibold text-slate-700 mb-1">
                      Mobile Number <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400">
                        +91
                      </span>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="98765 43210"
                        className={`w-full pl-12 pr-3.5 py-2.5 rounded-xl text-sm border bg-slate-50/50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-teal-500 transition-colors ${
                          formErrors.phone ? 'border-rose-400' : 'border-slate-300'
                        }`}
                      />
                    </div>
                    {formErrors.phone && (
                      <p className="text-[11px] text-rose-500 mt-1">{formErrors.phone}</p>
                    )}
                  </div>

                  {/* Service Interest */}
                  <div>
                    <label htmlFor="serviceInterest" className="block text-xs font-semibold text-slate-700 mb-1">
                      Product or Service Interest
                    </label>
                    <select
                      id="serviceInterest"
                      name="serviceInterest"
                      value={formData.serviceInterest}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 rounded-xl text-sm border border-slate-300 bg-slate-50/50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-teal-500 transition-colors"
                    >
                      {config.products.map(p => (
                        <option key={p.id} value={p.name}>
                          {p.name} {p.isOptionalOrUnconfirmed ? '(Optional)' : ''}
                        </option>
                      ))}
                      <option value="General Material Availability">General Material Availability</option>
                    </select>
                  </div>

                  {/* Message Field */}
                  <div>
                    <label htmlFor="message" className="block text-xs font-semibold text-slate-700 mb-1">
                      Requirement Details / Approximate Sizes (Optional)
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="e.g. Need two 4ft x 5ft sliding windows for a bedroom with clear glass and dark frames. Please confirm availability."
                      className="w-full px-3.5 py-2.5 rounded-xl text-sm border border-slate-300 bg-slate-50/50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-teal-500 transition-colors resize-y"
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm transition-colors shadow-xs"
                    >
                      <Send className="w-4 h-4" />
                      <span>Prepare WhatsApp Enquiry</span>
                    </button>
                  </div>

                  <p className="text-[11px] text-slate-500 text-center">
                    Submitting opens WhatsApp with your prefilled details so you can send them directly to the shop.
                  </p>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
