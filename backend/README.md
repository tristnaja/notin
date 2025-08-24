# Notin Backend - FastAPI API Server

This is the backend API server for Notin, built with Python and FastAPI. It provides user authentication, note management, and other services for the Notin frontend application.

## 🚀 Tech Stack

- **Framework:** FastAPI
- **Database:** SQLAlchemy ORM with PyMySQL driver
- **Authentication:** JWT (JSON Web Tokens) with Passlib for password hashing
- **Validation:** Pydantic
- **Server:** Uvicorn

## 🏁 Getting Started

### Prerequisites

- Python 3.8+
- A running MySQL database instance

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
│   │   └── users.py      # User and authentication routes
│   ├── __init__.py
│   ├── auth.py           # JWT and password handling
│   ├── database.py       # Database connection and session
│   ├── dependencies.py   # FastAPI dependencies (e.g., get_current_user)
│   ├── main.py           # FastAPI app initialization and middleware
│   ├── models.py         # SQLAlchemy ORM models
│   └── schemas.py        # Pydantic schemas for data validation
├── requirements.txt      # Python dependencies
└── README.md             # This file
```

## 🔗 API Endpoints

All authentication endpoints are prefixed with `/auth`.

### Authentication

-   **`POST /auth/register`**: Register a new user.
    -   **Request Body:** `schemas.UserCreate` (`email`, `password`, `confirmPassword`, `username`)
    -   **Response:** `schemas.UserResponse`

-   **`POST /auth/login`**: Log in a user.
    -   **Request Body:** `schemas.UserLogin` (`email`, `password`)
    -   **Response:** Sets an `access_token` cookie on successful login.

-   **`POST /auth/logout`**: Log out a user.
    -   **Response:** Clears the `access_token` cookie.

### Users

-   **`GET /auth/me`**: Get the profile of the currently authenticated user.
    -   **Requires:** Valid `access_token` cookie.
    -   **Response:** `schemas.UserOut` (`email`, `username`)

## 🏛️ Database Schema

The database schema is defined using SQLAlchemy in `app/models.py`.

### `users` table

```python
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True, nullable=False)
    email = Column(String(100), unique=True, index=True, nullable=False)
    username = Column(String(100))
    hashed_password = Column(String(100), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
```

The application will automatically create this table if it doesn't exist when it starts.