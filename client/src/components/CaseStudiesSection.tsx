import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/languageContext';
import { useQuery } from '@tanstack/react-query';

interface CaseStudy {
  slug: string;
  title: string;
  featured_image: string;
  category: string;
  client: string;
  industry: string;
  date: string;
  description: string;
  challenge: string;
  solution: string;
  result: string;
  metrics: Array<{ label: string; value: string }>;
  live_url?: string;
  featured: boolean;
  content: string;
}

type FilterCategory = 'All' | 'AI & Chatbots' | 'Automation' | 'Web Development';

const CaseStudiesSection = () => {
  const { t, language } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('All');
  
  // Define filter categories based on the current language
  const filterCategories = {
    'All': language === 'nl' ? 'Alle' : 'All',
    'AI & Chatbots': 'AI & Chatbots',
    'Automation': language === 'nl' ? 'Automatisering' : 'Automation',
    'Web Development': language === 'nl' ? 'Webontwikkeling' : 'Web Development'
  };
  
  // Fetch case studies from the CMS API
  const { data: caseStudiesData, isLoading, error } = useQuery({
    queryKey: ['/api/case-studies', language],
    queryFn: async () => {
      const response = await fetch(`/api/case-studies?lang=${language}`);
      if (!response.ok) {
        throw new Error('Failed to fetch case studies');
      }
      const data = await response.json();
      return data.data as CaseStudy[];
    }
  });

  // Show loading state while fetching data
  const caseStudies = caseStudiesData || [];

  // Filter case studies based on the active filter
  const categoryMapping: Record<string, string> = {
    'AI & Chatbots': language === 'nl' ? 'AI & Chatbots' : 'AI & Chatbots',
    'Automation': language === 'nl' ? 'Automatisering' : 'Automation',
    'Web Development': language === 'nl' ? 'Webontwikkeling' : 'Web Development'
  };

  const filteredCaseStudies = !caseStudies ? [] : (
    activeFilter === 'All' 
      ? caseStudies 
      : caseStudies.filter((study) => study.category === categoryMapping[activeFilter])
  );

  // Show loading state while fetching data
  if (isLoading) {
    return (
      <section id="case-studies" className="py-24 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-header font-bold mb-4">{t('cases.title')}</h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">{t('cases.subtitle')}</p>
          </div>
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
          </div>
        </div>
      </section>
    );
  }

  // Show error state if there was an issue fetching data
  if (error) {
    return (
      <section id="case-studies" className="py-24 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-header font-bold mb-4">{t('cases.title')}</h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">{t('cases.subtitle')}</p>
          </div>
          <div className="text-center py-10 text-red-400">
            <p>{t('common.error')}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="case-studies" className="py-24 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-header font-bold mb-4">{t('cases.title')}</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">{t('cases.subtitle')}</p>
        </div>
        
        <div className="mb-10 flex flex-wrap justify-center gap-4">
          <button 
            className={`px-4 py-2 rounded-lg ${activeFilter === 'All' ? 'bg-accent text-primary' : 'bg-secondary/50 text-foreground hover:bg-secondary'} font-medium transition-colors`}
            onClick={() => setActiveFilter('All')}
          >
            {t('cases.filter.all')}
          </button>
          <button 
            className={`px-4 py-2 rounded-lg ${activeFilter === 'AI & Chatbots' ? 'bg-accent text-primary' : 'bg-secondary/50 text-foreground hover:bg-secondary'} font-medium transition-colors`}
            onClick={() => setActiveFilter('AI & Chatbots')}
          >
            {t('cases.filter.ai')}
          </button>
          <button 
            className={`px-4 py-2 rounded-lg ${activeFilter === 'Automation' ? 'bg-accent text-primary' : 'bg-secondary/50 text-foreground hover:bg-secondary'} font-medium transition-colors`}
            onClick={() => setActiveFilter('Automation')}
          >
            {t('cases.filter.automation')}
          </button>
          <button 
            className={`px-4 py-2 rounded-lg ${activeFilter === 'Web Development' ? 'bg-accent text-primary' : 'bg-secondary/50 text-foreground hover:bg-secondary'} font-medium transition-colors`}
            onClick={() => setActiveFilter('Web Development')}
          >
            {t('cases.filter.web')}
          </button>
        </div>
        
        
        {filteredCaseStudies.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-foreground/70">
              {language === 'nl' ? 'Geen resultaten gevonden' : 'No results found'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {filteredCaseStudies.map((study, index) => (
              <motion.div 
                key={index}
                className="bg-secondary/50 rounded-xl overflow-hidden card-hover-effect h-full flex flex-col"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={study.featured_image || '/uploads/retailtech-chatbot.jpg'} 
                    alt={study.title} 
                    className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-110"
                    onError={(e) => {
                      console.error('Afbeelding kon niet worden geladen:', study.featured_image);
                      e.currentTarget.src = '/uploads/retailtech-chatbot.jpg';
                    }}
                  />
                  <div className="absolute top-3 right-3 text-accent text-xs px-2 py-1 font-semibold">
                    {study.category}
                  </div>
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-xl font-header font-semibold mb-3">{study.title}</h3>
                  <p className="text-foreground/70 mb-4 flex-grow">{study.description}</p>
                  <div className="flex items-center justify-between mt-4">
                    {study.live_url && (
                      <a 
                        href={study.live_url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-xs px-3 py-1 bg-secondary/60 rounded-md hover:bg-secondary text-foreground/90"
                      >
                        <i className="ri-external-link-line mr-1"></i>
                        <span>{language === 'nl' ? 'Live Website' : 'Live Website'}</span>
                      </a>
                    )}
                    <a 
                      href={`/case-studies/${study.slug}`} 
                      className="text-foreground/70 hover:text-accent flex items-center ml-auto"
                    >
                      <span>{language === 'nl' ? 'Bekijk Project' : 'View Case'}</span>
                      <i className="ri-arrow-right-line ml-1"></i>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
        
        <div className="text-center mt-8 flex justify-center gap-4">
          <a href="/blogs" className="inline-flex items-center px-6 py-3 border border-foreground/30 rounded-lg hover:bg-secondary transition">
            <span>{language === 'nl' ? 'Meer Projecten' : 'More Projects'}</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
          
          <a href="/portfolio" className="inline-flex items-center px-6 py-3 bg-accent text-primary font-medium rounded-lg hover:bg-accent/90 transition-all duration-300 group relative overflow-hidden">
            <span className="relative z-10">{language === 'nl' ? 'Portfolio Verkennen' : 'Explore Portfolio'}</span>
            <span className="absolute inset-0 bg-gradient-to-r from-accent to-accent-light opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="ml-2 relative z-10 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5 group-hover:animate-pulse">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
