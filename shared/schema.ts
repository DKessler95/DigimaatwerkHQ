import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
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
