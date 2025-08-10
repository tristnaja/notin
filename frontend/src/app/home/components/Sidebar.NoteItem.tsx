"use client";
import Image from "next/image";
import { MarkdownContentType } from "../../../lib/markdown/types";

interface NoteDetailProps {
  noteTitle: string;
  noteType?: MarkdownContentType;
  isActive?: boolean;
  onClick?: () => void;
}

function NoteItem({
  noteTitle,
  noteType,
  isActive = false,
  onClick,
}: NoteDetailProps) {
  const getIconForType = (type?: MarkdownContentType) => {
    switch (type) {
      case "demo":
        return "/home/note-icon.svg";
      case "short-demo":
        return "/home/note-icon.svg";
      case "math-test":
        return "/home/note-icon.svg";
      default:
        return "/home/note-icon.svg";
    }
  };

  return (
    <div
      className={`${
        isActive ? "bg-blue" : "bg-transparent hover:bg-gray-800"
      } pl-1 pr-2 py-1 sm:py-1.5 flex items-center gap-2 hover:border-2 border-blue rounded-md transition-all duration-75 cursor-pointer`}
      onClick={onClick}
    >
      <Image
        src={getIconForType(noteType)}
        alt="Notes Icon"
        width={20}
        height={20}
        className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0"
      />
      <div className="flex flex-col min-w-0 flex-1">
        <p className="text-xs sm:text-sm font-bold text-white pt-0.5 sm:pt-1 truncate">
          {noteTitle}
        </p>
        {noteType && (
          <span className="text-xs text-white-opacity-50 truncate">
            {noteType}.md
          </span>
        )}
      </div>
    </div>
  );
}

export default NoteItem;
