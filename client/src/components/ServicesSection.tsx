import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useLanguage } from '@/lib/languageContext';

interface Service {
  icon: string;
  titleKey: string;
  descriptionKey: string;
  techKey: string;
}

interface ChatMessage {
  sender: 'bot' | 'user';
  messageKey: string;
  message?: string;
}

const services: Service[] = [
  {
    icon: "ri-robot-line",
    titleKey: "services.ai.title",
    descriptionKey: "services.ai.description",
    techKey: "services.ai.tech"
  },
  {
    icon: "ri-settings-line",
    titleKey: "services.automation.title",
    descriptionKey: "services.automation.description",
    techKey: "services.automation.tech"
  },
  {
    icon: "ri-code-s-slash-line",
    titleKey: "services.web.title",
    descriptionKey: "services.web.description",
    techKey: "services.web.tech"
  }
];

const ServicesSection = () => {
  const { t, language } = useLanguage();
  
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      sender: 'bot',
      messageKey: "services.chatbot.greeting"
    },
    {
      sender: 'user',
      messageKey: "services.chatbot.user1"
    },
    {
      sender: 'bot',
      messageKey: "services.chatbot.bot1"
    }
  ]);
  
  const [userInput, setUserInput] = useState('');

  // Update messages when language changes
  useEffect(() => {
    // This effect will run when the language changes
  }, [language]);

  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const handleSendMessage = () => {
    if (userInput.trim() === '') return;
    
    // Add user message
    setChatMessages([...chatMessages, { sender: 'user', messageKey: '', message: userInput }]);
    setUserInput('');
    
    // Simulate bot response after a delay
    setTimeout(() => {
      setChatMessages(prev => [
        ...prev, 
        { 
          sender: 'bot', 
          messageKey: "services.chatbot.bot2"
        }
      ]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <section id="services" className="py-24 bg-gradient-to-b from-primary to-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-header font-bold mb-4">{t('services.title')}</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">{t('services.subtitle')}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div 
              key={index}
              className="relative bg-gradient-to-br from-secondary via-secondary/80 to-primary/80 p-8 rounded-2xl shadow-lg card-hover-effect overflow-hidden group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-500"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-xl bg-accent/20 flex items-center justify-center mb-6">
                  <i className={`${service.icon} text-2xl text-accent`}></i>
                </div>
                <h3 className="text-xl font-header font-semibold mb-3">{t(service.titleKey)}</h3>
                <p className="text-foreground/70 mb-4">{t(service.descriptionKey)}</p>
                <p className="text-accent font-mono text-sm">{t(service.techKey)}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Service Feature (AI Chatbot Demo) */}
        <div className="mt-24 bg-secondary/50 backdrop-blur-md rounded-2xl p-8 lg:p-12 overflow-hidden">
          <div className="asymmetric-grid">
            <div className="col-span-12 lg:col-span-5 flex flex-col justify-center">
              <h3 className="text-2xl md:text-3xl font-header font-bold mb-6">{t('services.chatbot.title')}</h3>
              <p className="text-foreground/70 mb-8">{t('services.chatbot.subtitle')}</p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <i className="ri-check-line text-accent text-xl mr-2"></i>
                  <span>{t('services.chatbot.feature1')}</span>
                </li>
                <li className="flex items-start">
                  <i className="ri-check-line text-accent text-xl mr-2"></i>
                  <span>{t('services.chatbot.feature2')}</span>
                </li>
                <li className="flex items-start">
                  <i className="ri-check-line text-accent text-xl mr-2"></i>
                  <span>{t('services.chatbot.feature3')}</span>
                </li>
              </ul>
              <a href="#contact" className="inline-flex items-center text-accent group">
                <span className="group-hover:underline">{t('services.chatbot.cta')}</span>
                <i className="ri-arrow-right-line ml-2 transition-transform group-hover:translate-x-1"></i>
              </a>
            </div>
            <div className="col-span-12 lg:col-span-6 lg:col-start-7 mt-10 lg:mt-0">
              {/* AI Chatbot Demo */}
              <div className="bg-primary rounded-2xl overflow-hidden shadow-2xl h-[400px] flex flex-col">
                <div className="bg-secondary p-4 flex items-center">
                  <div className="flex space-x-2 mr-4">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-sm text-center flex-grow">Digimaatwerk {language === 'nl' ? 'AI Assistent' : 'AI Assistant'}</div>
                </div>
                <div className="flex-grow p-4 overflow-y-auto space-y-4" id="chat-messages">
                  {chatMessages.map((msg, index) => (
                    <div key={index} className={`flex items-start gap-2 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                      {msg.sender === 'bot' && (
                        <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-primary font-bold">D</div>
                      )}
                      <div className={`${msg.sender === 'bot' 
                        ? 'bg-secondary rounded-lg rounded-tl-none' 
                        : 'bg-accent/20 rounded-lg rounded-tr-none'} p-3 max-w-[80%]`}>
                        <p>{msg.messageKey ? t(msg.messageKey) : msg.message}</p>
                      </div>
                      {msg.sender === 'user' && (
                        <div className="w-8 h-8 rounded-full bg-foreground/10 flex items-center justify-center text-foreground">U</div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-secondary">
                  <div className="flex">
                    <input 
                      type="text" 
                      placeholder={t('services.chatbot.placeholder')}
                      className="w-full bg-primary border border-secondary/50 rounded-l-lg px-4 py-2 focus:outline-none focus:border-accent text-foreground"
                      value={userInput}
                      onChange={handleUserInput}
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
