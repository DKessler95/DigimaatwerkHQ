import { useEffect } from 'react';
import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';
import mascotImage from '@assets/mascot_1750294453535.png';

export function N8nChatWidget() {
  useEffect(() => {
    // Add target element for n8n chat
    const chatContainer = document.createElement('div');
    chatContainer.id = 'n8n-chat';
    document.body.appendChild(chatContainer);

    // Initialize n8n chat widget
    createChat({
      webhookUrl: 'https://digimaatwerk.app.n8n.cloud/webhook/2261c842-887d-4a32-8ac7-ff81ae696e5f/chat',
      target: '#n8n-chat',
      mode: 'window',
      showWelcomeScreen: false,
      defaultLanguage: 'en',
      initialMessages: [
        'Welkom bij Digimaatwerk! 👋',
        'Ik ben Maatje, uw digitale assistent. Hoe kan ik u vandaag helpen met uw digitale transformatie?'
      ],
      i18n: {
        en: {
          title: 'Maatje',
          subtitle: 'Uw partner in digitale transformatie',
          footer: 'Powered by Maatje',
          getStarted: 'Start gesprek',
          inputPlaceholder: 'Stel uw vraag over onze diensten...',
          closeButtonTooltip: 'Chat sluiten',
        },
        nl: {
          title: 'Maatje',
          subtitle: 'Uw partner in digitale transformatie',
          footer: 'Powered by Maatje',
          getStarted: 'Start gesprek',
          inputPlaceholder: 'Stel uw vraag over onze diensten...',
          closeButtonTooltip: 'Chat sluiten',
        },
      },
    });

    // Add custom CSS to hide existing logos and style the custom Maatje logo
    const style = document.createElement('style');
    style.textContent = `
      /* Hide ALL images in the chat widget except Maatje logo */
      .n8n-chat img:not(.maatje-logo) {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
      }
      
      /* Style the Maatje logo */
      .n8n-chat .maatje-logo {
        width: 40px !important;
        height: 40px !important;
        border-radius: 50% !important;
        object-fit: cover !important;
        margin-right: 8px !important;
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
      }
    `;
    document.head.appendChild(style);

    // Function to manage chat widget logos
    const manageChatLogos = () => {
      const chatWidget = document.querySelector('#n8n-chat');
      if (chatWidget) {
        // Remove all existing images by hiding them
        const allImages = chatWidget.querySelectorAll('img');
        allImages.forEach(img => {
          if (!img.classList.contains('maatje-logo')) {
            (img as HTMLImageElement).style.display = 'none';
            (img as HTMLImageElement).style.visibility = 'hidden';
            (img as HTMLImageElement).style.opacity = '0';
          }
        });
        
        // Look for header element and add Maatje logo if not already present
        const header = chatWidget.querySelector('[class*="header"], .chat-header, .header');
        if (header && !header.querySelector('.maatje-logo')) {
          // Create Maatje logo element
          const logo = document.createElement('img');
          logo.src = mascotImage;
          logo.alt = 'Maatje';
          logo.className = 'maatje-logo';
          logo.style.cssText = `
            width: 40px !important;
            height: 40px !important;
            border-radius: 50% !important;
            object-fit: cover !important;
            margin-right: 8px !important;
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
          `;
          
          // Insert at the beginning of header
          header.insertBefore(logo, header.firstChild);
        }
      }
    };

    // Add observer to manage logos when chat widget loads
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          manageChatLogos();
        }
      });
    });

    // Check once after a delay to ensure widget is loaded
    setTimeout(() => {
      manageChatLogos();
    }, 2000);

    // Start observing
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Cleanup function
    return () => {
      const existingContainer = document.getElementById('n8n-chat');
      if (existingContainer) {
        existingContainer.remove();
      }
      // Remove the custom style element
      if (style && style.parentNode) {
        style.parentNode.removeChild(style);
      }
      // Disconnect the observer
      observer.disconnect();
    };
  }, []);

  return null; // The chat widget is handled by n8n's createChat function
}