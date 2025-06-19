import { useEffect } from 'react';
import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';

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
        'Hey! 👋',
        'Mijn naam is Maatje, waar kan ik je mee helpen?'
      ],
      i18n: {
        en: {
          title: 'Maatje - Digimaatwerk Assistant',
          subtitle: 'Ik help je graag met vragen over onze digitale diensten',
          footer: '',
          getStarted: 'Start gesprek',
          inputPlaceholder: 'Typ je vraag hier...',
          closeButtonTooltip: 'Sluiten',
        },
      },
    });

    // Cleanup function
    return () => {
      const existingContainer = document.getElementById('n8n-chat');
      if (existingContainer) {
        existingContainer.remove();
      }
    };
  }, []);

  return null; // The chat widget is handled by n8n's createChat function
}