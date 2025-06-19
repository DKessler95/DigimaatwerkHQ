import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/languageContext';
import { Loader2 } from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';
import BubblePortfolioAnimation from '@/components/BubblePortfolioAnimation';

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  websiteUrl: string;
  category: 'web' | 'automation' | 'chatbot';
  websiteScreenshot?: string;
  displayType?: 'default' | 'bubble' | 'minimal';
}

// Portfolio data wordt geladen via de API in de Portfolio component

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
  
  const getCategoryColors = (category: string, itemId?: string) => {
    // Specific colors for each portfolio item
    if (itemId === 'limonade-webshop') {
      return 'from-pink-400 to-rose-600';
    }
    if (itemId === 'fast-taxi-rotterdam') {
      return 'from-amber-400 to-orange-600';
    }
    
    // Fallback colors by category
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
  
  const getCategoryIcon = (category: string, itemId?: string) => {
    // Specific icons for each portfolio item
    if (itemId === 'limonade-webshop') {
      return '🛍️';
    }
    if (itemId === 'fast-taxi-rotterdam') {
      return '🚕';
    }
    
    // Fallback icons by category
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
      className={`rounded-xl overflow-hidden bg-gradient-to-br ${getCategoryColors(item.category, item.id)} p-1 shadow-lg`}
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
            {/* Browser frame styling */}
            <div className="w-[95%] h-[90%] rounded-xl overflow-hidden shadow-lg">
              {/* Browser top bar with controls */}
              <div className="bg-gray-900 rounded-t-xl p-1 flex items-center">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                </div>
                {item.websiteUrl && (
                  <div className="mx-auto text-center text-xs text-gray-400 font-mono overflow-hidden text-ellipsis whitespace-nowrap max-w-[140px]">
                    {item.websiteUrl}
                  </div>
                )}
              </div>
              
              {/* Browser content - full image without padding */}
              <div className="aspect-video flex items-center justify-center overflow-hidden">
                <img 
                  src={screenshotUrl || item.websiteScreenshot || '/images/portfolio/fasttaxi.png'} 
                  alt={`${item.title} website`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.error('Afbeelding kon niet worden geladen, fallback naar fasttaxi.png');
                    e.currentTarget.src = '/images/portfolio/fasttaxi.png';
                  }}
                />
              </div>
            </div>
          </div>
          
          <div className="absolute top-2 right-2 bg-accent/80 backdrop-blur-sm text-primary text-xs px-2 py-1 rounded font-medium z-20">
            {item.category === 'web' ? 'Website' : item.category === 'automation' ? 'Automatisering' : 'Chatbot'}
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6 flex-grow">
          {/* Animated background */}
          <div 
            className={`absolute inset-0 bg-gradient-to-br ${getCategoryColors(item.category, item.id)} opacity-10 transition-opacity duration-500 ${isHovered ? 'opacity-20' : 'opacity-10'}`}
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
                <span className="text-lg">{getCategoryIcon(item.category, item.id)}</span>
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
      // Direct de websiteScreenshot uit het portfolio item gebruiken met fallback
      setWebsiteScreenshot(item.websiteScreenshot || '/images/portfolio/fasttaxi.png');
    } catch (error) {
      console.error('Error setting website screenshot for modal:', error);
      setWebsiteScreenshot('/images/portfolio/fasttaxi.png');
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
            <div className="w-full mx-auto">
              {/* Browser-style frame zonder monitor */}
              <div className="w-full rounded-xl overflow-hidden shadow-xl">
                {/* Browser top bar with controls */}
                <div className="bg-gray-900 rounded-t-xl p-2 flex items-center">
                  <div className="flex space-x-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="mx-auto text-center text-xs text-gray-400 font-mono overflow-hidden text-ellipsis whitespace-nowrap max-w-[180px] md:max-w-full">
                    {item.websiteUrl}
                  </div>
                </div>
                
                {/* Browser content - full image without padding */}
                <div className="aspect-[16/10] flex items-center justify-center overflow-hidden">
                  {isScreenshotLoading ? (
                    <div className="animate-spin w-8 h-8 border-4 border-accent border-t-transparent rounded-full"></div>
                  ) : (
                    <img 
                      src={websiteScreenshot || item.websiteScreenshot || '/images/portfolio/fasttaxi.png'} 
                      alt={`${item.title} website screenshot`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        console.error('Afbeelding kon niet worden geladen in detail view, fallback naar fasttaxi.png');
                        e.currentTarget.src = '/images/portfolio/fasttaxi.png';
                      }}
                    />
                  )}
                </div>
              </div>
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
  const [portfolioData, setPortfolioData] = useState<PortfolioItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [websiteScreenshots, setWebsiteScreenshots] = useState<Record<string, string>>({});
  const [screenshotLoading, setScreenshotLoading] = useState<Record<string, boolean>>({});
  
  // Functie om website screenshot op te halen
  const fetchWebsiteScreenshot = async (item: PortfolioItem) => {
    if (websiteScreenshots[item.id]) return; // Skip if already fetched
    
    try {
      setScreenshotLoading({...screenshotLoading, [item.id]: true});
      
      // Direct de websiteScreenshot uit portfolioData gebruiken
      setWebsiteScreenshots((prev: Record<string, string>) => ({
        ...prev,
        [item.id]: item.websiteScreenshot || '/images/portfolio/fasttaxi.png'
      }));
    } catch (error) {
      console.error('Error setting website screenshot:', error);
    } finally {
      setScreenshotLoading({...screenshotLoading, [item.id]: false});
    }
  };
  
  useEffect(() => {
    // Data inladen via API
    const fetchPortfolioData = async () => {
      try {
        setLoading(true);
        const response = await apiRequest('GET', `/api/portfolio?lang=${language}`);
        const data = await response.json();
        
        if (data.success && Array.isArray(data.data)) {
          setPortfolioData(data.data);
          
          // Voor elk portfolio item een screenshot ophalen
          data.data.forEach((item: PortfolioItem) => {
            fetchWebsiteScreenshot(item);
          });
        } else {
          console.error('Fout bij ophalen portfolio data:', data);
          // Fallback naar lege array
          setPortfolioData([]);
        }
      } catch (error) {
        console.error('API error bij ophalen portfolio data:', error);
        // Fallback naar lege array
        setPortfolioData([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPortfolioData();
  }, [language]);
  
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
          {portfolioData.map((item) => {
            // Bepaal welk type weergave we moeten gebruiken
            if (item.displayType === 'bubble') {
              return (
                <div key={item.id} className="rounded-xl overflow-hidden shadow-lg">
                  <BubblePortfolioAnimation 
                    category={item.category}
                    className="h-48 w-full"
                    onClick={() => handlePortfolioItemClick(item)}
                  />
                  <div className="p-4 bg-secondary">
                    <h3 className="text-xl font-header font-bold mb-2">{item.title}</h3>
                    <p className="text-foreground/80 line-clamp-2 mb-3">
                      {item.description.split("\n\n")[0]}
                    </p>
                    <button 
                      className="text-accent inline-flex items-center"
                      onClick={() => handlePortfolioItemClick(item)}
                    >
                      Meer informatie
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              );
            } else if (item.displayType === 'minimal') {
              return (
                <motion.div
                  key={item.id}
                  className="rounded-xl overflow-hidden bg-secondary/80 backdrop-blur-sm shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ scale: 1.03 }}
                  onClick={() => handlePortfolioItemClick(item)}
                >
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                        item.category === 'web' ? 'bg-blue-500/20' :
                        item.category === 'automation' ? 'bg-amber-500/20' : 'bg-green-500/20'
                      }`}>
                        <span className="text-xl">
                          {item.category === 'web' ? '🌐' : 
                          item.category === 'automation' ? '⚙️' : '🤖'}
                        </span>
                      </div>
                      <h3 className="text-xl font-header font-bold">{item.title}</h3>
                    </div>
                    <p className="text-foreground/80 line-clamp-4 mb-4">
                      {item.description.split("\n\n")[0]}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs px-2 py-1 rounded bg-primary/20">
                        {item.category === 'web' ? 'Website' : 
                        item.category === 'automation' ? 'Automatisering' : 'Chatbot'}
                      </span>
                      <span className="text-accent inline-flex items-center text-sm">
                        Bekijken
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            } else {
              // Standaard weergave
              return (
                <PortfolioBlock 
                  key={item.id} 
                  item={item} 
                  onClick={() => handlePortfolioItemClick(item)} 
                  screenshotUrl={websiteScreenshots[item.id]}
                  isLoading={screenshotLoading[item.id]}
                />
              );
            }
          })}
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
            href="/#contact"
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