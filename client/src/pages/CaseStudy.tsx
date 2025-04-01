import { useState, useEffect } from 'react';
import { useParams, Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/languageContext';

// Helper function to format the HTML content for case studies
function formatCaseStudyContent(content: string): string {
  // Replace Markdown heading syntax with proper HTML headings
  let formatted = content.replace(/\n# (.*?)\n/g, '<h1>$1</h1>');
  formatted = formatted.replace(/\n## (.*?)\n/g, '<h2>$1</h2>');
  formatted = formatted.replace(/\n### (.*?)\n/g, '<h3>$1</h3>');
  
  // Fix bullet points that might be simple dashes
  formatted = formatted.replace(/\n- (.*?)(?=\n)/g, '<ul><li>$1</li></ul>');
  formatted = formatted.replace(/<\/ul>\n<ul>/g, '');
  
  // Fix numbered lists
  formatted = formatted.replace(/\n\d+\. (.*?)(?=\n)/g, '<ol><li>$1</li></ol>');
  formatted = formatted.replace(/<\/ol>\n<ol>/g, '');
  
  // Enhance blockquotes
  formatted = formatted.replace(/\n> (.*?)(?=\n)/g, '<blockquote>$1</blockquote>');
  
  // Enhance strong text 
  formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  return formatted;
}

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

const CaseStudyPage = () => {
  const { slug } = useParams();
  const { language } = useLanguage();
  
  // Fetch case study data from API
  const { data: caseStudy, isLoading, error } = useQuery({
    queryKey: ['/api/case-studies', slug, language],
    queryFn: async () => {
      const response = await fetch(`/api/case-studies/${slug}?lang=${language}`);
      if (!response.ok) {
        throw new Error('Failed to fetch case study');
      }
      const data = await response.json();
      // Format the content for better rendering using our helper function
      if (data.data && data.data.content) {
        data.data.content = formatCaseStudyContent(data.data.content);
      }
      return data.data as CaseStudy;
    }
  });

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
      </div>
    );
  }

  // Error state
  if (error || !caseStudy) {
    return (
      <div className="min-h-screen bg-primary flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-header mb-4">
          {language === 'nl' ? 'Case study niet gevonden' : 'Case study not found'}
        </h1>
        <p className="text-foreground/70 mb-6">
          {language === 'nl' 
            ? 'De case study die je zoekt kon niet worden gevonden.' 
            : 'The case study you are looking for could not be found.'}
        </p>
        <a 
          href="/#case-studies" 
          className="px-6 py-3 bg-accent text-primary rounded-lg hover:bg-accent/90 transition inline-block"
        >
          {language === 'nl' ? 'Terug naar case studies' : 'Back to case studies'}
        </a>
      </div>
    );
  }

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(language === 'nl' ? 'nl-NL' : 'en-US', {
      year: 'numeric',
      month: 'long',
    }).format(date);
  };

  return (
    <div className="bg-primary min-h-screen relative">
      {/* Hero section */}
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <img 
          src={caseStudy.featured_image} 
          alt={caseStudy.title}
          className="absolute w-full h-full object-cover"
        />
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-end pb-12">
          <div className="inline-block px-3 py-1 text-accent text-sm font-semibold mb-4">
            {caseStudy.category}
          </div>
          <h1 className="text-3xl md:text-5xl font-header font-bold mb-4 text-white">
            {caseStudy.title}
          </h1>
          <p className="text-white/80 max-w-2xl mb-6">
            {caseStudy.description}
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-white/70">
            <div>
              <span className="font-medium">{language === 'nl' ? 'Klant: ' : 'Client: '}</span>
              {caseStudy.client}
            </div>
            <div>
              <span className="font-medium">{language === 'nl' ? 'Industrie: ' : 'Industry: '}</span>
              {caseStudy.industry}
            </div>
            <div>
              <span className="font-medium">{language === 'nl' ? 'Datum: ' : 'Date: '}</span>
              {formatDate(caseStudy.date)}
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-secondary/50 rounded-xl p-6 sticky top-24">
              <h3 className="font-header text-xl font-semibold mb-6">
                {language === 'nl' ? 'Resultaten' : 'Results'}
              </h3>
              
              <div className="space-y-6">
                {caseStudy.metrics.map((metric, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-secondary/80 rounded-lg p-4"
                  >
                    <div className="text-2xl font-header font-bold text-accent">
                      {metric.value}
                    </div>
                    <div className="text-sm text-foreground/70">
                      {metric.label}
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {caseStudy.live_url && (
                <div className="mt-8">
                  <a 
                    href={caseStudy.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center px-4 py-3 bg-accent text-primary rounded-lg hover:bg-accent/90 transition"
                  >
                    <i className="ri-external-link-line mr-2"></i>
                    {language === 'nl' ? 'Bekijk Live Website' : 'View Live Website'}
                  </a>
                </div>
              )}
              
              <div className="mt-4">
                <a 
                  href="/#case-studies"
                  className="w-full inline-flex items-center justify-center px-4 py-3 border border-foreground/30 rounded-lg hover:bg-secondary transition mt-4"
                >
                  <i className="ri-arrow-left-line mr-2"></i>
                  {language === 'nl' ? 'Alle Case Studies' : 'All Case Studies'}
                </a>
              </div>
            </div>
          </div>
          
          {/* Main content */}
          <div className="md:col-span-2">
            <div className="max-w-none">
              <div className="mb-10 bg-secondary/30 p-6 rounded-lg">
                <h2 className="text-xl md:text-2xl font-header font-semibold mb-4 text-accent">
                  {language === 'nl' ? 'De Uitdaging' : 'The Challenge'}
                </h2>
                <p className="text-foreground/90 text-lg leading-relaxed">
                  {caseStudy.challenge}
                </p>
              </div>
              
              <div className="mb-10 bg-secondary/30 p-6 rounded-lg">
                <h2 className="text-xl md:text-2xl font-header font-semibold mb-4 text-accent">
                  {language === 'nl' ? 'Onze Oplossing' : 'Our Solution'}
                </h2>
                <p className="text-foreground/90 text-lg leading-relaxed">
                  {caseStudy.solution}
                </p>
              </div>
              
              <div className="mb-10 bg-secondary/30 p-6 rounded-lg">
                <h2 className="text-xl md:text-2xl font-header font-semibold mb-4 text-accent">
                  {language === 'nl' ? 'Het Resultaat' : 'The Result'}
                </h2>
                <p className="text-foreground/90 text-lg leading-relaxed">
                  {caseStudy.result}
                </p>
              </div>
              
              {/* Category visualization */}
              <div className="mb-10">
                <div className="h-64 rounded-lg shadow-xl overflow-hidden relative">
                  {caseStudy.category === 'Automatisering' || caseStudy.category === 'Automation' ? (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-800 p-6">
                      <div className="text-center text-white">
                        <div className="text-6xl mb-4">
                          <i className="ri-settings-4-line"></i>
                        </div>
                        <h3 className="text-2xl font-bold">{caseStudy.category}</h3>
                        <p className="mt-2 opacity-80">
                          {language === 'nl' ? 
                            'Optimaliseer uw bedrijfsprocessen met slimme automatisering' : 
                            'Optimize your business processes with smart automation'}
                        </p>
                      </div>
                    </div>
                  ) : caseStudy.category === 'Webontwikkeling' || caseStudy.category === 'Web Development' ? (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-teal-600 to-teal-800 p-6">
                      <div className="text-center text-white">
                        <div className="text-6xl mb-4">
                          <i className="ri-code-s-slash-line"></i>
                        </div>
                        <h3 className="text-2xl font-bold">{caseStudy.category}</h3>
                        <p className="mt-2 opacity-80">
                          {language === 'nl' ? 
                            'Professionele websites en webapplicaties op maat' : 
                            'Professional custom websites and web applications'}
                        </p>
                      </div>
                    </div>
                  ) : caseStudy.category === 'AI & Chatbots' ? (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-cyan-600 to-cyan-800 p-6">
                      <div className="text-center text-white">
                        <div className="text-6xl mb-4">
                          <i className="ri-robot-line"></i>
                        </div>
                        <h3 className="text-2xl font-bold">{caseStudy.category}</h3>
                        <p className="mt-2 opacity-80">
                          {language === 'nl' ? 
                            'Intelligente AI-oplossingen en interactieve chatbots' : 
                            'Intelligent AI solutions and interactive chatbots'}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-600 to-slate-800 p-6">
                      <div className="text-center text-white">
                        <div className="text-6xl mb-4">
                          <i className="ri-lightbulb-line"></i>
                        </div>
                        <h3 className="text-2xl font-bold">{caseStudy.category}</h3>
                        <p className="mt-2 opacity-80">
                          {language === 'nl' ? 
                            'Innovatieve digitale oplossingen voor uw organisatie' : 
                            'Innovative digital solutions for your organization'}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Full content */}
              <div 
                className="case-study-content text-lg leading-relaxed"
                dangerouslySetInnerHTML={{ __html: caseStudy.content }} 
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Contact CTA */}
      <div className="bg-secondary py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-header font-bold mb-4">
            {language === 'nl' ? 'Klaar om jouw project te bespreken?' : 'Ready to discuss your project?'}
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto mb-8">
            {language === 'nl' 
              ? 'Wij helpen je graag bij het realiseren van jouw digitale ambities. Neem contact met ons op voor een vrijblijvend gesprek.' 
              : "We're here to help you achieve your digital ambitions. Contact us for a no-obligation conversation."}
          </p>
          <a 
            href="/#contact" 
            className="inline-flex items-center px-6 py-3 bg-accent text-primary rounded-lg hover:bg-accent/90 transition"
          >
            {language === 'nl' ? 'Neem Contact Op' : 'Contact Us'}
            <i className="ri-arrow-right-line ml-2"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyPage;