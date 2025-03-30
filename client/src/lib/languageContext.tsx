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
    'services.title': 'Onze digitale diensten',
    'services.subtitle': 'Op maat gemaakte oplossingen om uw bedrijfsprocessen en klantervaringen te transformeren',
    'services.ai.title': 'AI Chatbots',
    'services.ai.description': 'Intelligente gespreksagenten met GPT-4 en RAG-technologie voor verbeterd contextbegrip',
    'services.ai.tech': 'NLP · GPT-4 · RAG',
    'services.automation.title': 'Workflow Automatisering',
    'services.automation.description': 'Gestroomlijnde procesautomatiseringsoplossingen die handmatige taken verminderen en operaties optimaliseren',
    'services.automation.tech': 'AWS · Azure · GCP',
    'services.web.title': 'Webontwikkeling',
    'services.web.description': 'Moderne, hoogwaardige webapplicaties gebouwd met de nieuwste technologieën en frameworks',
    'services.web.tech': 'React · Next.js · Three.js',
    'services.chatbot.title': 'Ervaar onze AI Chatbot',
    'services.chatbot.subtitle': 'Probeer onze interactieve chatbot om te zien hoe we intelligente gespreksinterfaces kunnen implementeren voor uw bedrijf',
    'services.chatbot.feature1': 'Aangepast aan uw merkidentiteit en richtlijnen',
    'services.chatbot.feature2': 'Integreert met uw kennisbank en CRM',
    'services.chatbot.feature3': '24/7 ondersteuning voor uw klanten',
    'services.chatbot.cta': 'Ontdek hoe we dit kunnen implementeren voor uw bedrijf',
    'services.chatbot.greeting': 'Hallo! Ik ben de AI-assistent van Digimaatwerk. Hoe kan ik u vandaag helpen?',
    'services.chatbot.user1': 'Ik ben geïnteresseerd in het maken van een chatbot voor mijn bedrijf.',
    'services.chatbot.bot1': 'Geweldig! We zijn gespecialiseerd in aangepaste AI-chatbots die kunnen helpen bij klantenservice, leadgeneratie en interne processen. Wat is uw belangrijkste doel voor deze chatbot?',
    'services.chatbot.bot2': 'Dat is een goede vraag! Ons team bespreekt dit graag in meer detail met u. Wilt u dat we contact met u opnemen voor een persoonlijke demo?',
    'services.chatbot.placeholder': 'Typ hier uw bericht...',
    
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
    'services.title': 'Our Digital Services',
    'services.subtitle': 'Tailored solutions designed to transform your business operations and customer experiences',
    'services.ai.title': 'AI Chatbots',
    'services.ai.description': 'Intelligent conversational agents powered by GPT-4 with RAG technology for enhanced context understanding',
    'services.ai.tech': 'NLP · GPT-4 · RAG',
    'services.automation.title': 'Workflow Automation',
    'services.automation.description': 'Streamlined process automation solutions that reduce manual tasks and optimize operations',
    'services.automation.tech': 'AWS · Azure · GCP',
    'services.web.title': 'Web Development',
    'services.web.description': 'Modern, high-performance web applications built with cutting-edge technologies and frameworks',
    'services.web.tech': 'React · Next.js · Three.js',
    'services.chatbot.title': 'Experience our AI Chatbot',
    'services.chatbot.subtitle': 'Try our interactive chatbot to see how we can implement intelligent conversational interfaces for your business',
    'services.chatbot.feature1': 'Customized to your brand voice and guidelines',
    'services.chatbot.feature2': 'Integrates with your knowledge base and CRM',
    'services.chatbot.feature3': '24/7 support for your customers',
    'services.chatbot.cta': 'Learn how we can implement this for your business',
    'services.chatbot.greeting': "Hello! I'm Digimaatwerk's AI assistant. How can I help you today?",
    'services.chatbot.user1': "I'm interested in creating a chatbot for my business.",
    'services.chatbot.bot1': "Great! We specialize in custom AI chatbots that can help with customer service, lead generation, and internal processes. What's your main goal for this chatbot?",
    'services.chatbot.bot2': "That's a great question! Our team would be happy to discuss this in more detail. Would you like us to contact you for a personalized demo?",
    'services.chatbot.placeholder': 'Type your message here...',
    
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