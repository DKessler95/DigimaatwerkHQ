import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/languageContext';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

interface PricingPlan {
  title: {
    nl: string;
    en: string;
  };
  description: {
    nl: string;
    en: string;
  };
  price: string;
  features: {
    nl: string[];
    en: string[];
  };
}

interface ServicePricing {
  title: {
    nl: string;
    en: string;
  };
  description: {
    nl: string;
    en: string;
  };
  price: string;
}

const PricingSection: React.FC = () => {
  const { language, t } = useLanguage();

  const services: ServicePricing[] = [
    {
      title: {
        nl: 'Basis Website',
        en: 'Basic Website'
      },
      description: {
        nl: 'Tot 5 pagina\'s, responsive design, basis SEO',
        en: 'Up to 5 pages, responsive design, basic SEO'
      },
      price: '€650'
    },
    {
      title: {
        nl: 'Geavanceerde Website',
        en: 'Advanced Website'
      },
      description: {
        nl: 'Tot 10 pagina\'s, CMS-integratie, custom design',
        en: 'Up to 10 pages, CMS integration, custom design'
      },
      price: '€1.250'
    },
    {
      title: {
        nl: 'Maatwerk Applicatie',
        en: 'Custom Application'
      },
      description: {
        nl: 'Volledig op maat gemaakt, geavanceerde functionaliteit',
        en: 'Fully customized, advanced functionality'
      },
      price: '€2.500+'
    }
  ];

  const monthlyPlans: PricingPlan[] = [
    {
      title: {
        nl: 'Basis Support',
        en: 'Basic Support'
      },
      description: {
        nl: 'Perfecte start voor kleine bedrijven.',
        en: 'Perfect start for small businesses.'
      },
      price: '€29',
      features: {
        nl: [
          '24/7 ticket support',
          'Kleine updates en fixes',
          'Maandelijkse backup',
          'Response binnen 48 uur'
        ],
        en: [
          '24/7 ticket support',
          'Small updates and fixes',
          'Monthly backup',
          'Response within 48 hours'
        ]
      }
    },
    {
      title: {
        nl: 'Standaard Support',
        en: 'Standard Support'
      },
      description: {
        nl: 'Ideaal voor groeiende bedrijven.',
        en: 'Ideal for growing businesses.'
      },
      price: '€69',
      features: {
        nl: [
          'Snelle respons (24 uur)',
          'Maandelijkse beveiligingscheck',
          'Content updates',
          'Technische ondersteuning',
          'Toegang tot klantenportaal'
        ],
        en: [
          'Fast response (24 hours)',
          'Monthly security check',
          'Content updates',
          'Technical support',
          'Access to customer portal'
        ]
      }
    },
    {
      title: {
        nl: 'Premium Support',
        en: 'Premium Support'
      },
      description: {
        nl: 'Complete dienstverlening voor veeleisende bedrijven.',
        en: 'Complete service for demanding businesses.'
      },
      price: '€129',
      features: {
        nl: [
          'Prioriteit respons (12 uur)',
          'Uitgebreide SEO-monitoring',
          'Wekelijkse beveiligingscheck',
          'Doorlopende optimalisatie',
          'Performance monitoring',
          'Persoonlijke accountmanager'
        ],
        en: [
          'Priority response (12 hours)',
          'Extensive SEO monitoring',
          'Weekly security check',
          'Continuous optimization',
          'Performance monitoring',
          'Personal account manager'
        ]
      }
    }
  ];

  return (
    <section className="bg-slate-900 py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ staggerChildren: 0.1 }}
          className="text-center mb-16"
        >
          <motion.h2 
            variants={fadeIn}
            className="text-3xl md:text-4xl font-bold mb-4 text-white"
          >
            {language === 'nl' ? 'Transparante Prijzen' : 'Transparent Pricing'}
          </motion.h2>
          <motion.p 
            variants={fadeIn}
            className="text-slate-300 max-w-2xl mx-auto"
          >
            {language === 'nl' 
              ? 'Bij Digimaatwerk geloven we in transparantie en kwaliteit. Wij bieden betaalbare maatwerkoplossingen die perfect aansluiten bij de behoeften van jouw bedrijf.'
              : 'At Digimaatwerk, we believe in transparency and quality. We offer affordable custom solutions that perfectly match your business needs.'}
          </motion.p>
        </motion.div>
        
        {/* Services Pricing */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ staggerChildren: 0.1 }}
          className="mb-16"
        >
          <motion.h3 
            variants={fadeIn}
            className="text-2xl font-bold mb-8 text-white text-center"
          >
            {language === 'nl' ? 'Diensten' : 'Services'}
          </motion.h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="bg-slate-800 rounded-lg p-6 hover:bg-slate-700 transition-colors border border-slate-700"
              >
                <div className="text-teal-400 text-2xl font-bold mb-2">{service.price}</div>
                <h4 className="text-xl font-bold text-white mb-3">{service.title[language]}</h4>
                <p className="text-slate-300 mb-4">{service.description[language]}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Monthly Support Plans */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ staggerChildren: 0.1 }}
        >
          <motion.h3 
            variants={fadeIn}
            className="text-2xl font-bold mb-8 text-white text-center"
          >
            {language === 'nl' ? '24/7 Support Pakketten' : '24/7 Support Packages'}
          </motion.h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {monthlyPlans.map((plan, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className={`rounded-lg p-6 border flex flex-col h-full ${
                  index === 1 
                    ? 'bg-slate-700 border-teal-500' 
                    : 'bg-slate-800 border-slate-700 hover:bg-slate-700 transition-colors'
                }`}
              >
                <div className="mb-4">
                  <div className="text-teal-400 text-2xl font-bold mb-2">{plan.price}<span className="text-slate-400 text-sm font-normal"> / {language === 'nl' ? 'maand' : 'month'}</span></div>
                  <h4 className="text-xl font-bold text-white">{plan.title[language]}</h4>
                  <p className="text-slate-300 mt-1">{plan.description[language]}</p>
                </div>
                
                <ul className="space-y-2 flex-grow">
                  {plan.features[language].map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <svg className="h-5 w-5 text-teal-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
          
          {/* Centralized contact button */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeIn}
            className="flex justify-center mt-10"
          >
            <a 
              href="#contact" 
              className="px-8 py-4 bg-teal-500 hover:bg-teal-600 text-white font-medium rounded-md transition-colors shadow-lg inline-flex items-center"
            >
              {language === 'nl' ? 'Neem contact op voor een offerte' : 'Contact us for a quote'}
              <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </motion.div>
        </motion.div>
        
        {/* Additional info */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
          className="text-center mt-16 text-slate-300 max-w-3xl mx-auto"
        >
          <p>
            {language === 'nl' 
              ? 'Alle maandelijkse pakketten omvatten toegang tot ons klantenportaal waar je eenvoudig hulp kunt krijgen en updates kunt volgen. Voor specifieke wensen of aangepaste oplossingen, neem contact met ons op voor een persoonlijk voorstel.'
              : 'All monthly packages include access to our customer portal where you can easily get help and track updates. For specific requirements or custom solutions, please contact us for a personalized proposal.'}
          </p>
        </motion.div>
        
        {/* Scroll Indicator pointing to calculator section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
          }}
          className="mt-16 flex justify-center"
        >
          <a href="#calculator" className="flex flex-col items-center justify-center text-foreground/70 hover:text-accent transition group">
            <span className="text-sm mb-2">
              {language === 'nl' 
                ? 'Of bereken de prijs van uw website met onze "Project calculator"' 
                : 'Or calculate the price of your website with our "Project calculator"'}
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

export default PricingSection;