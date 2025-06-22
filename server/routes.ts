import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertWebhookSchema } from "@shared/schema";
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

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  websiteUrl: string;
  websiteScreenshot: string;
  category: 'web' | 'automation' | 'chatbot';
  displayType?: 'default' | 'bubble' | 'minimal';
  order: number;
  featured: boolean;
  hoverColor?: string;
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
  
  // Redirect /admin root to dashboard
  app.get('/admin', (req: Request, res: Response) => {
    res.redirect('/admin/dashboard.html');
  });
  
  // Create a route to serve CMS content directly
  app.use('/content', express.static(path.join(process.cwd(), 'public/content')));
  
  // Create a route to serve uploaded media
  app.use('/uploads', express.static(path.join(process.cwd(), 'public/uploads')));
  
  // Create a route to serve images from the public/img directory
  app.use('/img', express.static(path.join(process.cwd(), 'public/img')));
  
  // Create a route to serve images from the public/images directory
  app.use('/images', express.static(path.join(process.cwd(), 'public/images')));
  
  // Register API webhooks for Make and n8n integrations
  setupWebhookRoutes(app);
  
  // Webhook management API endpoints
  app.get('/api/webhooks', async (req: Request, res: Response) => {
    try {
      const webhooks = await storage.getAllWebhooks();
      res.json({ success: true, data: webhooks });
    } catch (error) {
      console.error('Error fetching webhooks:', error);
      res.status(500).json({ success: false, message: 'Failed to fetch webhooks' });
    }
  });

  app.get('/api/webhooks/:id', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const webhook = await storage.getWebhook(id);
      
      if (!webhook) {
        return res.status(404).json({ success: false, message: 'Webhook not found' });
      }
      
      res.json({ success: true, data: webhook });
    } catch (error) {
      console.error('Error fetching webhook:', error);
      res.status(500).json({ success: false, message: 'Failed to fetch webhook' });
    }
  });

  app.post('/api/webhooks', async (req: Request, res: Response) => {
    try {
      const validatedData = insertWebhookSchema.parse(req.body);
      const webhook = await storage.createWebhook(validatedData);
      res.status(201).json({ success: true, data: webhook });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, message: 'Validation error', errors: error.errors });
      } else {
        console.error('Error creating webhook:', error);
        res.status(500).json({ success: false, message: 'Failed to create webhook' });
      }
    }
  });

  app.put('/api/webhooks/:id', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertWebhookSchema.parse(req.body);
      const webhook = await storage.updateWebhook(id, validatedData);
      res.json({ success: true, data: webhook });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, message: 'Validation error', errors: error.errors });
      } else {
        console.error('Error updating webhook:', error);
        res.status(500).json({ success: false, message: 'Failed to update webhook' });
      }
    }
  });

  app.delete('/api/webhooks/:id', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteWebhook(id);
      res.json({ success: true, message: 'Webhook deleted successfully' });
    } catch (error) {
      console.error('Error deleting webhook:', error);
      res.status(500).json({ success: false, message: 'Failed to delete webhook' });
    }
  });

  app.get('/api/webhooks/logs', async (req: Request, res: Response) => {
    try {
      const limit = parseInt(req.query.limit as string) || 50;
      // Get logs for all webhooks
      const webhooks = await storage.getAllWebhooks();
      const allLogs = [];
      
      for (const webhook of webhooks) {
        const logs = await storage.getWebhookLogs(webhook.id, Math.floor(limit / webhooks.length) || 1);
        allLogs.push(...logs);
      }
      
      // Sort by triggeredAt descending and limit
      allLogs.sort((a, b) => new Date(b.triggeredAt).getTime() - new Date(a.triggeredAt).getTime());
      const limitedLogs = allLogs.slice(0, limit);
      
      res.json({ success: true, data: limitedLogs });
    } catch (error) {
      console.error('Error fetching webhook logs:', error);
      res.status(500).json({ success: false, message: 'Failed to fetch webhook logs' });
    }
  });

  app.post('/api/webhooks/:id/test', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const webhook = await storage.getWebhook(id);
      
      if (!webhook) {
        return res.status(404).json({ success: false, message: 'Webhook not found' });
      }
      
      if (!webhook.isActive) {
        return res.status(400).json({ success: false, message: 'Webhook is not active' });
      }
      
      const testPayload = {
        test: true,
        eventType: webhook.eventType,
        timestamp: new Date().toISOString(),
        data: { message: 'Test webhook from Digimaatwerk CMS' }
      };
      
      const startTime = Date.now();
      
      try {
        const headers: Record<string, string> = {
          'Content-Type': 'application/json',
          'User-Agent': 'Digimaatwerk-Webhook/1.0'
        };
        
        if (webhook.secretToken) {
          headers['X-Webhook-Token'] = webhook.secretToken;
        }
        
        const response = await fetch(webhook.url, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(testPayload)
        });
        
        const duration = Date.now() - startTime;
        const responseText = await response.text();
        
        // Log the test
        await storage.createWebhookLog({
          webhookId: webhook.id,
          eventType: 'test',
          payload: testPayload,
          responseStatus: response.status,
          responseBody: responseText.substring(0, 1000), // Limit response body length
          duration: duration
        });
        
        res.json({ 
          success: true, 
          status: response.status, 
          duration: duration,
          message: 'Webhook test completed'
        });
        
      } catch (fetchError: any) {
        const duration = Date.now() - startTime;
        
        // Log the error
        await storage.createWebhookLog({
          webhookId: webhook.id,
          eventType: 'test',
          payload: testPayload,
          error: fetchError.message,
          duration: duration
        });
        
        res.status(500).json({ 
          success: false, 
          message: 'Webhook test failed: ' + fetchError.message 
        });
      }
      
    } catch (error) {
      console.error('Error testing webhook:', error);
      res.status(500).json({ success: false, message: 'Failed to test webhook' });
    }
  });
  
  // API endpoint voor website screenshots met fallback naar lokale afbeeldingen
  app.get("/api/website-screenshot", async (req: Request, res: Response) => {
    try {
      const { url, localImage } = req.query;
      
      if (!url || typeof url !== 'string') {
        return res.status(400).json({ error: 'URL is vereist' });
      }
      
      // Lokale afbeelding gebruiken als fallback in plaats van Page2Images API
      const localImagePath = typeof localImage === 'string' ? localImage : '/images/portfolio/fasttaxi.png';
      
      // Success response met lokale afbeelding
      return res.json({ 
        status: "success", 
        image_url: localImagePath 
      });
      
      /* 
      // Originele Page2Images API code (uitgeschakeld vanwege API-limieten)
      const apiKey = process.env.PAGE2IMAGES_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: 'API key is niet geconfigureerd' });
      }
      
      const apiUrl = `https://api.page2images.com/restfullink?p2i_url=${encodeURIComponent(url)}&p2i_key=${apiKey}&p2i_device=6&p2i_screen=1280x800&p2i_size=1280x0`;
      
      const response = await fetch(apiUrl);
      const data = await response.json();
      
      return res.json(data);
      */
    } catch (error) {
      console.error('Screenshot API error:', error);
      return res.status(500).json({ error: 'Er is een fout opgetreden bij het ophalen van de screenshot' });
    }
  });
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
  
  // Delete case study by slug
  app.delete("/api/case-studies/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const language = req.query.lang || 'nl';
      const contentDir = path.join(process.cwd(), 'public/content/case-studies');
      
      // Find all files that start with this slug (to handle all languages)
      const allFiles = await fs.readdir(contentDir);
      const matchingFiles = allFiles.filter(file => 
        file === `${slug}.md` || 
        file.startsWith(`${slug}.`)
      );
      
      if (matchingFiles.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Case study not found"
        });
      }
      
      // Delete each matching file
      for (const file of matchingFiles) {
        const filePath = path.join(contentDir, file);
        await fs.unlink(filePath);
        console.log(`Deleted: ${filePath}`);
      }
      
      // Return success response
      res.status(200).json({
        success: true,
        message: "Case study deleted successfully"
      });
    } catch (error) {
      console.error("Error deleting case study:", error);
      res.status(500).json({
        success: false,
        message: "Failed to delete case study"
      });
    }
  });
  
  // Update case study featured status
  app.patch("/api/case-studies/:slug/featured", async (req, res) => {
    try {
      const { slug } = req.params;
      const { featured } = req.body;
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
      
      // Update the featured status
      parsed.data.featured = featured === true;
      
      // Write the updated content back to the file
      const updatedContent = matter.stringify(parsed.content, parsed.data);
      await fs.writeFile(filePath, updatedContent);
      
      // Return success response
      res.status(200).json({
        success: true,
        message: "Case study updated successfully",
        data: {
          slug,
          ...parsed.data
        }
      });
    } catch (error) {
      console.error("Error updating case study:", error);
      res.status(500).json({
        success: false,
        message: "Failed to update case study"
      });
    }
  });
  
  // Update case study 
  app.patch("/api/case-studies/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const updates = req.body;
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
      
      // Extract content if it was provided
      let markdownContent = parsed.content;
      if (updates.content !== undefined) {
        markdownContent = updates.content;
        delete updates.content; // Remove from updates to avoid storing it in the frontmatter
      }
      
      // Update the metadata
      Object.assign(parsed.data, updates);
      
      // Write the updated content back to the file with new markdown content
      const updatedContent = matter.stringify(markdownContent, parsed.data);
      await fs.writeFile(filePath, updatedContent);
      
      // Return success response
      res.status(200).json({
        success: true,
        message: "Case study updated successfully",
        data: {
          slug,
          ...parsed.data,
          content: markdownContent
        }
      });
    } catch (error) {
      console.error("Error updating case study:", error);
      res.status(500).json({
        success: false,
        message: "Failed to update case study"
      });
    }
  });
  
  // Create new case study
  app.post("/api/case-studies", async (req, res) => {
    try {
      const { title, slug, category, client, description, content, featured } = req.body;
      const language = req.query.lang || 'nl';
      const contentDir = path.join(process.cwd(), 'public/content/case-studies');
      
      // Ensure content directory exists
      try {
        await fs.mkdir(contentDir, { recursive: true });
      } catch (err) {
        // Ignore if directory already exists
      }
      
      // Construct the filename
      const filename = `${slug}.${language}.md`;
      const filePath = path.join(contentDir, filename);
      
      // Check if file already exists
      try {
        await fs.access(filePath);
        return res.status(409).json({
          success: false,
          message: "Case study with this slug already exists"
        });
      } catch (err) {
        // File doesn't exist, this is what we want
      }
      
      // Prepare the data
      const data = {
        title,
        slug,
        category: category || 'Webontwikkeling',
        client: client || '',
        featured: featured || false,
        date: new Date().toISOString(),
        description: description || '',
        featured_image: '/uploads/default-case-study.jpg', // Default image
        industry: '',
        metrics: [],
        challenge: '',
        solution: '',
        result: ''
      };
      
      // Create the file content with frontmatter
      const fileContent = matter.stringify(content || '# New Case Study\n\nAdd content here.', data);
      await fs.writeFile(filePath, fileContent);
      
      // Return success response
      res.status(201).json({
        success: true,
        message: "Case study created successfully",
        data
      });
    } catch (error) {
      console.error("Error creating case study:", error);
      res.status(500).json({
        success: false,
        message: "Failed to create case study"
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
  
  // Delete blog post by slug
  app.delete("/api/blog/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const language = req.query.lang || 'nl';
      const contentDir = path.join(process.cwd(), 'public/content/blog');
      
      // Find all files that start with this slug (to handle all languages)
      const allFiles = await fs.readdir(contentDir);
      const matchingFiles = allFiles.filter(file => 
        file === `${slug}.md` || 
        file.startsWith(`${slug}.`)
      );
      
      if (matchingFiles.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Blog post not found"
        });
      }
      
      // Delete each matching file
      for (const file of matchingFiles) {
        const filePath = path.join(contentDir, file);
        await fs.unlink(filePath);
        console.log(`Deleted: ${filePath}`);
      }
      
      // Return success response
      res.status(200).json({
        success: true,
        message: "Blog post deleted successfully"
      });
    } catch (error) {
      console.error("Error deleting blog post:", error);
      res.status(500).json({
        success: false,
        message: "Failed to delete blog post"
      });
    }
  });
  
  // Update blog post 
  app.patch("/api/blog/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const updates = req.body;
      const language = req.query.lang || 'nl';
      const contentDir = path.join(process.cwd(), 'public/content/blog');
      
      // Construct the expected filename
      const filename = `${slug}.${language}.md`;
      const filePath = path.join(contentDir, filename);
      
      // Check if file exists
      try {
        await fs.access(filePath);
      } catch (err) {
        return res.status(404).json({
          success: false,
          message: "Blog post not found"
        });
      }
      
      // Read and parse the file
      const content = await fs.readFile(filePath, 'utf8');
      const parsed = matter(content);
      
      // Extract content if it was provided
      let markdownContent = parsed.content;
      if (updates.content !== undefined) {
        markdownContent = updates.content;
        delete updates.content; // Remove from updates to avoid storing it in the frontmatter
      }
      
      // Update the metadata
      Object.assign(parsed.data, updates);
      
      // Write the updated content back to the file with new markdown content
      const updatedContent = matter.stringify(markdownContent, parsed.data);
      await fs.writeFile(filePath, updatedContent);
      
      // Return success response
      res.status(200).json({
        success: true,
        message: "Blog post updated successfully",
        data: {
          slug,
          ...parsed.data,
          content: markdownContent
        }
      });
    } catch (error) {
      console.error("Error updating blog post:", error);
      res.status(500).json({
        success: false,
        message: "Failed to update blog post"
      });
    }
  });
  
  // Create new blog post
  app.post("/api/blog", async (req, res) => {
    try {
      const { title, slug, author, categories, tags, excerpt, content } = req.body;
      const language = req.query.lang || 'nl';
      const contentDir = path.join(process.cwd(), 'public/content/blog');
      
      // Ensure content directory exists
      try {
        await fs.mkdir(contentDir, { recursive: true });
      } catch (err) {
        // Ignore if directory already exists
      }
      
      // Construct the filename
      const filename = `${slug}.${language}.md`;
      const filePath = path.join(contentDir, filename);
      
      // Check if file already exists
      try {
        await fs.access(filePath);
        return res.status(409).json({
          success: false,
          message: "Blog post with this slug already exists"
        });
      } catch (err) {
        // File doesn't exist, this is what we want
      }
      
      // Prepare the data
      const data = {
        title,
        slug,
        author: author || 'Damian Kessler',
        date: new Date().toISOString(),
        categories: categories || ['Algemeen'],
        tags: tags || [],
        excerpt: excerpt || '',
        featured_image: '/uploads/default-blog.jpg'
      };
      
      // Create the file content with frontmatter
      const fileContent = matter.stringify(content || '# New Blog Post\n\nAdd content here.', data);
      await fs.writeFile(filePath, fileContent);
      
      // Return success response
      res.status(201).json({
        success: true,
        message: "Blog post created successfully",
        data
      });
    } catch (error) {
      console.error("Error creating blog post:", error);
      res.status(500).json({
        success: false,
        message: "Failed to create blog post"
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
  // Portfolio items endpoint
  app.get("/api/portfolio", async (req, res) => {
    try {
      const language = req.query.lang || 'nl';
      const contentDir = path.join(process.cwd(), 'public/content/portfolio');
      console.log("Portfolio API called with language:", language);
      console.log("Content directory:", contentDir);
      
      // Get all files in the portfolio directory
      const files = await fs.readdir(contentDir);
      console.log("Found files:", files);
      
      // Filter for the requested language
      let languageFiles = [];
      
      if (language === 'nl') {
        // For Dutch, include base .md files without language suffix first
        const baseFiles = files.filter(file => 
          file.endsWith('.md') && !file.includes('.en.') && !file.includes('.nl.')
        );
        // Then add specific .nl.md files 
        const nlFiles = files.filter(file => file.endsWith('.nl.md'));
        
        languageFiles = [...baseFiles, ...nlFiles];
      } else {
        // For other languages just get the language-specific files
        languageFiles = files.filter(file => file.endsWith(`.${language}.md`));
      }
      
      console.log(`Found ${languageFiles.length} files for language ${language}:`, languageFiles);
      console.log("Filtered language files:", languageFiles);
      
      // Read and parse each file
      const portfolioItems: PortfolioItem[] = await Promise.all(
        languageFiles.map(async (file) => {
          const filePath = path.join(contentDir, file);
          const content = await fs.readFile(filePath, 'utf8');
          
          // Parse frontmatter
          const parsed = matter(content);
          
          // Return the portfolio item data
          return {
            ...parsed.data,
          } as PortfolioItem;
        })
      );
      
      // Sort by order and featured
      const sortedItems = portfolioItems.sort((a, b) => {
        // First sort by featured
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        
        // Then sort by order
        return (a.order || 0) - (b.order || 0);
      });
      
      // Return success response
      res.status(200).json({
        success: true,
        data: sortedItems
      });
    } catch (error) {
      console.error("Error fetching portfolio items:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch portfolio items"
      });
    }
  });

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

  // Get a single service by slug
  app.get("/api/services/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const language = req.query.lang || 'nl';
      const contentDir = path.join(process.cwd(), 'public/content/services');
      
      // Construct the expected filename
      const filename = `${slug}.${language}.md`;
      const filePath = path.join(contentDir, filename);
      
      // Check if file exists
      try {
        await fs.access(filePath);
      } catch (err) {
        return res.status(404).json({
          success: false,
          message: "Service not found"
        });
      }
      
      // Read and parse the file
      const content = await fs.readFile(filePath, 'utf8');
      const parsed = matter(content);
      
      // Return the service data
      const service = {
        slug,
        ...parsed.data,
        content: parsed.content.trim()
      } as Service;
      
      res.json({
        success: true,
        data: service
      });
    } catch (error) {
      console.error("Error fetching service:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch service"
      });
    }
  });
  
  // Delete service by slug
  app.delete("/api/services/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const language = req.query.lang || 'nl';
      const contentDir = path.join(process.cwd(), 'public/content/services');
      
      // Find all files that start with this slug (to handle all languages)
      const allFiles = await fs.readdir(contentDir);
      const matchingFiles = allFiles.filter(file => 
        file === `${slug}.md` || 
        file.startsWith(`${slug}.`)
      );
      
      if (matchingFiles.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Service not found"
        });
      }
      
      // Delete each matching file
      for (const file of matchingFiles) {
        const filePath = path.join(contentDir, file);
        await fs.unlink(filePath);
        console.log(`Deleted: ${filePath}`);
      }
      
      // Return success response
      res.status(200).json({
        success: true,
        message: "Service deleted successfully"
      });
    } catch (error) {
      console.error("Error deleting service:", error);
      res.status(500).json({
        success: false,
        message: "Failed to delete service"
      });
    }
  });
  
  // Update service 
  app.patch("/api/services/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const updates = req.body;
      const language = req.query.lang || 'nl';
      const contentDir = path.join(process.cwd(), 'public/content/services');
      
      // Construct the expected filename
      const filename = `${slug}.${language}.md`;
      const filePath = path.join(contentDir, filename);
      
      // Check if file exists
      try {
        await fs.access(filePath);
      } catch (err) {
        return res.status(404).json({
          success: false,
          message: "Service not found"
        });
      }
      
      // Read and parse the file
      const content = await fs.readFile(filePath, 'utf8');
      const parsed = matter(content);
      
      // Extract content if it was provided
      let markdownContent = parsed.content;
      if (updates.content !== undefined) {
        markdownContent = updates.content;
        delete updates.content; // Remove from updates to avoid storing it in the frontmatter
      }
      
      // Update the metadata
      Object.assign(parsed.data, updates);
      
      // Write the updated content back to the file with new markdown content
      const updatedContent = matter.stringify(markdownContent, parsed.data);
      await fs.writeFile(filePath, updatedContent);
      
      // Return success response
      res.status(200).json({
        success: true,
        message: "Service updated successfully",
        data: {
          slug,
          ...parsed.data,
          content: markdownContent
        }
      });
    } catch (error) {
      console.error("Error updating service:", error);
      res.status(500).json({
        success: false,
        message: "Failed to update service"
      });
    }
  });
  
  // Create new service
  app.post("/api/services", async (req, res) => {
    try {
      const { title, slug, icon, short_description, features, tech_stack, content, order } = req.body;
      const language = req.query.lang || 'nl';
      const contentDir = path.join(process.cwd(), 'public/content/services');
      
      // Ensure content directory exists
      try {
        await fs.mkdir(contentDir, { recursive: true });
      } catch (err) {
        // Ignore if directory already exists
      }
      
      // Construct the filename
      const filename = `${slug}.${language}.md`;
      const filePath = path.join(contentDir, filename);
      
      // Check if file already exists
      try {
        await fs.access(filePath);
        return res.status(409).json({
          success: false,
          message: "Service with this slug already exists"
        });
      } catch (err) {
        // File doesn't exist, this is what we want
      }
      
      // Prepare the data
      const data = {
        title: title || '',
        slug,
        icon: icon || 'code',
        short_description: short_description || '',
        featured_image: '/uploads/default-service.jpg',
        order: order || 999,
        features: features || [],
        tech_stack: tech_stack || []
      };
      
      // Create the file content with frontmatter
      const fileContent = matter.stringify(content || '# New Service\n\nAdd content here.', data);
      await fs.writeFile(filePath, fileContent);
      
      // Return success response
      res.status(201).json({
        success: true,
        message: "Service created successfully",
        data
      });
    } catch (error) {
      console.error("Error creating service:", error);
      res.status(500).json({
        success: false,
        message: "Failed to create service"
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
    
    // We accept any credentials in the test/development environment
    // This is only for testing the CMS, in production this would use proper auth
    
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

  // Cookie consent tracking endpoints
  app.post('/api/cookie-consent', async (req: Request, res: Response) => {
    try {
      const consentData = {
        ...req.body,
        ipAddress: req.ip || req.connection.remoteAddress,
        userAgent: req.get('User-Agent'),
        consentGivenAt: new Date()
      };

      const consent = await storage.createCookieConsent(consentData);
      
      // Track analytics event
      await storage.createCookieAnalytics({
        sessionId: consentData.sessionId,
        eventType: 'consent_given',
        eventData: {
          analytics: consentData.analytics,
          marketing: consentData.marketing,
          preferences: consentData.preferences
        },
        timestamp: new Date(),
        pageUrl: consentData.pageUrl,
        userAgent: consentData.userAgent
      });

      res.json({ success: true, data: consent });
    } catch (error) {
      console.error('Cookie consent error:', error);
      res.status(500).json({ error: 'Failed to save cookie consent' });
    }
  });

  app.post('/api/cookie-analytics', async (req: Request, res: Response) => {
    try {
      const analyticsData = {
        ...req.body,
        timestamp: new Date(),
        userAgent: req.get('User-Agent')
      };

      const analytics = await storage.createCookieAnalytics(analyticsData);
      res.json({ success: true, data: analytics });
    } catch (error) {
      console.error('Cookie analytics error:', error);
      res.status(500).json({ error: 'Failed to save cookie analytics' });
    }
  });

  // Admin endpoints for cookie tracking dashboard
  app.get('/api/admin/cookie-stats', requireAuth, async (req: Request, res: Response) => {
    try {
      const { startDate, endDate } = req.query;
      
      const start = startDate ? new Date(startDate as string) : undefined;
      const end = endDate ? new Date(endDate as string) : undefined;
      
      const stats = await storage.getCookieConsentStats(start, end);
      const analyticsStats = await storage.getCookieAnalyticsStats(start, end);
      
      res.json({
        success: true,
        data: {
          consent: stats,
          analytics: analyticsStats
        }
      });
    } catch (error) {
      console.error('Cookie stats error:', error);
      res.status(500).json({ error: 'Failed to get cookie statistics' });
    }
  });

  // GDPR request endpoints
  app.post('/api/gdpr-request', async (req: Request, res: Response) => {
    try {
      const requestData = {
        ...req.body,
        submittedAt: new Date()
      };

      const gdprRequest = await storage.createGdprRequest(requestData);
      res.json({ success: true, data: gdprRequest });
    } catch (error) {
      console.error('GDPR request error:', error);
      res.status(500).json({ error: 'Failed to submit GDPR request' });
    }
  });

  app.get('/api/admin/gdpr-requests', requireAuth, async (req: Request, res: Response) => {
    try {
      const requests = await storage.getAllGdprRequests();
      res.json({ success: true, data: requests });
    } catch (error) {
      console.error('Get GDPR requests error:', error);
      res.status(500).json({ error: 'Failed to get GDPR requests' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
