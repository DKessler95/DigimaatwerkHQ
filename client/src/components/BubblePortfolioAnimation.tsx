import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getRandomInt } from '../lib/utils';

interface BubblePortfolioAnimationProps {
  category: 'web' | 'automation' | 'chatbot';
  density?: number; // Number of bubbles (default: 20)
  className?: string;
  onClick?: () => void;
  interactive?: boolean; // Whether bubbles should react to mouse movement
}

interface Bubble {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  speed: number;
  opacity: number;
}

// Component for creating a bubble-based animation for portfolio items
const BubblePortfolioAnimation: React.FC<BubblePortfolioAnimationProps> = ({
  category,
  density = 20,
  className = "h-64 w-full rounded-lg overflow-hidden relative",
  onClick,
  interactive = true
}) => {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Get category-specific colors
  const getCategoryColors = (category: string) => {
    switch(category) {
      case 'web':
        return {
          main: '#0ea5e9', // Light blue
          secondary: '#0284c7', // Darker blue
          highlight: '#38bdf8' // Highlight blue
        };
      case 'automation':
        return {
          main: '#f59e0b', // Amber
          secondary: '#d97706', // Darker amber
          highlight: '#fbbf24' // Highlight amber
        };
      case 'chatbot':
        return {
          main: '#10b981', // Green
          secondary: '#059669', // Darker green
          highlight: '#34d399' // Highlight green
        };
      default:
        return {
          main: '#0ea5e9', // Default light blue
          secondary: '#0284c7', // Default darker blue
          highlight: '#38bdf8' // Default highlight blue
        };
    }
  };
  
  const colors = getCategoryColors(category);
  
  // Initialize bubbles
  useEffect(() => {
    if (!containerRef.current) return;
    
    const initialBubbles: Bubble[] = [];
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    
    for (let i = 0; i < density; i++) {
      initialBubbles.push({
        id: i,
        x: getRandomInt(0, width),
        y: getRandomInt(0, height),
        size: getRandomInt(10, 60),
        delay: getRandomInt(0, 20) / 10,
        speed: getRandomInt(5, 15) / 10,
        opacity: getRandomInt(10, 80) / 100
      });
    }
    
    setBubbles(initialBubbles);
    
    // Add resize event listener
    const handleResize = () => {
      if (!containerRef.current) return;
      
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      
      // Update bubble positions based on new dimensions
      setBubbles(prev => prev.map(bubble => ({
        ...bubble,
        x: (bubble.x / prev[0].x) * width,
        y: (bubble.y / prev[0].y) * height
      })));
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [density]);
  
  // Handle mouse movement for interactive bubbles
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!interactive || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setMousePosition({ x, y });
  };
  
  return (
    <motion.div 
      ref={containerRef}
      className={`${className} cursor-pointer bg-gradient-to-br from-secondary/80 to-secondary/50 backdrop-blur-sm`}
      style={{ backdropFilter: 'blur(8px)' }}
      whileHover={{ scale: isHovered ? 1.02 : 1 }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background gradient */}
      <div 
        className="absolute inset-0 opacity-40"
        style={{ 
          background: `radial-gradient(circle, ${colors.highlight}20, ${colors.main}40, ${colors.secondary}80)`,
        }}
      />
      
      {/* Bubble elements */}
      {bubbles.map((bubble) => {
        // Calculate distance from mouse for interactive effect
        const dx = mousePosition.x - bubble.x;
        const dy = mousePosition.y - bubble.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 150; // Max distance for interaction
        
        // Calculate repulsion force (stronger when closer)
        const force = interactive && isHovered ? Math.max(0, 1 - distance / maxDistance) * 40 : 0;
        const angle = Math.atan2(dy, dx);
        
        // Apply force in the opposite direction
        const moveX = force ? -Math.cos(angle) * force : 0;
        const moveY = force ? -Math.sin(angle) * force : 0;
        
        return (
          <motion.div
            key={bubble.id}
            className="absolute rounded-full"
            style={{
              left: bubble.x,
              top: bubble.y,
              width: bubble.size,
              height: bubble.size,
              backgroundColor: isHovered ? colors.highlight : colors.main,
              opacity: bubble.opacity,
              zIndex: Math.floor(bubble.size),
            }}
            animate={{
              x: moveX,
              y: moveY,
              scale: isHovered ? 1.1 : [1, 1.05, 1],
            }}
            transition={{
              x: { type: "spring", stiffness: 100, damping: 10 },
              y: { type: "spring", stiffness: 100, damping: 10 },
              scale: {
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                delay: bubble.delay
              }
            }}
          />
        );
      })}
      
      {/* Shine effect on hover */}
      {isHovered && (
        <div 
          className="absolute inset-0 opacity-20"
          style={{ 
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, ${colors.highlight}, transparent 60%)`,
          }}
        />
      )}
    </motion.div>
  );
};

export default BubblePortfolioAnimation;