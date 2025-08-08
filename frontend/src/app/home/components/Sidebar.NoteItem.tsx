"use client";
import Image from "next/image";
import { useState } from "react";

interface NoteDetailProps {
    noteTitle: string;
}

function NoteItem({ noteTitle }: NoteDetailProps) {
    const [isChosen, setIsChosen] = useState(false);

    const toggleChosen = () => {
        setIsChosen(!isChosen);
    }

    return (
        <div className={`${isChosen ? "bg-blue" : "bg-transparent"} pl-1 flex items-center gap-2 hover:border-2 border-blue rounded-md transition-all duration-75 cursor-pointer`} onClick={toggleChosen}>
            <Image
                src="/home/note-icon.svg"
                alt="Notes Icon"
                width={20}
                height={20}
            />
            <p className="text-[16px] font-bold text-white pt-1">
                {noteTitle}
            </p>
        </div>
    );
}

export default NoteItem;
