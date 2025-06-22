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

    // Add custom CSS to override chat widget header logo only
    const style = document.createElement('style');
    style.textContent = `
      /* Replace header logo/branding with mascot - only in header area */
      .n8n-chat .chat-header img,
      .n8n-chat .header img,
      .n8n-chat .branding img,
      .n8n-chat .logo img,
      .n8n-chat [class*="logo"] img,
      .n8n-chat [class*="brand"] img,
      .n8n-chat [class*="header"] img {
        content: url('${mascotImage}') !important;
        width: 40px !important;
        height: 40px !important;
        object-fit: cover !important;
        border-radius: 50% !important;
      }
      
      /* Target any image in the chat header area specifically */
      .n8n-chat div[class*="header"] img,
      .n8n-chat div[class*="title"] img {
        content: url('${mascotImage}') !important;
        width: 40px !important;
        height: 40px !important;
        object-fit: cover !important;
        border-radius: 50% !important;
      }
    `;
    document.head.appendChild(style);

    // Add observer to replace header logo only when chat widget loads
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          // Replace images only in the chat header
          const chatWidget = document.querySelector('#n8n-chat');
          if (chatWidget) {
            const images = chatWidget.querySelectorAll('img');
            images.forEach((img) => {
              // Only replace images that are specifically in header areas
              const isInHeader = img.closest('[class*="header"]') || img.closest('[class*="title"]') || img.closest('[class*="brand"]');
              
              if (isInHeader) {
                img.src = mascotImage;
                img.alt = 'Maatje';
                img.style.borderRadius = '50%';
                img.style.objectFit = 'cover';
                img.style.width = '40px';
                img.style.height = '40px';
              }
            });
          }
        }
      });
    });

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