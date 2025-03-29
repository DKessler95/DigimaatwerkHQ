import { useEffect, useState, useRef } from 'react';

interface CodeAnimationLoaderProps {
  onComplete?: () => void;
  duration?: number;
}

const CodeAnimationLoader = ({ onComplete, duration = 1500 }: CodeAnimationLoaderProps) => {
  const [visible, setVisible] = useState(true);
  const [text, setText] = useState('');
  const codeRef = useRef<HTMLDivElement>(null);
  
  // Shorter code snippet for faster animation
  const codeSnippet = `// Digimaatwerk Digital Solutions
import { Client } from '@digimaatwerk/core';
import { AI, Web } from '@digimaatwerk/services';

// Initialize digital transformation
const client = new Client({
  name: 'Your Business',
  goals: ['growth', 'innovation']
});

// Apply intelligent solutions
const solution = await Promise.all([
  AI.createChatbot(client),
  Web.buildResponsiveApp(client)
]);

// Digimaatwerk: Powering your digital future`;

  // Skip animation handler
  const handleSkip = () => {
    if (codeRef.current) {
      codeRef.current.style.opacity = '0';
    }
    
    setTimeout(() => {
      setVisible(false);
      if (onComplete) onComplete();
    }, 300);
  };

  useEffect(() => {
    let currentIndex = 0;
    let typingInterval: ReturnType<typeof setInterval>;
    
    // Start the typing animation with faster speed
    typingInterval = setInterval(() => {
      if (currentIndex < codeSnippet.length) {
        setText(codeSnippet.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        
        // Shorter delay before hiding the loader
        setTimeout(() => {
          // Add fade-out animation
          if (codeRef.current) {
            codeRef.current.style.opacity = '0';
          }
          
          // Hide the loader after the fade-out
          setTimeout(() => {
            setVisible(false);
            if (onComplete) onComplete();
          }, 300);
        }, 400);
      }
    }, 15); // Faster typing speed
    
    return () => clearInterval(typingInterval);
  }, [codeSnippet, onComplete]);
  
  if (!visible) return null;
  
  return (
    <div className="fixed inset-0 bg-primary z-50 flex flex-col items-center justify-center transition-opacity duration-500" ref={codeRef}>
      <div className="w-full max-w-4xl px-4">
        <div className="bg-secondary rounded-lg p-6 shadow-xl">
          <div className="flex items-center mb-4 justify-between">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <div className="ml-4 text-foreground/60 text-sm">terminal@digimaatwerk</div>
            </div>
          </div>
          <pre className="font-mono text-sm md:text-base text-accent overflow-x-auto">
            <code className="typing-animation">{text}</code>
          </pre>
          <div className="h-4 w-2 bg-accent inline-block animate-pulse ml-1 relative top-1"></div>
        </div>
      </div>
      <div className="mt-8 text-accent text-lg animate-pulse">Initializing Digimaatwerk Interface...</div>
      <button 
        onClick={handleSkip}
        className="mt-4 px-6 py-2 bg-accent/20 hover:bg-accent/30 text-accent rounded-md transition-colors duration-200"
      >
        Skip Animation
      </button>
    </div>
  );
};

export default CodeAnimationLoader;