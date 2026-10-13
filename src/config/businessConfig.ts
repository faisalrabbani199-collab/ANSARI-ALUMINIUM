/**
 * Ansari Aluminium - Business Configuration
 * 
 * The shop owner can easily edit this single file to update phone numbers,
 * opening hours, exact address, or add photo paths.
 * 
 * Note on Honesty & Compliance:
 * - Do not invent GST, customer reviews, awards, certifications, or warranties.
 * - All unconfirmed information is kept as transparent placeholders.
 */

export interface ProductItem {
  id: string;
  name: string;
  category: string;
  shortDesc: string;
  details: string[];
  isOptionalOrUnconfirmed?: boolean;
  imageFallbackNote?: string;
  image?: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  subtitle: string;
  category: 'shop_reference' | 'architectural_style';
  caption: string;
  imagePath?: string;
  fallbackGradient: string;
  description: string;
}

export const BUSINESS_CONFIG = {
  name: "Ansari Aluminium",
  shortName: "Ansari Aluminium",
  ownerName: "Abdul Qayyum Ansari",
  experienceYears: "25+ Years",
  tagline: "Quality Aluminium. Expert Craftsmanship. Built to Last.",
  supportingCopy: "Your Local Window Experts · 25+ Years Experience",
  
  // Confirmed Location
  locationBrief: "Hakam, Mahadeva Road, Siwan, Bihar - 841227, India",
  
  // Confirmed Contact Details
  contact: {
    // Current phone status
    isPhoneConfigured: true,
    phoneNumberDisplay: "+91 73523521195",
    phoneNumberRaw: "73523521195",
    whatsappNumber: "9173523521195",
    ownerName: "Abdul Qayyum Ansari",
    experience: "25+ Years in Aluminium & Window Fabrication",
    email: "[ADD EMAIL IF AVAILABLE]",
    isEmailAvailable: false,
    
    // Address Details (Confirmed by Owner)
    addressFullPlaceholder: "Hakam, Mahadeva Road, District Siwan, Bihar - 841227",
    confirmedLandmark: "Hakam, Mahadeva Road, Siwan, Bihar - 841227",
    isAddressConfirmed: true,
    
    // Opening Hours
    openingHoursPlaceholder: "[ADD OPENING HOURS - e.g., Monday to Saturday: 9:00 AM – 8:00 PM]",
    isHoursConfirmed: false,
    
    // GST Notice
    gstNumber: "10AAWPQ6678G1Z4",
    isGstConfirmed: true,
    gstNotice: "GSTIN: 10AAWPQ6678G1Z4 (Registered Local Business in Siwan, Bihar)",
  },

  // Trust Strip Factual Statements (strictly factual, zero superlatives)
  trustPoints: [
    "25+ Years Fabrication Experience",
    "Local Neighbourhood Aluminium Shop",
    "Product Enquiries Welcome",
    "Contact Us for Size & Colour Availability"
  ],

  // Products and services based on shop sign and stock
  products: [
    {
      id: "profiles-sections",
      name: "Aluminium Profiles & Sections",
      category: "Stock & Materials",
      shortDesc: "Various architectural aluminium profile extrusions, channels, and framing sections for domestic and commercial projects.",
      details: [
        "Multiple profile sections for window tracks and door frames",
        "Different colour coatings and anodized/powder-coated finishes upon enquiry",
        "Cut-to-size and custom lengths discussed on order",
        "Ask us about current stock availability and specifications"
      ],
      isOptionalOrUnconfirmed: false,
    },
    {
      id: "aluminium-windows",
      name: "Aluminium Windows",
      category: "Window Work",
      shortDesc: "Modern sliding, casement, and fixed aluminium windows fabricated for durability, smooth operation, and natural light.",
      details: [
        "Two-track and three-track sliding window systems",
        "Openable casement windows with security latching",
        "Ventilator and fixed glass window frames",
        "Ask us about availability, glass pairing, and specifications"
      ],
      isOptionalOrUnconfirmed: false,
    },
    {
      id: "aluminium-doors",
      name: "Aluminium Doors",
      category: "Door Work",
      shortDesc: "Sturdy aluminium frame doors for entrances, balconies, bathrooms, office partitions, and shop fronts.",
      details: [
        "Hinged and sliding aluminium door structures",
        "Durable hardware and handles fitted to specification",
        "Frosted, tinted, or clear glass panel options",
        "Ask us about availability and specifications"
      ],
      isOptionalOrUnconfirmed: false,
    },
    {
      id: "frames-fittings",
      name: "Window Frames & Related Fittings",
      category: "Hardware & Fittings",
      shortDesc: "Precision-cut aluminium frames along with essential rollers, locks, rubber gaskets, handles, and fasteners.",
      details: [
        "Quality rollers and smooth-gliding tracks",
        "Weather-resistant rubber beading and wool piles",
        "Replacement frames and fitting hardware",
        "Ask us about availability and hardware varieties"
      ],
      isOptionalOrUnconfirmed: false,
    },
    {
      id: "glass-solutions",
      name: "Glass & Window Solutions",
      category: "Glass Work",
      shortDesc: "Integration of appropriate glass types for your aluminium windows, doors, and partitions.",
      details: [
        "Clear, tinted, pinhead, and frosted glass options",
        "Fitted securely within aluminium beading",
        "Measurements taken to match frame dimensions",
        "Ask us about availability and glass thickness options"
      ],
      isOptionalOrUnconfirmed: false,
    },
    {
      id: "custom-fabrication",
      name: "Aluminium Fabrication / Custom Work",
      category: "Workshop Services",
      shortDesc: "On-site and workshop cutting, drilling, assembling, and tailoring of aluminium systems according to your room measurements.",
      details: [
        "Accurate angle cutting and joinery",
        "Custom size fabrication for irregular openings",
        "Workshop assembly of window and door shutters",
        "Contact the shop to discuss project requirements"
      ],
      isOptionalOrUnconfirmed: false,
    },
    {
      id: "acp-sheets",
      name: "ACP or Other Building Materials",
      category: "Optional Materials",
      shortDesc: "Aluminium Composite Panels (ACP) and related architectural cladding materials (subject to owner confirmation).",
      details: [
        "Optional category: verify with shop owner before ordering",
        "Suitable for signage, elevation, and partition backings if stocked",
        "Ask us about availability, colours, and current sheets in stock"
      ],
      isOptionalOrUnconfirmed: true, // Marked as editable optional category as required by brief
    }
  ] as ProductItem[],

  // Gallery items highlighting genuine references and modern architectural styles
  gallery: [
    {
      id: "shop-front",
      title: "Shop Front Sign",
      subtitle: "Ansari Aluminium Signboard",
      category: "shop_reference",
      caption: "Shop Front Sign",
      description: "Exterior shop signage displaying Ansari Aluminium and 'Window Expert' specialization on Mahadeva Road, Hakam, Siwan.",
      fallbackGradient: "from-slate-700 to-slate-900"
    },
    {
      id: "stock-profiles",
      title: "Aluminium Profiles & Stock",
      subtitle: "Materials Stocked Inside",
      category: "shop_reference",
      caption: "Aluminium Profiles & Materials",
      description: "Aluminium extrusions, frame channels, and sections stocked inside the Hakam, Siwan workshop ready for fabrication.",
      fallbackGradient: "from-teal-800 to-slate-900"
    },
    {
      id: "workshop-tools",
      title: "Workshop Tools & Fabrication",
      subtitle: "Fabrication Bench & Equipment",
      category: "shop_reference",
      caption: "Workshop Tools & Work",
      description: "Hand and power tools, cutting benches, and assembly equipment utilized in precision window and door framing at Hakam, Siwan.",
      fallbackGradient: "from-amber-800 to-slate-900"
    }
  ] as GalleryPhoto[],

  // Function to create WhatsApp link with clean international format
  createWhatsAppLink: (customMessage?: string, configuredPhone?: string): string => {
    const phone = configuredPhone || BUSINESS_CONFIG.contact.whatsappNumber;
    const defaultMsg = "Hello Ansari Aluminium, I would like to enquire about your aluminium products and window solutions. Please share availability and details.";
    const text = customMessage || defaultMsg;
    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  },

  // Function to create product-specific WhatsApp enquiry
  createProductWhatsAppLink: (productName: string, configuredPhone?: string): string => {
    const phone = configuredPhone || BUSINESS_CONFIG.contact.whatsappNumber;
    const text = `Hello Ansari Aluminium, I would like to enquire about ${productName}. Please share availability and pricing.`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  }
};
