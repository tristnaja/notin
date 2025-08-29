"use client";
import Image from "next/image";

interface NoteDetailProps {
  noteTitle: string;
  noteDate: string;
  isActive?: boolean;
  onClick?: () => void;
}

function NoteItem({
  noteTitle,
  noteDate,
  isActive = false,
  onClick,
}: NoteDetailProps) {
  function truncateText(text: string, wordLimit: number): string {
    const words = text.split(" ");
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(" ") + "...";
  }

  return (
    <div
      className={`${
        isActive ? "bg-blue" : "bg-transparent hover:bg-gray-800"
      } pl-1 pr-2 py-1 sm:py-1.5 flex items-center gap-2 hover:border-2 border-blue rounded-md transition-all duration-75 cursor-pointer`}
      onClick={onClick}
    >
      <Image
        src="/home/note-icon.svg"
        alt="Notes Icon"
        width={20}
        height={20}
        className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0"
      />
      <div className="flex flex-col min-w-0 flex-1">
        <p className="text-xs sm:text-sm font-bold text-white pt-0.5 sm:pt-1 truncate">
          {truncateText(noteTitle, 5)}
        </p>
        <span className="text-xs text-white-opacity-50 truncate">
          {noteDate}
        </span>
      </div>
    </div>
  );
}

export default NoteItem;
