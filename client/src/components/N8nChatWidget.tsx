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

    // Add comprehensive CSS to override all avatar images
    const style = document.createElement('style');
    style.textContent = `
      /* Override all images in n8n chat with mascot */
      #n8n-chat img,
      #n8n-chat iframe,
      div[id*="n8n"] img,
      [class*="n8n"] img,
      .n8n-chat img {
        content: url('${mascotImage}') !important;
        width: 40px !important;
        height: 40px !important;
        border-radius: 50% !important;
        object-fit: cover !important;
      }
      
      /* Force replace using attribute selector */
      img[src*="digimaatwerk"],
      img[src*="logo"],
      img[alt*="bot"],
      img[alt*="Bot"],
      img[alt*="avatar"] {
        content: url('${mascotImage}') !important;
        width: 40px !important;
        height: 40px !important;
        border-radius: 50% !important;
      }
      
      /* Background image replacement for any avatar containers */
      #n8n-chat [class*="avatar"],
      #n8n-chat [class*="bot"],
      div[id*="n8n"] [class*="avatar"] {
        background-image: url('${mascotImage}') !important;
        background-size: 40px 40px !important;
        background-position: center !important;
        background-repeat: no-repeat !important;
      }
    `;
    document.head.appendChild(style);
    
    // Use MutationObserver to watch for chat widget elements and replace images
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) { // Element node
            const element = node as Element;
            // Find all images in the chat widget
            const images = element.querySelectorAll('img');
            images.forEach((img) => {
              if (img.src && !img.src.includes('mascot') && img.closest('#n8n-chat')) {
                img.src = mascotImage;
                img.style.width = '40px';
                img.style.height = '40px';
                img.style.borderRadius = '50%';
                img.style.objectFit = 'cover';
              }
            });
            
            // Also check if the added node itself is an image
            if (element.tagName === 'IMG' && element.closest('#n8n-chat')) {
              const imgElement = element as HTMLImageElement;
              if (!imgElement.src.includes('mascot')) {
                imgElement.src = mascotImage;
                imgElement.style.width = '40px';
                imgElement.style.height = '40px';
                imgElement.style.borderRadius = '50%';
                imgElement.style.objectFit = 'cover';
              }
            }
          }
        });
      });
    });
    
    // Start observing
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // More aggressive avatar replacement approach
    const aggressiveReplace = () => {
      // Target all possible image elements
      const allImages = document.querySelectorAll('img');
      allImages.forEach((img) => {
        // Check if this image is likely an avatar/logo based on src or context
        const src = img.src || '';
        const alt = img.alt || '';
        const isInChatWidget = img.closest('#n8n-chat') || img.closest('[id*="n8n"]') || img.closest('[class*="n8n"]');
        
        if (isInChatWidget || src.includes('digimaatwerk') || src.includes('logo') || 
            alt.includes('bot') || alt.includes('avatar') || alt.includes('digimaatwerk')) {
          
          // Store original dimensions if small (likely avatar)
          const rect = img.getBoundingClientRect();
          if (rect.width <= 50 && rect.height <= 50) {
            img.src = mascotImage;
            img.style.width = '40px';
            img.style.height = '40px';
            img.style.borderRadius = '50%';
            img.style.objectFit = 'cover';
          }
        }
      });

      // Also use CSS injection for any missed elements
      const existingMascotStyle = document.getElementById('mascot-override');
      if (!existingMascotStyle) {
        const mascotStyle = document.createElement('style');
        mascotStyle.id = 'mascot-override';
        mascotStyle.textContent = `
          /* Target small images in chat contexts */
          #n8n-chat img[width="40"],
          #n8n-chat img[height="40"],
          [id*="n8n"] img[width="40"],
          [id*="n8n"] img[height="40"],
          img[src*="digimaatwerk"][width="40"],
          img[src*="logo"][width="40"] {
            content: url('${mascotImage}') !important;
            border-radius: 50% !important;
          }
        `;
        document.head.appendChild(mascotStyle);
      }
    };

    // Run replacement multiple times with different delays
    setTimeout(aggressiveReplace, 1000);
    setTimeout(aggressiveReplace, 3000);
    setTimeout(aggressiveReplace, 5000);
    
    // Set up interval for ongoing replacement
    const replaceInterval = setInterval(aggressiveReplace, 2000);
    setTimeout(() => clearInterval(replaceInterval), 30000);

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