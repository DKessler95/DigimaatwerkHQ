// HeroSection.tsx
import { useEffect } from 'react';

const HeroSection = () => {
  return (
    <section className="relative h-[90vh] overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-accent/30 blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 left-1/3 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-accent/20 blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 right-1/3 w-56 h-56 rounded-full bg-accent/25 blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-header font-bold mb-6 text-foreground">
            Digital <span className="text-accent">Transformation</span> Experts
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-foreground/80 mb-10 font-body max-w-2xl mx-auto">
            We build intelligent solutions that transform businesses through AI, automation, and cutting-edge web development
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="#services" className="px-8 py-3 bg-accent text-primary font-header font-medium rounded-lg transition hover:bg-accent/90">
              Explore Services
            </a>
            <a href="#contact" className="px-8 py-3 bg-transparent border border-foreground/30 text-foreground font-header font-medium rounded-lg transition hover:bg-foreground/10">
              Get in Touch
            </a>
          </div>
          
          {/* Performance metrics */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            <div className="bg-secondary/50 backdrop-blur-md rounded-lg p-4">
              <div className="text-3xl font-bold text-accent mb-1">92+</div>
              <div className="text-sm text-foreground/70">LCP Score</div>
            </div>
            <div className="bg-secondary/50 backdrop-blur-md rounded-lg p-4">
              <div className="text-3xl font-bold text-accent mb-1">98+</div>
              <div className="text-sm text-foreground/70">CLS Score</div>
            </div>
            <div className="bg-secondary/50 backdrop-blur-md rounded-lg p-4">
              <div className="text-3xl font-bold text-accent mb-1">95+</div>
              <div className="text-sm text-foreground/70">FID Score</div>
            </div>
            <div className="bg-secondary/50 backdrop-blur-md rounded-lg p-4">
              <div className="text-3xl font-bold text-accent mb-1">AA</div>
              <div className="text-sm text-foreground/70">WCAG Compliance</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
        <a href="#services" className="flex flex-col items-center justify-center text-foreground/70 hover:text-accent transition">
          <span className="text-sm mb-2">Discover More</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
