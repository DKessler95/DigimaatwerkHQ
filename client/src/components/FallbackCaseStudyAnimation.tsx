import React from 'react';
import { motion } from 'framer-motion';

interface FallbackCaseStudyAnimationProps {
  category: string;
  className?: string;
  height?: string;
}

const FallbackCaseStudyAnimation: React.FC<FallbackCaseStudyAnimationProps> = ({
  category,
  className = "h-64 my-8",
  height = "300px"
}) => {
  // Determine colors based on category
  let mainColor = '#14b8a6'; // Default teal color
  let gradientColor = '#0f766e';
  let icon = '💻'; // Default icon
  
  if (category === 'Automatisering' || category === 'Automation') {
    mainColor = '#0ea5e9';
    gradientColor = '#0284c7';
    icon = '⚡'; // Changed to lightning bolt icon for Fast Taxi
  } else if (category === 'Webontwikkeling' || category === 'Web Development') {
    mainColor = '#14b8a6';
    gradientColor = '#0f766e';
    icon = '🌐';
  } else if (category === 'AI & Chatbots') {
    mainColor = '#06b6d4';
    gradientColor = '#0891b2';
    icon = '🤖';
  }
  
  return (
    <div 
      className={`${className} rounded-lg overflow-hidden relative`} 
      style={{ height, backgroundColor: '#0f172a' }}
    >
      {/* Animated gradient background */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{ 
          background: `linear-gradient(135deg, ${mainColor}, ${gradientColor})`,
          animation: 'pulse 6s ease-in-out infinite'
        }}
      />
      
      {/* Animated icons related to the category */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => {
          // Determine icon based on category
          let itemIcon = '🔹';
          if (category === 'Automatisering' || category === 'Automation') {
            itemIcon = i % 3 === 0 ? '⚡' : (i % 3 === 1 ? '🚕' : '⚙️');
          } else if (category === 'Webontwikkeling' || category === 'Web Development') {
            itemIcon = i % 3 === 0 ? '🌐' : (i % 3 === 1 ? '💻' : '📱');
          } else if (category === 'AI & Chatbots') {
            itemIcon = i % 3 === 0 ? '🤖' : (i % 3 === 1 ? '💬' : '🧠');
          }
          
          // Calculate random but fixed positions
          const leftPos = `${(i * 6 + Math.sin(i) * 20) % 100}%`;
          const topPos = `${(i * 7 + Math.cos(i) * 25) % 100}%`;
          
          return (
            <motion.div
              key={i}
              className="absolute flex items-center justify-center text-xl"
              style={{ 
                left: leftPos,
                top: topPos,
                opacity: 0.7,
                filter: `drop-shadow(0 0 10px ${mainColor})`,
                zIndex: 5
              }}
              animate={{
                y: [0, -15, 0],
                scale: [1, 1.2, 1],
                opacity: [0.4, 0.7, 0.4]
              }}
              transition={{
                duration: 3 + (i % 3) * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.2
              }}
            >
              {itemIcon}
            </motion.div>
          );
        })}
      </div>
      
      {/* Central animated icon with glow effect */}
      <motion.div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 5, 0, -5, 0]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div 
          className="relative flex items-center justify-center"
        >
          {/* Glow effect */}
          <div 
            className="absolute inset-0 rounded-full blur-xl"
            style={{ 
              backgroundColor: mainColor,
              opacity: 0.5,
              transform: 'scale(1.5)'
            }}
          />
          
          {/* Icon with animated border */}
          <motion.div 
            className="relative flex items-center justify-center font-bold text-7xl rounded-full p-8"
            style={{ 
              boxShadow: `0 0 30px ${mainColor}`,
              background: `radial-gradient(circle, ${mainColor}30, ${gradientColor}70)`,
              borderRadius: '50%',
            }}
            animate={{
              boxShadow: [
                `0 0 20px ${mainColor}80`,
                `0 0 40px ${mainColor}`,
                `0 0 20px ${mainColor}80`
              ]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {icon}
          </motion.div>
        </div>
      </motion.div>
      
      {/* Category label */}
      <motion.div 
        className="absolute bottom-4 left-0 right-0 text-center text-2xl font-semibold"
        animate={{ y: [5, 0, 5] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ color: mainColor }}
      >
        {category}
      </motion.div>
    </div>
  );
};

export default FallbackCaseStudyAnimation;