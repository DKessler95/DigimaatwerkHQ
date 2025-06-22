import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/languageContext';
import mascotImage from '@assets/mascot_1750294453535.png';

interface Service {
  icon: string;
  titleKey: string;
  descriptionKey: string;
  techKey: string;
}

const services: Service[] = [
  {
    icon: "ri-robot-line",
    titleKey: "services.ai.title",
    descriptionKey: "services.ai.description",
    techKey: "services.ai.tech"
  },
  {
    icon: "ri-settings-line",
    titleKey: "services.automation.title",
    descriptionKey: "services.automation.description",
    techKey: "services.automation.tech"
  },
  {
    icon: "ri-code-s-slash-line",
    titleKey: "services.web.title",
    descriptionKey: "services.web.description",
    techKey: "services.web.tech"
  }
];

const ServicesSection = () => {
  const { t, language } = useLanguage();

  return (
    <section id="services" className="py-24 bg-gradient-to-b from-primary to-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-header font-bold mb-4">{t('services.title')}</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">{t('services.subtitle')}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            // Map icons to paths for each category
            const categoryPaths = {
              "ri-robot-line": "/services/ai-chatbots",
              "ri-settings-line": "/services/workflow-automation",
              "ri-code-s-slash-line": "/services/web-development"
            };
            
            return (
              <motion.div 
                key={index}
                className="relative bg-gradient-to-br from-secondary via-secondary/80 to-primary/80 p-8 rounded-2xl shadow-lg card-hover-effect overflow-hidden group h-[420px] flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-500"></div>
                <div className="relative z-10 flex flex-col flex-grow">
                  <div className="w-14 h-14 rounded-xl bg-accent/20 flex items-center justify-center mb-6">
                    <i className={`${service.icon} text-2xl text-accent`}></i>
                  </div>
                  <h3 className="text-xl font-header font-semibold mb-3">{t(service.titleKey)}</h3>
                  <p className="text-foreground/70 mb-4">{t(service.descriptionKey)}</p>
                  <div className="mt-auto">
                    <p className="text-accent font-mono text-sm mb-4">{t(service.techKey)}</p>
                    <a 
                      href={categoryPaths[service.icon as keyof typeof categoryPaths]} 
                      className="inline-flex items-center text-accent group"
                    >
                      <span className="group-hover:underline">Bekijk details</span>
                      <i className="ri-arrow-right-line ml-2 transition-transform group-hover:translate-x-1"></i>
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
        
        {/* Service Feature (AI Chatbot Demo) */}
        <div className="mt-24 bg-secondary/50 backdrop-blur-md rounded-2xl p-8 lg:p-12 overflow-hidden">
          <div className="asymmetric-grid">
            <div className="col-span-12 lg:col-span-5 flex flex-col justify-center">
              <h3 className="text-2xl md:text-3xl font-header font-bold mb-6">{t('services.chatbot.title')}</h3>
              <p className="text-foreground/70 mb-8">{t('services.chatbot.subtitle')}</p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <i className="ri-check-line text-accent text-xl mr-2"></i>
                  <span>{t('services.chatbot.feature1')}</span>
                </li>
                <li className="flex items-start">
                  <i className="ri-check-line text-accent text-xl mr-2"></i>
                  <span>{t('services.chatbot.feature2')}</span>
                </li>
                <li className="flex items-start">
                  <i className="ri-check-line text-accent text-xl mr-2"></i>
                  <span>{t('services.chatbot.feature3')}</span>
                </li>
              </ul>
              <a href="#contact" className="inline-flex items-center text-accent group">
                <span className="group-hover:underline">{t('services.chatbot.cta')}</span>
                <i className="ri-arrow-right-line ml-2 transition-transform group-hover:translate-x-1"></i>
              </a>
            </div>
            <div className="col-span-12 lg:col-span-6 lg:col-start-7 mt-10 lg:mt-0">
              {/* Maatje Mascot Display */}
              <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl overflow-hidden shadow-2xl h-[400px] flex flex-col items-center justify-center p-8">
                <div className="text-center mb-6">
                  <div 
                    className="cursor-pointer transform transition-transform hover:scale-105"
                    onClick={() => {
                      // Open the n8n chat widget
                      const chatWidget = document.querySelector('.n8n-chat-toggle, [class*="toggle"]') as HTMLElement;
                      if (chatWidget) {
                        chatWidget.click();
                      }
                    }}
                  >
                    <img 
                      src={mascotImage} 
                      alt="Maatje - Digimaatwerk Mascot" 
                      className="w-48 h-48 mx-auto mb-4 object-contain"
                    />
                    <h4 className="text-2xl font-header font-bold text-foreground mb-2">
                      Ontmoet Maatje!
                    </h4>
                    <p className="text-foreground/70 text-lg">
                      Klik om te chatten met onze AI-assistent
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator pointing to prices section */}
        <div className="mt-16 flex justify-center">
          <a href="#pricing" className="flex flex-col items-center justify-center text-foreground/70 hover:text-accent transition group">
            <span className="text-sm mb-2">{language === 'nl' ? 'Zie onze prijzen en pakketten' : 'See our prices and packages'}</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 animate-bounce group-hover:text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
