# Notin Backend - API Server

The backend API server for Notin, designed to provide user authentication, note management, and AI integration services for the note generation application.

## 🚧 Current Status

**In Development** - This backend is currently being planned and will be implemented to support the frontend application.

## 🎯 Planned Architecture

### Tech Stack (Proposed)
- **Runtime:** Node.js with TypeScript
- **Framework:** Express.js or Fastify
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** JWT with refresh tokens
- **AI Integration:** OpenAI API or similar
- **File Storage:** AWS S3 or local storage
- **Caching:** Redis for session management
- **Testing:** Jest with Supertest
- **Documentation:** Swagger/OpenAPI

### Database Schema (Planned)
```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  avatar_url VARCHAR(500),
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Notes table
CREATE TABLE notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(500) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## 📁 Planned Project Structure

```
backend/
├── src/
│   ├── controllers/          # Route handlers
│   │   ├── auth.controller.ts
│   │   ├── notes.controller.ts
│   │   ├── users.controller.ts
│   │   └── ai.controller.ts
│   ├── middleware/           # Authentication & validation
│   │   ├── auth.middleware.ts
│   │   ├── validation.middleware.ts
│   │   └── error.middleware.ts
│   ├── models/              # Database models (Prisma)
│   │   ├── user.model.ts
│   │   └── note.model.ts
│   ├── routes/              # API route definitions
│   │   ├── auth.routes.ts
│   │   ├── notes.routes.ts
│   │   ├── users.routes.ts
│   │   └── ai.routes.ts
│   ├── services/            # Business logic
│   │   ├── auth.service.ts
│   │   ├── notes.service.ts
│   │   ├── users.service.ts
│   │   ├── ai.service.ts
│   │   └── email.service.ts
│   ├── utils/               # Helper functions
│   │   ├── encryption.ts
│   │   ├── validation.ts
│   │   ├── logger.ts
│   │   └── constants.ts
│   ├── config/              # Configuration
│   │   ├── database.ts
│   │   ├── redis.ts
│   │   └── env.ts
│   └── app.ts               # Express app setup
├── tests/                   # Test suites
│   ├── auth.test.ts
│   ├── notes.test.ts
│   └── utils/
├── prisma/                  # Database schema
│   ├── schema.prisma
│   └── migrations/
├── docker/                  # Docker configuration
│   ├── Dockerfile
│   └── docker-compose.yml
├── .env.example            # Environment variables template
├── package.json
├── tsconfig.json
└── README.md               # This file
```

## 🔗 API Endpoints (Planned)

### Authentication Routes
```
POST   /api/auth/register         # User registration
POST   /api/auth/login            # User login
POST   /api/auth/logout           # User logout
POST   /api/auth/refresh          # Refresh access token
POST   /api/auth/forgot-password  # Password reset request
POST   /api/auth/reset-password   # Password reset confirmation
GET    /api/auth/verify-email     # Email verification
```

### User Management Routes
```
GET    /api/users/profile         # Get user profile
PUT    /api/users/profile         # Update user profile
DELETE /api/users/account         # Delete user account
POST   /api/users/change-password # Change password
POST   /api/users/upload-avatar   # Upload profile picture
```

### Notes Management Routes
```
GET    /api/notes                 # List user notes
POST   /api/notes                 # Create new note
GET    /api/notes/:id             # Get specific note
PUT    /api/notes/:id             # Update note
DELETE /api/notes/:id             # Delete note
POST   /api/notes/:id/favorite    # Toggle favorite
GET    /api/notes/search          # Search notes
POST   /api/notes/bulk-delete     # Delete multiple notes
```

### AI Integration Routes
```
POST   /api/ai/generate-note      # Generate note from prompt
POST   /api/ai/improve-note       # Enhance existing note
POST   /api/ai/summarize          # Summarize long content
POST   /api/ai/extract-topics     # Extract key topics
```

## 🚀 Development Setup (Future)

### Prerequisites
- Node.js v20.x or later
- PostgreSQL 14+
- Redis (optional, for caching)
- npm/yarn/pnpm

### Installation
```bash
# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env with your database credentials and API keys

# Setup database
npm run db:migrate
npm run db:seed

# Start development server
npm run dev
```

### Available Scripts (Planned)
```bash
npm run dev          # Start development server with hot reload
npm run build        # Build for production
npm run start        # Start production server
npm run test         # Run test suites
npm run test:watch   # Run tests in watch mode
npm run db:migrate   # Run database migrations
npm run db:seed      # Seed database with test data
npm run db:reset     # Reset database
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks
```

## 🔐 Security Features (Planned)

### Authentication
- **JWT tokens** with short expiry times
- **Refresh token rotation** for security
- **Password hashing** with bcrypt
- **Rate limiting** for login attempts
- **Email verification** for new accounts

### Data Protection
- **Input validation** with Joi or Zod
- **SQL injection prevention** with Prisma
- **CORS configuration** for frontend integration
- **Request sanitization** middleware
- **Environment variable security**

### API Security
- **Helmet.js** for security headers
- **Rate limiting** per endpoint
- **Request size limits**
- **API key authentication** for AI services
- **Logging** for security monitoring

## 🧪 Testing Strategy (Planned)

### Test Types
- **Unit tests** for services and utilities
- **Integration tests** for API endpoints
- **Database tests** for data persistence
- **Authentication tests** for security flows

### Test Setup
```typescript
// Example test structure
describe('Notes API', () => {
  beforeEach(async () => {
    // Setup test database
    await setupTestDB();
  });

  afterEach(async () => {
    // Cleanup test data
    await cleanupTestDB();
  });

  it('should create a new note', async () => {
    const response = await request(app)
      .post('/api/notes')
      .set('Authorization', `Bearer ${testToken}`)
      .send({
        title: 'Test Note',
        content: 'Test content'
      });

    expect(response.status).toBe(201);
    expect(response.body.title).toBe('Test Note');
  });
});
```

## 🚀 Deployment (Planned)

### Production Environment
- **Docker containerization** for easy deployment
- **Environment-specific configs** (dev, staging, prod)
- **Database connection pooling**
- **Process management** with PM2
- **Reverse proxy** with Nginx
- **SSL/TLS certificates**

### Docker Setup
```dockerfile
# Example Dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3001

CMD ["npm", "start"]
```

## 🔄 Integration with Frontend

### API Communication
- **RESTful API design** with JSON responses
- **CORS configuration** for frontend domain
- **Error handling** with consistent error format
- **Request/response logging** for debugging

### Authentication Flow
1. Frontend sends login credentials
2. Backend validates and returns JWT tokens
3. Frontend stores tokens securely
4. Frontend includes tokens in API requests
5. Backend validates tokens for protected routes

## 📊 Monitoring & Logging (Planned)

### Logging Strategy
- **Structured logging** with Winston
- **Request/response logging**
- **Error tracking** and alerting
- **Performance monitoring**
- **Database query logging**

### Health Checks
```typescript
// Health check endpoint
GET /api/health
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00Z",
  "database": "connected",
  "redis": "connected",
  "memory": "512MB",
  "uptime": "24h"
}
```

## 🔮 Future Features

### Phase 1: Core Backend
- [ ] User authentication system
- [ ] Basic CRUD operations for notes
- [ ] Database setup with Prisma
- [ ] JWT token management
- [ ] Input validation and sanitization

### Phase 2: Enhanced Features
- [ ] AI integration for note generation
- [ ] File upload for attachments
- [ ] Note sharing and collaboration
- [ ] Advanced search capabilities
- [ ] Email notifications

### Phase 3: Advanced Features
- [ ] Real-time collaboration with WebSockets
- [ ] Note versioning and history
- [ ] Advanced AI features (summarization, etc.)
- [ ] Backup and export functionality
- [ ] Admin dashboard and analytics

## 🤝 Contributing

Once development begins, contributors can:

1. **Fork the repository** and create feature branches
2. **Follow TypeScript** and code quality standards
3. **Write tests** for new functionality
4. **Update documentation** as needed
5. **Submit pull requests** with clear descriptions

### Code Standards (Planned)
- **TypeScript strict mode**
- **ESLint + Prettier** for code formatting
- **Conventional commits** for version history
- **API documentation** with Swagger
- **Security best practices**

## 📚 Resources

### Documentation Links
- **Express.js:** https://expressjs.com/
- **Prisma:** https://www.prisma.io/docs/
- **PostgreSQL:** https://www.postgresql.org/docs/
- **JWT:** https://jwt.io/introduction/
- **Jest Testing:** https://jestjs.io/docs/

### Related Files
- **Frontend README:** `../frontend/README.md`
- **Root Project README:** `../README.md`

---

**Note:** This backend is currently in planning phase. The implementation will begin once the frontend stabilizes and core requirements are finalized. Check the main project README for current development status and priorities.
