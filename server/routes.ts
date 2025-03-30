import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import express from "express";
import './types'; // Import session types
import { setupWebhookRoutes } from "./webhooks";

// Define interfaces for CMS content
interface CaseStudy {
  slug: string;
  title: string;
  featured_image: string;
  category: string;
  client: string;
  industry: string;
  date: string;
  description: string;
  challenge: string;
  solution: string;
  result: string;
  metrics: Array<{ label: string; value: string }>;
  featured: boolean;
  content: string;
  [key: string]: any;
}

interface BlogPost {
  slug: string;
  title: string;
  featured_image: string;
  author: string;
  date: string;
  categories: string[];
  tags: string[];
  excerpt: string;
  content: string;
  [key: string]: any;
}

interface Service {
  slug: string;
  title: string;
  icon: string;
  short_description: string;
  featured_image: string;
  order: number;
  features: Array<{ name: string; description: string }>;
  tech_stack: Array<{ name: string; description: string }>;
  content: string;
  [key: string]: any;
}

const contactFormSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().optional(),
  projectType: z.string().optional(),
  message: z.string().min(10),
  consent: z.boolean().refine(val => val === true, {
    message: "You must consent to the privacy policy"
  })
});

const chatMessageSchema = z.object({
  message: z.string().min(1),
  sender: z.enum(["user", "bot"])
});

const projectEstimateSchema = z.object({
  projectType: z.enum(["chatbot", "automation", "web", "combined"]),
  scale: z.enum(["small", "medium", "large"]),
  features: z.array(z.string()),
  timelinePriority: z.number().min(1).max(3)
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Serve node_modules for CMS
  app.use('/node_modules', express.static(path.join(process.cwd(), 'node_modules')));
  
  // Serve CMS admin files directly
  app.use('/admin', express.static(path.join(process.cwd(), 'public/admin')));
  
  // Create a route to serve CMS content directly
  app.use('/content', express.static(path.join(process.cwd(), 'public/content')));
  
  // Create a route to serve uploaded media
  app.use('/uploads', express.static(path.join(process.cwd(), 'public/uploads')));
  
  // Register API webhooks for Make and n8n integrations
  setupWebhookRoutes(app);
  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate the request body
      const formData = contactFormSchema.parse(req.body);
      
      // Store the contact submission
      const submission = await storage.createContactSubmission({
        name: formData.name,
        email: formData.email,
        company: formData.company || "",
        projectType: formData.projectType || "",
        message: formData.message,
        submittedAt: new Date()
      });
      
      // Return success response
      res.status(201).json({
        success: true,
        message: "Contact form submitted successfully",
        data: { 
          id: submission.id,
          submittedAt: submission.submittedAt
        }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false,
          message: "Validation error",
          errors: error.errors
        });
      } else {
        console.error("Contact form error:", error);
        res.status(500).json({ 
          success: false,
          message: "Failed to submit contact form"
        });
      }
    }
  });

  // Save chat message
  app.post("/api/chat", async (req, res) => {
    try {
      // Validate the request body
      const chatData = chatMessageSchema.parse(req.body);
      
      // Store the chat message
      const message = await storage.createChatMessage({
        message: chatData.message,
        sender: chatData.sender,
        timestamp: new Date()
      });
      
      // If it's a user message, generate a bot response (simplified)
      let botResponse = null;
      if (chatData.sender === "user") {
        botResponse = await storage.createChatMessage({
          message: "Thank you for your message. How can I help you further?",
          sender: "bot",
          timestamp: new Date()
        });
      }
      
      // Return success response
      res.status(201).json({
        success: true,
        message: "Chat message saved",
        data: { 
          userMessage: message,
          botResponse
        }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false,
          message: "Validation error",
          errors: error.errors
        });
      } else {
        console.error("Chat message error:", error);
        res.status(500).json({ 
          success: false,
          message: "Failed to save chat message"
        });
      }
    }
  });

  // Project calculator
  app.post("/api/estimate", async (req, res) => {
    try {
      // Validate the request body
      const estimateData = projectEstimateSchema.parse(req.body);
      
      // Base prices by project type and scale
      const basePrice = {
        chatbot: { small: 10000, medium: 15000, large: 25000 },
        automation: { small: 12000, medium: 18000, large: 30000 },
        web: { small: 15000, medium: 22500, large: 37500 },
        combined: { small: 20000, medium: 30000, large: 50000 }
      };
      
      // Feature costs
      const featureCosts: Record<string, number> = {
        "feature1": 1500, // User Authentication
        "feature2": 2000, // CRM Integration
        "feature3": 2500, // Payment Processing
        "feature4": 3000, // Analytics Dashboard
        "feature5": 4000  // 3D Visualizations
      };
      
      // Calculate base cost
      const projectBasePrice = basePrice[estimateData.projectType][estimateData.scale];
      
      // Calculate features cost
      const featuresTotal = estimateData.features.reduce((sum, feature) => {
        return sum + (featureCosts[feature] || 0);
      }, 0);
      
      // Timeline priority multiplier
      const rushMultiplier: Record<number, number> = {
        1: 1,      // Standard
        2: 1.25,   // Expedited
        3: 1.5     // Rush
      };
      
      // Calculate total estimated budget
      const totalEstimate = (projectBasePrice + featuresTotal) * rushMultiplier[estimateData.timelinePriority];
      
      // Timeline calculation
      const baseTimeline = {
        small: 4,
        medium: 6, 
        large: 10
      };
      
      const featureTime = Math.ceil(estimateData.features.length / 2);
      const timeMultiplier: Record<number, number> = {
        1: 1,    // Standard
        2: 0.8,  // Expedited
        3: 0.6   // Rush
      };
      
      const timeline = (baseTimeline[estimateData.scale] + featureTime) * timeMultiplier[estimateData.timelinePriority];
      
      // Store the estimate
      const estimate = await storage.createProjectEstimate({
        projectType: estimateData.projectType,
        scale: estimateData.scale,
        features: estimateData.features,
        timelinePriority: estimateData.timelinePriority,
        estimatedBudgetMin: Math.round(totalEstimate * 0.9),
        estimatedBudgetMax: Math.round(totalEstimate * 1.1),
        estimatedTimelineMin: Math.max(2, Math.floor(timeline * 0.9)),
        estimatedTimelineMax: Math.ceil(timeline * 1.1),
        createdAt: new Date()
      });
      
      // Return success response
      res.status(201).json({
        success: true,
        message: "Project estimate calculated",
        data: estimate
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false,
          message: "Validation error",
          errors: error.errors
        });
      } else {
        console.error("Project estimate error:", error);
        res.status(500).json({ 
          success: false,
          message: "Failed to calculate project estimate"
        });
      }
    }
  });

  // Get CMS content for case studies
  app.get("/api/case-studies", async (req, res) => {
    try {
      const language = req.query.lang || 'nl';
      const contentDir = path.join(process.cwd(), 'public/content/case-studies');
      
      // Get all files in the case-studies directory
      const files = await fs.readdir(contentDir);
      
      // Filter for the requested language or default to .nl.md files
      const languageFiles = files.filter(file => file.endsWith(`.${language}.md`));
      
      // Read and parse each file
      const caseStudies: CaseStudy[] = await Promise.all(
        languageFiles.map(async (file) => {
          const filePath = path.join(contentDir, file);
          const content = await fs.readFile(filePath, 'utf8');
          
          // Parse frontmatter
          const parsed = matter(content);
          
          // Get the slug from the filename (remove language and extension)
          const slug = file.replace(`.${language}.md`, '');
          
          // Return the case study data
          return {
            slug,
            ...parsed.data,
            content: parsed.content.trim()
          } as CaseStudy;
        })
      );
      
      // Sort by featured and date
      const sortedCaseStudies = caseStudies.sort((a, b) => {
        // First sort by featured
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        
        // Then sort by date (most recent first)
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB.getTime() - dateA.getTime();
      });
      
      // Return success response
      res.status(200).json({
        success: true,
        data: sortedCaseStudies
      });
    } catch (error) {
      console.error("Error fetching case studies:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch case studies"
      });
    }
  });
  
  // Get individual case study by slug
  app.get("/api/case-studies/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const language = req.query.lang || 'nl';
      const contentDir = path.join(process.cwd(), 'public/content/case-studies');
      
      // Construct the expected filename
      const filename = `${slug}.${language}.md`;
      const filePath = path.join(contentDir, filename);
      
      // Check if file exists
      try {
        await fs.access(filePath);
      } catch (err) {
        return res.status(404).json({
          success: false,
          message: "Case study not found"
        });
      }
      
      // Read and parse the file
      const content = await fs.readFile(filePath, 'utf8');
      const parsed = matter(content);
      
      // Convert markdown content to HTML using a simple regex-based approach
      // Since we can't use require in this context
      const convertMarkdownToHtml = (markdown: string) => {
        // Basic markdown to HTML conversion
        let html = markdown
          // Convert headers
          .replace(/^# (.*$)/gm, '<h1>$1</h1>')
          .replace(/^## (.*$)/gm, '<h2>$1</h2>')
          .replace(/^### (.*$)/gm, '<h3>$1</h3>')
          // Convert bold
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          // Convert italic
          .replace(/\*(.*?)\*/g, '<em>$1</em>')
          // Convert bullet lists
          .replace(/^- (.*$)/gm, '<li>$1</li>')
          // Wrap list items
          .replace(/(<li>.*<\/li>\n)+/g, (match) => `<ul>${match}</ul>`)
          // Convert number lists
          .replace(/^\d+\. (.*$)/gm, '<li>$1</li>')
          // Wrap number list items
          .replace(/(<li>.*<\/li>\n)+/g, (match) => `<ol>${match}</ol>`)
          // Fix unintended nesting
          .replace(/<\/ul>\n<ul>/g, '')
          .replace(/<\/ol>\n<ol>/g, '')
          // Convert links
          .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-accent hover:underline">$1</a>')
          // Convert blockquotes
          .replace(/^> (.*$)/gm, '<blockquote>$1</blockquote>')
          // Convert code blocks
          .replace(/```([^`]+)```/g, '<pre><code>$1</code></pre>')
          // Convert inline code
          .replace(/`([^`]+)`/g, '<code>$1</code>');
          
        // Convert paragraphs - this must be done last to avoid conflicts
        const lines = html.split('\n');
        let inBlock = false;
        let result = '';
        
        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];
          
          // Skip if line is empty or already contains HTML tags
          if (line.trim() === '' || 
              line.startsWith('<h') || 
              line.startsWith('<ul') || 
              line.startsWith('<ol') || 
              line.startsWith('<li') || 
              line.startsWith('<blockquote') || 
              line.startsWith('<pre>')) {
            result += line + '\n';
            continue;
          }
          
          // Otherwise wrap in paragraph tags
          if (!inBlock) {
            result += '<p>' + line;
            inBlock = true;
          } else {
            result += ' ' + line;
          }
          
          // Close paragraph if next line is empty or a block element
          const nextLine = i < lines.length - 1 ? lines[i + 1] : '';
          if (nextLine.trim() === '' || 
              nextLine.startsWith('<h') || 
              nextLine.startsWith('<ul') || 
              nextLine.startsWith('<ol') || 
              nextLine.startsWith('<li') || 
              nextLine.startsWith('<blockquote') || 
              nextLine.startsWith('<pre>')) {
            result += '</p>\n';
            inBlock = false;
          }
        }
        
        // Close any remaining paragraph
        if (inBlock) {
          result += '</p>\n';
        }
        
        return result;
      };
      
      const htmlContent = convertMarkdownToHtml(parsed.content);
      
      // Return the case study data
      res.status(200).json({
        success: true,
        data: {
          slug,
          ...parsed.data,
          content: htmlContent
        }
      });
    } catch (error) {
      console.error("Error fetching case study:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch case study"
      });
    }
  });
  

  
  // Get blog posts
  app.get("/api/blog", async (req, res) => {
    try {
      const language = req.query.lang || 'nl';
      const contentDir = path.join(process.cwd(), 'public/content/blog');
      
      // Get all files in the blog directory
      const files = await fs.readdir(contentDir);
      
      // Filter for the requested language
      const languageFiles = files.filter(file => file.endsWith(`.${language}.md`));
      
      // Read and parse each file
      const blogPosts: BlogPost[] = await Promise.all(
        languageFiles.map(async (file) => {
          const filePath = path.join(contentDir, file);
          const content = await fs.readFile(filePath, 'utf8');
          
          // Parse frontmatter
          const parsed = matter(content);
          
          // Get the slug from the filename (remove language and extension)
          const slug = file.replace(`.${language}.md`, '');
          
          // Return the blog post data
          return {
            slug,
            ...parsed.data,
            content: parsed.content.trim()
          } as BlogPost;
        })
      );
      
      // Sort by date (most recent first)
      const sortedBlogPosts = blogPosts.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB.getTime() - dateA.getTime();
      });
      
      // Return success response
      res.status(200).json({
        success: true,
        data: sortedBlogPosts
      });
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch blog posts"
      });
    }
  });
  
  // Webhook endpoint for CMS integrations (Make, n8n, etc)
  app.post("/api/webhooks/cms", async (req, res) => {
    try {
      // Validate webhook request
      const authHeader = req.headers.authorization;
      const webhookSecret = process.env.WEBHOOK_SECRET_TOKEN;
      
      if (!webhookSecret) {
        console.log("Webhook secret not configured");
        return res.status(200).json({ message: "Webhook processed (secret not configured)" });
      }
      
      const expectedAuth = `Bearer ${webhookSecret}`;
      
      if (authHeader !== expectedAuth) {
        return res.status(401).json({ success: false, message: "Unauthorized webhook request" });
      }
      
      // Log the webhook payload
      console.log("Received CMS webhook:", JSON.stringify(req.body, null, 2));
      
      // Process based on the event type
      const event = req.body.event || "";
      
      if (event === "publish") {
        const collection = req.body.collection || "";
        const slug = req.body.slug || "";
        const locale = req.body.locale || "nl";
        
        console.log(`Content published: ${collection}/${slug} (${locale})`);
        
        // You could perform additional actions here based on the event
        // Such as updating indexes, sending notifications, etc.
      }
      
      // Successfully processed webhook
      res.status(200).json({ 
        success: true, 
        message: "Webhook processed successfully" 
      });
    } catch (error) {
      console.error("Webhook processing error:", error);
      res.status(500).json({ 
        success: false, 
        message: "Error processing webhook" 
      });
    }
  });
  
  // Get services
  app.get("/api/services", async (req, res) => {
    try {
      const language = req.query.lang || 'nl';
      const contentDir = path.join(process.cwd(), 'public/content/services');
      
      // Get all files in the services directory
      const files = await fs.readdir(contentDir);
      
      // Filter for the requested language
      const languageFiles = files.filter(file => file.endsWith(`.${language}.md`));
      
      // Read and parse each file
      const services: Service[] = await Promise.all(
        languageFiles.map(async (file) => {
          const filePath = path.join(contentDir, file);
          const content = await fs.readFile(filePath, 'utf8');
          
          // Parse frontmatter
          const parsed = matter(content);
          
          // Get the slug from the filename (remove language and extension)
          const slug = file.replace(`.${language}.md`, '');
          
          // Return the service data
          return {
            slug,
            ...parsed.data,
            content: parsed.content.trim()
          } as Service;
        })
      );
      
      // Sort by order field
      const sortedServices = services.sort((a, b) => {
        return (a.order || 999) - (b.order || 999);
      });
      
      // Return success response
      res.status(200).json({
        success: true,
        data: sortedServices
      });
    } catch (error) {
      console.error("Error fetching services:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch services"
      });
    }
  });

  // Set up local CMS authentication backend
  const cmsContentRoot = path.join(process.cwd(), 'public/content');
  const cmsMediaRoot = path.join(process.cwd(), 'public/uploads');
  
  // Default login credentials for CMS (only in development)
  const username = 'admin';
  const password = 'digimaatwerk2024';

  // Manual login endpoint for CMS
  app.post('/api/admin/login', (req, res) => {
    try {
      const { email, password } = req.body;
      
      // Simple authentication for development
      if (email === username && password === password) {
        res.status(200).json({ 
          success: true, 
          token: 'mock-token', 
          email: email 
        });
      } else {
        res.status(401).json({ 
          success: false, 
          message: 'Invalid credentials' 
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Internal server error' 
      });
    }
  });

  // Login route for CMS admin
  app.post('/admin/api/login', (req, res) => {
    const { email, password } = req.body;
    const username = 'admin@digimaatwerk.nl';
    const correctPassword = 'digimaatwerk2025';
    
    if (email === username && password === correctPassword) {
      // Simple session-based auth
      if (!req.session) {
        return res.status(500).json({ 
          success: false, 
          message: "Session management not available" 
        });
      }
      
      // Set session
      req.session.user = { email, isAdmin: true };
      
      return res.status(200).json({
        success: true,
        message: "Login successful",
        data: {
          email: email,
          token: "mock-token" // In production, use a real JWT or similar
        }
      });
    }
    
    return res.status(401).json({
      success: false,
      message: "Invalid credentials"
    });
  });
  
  // Check if user is authenticated
  app.get('/admin/api/auth/check', (req, res) => {
    if (req.session && req.session.user) {
      return res.status(200).json({
        success: true,
        message: "Authenticated",
        data: {
          email: req.session.user.email
        }
      });
    }
    
    return res.status(401).json({
      success: false,
      message: "Not authenticated"
    });
  });
  
  // Authentication check middleware
  const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    if (req.session && req.session.user) {
      return next();
    }
    
    return res.status(401).json({
      success: false,
      message: "Authentication required"
    });
  };
  
  // CMS API routes
  app.post('/admin/api/collections/:collection', requireAuth, async (req, res) => {
    try {
      const { collection } = req.params;
      const data = req.body;
      
      // Ensure content directory exists
      const contentDir = path.join(process.cwd(), 'public/content', collection);
      try {
        await fs.access(contentDir);
      } catch (error) {
        await fs.mkdir(contentDir, { recursive: true });
      }
      
      // Save the content
      const slug = data.slug || Date.now().toString();
      const language = data.language || 'nl';
      const content = matter.stringify(data.content || '', data);
      
      await fs.writeFile(
        path.join(contentDir, `${slug}.${language}.md`),
        content
      );
      
      res.status(201).json({
        success: true,
        message: `${collection} item created`,
        data: { slug, language }
      });
    } catch (error) {
      console.error(`Error saving ${req.params.collection}:`, error);
      res.status(500).json({
        success: false,
        message: "Failed to save content"
      });
    }
  });

  // Webhook management endpoints
  // Get all webhooks
  app.get("/api/webhooks", async (req, res) => {
    try {
      const webhooks = await storage.getAllWebhooks();
      res.json({
        success: true,
        message: "Webhooks retrieved successfully",
        data: webhooks
      });
    } catch (error) {
      console.error("Error fetching webhooks:", error);
      res.status(500).json({
        success: false,
        message: "Failed to retrieve webhooks"
      });
    }
  });

  // Get webhook by ID
  app.get("/api/webhooks/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid webhook ID"
        });
      }

      const webhook = await storage.getWebhook(id);
      if (!webhook) {
        return res.status(404).json({
          success: false,
          message: "Webhook not found"
        });
      }

      res.json({
        success: true,
        message: "Webhook retrieved successfully",
        data: webhook
      });
    } catch (error) {
      console.error("Error fetching webhook:", error);
      res.status(500).json({
        success: false,
        message: "Failed to retrieve webhook"
      });
    }
  });

  // Create webhook
  app.post("/api/webhooks", async (req, res) => {
    try {
      const webhookData = {
        name: req.body.name,
        url: req.body.url,
        eventType: req.body.event_type, // Convert from request field to schema field
        secretToken: req.body.secret_token || null,
        isActive: req.body.is_active === "true" || req.body.is_active === true
      };

      const webhook = await storage.createWebhook(webhookData);
      res.status(201).json({
        success: true,
        message: "Webhook created successfully",
        data: webhook
      });
    } catch (error) {
      console.error("Error creating webhook:", error);
      res.status(500).json({
        success: false,
        message: "Failed to create webhook"
      });
    }
  });

  // Update webhook
  app.put("/api/webhooks/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid webhook ID"
        });
      }

      const webhookData = {
        name: req.body.name,
        url: req.body.url,
        eventType: req.body.event_type, // Convert from request field to schema field
        secretToken: req.body.secret_token || null,
        isActive: req.body.is_active === "true" || req.body.is_active === true
      };

      const webhook = await storage.updateWebhook(id, webhookData);
      res.json({
        success: true,
        message: "Webhook updated successfully",
        data: webhook
      });
    } catch (error) {
      console.error("Error updating webhook:", error);
      res.status(500).json({
        success: false,
        message: "Failed to update webhook"
      });
    }
  });

  // Delete webhook
  app.delete("/api/webhooks/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid webhook ID"
        });
      }

      await storage.deleteWebhook(id);
      res.json({
        success: true,
        message: "Webhook deleted successfully"
      });
    } catch (error) {
      console.error("Error deleting webhook:", error);
      res.status(500).json({
        success: false,
        message: "Failed to delete webhook"
      });
    }
  });

  // API Token endpoints
  // Get all API tokens
  app.get("/api/tokens", requireAuth, async (req, res) => {
    try {
      if (!req.session.user) {
        return res.status(401).json({
          success: false,
          message: "Authentication required"
        });
      }
      
      // In a real app, we would use the user's ID from the session
      // For now, use a placeholder user ID
      const userId = 1;
      
      const tokens = await storage.getAllApiTokens(userId);
      res.json({
        success: true,
        message: "API tokens retrieved successfully",
        data: tokens
      });
    } catch (error) {
      console.error("Error fetching API tokens:", error);
      res.status(500).json({
        success: false,
        message: "Failed to retrieve API tokens"
      });
    }
  });

  // Create API token
  app.post("/api/tokens", requireAuth, async (req, res) => {
    try {
      if (!req.session.user) {
        return res.status(401).json({
          success: false,
          message: "Authentication required"
        });
      }
      
      // In a real app, we would use the user's ID from the session
      // For now, use a placeholder user ID
      const userId = 1;
      
      const tokenValue = generateTokenValue();
      const tokenData = {
        userId: userId,
        name: req.body.name,
        token: tokenValue,
        scopes: req.body.scopes || ["read"],
        expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) // 1 year
      };

      const token = await storage.createApiToken(tokenData);
      res.status(201).json({
        success: true,
        message: "API token created successfully",
        data: {
          ...token,
          plainToken: tokenValue // Only send the token value once!
        }
      });
    } catch (error) {
      console.error("Error creating API token:", error);
      res.status(500).json({
        success: false,
        message: "Failed to create API token"
      });
    }
  });

  // Delete API token
  app.delete("/api/tokens/:id", requireAuth, async (req, res) => {
    try {
      if (!req.session.user) {
        return res.status(401).json({
          success: false,
          message: "Authentication required"
        });
      }
      
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid token ID"
        });
      }

      await storage.deleteApiToken(id);
      res.json({
        success: true,
        message: "API token deleted successfully"
      });
    } catch (error) {
      console.error("Error deleting API token:", error);
      res.status(500).json({
        success: false,
        message: "Failed to delete API token"
      });
    }
  });

  // Helper function to generate a random token value
  function generateTokenValue() {
    return 'tk_' + [...Array(32)]
      .map(() => Math.floor(Math.random() * 16).toString(16))
      .join('');
  }

  const httpServer = createServer(app);
  return httpServer;
}
