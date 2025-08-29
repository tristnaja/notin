"use client";
import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import GenerateNoteModal from "./components/GenerateNoteModal";
import MarkdownRenderer from "./components/MarkdownRenderer";
import { fetchAllNotes, Note } from "@/lib/api/notes";
import { toast } from "sonner";
import LottiePlayer from "../components/LottiePlayer";
// Navigation now handled exclusively in the sidebar

/**
 * The main client-side component for the home page, which manages the state of the notes and the modal.
 */
export default function ClientHome() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [activeNote, setActiveNote] = useState<Note | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    /**
     * Fetches all notes for the current user and updates the state.
     */
    async function fetchNotes() {
      try {
        const userNotes = await fetchAllNotes();
        setNotes(userNotes);
        if (userNotes.length > 0) {
          setActiveNote(userNotes[0]);
        }
      } catch (error: any) {
        toast.error(error.message || "Failed to fetch notes");
      } finally {
        setIsLoading(false);
      }
    }

    fetchNotes();
  }, [refreshTrigger]);

  /**
   * Refreshes the notes list when a new note is generated.
   */
  const handleNoteGenerated = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div
      className={`flex flex-col ${
        isLoading || activeNote ? "justify-center" : ""
      } md:justify-center sm:flex-row min-h-screen w-screen bg-black`}
    >
      <aside className="w-max justify-self-start items-center fixed left-0 top-0 max-h-screen transition-all duration-300 z-10">
        <Sidebar
          notes={notes}
          activeNote={activeNote}
          onSelectNote={setActiveNote}
          onNewNote={() => setIsModalOpen(true)}
        />
      </aside>
      <svg
        width="30px"
        height="30px"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="hidden md:block fixed top-0 right-0 cursor-pointer m-6 stroke-white hover:stroke-white-opacity-50"
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        <path
          d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <main
        className={`p-4 pt-24 md:p-6 lg:p-8 xl:p-12 2xl:p-16 flex flex-col items-start ${
          activeNote || isLoading ? "justify-start" : "justify-center"
        } max-w-full md:max-w-[60dvw]`}
      >
        {isLoading ? (
          <p>Loading notes...</p>
        ) : activeNote ? (
          <>
            <div className="mb-3">
              <h1 className="text-white-opacity-50 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold break-words">
                {activeNote.title}
              </h1>
            </div>
            <div className="w-full max-w-none prose-container pl-0">
              <MarkdownRenderer content={activeNote.content} />
            </div>
          </>
        ) : (
          <div className="max-w-130 md:w-200 overflow-hidden relative flex flex-col justify-center items-center">
            <LottiePlayer src="/home/astronout.lottie" />
            <p className="justify-center items-center text-center text-white-opacity-50 text-[20px] font-medium">
              Nothing Here! Create one!
            </p>
          </div>
        )}
      </main>

      <GenerateNoteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onNoteGenerated={handleNoteGenerated}
      />
    </div>
  );
}