import { 
  users, type User, type InsertUser,
  contactSubmissions, type ContactSubmission, type InsertContactSubmission,
  chatMessages, type ChatMessage, type InsertChatMessage,
  projectEstimates, type ProjectEstimate, type InsertProjectEstimate,
  webhooks, type Webhook, type InsertWebhook,
  webhookLogs, type WebhookLog, type InsertWebhookLog,
  apiTokens, type ApiToken, type InsertApiToken,
  cookieConsents, type CookieConsent, type InsertCookieConsent,
  cookieAnalytics, type CookieAnalytics, type InsertCookieAnalytics,
  gdprRequests, type GdprRequest, type InsertGdprRequest
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and } from "drizzle-orm";

// Expanded interface to support all tables
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Contact submission operations
  getContactSubmission(id: number): Promise<ContactSubmission | undefined>;
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  getAllContactSubmissions(): Promise<ContactSubmission[]>;
  markContactSubmissionAsProcessed(id: number): Promise<void>;
  
  // Chat message operations
  getChatMessage(id: number): Promise<ChatMessage | undefined>;
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
  getChatMessageHistory(limit?: number): Promise<ChatMessage[]>;
  
  // Project estimate operations
  getProjectEstimate(id: number): Promise<ProjectEstimate | undefined>;
  createProjectEstimate(estimate: InsertProjectEstimate): Promise<ProjectEstimate>;
  getAllProjectEstimates(): Promise<ProjectEstimate[]>;
  
  // Webhook operations
  getWebhook(id: number): Promise<Webhook | undefined>;
  createWebhook(webhook: InsertWebhook): Promise<Webhook>;
  updateWebhook(id: number, webhook: Partial<InsertWebhook>): Promise<Webhook>;
  deleteWebhook(id: number): Promise<void>;
  getAllWebhooks(): Promise<Webhook[]>;
  getWebhooksByEventType(eventType: string): Promise<Webhook[]>;
  
  // Webhook log operations
  createWebhookLog(log: InsertWebhookLog): Promise<WebhookLog>;
  getWebhookLogs(webhookId: number, limit?: number): Promise<WebhookLog[]>;
  
  // API Token operations
  getApiToken(id: number): Promise<ApiToken | undefined>;
  getApiTokenByValue(token: string): Promise<ApiToken | undefined>;
  createApiToken(token: InsertApiToken): Promise<ApiToken>;
  deleteApiToken(id: number): Promise<void>;
  getAllApiTokens(userId: number): Promise<ApiToken[]>;
  updateApiTokenLastUsed(id: number): Promise<void>;
  
  // Cookie consent operations
  createCookieConsent(consent: InsertCookieConsent): Promise<CookieConsent>;
  updateCookieConsent(sessionId: string, consent: Partial<InsertCookieConsent>): Promise<CookieConsent>;
  getCookieConsentBySession(sessionId: string): Promise<CookieConsent | undefined>;
  getCookieConsentStats(startDate?: Date, endDate?: Date): Promise<any>;
  
  // Cookie analytics operations
  createCookieAnalytics(analytics: InsertCookieAnalytics): Promise<CookieAnalytics>;
  getCookieAnalyticsBySession(sessionId: string): Promise<CookieAnalytics[]>;
  getCookieAnalyticsStats(startDate?: Date, endDate?: Date): Promise<any>;
  
  // GDPR request operations
  createGdprRequest(request: InsertGdprRequest): Promise<GdprRequest>;
  getGdprRequest(id: number): Promise<GdprRequest | undefined>;
  getAllGdprRequests(): Promise<GdprRequest[]>;
  updateGdprRequestStatus(id: number, status: string, processedBy?: number, responseNotes?: string): Promise<GdprRequest>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }
  
  // Contact submission operations
  async getContactSubmission(id: number): Promise<ContactSubmission | undefined> {
    const [submission] = await db.select().from(contactSubmissions).where(eq(contactSubmissions.id, id));
    return submission;
  }
  
  async createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    const [contactSubmission] = await db
      .insert(contactSubmissions)
      .values(submission)
      .returning();
    return contactSubmission;
  }
  
  async getAllContactSubmissions(): Promise<ContactSubmission[]> {
    return await db.select().from(contactSubmissions).orderBy(contactSubmissions.submittedAt);
  }
  
  async markContactSubmissionAsProcessed(id: number): Promise<void> {
    await db
      .update(contactSubmissions)
      .set({ isProcessed: true })
      .where(eq(contactSubmissions.id, id));
  }
  
  // Chat message operations
  async getChatMessage(id: number): Promise<ChatMessage | undefined> {
    const [message] = await db.select().from(chatMessages).where(eq(chatMessages.id, id));
    return message;
  }
  
  async createChatMessage(message: InsertChatMessage): Promise<ChatMessage> {
    const [chatMessage] = await db
      .insert(chatMessages)
      .values(message)
      .returning();
    return chatMessage;
  }
  
  async getChatMessageHistory(limit: number = 50): Promise<ChatMessage[]> {
    return await db
      .select()
      .from(chatMessages)
      .orderBy(chatMessages.timestamp)
      .limit(limit);
  }
  
  // Project estimate operations
  async getProjectEstimate(id: number): Promise<ProjectEstimate | undefined> {
    const [estimate] = await db.select().from(projectEstimates).where(eq(projectEstimates.id, id));
    return estimate;
  }
  
  async createProjectEstimate(estimate: InsertProjectEstimate): Promise<ProjectEstimate> {
    const [projectEstimate] = await db
      .insert(projectEstimates)
      .values(estimate)
      .returning();
    return projectEstimate;
  }
  
  async getAllProjectEstimates(): Promise<ProjectEstimate[]> {
    return await db.select().from(projectEstimates).orderBy(projectEstimates.createdAt);
  }
  
  // Webhook operations
  async getWebhook(id: number): Promise<Webhook | undefined> {
    const [webhook] = await db.select().from(webhooks).where(eq(webhooks.id, id));
    return webhook;
  }
  
  async createWebhook(webhook: InsertWebhook): Promise<Webhook> {
    const [newWebhook] = await db
      .insert(webhooks)
      .values({
        ...webhook,
        createdAt: new Date()
      })
      .returning();
    return newWebhook;
  }
  
  async updateWebhook(id: number, webhook: Partial<InsertWebhook & { lastTriggeredAt?: Date }>): Promise<Webhook> {
    const [updatedWebhook] = await db
      .update(webhooks)
      .set(webhook)
      .where(eq(webhooks.id, id))
      .returning();
    return updatedWebhook;
  }
  
  async deleteWebhook(id: number): Promise<void> {
    // First delete related webhook logs
    await db.delete(webhookLogs).where(eq(webhookLogs.webhookId, id));
    // Then delete the webhook
    await db.delete(webhooks).where(eq(webhooks.id, id));
  }
  
  async getAllWebhooks(): Promise<Webhook[]> {
    return await db
      .select()
      .from(webhooks)
      .orderBy(webhooks.createdAt);
  }
  
  async getWebhooksByEventType(eventType: string): Promise<Webhook[]> {
    return await db
      .select()
      .from(webhooks)
      .where(and(
        eq(webhooks.eventType, eventType),
        eq(webhooks.isActive, true)
      ));
  }
  
  // Webhook log operations
  async createWebhookLog(log: InsertWebhookLog): Promise<WebhookLog> {
    const [webhookLog] = await db
      .insert(webhookLogs)
      .values({
        ...log,
        triggeredAt: new Date()
      })
      .returning();
    return webhookLog;
  }
  
  async getWebhookLogs(webhookId: number, limit: number = 100): Promise<WebhookLog[]> {
    return await db
      .select()
      .from(webhookLogs)
      .where(eq(webhookLogs.webhookId, webhookId))
      .orderBy(desc(webhookLogs.triggeredAt))
      .limit(limit);
  }
  
  // API Token operations
  async getApiToken(id: number): Promise<ApiToken | undefined> {
    const [token] = await db.select().from(apiTokens).where(eq(apiTokens.id, id));
    return token;
  }
  
  async getApiTokenByValue(token: string): Promise<ApiToken | undefined> {
    const [apiToken] = await db.select().from(apiTokens).where(eq(apiTokens.token, token));
    return apiToken;
  }
  
  async createApiToken(token: InsertApiToken): Promise<ApiToken> {
    const [newToken] = await db
      .insert(apiTokens)
      .values({
        ...token,
        createdAt: new Date()
      })
      .returning();
    return newToken;
  }
  
  async deleteApiToken(id: number): Promise<void> {
    await db.delete(apiTokens).where(eq(apiTokens.id, id));
  }
  
  async getAllApiTokens(userId: number): Promise<ApiToken[]> {
    return await db
      .select()
      .from(apiTokens)
      .where(eq(apiTokens.userId, userId))
      .orderBy(apiTokens.createdAt);
  }
  
  async updateApiTokenLastUsed(id: number): Promise<void> {
    await db
      .update(apiTokens)
      .set({ lastUsedAt: new Date() })
      .where(eq(apiTokens.id, id));
  }

  // Cookie consent operations
  async createCookieConsent(consent: InsertCookieConsent): Promise<CookieConsent> {
    const [cookieConsent] = await db
      .insert(cookieConsents)
      .values(consent)
      .returning();
    return cookieConsent;
  }

  async updateCookieConsent(sessionId: string, consent: Partial<InsertCookieConsent>): Promise<CookieConsent> {
    const [updated] = await db
      .update(cookieConsents)
      .set({ ...consent, consentUpdatedAt: new Date() })
      .where(eq(cookieConsents.sessionId, sessionId))
      .returning();
    return updated;
  }

  async getCookieConsentBySession(sessionId: string): Promise<CookieConsent | undefined> {
    const [consent] = await db
      .select()
      .from(cookieConsents)
      .where(eq(cookieConsents.sessionId, sessionId))
      .orderBy(desc(cookieConsents.consentGivenAt))
      .limit(1);
    return consent || undefined;
  }

  async getCookieConsentStats(startDate?: Date, endDate?: Date): Promise<any> {
    let query = db.select().from(cookieConsents);
    
    if (startDate && endDate) {
      query = query.where(
        and(
          gte(cookieConsents.consentGivenAt, startDate),
          lte(cookieConsents.consentGivenAt, endDate)
        )
      );
    }
    
    const consents = await query;
    
    const total = consents.length;
    const analytics = consents.filter(c => c.analytics).length;
    const marketing = consents.filter(c => c.marketing).length;
    const preferences = consents.filter(c => c.preferences).length;
    
    return {
      total,
      analytics: { count: analytics, percentage: total > 0 ? (analytics / total) * 100 : 0 },
      marketing: { count: marketing, percentage: total > 0 ? (marketing / total) * 100 : 0 },
      preferences: { count: preferences, percentage: total > 0 ? (preferences / total) * 100 : 0 },
      dailyStats: this.groupConsentsByDate(consents)
    };
  }

  private groupConsentsByDate(consents: CookieConsent[]) {
    const grouped = consents.reduce((acc, consent) => {
      const date = consent.consentGivenAt.toISOString().split('T')[0];
      if (!acc[date]) {
        acc[date] = { total: 0, analytics: 0, marketing: 0, preferences: 0 };
      }
      acc[date].total++;
      if (consent.analytics) acc[date].analytics++;
      if (consent.marketing) acc[date].marketing++;
      if (consent.preferences) acc[date].preferences++;
      return acc;
    }, {} as Record<string, any>);
    
    return Object.entries(grouped).map(([date, stats]) => ({ date, ...stats }));
  }

  // Cookie analytics operations
  async createCookieAnalytics(analytics: InsertCookieAnalytics): Promise<CookieAnalytics> {
    const [cookieAnalytics] = await db
      .insert(cookieAnalytics)
      .values(analytics)
      .returning();
    return cookieAnalytics;
  }

  async getCookieAnalyticsBySession(sessionId: string): Promise<CookieAnalytics[]> {
    return await db
      .select()
      .from(cookieAnalytics)
      .where(eq(cookieAnalytics.sessionId, sessionId))
      .orderBy(desc(cookieAnalytics.timestamp));
  }

  async getCookieAnalyticsStats(startDate?: Date, endDate?: Date): Promise<any> {
    let query = db.select().from(cookieAnalytics);
    
    if (startDate && endDate) {
      query = query.where(
        and(
          gte(cookieAnalytics.timestamp, startDate),
          lte(cookieAnalytics.timestamp, endDate)
        )
      );
    }
    
    const events = await query;
    
    const eventCounts = events.reduce((acc, event) => {
      acc[event.eventType] = (acc[event.eventType] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return {
      totalEvents: events.length,
      eventTypes: eventCounts,
      dailyEvents: this.groupEventsByDate(events)
    };
  }

  private groupEventsByDate(events: CookieAnalytics[]) {
    const grouped = events.reduce((acc, event) => {
      const date = event.timestamp.toISOString().split('T')[0];
      if (!acc[date]) {
        acc[date] = {};
      }
      acc[date][event.eventType] = (acc[date][event.eventType] || 0) + 1;
      return acc;
    }, {} as Record<string, any>);
    
    return Object.entries(grouped).map(([date, events]) => ({ date, ...events }));
  }

  // GDPR request operations
  async createGdprRequest(request: InsertGdprRequest): Promise<GdprRequest> {
    const [gdprRequest] = await db
      .insert(gdprRequests)
      .values(request)
      .returning();
    return gdprRequest;
  }

  async getGdprRequest(id: number): Promise<GdprRequest | undefined> {
    const [request] = await db
      .select()
      .from(gdprRequests)
      .where(eq(gdprRequests.id, id));
    return request || undefined;
  }

  async getAllGdprRequests(): Promise<GdprRequest[]> {
    return await db
      .select()
      .from(gdprRequests)
      .orderBy(desc(gdprRequests.submittedAt));
  }

  async updateGdprRequestStatus(id: number, status: string, processedBy?: number, responseNotes?: string): Promise<GdprRequest> {
    const updateData: any = {
      status,
      processedAt: new Date()
    };
    
    if (processedBy) updateData.processedBy = processedBy;
    if (responseNotes) updateData.responseNotes = responseNotes;
    
    const [updated] = await db
      .update(gdprRequests)
      .set(updateData)
      .where(eq(gdprRequests.id, id))
      .returning();
    return updated;
  }
}

export const storage = new DatabaseStorage();
