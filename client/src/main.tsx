import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Prevent unexpected page refreshes
window.addEventListener('beforeunload', (e) => {
  // Only prevent unload if there's actual unsaved work
  // This prevents accidental refreshes but allows intentional navigation
  if (window.location.pathname === '/' && !document.hidden) {
    // Allow refresh but log it for debugging
    console.log('Page refresh detected');
  }
});

// Handle errors gracefully to prevent crashes that might cause refreshes
window.addEventListener('error', (e) => {
  console.error('Global error caught:', e.error);
  e.preventDefault(); // Prevent default error handling that might cause refresh
});

window.addEventListener('unhandledrejection', (e) => {
  console.error('Unhandled promise rejection:', e.reason);
  e.preventDefault(); // Prevent default handling
});

createRoot(document.getElementById("root")!).render(<App />);
