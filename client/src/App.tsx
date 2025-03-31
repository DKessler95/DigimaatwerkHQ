import { useState, useEffect } from "react";
import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Blogs from "@/pages/Blogs";
import Services from "@/pages/Services";
import ServiceCategory from "@/pages/ServiceCategory";
import CaseStudy from "@/pages/CaseStudy";
import Portfolio from "@/pages/Portfolio";
import Dashboard from "@/pages/Dashboard";
import PrivacyPolicy from "@/pages/legal/PrivacyPolicy";
import GooglePrivacyPolicy from "@/pages/legal/GooglePrivacyPolicy";
import TermsOfService from "@/pages/legal/TermsOfService";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileMenu from "@/components/MobileMenu";
import ChatbotWidget from "@/components/ChatbotWidget";
import CookieConsent from "@/components/CookieConsent";
import CodeAnimationLoader from "@/components/CodeAnimationLoader";
import { LanguageProvider } from "@/lib/languageContext";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/blogs" component={Blogs} />
      <Route path="/services" component={Services} />
      <Route path="/services/:category" component={ServiceCategory} />
      <Route path="/case-studies/:slug" component={CaseStudy} />
      <Route path="/portfolio" component={Portfolio} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/google-privacy-policy" component={GooglePrivacyPolicy} />
      <Route path="/terms-of-service" component={TermsOfService} />
      <Route path="/dashboard" component={Dashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Check if user has previously seen the animation or opted to skip it
  const [showLoader, setShowLoader] = useState(() => {
    const hasSeenAnimation = localStorage.getItem('hasSeenAnimation');
    return hasSeenAnimation !== 'true';
  });
  const [contentLoaded, setContentLoaded] = useState(!showLoader);
  
  // Handle animation completion
  const handleLoaderComplete = () => {
    // Save preference to skip animation in future visits
    localStorage.setItem('hasSeenAnimation', 'true');
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
      <LanguageProvider>
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
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
