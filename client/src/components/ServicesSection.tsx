import { motion } from 'framer-motion';
import { useState } from 'react';

interface Service {
  icon: string;
  title: string;
  description: string;
  tech: string;
}

const services: Service[] = [
  {
    icon: "ri-robot-line",
    title: "AI Chatbots",
    description: "Intelligent conversational agents powered by GPT-4 with RAG technology for enhanced context understanding",
    tech: "NLP · GPT-4 · RAG"
  },
  {
    icon: "ri-settings-line",
    title: "Workflow Automation",
    description: "Streamlined process automation solutions that reduce manual tasks and optimize operations",
    tech: "AWS · Azure · GCP"
  },
  {
    icon: "ri-code-s-slash-line",
    title: "Web Development",
    description: "Modern, high-performance web applications built with cutting-edge technologies and frameworks",
    tech: "React · Next.js · Three.js"
  }
];

const ServicesSection = () => {
  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'bot',
      message: "Hello! I'm Digimaatwerk's AI assistant. How can I help you today?"
    },
    {
      sender: 'user',
      message: "I'm interested in creating a chatbot for my business."
    },
    {
      sender: 'bot',
      message: "Great! We specialize in custom AI chatbots that can help with customer service, lead generation, and internal processes. What's your main goal for this chatbot?"
    }
  ]);
  
  const [userInput, setUserInput] = useState('');

  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const handleSendMessage = () => {
    if (userInput.trim() === '') return;
    
    // Add user message
    setChatMessages([...chatMessages, { sender: 'user', message: userInput }]);
    setUserInput('');
    
    // Simulate bot response after a delay
    setTimeout(() => {
      setChatMessages(prev => [
        ...prev, 
        { 
          sender: 'bot', 
          message: "That's a great question! Our team would be happy to discuss this in more detail. Would you like us to contact you for a personalized demo?" 
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
          <h2 className="text-3xl md:text-4xl font-header font-bold mb-4">Our Digital Services</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">Tailored solutions designed to transform your business operations and customer experiences</p>
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
                <h3 className="text-xl font-header font-semibold mb-3">{service.title}</h3>
                <p className="text-foreground/70 mb-4">{service.description}</p>
                <p className="text-accent font-mono text-sm">{service.tech}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Service Feature (AI Chatbot Demo) */}
        <div className="mt-24 bg-secondary/50 backdrop-blur-md rounded-2xl p-8 lg:p-12 overflow-hidden">
          <div className="asymmetric-grid">
            <div className="col-span-12 lg:col-span-5 flex flex-col justify-center">
              <h3 className="text-2xl md:text-3xl font-header font-bold mb-6">Experience our AI Chatbot</h3>
              <p className="text-foreground/70 mb-8">Try our interactive chatbot to see how we can implement intelligent conversational interfaces for your business</p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <i className="ri-check-line text-accent text-xl mr-2"></i>
                  <span>Customized to your brand voice and guidelines</span>
                </li>
                <li className="flex items-start">
                  <i className="ri-check-line text-accent text-xl mr-2"></i>
                  <span>Integrates with your knowledge base and CRM</span>
                </li>
                <li className="flex items-start">
                  <i className="ri-check-line text-accent text-xl mr-2"></i>
                  <span>24/7 support for your customers</span>
                </li>
              </ul>
              <a href="#contact" className="inline-flex items-center text-accent group">
                <span className="group-hover:underline">Learn how we can implement this for your business</span>
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
                  <div className="text-sm text-center flex-grow">Digimaatwerk AI Assistant</div>
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
                        <p>{msg.message}</p>
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
                      placeholder="Type your message here..." 
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
