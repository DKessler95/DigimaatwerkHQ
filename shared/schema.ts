import { pgTable, text, serial, integer, boolean, timestamp, jsonb, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table (keep existing setup)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Contact form submissions
export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company"),
  projectType: text("project_type"),
  message: text("message").notNull(),
  submittedAt: timestamp("submitted_at").notNull(),
  isProcessed: boolean("is_processed").default(false),
});

export const insertContactSubmissionSchema = createInsertSchema(contactSubmissions).pick({
  name: true,
  email: true,
  company: true,
  projectType: true,
  message: true,
  submittedAt: true,
});

// Chat messages
export const chatMessages = pgTable("chat_messages", {
  id: serial("id").primaryKey(),
  message: text("message").notNull(),
  sender: text("sender").notNull(), // 'user' or 'bot'
  timestamp: timestamp("timestamp").notNull(),
});

export const insertChatMessageSchema = createInsertSchema(chatMessages).pick({
  message: true,
  sender: true,
  timestamp: true,
});

// Project estimates
export const projectEstimates = pgTable("project_estimates", {
  id: serial("id").primaryKey(),
  projectType: text("project_type").notNull(),
  scale: text("scale").notNull(),
  features: jsonb("features").notNull(), // Array of feature IDs
  timelinePriority: integer("timeline_priority").notNull(),
  estimatedBudgetMin: integer("estimated_budget_min").notNull(),
  estimatedBudgetMax: integer("estimated_budget_max").notNull(),
  estimatedTimelineMin: integer("estimated_timeline_min").notNull(),
  estimatedTimelineMax: integer("estimated_timeline_max").notNull(),
  createdAt: timestamp("created_at").notNull(),
});

export const insertProjectEstimateSchema = createInsertSchema(projectEstimates).pick({
  projectType: true,
  scale: true,
  features: true,
  timelinePriority: true,
  estimatedBudgetMin: true,
  estimatedBudgetMax: true,
  estimatedTimelineMin: true,
  estimatedTimelineMax: true,
  createdAt: true,
});

// Type definitions
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertContactSubmission = z.infer<typeof insertContactSubmissionSchema>;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;

export type InsertChatMessage = z.infer<typeof insertChatMessageSchema>;
export type ChatMessage = typeof chatMessages.$inferSelect;

export type InsertProjectEstimate = z.infer<typeof insertProjectEstimateSchema>;
export type ProjectEstimate = typeof projectEstimates.$inferSelect;

// Webhooks table
export const webhooks = pgTable("webhooks", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  url: text("url").notNull(),
  eventType: text("event_type").notNull(), // blog.created, contact.submitted, etc.
  secretToken: text("secret_token"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  lastTriggeredAt: timestamp("last_triggered_at"),
  failureCount: integer("failure_count").default(0),
  headers: jsonb("headers").default({}), // Additional headers to send
});

export const insertWebhookSchema = createInsertSchema(webhooks).pick({
  name: true,
  url: true,
  eventType: true,
  secretToken: true,
  isActive: true,
});

export const updateWebhookSchema = createInsertSchema(webhooks).pick({
  name: true,
  url: true,
  eventType: true,
  secretToken: true,
  isActive: true,
  lastTriggeredAt: true,
}).partial();

// API Tokens table
export const apiTokens = pgTable("api_tokens", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  token: varchar("token", { length: 64 }).notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  expiresAt: timestamp("expires_at"),
  lastUsedAt: timestamp("last_used_at"),
  userId: integer("user_id").notNull().references(() => users.id), // Which user created this token
  scopes: jsonb("scopes").notNull().default(['read']), // Array of permission scopes
});

export const insertApiTokenSchema = createInsertSchema(apiTokens).pick({
  name: true,
  token: true,
  expiresAt: true,
  userId: true,
  scopes: true,
});

// Webhook logs to track delivery history
export const webhookLogs = pgTable("webhook_logs", {
  id: serial("id").primaryKey(),
  webhookId: integer("webhook_id").notNull().references(() => webhooks.id),
  eventType: text("event_type").notNull(),
  payload: jsonb("payload").notNull(),
  responseStatus: integer("response_status"),
  responseBody: text("response_body"),
  error: text("error"),
  duration: integer("duration"), // in milliseconds
  triggeredAt: timestamp("triggered_at").notNull().defaultNow(),
});

export const insertWebhookLogSchema = createInsertSchema(webhookLogs).pick({
  webhookId: true,
  eventType: true,
  payload: true,
  responseStatus: true,
  responseBody: true,
  error: true,
  duration: true,
});

export type InsertWebhook = z.infer<typeof insertWebhookSchema>;
export type Webhook = typeof webhooks.$inferSelect;

export type InsertApiToken = z.infer<typeof insertApiTokenSchema>;
export type ApiToken = typeof apiTokens.$inferSelect;

export type InsertWebhookLog = z.infer<typeof insertWebhookLogSchema>;
export type WebhookLog = typeof webhookLogs.$inferSelect;

// Cookie consent tracking
export const cookieConsents = pgTable("cookie_consents", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  necessary: boolean("necessary").notNull().default(true),
  analytics: boolean("analytics").notNull().default(false),
  marketing: boolean("marketing").notNull().default(false),
  preferences: boolean("preferences").notNull().default(false),
  consentGivenAt: timestamp("consent_given_at").notNull(),
  consentUpdatedAt: timestamp("consent_updated_at"),
  language: text("language").default('nl'),
  pageUrl: text("page_url"),
  referrer: text("referrer"),
});

export const insertCookieConsentSchema = createInsertSchema(cookieConsents).pick({
  sessionId: true,
  ipAddress: true,
  userAgent: true,
  necessary: true,
  analytics: true,
  marketing: true,
  preferences: true,
  consentGivenAt: true,
  language: true,
  pageUrl: true,
  referrer: true,
});

// Cookie analytics events
export const cookieAnalytics = pgTable("cookie_analytics", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull(),
  eventType: text("event_type").notNull(), // 'banner_shown', 'settings_opened', 'consent_given', 'consent_updated'
  eventData: jsonb("event_data"), // Additional event details
  timestamp: timestamp("timestamp").notNull(),
  pageUrl: text("page_url"),
  userAgent: text("user_agent"),
});

export const insertCookieAnalyticsSchema = createInsertSchema(cookieAnalytics).pick({
  sessionId: true,
  eventType: true,
  eventData: true,
  timestamp: true,
  pageUrl: true,
  userAgent: true,
});

// GDPR data requests
export const gdprRequests = pgTable("gdpr_requests", {
  id: serial("id").primaryKey(),
  requestType: text("request_type").notNull(), // 'access', 'delete', 'portability', 'rectification'
  email: text("email").notNull(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  requestDetails: text("request_details"),
  status: text("status").notNull().default('pending'), // 'pending', 'processing', 'completed', 'rejected'
  submittedAt: timestamp("submitted_at").notNull(),
  processedAt: timestamp("processed_at"),
  processedBy: integer("processed_by"), // References users.id
  responseNotes: text("response_notes"),
  attachments: jsonb("attachments"), // File paths or metadata
});

export const insertGdprRequestSchema = createInsertSchema(gdprRequests).pick({
  requestType: true,
  email: true,
  firstName: true,
  lastName: true,
  requestDetails: true,
  submittedAt: true,
});

export type InsertCookieConsent = z.infer<typeof insertCookieConsentSchema>;
export type CookieConsent = typeof cookieConsents.$inferSelect;

export type InsertCookieAnalytics = z.infer<typeof insertCookieAnalyticsSchema>;
export type CookieAnalytics = typeof cookieAnalytics.$inferSelect;

export type InsertGdprRequest = z.infer<typeof insertGdprRequestSchema>;
export type GdprRequest = typeof gdprRequests.$inferSelect;
