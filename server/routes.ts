import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";

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
      const rushMultiplier = {
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
      const timeMultiplier = {
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

  const httpServer = createServer(app);
  return httpServer;
}
