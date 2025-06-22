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

    // Add custom CSS to override chat widget elements with mascot image
    const style = document.createElement('style');
    style.textContent = `
      /* Replace chat toggle button (cloud icon) with mascot */
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
      
      .n8n-chat button[class*="toggle"] svg,
      .n8n-chat [class*="toggle"] svg,
      .n8n-chat button[class*="toggle"] img,
      .n8n-chat [class*="toggle"] img {
        display: none !important;
      }
      
      /* Replace bot avatar in messages */
      .n8n-chat .chat-message-from-bot .chat-message-avatar,
      .n8n-chat .bot-avatar,
      .n8n-chat [class*="avatar"][class*="bot"],
      .n8n-chat img[alt*="bot"],
      .n8n-chat img[alt*="Bot"] {
        background-image: url('${mascotImage}') !important;
        background-size: cover !important;
        background-position: center !important;
        background-repeat: no-repeat !important;
      }
      
      .n8n-chat .chat-message-from-bot .chat-message-avatar img,
      .n8n-chat .bot-avatar img,
      .n8n-chat [class*="avatar"][class*="bot"] img {
        opacity: 0 !important;
      }
      
      /* Replace header logo/branding with mascot */
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
      
      /* Target any image in the chat header area */
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

    // Add observer to replace elements when chat widget loads
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          // Replace toggle button background
          const toggleButtons = document.querySelectorAll('.n8n-chat [class*="toggle"], .n8n-chat button[class*="chat"]');
          toggleButtons.forEach((btn) => {
            if (btn instanceof HTMLElement) {
              btn.style.backgroundImage = `url('${mascotImage}')`;
              btn.style.backgroundSize = 'cover';
              btn.style.backgroundPosition = 'center';
              btn.style.borderRadius = '50%';
            }
          });
          
          // Replace images in the chat widget
          const chatWidget = document.querySelector('#n8n-chat');
          if (chatWidget) {
            const images = chatWidget.querySelectorAll('img');
            images.forEach((img) => {
              // Check if image is in header or is a small logo-like image
              const isInHeader = img.closest('[class*="header"]') || img.closest('[class*="title"]') || img.closest('[class*="brand"]');
              const isSmallImage = img.naturalWidth <= 50 && img.naturalHeight <= 50;
              const isLogo = img.src.includes('logo') || img.alt.toLowerCase().includes('logo');
              
              if (isInHeader || isSmallImage || isLogo) {
                img.src = mascotImage;
                img.alt = 'Maatje';
                img.style.borderRadius = '50%';
                img.style.objectFit = 'cover';
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