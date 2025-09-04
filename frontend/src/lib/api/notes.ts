import Cookies from "js-cookie";

export interface Note {
    id: number;
    title: string;
    content: string;
    source_url: string | null;
    owner_id: number;
    created_at: string;
}

/**
 * Generates a new note from a given source.
 * @param formData The form data containing the source type, source, and URL.
 * @returns The newly generated note.
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function generateNote(formData: FormData) {
    const token = Cookies.get("access_token");
    const response = await fetch(`${API_URL}/notes/generate`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`
        },
        body: formData,
        credentials: "include"
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to generate note: ${errorData.detail || "Note Generation Failed."}`);
    }
    return await response.json();
}

/**
 * Fetches all notes for the current user.
 * @returns A list of notes.
 */
export async function fetchAllNotes(): Promise<Note[]> {
    const token = Cookies.get("access_token");
    const response = await fetch(`${API_URL}/notes/collect`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        credentials: "include"
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to fetch notes: ${errorData.detail || "Note Fetching Failed."}`);
    }
    return await response.json();
}
