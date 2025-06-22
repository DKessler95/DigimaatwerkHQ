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

    // Add aggressive CSS to hide all n8n branding and logos
    const style = document.createElement('style');
    style.textContent = `
      /* Hide ALL images, SVGs, and background images in chat widget except Maatje */
      .n8n-chat img:not(.maatje-logo),
      .n8n-chat svg:not(.maatje-logo),
      .n8n-chat [style*="background-image"]:not(.maatje-logo),
      .n8n-chat .logo,
      .n8n-chat .brand,
      .n8n-chat .branding,
      .n8n-chat [class*="logo"]:not(.maatje-logo),
      .n8n-chat [class*="brand"]:not(.maatje-logo),
      .n8n-chat [data-testid*="logo"]:not(.maatje-logo),
      .n8n-chat [role="img"]:not(.maatje-logo) {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        width: 0 !important;
        height: 0 !important;
      }
      
      /* Override any background images in header */
      .n8n-chat [class*="header"] *:not(.maatje-logo),
      .n8n-chat .chat-header *:not(.maatje-logo),
      .n8n-chat .header *:not(.maatje-logo) {
        background-image: none !important;
      }
      
      /* Style the Maatje logo */
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

    // Function to aggressively remove n8n branding and add Maatje logo
    const manageChatLogos = () => {
      const chatWidget = document.querySelector('#n8n-chat');
      if (chatWidget) {
        // Remove all visual elements that could be logos
        const elementsToHide = chatWidget.querySelectorAll('img, svg, [style*="background-image"], .logo, .brand, .branding, [class*="logo"], [class*="brand"], [data-testid*="logo"], [role="img"]');
        elementsToHide.forEach(element => {
          if (!element.classList.contains('maatje-logo')) {
            const el = element as HTMLElement;
            el.style.display = 'none';
            el.style.visibility = 'hidden';
            el.style.opacity = '0';
            el.style.width = '0';
            el.style.height = '0';
            el.style.backgroundImage = 'none';
            // Also remove the element entirely from DOM
            if (el.tagName === 'IMG' || el.tagName === 'SVG') {
              el.remove();
            }
          }
        });
        
        // Remove any elements with background images in header
        const headerElements = chatWidget.querySelectorAll('[class*="header"] *, .chat-header *, .header *');
        headerElements.forEach(element => {
          if (!element.classList.contains('maatje-logo')) {
            (element as HTMLElement).style.backgroundImage = 'none';
          }
        });
        
        // Look for header and add Maatje logo if not present
        const header = chatWidget.querySelector('[class*="header"], .chat-header, .header');
        if (header && !header.querySelector('.maatje-logo')) {
          // Create Maatje logo element
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
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
            z-index: 1000 !important;
          `;
          
          // Clear header content first, then add Maatje logo
          const headerChildren = Array.from(header.children);
          headerChildren.forEach(child => {
            if (!child.classList.contains('maatje-logo')) {
              child.remove();
            }
          });
          
          // Insert Maatje logo at the beginning
          header.insertBefore(logo, header.firstChild);
          
          // Add title text after logo
          const titleText = document.createElement('span');
          titleText.textContent = 'Maatje';
          titleText.style.cssText = `
            font-weight: bold;
            color: white;
            margin-left: 8px;
          `;
          header.appendChild(titleText);
        }
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