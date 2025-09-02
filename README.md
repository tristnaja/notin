# Notin - AI-Powered Note Generator

<p align="center" style="margin: 2rem 0;">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="./frontend/public/logo-full.svg">
    <source media="(prefers-color-scheme: light)" srcset="./frontend/public/logo-full-light.svg">
    <img src="./frontend/public/logo-full.svg" alt="Notin Logo" width="400">
  </picture>
</p>

<p align="center">
  <strong>Transform YouTube videos, PDFs, and DOCX files into beautifully structured markdown notes with the power of AI.</strong>
</p>

---

**Notin** is a full-stack web application designed to streamline your note-taking process. It leverages Google's Gemini AI to generate clear, organized, and easy-to-read notes from various sources, featuring a professional dashboard, a rich markdown experience with syntax highlighting, and full LaTeX math support.

## ✨ Key Features

- **AI-Powered Note Generation**: Automatically create detailed notes from YouTube video transcripts, PDF documents, and DOCX files.
- **Complete Authentication**: Secure user registration and login system with both local email/password and Google OAuth 2.0.
- **Dynamic Dashboard**: A responsive and intuitive dashboard featuring a collapsible sidebar for efficient note management.
- **Advanced Markdown Rendering**: Professional-grade markdown display with support for over 180 programming languages and custom-styled components.
- **LaTeX Math Support**: Full support for mathematical and scientific notation using KaTeX.
- **Multi-Source Input**: Seamlessly switch between providing a YouTube URL or uploading PDF and DOCX files to generate notes.

## 🏗️ Project Architecture

This project is a monorepo containing the Next.js frontend and the FastAPI backend.

```
notin/
├── frontend/           # Next.js 15.4.3 application
├── backend/            # FastAPI (Python) API server
└── README.md           # This file
```

### Frontend (Next.js)

The frontend is built with the Next.js App Router, ensuring a modern, performant, and scalable user interface. It communicates with the backend via a RESTful API.

### Backend (FastAPI)

The backend is a high-performance API server built with Python and FastAPI. It handles user authentication, database operations, and the core AI note-generation logic by interfacing with the Google Gemini API.

## 🚀 Tech Stack

| Category           | Technology                                                                                              |
| ------------------ | ------------------------------------------------------------------------------------------------------- |
| **Frontend**       | Next.js 15.4.3, React 19, TypeScript, Tailwind CSS 4.x, `react-markdown`, KaTeX, Sonner (Notifications) |
| **Backend**        | FastAPI, Python 3.9, Uvicorn                                                                            |
| **Database**       | MySQL, SQLAlchemy (ORM)                                                                                 |
| **Authentication** | JWT (python-jose, passlib), Google OAuth 2.0 (Authlib)                                                  |
| **AI & Data**      | Google Generative AI (Gemini), `youtube-transcript-api`, `pypdf2`, `python-docx`                        |
| **Dev Tools**      | Turbopack, ESLint, Prettier, `python-dotenv`                                                            |

## 🏁 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v20.x or later
- Python 3.8+ & `pip`
- A running MySQL database instance
- Google API Key and OAuth 2.0 Credentials

### Installation & Setup

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/tristanaja/notin.git
    cd notin
    ```

2.  **Create and activate Python virtual environment (from project root):**

    ```bash
    python3 -m venv .venv
    ```

    - On **macOS/Linux**:
      ```bash
      source .venv/bin/activate
      ```
    - On **Windows**:
      ```bash
      .venv\Scripts\activate
      ```

3.  **Install backend dependencies (from project root):**

    ```bash
    pip install -r backend/requirements.txt
    ```

4.  **Configure Backend Environment:**
    Create a `.env` file in the `/backend` directory and populate it with your credentials. A template is provided in `backend/README.md`.

5.  **Install frontend dependencies:**
    ```bash
    cd frontend
    npm install
    ```

### Running the Application

1.  **Start the Backend Server:**
    In the `/backend` directory (with the virtual environment activated):

    ```bash
    uvicorn app.main:app --reload
    ```

    The API will be available at `http://127.0.0.1:8000`.

2.  **Start the Frontend Server:**
    In a separate terminal, from the `/frontend` directory:
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:3000`.

## 🤝 Contributing

Contributions are welcome! Please adhere to the existing code style and conventions. For major changes, please open an issue first to discuss what you would like to change.

### Commit Message Convention

- `feat:` A new feature
- `fix:` A bug fix
- `docs:` Documentation only changes
- `style:` Changes that do not affect the meaning of the code
- `refactor:` A code change that neither fixes a bug nor adds a feature
- `test:` Adding missing tests or correcting existing tests
- `chore:` Changes to the build process or auxiliary tools

## 📄 License

Distributed under the MIT License. See the `LICENSE` file for more information.
