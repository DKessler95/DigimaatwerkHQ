export interface ContactFormData {
  name: string;
  email: string;
  company: string;
  projectType: string;
  message: string;
  consent: boolean;
}

export interface ChatMessage {
  sender: 'bot' | 'user';
  message: string;
  timestamp?: Date;
}

export interface ProjectEstimate {
  id: string;
  projectType: 'chatbot' | 'automation' | 'web' | 'combined';
  scale: 'small' | 'medium' | 'large';
  features: string[];
  timelinePriority: number;
  estimatedBudgetMin: number;
  estimatedBudgetMax: number;
  estimatedTimelineMin: number;
  estimatedTimelineMax: number;
  createdAt: Date;
}

export interface Testimonial {
  name: string;
  position: string;
  company: string;
  quote: string;
  rating: number;
}

export interface CaseStudy {
  id: string;
  title: string;
  category: string;
  description: string;
  challenge: string;
  solution: string;
  result: string;
  metrics: {
    label: string;
    value: string;
  }[];
  imageUrl: string;
  client: string;
  industry: string;
  featured: boolean;
}
