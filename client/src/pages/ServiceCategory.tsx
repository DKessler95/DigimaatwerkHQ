import { useEffect, useState } from 'react';
import { Link, useParams } from 'wouter';
import { useLanguage } from '@/lib/languageContext';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

// Main component for service category page
const ServiceCategory = () => {
  const { category } = useParams();
  const { t, language } = useLanguage();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  // Map category to title and description
  const getCategoryDetails = () => {
    switch (category) {
      case 'ai-chatbots':
        return {
          title: 'AI Chatbots',
          subtitle: 'Intelligente gesprekspartners voor uw klanten',
          description: `Onze AI-gestuurde chatbots bieden 24/7 ondersteuning voor uw klanten. 
          Ze leren van elk gesprek, begrijpen complexe vragen en geven relevante antwoorden. 
          Verhoog de klanttevredenheid en verminder de werkdruk van uw team met onze slimme chatbot-oplossingen.`,
          features: [
            'Integratie met uw huidige systemen en databases',
            'Meertalige ondersteuning voor internationale klanten',
            'Aanpasbare persoonlijkheid en huisstijl',
            'Gedetailleerde rapportages en inzichten',
            'Naadloze overdracht naar menselijke medewerkers indien nodig'
          ],
          technicalDetails: `We gebruiken de nieuwste ontwikkelingen in natuurlijke taalverwerking (NLP) en machine learning. 
          Onze chatbots worden gebouwd met GPT-technologie en kunnen worden geïntegreerd met uw CRM, helpdesk of website.`
        };
      case 'workflow-automation':
        return {
          title: 'Workflow Automatisering',
          subtitle: 'Efficiëntere processen, minder handwerk',
          description: `Transformeer uw bedrijfsprocessen met onze automatiseringsoplossingen. 
          We identificeren repetitieve taken en stroomlijnen deze met slimme digitale workflows. 
          Bespaar tijd, verminder fouten en laat uw team focussen op wat echt belangrijk is.`,
          features: [
            'Visuele workflow-ontwerpen zonder programmeerkennis',
            'Integratie met bestaande systemen en applicaties',
            'Real-time monitoring en rapportage',
            'Schaalbaarheid voor groeiende bedrijven',
            'Aangepaste triggers en acties'
          ],
          technicalDetails: `We bouwen automatiseringsoplossingen met tools zoals Zapier, Microsoft Power Automate en n8n. 
          Onze workflows kunnen verbinding maken met honderden populaire applicaties en services.`
        };
      case 'web-development':
        return {
          title: 'Webontwikkeling',
          subtitle: 'Moderne websites en applicaties',
          description: `Van responsive websites tot complexe webapplicaties, wij bouwen digitale oplossingen die indruk maken. 
          Met een focus op gebruikerservaring, performance en schaalbaarheid creëren we platforms die uw bedrijf helpen groeien.`,
          features: [
            'Mobiel-vriendelijk ontwerp voor alle apparaten',
            'Zoekmachinevriendelijke structuur (SEO)',
            'Snelle laadtijden en optimale performance',
            'Gebruiksvriendelijk content management',
            'Veilige betalingsintegraties indien nodig'
          ],
          technicalDetails: `We werken met moderne technologieën zoals React, Next.js en Node.js. 
          Voor e-commerce projecten gebruiken we Shopify of WooCommerce, afhankelijk van uw specifieke behoeften.`
        };
      case 'microsoft-365':
        return {
          title: 'Microsoft 365 & Modern Workplace',
          subtitle: 'Toekomstbestendige cloudoplossingen voor uw organisatie',
          description: `Transformeer uw werkplek met Microsoft 365 en geavanceerde AI-integratie. 
          Wij helpen organisaties bij het implementeren van moderne werkplekoplossingen die productiviteit verhogen, 
          samenwerking verbeteren en enterprise-niveau beveiliging bieden. Van migratie tot optimalisatie, 
          wij begeleiden uw digitale transformatie.`,
          features: [
            'Microsoft Copilot implementatie en training',
            'Teams Phone en communicatie-oplossingen',
            'Power Platform automatisering (Power Apps, Power Automate)',
            'SharePoint en OneDrive optimalisatie',
            'Advanced Security en Compliance configuratie',
            'Intune device management en Mobile Device Management',
            'Exchange Online migratie en beheer',
            'Azure Active Directory configuratie en SSO'
          ],
          technicalDetails: `Met jarenlange ervaring in de ICT-sector en uitgebreide expertise in Microsoft enterprise werkomgevingen begeleiden wij organisaties bij elke stap van hun digitale transformatie. Onze aanpak bestaat uit een grondige analyse, doordachte migratieplanning, zorgvuldige implementatie en voortdurende optimalisatie van uw Microsoft 365 omgeving. Zo zorgen wij voor een toekomstbestendige, efficiënte en veilige digitale werkplek die aansluit bij uw bedrijfsdoelen.`
        };
      default:
        return {
          title: 'Digitale diensten',
          subtitle: 'Technologische oplossingen op maat',
          description: 'We bieden diverse digitale diensten aan voor uw bedrijf.',
          features: [],
          technicalDetails: ''
        };
    }
  };

  // Get the right details based on the category
  const details = getCategoryDetails();
  
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-b from-primary to-secondary">
        <Loader2 className="h-10 w-10 animate-spin text-accent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary to-secondary pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero section with enhanced design */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-20">
          <div className="w-full lg:w-1/2">
            {category === 'microsoft-365' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600/20 to-accent/20 rounded-full text-accent font-medium text-sm mb-6 border border-accent/30"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                Microsoft Certified Partner
              </motion.div>
            )}
            
            <motion.h1 
              className="text-4xl md:text-6xl font-header font-bold mb-6 bg-gradient-to-r from-accent via-blue-500 to-accent bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {details.title}
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-foreground/80 mb-6 font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {details.subtitle}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="text-lg text-foreground/70 mb-10 leading-relaxed max-w-2xl">
                {details.description}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/#contact">
                  <motion.button 
                    className="px-8 py-4 bg-gradient-to-r from-accent to-blue-500 text-white font-header font-semibold rounded-lg shadow-lg hover:shadow-xl hover:shadow-accent/30 transition-all duration-300"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Start uw transformatie
                  </motion.button>
                </Link>
                
                <motion.button 
                  className="px-8 py-4 bg-transparent border-2 border-accent text-accent font-header font-semibold rounded-lg transition-all duration-300 hover:bg-accent hover:text-primary hover:shadow-lg"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    const featuresSection = document.querySelector('[data-section="features"]');
                    featuresSection?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Ontdek onze diensten
                </motion.button>
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            className="w-full lg:w-1/2 h-[400px] rounded-xl overflow-hidden bg-secondary/20 backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
          >
            <div className="w-full h-full flex items-center justify-center">
              <div className="relative">
                {category === 'ai-chatbots' && (
                  <div className="flex items-center gap-8 animate-float">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-green-400 to-blue-500 animate-pulse-slow" />
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 animate-pulse-slow" style={{ animationDelay: '0.5s' }} />
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 animate-pulse-slow" style={{ animationDelay: '1s' }} />
                  </div>
                )}
                
                {category === 'workflow-automation' && (
                  <div className="flex items-center gap-6 animate-float">
                    <div className="rotate-animation w-28 h-28 border-4 border-amber-400 rounded-full flex items-center justify-center">
                      <div className="w-16 h-16 border-4 border-amber-500 rounded-full flex items-center justify-center">
                        <div className="w-8 h-8 bg-amber-600 rounded-full"></div>
                      </div>
                    </div>
                    <div className="counter-rotate-animation w-20 h-20 border-4 border-amber-500 rounded-full"></div>
                  </div>
                )}
                
                {category === 'web-development' && (
                  <div className="grid grid-cols-3 gap-4 animate-float">
                    {[...Array(9)].map((_, i) => (
                      <div 
                        key={i} 
                        className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-700 rounded-md transform hover:rotate-45 transition-transform"
                        style={{ 
                          animation: 'bounce 3s infinite alternate',
                          animationDelay: `${i * 0.2}s`
                        }}
                      />
                    ))}
                  </div>
                )}
                
                {category === 'microsoft-365' && (
                  <div className="relative animate-float">
                    {/* Central cloud hub */}
                    <div className="relative w-40 h-40 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center animate-pulse-slow">
                      <svg className="w-16 h-16 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6.5 4C4.567 4 3 5.567 3 7.5c0 .695.203 1.342.553 1.887C2.633 10.16 2 11.26 2 12.5A3.5 3.5 0 0 0 5.5 16h13a3.5 3.5 0 0 0 3.5-3.5c0-1.24-.633-2.34-1.553-3.113C20.797 8.842 21 8.195 21 7.5 21 5.567 19.433 4 17.5 4c-.695 0-1.342.203-1.887.553C14.84 3.633 13.74 3 12.5 3S10.16 3.633 9.387 4.553C8.842 4.203 8.195 4 7.5 4H6.5Z"/>
                      </svg>
                    </div>
                    
                    {/* Surrounding service nodes */}
                    <div className="absolute -top-8 -left-8 w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center animate-pulse-slow" style={{ animationDelay: '0.5s' }}>
                      <span className="text-white text-xs font-bold">Teams</span>
                    </div>
                    <div className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center animate-pulse-slow" style={{ animationDelay: '1s' }}>
                      <span className="text-white text-xs font-bold">Office</span>
                    </div>
                    <div className="absolute -bottom-8 -left-8 w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center animate-pulse-slow" style={{ animationDelay: '1.5s' }}>
                      <span className="text-white text-xs font-bold">Power</span>
                    </div>
                    <div className="absolute -bottom-8 -right-8 w-16 h-16 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center animate-pulse-slow" style={{ animationDelay: '2s' }}>
                      <span className="text-white text-xs font-bold">Azure</span>
                    </div>
                  </div>
                )}
                
                {!['ai-chatbots', 'workflow-automation', 'web-development', 'microsoft-365'].includes(category || '') && (
                  <div className="flex items-center gap-8 animate-float">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-green-400 to-blue-500 animate-pulse-slow" />
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 animate-pulse-slow" style={{ animationDelay: '0.5s' }} />
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 animate-pulse-slow" style={{ animationDelay: '1s' }} />
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Features section */}
        <div className="mb-16" data-section="features">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-header font-bold mb-4 bg-gradient-to-r from-accent to-blue-500 bg-clip-text text-transparent">
              Wat we bieden
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              {category === 'microsoft-365' 
                ? 'Ontdek onze Microsoft 365 diensten die uw organisatie naar de volgende stap brengen'
                : 'Ontdek onze uitgebreide diensten en oplossingen'}
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {details.features.map((feature, index) => {
              // Get appropriate icon for all service categories
              const getFeatureIcon = (feature: string, index: number) => {
                if (category === 'microsoft-365') {
                  if (feature.includes('Copilot')) {
                    return (
                      <svg className="w-6 h-6 text-accent" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    );
                  } else if (feature.includes('Teams')) {
                    return (
                      <svg className="w-6 h-6 text-accent" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M15 2a6 6 0 0 1 6 6v8a6 6 0 0 1-6 6H9a6 6 0 0 1-6-6V8a6 6 0 0 1 6-6h6zm-1 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1h-2zm-6 2a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1H8z"/>
                      </svg>
                    );
                  } else if (feature.includes('Power Platform') || feature.includes('Power Apps')) {
                    return (
                      <svg className="w-6 h-6 text-accent" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                      </svg>
                    );
                  } else if (feature.includes('SharePoint') || feature.includes('OneDrive')) {
                    return (
                      <svg className="w-6 h-6 text-accent" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6H6z"/>
                        <path d="M14 2v6h6"/>
                      </svg>
                    );
                  } else if (feature.includes('Security') || feature.includes('Compliance')) {
                    return (
                      <svg className="w-6 h-6 text-accent" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                      </svg>
                    );
                  } else if (feature.includes('Intune') || feature.includes('Device')) {
                    return (
                      <svg className="w-6 h-6 text-accent" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm-5 20c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
                      </svg>
                    );
                  } else if (feature.includes('Exchange') || feature.includes('migratie')) {
                    return (
                      <svg className="w-6 h-6 text-accent" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4.7l-8 5.334L4 8.7V6.297l8 5.333 8-5.333V8.7z"/>
                      </svg>
                    );
                  } else if (feature.includes('Azure') || feature.includes('SSO')) {
                    return (
                      <svg className="w-6 h-6 text-accent" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
                      </svg>
                    );
                  }
                } else if (category === 'ai-chatbots') {
                  if (feature.includes('Integratie') || feature.includes('systemen')) {
                    return (
                      <svg className="w-6 h-6 text-accent" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    );
                  } else if (feature.includes('Meertalige') || feature.includes('ondersteuning')) {
                    return (
                      <svg className="w-6 h-6 text-accent" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"/>
                      </svg>
                    );
                  } else if (feature.includes('persoonlijkheid') || feature.includes('huisstijl')) {
                    return (
                      <svg className="w-6 h-6 text-accent" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    );
                  } else if (feature.includes('rapportages') || feature.includes('inzichten')) {
                    return (
                      <svg className="w-6 h-6 text-accent" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
                      </svg>
                    );
                  } else if (feature.includes('overdracht') || feature.includes('medewerkers')) {
                    return (
                      <svg className="w-6 h-6 text-accent" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H16c-.85 0-1.54.68-1.54 1.53v1.47H14V8c0-.55.45-1 1-1h2.54c1.41 0 2.67.83 3.22 2.1L22 14v8h-2z"/>
                      </svg>
                    );
                  }
                } else if (category === 'workflow-automation') {
                  if (feature.includes('Visuele') || feature.includes('workflow')) {
                    return (
                      <svg className="w-6 h-6 text-accent" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9 5v4h2V7h2a2 2 0 0 1 2 2v2h2V9a4 4 0 0 0-4-4H9zM9 15v4h4a4 4 0 0 0 4-4v-2h-2v2a2 2 0 0 1-2 2h-2v-2H9z"/>
                        <circle cx="6" cy="6" r="2"/>
                        <circle cx="6" cy="18" r="2"/>
                      </svg>
                    );
                  } else if (feature.includes('Koppeling') || feature.includes('externe')) {
                    return (
                      <svg className="w-6 h-6 text-accent" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/>
                      </svg>
                    );
                  } else if (feature.includes('24/7') || feature.includes('monitoring')) {
                    return (
                      <svg className="w-6 h-6 text-accent" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                      </svg>
                    );
                  } else if (feature.includes('Schaalbare') || feature.includes('groei')) {
                    return (
                      <svg className="w-6 h-6 text-accent" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
                      </svg>
                    );
                  } else if (feature.includes('Compliance') || feature.includes('logging')) {
                    return (
                      <svg className="w-6 h-6 text-accent" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
                      </svg>
                    );
                  }
                } else if (category === 'web-development') {
                  if (feature.includes('Mobiel') || feature.includes('responsive')) {
                    return (
                      <svg className="w-6 h-6 text-accent" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm-5 20c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
                      </svg>
                    );
                  } else if (feature.includes('SEO') || feature.includes('zoekmachinevriendelijke')) {
                    return (
                      <svg className="w-6 h-6 text-accent" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                      </svg>
                    );
                  } else if (feature.includes('performance') || feature.includes('snelle')) {
                    return (
                      <svg className="w-6 h-6 text-accent" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                      </svg>
                    );
                  } else if (feature.includes('content management') || feature.includes('CMS')) {
                    return (
                      <svg className="w-6 h-6 text-accent" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"/>
                      </svg>
                    );
                  } else if (feature.includes('betalingsintegraties') || feature.includes('veilige')) {
                    return (
                      <svg className="w-6 h-6 text-accent" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                      </svg>
                    );
                  }
                }
                
                // Default checkmark for unmatched features
                return <span className="text-accent text-xl">✓</span>;
              };

              return (
                <motion.div 
                  key={index}
                  className="bg-gradient-to-br from-secondary/40 to-secondary/20 backdrop-blur-sm p-6 rounded-xl border border-accent/10 hover:border-accent/30 transition-all duration-300 hover:shadow-lg hover:shadow-accent/20 group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    {getFeatureIcon(feature, index)}
                  </div>
                  <p className="text-foreground/90 font-medium leading-relaxed">{feature}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
        
        {/* Technical details and process section */}
        <div className="mb-16 bg-gradient-to-br from-secondary/30 to-secondary/10 backdrop-blur-sm p-8 md:p-12 rounded-2xl border border-accent/20 shadow-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-header font-bold mb-4 bg-gradient-to-r from-accent to-blue-500 bg-clip-text text-transparent">
              Technische Expertise
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-accent to-blue-500 rounded-full mx-auto"></div>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-2 gap-8 items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div>
              <p className="text-lg text-foreground/80 mb-6 leading-relaxed">
                {details.technicalDetails}
              </p>
              
              {category === 'microsoft-365' && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-accent/10 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-accent mb-1">5+</div>
                    <div className="text-sm text-foreground/70">Jaar ervaring</div>
                  </div>
                  <div className="bg-accent/10 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-accent mb-1">24/7</div>
                    <div className="text-sm text-foreground/70">Ondersteuning</div>
                  </div>
                  <div className="bg-accent/10 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-accent mb-1">99%</div>
                    <div className="text-sm text-foreground/70">Uptime</div>
                  </div>
                  <div className="bg-accent/10 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-accent mb-1">Expert</div>
                    <div className="text-sm text-foreground/70">Support</div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex justify-center">
              <div className="relative">
                {category === 'microsoft-365' && (
                  <div className="w-64 h-64 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-accent/20 rounded-full animate-pulse-slow"></div>
                    <div className="absolute inset-4 bg-gradient-to-br from-accent/30 to-blue-500/30 rounded-full flex items-center justify-center">
                      <svg className="w-24 h-24 text-accent" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6.5 4C4.567 4 3 5.567 3 7.5c0 .695.203 1.342.553 1.887C2.633 10.16 2 11.26 2 12.5A3.5 3.5 0 0 0 5.5 16h13a3.5 3.5 0 0 0 3.5-3.5c0-1.24-.633-2.34-1.553-3.113C20.797 8.842 21 8.195 21 7.5 21 5.567 19.433 4 17.5 4c-.695 0-1.342.203-1.887.553C14.84 3.633 13.74 3 12.5 3S10.16 3.633 9.387 4.553C8.842 4.203 8.195 4 7.5 4H6.5Z"/>
                      </svg>
                    </div>
                    
                    {/* Orbiting elements */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold animate-bounce">
                      M365
                    </div>
                    <div className="absolute bottom-0 right-0 w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold animate-pulse">
                      AI
                    </div>
                    <div className="absolute top-1/2 left-0 transform -translate-x-2 -translate-y-1/2 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold animate-ping">
                      ☁
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12"
          >
            <h3 className="text-2xl md:text-3xl font-header font-bold mb-8 text-center bg-gradient-to-r from-accent to-blue-500 bg-clip-text text-transparent">
              Ons implementatieproces
            </h3>
            
            <div className="grid md:grid-cols-5 gap-4">
              {(category === 'microsoft-365' 
                ? ['Assessment', 'Planning', 'Migratie', 'Training', 'Optimalisatie']
                : ['Analyse & Planning', 'Ontwikkeling', 'Testen', 'Implementatie', 'Ondersteuning']
              ).map((step, index) => (
                <motion.div 
                  key={index}
                  className="relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                >
                  <div className="bg-gradient-to-br from-accent/20 to-blue-500/20 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 group">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-blue-500 flex items-center justify-center text-white font-bold text-lg mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                      {index + 1}
                    </div>
                    <h4 className="font-semibold text-foreground/90 mb-2">{step}</h4>
                    {category === 'microsoft-365' && (
                      <p className="text-sm text-foreground/70">
                        {index === 0 && 'Huidige situatie in kaart'}
                        {index === 1 && 'Roadmap en strategie'}
                        {index === 2 && 'Veilige data-overgang'}
                        {index === 3 && 'Gebruikerstraining'}
                        {index === 4 && 'Continue verbetering'}
                      </p>
                    )}
                  </div>
                  
                  {index < 4 && (
                    <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-0.5 bg-gradient-to-r from-accent to-blue-500 transform -translate-y-1/2"></div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
        
        {/* Microsoft 365 specific CTA section */}
        {category === 'microsoft-365' && (
          <div className="mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-r from-accent/10 via-blue-500/10 to-accent/10 backdrop-blur-sm p-8 md:p-12 rounded-2xl border border-accent/20 text-center"
            >
              <h2 className="text-3xl md:text-4xl font-header font-bold mb-6 bg-gradient-to-r from-accent to-blue-500 bg-clip-text text-transparent">
                Klaar voor uw Microsoft 365 transformatie?
              </h2>
              
              <p className="text-lg text-foreground/80 mb-8 max-w-3xl mx-auto leading-relaxed">
                Laat ons uw organisatie helpen met een naadloze overgang naar Microsoft 365. 
                Van assessment tot implementatie en training - wij begeleiden elke stap van uw digitale transformatie.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-10">
                {[
                  { icon: '📞', title: 'Gratis Consultatie', desc: 'Persoonlijk adviesgesprek over uw situatie' },
                  { icon: '🔍', title: 'Gratis Assessment', desc: 'Analyse van uw huidige IT-infrastructuur' },
                  { icon: '📋', title: 'Implementatieplan', desc: 'Stappenplan op maat voor uw organisatie' }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    className="bg-secondary/20 p-6 rounded-xl border border-accent/10"
                  >
                    <div className="text-3xl mb-3">{item.icon}</div>
                    <h3 className="font-semibold text-accent mb-2">{item.title}</h3>
                    <p className="text-sm text-foreground/70">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button 
                  className="px-10 py-4 bg-gradient-to-r from-accent to-blue-500 text-white font-header font-bold rounded-lg shadow-xl hover:shadow-2xl hover:shadow-accent/40 transition-all duration-300 text-lg"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    const contactSection = document.querySelector('#contact');
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      window.location.href = '/#contact';
                    }
                  }}
                >
                  Plan uw gratis consultatie
                </motion.button>
                
                <motion.button 
                  className="px-10 py-4 bg-transparent border-2 border-accent text-accent font-header font-bold rounded-lg transition-all duration-300 hover:bg-accent hover:text-white hover:shadow-lg text-lg"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => window.open('tel:06-37353483', '_self')}
                >
                  Bel direct: 06-37353483
                </motion.button>
              </div>
              
              <p className="text-sm text-foreground/60 mt-6">
                ✓ Geen verplichtingen  ✓ Bewezen resultaten
              </p>
            </motion.div>
          </div>
        )}

        {/* Examples and CTA section - only show for non-Microsoft 365 services */}
        {category !== 'microsoft-365' && (
          <div id="examples" className="mb-16">
            <motion.h2 
              className="text-3xl font-header font-bold mb-8 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Voorbeelden & Integraties
            </motion.h2>
            
            <div className="bg-primary/30 backdrop-blur-md p-8 rounded-xl mb-8">
              <h3 className="text-2xl font-header font-semibold mb-4">Bekijk onze demo</h3>
              <p className="mb-6">Ontdek hoe onze {details.title} werken in de praktijk. Probeer onze interactieve demo!</p>
              
              {/* Example integration showcase based on category */}
              {category === 'ai-chatbots' && (
                <div className="border border-accent/20 rounded-xl p-4 bg-secondary/20">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                      <span className="text-accent">🤖</span>
                    </div>
                    <h4 className="font-medium">Chatbot Demo</h4>
                  </div>
                  <p className="text-sm text-foreground/70 mb-4">
                    Onze chatbot kan vragen beantwoorden over uw producten, openingstijden en meer. 
                    Probeer het met vragen als "Wat zijn jullie diensten?" of "Kan ik een afspraak maken?"
                  </p>
                  <Link href="/#contact" className="text-accent hover:underline">
                    Probeer onze volledige chatbot demo →
                  </Link>
                </div>
              )}
              
              {category === 'workflow-automation' && (
                <div className="border border-accent/20 rounded-xl p-4 bg-secondary/20">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                      <span className="text-accent">⚙️</span>
                    </div>
                    <h4 className="font-medium">Automatisering Demo</h4>
                  </div>
                  <p className="text-sm text-foreground/70 mb-4">
                    Ontdek hoe automatisering uw contactformulier kan verbinden met uw CRM, e-mailmarketing en meer.
                    Vul ons contactformulier in om de automatisering in actie te zien.
                  </p>
                  <Link href="/#contact" className="text-accent hover:underline">
                    Bekijk de workflow demo →
                  </Link>
                </div>
              )}
              
              {category === 'web-development' && (
                <div className="border border-accent/20 rounded-xl p-4 bg-secondary/20">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                      <span className="text-accent">🌐</span>
                    </div>
                    <h4 className="font-medium">Website Demonstratie</h4>
                  </div>
                  <p className="text-sm text-foreground/70 mb-4">
                    Bekijk onze portfolio van websites en webapplicaties. 
                    Zie hoe we responsieve ontwerpen maken die er geweldig uitzien op elk apparaat.
                  </p>
                  <Link href="/portfolio" className="text-accent hover:underline">
                    Bekijk ons portfolio →
                  </Link>
                </div>
              )}
            </div>
            
            {/* Integration examples - exclude CRM/E-commerce for Microsoft 365 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <motion.div 
                className="bg-secondary/20 backdrop-blur-sm p-6 rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="font-semibold mb-2">CRM Integratie</h3>
                <p className="text-sm text-foreground/70">
                  Naadloze verbinding met populaire CRM's zoals Salesforce, HubSpot en Microsoft Dynamics.
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-secondary/20 backdrop-blur-sm p-6 rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h3 className="font-semibold mb-2">E-commerce</h3>
                <p className="text-sm text-foreground/70">
                  Integreer met Shopify, WooCommerce, en andere e-commerce platforms.
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-secondary/20 backdrop-blur-sm p-6 rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h3 className="font-semibold mb-2">API Koppelingen</h3>
                <p className="text-sm text-foreground/70">
                  Aangepaste API-integraties voor specifieke systemen en applicaties.
                </p>
              </motion.div>
            </div>
            

          </div>
        )}
        
        {/* Contact CTA for non-Microsoft 365 services */}
        {category !== 'microsoft-365' && (
          <motion.div 
            className="bg-accent/10 rounded-xl p-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-header font-bold mb-4">
              Klaar om te beginnen met {details.title}?
            </h2>
            <p className="max-w-2xl mx-auto mb-6">
              Neem contact met ons op voor een vrijblijvend gesprek over uw project.
              We denken graag met u mee over de mogelijkheden!
            </p>
            <Link href="/#contact" className="inline-block px-8 py-3 bg-accent text-primary font-medium rounded-lg hover:bg-accent/90 transition">
              Neem contact op
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ServiceCategory;