import { useState, useEffect } from "react";
import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileMenu from "@/components/MobileMenu";
import ChatbotWidget from "@/components/ChatbotWidget";
import CookieConsent from "@/components/CookieConsent";
import CodeAnimationLoader from "@/components/CodeAnimationLoader";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [showLoader, setShowLoader] = useState(true);
  const [contentLoaded, setContentLoaded] = useState(false);
  
  // Handle animation completion
  const handleLoaderComplete = () => {
    setShowLoader(false);
    setContentLoaded(true);
  };
  
  // Add a class to body to prevent scrolling during animation
  useEffect(() => {
    if (showLoader) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [showLoader]);
  
  return (
    <QueryClientProvider client={queryClient}>
      {showLoader && <CodeAnimationLoader onComplete={handleLoaderComplete} />}
      
      <div className={`flex flex-col min-h-screen transition-opacity duration-500 ${contentLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <Header />
        <MobileMenu />
        <main className="flex-grow pt-16">
          <Router />
        </main>
        <Footer />
        <ChatbotWidget />
        <CookieConsent />
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
