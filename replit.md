# Project Calculator & Digital Agency Platform

## Overview

This is a full-stack web application for Digimaatwerk - a Dutch digital transformation agency specializing in AI chatbots, workflow automation, and web development. The platform serves as both a marketing website and a project calculator tool that helps clients estimate costs for various digital services.

## System Architecture

The application follows a modern full-stack architecture with the following structure:

- **Frontend**: React-based SPA built with Vite
- **Backend**: Express.js server with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Deployment**: Replit infrastructure with autoscale deployment
- **Content Management**: Netlify CMS integration for blog posts and case studies

## Key Components

### Frontend Architecture
- **React + TypeScript**: Modern component-based UI with type safety
- **Radix UI Components**: Comprehensive UI component library for consistent design
- **Tailwind CSS**: Utility-first CSS framework with professional theme
- **React Three Fiber**: 3D visualizations for enhanced user experience
- **Tanstack Query**: Data fetching and caching for API interactions

### Backend Architecture
- **Express.js**: RESTful API server with middleware support
- **Session Management**: Express-session with memory store
- **File Structure**: Clean separation of concerns with dedicated modules for routes, storage, and database operations

### Database Schema
The application uses PostgreSQL with the following main tables:
- `users`: User authentication and management
- `contact_submissions`: Contact form submissions with processing status
- `chat_messages`: Chat history for AI chatbot interactions
- `project_estimates`: Stored project calculations
- `webhooks` & `webhook_logs`: Webhook management system
- `cookie_consents` & `gdpr_requests`: GDPR compliance tracking

### Content Management
- **Multilingual Support**: Dutch (default) and English content
- **Netlify CMS**: Admin interface for managing blog posts, case studies, and portfolio items
- **Markdown-based**: Content stored as markdown files with frontmatter metadata
- **Media Management**: Integrated file upload and management system

## Data Flow

1. **User Interaction**: Users interact with the React frontend
2. **API Communication**: Frontend communicates with Express backend via REST APIs
3. **Database Operations**: Backend performs CRUD operations using Drizzle ORM
4. **Content Delivery**: Static content served from markdown files, dynamic content from database
5. **Webhook Processing**: External integrations trigger automated workflows

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database connection
- **drizzle-orm**: Type-safe ORM for database operations
- **@n8n/chat**: AI chatbot integration component
- **Stripe**: Payment processing for e-commerce functionality

### Development Tools
- **Vite**: Fast build tool and development server
- **TypeScript**: Static type checking
- **ESBuild**: Fast JavaScript bundler for production builds

### UI/UX Libraries
- **Radix UI**: Accessible component primitives
- **React Three Fiber**: 3D graphics and animations
- **Class Variance Authority**: Type-safe CSS class management

## Deployment Strategy

The application is configured for Replit's autoscale deployment with:

- **Development**: `npm run dev` starts both frontend and backend in parallel
- **Build Process**: Vite builds frontend, ESBuild bundles backend
- **Production**: Node.js serves the bundled application
- **Database**: Automated migrations with `npm run db:push`
- **Port Configuration**: Frontend on 5000, admin interface on 8081

## User Preferences

Preferred communication style: Simple, everyday language.
Owner name: Damian (not Dennis)

## Changelog

Changelog:
- June 23, 2025. Initial setup
- June 24, 2025. Email configuration completed with Strato mailserver (smtp.strato.de:465) using info@digimaatwerk.nl. Contact form now sends notification emails to info@digimaatwerk.nl and confirmation emails to users. Email verification successful and emails confirmed delivered.