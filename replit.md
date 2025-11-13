# DIM Games

## Overview

DIM Games is a full-stack web application for hosting and playing browser-based games. The application features user authentication via Replit's OpenID Connect integration, allowing users to log in to access exclusive features and save their progress. The platform is built with a modern React frontend and Express backend, using PostgreSQL for data persistence.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack**: React 19 with TypeScript, Vite as the build tool

**Key Design Decisions**:
- **Client-side routing**: Uses Wouter (lightweight alternative to React Router) for simple route management between Landing and Home pages
- **State management**: TanStack React Query handles server state, eliminating need for Redux or similar libraries
  - Rationale: Reduces complexity for simple authenticated user state
  - Provides automatic caching, background refetching, and error handling
- **Authentication flow**: Conditionally renders Landing page (unauthenticated) or Home page (authenticated) based on user session
- **Build configuration**: Vite configured with proxy to forward `/api` requests to backend during development
  - Production builds output to `/dist` directory, served statically by Express

### Backend Architecture

**Technology Stack**: Express.js with TypeScript, running on Node.js

**Key Design Decisions**:
- **Authentication pattern**: Passport.js with OpenID Connect strategy for Replit authentication
  - Session-based authentication using express-session
  - Sessions stored in PostgreSQL via connect-pg-simple for persistence across server restarts
  - Memoization of OIDC configuration to reduce repeated discovery requests
- **API structure**: RESTful endpoints under `/api` prefix
  - `/api/auth/user` - Returns authenticated user information
  - `/api/login` - Initiates OAuth flow (referenced in client)
  - `/api/logout` - Terminates user session (referenced in client)
- **Database layer**: Separated into distinct concerns
  - `db.ts` - Database client initialization
  - `storage.ts` - Data access layer with IStorage interface for potential future storage implementations
  - Drizzle ORM for type-safe database queries
- **Development workflow**: Uses `tsx` for TypeScript execution with watch mode for hot reloading

### Data Storage

**Database**: PostgreSQL with Drizzle ORM

**Schema Design**:
- **users table**: Stores user profile information
  - Primary key: UUID (auto-generated)
  - Fields: email (unique), firstName, lastName, profileImageUrl
  - Timestamps for createdAt and updatedAt
- **sessions table**: Manages express-session data
  - Required for persistent authentication across server restarts
  - Indexed on expire column for efficient session cleanup
- **Upsert pattern**: User data updates on each login to keep profiles synchronized with Replit identity provider

**Migration Strategy**: Drizzle Kit for schema management
- `db:generate` - Creates migration files
- `db:migrate` - Applies migrations
- `db:push` - Direct schema push for development

### Authentication & Authorization

**OAuth 2.0 / OpenID Connect Implementation**:
- **Provider**: Replit's OIDC service
- **Flow**: Authorization code flow with PKCE
- **Token management**: Access tokens and refresh tokens stored in user session
- **Session security**: 
  - HTTP-only cookies prevent XSS attacks
  - Secure flag requires HTTPS
  - 7-day session TTL
- **User provisioning**: Automatic user record creation/update on successful authentication
- **Protected routes**: `isAuthenticated` middleware guards API endpoints

### Application Structure

**Monorepo Organization**:
- `/client` - React frontend application
- `/server` - Express backend application
- `/shared` - Shared TypeScript types and database schema
- Path aliases configured via TypeScript for clean imports (`@shared/*`, `@/*`)

**Separation of Concerns**:
- Frontend and backend run as separate processes in development
- Vite dev server (port 5000) proxies API requests to Express (port 3000)
- Production: Express serves static frontend build and handles all routing

## External Dependencies

### Third-party Services

**Replit Authentication**:
- OpenID Connect provider for user authentication
- Requires environment variables:
  - `REPL_ID` - Replit application identifier
  - `ISSUER_URL` - OIDC issuer endpoint (defaults to https://replit.com/oidc)
  - `SESSION_SECRET` - Secret key for session encryption

### Database

**PostgreSQL**:
- Connection via `DATABASE_URL` environment variable
- Must be provisioned before application start (throws error if missing)
- Used for both application data and session storage

### NPM Packages

**Core Dependencies**:
- **Authentication**: `passport`, `passport-openid-client`, `express-session`, `connect-pg-simple`
- **Database**: `drizzle-orm`, `drizzle-kit`, `postgres`
- **Frontend**: `react`, `react-dom`, `wouter`, `@tanstack/react-query`
- **Backend**: `express`
- **Development**: `vite`, `tsx`, `typescript`, `@vitejs/plugin-react`
- **Utilities**: `memoizee` (caching OIDC configuration)

### Build & Development Tools

- **Vite**: Frontend bundler and dev server
- **TSX**: TypeScript execution for backend
- **TypeScript**: Type safety across entire stack
- **Drizzle Kit**: Database schema management and migrations
