"use client";
import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import GenerateNoteModal from "./components/GenerateNoteModal";
import MarkdownRenderer from "./components/MarkdownRenderer";
// Navigation now handled exclusively in the sidebar
import {
  MarkdownContentManager,
  MarkdownNavigator,
  MarkdownContentType,
} from "../../lib/markdown";

interface ClientHomeProps {
  initialContent: string;
  initialType?: MarkdownContentType;
  allContent: Record<MarkdownContentType, string>;
}

export default function ClientHome({
  initialContent,
  initialType = "demo",
  allContent,
}: ClientHomeProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentContent, setCurrentContent] = useState(initialContent);
  const [currentType, setCurrentType] =
    useState<MarkdownContentType>(initialType);
  const [contentManager] = useState(() => new MarkdownContentManager());
  const [navigator] = useState(() => new MarkdownNavigator(contentManager));

  useEffect(() => {
    const initializeContent = async () => {
      await contentManager.setCurrentContent(initialContent, initialType);
      await contentManager.loadContent(initialType, initialContent);
      await contentManager.loadAllContent(allContent);

      navigator.setNavigationCallback((type, content) => {
        setCurrentType(type);
        setCurrentContent(content);
      });
    };

    initializeContent();
  }, [initialContent, initialType, allContent, contentManager, navigator]);

  const handleFileSelect = async (type: MarkdownContentType) => {
    try {
      await navigator.goTo(type);
    } catch (error) {
      console.error("Failed to navigate to file:", error);
    }
  };

  return (
    <div className="flex flex-row min-h-screen w-screen bg-black">
      <aside className="min-w-max w-[15dvw] max-w-max justify-self-start items-center bg-grey p-6 sticky top-0 max-h-[100dvh] transition-all duration-300">
        <Sidebar
          onNewNote={() => setIsModalOpen(true)}
          contentManager={contentManager}
          currentType={currentType}
          onFileSelect={handleFileSelect}
        />
      </aside>
      <main className="p-23 flex-1">
        <div className="mb-6">
          <h1 className="text-white-opacity-50 text-2xl font-bold">
            {contentManager.getFileDisplayName(currentType)}
          </h1>
        </div>

        <MarkdownRenderer content={currentContent} />
      </main>
      <GenerateNoteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
