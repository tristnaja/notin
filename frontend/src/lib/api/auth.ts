/**
 * Registers a new user.
 * @param email The user's email.
 * @param password The user's password.
 * @param confirmPassword The user's confirmed password.
 * @param username The user's username.
 * @returns The new user's data.
 */
import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function registerUser(email: string, password: string, confirmPassword: string, username: string) {
    const response = await fetch(`${API_URL}/auth/register`, {
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
  const response = await fetch(`${API_URL}/auth/login`, {
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
  const token = Cookies.get("access_token");
  const response = await fetch(`${API_URL}/auth/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
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
  await fetch(`${API_URL}/auth/logout`, {
    method: "POST",
    credentials: "include", // delete cookie from server
  });
}
