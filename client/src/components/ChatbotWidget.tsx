import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/languageContext';

interface ChatMessage {
  sender: 'bot' | 'user';
  message: string;
  timestamp?: Date;
}

const ChatbotWidget = () => {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => Math.random().toString(36).substr(2, 9));
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Initial bot message when chat opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Add a slight delay for a more natural feel
      const timer = setTimeout(() => {
        const welcomeMessage = language === 'nl' 
          ? "👋 Hallo! Ik ben Maya, jouw AI-assistent van Digimaatwerk.\n\nIk kan je helpen met:\n• Vragen over onze diensten (AI, automatisering, webdevelopment)\n• Het inplannen van een gratis consultatie\n• Prijsinformatie en projectschattingen\n• Technische vragen over digitale transformatie\n\nWaarmee kan ik je vandaag helpen?"
          : "👋 Hello! I'm Maya, your AI assistant from Digimaatwerk.\n\nI can help you with:\n• Questions about our services (AI, automation, web development)\n• Scheduling a free consultation\n• Pricing information and project estimates\n• Technical questions about digital transformation\n\nHow can I help you today?";
        
        setMessages([
          {
            sender: 'bot',
            message: welcomeMessage,
            timestamp: new Date()
          }
        ]);
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen, messages.length, language]);
  
  // Auto-scroll to the bottom of the chat
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };
  
  const handleSendMessage = async () => {
    if (userInput.trim() === '' || isLoading) return;
    
    const userMessage = userInput.trim();
    setUserInput('');
    setIsLoading(true);
    
    // Add user message immediately
    const newUserMessage: ChatMessage = {
      sender: 'user',
      message: userMessage,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    
    try {
      // Send message to n8n webhook
      const response = await fetch('https://digimaatwerk.app.n8n.cloud/webhook/2261c842-887d-4a32-8ac7-ff81ae696e5f/chat', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          sessionId: sessionId,
          language: language,
          timestamp: new Date().toISOString(),
          source: 'website_widget',
          userAgent: navigator.userAgent,
          referrer: window.location.href
        })
      });
      
      if (!response.ok) {
        // Log the specific error for debugging
        console.error(`n8n webhook error: ${response.status} - ${response.statusText}`);
        
        if (response.status === 404) {
          throw new Error('Webhook not found - please check the n8n webhook URL');
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      }
      
      const data = await response.json();
      
      // Handle different response formats from n8n
      let botMessage = '';
      if (typeof data === 'string') {
        botMessage = data;
      } else if (data.response) {
        botMessage = data.response;
      } else if (data.message) {
        botMessage = data.message;
      } else if (data.text) {
        botMessage = data.text;
      } else if (data.output) {
        botMessage = data.output;
      } else {
        // Fallback message
        botMessage = language === 'nl' 
          ? "Bedankt voor je bericht! Ik ben Maya en help je graag verder. Wat kan ik voor je doen?"
          : "Thank you for your message! I'm Maya and I'm happy to help you. What can I do for you?";
      }
      
      // Add bot response
      const botResponse: ChatMessage = {
        sender: 'bot',
        message: botMessage,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      
    } catch (error) {
      console.error('Error sending message to chatbot:', error);
      
      // Log detailed error information for debugging
      console.error('Full error details:', {
        error: error,
        message: userMessage,
        sessionId: sessionId,
        timestamp: new Date().toISOString()
      });
      
      // Provide intelligent fallback response based on user input
      let fallbackMessage = '';
      const lowerMessage = userMessage.toLowerCase();
      
      if (lowerMessage.includes('prijs') || lowerMessage.includes('kosten') || lowerMessage.includes('price') || lowerMessage.includes('cost')) {
        fallbackMessage = language === 'nl' 
          ? "Voor prijsinformatie kunt u onze projectcalculator gebruiken op de website, of direct contact opnemen via info@digimaatwerk.nl. Onze projecten starten vanaf €10.000 afhankelijk van de complexiteit."
          : "For pricing information, you can use our project calculator on the website, or contact us directly at info@digimaatwerk.nl. Our projects start from €10,000 depending on complexity.";
      } else if (lowerMessage.includes('afspraak') || lowerMessage.includes('meeting') || lowerMessage.includes('appointment')) {
        fallbackMessage = language === 'nl' 
          ? "Voor het inplannen van een afspraak kunt u direct contact opnemen via info@digimaatwerk.nl of +31 (0)20 123 4567. We plannen graag een gratis consultatie in om uw project te bespreken."
          : "To schedule an appointment, please contact us directly at info@digimaatwerk.nl or +31 (0)20 123 4567. We'd be happy to schedule a free consultation to discuss your project.";
      } else if (lowerMessage.includes('ai') || lowerMessage.includes('chatbot') || lowerMessage.includes('automation')) {
        fallbackMessage = language === 'nl' 
          ? "Wij zijn gespecialiseerd in AI-oplossingen, chatbots en automatisering. Voor meer informatie over onze AI-diensten kunt u contact opnemen via info@digimaatwerk.nl of bekijk onze case studies op de website."
          : "We specialize in AI solutions, chatbots and automation. For more information about our AI services, please contact us at info@digimaatwerk.nl or check our case studies on the website.";
      } else {
        fallbackMessage = language === 'nl' 
          ? "Bedankt voor uw bericht! Voor persoonlijke begeleiding kunt u direct contact opnemen via info@digimaatwerk.nl of +31 (0)20 123 4567. Een van onze specialisten helpt u graag verder."
          : "Thank you for your message! For personal guidance, please contact us directly at info@digimaatwerk.nl or +31 (0)20 123 4567. One of our specialists will be happy to help you.";
      }
      
      const errorMessage: ChatMessage = {
        sender: 'bot',
        message: fallbackMessage,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSendMessage();
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Chat Button with pulse animation */}
      <motion.button 
        id="chatbot-toggle" 
        className="relative w-16 h-16 rounded-full bg-gradient-to-r from-accent to-teal-500 text-primary flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none"
        onClick={toggleChat}
        aria-label={isOpen ? "Close chat" : "Open chat"}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Pulse animation when closed */}
        {!isOpen && (
          <motion.div 
            className="absolute inset-0 rounded-full bg-accent"
            animate={{ scale: [1, 1.2, 1], opacity: [0.7, 0, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
        
        {/* Digimaatwerk logo or chat icon */}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          )}
        </motion.div>
        
        {/* Online status indicator */}
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse">
        </div>
      </motion.button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-20 right-0 w-80 sm:w-96 bg-white dark:bg-secondary rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700"
          >
            {/* Header with Digimaatwerk branding */}
            <div className="bg-gradient-to-r from-primary to-slate-800 p-4 flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center mr-3 shadow-lg">
                  <span className="text-primary font-bold text-lg">M</span>
                </div>
                <div>
                  <h3 className="font-header font-semibold text-white text-lg">Maya</h3>
                  <p className="text-accent text-sm opacity-90">
                    {language === 'nl' ? 'Digimaatwerk Assistent' : 'Digimaatwerk Assistant'}
                  </p>
                </div>
              </div>
              <button 
                className="text-white/80 hover:text-white transition-colors p-1"
                onClick={toggleChat}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Messages Area */}
            <div className="h-80 p-4 overflow-y-auto bg-gray-50 dark:bg-primary" id="chatbot-messages">
              {messages.map((msg, index) => (
                <motion.div 
                  key={index} 
                  className={`flex items-start gap-3 mb-4 ${msg.sender === 'user' ? 'justify-end' : ''}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  {msg.sender === 'bot' && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-accent to-teal-500 flex items-center justify-center text-primary font-bold text-sm shadow-sm">
                      M
                    </div>
                  )}
                  <div className={`group ${msg.sender === 'bot' 
                    ? 'bg-white dark:bg-secondary rounded-2xl rounded-tl-sm shadow-sm border border-gray-200 dark:border-gray-600' 
                    : 'bg-gradient-to-r from-accent to-teal-500 text-white rounded-2xl rounded-tr-sm shadow-sm'} p-3 max-w-[80%] relative`}>
                    <div className="text-sm leading-relaxed whitespace-pre-wrap">{msg.message}</div>
                    {msg.timestamp && (
                      <span className={`text-xs mt-1 block ${msg.sender === 'bot' ? 'text-gray-500' : 'text-white/70'}`}>
                        {formatTimestamp(msg.timestamp)}
                      </span>
                    )}
                  </div>
                  {msg.sender === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-gray-700 dark:text-gray-300 text-sm font-medium">
                      U
                    </div>
                  )}
                </motion.div>
              ))}
              
              {/* Loading indicator */}
              {isLoading && (
                <motion.div 
                  className="flex items-start gap-3 mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-accent to-teal-500 flex items-center justify-center text-primary font-bold text-sm">
                    M
                  </div>
                  <div className="bg-white dark:bg-secondary rounded-2xl rounded-tl-sm p-3 shadow-sm border border-gray-200 dark:border-gray-600">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
            
            {/* Input Area */}
            <div className="bg-white dark:bg-secondary p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-2">
                <input 
                  type="text" 
                  placeholder={language === 'nl' ? "Typ je bericht..." : "Type your message..."} 
                  className="flex-grow bg-gray-100 dark:bg-primary border border-gray-300 dark:border-gray-600 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 text-sm"
                  value={userInput}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  disabled={isLoading}
                />
                <motion.button 
                  className={`p-2 rounded-full transition-all duration-200 ${
                    userInput.trim() && !isLoading 
                      ? 'bg-gradient-to-r from-accent to-teal-500 text-white shadow-lg hover:shadow-xl' 
                      : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                  }`}
                  onClick={handleSendMessage}
                  disabled={!userInput.trim() || isLoading}
                  whileHover={{ scale: userInput.trim() && !isLoading ? 1.05 : 1 }}
                  whileTap={{ scale: userInput.trim() && !isLoading ? 0.95 : 1 }}
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  )}
                </motion.button>
              </div>
              
              {/* Powered by notice */}
              <div className="text-center mt-2">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {language === 'nl' ? 'Aangedreven door' : 'Powered by'} Digimaatwerk AI
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatbotWidget;
