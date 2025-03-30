import { useLanguage } from '@/lib/languageContext';
import { CMSServicesSection } from '@/components/CMSServicesSection';
import { motion } from 'framer-motion';

export default function Services() {
  const { language } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-20 md:py-32 bg-gradient-to-b from-slate-900 to-slate-800 text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6">
                {language === 'nl' ? 'Onze Diensten' : 'Our Services'}
              </h1>
              <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                {language === 'nl'
                  ? 'Ontdek hoe onze expertise uw digitale transformatie kan versnellen en resultaten kan opleveren.'
                  : 'Discover how our expertise can accelerate your digital transformation and deliver results.'}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services from CMS */}
      <CMSServicesSection />

      {/* Why Choose Us */}
      <section className="w-full py-20 bg-white dark:bg-slate-950">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6">
                {language === 'nl' ? 'Waarom Digimaatwerk kiezen?' : 'Why Choose Digimaatwerk?'}
              </h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="mr-4 rounded-full bg-primary/10 p-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary h-6 w-6"
                    >
                      <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z" />
                      <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">
                      {language === 'nl' ? 'Persoonlijke Aanpak' : 'Personal Approach'}
                    </h3>
                    <p className="text-muted-foreground">
                      {language === 'nl'
                        ? 'Wij luisteren naar uw specifieke behoeften en creëren oplossingen die perfect bij uw bedrijf passen.'
                        : 'We listen to your specific needs and create solutions that perfectly match your business.'}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mr-4 rounded-full bg-primary/10 p-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary h-6 w-6"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="m8 12 3 3 5-5" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">
                      {language === 'nl' ? 'Bewezen Resultaten' : 'Proven Results'}
                    </h3>
                    <p className="text-muted-foreground">
                      {language === 'nl'
                        ? 'Onze projecten leveren meetbare bedrijfsresultaten op, ondersteund door data en klanttestimonials.'
                        : 'Our projects deliver measurable business results, backed by data and client testimonials.'}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mr-4 rounded-full bg-primary/10 p-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary h-6 w-6"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">
                      {language === 'nl' ? 'Geavanceerde Technologie' : 'Advanced Technology'}
                    </h3>
                    <p className="text-muted-foreground">
                      {language === 'nl'
                        ? 'We blijven voorop lopen met de nieuwste technologieën en best practices in de industrie.'
                        : 'We stay ahead with the latest technologies and industry best practices.'}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 p-8"
            >
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold mb-4">
                    {language === 'nl' ? 'Onze Werkwijze' : 'Our Methodology'}
                  </h3>
                  <ol className="space-y-4">
                    <li className="flex items-center">
                      <span className="flex items-center justify-center rounded-full bg-primary text-white mr-4 h-8 w-8 shrink-0">1</span>
                      <span className="font-medium">
                        {language === 'nl' ? 'Ontdekking & Analyse' : 'Discovery & Analysis'}
                      </span>
                    </li>
                    <li className="flex items-center">
                      <span className="flex items-center justify-center rounded-full bg-primary text-white mr-4 h-8 w-8 shrink-0">2</span>
                      <span className="font-medium">
                        {language === 'nl' ? 'Strategisch Plan' : 'Strategic Planning'}
                      </span>
                    </li>
                    <li className="flex items-center">
                      <span className="flex items-center justify-center rounded-full bg-primary text-white mr-4 h-8 w-8 shrink-0">3</span>
                      <span className="font-medium">
                        {language === 'nl' ? 'Agile Ontwikkeling' : 'Agile Development'}
                      </span>
                    </li>
                    <li className="flex items-center">
                      <span className="flex items-center justify-center rounded-full bg-primary text-white mr-4 h-8 w-8 shrink-0">4</span>
                      <span className="font-medium">
                        {language === 'nl' ? 'Testing & QA' : 'Testing & QA'}
                      </span>
                    </li>
                    <li className="flex items-center">
                      <span className="flex items-center justify-center rounded-full bg-primary text-white mr-4 h-8 w-8 shrink-0">5</span>
                      <span className="font-medium">
                        {language === 'nl' ? 'Implementatie & Ondersteuning' : 'Implementation & Support'}
                      </span>
                    </li>
                  </ol>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-20 bg-slate-50 dark:bg-slate-900">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto"
            >
              <h2 className="text-3xl font-bold mb-4">
                {language === 'nl' ? 'Klaar om te beginnen?' : 'Ready to get started?'}
              </h2>
              <p className="text-muted-foreground mb-8">
                {language === 'nl'
                  ? 'Neem vandaag nog contact met ons op voor een vrijblijvend gesprek over uw project.'
                  : 'Contact us today for a no-obligation conversation about your project.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-white font-medium shadow transition-colors hover:bg-primary/90"
                >
                  {language === 'nl' ? 'Contact opnemen' : 'Contact us'}
                </a>
                <a
                  href="#case-studies"
                  className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  {language === 'nl' ? 'Bekijk onze case studies' : 'View our case studies'}
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}