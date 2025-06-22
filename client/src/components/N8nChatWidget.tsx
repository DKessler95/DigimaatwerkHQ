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
      /* Global override for ALL images in n8n chat */
      #n8n-chat img:not([alt*="user"]):not([class*="user"]) {
        content: url('${mascotImage}') !important;
        width: 32px !important;
        height: 32px !important;
        object-fit: cover !important;
        border-radius: 50% !important;
      }
      
      /* Override for chat toggle button */
      [class*="toggle"] img,
      [class*="chat-button"] img,
      button[class*="chat"] img {
        content: url('${mascotImage}') !important;
        width: 40px !important;
        height: 40px !important;
        border-radius: 50% !important;
      }
      
      /* Override any SVG icons in chat widget */
      #n8n-chat svg {
        display: none !important;
      }
      
      #n8n-chat svg::after {
        content: "";
        display: block;
        width: 24px;
        height: 24px;
        background-image: url('${mascotImage}');
        background-size: cover;
        background-position: center;
        border-radius: 50%;
      }
    `;
    document.head.appendChild(style);

    // Add observer to replace logo when chat widget loads
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          // More aggressive approach - replace ALL images in the chat widget
          const chatWidget = document.querySelector('#n8n-chat');
          if (chatWidget) {
            // Wait a bit for the widget to fully load
            setTimeout(() => {
              const images = chatWidget.querySelectorAll('img');
              console.log('Found images in chat widget:', images.length);
              
              images.forEach((img, index) => {
                console.log(`Image ${index}:`, img.src, img.alt, img.className);
                
                // Replace all images except user avatars
                if (!img.src.includes('user') && !img.alt.includes('user')) {
                  const originalSrc = img.src;
                  img.src = mascotImage;
                  img.alt = 'Maatje';
                  console.log(`Replaced image from ${originalSrc} to ${mascotImage}`);
                }
              });
              
              // Also try to find and replace any SVG icons
              const svgs = chatWidget.querySelectorAll('svg');
              svgs.forEach((svg) => {
                // Replace SVG with img element
                const img = document.createElement('img');
                img.src = mascotImage;
                img.alt = 'Maatje';
                img.style.width = '24px';
                img.style.height = '24px';
                img.style.borderRadius = '50%';
                svg.parentNode?.replaceChild(img, svg);
              });
              
              // Look for chat toggle button and replace its content
              const toggleSelectors = [
                '[class*="toggle"]',
                '[class*="chat-button"]', 
                'button[class*="chat"]',
                '.n8n-chat-toggle',
                '[class*="fab"]',
                '[class*="floating"]'
              ];
              
              toggleSelectors.forEach(selector => {
                const toggleButton = document.querySelector(selector);
                if (toggleButton) {
                  console.log('Found toggle button with selector:', selector, toggleButton);
                  // Clear existing content and add mascot
                  toggleButton.innerHTML = `<img src="${mascotImage}" alt="Maatje" style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover;">`;
                }
              });
              
              // Also try to replace any remaining logos by checking all elements
              const allElements = chatWidget.querySelectorAll('*');
              allElements.forEach(el => {
                const style = window.getComputedStyle(el);
                if (style.backgroundImage && style.backgroundImage.includes('digimaatwerk')) {
                  el.style.backgroundImage = `url('${mascotImage}')`;
                  el.style.backgroundSize = 'cover';
                  el.style.backgroundPosition = 'center';
                }
              });
            }, 500);
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