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
          technicalDetails: `We zijn Microsoft Partners met gecertificeerde consultants in Microsoft 365, Azure en Power Platform. 
          Onze aanpak omvat assessment, migratie planning, implementatie en continue optimalisatie van uw Microsoft 365 omgeving.`
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
        {/* Hero section with 3D animation */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-16">
          <div className="w-full lg:w-1/2">
            <motion.h1 
              className="text-4xl md:text-5xl font-header font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {details.title}
            </motion.h1>
            <motion.p 
              className="text-xl text-foreground/80 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {details.subtitle}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p className="text-foreground/70 mb-8">
                {details.description}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/#contact" className="px-6 py-3 bg-accent text-primary font-medium rounded-lg hover:bg-accent/90 transition">
                  Contact opnemen
                </Link>
                {category !== 'microsoft-365' && (
                  <Link href="#examples" className="px-6 py-3 bg-transparent text-accent font-medium rounded-lg border border-accent hover:bg-accent/10 transition">
                    Voorbeelden bekijken
                  </Link>
                )}
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
        <div className="mb-16">
          <motion.h2 
            className="text-3xl font-header font-bold mb-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Wat we bieden
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {details.features.map((feature, index) => (
              <motion.div 
                key={index}
                className="bg-secondary/30 backdrop-blur-sm p-6 rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center mb-4">
                  <span className="text-accent text-xl">✓</span>
                </div>
                <p>{feature}</p>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Technical details and process section */}
        <div className="mb-16 bg-secondary/20 backdrop-blur-sm p-8 rounded-xl">
          <motion.h2 
            className="text-3xl font-header font-bold mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Technische details
          </motion.h2>
          <motion.p 
            className="text-foreground/70 mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {details.technicalDetails}
          </motion.p>
          
          <motion.h3 
            className="text-2xl font-header font-semibold mt-8 mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Ons proces
          </motion.h3>
          
          <div className="flex flex-col md:flex-row gap-6">
            {['Analyse & Planning', 'Ontwikkeling', 'Testen', 'Implementatie', 'Ondersteuning'].map((step, index) => (
              <motion.div 
                key={index}
                className="flex-1"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-primary font-bold mr-2">
                    {index + 1}
                  </div>
                  <h4 className="font-medium">{step}</h4>
                </div>
                <div className={`h-1 bg-accent/30 mt-2 ${index === 4 ? '' : 'mb-4'}`}></div>
              </motion.div>
            ))}
          </div>
        </div>
        
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
            
            {/* CTA */}
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
          </div>
        )}
        
        {/* Contact CTA for all services */}
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
      </div>
    </div>
  );
};

export default ServiceCategory;