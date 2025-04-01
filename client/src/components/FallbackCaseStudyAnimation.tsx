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
    icon = '⚙️';
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
        className="absolute inset-0 bg-gradient-to-br opacity-30"
        style={{ backgroundImage: `linear-gradient(to bottom right, ${mainColor}, ${gradientColor})` }}
      />
      
      {/* Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{ 
              backgroundColor: i % 2 === 0 ? mainColor : gradientColor,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.6,
            }}
            animate={{
              x: [
                Math.random() * 20 - 10,
                Math.random() * 20 - 10,
                Math.random() * 20 - 10
              ],
              y: [
                Math.random() * 20 - 10,
                Math.random() * 20 - 10,
                Math.random() * 20 - 10
              ],
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.7, 0.4]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      
      {/* Central element that rotates */}
      <motion.div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        animate={{
          rotateY: [0, 360],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <div 
          className="flex items-center justify-center font-bold text-7xl"
          style={{ textShadow: `0 0 15px ${mainColor}` }}
        >
          {icon}
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