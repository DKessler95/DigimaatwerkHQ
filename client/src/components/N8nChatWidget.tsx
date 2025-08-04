import { useEffect } from 'react';

// Temporarily disable n8n chat widget due to CORS issues with webhook
export function N8nChatWidget() {
  useEffect(() => {
    console.log('N8n Chat Widget temporarily disabled due to CORS issues with webhook');
    
    // Return early - disable chat widget for now to prevent errors
    return () => {
      // Cleanup function
    };
  }, []);

  return null; // No chat widget rendered
}