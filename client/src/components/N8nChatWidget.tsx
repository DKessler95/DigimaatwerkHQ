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

    // Add custom CSS to override the bot avatar and logo with mascot image
    const style = document.createElement('style');
    style.textContent = `
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
        width: 32px !important;
        height: 32px !important;
        object-fit: cover !important;
      }
      
      /* Alternative approach for logo replacement */
      .n8n-chat img[src*="digimaatwerk"],
      .n8n-chat img[src*="logo"],
      .n8n-chat img[alt*="logo"],
      .n8n-chat img[alt*="Logo"] {
        content: url('${mascotImage}') !important;
        width: 32px !important;
        height: 32px !important;
        object-fit: cover !important;
      }
    `;
    document.head.appendChild(style);

    // Add observer to replace logo when chat widget loads
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          // Look for any images in the chat widget and replace if they appear to be logos
          const chatWidget = document.querySelector('#n8n-chat');
          if (chatWidget) {
            const images = chatWidget.querySelectorAll('img');
            images.forEach((img) => {
              // Check if image is likely a logo based on size or position in header
              const isInHeader = img.closest('[class*="header"]') || img.closest('[class*="title"]') || img.closest('[class*="brand"]');
              const isSmallImage = img.width <= 50 && img.height <= 50;
              
              if (isInHeader || isSmallImage) {
                img.src = mascotImage;
                img.alt = 'Maatje';
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