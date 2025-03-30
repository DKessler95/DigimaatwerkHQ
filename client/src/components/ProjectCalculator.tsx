import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/languageContext';

type ProjectType = 'chatbot' | 'automation' | 'web' | 'combined';
type ProjectScale = 'basic' | 'advanced' | 'custom';
type SupportPackage = 'none' | 'basic' | 'standard' | 'premium';
type TimelinePriority = 1 | 2 | 3;

interface Feature {
  id: string;
  nameNl: string;
  nameEn: string;
  priceImpact: number;
}

interface SupportPackageInfo {
  id: SupportPackage;
  nameNl: string;
  nameEn: string;
  price: number;
}

const ProjectCalculator = () => {
  const { t, language } = useLanguage();
  const [projectType, setProjectType] = useState<ProjectType>('web');
  const [projectScale, setProjectScale] = useState<ProjectScale>('basic');
  const [supportPackage, setSupportPackage] = useState<SupportPackage>('none');
  const [timelinePriority, setTimelinePriority] = useState<TimelinePriority>(1);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  
  // Website/App features
  const webFeatures: Feature[] = [
    { 
      id: 'web_feature1', 
      nameNl: 'Contactformulier met email service', 
      nameEn: 'Contact form with email service', 
      priceImpact: 100 
    },
    { 
      id: 'web_feature2', 
      nameNl: 'Extra pagina\'s (per 5)', 
      nameEn: 'Additional pages (per 5)', 
      priceImpact: 150 
    },
    { 
      id: 'web_feature3', 
      nameNl: 'Blog functionaliteit', 
      nameEn: 'Blog functionality', 
      priceImpact: 350 
    },
    { 
      id: 'web_feature4', 
      nameNl: 'Gebruikersauthenticatie', 
      nameEn: 'User Authentication', 
      priceImpact: 450 
    },
    { 
      id: 'web_feature5', 
      nameNl: 'E-commerce functionaliteit', 
      nameEn: 'E-commerce functionality', 
      priceImpact: 850 
    },
    { 
      id: 'web_feature6', 
      nameNl: 'CMS systeem', 
      nameEn: 'CMS system', 
      priceImpact: 550 
    },
    { 
      id: 'web_feature7', 
      nameNl: 'Meertalige website', 
      nameEn: 'Multilingual website', 
      priceImpact: 100
    },
    { 
      id: 'web_feature8', 
      nameNl: '3D visualisaties (Start van €100)', 
      nameEn: '3D visualizations (Starting at €100)', 
      priceImpact: 100 
    },
  ];

  // AI & Chatbot features
  const chatbotFeatures: Feature[] = [
    { 
      id: 'ai_feature1', 
      nameNl: 'Basis chatbot (FAQ)', 
      nameEn: 'Basic chatbot (FAQ)', 
      priceImpact: 500 
    },
    { 
      id: 'ai_feature2', 
      nameNl: 'Meertalige chatbot', 
      nameEn: 'Multilingual chatbot', 
      priceImpact: 200 
    },
    { 
      id: 'ai_feature3', 
      nameNl: 'CRM-integratie', 
      nameEn: 'CRM integration', 
      priceImpact: 300 
    },
    { 
      id: 'ai_feature4', 
      nameNl: 'Geavanceerde AI-functionaliteit (NLU/NLP)', 
      nameEn: 'Advanced AI functionality (NLU/NLP)', 
      priceImpact: 750 
    },
    { 
      id: 'ai_feature5', 
      nameNl: 'Chatbot met betalingsverwerking', 
      nameEn: 'Chatbot with payment processing', 
      priceImpact: 600 
    },
    { 
      id: 'ai_feature6', 
      nameNl: 'Analytics dashboard', 
      nameEn: 'Analytics dashboard', 
      priceImpact: 350 
    },
  ];

  // Automatisering features
  const automationFeatures: Feature[] = [
    { 
      id: 'auto_feature1', 
      nameNl: 'Workflow automatisering', 
      nameEn: 'Workflow automation', 
      priceImpact: 400 
    },
    { 
      id: 'auto_feature2', 
      nameNl: 'Integratie met bestaande tools (bijv. Trello, Zapier)', 
      nameEn: 'Integration with existing tools (e.g. Trello, Zapier)', 
      priceImpact: 300 
    },
    { 
      id: 'auto_feature3', 
      nameNl: 'Automatische e-mailflows', 
      nameEn: 'Automatic email flows', 
      priceImpact: 250 
    },
    { 
      id: 'auto_feature4', 
      nameNl: 'Data-analyse en rapportage', 
      nameEn: 'Data analysis and reporting', 
      priceImpact: 500 
    },
    { 
      id: 'auto_feature5', 
      nameNl: 'Realtime meldingen', 
      nameEn: 'Real-time notifications', 
      priceImpact: 200 
    },
  ];

  // Gecombineerd Project features
  const combinedFeatures: Feature[] = [
    { 
      id: 'comb_feature1', 
      nameNl: 'Website met chatbot integratie', 
      nameEn: 'Website with chatbot integration', 
      priceImpact: 1000 
    },
    { 
      id: 'comb_feature2', 
      nameNl: 'Automatisering gekoppeld aan website (bijv. leads naar CRM)', 
      nameEn: 'Automation linked to website (e.g. leads to CRM)', 
      priceImpact: 750 
    },
    { 
      id: 'comb_feature3', 
      nameNl: 'E-commerce met AI-aanbevelingen', 
      nameEn: 'E-commerce with AI recommendations', 
      priceImpact: 1200 
    },
    { 
      id: 'comb_feature4', 
      nameNl: 'Dynamische content op basis van AI', 
      nameEn: 'Dynamic content based on AI', 
      priceImpact: 900 
    },
    { 
      id: 'comb_feature5', 
      nameNl: 'Contactformulier met email service', 
      nameEn: 'Contact form with email service', 
      priceImpact: 100 
    },
    { 
      id: 'comb_feature6', 
      nameNl: 'Meertalige website', 
      nameEn: 'Multilingual website', 
      priceImpact: 100
    },
  ];

  // Get the current features based on project type
  const getFeaturesByType = (): Feature[] => {
    switch(projectType) {
      case 'chatbot':
        return chatbotFeatures;
      case 'automation':
        return automationFeatures;
      case 'web':
        return webFeatures;
      case 'combined':
        return combinedFeatures;
      default:
        return webFeatures;
    }
  };

  // Reset selected features when changing project type
  useEffect(() => {
    setSelectedFeatures([]);
  }, [projectType]);

  const features = getFeaturesByType();
  
  const supportPackages: SupportPackageInfo[] = [
    {
      id: 'none',
      nameNl: 'Geen maandelijks pakket',
      nameEn: 'No monthly package',
      price: 0
    },
    {
      id: 'basic',
      nameNl: 'Basic (€29/maand)',
      nameEn: 'Basic (€29/month)',
      price: 29
    },
    {
      id: 'standard',
      nameNl: 'Standaard (€69/maand)',
      nameEn: 'Standard (€69/month)',
      price: 69
    },
    {
      id: 'premium',
      nameNl: 'Premium (€129/maand)',
      nameEn: 'Premium (€129/month)',
      price: 129
    }
  ];
  
  // Get the support package price
  const getSupportPackagePrice = (): number => {
    const packageInfo = supportPackages.find(pkg => pkg.id === supportPackage);
    return packageInfo ? packageInfo.price : 0;
  };

  // Calculate base price based on project type and scale
  const getBasePrice = (): number => {
    // Website type prices based on the pricing section
    if (projectType === 'web') {
      if (projectScale === 'basic') {
        return 650; // Basis website: €650
      } else if (projectScale === 'advanced') {
        return 1250; // Geavanceerde website: €1250
      } else if (projectScale === 'custom') {
        return 2500; // Maatwerk website: €2500
      }
    }
    
    // For other project types
    const typeMultiplier = {
      chatbot: 1.2,
      automation: 1.3,
      web: 1,
      combined: 2.5
    };
    
    const scaleBase = {
      basic: 650,
      advanced: 1250,
      custom: 2500
    };
    
    return scaleBase[projectScale] * typeMultiplier[projectType];
  };
  
  // Calculate additional features cost
  const getFeaturesCost = (): number => {
    return features
      .filter(feature => selectedFeatures.includes(feature.id))
      .reduce((sum, feature) => sum + feature.priceImpact, 0);
  };
  
  // Calculate rush multiplier
  const getRushMultiplier = (): number => {
    const multipliers = {
      1: 1, // Standard
      2: 1.25, // Expedited
      3: 1.5 // Rush
    };
    
    return multipliers[timelinePriority];
  };
  
  // Total price calculation
  const calculatePrice = (): { min: number; max: number; monthlySupport: number } => {
    const basePrice = getBasePrice();
    const featuresCost = getFeaturesCost();
    const rushMultiplier = getRushMultiplier();
    const supportCost = getSupportPackagePrice();
    
    const total = (basePrice + featuresCost) * rushMultiplier;
    
    return {
      min: Math.round(total * 0.95),
      max: Math.round(total * 1.05),
      monthlySupport: supportCost
    };
  };
  
  // Timeline calculation in weeks
  const calculateTimeline = (): { min: number; max: number } => {
    let baseTime;
    
    if (projectScale === 'basic') {
      baseTime = 2; // 2 weeks for basic website
    } else if (projectScale === 'advanced') {
      baseTime = 4; // 4 weeks for advanced website
    } else {
      baseTime = 6; // 6 weeks for custom website
    }
    
    const featureTime = Math.ceil(selectedFeatures.length / 2);
    
    // Expedited reduces time by 20%, rush by 40%
    const timeMultiplier = {
      1: 1, // Standard
      2: 0.8, // Expedited
      3: 0.6 // Rush
    }[timelinePriority];
    
    const totalTime = (baseTime + featureTime) * timeMultiplier;
    
    return {
      min: Math.max(1, Math.floor(totalTime * 0.9)),
      max: Math.ceil(totalTime * 1.1)
    };
  };
  
  const priceRange = calculatePrice();
  const timelineRange = calculateTimeline();
  
  const handleFeatureToggle = (featureId: string) => {
    if (selectedFeatures.includes(featureId)) {
      setSelectedFeatures(selectedFeatures.filter(id => id !== featureId));
    } else {
      setSelectedFeatures([...selectedFeatures, featureId]);
    }
  };

  return (
    <section id="calculator" className="py-24 bg-primary relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-5" style={{ 
        backgroundImage: `url('https://images.unsplash.com/photo-1484417894907-623942c8ee29?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80')` 
      }}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-header font-bold mb-4">{t('calculator.title')}</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">{t('calculator.subtitle')}</p>
        </div>
        
        <motion.div 
          className="bg-secondary/80 backdrop-blur-md rounded-2xl p-8 lg:p-12 shadow-lg"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-header font-semibold mb-6">
                {language === 'nl' ? 'Configureer Uw Project' : 'Configure Your Project'}
              </h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-foreground/80 mb-2">{t('calculator.type')}</label>
                  <select 
                    className="w-full bg-primary border border-secondary p-3 rounded-lg text-foreground focus:outline-none focus:border-accent"
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value as ProjectType)}
                  >
                    <option value="chatbot">{t('calculator.type.chatbot')}</option>
                    <option value="automation">{t('calculator.type.automation')}</option>
                    <option value="web">{t('calculator.type.web')}</option>
                    <option value="combined">{t('calculator.type.combined')}</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-foreground/80 mb-2">{t('calculator.scale')}</label>
                  <div className="grid grid-cols-3 gap-4">
                    <button 
                      className={`${projectScale === 'basic' 
                        ? 'bg-primary border border-accent text-accent' 
                        : 'bg-primary border border-secondary hover:border-accent'} p-3 rounded-lg transition-colors`}
                      onClick={() => setProjectScale('basic')}
                    >
                      {language === 'nl' ? 'Basis' : 'Basic'}
                    </button>
                    <button 
                      className={`${projectScale === 'advanced' 
                        ? 'bg-primary border border-accent text-accent' 
                        : 'bg-primary border border-secondary hover:border-accent'} p-3 rounded-lg transition-colors`}
                      onClick={() => setProjectScale('advanced')}
                    >
                      {language === 'nl' ? 'Geavanceerd' : 'Advanced'}
                    </button>
                    <button 
                      className={`${projectScale === 'custom' 
                        ? 'bg-primary border border-accent text-accent' 
                        : 'bg-primary border border-secondary hover:border-accent'} p-3 rounded-lg transition-colors`}
                      onClick={() => setProjectScale('custom')}
                    >
                      {language === 'nl' ? 'Maatwerk' : 'Custom'}
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-foreground/80 mb-2">{t('calculator.features')}</label>
                  <div className="space-y-2">
                    {features.map((feature) => (
                      <div className="flex items-center" key={feature.id}>
                        <input 
                          type="checkbox" 
                          id={feature.id}
                          className="mr-2"
                          checked={selectedFeatures.includes(feature.id)}
                          onChange={() => handleFeatureToggle(feature.id)}
                        />
                        <label htmlFor={feature.id}>{language === 'nl' ? feature.nameNl : feature.nameEn}</label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-foreground/80 mb-2">{language === 'nl' ? 'Support Pakket' : 'Support Package'}</label>
                  <div className="mb-4">
                    <select 
                      className="w-full bg-primary border border-secondary p-3 rounded-lg text-foreground focus:outline-none focus:border-accent"
                      value={supportPackage}
                      onChange={(e) => setSupportPackage(e.target.value as SupportPackage)}
                    >
                      {supportPackages.map((pkg) => (
                        <option key={pkg.id} value={pkg.id}>
                          {language === 'nl' ? pkg.nameNl : pkg.nameEn}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-foreground/80 mb-2">{t('calculator.timeline')}</label>
                  <div className="relative pt-1">
                    <input 
                      type="range" 
                      className="w-full appearance-none h-1 bg-primary rounded outline-none accent-accent" 
                      min="1" 
                      max="3" 
                      step="1"
                      value={timelinePriority}
                      onChange={(e) => setTimelinePriority(parseInt(e.target.value) as TimelinePriority)}
                    />
                    <div className="flex justify-between text-xs text-foreground/60 pt-2">
                      <span>{t('calculator.timeline.standard')}</span>
                      <span>{t('calculator.timeline.expedited')}</span>
                      <span>{t('calculator.timeline.rush')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-header font-semibold mb-6">
                {language === 'nl' ? 'Geschatte Resultaten' : 'Estimated Results'}
              </h3>
              
              <div className="bg-primary/80 rounded-xl p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-foreground/80">{t('calculator.result.budget')}</span>
                  <span className="text-2xl font-medium text-accent">€{priceRange.min.toLocaleString()} - €{priceRange.max.toLocaleString()}</span>
                </div>
                
                {priceRange.monthlySupport > 0 && (
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-foreground/80">{language === 'nl' ? 'Maandelijks support' : 'Monthly support'}</span>
                    <span className="text-xl font-medium text-accent">€{priceRange.monthlySupport.toLocaleString()}/mnd</span>
                  </div>
                )}
                
                <div className="flex justify-between items-center">
                  <span className="text-foreground/80">{t('calculator.result.timeline')}</span>
                  <span className="text-xl font-medium">
                    {timelineRange.min}-{timelineRange.max} {language === 'nl' ? 'weken' : 'weeks'}
                  </span>
                </div>
              </div>
              
              <div className="bg-primary/80 rounded-xl p-6 mb-8">
                <h4 className="text-lg font-medium mb-4">
                  {language === 'nl' ? 'Inbegrepen in Schatting:' : 'Included in Estimate:'}
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <i className="ri-check-line text-accent text-xl mr-2 flex-shrink-0"></i>
                    <span>
                      {language === 'nl' ? 'Volledige projectplanning en ontwerp' : 'Complete project planning and design'}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <i className="ri-check-line text-accent text-xl mr-2 flex-shrink-0"></i>
                    <span>
                      {language === 'nl' ? 'Ontwikkeling en implementatie' : 'Development and implementation'}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <i className="ri-check-line text-accent text-xl mr-2 flex-shrink-0"></i>
                    <span>
                      {language === 'nl' ? 'Testen en kwaliteitsbewaking' : 'Testing and quality assurance'}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <i className="ri-check-line text-accent text-xl mr-2 flex-shrink-0"></i>
                    <span>
                      {language === 'nl' ? 'Implementatie en ondersteuning na lancering' : 'Deployment and post-launch support'}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <i className="ri-check-line text-accent text-xl mr-2 flex-shrink-0"></i>
                    <span>
                      {language === 'nl' ? 'Optimalisatie voor zoekmachines (SEO)' : 'Search engine optimization (SEO)'}
                    </span>
                  </li>
                  
                  {/* Geselecteerde features */}
                  {selectedFeatures.length > 0 && (
                    <>
                      <li className="pt-2 pb-1">
                        <span className="font-medium text-accent">
                          {language === 'nl' ? 'Geselecteerde opties:' : 'Selected options:'}
                        </span>
                      </li>
                      {features
                        .filter(feature => selectedFeatures.includes(feature.id))
                        .map(feature => (
                          <li key={feature.id} className="flex items-start">
                            <i className="ri-check-line text-accent text-xl mr-2 flex-shrink-0"></i>
                            <span>{language === 'nl' ? feature.nameNl : feature.nameEn}</span>
                          </li>
                        ))
                      }
                    </>
                  )}
                  
                  {/* Support pakket */}
                  {supportPackage !== 'none' && (
                    <>
                      <li className="pt-2 pb-1">
                        <span className="font-medium text-accent">
                          {language === 'nl' ? 'Support pakket:' : 'Support package:'}
                        </span>
                      </li>
                      <li className="flex items-start">
                        <i className="ri-check-line text-accent text-xl mr-2 flex-shrink-0"></i>
                        <span>
                          {supportPackages.find(pkg => pkg.id === supportPackage) 
                            ? (language === 'nl' 
                                ? supportPackages.find(pkg => pkg.id === supportPackage)!.nameNl 
                                : supportPackages.find(pkg => pkg.id === supportPackage)!.nameEn) 
                            : ''}
                        </span>
                      </li>
                    </>
                  )}
                </ul>
              </div>
              
              <div className="text-center">
                <a href="#contact" className="inline-block w-full py-3 bg-accent text-primary font-header font-medium rounded-lg transition hover:bg-accent/90">
                  {language === 'nl' ? 'Gedetailleerde Offerte Aanvragen' : 'Get Detailed Quote'}
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Scroll Indicator pointing to contact section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-16 flex justify-center"
        >
          <a href="#contact" className="flex flex-col items-center justify-center text-foreground/70 hover:text-accent transition group">
            <span className="text-sm mb-2">
              {language === 'nl' 
                ? 'Neem contact met ons op voor een gratis adviesgesprek' 
                : 'Contact us for a free consultation'}
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 animate-bounce group-hover:text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectCalculator;
