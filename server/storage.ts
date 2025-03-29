import { 
  users, type User, type InsertUser,
  contactSubmissions, type ContactSubmission, type InsertContactSubmission,
  chatMessages, type ChatMessage, type InsertChatMessage,
  projectEstimates, type ProjectEstimate, type InsertProjectEstimate
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

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
}

export const storage = new DatabaseStorage();
