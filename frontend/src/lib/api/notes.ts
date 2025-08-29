export interface Note {
    id: number;
    title: string;
    content: string;
    source_url: string | null;
    owner_id: number;
    created_at: string;
}

export async function generateNote(formData: FormData) {
    const response = await fetch("http://localhost:8000/notes/generate", {
        method: "POST",
        body: formData,
        credentials: "include"
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to generate note: ${errorData.detail || "Note Generation Failed."}`);
    }
    return await response.json();
}

export async function fetchAllNotes(): Promise<Note[]> {
    const response = await fetch("http://localhost:8000/notes/collect", {
        method: "GET",
        credentials: "include"
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to fetch notes: ${errorData.detail || "Note Fetching Failed."}`);
    }
    return await response.json();
}