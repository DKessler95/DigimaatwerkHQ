import { useState, useEffect } from 'react';
import { Link } from 'wouter';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const toggleMobileMenu = () => {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
      mobileMenu.classList.remove('translate-x-full');
    }
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-primary/90 backdrop-blur-md shadow-md' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                <span className="text-primary font-bold text-xl">D</span>
              </div>
              <span className="text-xl font-header font-semibold text-foreground">Digimaatwerk</span>
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <a href="#services" className="text-foreground/80 hover:text-accent transition font-body">Services</a>
            <a href="#case-studies" className="text-foreground/80 hover:text-accent transition font-body">Case Studies</a>
            <a href="#tech-stack" className="text-foreground/80 hover:text-accent transition font-body">Technology</a>
            <a href="#about" className="text-foreground/80 hover:text-accent transition font-body">About</a>
          </nav>
          
          <div className="flex items-center space-x-4">
            <a href="#contact" className="hidden md:block px-5 py-2 rounded-lg bg-accent text-primary font-header font-medium transition hover:bg-accent/90">
              Contact Us
            </a>
            <button
              className="md:hidden text-foreground"
              id="mobile-menu-button"
              onClick={toggleMobileMenu}
            >
              <i className="ri-menu-line text-2xl"></i>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
