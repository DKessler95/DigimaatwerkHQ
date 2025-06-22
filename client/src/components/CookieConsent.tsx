import { useState, useEffect } from 'react';
import { useLanguage } from '@/lib/languageContext';
import { motion, AnimatePresence } from 'framer-motion';

// Generate unique session ID
const generateSessionId = () => {
  return 'session_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
};

// Get or create session ID
const getSessionId = () => {
  let sessionId = sessionStorage.getItem('digimaatwerk_session_id');
  if (!sessionId) {
    sessionId = generateSessionId();
    sessionStorage.setItem('digimaatwerk_session_id', sessionId);
  }
  return sessionId;
};

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

const COOKIE_CONSENT_KEY = 'digimaatwerk_cookie_consent';
const COOKIE_PREFERENCES_KEY = 'digimaatwerk_cookie_preferences';

export function CookieConsent() {
  const { language } = useLanguage();
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Always required
    analytics: false,
    marketing: false,
    preferences: false,
  });

  useEffect(() => {
    // Check if user has already given consent
    const hasConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
    const savedPreferences = localStorage.getItem(COOKIE_PREFERENCES_KEY);
    
    if (savedPreferences) {
      setPreferences(JSON.parse(savedPreferences));
    }
    
    if (!hasConsent) {
      // Show banner after a short delay
      const timer = setTimeout(() => setShowBanner(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
    };
    
    savePreferences(allAccepted);
    setShowBanner(false);
    setShowSettings(false);
  };

  const acceptNecessary = () => {
    const necessaryOnly = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
    };
    
    savePreferences(necessaryOnly);
    setShowBanner(false);
    setShowSettings(false);
  };

  const saveCustomPreferences = () => {
    savePreferences(preferences);
    setShowBanner(false);
    setShowSettings(false);
  };

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'true');
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(prefs));
    
    // Initialize analytics if accepted
    if (prefs.analytics) {
      initializeAnalytics();
    }
    
    // Initialize marketing cookies if accepted
    if (prefs.marketing) {
      initializeMarketing();
    }
    
    // Save user preferences if accepted
    if (prefs.preferences) {
      initializePreferences();
    }
  };

  const initializeAnalytics = () => {
    // Google Analytics initialization
    if (typeof window !== 'undefined' && !window.gtag) {
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID';
      document.head.appendChild(script);
      
      window.dataLayer = window.dataLayer || [];
      window.gtag = function() {
        window.dataLayer.push(arguments);
      };
      window.gtag('js', new Date());
      window.gtag('config', 'GA_MEASUREMENT_ID');
    }
  };

  const initializeMarketing = () => {
    // Marketing cookies initialization (Meta Pixel, etc.)
    console.log('Marketing cookies initialized');
  };

  const initializePreferences = () => {
    // User preference cookies
    console.log('Preference cookies initialized');
  };

  const texts = {
    nl: {
      title: 'Cookie-instellingen',
      description: 'Wij gebruiken cookies om uw ervaring op onze website te verbeteren. U kunt hieronder uw voorkeuren aanpassen.',
      necessary: 'Noodzakelijke cookies',
      necessaryDesc: 'Deze cookies zijn essentieel voor het functioneren van de website.',
      analytics: 'Analytische cookies',
      analyticsDesc: 'Deze cookies helpen ons begrijpen hoe bezoekers onze website gebruiken.',
      marketing: 'Marketing cookies',
      marketingDesc: 'Deze cookies worden gebruikt om relevante advertenties te tonen.',
      preferences: 'Voorkeurscookies',
      preferencesDesc: 'Deze cookies onthouden uw voorkeuren en instellingen.',
      acceptAll: 'Alles accepteren',
      acceptNecessary: 'Alleen noodzakelijke',
      customize: 'Aanpassen',
      save: 'Voorkeuren opslaan',
      learnMore: 'Meer informatie',
      close: 'Sluiten'
    },
    en: {
      title: 'Cookie Settings',
      description: 'We use cookies to improve your experience on our website. You can adjust your preferences below.',
      necessary: 'Necessary cookies',
      necessaryDesc: 'These cookies are essential for the website to function.',
      analytics: 'Analytics cookies',
      analyticsDesc: 'These cookies help us understand how visitors use our website.',
      marketing: 'Marketing cookies',
      marketingDesc: 'These cookies are used to show relevant advertisements.',
      preferences: 'Preference cookies',
      preferencesDesc: 'These cookies remember your preferences and settings.',
      acceptAll: 'Accept all',
      acceptNecessary: 'Necessary only',
      customize: 'Customize',
      save: 'Save preferences',
      learnMore: 'Learn more',
      close: 'Close'
    }
  };

  const t = texts[language as keyof typeof texts];

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-secondary border-t border-accent/20 shadow-lg"
        >
          <div className="max-w-7xl mx-auto p-4">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex-1">
                <h3 className="font-semibold mb-2">{t.title}</h3>
                <p className="text-sm text-foreground/80 mb-4 md:mb-0">
                  {t.description}
                </p>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setShowSettings(true)}
                  className="px-4 py-2 text-sm border border-accent/30 rounded-lg hover:bg-accent/10 transition"
                >
                  {t.customize}
                </button>
                <button
                  onClick={acceptNecessary}
                  className="px-4 py-2 text-sm bg-secondary/50 rounded-lg hover:bg-secondary/70 transition"
                >
                  {t.acceptNecessary}
                </button>
                <button
                  onClick={acceptAll}
                  className="px-4 py-2 text-sm bg-accent text-primary rounded-lg hover:bg-accent/90 transition"
                >
                  {t.acceptAll}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {showSettings && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={() => setShowSettings(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-secondary rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">{t.title}</h2>
                <button
                  onClick={() => setShowSettings(false)}
                  className="p-2 hover:bg-primary/10 rounded-lg transition"
                >
                  ✕
                </button>
              </div>

              <p className="text-foreground/80 mb-6">{t.description}</p>

              <div className="space-y-4">
                {/* Necessary Cookies */}
                <div className="flex items-start justify-between p-4 bg-primary/5 rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium mb-1">{t.necessary}</h3>
                    <p className="text-sm text-foreground/70">{t.necessaryDesc}</p>
                  </div>
                  <div className="ml-4">
                    <input
                      type="checkbox"
                      checked={true}
                      disabled={true}
                      className="w-4 h-4 text-accent"
                    />
                  </div>
                </div>

                {/* Analytics Cookies */}
                <div className="flex items-start justify-between p-4 bg-primary/5 rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium mb-1">{t.analytics}</h3>
                    <p className="text-sm text-foreground/70">{t.analyticsDesc}</p>
                  </div>
                  <div className="ml-4">
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={(e) => setPreferences(prev => ({ ...prev, analytics: e.target.checked }))}
                      className="w-4 h-4 text-accent"
                    />
                  </div>
                </div>

                {/* Marketing Cookies */}
                <div className="flex items-start justify-between p-4 bg-primary/5 rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium mb-1">{t.marketing}</h3>
                    <p className="text-sm text-foreground/70">{t.marketingDesc}</p>
                  </div>
                  <div className="ml-4">
                    <input
                      type="checkbox"
                      checked={preferences.marketing}
                      onChange={(e) => setPreferences(prev => ({ ...prev, marketing: e.target.checked }))}
                      className="w-4 h-4 text-accent"
                    />
                  </div>
                </div>

                {/* Preference Cookies */}
                <div className="flex items-start justify-between p-4 bg-primary/5 rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium mb-1">{t.preferences}</h3>
                    <p className="text-sm text-foreground/70">{t.preferencesDesc}</p>
                  </div>
                  <div className="ml-4">
                    <input
                      type="checkbox"
                      checked={preferences.preferences}
                      onChange={(e) => setPreferences(prev => ({ ...prev, preferences: e.target.checked }))}
                      className="w-4 h-4 text-accent"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col-reverse sm:flex-row gap-3 mt-6">
                <button
                  onClick={acceptNecessary}
                  className="px-6 py-2 bg-secondary/50 rounded-lg hover:bg-secondary/70 transition"
                >
                  {t.acceptNecessary}
                </button>
                <button
                  onClick={saveCustomPreferences}
                  className="px-6 py-2 bg-accent text-primary rounded-lg hover:bg-accent/90 transition"
                >
                  {t.save}
                </button>
              </div>

              <div className="mt-4 text-center">
                <a
                  href="/legal/privacy"
                  className="text-sm text-accent hover:underline"
                  target="_blank"
                >
                  {t.learnMore}
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Cookie utility functions
export const cookieUtils = {
  // Check if a specific cookie type is allowed
  isAllowed: (type: keyof CookiePreferences): boolean => {
    const preferences = localStorage.getItem(COOKIE_PREFERENCES_KEY);
    if (!preferences) return false;
    
    try {
      const parsed = JSON.parse(preferences);
      return parsed[type] || false;
    } catch {
      return false;
    }
  },

  // Set a cookie if the category is allowed
  setCookie: (name: string, value: string, days: number = 365, category: keyof CookiePreferences = 'necessary') => {
    if (!cookieUtils.isAllowed(category)) return false;
    
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
    return true;
  },

  // Get a cookie value
  getCookie: (name: string): string | null => {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  },

  // Delete a cookie
  deleteCookie: (name: string) => {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/`;
  }
};

// Extend window type for analytics
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}