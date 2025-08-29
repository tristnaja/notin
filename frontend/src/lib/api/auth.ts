/**
 * Registers a new user.
 * @param email The user's email.
 * @param password The user's password.
 * @param confirmPassword The user's confirmed password.
 * @param username The user's username.
 * @returns The new user's data.
 */
export async function registerUser(email: string, password: string, confirmPassword: string, username: string) {
    const response = await fetch('http://localhost:8000/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, confirmPassword, username }),
        credentials: 'include'
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Registration failed");
    }

    const data = await response.json();
    return data;
}

/**
 * Logs in a user.
 * @param email The user's email.
 * @param password The user's password.
 * @returns The user's data.
 */
export async function loginUser(email: string, password: string) {
  const response = await fetch('http://localhost:8000/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
    credentials: 'include'
  });

  if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Login failed");
  }

  const data = await response.json();
  return data;
}

/**
 * Gets the current user's information.
 * @returns The current user's data.
 */
export async function getCurrentUser() {
  const response = await fetch("http://localhost:8000/auth/me", {
    method: "GET",
    credentials: "include"
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Failed to fetch current user");
  }

  const data = await response.json();
  return data;
}

/**
 * Logs out the current user.
 */
export async function logoutUser() {
  await fetch("http://localhost:8000/auth/logout", {
    method: "POST",
    credentials: "include", // delete cookie from server
  });
}
