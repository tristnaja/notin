# Notin - AI-Powered Note Generator

**Notin** is a modern, AI-driven web application designed to streamline your note-taking process with advanced markdown rendering, syntax highlighting, and LaTeX math support. This full-stack application provides a professional note-taking experience for students, developers, and creators.

## ✨ Key Features

- **🎨 Modern Landing Page:** Responsive marketing site with Lottie animations
- **🔐 Authentication System:** Complete sign-in, sign-up, and password recovery flows
- **📝 Advanced Markdown Editor:** Professional-grade markdown rendering with 180+ programming languages
- **🧮 LaTeX Math Support:** Full mathematical notation rendering with KaTeX
- **📱 Responsive Design:** Mobile-first design that works seamlessly across all devices
- **🚀 High Performance:** Server-side rendering with optimized bundle sizes
- **🔄 File-Based Content:** Markdown content management with hot-reload support

## 🏗️ Project Architecture

This monorepo contains both frontend and backend applications:

```
notin/
├── frontend/           # Next.js 15.4.3 application
│   ├── src/app/       # App Router with feature-based structure
│   ├── src/content/   # Markdown content files
│   └── public/        # Static assets organized by feature
├── backend/           # API server (in development)
└── README.md          # This file
```

### Frontend Architecture
- **Framework:** Next.js 15.4.3 with App Router
- **Language:** TypeScript with strict mode
- **Styling:** Tailwind CSS 4.x
- **Markdown:** react-markdown with GFM, syntax highlighting, and math support
- **Animations:** Lottie animations for enhanced UX

### Backend Architecture
- **Status:** In development
- **Planned:** RESTful API with user authentication and note persistence

## 🚀 Tech Stack

### Frontend
- **Next.js 15.4.3** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS 4.x** - Utility-first CSS framework
- **react-markdown** - Markdown rendering with plugin ecosystem
- **KaTeX** - LaTeX math rendering
- **react-syntax-highlighter** - Code syntax highlighting
- **@lottiefiles/dotlottie-react** - Animation support

### Development Tools
- **ESLint** - Code linting with Next.js rules
- **Turbopack** - Fast development builds
- **PostCSS** - CSS processing

## 🏁 Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) v20.x or later
- npm, yarn, or pnpm package manager

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/notin.git
   cd notin
   ```

2. **Install frontend dependencies:**
   ```bash
   cd frontend
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Visit [http://localhost:3000](http://localhost:3000)

## 📁 Detailed Project Structure

### Frontend Structure
```
frontend/
├── src/app/
│   ├── components/          # Landing page components
│   ├── auth/               # Authentication pages
│   ├── home/               # Dashboard with markdown editor
│   │   └── components/     # Dashboard-specific components
│   ├── documentation/      # App documentation
│   └── styles/            # CSS modules
├── src/content/markdown/   # Content management system
│   ├── demo.md            # Comprehensive demo content
│   ├── short-demo.md      # Quick demo
│   ├── math-test.md       # Math testing content
│   └── utils/             # Content reading utilities
└── public/
    ├── landing/           # Landing page assets
    ├── auth/              # Authentication assets
    └── home/              # Dashboard assets
```

### Backend Structure (Planned)
```
backend/
├── src/
│   ├── routes/            # API route handlers
│   ├── models/            # Database models
│   ├── middleware/        # Authentication & validation
│   └── utils/             # Helper functions
├── tests/                 # Test suites
└── package.json
```

## 💻 Development Commands

### Frontend Commands
```bash
cd frontend/
npm run dev      # Start development server with Turbopack
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint code quality checks
```

### Backend Commands (Coming Soon)
```bash
cd backend/
npm run dev      # Start development API server
npm run test     # Run test suites
npm run build    # Build for production
```

## 🎯 Current Implementation Status

### ✅ Completed Features
- **Landing Page System:** Complete responsive marketing site
- **Authentication UI:** Sign-in, sign-up, and forgot-password pages
- **Advanced Dashboard:** Collapsible sidebar with hover interactions
- **Markdown System:** Professional rendering with syntax highlighting
- **Math Support:** LaTeX expressions with KaTeX
- **File-Based Content:** Server-side markdown file management
- **Performance Optimization:** Caching and bundle optimization

### 🚧 In Development
- **Backend API:** User authentication and note persistence
- **AI Integration:** Note generation functionality
- **Database Layer:** User data and note storage

### 📋 Planned Features
- **Real-time Collaboration:** Multi-user note editing
- **Advanced Organization:** Tags, folders, and search
- **Export Options:** PDF, Word, HTML export
- **Template System:** Pre-built note templates

## 🧪 Advanced Features

### Markdown Rendering
- **180+ Languages:** Comprehensive syntax highlighting
- **GitHub Flavored Markdown:** Tables, task lists, strikethrough
- **LaTeX Math:** Inline (`$E = mc^2$`) and block math expressions
- **Custom Styling:** Dark theme with consistent design

### Collapsible Sidebar
- **Responsive Design:** Viewport-based width units
- **Smooth Animations:** CSS transitions with hover effects
- **State Management:** React hooks for collapse/expand

### Content Management
- **Server-Side Reading:** Zero client bundle impact
- **Caching System:** Memory cache with configurable TTL
- **Hot Reload:** Development-friendly content updates
- **Error Handling:** Graceful fallbacks for missing files

## 🤝 Contributing

We welcome contributions! Please follow our development guidelines:

### Commit Message Convention
- `feat:` - New feature for users
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code formatting changes
- `test:` - Adding or updating tests
- `refactor:` - Code refactoring
- `chore:` - Maintenance tasks

### Development Guidelines
- Use TypeScript strict mode
- Follow ESLint rules
- Write meaningful commit messages
- Test changes thoroughly
- Update documentation as needed

## 📄 License

Distributed under the MIT License. See `LICENSE` file for more information.

## 🔗 Links

- **Repository:** [GitHub](https://github.com/your-username/notin)
- **Documentation:** [Frontend README](./frontend/README.md)
- **Backend API:** [Backend README](./backend/README.md)