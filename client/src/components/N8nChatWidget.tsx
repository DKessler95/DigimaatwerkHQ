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
      /* Hide all existing logos and images in the header */
      .n8n-chat .chat-header img:not(.maatje-logo),
      .n8n-chat .header img:not(.maatje-logo),
      .n8n-chat .branding img:not(.maatje-logo),
      .n8n-chat .logo img:not(.maatje-logo),
      .n8n-chat [class*="logo"] img:not(.maatje-logo),
      .n8n-chat [class*="brand"] img:not(.maatje-logo),
      .n8n-chat [class*="header"] img:not(.maatje-logo),
      .n8n-chat [class*="title"] img:not(.maatje-logo) {
        display: none !important;
      }
      
      /* Style the Maatje logo */
      .n8n-chat .maatje-logo {
        width: 40px !important;
        height: 40px !important;
        border-radius: 50% !important;
        object-fit: cover !important;
        margin-right: 8px !important;
      }
    `;
    document.head.appendChild(style);

    // Function to add Maatje logo to header
    const addMaatjeLogo = () => {
      const chatWidget = document.querySelector('#n8n-chat');
      if (chatWidget) {
        // Look for header element and add logo if not already present
        const header = chatWidget.querySelector('[class*="header"], .chat-header, .header');
        if (header && !header.querySelector('.maatje-logo')) {
          // Create logo image element
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
          `;
          
          // Insert at the beginning of header
          header.insertBefore(logo, header.firstChild);
        }
      }
    };

    // Add observer to add logo when chat widget loads
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          addMaatjeLogo();
        }
      });
    });

    // Check once after a delay to ensure widget is loaded
    setTimeout(() => {
      addMaatjeLogo();
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