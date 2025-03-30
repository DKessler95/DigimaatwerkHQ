import { 
  users, type User, type InsertUser,
  contactSubmissions, type ContactSubmission, type InsertContactSubmission,
  chatMessages, type ChatMessage, type InsertChatMessage,
  projectEstimates, type ProjectEstimate, type InsertProjectEstimate,
  webhooks, type Webhook, type InsertWebhook,
  webhookLogs, type WebhookLog, type InsertWebhookLog,
  apiTokens, type ApiToken, type InsertApiToken
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
  
  async updateWebhook(id: number, webhook: Partial<InsertWebhook>): Promise<Webhook> {
    const [updatedWebhook] = await db
      .update(webhooks)
      .set(webhook)
      .where(eq(webhooks.id, id))
      .returning();
    return updatedWebhook;
  }
  
  async deleteWebhook(id: number): Promise<void> {
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
}

export const storage = new DatabaseStorage();
