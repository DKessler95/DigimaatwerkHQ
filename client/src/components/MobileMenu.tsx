import { useEffect } from 'react';

const MobileMenu = () => {
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
        >
          <i className="ri-close-line text-2xl"></i>
        </button>
      </div>
      <nav className="flex flex-col items-center space-y-6 mt-16">
        <a 
          href="#services" 
          className="text-xl text-foreground/80 hover:text-accent transition font-body"
          onClick={handleNavClick}
        >
          Services
        </a>
        <a 
          href="#case-studies" 
          className="text-xl text-foreground/80 hover:text-accent transition font-body"
          onClick={handleNavClick}
        >
          Case Studies
        </a>
        <a 
          href="#tech-stack" 
          className="text-xl text-foreground/80 hover:text-accent transition font-body"
          onClick={handleNavClick}
        >
          Technology
        </a>
        <a 
          href="#about" 
          className="text-xl text-foreground/80 hover:text-accent transition font-body"
          onClick={handleNavClick}
        >
          About
        </a>
        <a 
          href="#contact" 
          className="mt-4 px-6 py-3 rounded-lg bg-accent text-primary font-header font-medium transition hover:bg-accent/90"
          onClick={handleNavClick}
        >
          Contact Us
        </a>
      </nav>
    </div>
  );
};

export default MobileMenu;
