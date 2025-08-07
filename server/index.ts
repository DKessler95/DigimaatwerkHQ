import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import session from "express-session";
import MemoryStore from "memorystore";
import path from "path";
import './types'; // Import session types
import { startCMSProxy } from "./cms-proxy";
import { sendContactEmailViaResend } from "./email-resend";

// Create memory store for sessions
const MemoryStoreSession = MemoryStore(session);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set up session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'digimaatwerk-session-secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 86400000 }, // 1 day
  store: new MemoryStoreSession({
    checkPeriod: 86400000 // prune expired entries every 24h
  })
}));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  // Expliciete route voor publieke statische bestanden
  app.use(express.static(path.join(process.cwd(), 'public')));
  
  // Specifieke route voor afbeeldingen om te voorkomen dat ze worden blokkeerd door catch-all routes
  app.use('/images', express.static(path.join(process.cwd(), 'public/images')));

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // Use PORT environment variable for production (Render) or default to 5000 for development
  const port = process.env.PORT || 5000;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, async () => {
    log(`serving on port ${port}`);
    
    // Only start CMS proxy in development
    if (app.get("env") === "development") {
      const cmsProxy = startCMSProxy();
      
      // Cleanup proxy on server close
      server.on('close', () => {
        if (cmsProxy) {
          cmsProxy.kill();
        }
      });
    }

    // Initialize database tables if needed (for production deployment)
    try {
      console.log('Checking database schema...');
      
      // Create contact_submissions table if it doesn't exist (for production)
      if (process.env.NODE_ENV === 'production') {
        const { db } = await import('./db.js');
        await db.execute(`
          CREATE TABLE IF NOT EXISTS contact_submissions (
            id SERIAL PRIMARY KEY,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            company TEXT,
            project_type TEXT,
            message TEXT NOT NULL,
            submitted_at TIMESTAMP NOT NULL,
            is_processed BOOLEAN DEFAULT false
          );
        `);
        console.log('✅ Database schema verified');
      }
    } catch (error) {
      console.error('⚠️  Database schema check failed:', error);
    }

    // Test Resend email service on startup
    if (process.env.RESEND_API_KEY && process.env.NODE_ENV === 'development') {
      console.log('Testing Resend email service...');
      try {
        await sendContactEmailViaResend({
          name: 'Damian Kessler - Startup Test',
          email: 'dckessler95@gmail.com',
          company: 'Digimaatwerk',
          projectType: 'Resend Email Test',
          message: 'Dit is een automatische test van de Resend email service bij het opstarten van de server.'
        });
        console.log('✅ Resend email test successful!');
      } catch (error) {
        console.error('❌ Resend email test failed:', error);
      }
    } else if (!process.env.RESEND_API_KEY) {
      console.log('⚠️  RESEND_API_KEY not found - skipping email test');
    }
  });
})();
