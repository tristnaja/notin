# Notin Backend - FastAPI API Server

This is the backend API server for Notin, built with Python and FastAPI. It provides user authentication, note management, AI-powered note generation, and other services for the Notin frontend application.

## 🚀 Tech Stack

- **Framework:** FastAPI
- **Database:** SQLAlchemy ORM with PyMySQL driver
- **Authentication:** JWT (JSON Web Tokens) with Passlib for password hashing, with additional Google OAuth 2.0
- **AI:** Google Generative AI (Gemini)
- **Validation:** Pydantic
- **Server:** Uvicorn
- **Other Key Libraries:** youtube-transcript-api, pypdf2, python-docx

## 🏁 Getting Started

### Prerequisites

- Python 3.8+
- A running MySQL database instance
- Google API Key and OAuth 2.0 credentials

### Installation

1.  **Clone the repository and navigate to the backend directory:**

    ```bash
    git clone https://github.com/your-username/notin.git
    cd notin/backend
    ```

2.  **Create a virtual environment:**

    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```

3.  **Install the dependencies:**

    ```bash
    pip install -r requirements.txt
    ```

4.  **Configure environment variables:**

    Create a `.env` file in the `backend` directory and add the following variables. Replace the placeholder values with your actual configuration.

    ```env
    DATABASE_URL="mysql+pymysql://USER:PASSWORD@HOST/DATABASE"
    JWT_SECRET="your_super_secret_key"
    JWT_ALGORITHM="HS256"
    JWT_EXPIRE_MINUTES="30"
    GOOGLE_API_KEY="your_google_api_key"
    GOOGLE_CLIENT_ID="your_google_client_id"
    GOOGLE_CLIENT_SECRET="your_google_client_secret"
    SESSION_SECRET="your_session_secret"
    ```

### Running the Server

Once the setup is complete, you can run the development server:

```bash
uvicorn app.main:app --reload
```

The API will be available at `http://127.0.0.1:8000`.

## 📁 Project Structure

```
backend/
├── app/
│   ├── routes/
│   │   ├── users.py        # User and authentication routes
│   │   ├── google.py       # Google OAuth 2.0 routes
│   │   └── notes.py        # Note generation and retrieval routes
│   ├── __init__.py
│   ├── auth.py             # JWT and password handling
│   ├── database.py         # Database connection and session
│   ├── dependencies.py     # FastAPI dependencies (e.g., get_current_user)
│   ├── google_auth.py      # Google OAuth 2.0 configuration
│   ├── main.py             # FastAPI app initialization and middleware
│   ├── models.py           # SQLAlchemy ORM models
│   ├── schemas.py          # Pydantic schemas for data validation
│   └── service.py          # Business logic for note generation from various sources
├── requirements.txt        # Python dependencies
└── README.md               # This file
```

## 🔗 API Endpoints

### Authentication (`/auth`)

-   **`POST /auth/register`**: Register a new user.
    -   **Request Body:** `schemas.UserCreate` (`email`, `password`, `confirmPassword`, `username`)
    -   **Response:** `schemas.UserResponse`

-   **`POST /auth/login`**: Log in a user.
    -   **Request Body:** `schemas.UserLogin` (`email`, `password`)
    -   **Response:** Sets an `access_token` cookie on successful login.

-   **`POST /auth/logout`**: Log out a user.
    -   **Response:** Clears the `access_token` cookie.

-   **`GET /auth/me`**: Get the profile of the currently authenticated user.
    -   **Requires:** Valid `access_token` cookie.
    -   **Response:** `schemas.UserOut` (`email`, `username`)

### Google Authentication (`/auth/google`)

-   **`GET /auth/google/login`**: Initiates the Google OAuth 2.0 login flow.
-   **`GET /auth/google/callback`**: Callback URL for Google to redirect to after authentication.

### Notes (`/notes`)

-   **`POST /notes/generate`**: Generate a new note from a source.
    -   **Request Body (form-data):**
        -   `source_type`: "youtube", "pdf", or "docx"
        -   `source` (optional): The uploaded file (for `pdf` and `docx`)
        -   `url` (optional): The URL of the YouTube video
    -   **Response:** `schemas.NoteResponse`

-   **`GET /notes/collect`**: Get all notes for the currently authenticated user.
    -   **Requires:** Valid `access_token` cookie.
    -   **Response:** `List[schemas.Note]`

## 🏛️ Database Schema

The database schema is defined using SQLAlchemy in `app/models.py`.

### `users` table

```python
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True, nullable=False)
    email = Column(String(100), unique=True, index=True, nullable=False)
    username = Column(String(100))
    hashed_password = Column(String(100), nullable=True)
    auth_provider = Column(Enum(AuthProvider), default=AuthProvider.LOCAL, nullable=False)
    created_at = Column(DateTime, default=datetime.now(timezone.utc), nullable=False)

    notes = relationship("Note", back_populates="owner")
```

### `notes` table

```python
class Note(Base):
    __tablename__ = "notes"

    id = Column(Integer, primary_key=True, index=True, nullable=False)
    title = Column(String(255), nullable=False)
    content = Column(TEXT, nullable=False)
    source_url = Column(String(255), nullable=True)
    owner_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    created_at = Column(DateTime, server_default=func.now(), nullable=False)

    owner = relationship("User", back_populates="notes")
```

The application will automatically create these tables if they don't exist when it starts.
