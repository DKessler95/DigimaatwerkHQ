import { useState, useEffect } from 'react';

// Simple chat storage for persistence across page navigation
let storedChatMessages: any[] = [];

export const useChatStore = () => {
  const [messages, setMessages] = useState(storedChatMessages);
  
  useEffect(() => {
    storedChatMessages = messages;
  }, [messages]);
  
  const addMessage = (message: { sender: 'bot' | 'user'; message: string }) => {
    setMessages((prev) => [...prev, message]);
  };
  
  const clearMessages = () => {
    setMessages([]);
    storedChatMessages = [];
  };
  
  return {
    messages,
    addMessage,
    clearMessages
  };
};

// Cookie consent preferences
export const useCookieConsent = () => {
  const [consent, setConsent] = useState<'accepted' | 'customized' | null>(null);
  
  useEffect(() => {
    const storedConsent = localStorage.getItem('cookie-consent') as 'accepted' | 'customized' | null;
    setConsent(storedConsent);
  }, []);
  
  const acceptAll = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setConsent('accepted');
  };
  
  const customize = () => {
    localStorage.setItem('cookie-consent', 'customized');
    setConsent('customized');
  };
  
  return {
    consent,
    acceptAll,
    customize
  };
};
