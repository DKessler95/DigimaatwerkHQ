import { useEffect } from 'react';

// Component to handle opening the chatbot when URL contains #chatbot
const ChatbotOpener = () => {
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#chatbot') {
        // Wait for the N8n chat widget to be loaded
        const interval = setInterval(() => {
          const chatWidget = document.querySelector('.n8n-chat-toggle, [class*="toggle"]') as HTMLElement;
          if (chatWidget) {
            chatWidget.click();
            clearInterval(interval);
            // Remove the hash from URL after opening
            window.history.replaceState(null, '', window.location.pathname);
          }
        }, 100);
        
        // Stop trying after 5 seconds
        setTimeout(() => clearInterval(interval), 5000);
      }
    };

    // Check on initial load
    handleHashChange();
    
    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return null; // This component doesn't render anything
};

export default ChatbotOpener;