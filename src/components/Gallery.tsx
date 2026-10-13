import React, { useState, useEffect } from 'react';
import { 
  Maximize2, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Camera, 
  Info,
  Layers,
  Wrench,
  Store
} from 'lucide-react';
import { useBusiness } from '../context/BusinessContext';
import { GalleryPhoto } from '../config/businessConfig';
import { ASSET_IMAGES } from '../assets/assetMap';

export const Gallery: React.FC = () => {
  const { config, state, updateCustomPhoto } = useBusiness();
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);
  const [galleryTab, setGalleryTab] = useState<'shop' | 'styles'>('shop');

  // All shop reference items (with official logo medallion for shop-front sign)
  const shopReferenceItems = config.gallery.map(item => {
    if (item.id === 'shop-front' && !item.imagePath) {
      return { ...item, imagePath: ASSET_IMAGES.ansariLogo };
    }
    return item;
  });

  // Architectural style items (clearly generic, not fake shop photos)
  const architecturalItems = [
    {
      id: 'arch-windows-sliding',
      title: 'Sliding Window Architecture',
      subtitle: 'Style & Framing Reference',
      category: 'architectural_style' as const,
      caption: 'Aluminium Sliding Window Example',
      description: 'Generic architectural illustration showing smooth gliding two-track aluminium window framing with insulated glass panels.',
      imagePath: ASSET_IMAGES.productWindow,
      fallbackGradient: 'from-slate-700 to-slate-900',
    },
    {
      id: 'arch-door-framing',
      title: 'Aluminium Framed Glass Door',
      subtitle: 'Style & Framing Reference',
      category: 'architectural_style' as const,
      caption: 'Modern Aluminium Door Frame',
      description: 'Generic architectural reference demonstrating clean metallic beading, heavy-duty hinges, and contemporary handle hardware.',
      imagePath: ASSET_IMAGES.productDoor,
      fallbackGradient: 'from-teal-800 to-slate-900',
    },
    {
      id: 'arch-profile-storage',
      title: 'Aluminium Section Extrusions',
      subtitle: 'Material Reference',
      category: 'architectural_style' as const,
      caption: 'Extruded Aluminium Profiles & Tracks',
      description: 'Extrusion profile cross-sections showing standard architectural grooves and track specifications for window fabrication.',
      imagePath: ASSET_IMAGES.productExtrusions,
      fallbackGradient: 'from-amber-800 to-slate-900',
    }
  ];

  const currentItems = galleryTab === 'shop' ? shopReferenceItems : architecturalItems;

  // Lightbox keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeLightboxIndex === null) return;
      if (e.key === 'Escape') setActiveLightboxIndex(null);
      if (e.key === 'ArrowRight') {
        setActiveLightboxIndex((prev) => (prev !== null ? (prev + 1) % currentItems.length : null));
      }
      if (e.key === 'ArrowLeft') {
        setActiveLightboxIndex((prev) => (prev !== null ? (prev - 1 + currentItems.length) % currentItems.length : null));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxIndex, currentItems.length]);

  const getShopSlotIcon = (id: string) => {
    switch (id) {
      case 'shop-front':
        return <Store className="w-8 h-8 text-teal-400" />;
      case 'stock-profiles':
        return <Layers className="w-8 h-8 text-teal-400" />;
      case 'workshop-tools':
        return <Wrench className="w-8 h-8 text-amber-400" />;
      default:
        return <Camera className="w-8 h-8 text-teal-400" />;
    }
  };

  return (
    <section id="gallery" className="py-16 sm:py-24 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold text-teal-400 tracking-wider uppercase mb-2">
              Visual Documentation &amp; Gallery
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight font-display">
              Shop &amp; Materials Gallery
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-300 leading-relaxed">
              Genuine visual reference slots representing Ansari Aluminium’s shop front, in-stock aluminium profiles, and fabrication workshop equipment at Hakam, Mahadeva Road, Siwan, Bihar.
            </p>
          </div>

          {/* Gallery View Switcher Tabs */}
          <div className="inline-flex p-1 bg-slate-800 rounded-xl text-xs font-medium shrink-0 self-start md:self-auto border border-slate-700">
            <button
              onClick={() => {
                setGalleryTab('shop');
                setActiveLightboxIndex(null);
              }}
              className={`px-4 py-2 rounded-lg transition-colors ${
                galleryTab === 'shop'
                  ? 'bg-teal-500 text-slate-950 font-bold shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Shop Reference Photos (3)
            </button>
            <button
              onClick={() => {
                setGalleryTab('styles');
                setActiveLightboxIndex(null);
              }}
              className={`px-4 py-2 rounded-lg transition-colors ${
                galleryTab === 'styles'
                  ? 'bg-teal-500 text-slate-950 font-bold shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Architectural Styles
            </button>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {currentItems.map((item, index) => {
            const uploadedUrl = state.customPhotos[item.id];
            const displayImage = uploadedUrl || item.imagePath;

            return (
              <div
                key={item.id}
                className="group relative flex flex-col justify-between rounded-2xl bg-slate-800/80 border border-slate-700/80 overflow-hidden hover:border-teal-500/50 transition-all duration-200"
              >
                {/* Image Area or Styled Reference Slot */}
                <div 
                  onClick={() => setActiveLightboxIndex(index)}
                  className="relative aspect-4/3 w-full bg-slate-950 overflow-hidden cursor-pointer"
                >
                  {displayImage ? (
                    <img
                      src={displayImage}
                      alt={item.caption}
                      className={`w-full h-full ${item.id === 'shop-front' ? 'object-contain p-3 bg-slate-950' : 'object-cover'} group-hover:scale-105 transition-transform duration-300 ease-out`}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    /* High-Fidelity Domain Reference Placeholder */
                    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-linear-to-b from-slate-800 to-slate-950 border-b border-slate-700/50">
                      <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center mb-3 shadow-inner group-hover:scale-110 transition-transform">
                        {getShopSlotIcon(item.id)}
                      </div>
                      <span className="text-xs font-semibold text-slate-200 tracking-wide">
                        {item.title}
                      </span>
                      <span className="text-[11px] text-teal-400 mt-0.5">
                        {item.subtitle}
                      </span>
                      <p className="text-[11px] text-slate-400 mt-2 line-clamp-2 max-w-xs">
                        {item.description}
                      </p>
                    </div>
                  )}

                  {/* Scrim Overlay & Zoom Button */}
                  <div className="absolute inset-0 bg-slate-950/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/90 text-white text-xs font-semibold backdrop-blur-xs border border-slate-700 shadow-md">
                      <Maximize2 className="w-3.5 h-3.5 text-teal-400" />
                      <span>View Full Size</span>
                    </span>
                  </div>

                  {/* Tag Indicator */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-semibold tracking-wider bg-slate-900/80 backdrop-blur-xs border border-slate-700 text-teal-300 uppercase">
                      {item.caption}
                    </span>
                  </div>
                </div>

                {/* Card Meta & Owner Upload Utility */}
                <div className="p-5 flex flex-col justify-between grow">
                  <div>
                    <h3 className="text-base font-bold text-white font-display">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Gallery Guidance Box for Business Owner */}
        <div className="mt-8 p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-start gap-3 text-xs text-slate-300">
          <Info className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <span className="font-semibold text-white">Owner Photo Replacement: </span>
            The 3 shop slots correspond directly to the supplied reference photos (1. Shop-Front Sign, 2. In-Shop Aluminium Profiles, 3. Workshop Tools). The owner can permanently add photo files in <code className="text-teal-300 bg-slate-900 px-1.5 py-0.5 rounded-sm">/public/images/</code> or test them instantly using the preview button above.
          </div>
        </div>

      </div>

      {/* Lightbox Modal */}
      {activeLightboxIndex !== null && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 backdrop-blur-md p-4 sm:p-6"
          onClick={() => setActiveLightboxIndex(null)}
        >
          <div 
            className="relative max-w-4xl w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar inside Lightbox */}
            <div className="w-full flex items-center justify-between pb-3 text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white">
                  {currentItems[activeLightboxIndex].title}
                </span>
                <span className="text-slate-500">·</span>
                <span className="text-teal-400 text-xs">
                  {currentItems[activeLightboxIndex].caption}
                </span>
              </div>
              <button
                onClick={() => setActiveLightboxIndex(null)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                aria-label="Close Lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Lightbox Media Container */}
            <div className="relative w-full aspect-16/10 sm:aspect-16/9 bg-slate-900 rounded-xl overflow-hidden border border-slate-800 flex items-center justify-center">
              {(() => {
                const item = currentItems[activeLightboxIndex];
                const activeImg = state.customPhotos[item.id] || item.imagePath;

                if (activeImg) {
                  return (
                    <img
                      src={activeImg}
                      alt={item.caption}
                      className="w-full h-full object-contain"
                    />
                  );
                }

                return (
                  <div className="p-8 text-center max-w-md">
                    <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center mx-auto mb-4">
                      {getShopSlotIcon(item.id)}
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1 font-display">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-300 mb-4">
                      {item.description}
                    </p>
                    <p className="text-xs text-teal-400">
                      Ansari Aluminium · Hakam, Mahadeva Road, Siwan, Bihar - 841227
                    </p>
                  </div>
                );
              })()}

              {/* Prev / Next controls */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveLightboxIndex((prev) => (prev !== null ? (prev - 1 + currentItems.length) % currentItems.length : null));
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700 shadow-lg transition-transform hover:scale-105"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveLightboxIndex((prev) => (prev !== null ? (prev + 1) % currentItems.length : null));
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700 shadow-lg transition-transform hover:scale-105"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Bottom Caption */}
            <div className="w-full mt-3 text-xs text-slate-400 text-center">
              Use left/right arrows to browse · Press Esc to close
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
