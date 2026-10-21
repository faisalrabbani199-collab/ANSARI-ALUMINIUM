import React, { useState } from 'react';
import { 
  MessageCircle, 
  Layers, 
  Square, 
  DoorOpen, 
  Wrench, 
  Grid, 
  Maximize, 
  HelpCircle,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useBusiness } from '../context/BusinessContext';
import { ProductItem } from '../config/businessConfig';
import { ASSET_IMAGES } from '../assets/assetMap';

export const ProductServices: React.FC = () => {
  const { config, getProductWhatsAppLink } = useBusiness();
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'windows' | 'doors' | 'materials' | 'fabrication'>('all');
  const [showOptionalACP, setShowOptionalACP] = useState(true);

  // Filter categorization mapping
  const filteredProducts = config.products.filter(item => {
    if (item.id === 'acp-sheets' && !showOptionalACP) return false;
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'windows' && (item.id === 'aluminium-windows' || item.id === 'frames-fittings' || item.id === 'glass-solutions')) return true;
    if (selectedFilter === 'doors' && (item.id === 'aluminium-doors' || item.id === 'frames-fittings')) return true;
    if (selectedFilter === 'materials' && (item.id === 'profiles-sections' || item.id === 'acp-sheets')) return true;
    if (selectedFilter === 'fabrication' && (item.id === 'custom-fabrication' || item.id === 'aluminium-windows')) return true;
    return true;
  });

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'profiles-sections':
        return <Layers className="w-5 h-5 text-teal-600" />;
      case 'aluminium-windows':
        return <Square className="w-5 h-5 text-teal-600" />;
      case 'aluminium-doors':
        return <DoorOpen className="w-5 h-5 text-teal-600" />;
      case 'frames-fittings':
        return <Grid className="w-5 h-5 text-teal-600" />;
      case 'glass-solutions':
        return <Maximize className="w-5 h-5 text-teal-600" />;
      case 'custom-fabrication':
        return <Wrench className="w-5 h-5 text-teal-600" />;
      case 'acp-sheets':
        return <HelpCircle className="w-5 h-5 text-amber-600" />;
      default:
        return <Layers className="w-5 h-5 text-teal-600" />;
    }
  };

  const getCategoryImage = (id: string) => {
    switch (id) {
      case 'aluminium-windows':
        return ASSET_IMAGES.productWindow;
      case 'aluminium-doors':
        return ASSET_IMAGES.productDoor;
      case 'profiles-sections':
        return ASSET_IMAGES.productExtrusions;
      default:
        return null;
    }
  };

  return (
    <section id="products" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold text-teal-700 tracking-wider uppercase mb-2">
            What We Provide
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
            Aluminium Products &amp; Fabrication Work
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            From raw aluminium sections to custom window assemblies and door frames, explore the materials and services available at Ansari Aluminium.
          </p>
          <div className="mt-3 inline-flex items-center gap-2 text-xs text-slate-500 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>
            <span>Dimensions, finishes, and stock are confirmed directly upon enquiry with the shop.</span>
          </div>
        </div>

        {/* Filter Segmented Control & Optional ACP Toggle */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center overflow-x-auto max-w-full p-1 bg-slate-200/80 rounded-xl text-xs font-medium gap-1 no-scrollbar shrink-0" role="tablist">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`min-h-[36px] px-3.5 py-1.5 rounded-lg whitespace-nowrap shrink-0 transition-all ${
                selectedFilter === 'all'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Items ({config.products.length})
            </button>
            <button
              onClick={() => setSelectedFilter('windows')}
              className={`min-h-[36px] px-3.5 py-1.5 rounded-lg whitespace-nowrap shrink-0 transition-all ${
                selectedFilter === 'windows'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Windows &amp; Glass
            </button>
            <button
              onClick={() => setSelectedFilter('doors')}
              className={`min-h-[36px] px-3.5 py-1.5 rounded-lg whitespace-nowrap shrink-0 transition-all ${
                selectedFilter === 'doors'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Doors
            </button>
            <button
              onClick={() => setSelectedFilter('materials')}
              className={`min-h-[36px] px-3.5 py-1.5 rounded-lg whitespace-nowrap shrink-0 transition-all ${
                selectedFilter === 'materials'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Profiles &amp; Panels
            </button>
            <button
              onClick={() => setSelectedFilter('fabrication')}
              className={`min-h-[36px] px-3.5 py-1.5 rounded-lg whitespace-nowrap shrink-0 transition-all ${
                selectedFilter === 'fabrication'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Custom Work
            </button>
          </div>

          {/* Optional ACP Visibility Controller (as required by brief) */}
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={showOptionalACP}
                onChange={(e) => setShowOptionalACP(e.target.checked)}
                className="w-4 h-4 rounded-sm border-slate-300 text-teal-600 focus:ring-teal-500"
              />
              <span>Show Optional Category (ACP Sheets)</span>
            </label>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => {
            const previewImg = getCategoryImage(product.id);

            return (
              <div
                key={product.id}
                className={`flex flex-col justify-between rounded-2xl bg-white border transition-all duration-200 hover:shadow-md ${
                  product.isOptionalOrUnconfirmed
                    ? 'border-amber-200/80 bg-amber-50/20'
                    : 'border-slate-200/90'
                }`}
              >
                <div>
                  {/* Card Visual / Image Slot if available */}
                  {previewImg ? (
                    <div className="relative aspect-16/9 w-full rounded-t-2xl overflow-hidden bg-slate-100 border-b border-slate-100">
                      <img
                        src={previewImg}
                        alt={`${product.name} visual reference`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-slate-900/80 backdrop-blur-xs text-[10px] font-medium text-slate-200">
                        Visual Style Reference
                      </div>
                    </div>
                  ) : (
                    <div className="p-6 pb-0">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center">
                        {getCategoryIcon(product.id)}
                      </div>
                    </div>
                  )}

                  <div className="p-6">
                    {/* Category Label (No Pill, clean typography) */}
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                      <span>{product.category}</span>
                      {product.isOptionalOrUnconfirmed && (
                        <span className="text-amber-700 font-medium text-[11px] flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          Optional Offering
                        </span>
                      )}
                    </div>

                    {/* Card Title */}
                    <h3 className="text-lg font-bold text-slate-900 tracking-tight font-display">
                      {product.name}
                    </h3>

                    {/* Short Description */}
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                      {product.shortDesc}
                    </p>

                    {/* Specific Details Checklist */}
                    <ul className="mt-4 space-y-2 text-xs text-slate-600">
                      {product.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-teal-600 font-bold shrink-0 mt-0.5">•</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Honest Availability Notice (mandatory requirement) */}
                    <div className="mt-4 pt-3 border-t border-slate-100">
                      <p className="text-[11px] text-slate-500 italic">
                        * Ask us about availability, sizes, and specifications
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card Footer: WhatsApp Action with prefilled item message */}
                <div className="px-6 pb-6 pt-0">
                  <a
                    href={getProductWhatsAppLink(product.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 font-semibold text-xs transition-colors border border-teal-200/80 active:scale-[0.99] focus:outline-hidden focus-visible:ring-2 focus-visible:ring-teal-500"
                  >
                    <MessageCircle className="w-4 h-4 text-teal-700" />
                    <span>Ask on WhatsApp</span>
                  </a>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
