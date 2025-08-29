# Notin Frontend - Next.js Application

The frontend for Notin, built with Next.js 15.4.3 and TypeScript, featuring advanced markdown rendering, LaTeX math support, and a professional dashboard interface.

## 🚀 Quick Start

### Prerequisites
- Node.js v20.x or later
- npm, yarn, or pnpm

### Installation & Development
```bash
npm install
npm run dev    # Start development server at http://localhost:3000
```

### Production Build
```bash
npm run build  # Build for production
npm run start  # Start production server
npm run lint   # Run code quality checks
```

## 🏗️ Architecture Overview

### Tech Stack
- **Framework:** Next.js 15.4.3 with App Router
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS 4.x with PostCSS
- **Markdown:** react-markdown with GFM, syntax highlighting, and LaTeX
- **Notifications:** Sonner (for toast notifications)
- **Build System:** Turbopack for development
- **Code Quality:** ESLint with Next.js rules

### Key Dependencies
```json
{
  "next": "15.4.3",
  "react": "19.0.0",
  "react-markdown": "^10.1.0",
  "react-syntax-highlighter": "^15.6.1",
  "katex": "^0.16.22",
  "@lottiefiles/dotlottie-react": "^0.8.7",
  "tailwindcss": "^4.0.0",
  "sonner": "^2.0.7"
}
```

## 📁 Project Structure

```
src/
├── app/                        # Next.js App Router
│   ├── components/             # Landing page components
│   │   ├── About.tsx          # About section
│   │   ├── Developers.tsx     # Developer profiles
│   │   ├── Features.tsx       # Feature showcase
│   │   ├── Footer.tsx         # Site footer
│   │   ├── Hero.tsx           # Hero section
│   │   ├── LottiePlayer.tsx   # Animation player
│   │   └── Navbar.tsx         # Navigation (client component)
│   ├── auth/                   # Authentication pages
│   │   ├── sign-in/           # Login page
│   │   ├── sign-up/           # Registration page
│   │   └── forgot-password/   # Password recovery
│   ├── home/                   # Dashboard application
│   │   ├── components/        # Dashboard-specific components
│   │   │   ├── GenerateNoteModal.tsx    # Note creation modal
│   │   │   ├── MarkdownRenderer.tsx     # Advanced markdown renderer
│   │   │   ├── Sidebar.NoteItem.tsx     # Note list item
│   │   │   └── Sidebar.tsx              # Collapsible sidebar
│   │   ├── ClientHome.tsx     # Client-side home wrapper
│   │   └── page.tsx           # Home dashboard page
│   ├── documentation/          # App documentation
│   ├── styles/                # CSS modules
│   │   ├── BoxStyle.module.css
│   │   └── Hero.module.css
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Landing page
├── lib/
│   ├── api/                  # API communication layer
│   │   ├── auth.ts            # Authentication API calls
│   │   └── notes.ts           # Notes API calls
│   └── markdown/              # Markdown rendering engine
│       └── classes/           # Core markdown classes
└── public/                     # Static assets
```

## 🎨 Component Architecture

### Server vs Client Components
- **Server Components (Default):** Landing page, auth pages, static content
- **Client Components (`"use client"`):** Interactive components with state

### Key Components

#### 1. Landing Page (`/`)
- **Navbar:** Client component with hamburger menu state
- **Hero, About, Features, Developers, Footer:** Server components for SEO
- **LottiePlayer:** Animation component with lazy loading

#### 2. Authentication (`/auth/*`)
- **Sign-in, Sign-up, Forgot-password:** Complete user flow pages
- **Responsive forms** with validation patterns
- **Consistent styling** with Tailwind classes

#### 3. Dashboard (`/home`)
- **ClientHome:** Main dashboard wrapper
- **Sidebar:** Collapsible navigation with hover interactions
- **MarkdownRenderer:** Professional markdown with syntax highlighting and LaTeX
- **GenerateNoteModal:** Modal for creating new notes from various sources

### Advanced Features

#### Collapsible Sidebar (`Sidebar.tsx`)
```typescript
// Key features:
- Responsive width: 15dvw → 98px (6.125rem)
- Hover interactions: Logo transforms to collapse icon
- Smooth animations: 200ms CSS transitions
- State management: React useState hooks
```

#### Markdown Renderer (`MarkdownRenderer.tsx`)
```typescript
// Advanced rendering capabilities:
- 180+ programming languages with syntax highlighting
- LaTeX math: Inline ($E = mc^2$) and block ($\int$) expressions
- GitHub Flavored Markdown: Tables, task lists, strikethrough
- Custom dark theme styling
```

## 🎯 Routing Structure

### Public Routes
- `/` - Landing page with marketing content
- `/auth/sign-in` - User login
- `/auth/sign-up` - User registration
- `/auth/forgot-password` - Password recovery
- `/documentation` - Application documentation

### Protected Routes
- `/home` - Main dashboard (protected by middleware)

## 🌐 API Integration

The frontend communicates with the backend API for user authentication and note management.

- **`lib/api/auth.ts`**: Contains functions for user registration, login, logout, and fetching the current user.
- **`lib/api/notes.ts`**: Contains functions for generating new notes and fetching all notes for the current user.

## 🎨 Design System

### Typography Scale
- **H1:** `text-[48px] font-extrabold` - Main headings
- **H2:** `text-[36px] font-bold` - Section headings
- **H3:** `text-[28px] font-bold` - Subsections
- **Body:** `text-[24px] font-normal` - Paragraph text
- **Code:** `text-[18px] font-mono` - Code blocks

### Color Scheme
```css
/* Custom Tailwind colors */
colors: {
  grey: '#141414',
  light-grey: '#212121',
  blue: '#57AEF5',
  red: '#F55757',
  /* ...and more */
}
```

### Responsive Design
- **Mobile-first:** Tailwind breakpoint system
- **Sidebar:** Uses `dvw` units for optimal viewport sizing
- **Content:** Horizontal scroll for code blocks on mobile

## 📊 Performance Optimizations

### Bundle Optimization
- **Tree shaking:** Optimized imports and unused code elimination
- **Image optimization:** Next.js built-in image optimization

### Build Performance
- **Turbopack:** Fast development builds
- **TypeScript:** Strict mode for early error detection
- **ESLint:** Code quality enforcement

## 🔧 Development Workflow

### Code Style Guidelines
```typescript
// Import organization
import { ComponentType } from 'react'           // React types
import { NextPage } from 'next'                 // Next.js types
import CustomComponent from '@/components/...'   // Internal components

// Component structure
interface Props {
  // TypeScript interface above component
}

export default function ComponentName({ ...props }: Props) {
  // Component logic
  return (
    // JSX with Tailwind classes
  )
}
```

### File Naming Conventions
- **Components:** PascalCase (`MarkdownRenderer.tsx`)
- **Pages:** lowercase (`page.tsx`)
- **Utilities:** camelCase (`utils.ts`)
- **Constants:** UPPER_SNAKE_CASE

## 🚀 Deployment & Production

### Build Configuration
```typescript
// next.config.ts
export default {
  // Production optimizations
  experimental: {
    turbopack: true  // Development only
  }
}
```

### Environment Setup
```bash
# Development
npm run dev      # http://localhost:3000

# Production
npm run build    # Creates .next/ directory
npm run start    # Starts production server

# Code Quality
npm run lint     # ESLint checks
```

## 🔄 Future Enhancements

### Planned Features
- **Authentication integration** with backend API
- **Real-time note synchronization**
- **Advanced note organization** (tags, folders)
- **Collaborative editing** features
- **Export functionality** (PDF, Word, HTML)

### Technical Improvements
- **Testing framework** setup (Jest + Testing Library)
- **Storybook** for component documentation
- **Performance monitoring** integration
- **PWA features** for offline usage

## 🤝 Contributing to Frontend

### Development Setup
1. Fork and clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Make changes and test locally
5. Run linting: `npm run lint`
6. Submit pull request with clear description

### Commit Guidelines
Follow the project's commit convention:
- `feat:` - New features
- `fix:` - Bug fixes
- `style:` - UI/styling changes
- `refactor:` - Code improvements
- `docs:` - Documentation updates

## 📚 Additional Resources

- **Next.js Documentation:** https://nextjs.org/docs
- **Tailwind CSS:** https://tailwindcss.com/docs
- **React Markdown:** https://github.com/remarkjs/react-markdown
- **KaTeX Documentation:** https://katex.org/docs/api.html

For questions or issues specific to the frontend, please check the component documentation in the code or create an issue in the repository.
