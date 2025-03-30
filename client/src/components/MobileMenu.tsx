import { useEffect } from 'react';
import { Link } from 'wouter';
import { useLanguage } from '@/lib/languageContext';
import { X } from 'lucide-react';

const MobileMenu = () => {
  const { t, language, setLanguage } = useLanguage();
  
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
        <Link 
          href="/services" 
          className="text-xl text-foreground/80 hover:text-accent transition font-body"
          onClick={closeMobileMenu}
        >
          {t('header.services')}
        </Link>
        <a 
          href="#case-studies" 
          className="text-xl text-foreground/80 hover:text-accent transition font-body"
          onClick={handleNavClick}
        >
          {t('header.cases')}
        </a>
        <a 
          href="#tech-stack" 
          className="text-xl text-foreground/80 hover:text-accent transition font-body"
          onClick={handleNavClick}
        >
          {t('header.about')}
        </a>
        <Link 
          href="/cms-test" 
          className="text-xl text-foreground/80 hover:text-accent transition font-body"
          onClick={closeMobileMenu}
        >
          CMS Test
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
        
        <a 
          href="#contact" 
          className="mt-4 px-6 py-3 rounded-lg bg-accent text-primary font-header font-medium transition hover:bg-accent/90"
          onClick={handleNavClick}
        >
          {t('header.contact')}
        </a>
      </nav>
    </div>
  );
};

export default MobileMenu;
