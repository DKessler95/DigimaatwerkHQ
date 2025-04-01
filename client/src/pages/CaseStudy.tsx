import { useParams } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '@/lib/languageContext';
import { useRef, useEffect } from 'react';

// Enhanced helper function to format the HTML content for case studies
function formatCaseStudyContent(content: string): string {
  // Add section dividers to create better readable content
  let formatted = content;
  
  // Replace Markdown heading syntax with proper HTML headings and add section classes
  formatted = formatted.replace(/\n# (.*?)\n/g, '<div class="content-section"><h1 class="section-heading">$1</h1>');
  formatted = formatted.replace(/\n## (.*?)\n/g, '<h2 class="subsection-heading">$1</h2>');
  formatted = formatted.replace(/\n### (.*?)\n/g, '<h3 class="mini-heading">$1</h3>');
  
  // Close previous section before starting a new one
  formatted = formatted.replace(/<div class="content-section"><h1/g, '</div><div class="content-section"><h1');
  
  // Fix bullet points that might be simple dashes
  formatted = formatted.replace(/\n- (.*?)(?=\n)/g, '<ul class="fancy-list"><li>$1</li></ul>');
  formatted = formatted.replace(/<\/ul>\n<ul class="fancy-list">/g, '');
  
  // Fix numbered lists
  formatted = formatted.replace(/\n\d+\. (.*?)(?=\n)/g, '<ol class="numbered-list"><li>$1</li></ol>');
  formatted = formatted.replace(/<\/ol>\n<ol class="numbered-list">/g, '');
  
  // Enhance blockquotes
  formatted = formatted.replace(/\n> (.*?)(?=\n)/g, '<blockquote class="highlight-quote">$1</blockquote>');
  
  // Enhance strong text with accent color
  formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong class="accent-text">$1</strong>');
  
  // Add paragraph styling
  formatted = formatted.replace(/\n([^<\n].*?)(?=\n)/g, '<p class="content-paragraph">$1</p>');
  
  // Add final section closing tag if needed
  if (formatted.includes('<div class="content-section">') && !formatted.endsWith('</div>')) {
    formatted += '</div>';
  }
  
  // Fix any duplicate paragraph tags or improper nesting
  formatted = formatted.replace(/<p class="content-paragraph"><p class="content-paragraph">/g, '<p class="content-paragraph">');
  formatted = formatted.replace(/<\/p><\/p>/g, '</p>');
  
  // Remove the first </div> tag if it exists at the beginning
  if (formatted.startsWith('</div>')) {
    formatted = formatted.substring(5);
  }
  
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
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary to-secondary opacity-30"></div>
      
      {/* Hero section */}
      <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <img 
          src={caseStudy.featured_image} 
          alt={caseStudy.title}
          className="absolute w-full h-full object-cover"
        />
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-end pb-12">
          <div className="inline-block px-3 py-1 text-accent text-sm font-semibold mb-4 bg-accent/10 rounded">
            {caseStudy.category}
          </div>
          <h1 className="text-3xl md:text-5xl font-header font-bold mb-4 text-white">
            {caseStudy.title}
          </h1>
          <p className="text-white/80 max-w-3xl mb-6">
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

      <div className="container mx-auto px-4 py-10">
        {/* Navigation and live website links */}
        <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
          <a 
            href="/#case-studies"
            className="inline-flex items-center px-4 py-2 border border-accent/30 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {language === 'nl' ? 'Alle Case Studies' : 'All Case Studies'}
          </a>
          
          {caseStudy.live_url && (
            <a 
              href={caseStudy.live_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-accent text-primary rounded-lg hover:bg-accent/90 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              {language === 'nl' ? 'Bekijk Live Website' : 'View Live Website'}
            </a>
          )}
        </div>
        
        {/* Key metrics/results in a horizontal row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {caseStudy.metrics.map((metric, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-gradient-to-r from-secondary/40 to-secondary/20 rounded-lg p-4 shadow-md border border-accent/10"
            >
              <div className="flex items-start gap-3">
                {/* Icon based on metric type */}
                <div className="bg-accent/20 p-2 rounded-full flex-shrink-0">
                  {metric.label.toLowerCase().includes('tijd') || metric.label.toLowerCase().includes('time') ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ) : metric.label.toLowerCase().includes('besparing') || metric.label.toLowerCase().includes('saving') || metric.label.toLowerCase().includes('kosten') || metric.label.toLowerCase().includes('cost') ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ) : metric.label.toLowerCase().includes('efficiënt') || metric.label.toLowerCase().includes('efficient') ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  )}
                </div>
                <div>
                  <div className="text-xl font-header font-bold text-accent">
                    {metric.value}
                  </div>
                  <div className="text-sm text-foreground/70">
                    {metric.label}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Content with scroll animations */}
        <div className="max-w-3xl mx-auto mb-10">
          {/* Introduction section combining challenge + solution + result */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-12"
          >
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl md:text-3xl font-header font-bold text-accent mb-6">
                {language === 'nl' ? 'Projectoverzicht' : 'Project Overview'}
              </h2>
              
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-shrink-0 bg-accent/20 p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <h3 className="text-xl font-header font-semibold text-accent/90 m-0">
                  {language === 'nl' ? 'De Uitdaging' : 'The Challenge'}
                </h3>
              </div>
              <div className="pl-10 mb-8 text-foreground/90 border-l-2 border-accent/10 py-2">
                <p className="leading-relaxed">{caseStudy.challenge}</p>
              </div>
              
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-shrink-0 bg-accent/20 p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-header font-semibold text-accent/90 m-0">
                  {language === 'nl' ? 'Onze Oplossing' : 'Our Solution'}
                </h3>
              </div>
              <div className="pl-10 mb-8 text-foreground/90 border-l-2 border-accent/10 py-2">
                <p className="leading-relaxed">{caseStudy.solution}</p>
              </div>
              
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-shrink-0 bg-accent/20 p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h3 className="text-xl font-header font-semibold text-accent/90 m-0">
                  {language === 'nl' ? 'Het Resultaat' : 'The Result'}
                </h3>
              </div>
              <div className="pl-10 mb-8 text-foreground/90 border-l-2 border-accent/10 py-2">
                <p className="leading-relaxed">{caseStudy.result}</p>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Case study detailed content with scroll animations */}
        <div className="max-w-3xl mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-10"
          >
            <div className="bg-gradient-to-r from-secondary/30 to-secondary/10 rounded-xl overflow-hidden shadow-lg border border-accent/10 p-6">
              <div className="case-study-content prose prose-lg max-w-none 
                prose-headings:text-accent prose-headings:font-header prose-headings:font-bold 
                prose-p:text-foreground/90 prose-strong:text-accent prose-strong:font-medium 
                prose-a:text-accent prose-a:no-underline hover:prose-a:underline 
                prose-code:text-accent prose-code:bg-accent/10 prose-code:px-1 prose-code:py-0.5 prose-code:rounded 
                prose-code:before:content-none prose-code:after:content-none 
                prose-blockquote:border-l-accent prose-blockquote:bg-secondary/20 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:not-italic 
                prose-ul:pl-5 prose-ol:pl-5 prose-li:marker:text-accent prose-li:my-1
                [&_.content-section]:mb-8 [&_.section-heading]:text-2xl [&_.section-heading]:mb-4 
                [&_.subsection-heading]:text-xl [&_.subsection-heading]:mb-3 [&_.mini-heading]:text-lg [&_.mini-heading]:mb-2 
                [&_.content-paragraph]:mb-4 [&_.content-paragraph:last-child]:mb-0 
                [&_.fancy-list]:ml-4 [&_.fancy-list>li]:ml-2 [&_.fancy-list>li]:mb-2 
                [&_.numbered-list]:ml-4 [&_.numbered-list>li]:ml-2 [&_.numbered-list>li]:mb-2 
                [&_.highlight-quote]:border-l-4 [&_.highlight-quote]:italic [&_.highlight-quote]:text-foreground/80 
                [&_.accent-text]:text-accent [&_.accent-text]:font-semibold"
                dangerouslySetInnerHTML={{ __html: caseStudy.content }} 
              />
            </div>
          </motion.div>
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
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyPage;