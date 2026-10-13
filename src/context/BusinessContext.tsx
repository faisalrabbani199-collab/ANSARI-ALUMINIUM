import React, { createContext, useContext, useState, useEffect } from 'react';
import { BUSINESS_CONFIG, ProductItem, GalleryPhoto } from '../config/businessConfig';

interface CustomBusinessState {
  phoneNumber: string;
  isPhoneConfigured: boolean;
  ownerName: string;
  email: string;
  isEmailAvailable: boolean;
  fullAddress: string;
  openingHours: string;
  isHoursConfirmed: boolean;
  gstNumber: string;
  isGstConfirmed: boolean;
  customPhotos: Record<string, string>; // user preview overrides for photo ids
}

interface BusinessContextType {
  config: typeof BUSINESS_CONFIG;
  state: CustomBusinessState;
  updatePhone: (phone: string) => void;
  updateAddress: (address: string) => void;
  updateHours: (hours: string) => void;
  updateCustomPhoto: (id: string, url: string) => void;
  resetToDefaults: () => void;
  getWhatsAppLink: (message?: string) => string;
  getProductWhatsAppLink: (productName: string) => string;
  getCallLink: () => string;
  isConfigModalOpen: boolean;
  setIsConfigModalOpen: (open: boolean) => void;
}

const STORAGE_KEY = 'ansari_aluminium_owner_config';

const defaultState: CustomBusinessState = {
  phoneNumber: BUSINESS_CONFIG.contact.phoneNumberDisplay,
  isPhoneConfigured: BUSINESS_CONFIG.contact.isPhoneConfigured,
  ownerName: BUSINESS_CONFIG.ownerName,
  email: BUSINESS_CONFIG.contact.email,
  isEmailAvailable: BUSINESS_CONFIG.contact.isEmailAvailable,
  fullAddress: BUSINESS_CONFIG.contact.addressFullPlaceholder,
  openingHours: BUSINESS_CONFIG.contact.openingHoursPlaceholder,
  isHoursConfirmed: BUSINESS_CONFIG.contact.isHoursConfirmed,
  gstNumber: BUSINESS_CONFIG.contact.gstNumber || '10AAWPQ6678G1Z4',
  isGstConfirmed: true,
  customPhotos: {},
};

const BusinessContext = createContext<BusinessContextType | undefined>(undefined);

export const BusinessProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<CustomBusinessState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // If saved address was old placeholder or old Sikar text, migrate to new confirmed address
        if (!parsed.fullAddress || parsed.fullAddress.includes('[CONFIRM') || parsed.fullAddress.includes('Sikar')) {
          parsed.fullAddress = BUSINESS_CONFIG.contact.addressFullPlaceholder;
        }
        // If saved phone was placeholder, update to new confirmed phone
        if (!parsed.phoneNumber || parsed.phoneNumber.includes('[ADD') || parsed.phoneNumber.includes('9876543210')) {
          parsed.phoneNumber = BUSINESS_CONFIG.contact.phoneNumberDisplay;
          parsed.isPhoneConfigured = true;
        }
        if (!parsed.ownerName) {
          parsed.ownerName = BUSINESS_CONFIG.ownerName;
        }
        return { ...defaultState, ...parsed };
      }
    } catch {
      // Fallback
    }
    return defaultState;
  });

  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore
    }
  }, [state]);

  const updatePhone = (phone: string) => {
    const cleanDigits = phone.replace(/\D/g, '');
    const isConfigured = cleanDigits.length >= 10 && !phone.includes('[');
    setState(prev => ({
      ...prev,
      phoneNumber: phone,
      isPhoneConfigured: isConfigured,
    }));
  };

  const updateAddress = (address: string) => {
    setState(prev => ({ ...prev, fullAddress: address }));
  };

  const updateHours = (hours: string) => {
    const isConfirmed = hours.trim().length > 0 && !hours.includes('[');
    setState(prev => ({
      ...prev,
      openingHours: hours,
      isHoursConfirmed: isConfirmed,
    }));
  };

  const updateCustomPhoto = (id: string, url: string) => {
    setState(prev => ({
      ...prev,
      customPhotos: { ...prev.customPhotos, [id]: url }
    }));
  };

  const resetToDefaults = () => {
    setState(defaultState);
    localStorage.removeItem(STORAGE_KEY);
  };

  // Build clean WhatsApp link
  const getWhatsAppLink = (message?: string) => {
    // If phone configured, use the digits
    const digitsOnly = state.phoneNumber.replace(/\D/g, '');
    let targetPhone = BUSINESS_CONFIG.contact.whatsappNumber;
    if (state.isPhoneConfigured && digitsOnly.length >= 10) {
      targetPhone = digitsOnly.startsWith('91') && digitsOnly.length === 12 ? digitsOnly : `91${digitsOnly.slice(-10)}`;
    }
    return BUSINESS_CONFIG.createWhatsAppLink(message, targetPhone);
  };

  // Build product-specific WhatsApp link
  const getProductWhatsAppLink = (productName: string) => {
    const digitsOnly = state.phoneNumber.replace(/\D/g, '');
    let targetPhone = BUSINESS_CONFIG.contact.whatsappNumber;
    if (state.isPhoneConfigured && digitsOnly.length >= 10) {
      targetPhone = digitsOnly.startsWith('91') && digitsOnly.length === 12 ? digitsOnly : `91${digitsOnly.slice(-10)}`;
    }
    return BUSINESS_CONFIG.createProductWhatsAppLink(productName, targetPhone);
  };

  const getCallLink = () => {
    if (state.isPhoneConfigured) {
      const cleanDigits = state.phoneNumber.replace(/[^\d+]/g, '');
      return `tel:${cleanDigits}`;
    }
    // If not configured, clicking will trigger the owner modal/alert
    return '#contact-details';
  };

  return (
    <BusinessContext.Provider
      value={{
        config: BUSINESS_CONFIG,
        state,
        updatePhone,
        updateAddress,
        updateHours,
        updateCustomPhoto,
        resetToDefaults,
        getWhatsAppLink,
        getProductWhatsAppLink,
        getCallLink,
        isConfigModalOpen,
        setIsConfigModalOpen,
      }}
    >
      {children}
    </BusinessContext.Provider>
  );
};

export const useBusiness = () => {
  const context = useContext(BusinessContext);
  if (!context) {
    throw new Error('useBusiness must be used within a BusinessProvider');
  }
  return context;
};
