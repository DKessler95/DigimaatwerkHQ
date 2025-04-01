import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/languageContext';

const AboutDamianSection = () => {
  const { language } = useLanguage();

  const title = language === 'nl' 
    ? 'Over Damian Kessler: De Kracht achter Digimaatwerk' 
    : 'About Damian Kessler: The Force Behind Digimaatwerk';

  const paragraph1 = language === 'nl'
    ? 'Wat mij drijft is de mogelijkheid om bedrijven te helpen groeien door middel van digitale transformatie. Ik vind het belangrijk om mijn kennis op niveau te houden en ben altijd op zoek naar nieuwe manieren om mijn klanten te ondersteunen.'
    : 'What drives me is the opportunity to help businesses grow through digital transformation. I find it important to keep my knowledge up to date and I am always looking for new ways to support my clients.';

  const paragraph2 = language === 'nl'
    ? 'Naast mijn werk ben ik een trotse eigenaar van Elfie. Zij brengt me elke dag vreugde en leert me de waarde van geduld, toewijding en onvoorwaardelijke liefde. Deze lessen neem ik mee in mijn werk, waar ik met dezelfde toewijding en zorg uw digitale oplossingen ontwerp en implementeer.'
    : 'Besides my work, I am a proud owner of Elfie. She brings me joy every day and teaches me the value of patience, dedication, and unconditional love. I take these lessons with me in my work, where I design and implement your digital solutions with the same dedication and care.';

  const paragraph3 = language === 'nl'
    ? 'Bij Digimaatwerk bied ik niet alleen technische expertise, maar ook een persoonlijke aanpak die gericht is op uw specifieke behoeften. Ik begeleid u van ontwerp tot lancering, zorg voor transparante prijzen en ben altijd bereid om over uw ideeën en wensen te praten. Mijn doel is om uw bedrijf te helpen groeien door middel van innovatieve, betaalbare en op maat gemaakte digitale oplossingen.'
    : 'At Digimaatwerk, I offer not only technical expertise but also a personal approach that focuses on your specific needs. I guide you from design to launch, ensure transparent pricing, and am always willing to discuss your ideas and wishes. My goal is to help your business grow through innovative, affordable, and tailored digital solutions.';

  const consultation = language === 'nl' ? 'Plan een gratis consult' : 'Schedule a free consultation';
  const quote = language === 'nl' ? 'Vraag een offerte aan' : 'Request a quote';
  const callToAction = language === 'nl' 
    ? 'Wilt u weten hoe ik uw bedrijf digitaal kan versterken?' 
    : 'Want to know how I can digitally strengthen your business?';

  return (
    <section className="py-24 bg-gradient-to-b from-primary to-secondary relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -left-20 w-80 h-80 bg-accent/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-header font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {title}
          </motion.h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left column with text content */}
          <motion.div 
            className="lg:col-span-7 space-y-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="text-lg leading-relaxed text-foreground/90">{paragraph1}</p>
            <p className="text-lg leading-relaxed text-foreground/90">{paragraph2}</p>
            <p className="text-lg leading-relaxed text-foreground/90">{paragraph3}</p>
            
            <div className="pt-6">
              <h3 className="text-xl font-header font-semibold mb-4 text-accent">{callToAction}</h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="#contact" 
                  className="inline-flex items-center justify-center px-6 py-3 bg-accent text-primary font-medium rounded-lg transition hover:bg-accent/90"
                >
                  {consultation}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </a>
                <a 
                  href="#contact" 
                  className="inline-flex items-center justify-center px-6 py-3 border border-accent/30 text-accent font-medium rounded-lg transition hover:bg-accent/10"
                >
                  {quote}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
          
          {/* Right column with photos */}
          <motion.div 
            className="lg:col-span-5 space-y-8"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {/* Damian's profile photo */}
            <div className="bg-secondary/40 rounded-2xl p-6 shadow-lg backdrop-blur-sm">
              <div className="flex flex-col items-center">
                <div className="w-40 h-40 rounded-full overflow-hidden mb-6 border-2 border-accent">
                  <img 
                    src="/images/profile.jpg" 
                    alt="Damian Kessler"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-header font-semibold mb-1">Damian Kessler</h3>
                <p className="text-foreground/70 mb-4">{language === 'nl' ? 'Oprichter & CEO' : 'Founder & CEO'}</p>
                
                <div className="flex space-x-4">
                  <a href="https://linkedin.com/in/damiankessler" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center hover:bg-accent/30 transition">
                    <i className="ri-linkedin-fill text-accent"></i>
                  </a>
                  <a href="https://twitter.com/DigiMaatwerk" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center hover:bg-accent/30 transition">
                    <i className="ri-twitter-fill text-accent"></i>
                  </a>
                </div>
              </div>
            </div>
            
            {/* Elfie's photo (placeholder) */}
            <div className="bg-secondary/40 rounded-2xl p-6 shadow-lg backdrop-blur-sm">
              <div className="flex flex-col items-center">
                <div className="w-40 h-40 rounded-full overflow-hidden mb-6 border-2 border-accent/70">
                  {/* Placeholder for dog photo */}
                  <div className="w-full h-full bg-accent/20 flex items-center justify-center">
                    <i className="ri-paw-print-fill text-4xl text-accent/50"></i>
                  </div>
                </div>
                <h3 className="text-xl font-header font-semibold mb-1">Elfie</h3>
                <p className="text-foreground/70">{language === 'nl' ? 'Australische Herder' : 'Australian Shepherd'}</p>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Google Reviews Badge */}
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
              <span className="font-medium">4.9/5</span> {language === 'nl' ? 'uit 28 beoordelingen' : 'from 28 reviews'}
            </div>
          </div>
          <a href="#" className="inline-flex items-center text-accent group">
            <span className="group-hover:underline">
              {language === 'nl' ? 'Lees alle beoordelingen' : 'Read all reviews'}
            </span>
            <i className="ri-external-link-line ml-2"></i>
          </a>
        </motion.div>
        

      </div>
    </section>
  );
};

export default AboutDamianSection;
