import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/languageContext';

interface Testimonial {
  quote: {
    nl: string;
    en: string;
  };
  name: string;
  title: {
    nl: string;
    en: string;
  };
  company: string;
}

const testimonials: Testimonial[] = [
  {
    quote: {
      en: "Digimaatwerk transformed our customer service with their AI chatbot. It handles 80% of inquiries automatically and has significantly improved our response times.",
      nl: "Digimaatwerk heeft onze klantenservice getransformeerd met hun AI chatbot. Het verwerkt automatisch 80% van de vragen en heeft onze responstijden aanzienlijk verbeterd."
    },
    name: "Joost van der Meer",
    title: {
      en: "CTO",
      nl: "CTO"
    },
    company: "RetailTech Netherlands"
  },
  {
    quote: {
      en: "Their workflow automation solution reduced our document processing time by 87%. The team was professional and delivered exactly what we needed, on time and within budget.",
      nl: "Hun workflowautomatiseringsoplossing heeft onze documentverwerkingstijd met 87% verminderd. Het team was professioneel en leverde precies wat we nodig hadden, op tijd en binnen budget."
    },
    name: "Sophia Bakker",
    title: {
      en: "Operations Director",
      nl: "Operationeel Directeur"
    },
    company: "FinAssist BV"
  }
];

const TestimonialsSection = () => {
  const { language, t } = useLanguage();
  return (
    <section className="py-24 bg-gradient-to-b from-primary to-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-header font-bold mb-4">
            {t('testimonials.title')}
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            {t('testimonials.subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index}
              className="bg-gradient-to-br from-secondary to-primary/80 rounded-2xl p-8 shadow-lg relative"
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="absolute top-6 left-8 text-6xl text-accent/20 z-0">"</div>
              <div className="relative z-10">
                <p className="text-foreground/90 mb-6 text-lg">
                  {language === 'nl' ? testimonial.quote.nl : testimonial.quote.en}
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-accent/20 mr-4"></div>
                  <div>
                    <div className="font-header font-medium">{testimonial.name}</div>
                    <div className="text-foreground/60 text-sm">
                      {language === 'nl' ? testimonial.title.nl : testimonial.title.en}, {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-16 bg-secondary/30 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="mb-6 md:mb-0 md:mr-8">
            <i className="ri-google-fill text-3xl text-foreground/80 mr-2"></i>
            <i className="ri-star-fill text-accent"></i>
            <i className="ri-star-fill text-accent"></i>
            <i className="ri-star-fill text-accent"></i>
            <i className="ri-star-fill text-accent"></i>
            <i className="ri-star-fill text-accent"></i>
            <div className="mt-2 text-foreground/70">
              <span className="font-medium">4.9/5</span> 
              {t('testimonials.reviews')}
            </div>
          </div>
          <a href="#" className="inline-flex items-center text-accent group">
            <span className="group-hover:underline">
              {t('testimonials.read')}
            </span>
            <i className="ri-external-link-line ml-2"></i>
          </a>
        </motion.div>
        
        {/* Scroll Indicator pointing to tech stack section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 flex justify-center"
        >
          <a href="#tech-stack" className="flex flex-col items-center justify-center text-foreground/70 hover:text-accent transition group">
            <span className="text-sm mb-2">
              {language === 'nl' 
                ? 'Onze technologie stack bekijken' 
                : 'Check out our technology stack'}
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

export default TestimonialsSection;
