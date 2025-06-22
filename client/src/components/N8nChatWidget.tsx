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

    // Add custom CSS to override the bot avatar with mascot image
    const style = document.createElement('style');
    style.textContent = `
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
    `;
    document.head.appendChild(style);

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
    };
  }, []);

  return null; // The chat widget is handled by n8n's createChat function
}