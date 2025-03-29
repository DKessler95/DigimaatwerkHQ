import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ChatMessage {
  sender: 'bot' | 'user';
  message: string;
}

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Initial bot message when chat opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          sender: 'bot',
          message: "Hi there! I'm the Digimaatwerk assistant. How can I help you with your digital transformation needs today?"
        }
      ]);
    }
  }, [isOpen, messages.length]);
  
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
  
  const handleSendMessage = () => {
    if (userInput.trim() === '') return;
    
    // Add user message
    setMessages([...messages, { sender: 'user', message: userInput }]);
    const userQuestion = userInput;
    setUserInput('');
    
    // Generate response based on user input with common questions
    setTimeout(() => {
      let botResponse = '';
      
      if (userQuestion.toLowerCase().includes('price') || userQuestion.toLowerCase().includes('cost')) {
        botResponse = "Our pricing depends on the specific requirements of your project. We offer custom solutions starting from €10,000. Would you like to use our project calculator or speak with a sales representative for a detailed quote?";
      } 
      else if (userQuestion.toLowerCase().includes('chatbot') || userQuestion.toLowerCase().includes('ai')) {
        botResponse = "Our AI chatbots are built with the latest GPT-4 technology and RAG (Retrieval Augmented Generation) capabilities. They can be integrated with your existing systems and trained on your specific knowledge base. Would you like to schedule a demo?";
      }
      else if (userQuestion.toLowerCase().includes('contact') || userQuestion.toLowerCase().includes('talk')) {
        botResponse = "I'd be happy to connect you with our team. Could you provide your name, email, and a brief description of your project? A team member will reach out to you within 24 hours.";
      }
      else {
        botResponse = "Thank you for your message! Would you like to discuss your project with our team? You can reach us directly at info@digimaatwerk.nl or +31 20 123 4567, or I can help arrange a consultation.";
      }
      
      setMessages(prev => [...prev, { sender: 'bot', message: botResponse }]);
    }, 1000);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button 
        id="chatbot-toggle" 
        className="w-16 h-16 rounded-full bg-accent text-primary flex items-center justify-center shadow-lg hover:bg-accent/90 transition focus:outline-none"
        onClick={toggleChat}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        <i className={`${isOpen ? 'ri-close-line' : 'ri-message-3-line'} text-2xl`}></i>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-20 right-0 w-80 sm:w-96 bg-secondary rounded-xl shadow-2xl overflow-hidden"
          >
            <div className="bg-primary p-4 flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-primary font-bold mr-3">D</div>
                <h3 className="font-header font-medium">Digimaatwerk Assistant</h3>
              </div>
              <button className="text-foreground/80 hover:text-foreground" onClick={toggleChat}>
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>
            
            <div className="h-80 p-4 overflow-y-auto bg-primary" id="chatbot-messages">
              {messages.map((msg, index) => (
                <div key={index} className={`flex items-start gap-2 mb-4 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                  {msg.sender === 'bot' && (
                    <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-primary font-bold">D</div>
                  )}
                  <div className={`${msg.sender === 'bot' 
                    ? 'bg-secondary rounded-lg rounded-tl-none' 
                    : 'bg-accent/20 rounded-lg rounded-tr-none'} p-3 max-w-[80%]`}>
                    <p>{msg.message}</p>
                  </div>
                  {msg.sender === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-foreground/10 flex items-center justify-center text-foreground">U</div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            
            <div className="bg-secondary p-3 border-t border-primary/30">
              <div className="flex">
                <input 
                  type="text" 
                  placeholder="Type your message..." 
                  className="flex-grow bg-primary border border-primary/30 rounded-l-lg px-3 py-2 focus:outline-none focus:border-accent text-foreground"
                  value={userInput}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                />
                <button 
                  className="bg-accent text-primary px-4 rounded-r-lg"
                  onClick={handleSendMessage}
                >
                  <i className="ri-send-plane-fill"></i>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatbotWidget;
