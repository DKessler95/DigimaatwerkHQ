import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/languageContext';

interface ChatMessage {
  sender: 'bot' | 'user';
  message: string;
  timestamp?: Date;
}

interface ChatWidgetConfig {
  webhook: {
    url: string;
  };
  branding: {
    name: string;
    color: string;
    logo?: string;
  };
  language: string;
}

declare global {
  interface Window {
    ChatWidgetConfig?: ChatWidgetConfig;
  }
}

const ChatbotWidget = () => {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => Math.random().toString(36).substr(2, 9));
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Get configuration from window object
  const config = window.ChatWidgetConfig || {
    webhook: {
      url: 'https://digimaatwerk.app.n8n.cloud/webhook/2261c842-887d-4a32-8ac7-ff81ae696e5f/chat'
    },
    branding: {
      name: 'Digimaatwerk Assistent',
      color: '#0ea5e9'
    },
    language: language
  };
  
  // Trigger welcome message from n8n when chat opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const timer = setTimeout(async () => {
        setIsLoading(true);
        try {
          const response = await fetch(config.webhook.url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              message: "hallo",
              sessionId: sessionId
            })
          });
          
          const data = await response.json();
          let welcomeMessage = '';
          
          if (data.response) {
            welcomeMessage = data.response;
          } else if (data.message && data.message !== "Error in workflow") {
            welcomeMessage = data.message;
          } else {
            welcomeMessage = "Hey! 👋\n\nMijn naam is Maatje, waar kan ik je mee helpen?";
          }
          
          setMessages([{
            sender: 'bot',
            message: welcomeMessage,
            timestamp: new Date()
          }]);
        } catch (error) {
          console.error('Error getting welcome message:', error);
          setMessages([{
            sender: 'bot',
            message: "Hey! 👋\n\nMijn naam is Maatje, waar kan ik je mee helpen?",
            timestamp: new Date()
          }]);
        } finally {
          setIsLoading(false);
        }
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen, messages.length, config.webhook.url, sessionId]);
  
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
      // Send message to configured n8n webhook
      const response = await fetch(config.webhook.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          sessionId: sessionId
        })
      });
      
      const data = await response.json();
      
      // Handle n8n workflow errors as valid responses
      if (!response.ok && response.status === 500) {
        console.error(`n8n webhook error: ${response.status} - ${response.statusText}`, data);
        // n8n returns 500 but may still have valid response data
        // Don't throw error, continue to process the response
      } else if (!response.ok) {
        console.error(`n8n webhook error: ${response.status} - ${response.statusText}`, data);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      // Handle different response formats from n8n
      let botMessage = '';
      if (typeof data === 'string') {
        botMessage = data;
      } else if (data.response) {
        botMessage = data.response;
      } else if (data.message && data.message !== "Error in workflow") {
        botMessage = data.message;
      } else if (data.text) {
        botMessage = data.text;
      } else if (data.output) {
        botMessage = data.output;
      } else if (data.reply) {
        botMessage = data.reply;
      } else if (data.answer) {
        botMessage = data.answer;
      } else {
        // Default fallback if no recognizable response format
        botMessage = "Sorry, ik kon je bericht niet verwerken. Probeer het opnieuw.";
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
      
      // Add a simple error message indicating temporary issue
      const errorMessage: ChatMessage = {
        sender: 'bot',
        message: language === 'nl' 
          ? "Sorry, ik ondervind momenteel technische problemen. Probeer het over een paar minuten opnieuw."
          : "Sorry, I'm experiencing technical issues right now. Please try again in a few minutes.",
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
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mr-3 shadow-lg p-1">
                  {config.branding.logo ? (
                    <img 
                      src={config.branding.logo} 
                      alt="Digimaatwerk Logo" 
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <span className="text-primary font-bold text-lg">D</span>
                  )}
                </div>
                <div>
                  <h3 className="font-header font-semibold text-white text-lg">{config.branding.name}</h3>
                  <p className="text-accent text-sm opacity-90">
                    {language === 'nl' ? 'Digitale Assistent' : 'Digital Assistant'}
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
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm p-1">
                      {config.branding.logo ? (
                        <img 
                          src={config.branding.logo} 
                          alt="Bot Avatar" 
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <span className="text-primary font-bold text-sm">D</span>
                      )}
                    </div>
                  )}
                  <div className={`group ${msg.sender === 'bot' 
                    ? 'bg-gray-100 dark:bg-secondary rounded-2xl rounded-tl-sm shadow-sm border border-gray-200 dark:border-gray-600' 
                    : 'bg-gradient-to-r from-accent to-teal-500 text-white rounded-2xl rounded-tr-sm shadow-sm'} p-3 max-w-[80%] relative`}>
                    <div className={`text-sm leading-relaxed whitespace-pre-wrap ${msg.sender === 'bot' ? 'text-gray-800 dark:text-gray-100' : 'text-white'}`}>{msg.message}</div>
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
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm p-1">
                    {config.branding.logo ? (
                      <img 
                        src={config.branding.logo} 
                        alt="Bot Avatar" 
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <span className="text-primary font-bold text-sm">D</span>
                    )}
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
