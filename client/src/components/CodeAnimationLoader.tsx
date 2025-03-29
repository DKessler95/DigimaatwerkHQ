import { useEffect, useState, useRef } from 'react';

interface CodeAnimationLoaderProps {
  onComplete?: () => void;
  duration?: number;
}

const CodeAnimationLoader = ({ onComplete, duration = 3000 }: CodeAnimationLoaderProps) => {
  const [visible, setVisible] = useState(true);
  const [text, setText] = useState('');
  const codeRef = useRef<HTMLDivElement>(null);
  
  // Sample code to animate typing
  const codeSnippet = `// Digimaatwerk Digital Solutions
import { Client } from '@digimaatwerk/core';
import { AI, Automation, Web } from '@digimaatwerk/services';

// Initialize digital transformation
const client = new Client({
  name: 'Your Business',
  goals: ['efficiency', 'growth', 'innovation']
});

// Apply intelligent solutions
const solution = await Promise.all([
  AI.createChatbot(client),
  Automation.optimizeWorkflow(client),
  Web.buildResponsiveApp(client)
]);

// Transform business outcomes
export const results = {
  revenue: client.metrics.revenue * 1.4,
  efficiency: client.metrics.efficiency * 2.3,
  satisfaction: client.metrics.satisfaction * 1.8
};

// Digimaatwerk: Powering your digital future`;

  useEffect(() => {
    let currentIndex = 0;
    let typingInterval: ReturnType<typeof setInterval>;
    
    // Start the typing animation
    typingInterval = setInterval(() => {
      if (currentIndex < codeSnippet.length) {
        setText(codeSnippet.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        
        // Add a delay before hiding the loader
        setTimeout(() => {
          // Add fade-out animation
          if (codeRef.current) {
            codeRef.current.style.opacity = '0';
          }
          
          // Hide the loader after the fade-out
          setTimeout(() => {
            setVisible(false);
            if (onComplete) onComplete();
          }, 500);
        }, 800);
      }
    }, 25); // Speed of typing
    
    return () => clearInterval(typingInterval);
  }, [codeSnippet, onComplete]);
  
  if (!visible) return null;
  
  return (
    <div className="fixed inset-0 bg-primary z-50 flex flex-col items-center justify-center transition-opacity duration-500" ref={codeRef}>
      <div className="w-full max-w-4xl px-4">
        <div className="bg-secondary rounded-lg p-6 shadow-xl">
          <div className="flex items-center mb-4">
            <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <div className="ml-4 text-foreground/60 text-sm">terminal@digimaatwerk</div>
          </div>
          <pre className="font-mono text-sm md:text-base text-accent overflow-x-auto">
            <code className="typing-animation">{text}</code>
          </pre>
          <div className="h-4 w-2 bg-accent inline-block animate-pulse ml-1 relative top-1"></div>
        </div>
      </div>
      <div className="mt-8 text-accent text-lg animate-pulse">Initializing Digimaatwerk Interface...</div>
    </div>
  );
};

export default CodeAnimationLoader;