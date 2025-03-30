import { Request, Response, Express } from 'express';
import { storage } from './storage';
import { insertContactSubmissionSchema, insertChatMessageSchema, insertProjectEstimateSchema } from '@shared/schema';
import { z } from 'zod';
import crypto from 'crypto';

// Schema's voor webhook data die string datums converteert naar Date objecten
const webhookContactSchema = insertContactSubmissionSchema.extend({
  submittedAt: z.string().transform(str => new Date(str)),
});

const webhookChatSchema = insertChatMessageSchema.extend({
  timestamp: z.string().transform(str => new Date(str)),
});

const webhookEstimateSchema = insertProjectEstimateSchema.extend({
  createdAt: z.string().transform(str => new Date(str)),
});

const webhookSecret = process.env.WEBHOOK_SECRET_TOKEN;

// Beveiligingsmiddleware voor webhooks
const validateWebhookRequest = (req: Request, res: Response, next: Function) => {
  const token = req.headers['x-webhook-token'] as string;
  
  if (!webhookSecret) {
    console.error('WEBHOOK_SECRET_TOKEN environment variable not set');
    return res.status(500).json({ 
      success: false, 
      message: 'Webhook secret not configured on server' 
    });
  }
  
  if (!token || token !== webhookSecret) {
    return res.status(401).json({ 
      success: false, 
      message: 'Unauthorized webhook request' 
    });
  }
  
  next();
};

export const setupWebhookRoutes = (app: Express) => {
  // Make.com / n8n webhook endpoints
  app.post('/api/webhooks/contact-form', validateWebhookRequest, async (req: Request, res: Response) => {
    try {
      const validatedData = webhookContactSchema.parse(req.body);
      const submission = await storage.createContactSubmission(validatedData);
      
      res.status(200).json({ 
        success: true, 
        data: submission,
        message: 'Contact submission successfully processed' 
      });
      
      // Log voor debugging
      console.log(`[Webhook] Contact submission processed: ${submission.id}`);
    } catch (error: any) {
      console.error('[Webhook Error] Contact form submission:', error);
      res.status(400).json({ 
        success: false, 
        message: error.message || 'Invalid submission data' 
      });
    }
  });
  
  app.post('/api/webhooks/chat-message', validateWebhookRequest, async (req: Request, res: Response) => {
    try {
      const validatedData = webhookChatSchema.parse(req.body);
      const message = await storage.createChatMessage(validatedData);
      
      res.status(200).json({ 
        success: true, 
        data: message,
        message: 'Chat message successfully processed' 
      });
      
      // Log voor debugging
      console.log(`[Webhook] Chat message processed: ${message.id}`);
    } catch (error: any) {
      console.error('[Webhook Error] Chat message:', error);
      res.status(400).json({ 
        success: false, 
        message: error.message || 'Invalid message data' 
      });
    }
  });
  
  app.post('/api/webhooks/project-estimate', validateWebhookRequest, async (req: Request, res: Response) => {
    try {
      const validatedData = webhookEstimateSchema.parse(req.body);
      const estimate = await storage.createProjectEstimate(validatedData);
      
      res.status(200).json({ 
        success: true, 
        data: estimate,
        message: 'Project estimate successfully processed' 
      });
      
      // Log voor debugging
      console.log(`[Webhook] Project estimate processed: ${estimate.id}`);
    } catch (error: any) {
      console.error('[Webhook Error] Project estimate:', error);
      res.status(400).json({ 
        success: false, 
        message: error.message || 'Invalid estimate data' 
      });
    }
  });

  // Webhook voor content synchronisatie (voor Make/n8n)
  app.post('/api/webhooks/content-sync', validateWebhookRequest, async (req: Request, res: Response) => {
    try {
      const { contentType, action, data } = req.body;
      
      if (!contentType || !action || !data) {
        return res.status(400).json({
          success: false,
          message: 'Missing required fields: contentType, action, data'
        });
      }
      
      // Hier zou je code kunnen toevoegen om content te synchroniseren
      // bijv. het aanmaken/bijwerken van content bestanden
      
      console.log(`[Webhook] Content sync: ${contentType} - ${action}`);
      
      // Voorbeeld van een succes respons
      res.status(200).json({
        success: true,
        message: `Content ${action} request processed for ${contentType}`
      });
    } catch (error: any) {
      console.error('[Webhook Error] Content sync:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Error processing content sync webhook'
      });
    }
  });
  
  // Helper route om webhook configuratie te testen
  app.get('/api/webhooks/test', validateWebhookRequest, (req: Request, res: Response) => {
    res.status(200).json({
      success: true,
      message: 'Webhook authentication successful',
      timestamp: new Date().toISOString()
    });
  });
};