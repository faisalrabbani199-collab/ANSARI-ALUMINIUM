import React, { useState, useEffect } from 'react';
import { X, Send, MessageCircle, CheckCircle2, AlertCircle, FileText, Clock } from 'lucide-react';
import { useBusiness } from '../context/BusinessContext';

export const EnquiryModal: React.FC = () => {
  const { config, state, isEnquiryModalOpen, closeEnquiryModal } = useBusiness();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    serviceInterest: 'Aluminium Windows & Sliding Systems',
    message: '',
  });

  const [formErrors, setFormErrors] = useState<{ name?: string; phone?: string }>({});
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isEnquiryModalOpen) {
        closeEnquiryModal();
      }
    };
    if (isEnquiryModalOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isEnquiryModalOpen, closeEnquiryModal]);

  if (!isEnquiryModalOpen) return null;

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
      errors.name = 'Please enter your name';
    }
    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      errors.phone = 'Please provide a valid 10-digit mobile number';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsRedirecting(true);

    const cleanPhone = formData.phone.replace(/\D/g, '').slice(-10);
    const shopPhoneTarget = state.isPhoneConfigured
      ? state.phoneNumber.replace(/\D/g, '')
      : '9173523521195';
    const targetWhatsapp = shopPhoneTarget.startsWith('91')
      ? shopPhoneTarget
      : `91${shopPhoneTarget}`;

    const formattedMessage = `*New Customer Requirement Enquiry*
🏪 *Shop:* Ansari Aluminium
👤 *Customer Name:* ${formData.name.trim()}
📱 *Mobile Number:* +91 ${cleanPhone}
🏷️ *Product / Service:* ${formData.serviceInterest}
📝 *Requirement Details:*
${formData.message.trim() || 'Kindly provide availability, estimated rates, and catalogue.'}

⏰ *Shop Operating Hours:* 7:00 AM – 7:00 PM (Open Daily)
📍 *Location Reference:* Mahadeva Road, Hakam, Siwan, Bihar - 841227`;

    const whatsappUrl = `https://wa.me/${targetWhatsapp}?text=${encodeURIComponent(formattedMessage)}`;

    // Open WhatsApp in new tab/app window
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    // Reset and close after brief visual feedback
    setTimeout(() => {
      setIsRedirecting(false);
      setFormData({
        name: '',
        phone: '',
        serviceInterest: 'Aluminium Windows & Sliding Systems',
        message: '',
      });
      closeEnquiryModal();
    }, 400);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs transition-opacity duration-200 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeEnquiryModal();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="enquiry-modal-title"
    >
      <div className="relative w-full max-w-lg my-auto bg-white rounded-2xl shadow-2xl border border-slate-200/90 overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header Bar with Dark Green / Teal & Silver Theme */}
        <div className="relative px-6 py-5 bg-gradient-to-r from-slate-900 via-slate-800 to-teal-950 text-white border-b border-teal-900/50">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-400 shadow-inner">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 id="enquiry-modal-title" className="text-base sm:text-lg font-bold font-display text-white tracking-tight">
                  Send a Requirement Enquiry
                </h3>
                <p className="text-xs text-teal-300 font-medium mt-0.5">
                  Direct WhatsApp Enquiry to Abdul Qayyum Ansari
                </p>
              </div>
            </div>

            {/* Prominent Close Button */}
            <button
              onClick={closeEnquiryModal}
              className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-700/60 transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-teal-400"
              aria-label="Close Enquiry Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-300 pt-2 border-t border-slate-700/60">
            <div className="flex items-center gap-1.5">
              <span>Shop: {config.name} · {state.phoneNumber}</span>
            </div>
            <div className="flex items-center gap-1 text-teal-300 font-semibold bg-teal-950/60 px-2 py-0.5 rounded border border-teal-500/30">
              <Clock className="w-3 h-3 text-teal-400" />
              <span>7:00 AM – 7:00 PM (Daily)</span>
            </div>
          </div>
        </div>

        {/* Modal Form Body (Responsive scrolling & padding) */}
        <div className="p-5 sm:p-7 max-h-[calc(90vh-110px)] overflow-y-auto">
          <form onSubmit={handleFormSubmit} className="space-y-4">
            
            {/* Customer Name Field */}
            <div>
              <label htmlFor="modal-name" className="block text-xs font-semibold text-slate-800 mb-1.5">
                Your Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                id="modal-name"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g. Ramesh Kumar / Mohammad Ali"
                className={`w-full px-4 py-2.5 rounded-xl text-sm border bg-slate-50/70 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors ${
                  formErrors.name ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
                }`}
              />
              {formErrors.name && (
                <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{formErrors.name}</span>
                </p>
              )}
            </div>

            {/* Mobile Number Field */}
            <div>
              <label htmlFor="modal-phone" className="block text-xs font-semibold text-slate-800 mb-1.5">
                Mobile Number <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500 border-r border-slate-300 pr-2">
                  +91
                </span>
                <input
                  type="tel"
                  id="modal-phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="73523 52195"
                  className={`w-full pl-14 pr-4 py-2.5 rounded-xl text-sm border bg-slate-50/70 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors ${
                    formErrors.phone ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
                  }`}
                />
              </div>
              {formErrors.phone && (
                <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{formErrors.phone}</span>
                </p>
              )}
            </div>

            {/* Product / Service Interest Dropdown */}
            <div>
              <label htmlFor="modal-service" className="block text-xs font-semibold text-slate-800 mb-1.5">
                Product or Service Interest
              </label>
              <select
                id="modal-service"
                name="serviceInterest"
                value={formData.serviceInterest}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-xl text-sm border border-slate-300 bg-slate-50/70 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors text-slate-800"
              >
                <option value="Aluminium Windows & Sliding Systems">Aluminium Windows &amp; Sliding Systems</option>
                <option value="Aluminium Doors & Partition Frames">Aluminium Doors &amp; Partition Frames</option>
                <option value="Toughened Glass & Glazing Solutions">Toughened Glass &amp; Glazing Solutions</option>
                <option value="Aluminium Extrusions & Raw Profiles">Aluminium Extrusions &amp; Raw Profiles</option>
                <option value="ACP Sheet Panel Work (Optional)">ACP Sheet Panel Work</option>
                <option value="Custom Architectural Fabrication">Custom Architectural Fabrication</option>
                <option value="General Material Availability & Rate Quote">General Material Availability &amp; Rate Quote</option>
              </select>
            </div>

            {/* Requirement Details / Approximate Sizes Textarea */}
            <div>
              <label htmlFor="modal-message" className="block text-xs font-semibold text-slate-800 mb-1.5">
                Requirement Details / Approximate Sizes <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <textarea
                id="modal-message"
                name="message"
                rows={3}
                value={formData.message}
                onChange={handleInputChange}
                placeholder="e.g. Need 3 sliding windows (4ft x 5ft) with reflective glass and bronze powder-coated section. Please check availability and estimate."
                className="w-full px-4 py-2.5 rounded-xl text-sm border border-slate-300 bg-slate-50/70 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors resize-y text-slate-800"
              />
            </div>

            {/* Submit Action */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isRedirecting}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white font-bold text-sm tracking-wide shadow-md shadow-teal-700/20 transition-all duration-150 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-teal-500"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>{isRedirecting ? 'Opening WhatsApp...' : 'Prepare WhatsApp Enquiry'}</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Footer Trust Note */}
            <div className="pt-2 text-center text-[11px] text-slate-500 space-y-1">
              <p className="flex items-center justify-center gap-1.5 text-slate-600 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                <span>Redirects directly to WhatsApp chat with verified shop owner</span>
              </p>
              <p className="text-[10px] text-slate-400">
                Shop: {config.name} · Proprietor: {config.ownerName}
              </p>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
};
