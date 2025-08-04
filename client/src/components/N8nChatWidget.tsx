import { useEffect } from 'react';
import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';
import mascotImage from '@assets/mascot_1750294453535.png';

export function N8nChatWidget() {
  useEffect(() => {
    // New webhook URL provided by user
    const WEBHOOK_URL = 'https://dcwerk.app.n8n.cloud/webhook/2261c842-887d-4a32-8ac7-ff81ae696e5f/chat';
    
    if (!WEBHOOK_URL) {
      console.log('N8n Chat Widget disabled - awaiting new webhook URL from user');
      return;
    }

    // Add target element for n8n chat
    const chatContainer = document.createElement('div');
    chatContainer.id = 'n8n-chat';
    document.body.appendChild(chatContainer);

    // Initialize n8n chat widget
    try {
      createChat({
        webhookUrl: WEBHOOK_URL,
        target: '#n8n-chat',
        mode: 'window',
        showWelcomeScreen: false,
        defaultLanguage: 'nl',
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
          transition: all 0.3s ease !important;
          cursor: pointer !important;
        }
        
        /* Add hover effects for toggle button */
        .n8n-chat button[class*="toggle"]:hover,
        .n8n-chat [class*="toggle"]:hover {
          transform: scale(1.1) !important;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2) !important;
          background-image: url('${mascotImage}') !important;
          background-size: cover !important;
          background-position: center !important;
        }
        
        /* Style the custom Maatje logo */
        .n8n-chat .maatje-logo {
          width: 40px !important;
          height: 40px !important;
          border-radius: 50% !important;
          object-fit: cover !important;
          margin-right: 8px !important;
        }
      `;
      document.head.appendChild(style);

      // Function to replace images and style buttons
      const manageChatLogos = () => {
        const chatWidget = document.querySelector('#n8n-chat');
        if (chatWidget) {
          const allImages = chatWidget.querySelectorAll('img:not(.maatje-logo)');
          allImages.forEach(img => {
            (img as HTMLImageElement).src = mascotImage;
            (img as HTMLImageElement).alt = 'Maatje';
          });
          
          const toggleButtons = chatWidget.querySelectorAll('button[class*="toggle"], [class*="toggle"]');
          toggleButtons.forEach(btn => {
            const button = btn as HTMLElement;
            button.style.backgroundImage = `url('${mascotImage}')`;
            button.style.backgroundSize = 'cover';
            button.style.backgroundPosition = 'center';
            button.style.borderRadius = '50%';
            button.style.transition = 'all 0.3s ease';
            button.style.cursor = 'pointer';
            
            // Add hover effect listeners
            button.addEventListener('mouseenter', () => {
              button.style.transform = 'scale(1.1)';
              button.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
            });
            
            button.addEventListener('mouseleave', () => {
              button.style.transform = 'scale(1)';
              button.style.boxShadow = 'none';
            });
          });
        }
      };

      // Add observer to manage logos
      const observer = new MutationObserver(() => manageChatLogos());
      observer.observe(document.body, { childList: true, subtree: true });

      setTimeout(() => manageChatLogos(), 2000);

      // Cleanup function
      return () => {
        const existingContainer = document.getElementById('n8n-chat');
        if (existingContainer) {
          existingContainer.remove();
        }
        if (style && style.parentNode) {
          style.parentNode.removeChild(style);
        }
        observer.disconnect();
      };

    } catch (error) {
      console.error('Chat widget initialization failed:', error);
    }
  }, []);

  return null;
}