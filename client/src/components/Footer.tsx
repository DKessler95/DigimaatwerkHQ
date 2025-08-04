import { useLanguage } from '@/lib/languageContext';

const Footer = () => {
  const { t, language } = useLanguage();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-primary py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <a href="#" className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center overflow-hidden">
                <img src="/digimaatwerkLOGO.png" alt="Digimaatwerk Logo" className="w-full h-full object-cover" />
              </div>
              <span className="text-xl font-header font-semibold text-foreground">Digimaatwerk</span>
            </a>
            <p className="text-foreground/70 mb-4">
              {language === 'nl' 
                ? 'Experts op het gebied van digitale transformatie, gespecialiseerd in AI-chatbots, werkstroomautomatisering en webontwikkeling.'
                : 'Digital transformation experts specializing in AI chatbots, workflow automation, and web development.'}
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-header font-medium mb-4">{t('footer.services')}</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-foreground/70 hover:text-accent">
                {language === 'nl' ? 'AI Chatbots' : 'AI Chatbots'}
              </a></li>
              <li><a href="#" className="text-foreground/70 hover:text-accent">
                {language === 'nl' ? 'Werkstroom Automatisering' : 'Workflow Automation'}
              </a></li>
              <li><a href="#" className="text-foreground/70 hover:text-accent">
                {language === 'nl' ? 'Webontwikkeling' : 'Web Development'}
              </a></li>
              <li><a href="#" className="text-foreground/70 hover:text-accent">
                {language === 'nl' ? 'UI/UX Ontwerp' : 'UI/UX Design'}
              </a></li>
              <li><a href="#" className="text-foreground/70 hover:text-accent">
                {language === 'nl' ? 'Technisch Advies' : 'Technical Consulting'}
              </a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-header font-medium mb-4">{t('footer.company')}</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-foreground/70 hover:text-accent">
                {language === 'nl' ? 'Over Ons' : 'About Us'}
              </a></li>
              <li><a href="#" className="text-foreground/70 hover:text-accent">
                {language === 'nl' ? 'Succesverhalen' : 'Case Studies'}
              </a></li>
              <li><a href="#" className="text-foreground/70 hover:text-accent">
                {language === 'nl' ? 'Getuigenissen' : 'Testimonials'}
              </a></li>
              <li><a href="#" className="text-foreground/70 hover:text-accent">
                {language === 'nl' ? 'Partners' : 'Partners'}
              </a></li>
              <li><a href="#" className="text-foreground/70 hover:text-accent">
                {language === 'nl' ? 'Carrières' : 'Careers'}
              </a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-header font-medium mb-4">{t('footer.legal')}</h4>
            <ul className="space-y-2">
              <li><a href="/privacy-policy" className="text-foreground/70 hover:text-accent">{t('footer.privacy')}</a></li>
              <li><a href="/google-privacy-policy" className="text-foreground/70 hover:text-accent">{t('footer.cookies')}</a></li>
              <li><a href="/terms-of-service" className="text-foreground/70 hover:text-accent">{t('footer.terms')}</a></li>
              <li><a href="/privacy-policy" className="text-foreground/70 hover:text-accent">
                {language === 'nl' ? 'AVG Compliance' : 'GDPR Compliance'}
              </a></li>
              <li><a href="#" className="text-foreground/70 hover:text-accent">
                {language === 'nl' ? 'Site Credits' : 'Site Credits'}
              </a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-secondary pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 text-foreground/60 text-sm">
            &copy; {currentYear} Digimaatwerk. {t('footer.copyright')}. 
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-xs text-foreground/60">
                {language === 'nl' ? 'Beveiliging Geverifieerd' : 'Security Verified'}
              </span>
            </div>
            <div className="w-px h-4 bg-secondary"></div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 1024 1024" fill="currentColor" className="text-foreground/70 h-4">
                <path d="M407.7 926.7c-75.6-13.3-144.6-45.4-207-96.5-8.4-6.9-26.9-25.3-33.7-33.7-40.6-49.2-70.7-103.6-88.5-159.9-15.1-47.8-23.7-108.8-22-155.3 2.6-70.2 18.9-133.7 50.5-197.3 28.8-57.8 73.4-114.5 122.9-156 10.8-9 11.5-9.5 13.4-7.6 1.1 1.1 1.7 3.1 1.7 5.5 0 5.2-2.5 10.7-5.8 12.6-24.5 14.4-63.2 48.9-88 78.5-21.8 26.1-45.3 63.1-59.3 93.7-14.1 30.7-27.2 72.4-33.5 106.4-4.1 22.4-5.4 35.6-6.5 68.1-1.1 33.3.6 62.5 5.4 91.3 20.2 121.7 89.5 225 196.9 293.8 45.4 29.1 102.4 51.9 153.1 61.4 18.3 3.4 46.7 7.7 52.8 8 4.2.2 4.8.5 5.2 2.8.4 2.2-.1 2.8-3.9 4.2-13.3 4.9-42.4 11.3-58.5 12.8-24.5 2.4-70.3 2-95.2-.8z"/>
                <path d="M539.9 924.8c-10.7-2-11.3-2.2-11.3-4.8s.4-2.6 5.5-3.1c9.9-1.1 31.9-5.3 42.7-8.1 79.9-21.4 141.2-59.9 196.3-123.8 6.8-7.9 14.8-17.7 17.7-21.9 3-4.1 5.8-7.6 6.2-7.6.5 0 .7 26.5.6 58.7l-.3 58.7-2.1 2.1c-3.5 3.5-31.6 20.6-43 26.1-45.7 22.2-103.1 34.9-156 34.9-18.7 0-45.3-2.7-56.3-5.7zM595.7 772.9c-75.1-7.8-147.4-51.3-193.2-116.5-26.8-38.2-45.1-86.9-50.2-134-4.7-43.7 7.7-110.9 28.3-152.9 34.7-70.9 100.7-129 176.9-155.7 34.1-11.9 63.7-16.8 103-16.8 74.3 0 138 23 194.2 70.1 32.5 27.1 61.5 66.9 77.1 105.7 59.4 148.2-7.3 315.6-152.9 383.4-50.4 23.5-119.9 32.3-183.2 23.1zM849.8 691.5c.1-82.9.3-150.9.5-151 .2-.2 2.3 1.9 4.8 4.5 5.8 6.1 23.8 22.3 32.5 29.1 94.6 76 152 191.8 155.1 313.5 1.8 72.6-10.4 136.7-38.3 201.2-8.8 20.3-15.9 33.4-29.5 54.6-18.1 28.3-29.6 43.2-52.4 68-21.4 23.2-57.7 54.3-59.9 51.2-.2-.2-.4-1.7-.4-3.3 0-1.5 1.6-5.1 3.5-7.9 28.3-41.1 48.5-86.7 61.4-138.4 7.9-31.6 11.5-55.3 13.9-90.6 3.6-54 .7-106-8.6-154-11.6-60.7-33.7-121.6-62.6-172-6.1-10.7-13.9-23.1-17.3-27.4-3.4-4.4-6.2-8.3-6.2-8.7 0-.5 1.2-.8 2.6-.8 2.6 0 2.6-3.5 2.9 31.5z"/>
              </svg>
              <span className="text-xs text-foreground/60 ml-1">
                {language === 'nl' ? 'W3C Gevalideerd' : 'W3C Validated'}
              </span>
            </div>
            <div className="w-px h-4 bg-secondary"></div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" className="h-3 w-5 mr-1">
                <path fill="#21468B" d="M0 0h640v480H0z"/>
                <path fill="#FFF" d="M0 0h640v320H0z"/>
                <path fill="#AE1C28" d="M0 0h640v160H0z"/>
              </svg>
              <span className="text-xs text-foreground/60">
                {language === 'nl' ? 'Gemaakt in Nederland' : 'Made in Netherlands'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
