// Mock for the Replit object that Three.js tries to use
// This prevents the 'Cannot read properties of undefined (reading 'replit')' error
// Note: This is a workaround specifically for running Three.js in Replit

declare global {
  interface Window {
    replit?: any;
    OffscreenCanvas?: any;
  }
}

export function setupReplitMock() {
  if (typeof window !== 'undefined') {
    // Create Replit mock if it doesn't exist
    if (!window.replit) {
      window.replit = {
        // Mock functions and properties needed by Three.js
        getToken: () => 'mock-token',
        environment: {
          isDesktop: false,
          isMobile: false,
          isEmbed: false,
        },
        // Add other properties Three.js/Drei might use
        auth: {
          currentUser: null,
        },
      };
    }
    
    // Add OffscreenCanvas mock if needed
    if (!window.OffscreenCanvas) {
      class MockOffscreenCanvas {
        width: number;
        height: number;
        
        constructor(width: number, height: number) {
          this.width = width;
          this.height = height;
        }
        
        getContext(): any {
          return null;
        }
      }
      
      window.OffscreenCanvas = MockOffscreenCanvas;
    }
    
    // Add other polyfills for Three.js if needed
    if (!window.HTMLCanvasElement.prototype.transferControlToOffscreen) {
      window.HTMLCanvasElement.prototype.transferControlToOffscreen = function() {
        return new window.OffscreenCanvas(this.width, this.height);
      };
    }
  }
}