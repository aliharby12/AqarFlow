# Overview

This is a comprehensive real estate platform called "وصل للتقنيات العقارية" (Wasl Real Estate Technologies) built for the Saudi Arabian market. The application provides four main services: AI-powered architectural design generation, real estate market analysis, property listings with investment analysis, and a real estate agent directory. The platform features a modern React frontend with a Node.js/Express backend, utilizing AI services for design generation and comprehensive data management for real estate operations.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **UI Framework**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with Arabic (RTL) language support
- **State Management**: TanStack React Query for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation
- **Design Pattern**: Component-based architecture with reusable UI components organized by feature

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Pattern**: RESTful API design with route-based organization
- **Error Handling**: Centralized error handling middleware with structured error responses
- **Logging**: Custom logging middleware for API request tracking
- **Development**: Hot module replacement with Vite integration

## Data Storage Solutions
- **Database**: PostgreSQL with Drizzle ORM
- **Schema Management**: Drizzle Kit for migrations and schema management
- **In-Memory Storage**: MemStorage class for development/testing with sample data initialization
- **File Storage**: Google Cloud Storage integration for image and document management
- **Data Models**: Strongly typed schemas for design requests, properties, agents, agencies, and market data

## Authentication and Authorization
- Currently using session-based authentication patterns
- API request interceptors with credential handling
- Unauthorized request handling with configurable behavior (return null or throw)

## External Service Integrations
- **AI Services**: OpenAI GPT-5 integration for architectural design generation and image creation
- **File Upload**: Uppy.js integration for file handling with AWS S3 and Google Cloud Storage support
- **PDF Generation**: Custom PDF generation service for design documentation
- **Database**: Neon Database serverless PostgreSQL integration

## Key Architectural Decisions

### Multi-Service Platform Design
**Problem**: Need to provide diverse real estate services in a single platform
**Solution**: Modular section-based architecture with shared navigation and state management
**Benefits**: Unified user experience while maintaining feature separation and scalability

### AI-Powered Design Generation
**Problem**: Provide architectural design services without human architects
**Solution**: Integration with OpenAI API for generating detailed Arabic architectural descriptions and design images
**Benefits**: Scalable design generation with cultural and regional awareness for Saudi market

### RTL (Right-to-Left) Language Support
**Problem**: Proper Arabic language support throughout the application
**Solution**: Comprehensive RTL styling with Tailwind CSS and Arabic font integration (Cairo font family)
**Benefits**: Native Arabic user experience with proper text direction and cultural design patterns

### Hybrid Storage Architecture
**Problem**: Need for both development flexibility and production scalability
**Solution**: Abstracted storage interface (IStorage) with multiple implementations (MemStorage for development, database for production)
**Benefits**: Easy testing and development while maintaining production-ready data persistence

### Component-Driven UI Architecture
**Problem**: Maintain design consistency across complex real estate features
**Solution**: shadcn/ui component system with Radix UI primitives and consistent design tokens
**Benefits**: Reusable components, accessibility compliance, and maintainable design system

# External Dependencies

## Core Infrastructure
- **Database**: Neon Database (PostgreSQL serverless)
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Cloud Storage**: Google Cloud Storage for file management

## AI and External APIs
- **OpenAI**: GPT-5 API for architectural design generation and DALL-E for image generation
- **PDF Services**: Custom PDF generation for design documentation

## Frontend Libraries
- **UI Components**: Radix UI primitives for accessible component foundation
- **Styling**: Tailwind CSS for utility-first styling
- **Forms**: React Hook Form with Hookform resolvers for validation
- **File Upload**: Uppy.js with AWS S3 and dashboard integrations
- **State Management**: TanStack React Query for server state
- **Validation**: Zod for runtime type validation

## Development Tools
- **Build Tool**: Vite with React plugin and runtime error overlay
- **TypeScript**: Full TypeScript support with strict configuration
- **Development**: Replit-specific plugins for development environment integration
- **Code Quality**: ESBuild for production bundling

## Third-Party Integrations
- **Fonts**: Google Fonts (Cairo, DM Sans, Architects Daughter, Fira Code, Geist Mono)
- **Icons**: Lucide React for consistent iconography
- **Animations**: Class Variance Authority (CVA) for component variants
- **Utilities**: clsx and tailwind-merge for conditional styling