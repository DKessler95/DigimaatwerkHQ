import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/languageContext';
import { Loader2, Monitor } from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';
import MonitorFrame from '@/components/MonitorFrame';

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  websiteUrl: string;
  category: 'web' | 'automation' | 'chatbot';
  websiteScreenshot?: string;
}

const portfolioData: PortfolioItem[] = [
  {
    id: 'fast-taxi-rotterdam',
    title: 'Fast Taxi Rotterdam',
    description: `Voor de nieuwe website van Fast Taxi Rotterdam heb ik een moderne, gebruiksvriendelijke en volledig geoptimaliseerde oplossing ontwikkeld die een aanzienlijke verbetering biedt ten opzichte van de oude website. De nieuwe site is sneller, mobielvriendelijk en beschikt over een intuïtieve interface waarmee klanten eenvoudig ritten kunnen boeken.

Een belangrijke innovatie is de automatische workflow-integratie met WhatsApp Business. Bestellingen die via de website binnenkomen, worden direct doorgestuurd naar WhatsApp, waardoor chauffeurs sneller reageren en ritten efficiënter plannen. Dit verkort niet alleen de responstijd, maar verhoogt ook de klanttevredenheid en het aantal afgeronde boekingen.

Dankzij deze verbeteringen kan Fast Taxi Rotterdam zijn service soepeler uitvoeren, meer klanten bedienen en uiteindelijk meer winst genereren. Deze case illustreert hoe slimme technologie en een goed ontworpen website bijdragen aan bedrijfsoptimalisatie en groei.`,
    imageUrl: '/assets/fasttaxi.png',
    websiteUrl: 'https://www.fasttaxirotterdam.com',
    websiteScreenshot: '/assets/fasttaxi.png',
    category: 'web'
  }
];

const PortfolioBlock = ({ 
  item, 
  onClick,
  screenshotUrl,
  isLoading
}: { 
  item: PortfolioItem, 
  onClick: () => void,
  screenshotUrl?: string,
  isLoading?: boolean
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const getCategoryColors = (category: string) => {
    switch(category) {
      case 'web':
        return 'from-blue-400 to-blue-700';
      case 'automation':
        return 'from-amber-400 to-amber-700';
      case 'chatbot':
        return 'from-green-400 to-purple-700';
      default:
        return 'from-accent to-primary';
    }
  };
  
  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'web':
        return '🌐';
      case 'automation':
        return '⚙️';
      case 'chatbot':
        return '🤖';
      default:
        return '✨';
    }
  };
  
  return (
    <motion.div
      className={`rounded-xl overflow-hidden bg-gradient-to-br ${getCategoryColors(item.category)} p-1 shadow-lg`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.03 }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-secondary/80 backdrop-blur-sm rounded-lg h-full cursor-pointer relative overflow-hidden flex flex-col">
        {/* Website screenshot in monitor frame */}
        <div className="relative h-48 overflow-hidden bg-black/20">
          <div className="absolute inset-0 flex items-center justify-center py-2">
            <MonitorFrame 
              imageUrl={screenshotUrl || item.websiteScreenshot || item.imageUrl}
              altText={`${item.title} website`}
              websiteUrl={item.websiteUrl}
              isLoading={isLoading}
              className="w-[95%] h-[90%]"
            />
          </div>
          
          <div className="absolute top-2 right-2 bg-accent/80 backdrop-blur-sm text-primary text-xs px-2 py-1 rounded font-medium z-20">
            {item.category === 'web' ? 'Website' : item.category === 'automation' ? 'Automatisering' : 'Chatbot'}
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6 flex-grow">
          {/* Animated background */}
          <div 
            className={`absolute inset-0 bg-gradient-to-br ${getCategoryColors(item.category)} opacity-10 transition-opacity duration-500 ${isHovered ? 'opacity-20' : 'opacity-10'}`}
          />
          
          {/* Animated particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(10)].map((_, i) => (
              <div 
                key={i}
                className="absolute w-6 h-6 rounded-full bg-white opacity-20"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animation: `float ${3 + Math.random() * 7}s infinite ease-in-out ${Math.random() * 5}s`,
                  transform: `scale(${0.5 + Math.random() * 0.5})`,
                  opacity: isHovered ? 0.3 : 0.1
                }}
              />
            ))}
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-primary/30 flex items-center justify-center mr-3 backdrop-blur-sm">
                <span className="text-lg">{getCategoryIcon(item.category)}</span>
              </div>
              <h3 className="text-xl font-header font-bold">{item.title}</h3>
            </div>
            
            <p className="text-foreground/80 line-clamp-3 mb-4">
              {item.description.split("\n\n")[0]}
            </p>
            
            <div className={`transition-all duration-500 ${isHovered ? 'opacity-100' : 'opacity-70'}`}>
              <span className="inline-flex items-center text-accent">
                Meer informatie
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ml-2 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const PortfolioDetailModal = ({ 
  item, 
  isOpen, 
  onClose 
}: { 
  item: PortfolioItem | null, 
  isOpen: boolean, 
  onClose: () => void 
}) => {
  const [animationComplete, setAnimationComplete] = useState(false);
  const [websiteScreenshot, setWebsiteScreenshot] = useState<string | null>(null);
  const [isScreenshotLoading, setIsScreenshotLoading] = useState(false);
  
  // Functie om website screenshot op te halen
  const fetchWebsiteScreenshot = async () => {
    if (!item) return;
    
    try {
      setIsScreenshotLoading(true);
      
      // API aanroepen om screenshot te genereren
      const response = await apiRequest('GET', `/api/website-screenshot?url=${encodeURIComponent(item.websiteUrl)}`);
      const data = await response.json();
      
      // Check of de screenshot beschikbaar is
      if (data && data.image_url) {
        setWebsiteScreenshot(data.image_url);
      }
    } catch (error) {
      console.error('Error fetching website screenshot for modal:', error);
    } finally {
      setIsScreenshotLoading(false);
    }
  };
  
  useEffect(() => {
    if (isOpen && item) {
      // Reset screenshot status when modal opens
      setWebsiteScreenshot(null);
      
      // Fetch screenshot for this website
      fetchWebsiteScreenshot();
      
      // Play sound effect when opening modal
      const audio = new Audio('/sounds/woosh.mp3');
      audio.volume = 0.3;
      audio.play().catch(e => console.log('Audio play failed: ', e));
      
      // Set animation complete after a delay
      const timer = setTimeout(() => {
        setAnimationComplete(true);
      }, 1500);
      
      return () => clearTimeout(timer);
    } else {
      setAnimationComplete(false);
    }
  }, [isOpen, item]);
  
  if (!item) return null;
  
  const handleVisitWebsite = () => {
    // Play click sound
    const audio = new Audio('/sounds/click.mp3');
    audio.volume = 0.3;
    audio.play().catch(e => console.log('Audio play failed: ', e));
    
    // Open website after short delay
    setTimeout(() => {
      window.open(item.websiteUrl, '_blank');
      onClose();
    }, 300);
  };
  
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'} transition-opacity duration-300`}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose}></div>
      
      <motion.div
        className="bg-secondary rounded-xl overflow-hidden max-w-5xl w-full max-h-[85vh] relative z-10"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: isOpen ? 1 : 0.9, opacity: isOpen ? 1 : 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      >
        <div className="absolute top-4 right-4 z-20">
          <button 
            className="w-8 h-8 rounded-full bg-primary/30 flex items-center justify-center backdrop-blur-sm hover:bg-primary/50 transition-colors"
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        
        {/* Dynamic 3D-like header */}
        <div className="h-52 relative overflow-hidden">
          <div 
            className={`absolute inset-0 bg-gradient-to-br from-primary to-accent opacity-70 transform-gpu transition-transform duration-1000 ${animationComplete ? 'scale-110' : 'scale-100'}`} 
          />
          
          {/* Animated elements */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-12 h-12 rounded-full bg-white opacity-20"
                initial={{ 
                  x: Math.random() * window.innerWidth, 
                  y: Math.random() * 200,
                  scale: 0.1 + Math.random() * 0.5
                }}
                animate={{ 
                  x: Math.random() * window.innerWidth, 
                  y: Math.random() * 200,
                  scale: 0.3 + Math.random() * 0.7
                }}
                transition={{ 
                  duration: 5 + Math.random() * 10, 
                  repeat: Infinity, 
                  repeatType: 'reverse',
                  delay: Math.random() * 5
                }}
              />
            ))}
          </div>
          
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.h2 
              className="text-4xl font-header font-bold text-white text-center px-6 z-10"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {item.title}
            </motion.h2>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 overflow-y-auto max-h-[calc(85vh-13rem)]">
          {/* Left column - text content */}
          <div>
            {item.description.split("\n\n").map((paragraph, index) => (
              <motion.p 
                key={index}
                className="mb-4 text-foreground/90"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
              >
                {paragraph}
              </motion.p>
            ))}
            
            <motion.div
              className="mt-8"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <button
                className="px-6 py-3 bg-accent text-primary font-medium rounded-lg hover:bg-accent/90 transition inline-flex items-center"
                onClick={handleVisitWebsite}
              >
                Website bezoeken
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </button>
            </motion.div>
          </div>
          
          {/* Right column - website screenshot in device frame */}
          <motion.div
            className="bg-black/10 p-4 rounded-xl flex items-center justify-center overflow-hidden relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <div className="max-w-md w-full mx-auto">
              <MonitorFrame 
                imageUrl={websiteScreenshot || item.websiteScreenshot || item.imageUrl}
                altText={`${item.title} website screenshot`}
                websiteUrl={item.websiteUrl}
                isLoading={isScreenshotLoading}
                className="w-full aspect-[4/3]"
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

const Portfolio = () => {
  const { language } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [websiteScreenshots, setWebsiteScreenshots] = useState<Record<string, string>>({});
  const [screenshotLoading, setScreenshotLoading] = useState<Record<string, boolean>>({});
  
  // Functie om website screenshot op te halen
  const fetchWebsiteScreenshot = async (item: PortfolioItem) => {
    if (websiteScreenshots[item.id]) return; // Skip if already fetched
    
    try {
      setScreenshotLoading({...screenshotLoading, [item.id]: true});
      
      // API aanroepen om screenshot te genereren
      const response = await apiRequest('GET', `/api/website-screenshot?url=${encodeURIComponent(item.websiteUrl)}`);
      const data = await response.json();
      
      // Check of de screenshot beschikbaar is
      if (data && data.image_url) {
        setWebsiteScreenshots(prev => ({
          ...prev,
          [item.id]: data.image_url
        }));
      }
    } catch (error) {
      console.error('Error fetching website screenshot:', error);
    } finally {
      setScreenshotLoading({...screenshotLoading, [item.id]: false});
    }
  };
  
  useEffect(() => {
    // Data inladen
    const timer = setTimeout(() => {
      setLoading(false);
      
      // Voor elk portfolio item een screenshot ophalen
      portfolioData.forEach(item => {
        fetchWebsiteScreenshot(item);
      });
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handlePortfolioItemClick = (item: PortfolioItem) => {
    setSelectedItem(item);
    setModalOpen(true);
    
    // Zorg ervoor dat de screenshot is opgehaald
    if (!websiteScreenshots[item.id]) {
      fetchWebsiteScreenshot(item);
    }
    
    // Play sound effect
    const audio = new Audio('/sounds/select.mp3');
    audio.volume = 0.2;
    audio.play().catch(e => console.log('Audio play failed: ', e));
  };
  
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-b from-primary to-secondary">
        <Loader2 className="h-10 w-10 animate-spin text-accent" />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary to-secondary pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-header font-bold mb-4">
            Portfolio
          </h1>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            {language === 'nl' 
              ? 'Ontdek onze recente projecten en zie hoe we bedrijven helpen groeien met digitale oplossingen.'
              : 'Discover our recent projects and see how we help businesses grow with digital solutions.'}
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {portfolioData.map((item) => (
            <PortfolioBlock 
              key={item.id} 
              item={item} 
              onClick={() => handlePortfolioItemClick(item)} 
              screenshotUrl={websiteScreenshots[item.id]}
              isLoading={screenshotLoading[item.id]}
            />
          ))}
        </div>
        
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-header font-semibold mb-4">
            {language === 'nl' ? 'Klaar voor uw eigen succesverhaal?' : 'Ready for your own success story?'}
          </h2>
          <p className="text-foreground/70 mb-8 max-w-2xl mx-auto">
            {language === 'nl' 
              ? 'Neem contact met ons op voor een vrijblijvend gesprek over uw project. We denken graag met u mee!'
              : 'Contact us for a no-obligation discussion about your project. We are happy to think along with you!'}
          </p>
          <a 
            href="#contact"
            className="px-6 py-3 bg-accent text-primary font-medium rounded-lg hover:bg-accent/90 transition inline-flex items-center"
          >
            {language === 'nl' ? 'Contact opnemen' : 'Contact us'}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </motion.div>
      </div>
      
      <PortfolioDetailModal
        item={selectedItem}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};

export default Portfolio;