import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'wouter';
import { useLanguage } from '@/lib/languageContext';
import LanguageSwitcher from './LanguageSwitcher';
import { Menu, ChevronDown } from 'lucide-react';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const { t } = useLanguage();
  const [location, navigate] = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setServicesDropdownOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [scrolled]);

  const toggleMobileMenu = () => {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
      if (mobileMenu.classList.contains('translate-x-full')) {
        // Menu is closed, open it
        mobileMenu.classList.remove('translate-x-full');
      } else {
        // Menu is open, close it
        mobileMenu.classList.add('translate-x-full');
      }
    }
  };
  
  const toggleServicesDropdown = () => {
    setServicesDropdownOpen(!servicesDropdownOpen);
  };

  const scrollToSection = (sectionId: string) => {
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
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-primary/90 backdrop-blur-md shadow-md' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center overflow-hidden">
                <img src="/digimaatwerkLOGO.png" alt="Digimaatwerk Logo" className="w-full h-full object-cover" />
              </div>
              <span className="text-xl font-header font-semibold text-foreground">Digimaatwerk</span>
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={toggleServicesDropdown}
                className="text-foreground/80 hover:text-accent transition font-body flex items-center"
              >
                {t('header.services')} <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${servicesDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {servicesDropdownOpen && (
                <div className="absolute mt-2 w-60 rounded-lg shadow-lg py-1 bg-primary/95 backdrop-blur-md border border-accent/20 z-20">
                  <Link href="/services/ai-chatbots" className="block px-4 py-2 text-sm text-foreground/80 hover:bg-accent/10 hover:text-accent">
                    AI Chatbots
                  </Link>
                  <Link href="/services/workflow-automation" className="block px-4 py-2 text-sm text-foreground/80 hover:bg-accent/10 hover:text-accent">
                    Workflow Automatisering
                  </Link>
                  <Link href="/services/web-development" className="block px-4 py-2 text-sm text-foreground/80 hover:bg-accent/10 hover:text-accent">
                    Webontwikkeling
                  </Link>
                  <Link href="/services/microsoft-365" className="block px-4 py-2 text-sm text-foreground/80 hover:bg-accent/10 hover:text-accent">
                    Microsoft 365
                  </Link>
                </div>
              )}
            </div>
            <Link href="/portfolio" className="text-foreground/80 hover:text-accent transition font-body">{t('header.cases')}</Link>
            <button 
              onClick={handleAboutClick} 
              className="text-foreground/80 hover:text-accent transition font-body cursor-pointer"
            >
              {t('header.about')}
            </button>
            <Link href="/blogs" className="text-foreground/80 hover:text-accent transition font-body">{t('header.blogs')}</Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            <button 
              onClick={handleContactClick}
              className="hidden md:block px-5 py-2 rounded-lg bg-accent text-primary font-header font-medium transition hover:bg-accent/90"
            >
              {t('header.contact')}
            </button>
            <button
              className="md:hidden text-foreground"
              id="mobile-menu-button"
              onClick={toggleMobileMenu}
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
