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

    // Add CSS to replace all images with Maatje logo
    const style = document.createElement('style');
    style.textContent = `
      /* Replace ALL images in chat widget with Maatje logo */
      .n8n-chat img:not(.maatje-logo) {
        content: url('${mascotImage}') !important;
        width: 40px !important;
        height: 40px !important;
        border-radius: 50% !important;
        object-fit: cover !important;
      }
      
      /* Replace toggle button with Maatje */
      .n8n-chat button[class*="toggle"],
      .n8n-chat [class*="toggle"] {
        background-image: url('${mascotImage}') !important;
        background-size: cover !important;
        background-position: center !important;
        background-repeat: no-repeat !important;
        border-radius: 50% !important;
        width: 60px !important;
        height: 60px !important;
      }
      
      /* Remove hover effects for toggle button */
      .n8n-chat button[class*="toggle"]:hover,
      .n8n-chat [class*="toggle"]:hover {
        transform: none !important;
        box-shadow: none !important;
        background-image: url('${mascotImage}') !important;
        background-size: cover !important;
        background-position: center !important;
      }
      
      /* Hide original toggle button content */
      .n8n-chat button[class*="toggle"] svg,
      .n8n-chat [class*="toggle"] svg,
      .n8n-chat button[class*="toggle"] img,
      .n8n-chat [class*="toggle"] img {
        display: none !important;
      }
      
      /* Style the custom Maatje logo */
      .n8n-chat .maatje-logo {
        width: 40px !important;
        height: 40px !important;
        border-radius: 50% !important;
        object-fit: cover !important;
        margin-right: 8px !important;
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
        z-index: 1000 !important;
      }
    `;
    document.head.appendChild(style);

    // Function to replace all images with Maatje and style toggle button
    const manageChatLogos = () => {
      const chatWidget = document.querySelector('#n8n-chat');
      if (chatWidget) {
        // Replace all images with Maatje logo
        const allImages = chatWidget.querySelectorAll('img:not(.maatje-logo)');
        allImages.forEach(img => {
          (img as HTMLImageElement).src = mascotImage;
          (img as HTMLImageElement).alt = 'Maatje';
          (img as HTMLImageElement).style.borderRadius = '50%';
          (img as HTMLImageElement).style.objectFit = 'cover';
          (img as HTMLImageElement).style.width = '40px';
          (img as HTMLImageElement).style.height = '40px';
        });
        
        // Style toggle button with Maatje background (no hover effects)
        const toggleButtons = chatWidget.querySelectorAll('button[class*="toggle"], [class*="toggle"]');
        toggleButtons.forEach(btn => {
          const button = btn as HTMLElement;
          button.style.backgroundImage = `url('${mascotImage}')`;
          button.style.backgroundSize = 'cover';
          button.style.backgroundPosition = 'center';
          button.style.borderRadius = '50%';
          button.style.width = '60px';
          button.style.height = '60px';
        });
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