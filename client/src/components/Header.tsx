import { useState, useEffect, useRef } from 'react';
import { Link } from 'wouter';
import { useLanguage } from '@/lib/languageContext';
import LanguageSwitcher from './LanguageSwitcher';
import { Menu, ChevronDown } from 'lucide-react';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const { t } = useLanguage();
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
      mobileMenu.classList.remove('translate-x-full');
    }
  };
  
  const toggleServicesDropdown = () => {
    setServicesDropdownOpen(!servicesDropdownOpen);
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-primary/90 backdrop-blur-md shadow-md' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <img src="/images/digimaatwerk.svg" alt="Digimaatwerk Logo" style={{height: '70px', width: '280px', maxWidth: 'none'}} />
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
                </div>
              )}
            </div>
            <Link href="/portfolio" className="text-foreground/80 hover:text-accent transition font-body">{t('header.cases')}</Link>
            <Link href="/#tech-stack" className="text-foreground/80 hover:text-accent transition font-body">{t('header.about')}</Link>
            <Link href="/blogs" className="text-foreground/80 hover:text-accent transition font-body">{t('header.blogs')}</Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            <Link href="/#contact" className="hidden md:block px-5 py-2 rounded-lg bg-accent text-primary font-header font-medium transition hover:bg-accent/90">
              {t('header.contact')}
            </Link>
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
