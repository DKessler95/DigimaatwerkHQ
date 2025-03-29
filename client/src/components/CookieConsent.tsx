import { useState, useEffect } from 'react';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Check if user has previously made a choice about cookies
    const hasConsented = localStorage.getItem('cookie-consent');
    if (!hasConsented) {
      // Wait a bit before showing the cookie banner
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, []);
  
  const acceptAllCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
  };
  
  const customizeCookies = () => {
    // This would normally open a modal with detailed cookie settings
    // For simplicity, we'll just store that the user has customized settings
    localStorage.setItem('cookie-consent', 'customized');
    setIsVisible(false);
  };
  
  if (!isVisible) return null;

  return (
    <div 
      id="cookie-banner" 
      className="fixed bottom-0 left-0 w-full bg-secondary/95 backdrop-blur-md p-4 z-40 border-t border-secondary shadow-lg"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-foreground/80">
          <p>We use cookies to improve your experience. By using our website, you agree to our <a href="#" className="text-accent hover:underline">Privacy Policy</a> and <a href="#" className="text-accent hover:underline">Cookie Policy</a>.</p>
        </div>
        <div className="flex gap-3">
          <button 
            id="accept-cookies" 
            className="px-4 py-2 bg-accent text-primary font-medium rounded-lg text-sm"
            onClick={acceptAllCookies}
          >
            Accept All
          </button>
          <button 
            id="customize-cookies" 
            className="px-4 py-2 bg-transparent border border-foreground/30 text-foreground font-medium rounded-lg text-sm"
            onClick={customizeCookies}
          >
            Customize
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
