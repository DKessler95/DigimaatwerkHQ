import React, { useState, useEffect } from 'react';

interface MonitorFrameProps {
  imageUrl: string;
  altText: string;
  websiteUrl?: string;
  className?: string;
  isLoading?: boolean;
}

const MonitorFrame: React.FC<MonitorFrameProps> = ({ 
  imageUrl, 
  altText, 
  websiteUrl,
  className = '',
  isLoading = false
}) => {
  // Gebruik een state om bij te houden of de afbeelding succesvol is geladen
  const [imageSrc, setImageSrc] = useState<string>('/images/portfolio/fasttaxi.png');
  
  // Probeer de afbeelding te laden bij initialisatie of wanneer imageUrl wijzigt
  useEffect(() => {
    // Alleen proberen als er een imageUrl is doorgegeven
    if (imageUrl) {
      const img = new Image();
      img.onload = () => {
        console.log("Afbeelding succesvol geladen:", imageUrl);
        setImageSrc(imageUrl);
      };
      img.onerror = () => {
        console.log("Fout bij laden afbeelding, fallback naar vaste afbeelding:", imageUrl);
        setImageSrc('/images/portfolio/fasttaxi.png');
      };
      img.src = imageUrl;
    }
  }, [imageUrl]);
  
  return (
    <div className={`relative ${className}`}>
      {isLoading ? (
        <div className="absolute inset-0 flex items-center justify-center bg-black/10 rounded-md">
          <div className="animate-spin w-8 h-8 border-4 border-accent border-t-transparent rounded-full"></div>
        </div>
      ) : (
        <>
          {/* Monitor frame */}
          <div className="relative w-full">
            {/* Monitor top bar with browser controls */}
            <div className="bg-gray-900 rounded-t-xl p-2 flex items-center">
              <div className="flex space-x-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              {websiteUrl && (
                <div className="mx-auto text-center text-xs text-gray-400 font-mono overflow-hidden text-ellipsis whitespace-nowrap max-w-[180px] md:max-w-full">
                  {websiteUrl}
                </div>
              )}
            </div>
            
            {/* Monitor screen content */}
            <div className="bg-white border-l-2 border-r-2 border-gray-900 relative overflow-hidden">
              <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                <div className="w-full h-full overflow-hidden bg-white">
                  <img 
                    src={imageSrc} 
                    alt={altText} 
                    className="w-full h-full object-contain object-center"
                  />
                </div>
              </div>
              
              {/* Screen reflection overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
            </div>
            
            {/* Monitor base */}
            <div className="bg-gray-900 h-3 rounded-b-md"></div>
            <div className="bg-gray-800 h-2 w-32 mx-auto rounded-b-md"></div>
            <div className="h-10 w-24 mx-auto border-b-[10px] border-l-[7px] border-r-[7px] border-transparent border-t-0 border-gray-800 rounded-b-lg"></div>
          </div>
        </>
      )}
    </div>
  );
};

export default MonitorFrame;