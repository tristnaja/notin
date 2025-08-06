"use client";
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import GenerateNoteModal from "./components/GenerateNoteModal";
import MarkdownRenderer from "./components/MarkdownRenderer";

interface ClientHomeProps {
  content: string;
}

export default function ClientHome({ content }: ClientHomeProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-row min-h-screen w-screen bg-black">
      <aside className="min-w-max w-[15dvw] max-w-max justify-self-start items-center bg-grey p-6 sticky top-0 max-h-[100dvh] transition-all duration-300">
        <Sidebar onNewNote={() => setIsModalOpen(true)} />
      </aside>
      <main className="p-23 flex-1">
        <MarkdownRenderer content={content} />
      </main>
      <GenerateNoteModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
