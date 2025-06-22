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

    // Add custom CSS to aggressively hide all images except Maatje
    const style = document.createElement('style');
    style.textContent = `
      /* Aggressively hide ALL images and SVGs in the chat widget */
      .n8n-chat img,
      .n8n-chat svg,
      .n8n-chat [style*="background-image"],
      .n8n-chat div[class*="logo"],
      .n8n-chat div[class*="brand"],
      .n8n-chat div[class*="icon"] {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        width: 0 !important;
        height: 0 !important;
        max-width: 0 !important;
        max-height: 0 !important;
      }
      
      /* Allow only Maatje logo to be visible */
      .n8n-chat .maatje-logo {
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
        width: 40px !important;
        height: 40px !important;
        max-width: 40px !important;
        max-height: 40px !important;
        border-radius: 50% !important;
        object-fit: cover !important;
        margin-right: 8px !important;
      }
    `;
    document.head.appendChild(style);

    // Function to aggressively clean and manage chat widget
    const manageChatLogos = () => {
      const chatWidget = document.querySelector('#n8n-chat');
      if (chatWidget) {
        // Aggressively hide all visual elements except Maatje
        const elementsToHide = [
          'img:not(.maatje-logo)',
          'svg:not(.maatje-logo)', 
          '[class*="logo"]:not(.maatje-logo)',
          '[class*="brand"]:not(.maatje-logo)',
          '[class*="icon"]:not(.maatje-logo)',
          '[style*="background-image"]:not(.maatje-logo)'
        ];
        
        elementsToHide.forEach(selector => {
          const elements = chatWidget.querySelectorAll(selector);
          elements.forEach(element => {
            (element as HTMLElement).style.cssText = `
              display: none !important;
              visibility: hidden !important;
              opacity: 0 !important;
              width: 0 !important;
              height: 0 !important;
              max-width: 0 !important;
              max-height: 0 !important;
              position: absolute !important;
              left: -9999px !important;
            `;
          });
        });
        
        // Add Maatje logo if not present
        const header = chatWidget.querySelector('[class*="header"], .chat-header, .header');
        if (header && !header.querySelector('.maatje-logo')) {
          // Clear any existing content in header first
          const existingImages = header.querySelectorAll('img, svg');
          existingImages.forEach(el => {
            (el as HTMLElement).style.display = 'none';
          });
          
          // Create Maatje logo
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
            position: relative !important;
            z-index: 9999 !important;
          `;
          
          // Clear header and add only Maatje logo
          header.innerHTML = '';
          header.appendChild(logo);
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

    // Multiple checks to ensure all logos are removed
    setTimeout(() => manageChatLogos(), 500);
    setTimeout(() => manageChatLogos(), 1000);
    setTimeout(() => manageChatLogos(), 2000);
    setTimeout(() => manageChatLogos(), 3000);
    
    // Continuous monitoring for the first 10 seconds
    let checkCount = 0;
    const continuousCheck = setInterval(() => {
      manageChatLogos();
      checkCount++;
      if (checkCount >= 20) { // Stop after 10 seconds (20 * 500ms)
        clearInterval(continuousCheck);
      }
    }, 500);

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
      // Clear the continuous check interval
      clearInterval(continuousCheck);
    };
  }, []);

  return null; // The chat widget is handled by n8n's createChat function
}