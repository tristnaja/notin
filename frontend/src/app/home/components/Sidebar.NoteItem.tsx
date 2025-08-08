"use client";
import Image from "next/image";
import { MarkdownContentType } from "../../../lib/markdown/types";

interface NoteDetailProps {
    noteTitle: string;
    noteType?: MarkdownContentType;
    isActive?: boolean;
    onClick?: () => void;
}

function NoteItem({ noteTitle, noteType, isActive = false, onClick }: NoteDetailProps) {

    const getIconForType = (type?: MarkdownContentType) => {
        switch (type) {
            case 'demo':
                return "/home/note-icon.svg";
            case 'short-demo':
                return "/home/note-icon.svg";
            case 'math-test':
                return "/home/note-icon.svg";
            default:
                return "/home/note-icon.svg";
        }
    };

    return (
        <div 
            className={`${isActive ? "bg-blue" : "bg-transparent hover:bg-gray-800"} pl-1 flex items-center gap-2 hover:border-2 border-blue rounded-md transition-all duration-75 cursor-pointer`} 
            onClick={onClick}
        >
            <Image
                src={getIconForType(noteType)}
                alt="Notes Icon"
                width={20}
                height={20}
            />
            <div className="flex flex-col">
                <p className="text-[14px] font-bold text-white pt-1">
                    {noteTitle}
                </p>
                {noteType && (
                    <span className="text-[10px] text-white-opacity-50">
                        {noteType}.md
                    </span>
                )}
            </div>
        </div>
    );
}

export default NoteItem;
