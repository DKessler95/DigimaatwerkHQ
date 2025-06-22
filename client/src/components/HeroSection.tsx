// HeroSection.tsx
import { useLanguage } from '@/lib/languageContext';

const HeroSection = () => {
  const { t } = useLanguage();
  
  return (
    <section className="hero-section relative h-[90vh] overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-accent/30 blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 left-1/3 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-accent/20 blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 right-1/3 w-56 h-56 rounded-full bg-accent/25 blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-header font-bold mb-6 text-foreground">
            {t('hero.title')}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-foreground/80 mb-10 font-body max-w-2xl mx-auto">
            {t('hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="#services" className="px-8 py-3 bg-accent text-primary font-header font-medium rounded-lg shadow-lg transition-all duration-300 hover:bg-primary hover:text-accent hover:scale-105 hover:shadow-xl">
              {t('hero.cta')}
            </a>
            <a href="#contact" className="px-8 py-3 bg-transparent border border-foreground/30 text-foreground font-header font-medium rounded-lg shadow-lg transition-all duration-300 hover:bg-accent hover:text-primary hover:border-accent hover:scale-105 hover:shadow-xl">
              {t('hero.contact')}
            </a>
          </div>
          
          {/* Service Icons */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="bg-secondary/50 backdrop-blur-md rounded-lg p-6 flex flex-col text-center h-[200px]">
              <div className="w-16 h-16 mb-4 flex items-center justify-center bg-accent/20 rounded-lg mx-auto flex-shrink-0">
                <svg className="w-8 h-8 text-accent" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 4H4C2.89543 4 2 4.89543 2 6V18C2 19.1046 2.89543 20 4 20H20C21.1046 20 22 19.1046 22 18V6C22 4.89543 21.1046 4 20 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 10H6V16H8V10Z" fill="currentColor"/>
                  <path d="M14 10H12V16H14V10Z" fill="currentColor"/>
                  <path d="M20 10H18V16H20V10Z" fill="currentColor"/>
                  <path d="M10 12H14V14H10V12Z" fill="currentColor"/>
                  <path d="M16 12H20V14H16V12Z" fill="currentColor"/>
                </svg>
              </div>
              <div className="flex flex-col justify-between flex-grow">
                <h3 className="text-xl font-medium mb-2">{t('hero.services.web.title')}</h3>
                <p className="text-foreground/70 text-sm">{t('hero.services.web.description')}</p>
              </div>
            </div>
            
            <div className="bg-secondary/50 backdrop-blur-md rounded-lg p-6 flex flex-col text-center h-[200px]">
              <div className="w-16 h-16 mb-4 flex items-center justify-center bg-accent/20 rounded-lg mx-auto flex-shrink-0">
                <svg className="w-8 h-8 text-accent" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 16L16 12L12 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="flex flex-col justify-between flex-grow">
                <h3 className="text-xl font-medium mb-2">{t('hero.services.automation.title')}</h3>
                <p className="text-foreground/70 text-sm">{t('hero.services.automation.description')}</p>
              </div>
            </div>
            
            <div className="bg-secondary/50 backdrop-blur-md rounded-lg p-6 flex flex-col text-center h-[200px]">
              <div className="w-16 h-16 mb-4 flex items-center justify-center bg-accent/20 rounded-lg mx-auto flex-shrink-0">
                <svg className="w-8 h-8 text-accent" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 15C21 16.6569 19.6569 18 18 18H17.2829C17.1241 18 16.9716 18.0636 16.8672 18.1769L15.7205 19.4323C14.9289 20.3064 13.5943 20.3064 12.8026 19.4323L11.6559 18.1769C11.5515 18.0636 11.399 18 11.2402 18H6C4.34315 18 3 16.6569 3 15V7C3 5.34315 4.34315 4 6 4H18C19.6569 4 21 5.34315 21 7V15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7 9H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7 13H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="flex flex-col justify-between flex-grow">
                <h3 className="text-xl font-medium mb-2">{t('hero.services.chatbot.title')}</h3>
                <p className="text-foreground/70 text-sm">{t('hero.services.chatbot.description')}</p>
              </div>
            </div>
            
            <div className="bg-secondary/50 backdrop-blur-md rounded-lg p-6 flex flex-col text-center h-[200px]">
              <div className="w-16 h-16 mb-4 flex items-center justify-center bg-accent/20 rounded-lg mx-auto flex-shrink-0">
                <svg className="w-8 h-8 text-accent" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.5 19H16.5C15.1193 19 14 17.8807 14 16.5V7.5C14 6.11929 15.1193 5 16.5 5H17.5C18.8807 5 20 6.11929 20 7.5V16.5C20 17.8807 18.8807 19 17.5 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6.5 19H7.5C8.88071 19 10 17.8807 10 16.5V7.5C10 6.11929 8.88071 5 7.5 5H6.5C5.11929 5 4 6.11929 4 7.5V16.5C4 17.8807 5.11929 19 6.5 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 8H10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 12H10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 16H10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="flex flex-col justify-between flex-grow">
                <h3 className="text-xl font-medium mb-2">{t('hero.services.microsoft365.title')}</h3>
                <p className="text-foreground/70 text-sm">{t('hero.services.microsoft365.description')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
        <a href="#services" className="flex flex-col items-center justify-center text-foreground/70 hover:text-accent transition">
          <span className="text-sm mb-2">{t('hero.cta')}</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
