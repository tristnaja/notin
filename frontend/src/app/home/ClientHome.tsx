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
    <div className="flex flex-col sm:flex-row min-h-screen w-screen bg-black">
      <aside className="w-[22dvw] lg:w-[20dvw] xl:w-[18dvw] 2xl:w-[16dvw] justify-self-start items-center sticky top-0 max-h-screen transition-all duration-300 z-10">
        <Sidebar
          onNewNote={() => setIsModalOpen(true)}
          contentManager={contentManager}
          currentType={currentType}
          onFileSelect={handleFileSelect}
        />
      </aside>
      <main className="p-4 pt-18 md:p-6 lg:p-8 xl:p-12 2xl:p-16 flex-1 flex flex-col items-start max-w-full md:max-w-[60dvw]">
        <div className="mb-3">
          <h1 className="text-white-opacity-50 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold break-words">
            {contentManager.getFileDisplayName(currentType)}
          </h1>
        </div>

        <div className="w-full max-w-none prose-container pl-0">
          <MarkdownRenderer content={currentContent} />
        </div>
      </main>
      <GenerateNoteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
