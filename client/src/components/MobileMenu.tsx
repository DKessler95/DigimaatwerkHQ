import { useEffect, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useLanguage } from '@/lib/languageContext';
import { X, ChevronDown, ChevronRight } from 'lucide-react';

const MobileMenu = () => {
  const { t, language, setLanguage } = useLanguage();
  const [servicesSubMenuOpen, setServicesSubMenuOpen] = useState(false);
  const [location, navigate] = useLocation();
  
  const closeMobileMenu = () => {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
      mobileMenu.classList.add('translate-x-full');
    }
  };

  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeMobileMenu();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    closeMobileMenu();
  };
  
  const toggleServicesSubMenu = () => {
    setServicesSubMenuOpen(!servicesSubMenuOpen);
  };

  const scrollToSection = (sectionId: string) => {
    closeMobileMenu();
    // If we're not on the homepage, navigate there first
    if (location !== '/') {
      navigate('/');
      // Wait for navigation to complete, then scroll
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // We're already on homepage, just scroll
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleContactClick = () => {
    scrollToSection('contact');
  };

  const handleAboutClick = () => {
    scrollToSection('testimonials');
  };

  return (
    <div 
      id="mobile-menu" 
      className="fixed inset-0 bg-primary z-40 transform translate-x-full transition-transform duration-300 ease-in-out md:hidden"
    >
      <div className="flex justify-end p-4">
        <button
          id="close-menu-button"
          className="text-foreground"
          onClick={closeMobileMenu}
          aria-label="Close menu"
        >
          <X className="h-6 w-6" />
        </button>
      </div>
      <nav className="flex flex-col items-center space-y-6 mt-16">
        <div className="flex flex-col items-center">
          <button
            className="flex items-center text-xl text-foreground/80 hover:text-accent transition font-body"
            onClick={toggleServicesSubMenu}
          >
            {t('header.services')} 
            {servicesSubMenuOpen ? 
              <ChevronDown className="ml-1 h-5 w-5" /> : 
              <ChevronRight className="ml-1 h-5 w-5" />
            }
          </button>
          
          {servicesSubMenuOpen && (
            <div className="mt-3 space-y-4 flex flex-col items-center">
              <Link 
                href="/services/ai-chatbots" 
                className="text-lg text-foreground/80 hover:text-accent transition font-body"
                onClick={closeMobileMenu}
              >
                AI Chatbots
              </Link>
              <Link 
                href="/services/workflow-automation" 
                className="text-lg text-foreground/80 hover:text-accent transition font-body"
                onClick={closeMobileMenu}
              >
                Workflow Automatisering
              </Link>
              <Link 
                href="/services/web-development" 
                className="text-lg text-foreground/80 hover:text-accent transition font-body"
                onClick={closeMobileMenu}
              >
                Webontwikkeling
              </Link>
              <Link 
                href="/services/microsoft-365" 
                className="text-lg text-foreground/80 hover:text-accent transition font-body"
                onClick={closeMobileMenu}
              >
                Microsoft 365
              </Link>
            </div>
          )}
        </div>
        
        <Link 
          href="/portfolio" 
          className="text-xl text-foreground/80 hover:text-accent transition font-body"
          onClick={closeMobileMenu}
        >
          {t('header.cases')}
        </Link>
        <button 
          onClick={handleAboutClick}
          className="text-xl text-foreground/80 hover:text-accent transition font-body"
        >
          {t('header.about')}
        </button>
        <Link 
          href="/blogs" 
          className="text-xl text-foreground/80 hover:text-accent transition font-body"
          onClick={closeMobileMenu}
        >
          {t('header.blogs')}
        </Link>
        
        {/* Language switcher */}
        <div className="flex space-x-4 mt-4">
          <button
            onClick={() => setLanguage('nl')}
            className={`px-4 py-2 rounded ${language === 'nl' ? 'bg-accent text-primary' : 'bg-primary/20 text-foreground'}`}
          >
            🇳🇱 NL
          </button>
          <button
            onClick={() => setLanguage('en')}
            className={`px-4 py-2 rounded ${language === 'en' ? 'bg-accent text-primary' : 'bg-primary/20 text-foreground'}`}
          >
            🇬🇧 EN
          </button>
        </div>
        
        <button 
          onClick={handleContactClick}
          className="mt-4 px-6 py-3 rounded-lg bg-accent text-primary font-header font-medium transition hover:bg-accent/90"
        >
          {t('header.contact')}
        </button>
      </nav>
    </div>
  );
};

export default MobileMenu;
