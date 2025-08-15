# Personal Portfolio Website

## Overview

A modern full-stack portfolio website built with React, Express, and PostgreSQL. The application features a professional design with sections for personal information, skills, projects, services, and a contact form. It showcases technical expertise through a clean, responsive interface with smooth animations and professional styling using shadcn/ui components.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development
- **UI Library**: shadcn/ui components built on Radix UI primitives for accessible, customizable components
- **Styling**: Tailwind CSS with CSS variables for consistent theming and responsive design
- **State Management**: React Query (@tanstack/react-query) for server state management and caching
- **Form Handling**: React Hook Form with Zod validation for robust form management
- **Routing**: Wouter for lightweight client-side routing
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Framework**: Express.js with TypeScript for RESTful API development
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Storage Pattern**: Storage abstraction layer with in-memory implementation for development
- **API Structure**: RESTful endpoints with consistent error handling and logging middleware
- **Session Management**: Express session handling with PostgreSQL session store

### Data Layer
- **Database**: PostgreSQL configured for production use
- **Schema Management**: Drizzle Kit for database migrations and schema management
- **Validation**: Zod schemas shared between client and server for consistent data validation
- **Tables**: Users table for authentication and contact_submissions table for form data

### Development Features
- **Hot Reloading**: Vite development server with HMR for fast iteration
- **Error Handling**: Runtime error overlay in development with comprehensive error boundaries
- **TypeScript**: Strict type checking across the entire application
- **Path Aliases**: Configured import aliases for cleaner code organization

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database connectivity optimized for serverless environments
- **drizzle-orm**: Type-safe ORM for database operations
- **@tanstack/react-query**: Server state management and data fetching
- **react-hook-form**: Form state management with minimal re-renders
- **zod**: Runtime type validation for form data and API contracts

### UI Components
- **@radix-ui/***: Comprehensive set of accessible UI primitives (dialogs, forms, navigation, etc.)
- **tailwindcss**: Utility-first CSS framework for styling
- **class-variance-authority**: Type-safe variant management for component styling
- **cmdk**: Command palette component for enhanced user experience

### Development Tools
- **typescript**: Static type checking for enhanced code quality
- **vite**: Fast build tool and development server
- **esbuild**: Fast JavaScript bundler for production builds
- **tsx**: TypeScript execution engine for server development

### Session & Security
- **connect-pg-simple**: PostgreSQL session store for Express sessions
- **express**: Web framework for API endpoints and middleware