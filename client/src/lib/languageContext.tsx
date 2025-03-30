import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// Available languages
export type Language = 'nl' | 'en';

// Language context type
type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

// Create the context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: 'nl',
  setLanguage: () => {},
  t: (key: string) => key,
});

// Translations
const translations: Record<Language, Record<string, string>> = {
  nl: {
    // CodeAnimationLoader
    'loader.initializing': 'Digimaatwerk Interface initialiseren...',
    'loader.skip': 'Animatie overslaan',
    'loader.code.comment1': '// Digimaatwerk Digitale Oplossingen',
    'loader.code.comment2': '// Initialiseer digitale transformatie',
    'loader.code.comment3': '// Pas intelligente oplossingen toe',
    'loader.code.comment4': '// Digimaatwerk: De kracht achter uw digitale toekomst',
    
    // Header
    'header.services': 'Diensten',
    'header.cases': 'Projecten',
    'header.about': 'Over ons',
    'header.contact': 'Contact',
    'header.calculator': 'Bereken prijs',
    
    // Hero
    'hero.title': 'Uw partner voor digitale transformatie',
    'hero.subtitle': 'AI, Automatisering & Web Development',
    'hero.cta': 'Ontdek onze diensten',
    'hero.contact': 'Neem contact op',
    
    // Services
    'services.title': 'Onze diensten',
    'services.subtitle': 'Toekomstbestendige oplossingen',
    'services.ai.title': 'AI & Chatbots',
    'services.ai.description': 'Intelligente oplossingen die werkprocessen verbeteren en klantervaringen optimaliseren.',
    'services.automation.title': 'Automatisering',
    'services.automation.description': 'Stroomlijn uw bedrijfsprocessen en verhoog de efficiëntie met op maat gemaakte automatiseringsoplossingen.',
    'services.web.title': 'Webontwikkeling',
    'services.web.description': 'Moderne, schaalbare en gebruiksvriendelijke websites en applicaties die uw bedrijf online laten groeien.',
    
    // Case Studies
    'cases.title': 'Succesverhalen',
    'cases.subtitle': 'Ontdek hoe we bedrijven hebben geholpen',
    'cases.cta': 'Bekijk alle projecten',
    'cases.filter.all': 'Alle',
    'cases.filter.ai': 'AI & Chatbots',
    'cases.filter.automation': 'Automatisering',
    'cases.filter.web': 'Webontwikkeling',
    
    // Contact
    'contact.title': 'Neem contact op',
    'contact.subtitle': 'We staan klaar om u te helpen',
    'contact.form.name': 'Naam',
    'contact.form.email': 'E-mail',
    'contact.form.company': 'Bedrijf',
    'contact.form.project': 'Type project',
    'contact.form.message': 'Bericht',
    'contact.form.consent': 'Ik ga akkoord met het privacybeleid',
    'contact.form.submit': 'Versturen',
    
    // Calculator
    'calculator.title': 'Project calculator',
    'calculator.subtitle': 'Schat de kosten en tijdlijn van uw project',
    'calculator.type': 'Project type',
    'calculator.type.chatbot': 'AI & Chatbot',
    'calculator.type.automation': 'Automatisering',
    'calculator.type.web': 'Website / App',
    'calculator.type.combined': 'Gecombineerd',
    'calculator.scale': 'Schaal',
    'calculator.scale.small': 'Klein',
    'calculator.scale.medium': 'Middel',
    'calculator.scale.large': 'Groot',
    'calculator.features': 'Kenmerken',
    'calculator.timeline': 'Tijdlijn prioriteit',
    'calculator.timeline.standard': 'Standaard',
    'calculator.timeline.expedited': 'Versneld',
    'calculator.timeline.rush': 'Spoed',
    'calculator.calculate': 'Bereken',
    'calculator.result.budget': 'Geschatte budget',
    'calculator.result.timeline': 'Geschatte tijdlijn',
    
    // Footer
    'footer.company': 'Bedrijf',
    'footer.services': 'Diensten',
    'footer.contact': 'Contact',
    'footer.legal': 'Juridisch',
    'footer.privacy': 'Privacybeleid',
    'footer.terms': 'Algemene voorwaarden',
    'footer.cookies': 'Cookiebeleid',
    'footer.copyright': 'Alle rechten voorbehouden',
    
    // Misc
    'language': 'Taal',
    'language.dutch': 'Nederlands',
    'language.english': 'Engels',
  },
  en: {
    // CodeAnimationLoader
    'loader.initializing': 'Initializing Digimaatwerk Interface...',
    'loader.skip': 'Skip Animation',
    'loader.code.comment1': '// Digimaatwerk Digital Solutions',
    'loader.code.comment2': '// Initialize digital transformation',
    'loader.code.comment3': '// Apply intelligent solutions',
    'loader.code.comment4': '// Digimaatwerk: Powering your digital future',
    
    // Header
    'header.services': 'Services',
    'header.cases': 'Cases',
    'header.about': 'About',
    'header.contact': 'Contact',
    'header.calculator': 'Price Calculator',
    
    // Hero
    'hero.title': 'Your Digital Transformation Partner',
    'hero.subtitle': 'AI, Automation & Web Development',
    'hero.cta': 'Discover our services',
    'hero.contact': 'Contact us',
    
    // Services
    'services.title': 'Our Services',
    'services.subtitle': 'Future-proof solutions',
    'services.ai.title': 'AI & Chatbots',
    'services.ai.description': 'Intelligent solutions that improve workflows and optimize customer experiences.',
    'services.automation.title': 'Automation',
    'services.automation.description': 'Streamline your business processes and increase efficiency with custom automation solutions.',
    'services.web.title': 'Web Development',
    'services.web.description': 'Modern, scalable, and user-friendly websites and applications that grow your business online.',
    
    // Case Studies
    'cases.title': 'Success Stories',
    'cases.subtitle': 'Discover how we helped businesses',
    'cases.cta': 'View all projects',
    'cases.filter.all': 'All',
    'cases.filter.ai': 'AI & Chatbots',
    'cases.filter.automation': 'Automation',
    'cases.filter.web': 'Web Development',
    
    // Contact
    'contact.title': 'Get in Touch',
    'contact.subtitle': 'We\'re ready to help you',
    'contact.form.name': 'Name',
    'contact.form.email': 'Email',
    'contact.form.company': 'Company',
    'contact.form.project': 'Project Type',
    'contact.form.message': 'Message',
    'contact.form.consent': 'I agree to the privacy policy',
    'contact.form.submit': 'Submit',
    
    // Calculator
    'calculator.title': 'Project Calculator',
    'calculator.subtitle': 'Estimate the cost and timeline of your project',
    'calculator.type': 'Project type',
    'calculator.type.chatbot': 'AI & Chatbot',
    'calculator.type.automation': 'Automation',
    'calculator.type.web': 'Website / App',
    'calculator.type.combined': 'Combined',
    'calculator.scale': 'Scale',
    'calculator.scale.small': 'Small',
    'calculator.scale.medium': 'Medium',
    'calculator.scale.large': 'Large',
    'calculator.features': 'Features',
    'calculator.timeline': 'Timeline priority',
    'calculator.timeline.standard': 'Standard',
    'calculator.timeline.expedited': 'Expedited',
    'calculator.timeline.rush': 'Rush',
    'calculator.calculate': 'Calculate',
    'calculator.result.budget': 'Estimated budget',
    'calculator.result.timeline': 'Estimated timeline',
    
    // Footer
    'footer.company': 'Company',
    'footer.services': 'Services',
    'footer.contact': 'Contact',
    'footer.legal': 'Legal',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.cookies': 'Cookie Policy',
    'footer.copyright': 'All rights reserved',
    
    // Misc
    'language': 'Language',
    'language.dutch': 'Dutch',
    'language.english': 'English',
  }
};

// Provider component
interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // Get the initial language from localStorage or use Dutch as default
  const [language, setLanguageState] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language');
    return (savedLanguage === 'en' ? 'en' : 'nl') as Language;
  });

  // Function to set the language and save it to localStorage
  const setLanguage = (lang: Language) => {
    localStorage.setItem('language', lang);
    setLanguageState(lang);
  };

  // Translation function
  const t = (key: string): string => {
    if (!translations[language][key]) {
      console.warn(`Translation key "${key}" not found in language "${language}"`);
      return key;
    }
    return translations[language][key];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = () => useContext(LanguageContext);