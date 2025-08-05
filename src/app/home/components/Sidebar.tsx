"use client";

import Image from "next/image";
import { useState } from "react";
import NoteItem from "./Sidebar.NoteItem";
import Link from "next/link";

function Sidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isLogoHovered, setIsLogoHovered] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    const toggleLogout = () => {
        setIsClicked(!isClicked);
    };

    const handleLogoMouseEnter = () => {
        if (isCollapsed) {
            setIsLogoHovered(true);
        }
    };

    const handleLogoMouseLeave = () => {
        if (isCollapsed) {
            setIsLogoHovered(false);
        }
    };

    const handleLogoClick = () => {
        if (isCollapsed) {
            toggleCollapse();
        }
    };
    return (
        <div
            className={`flex flex-col min-w-max h-full justify-between sticky top-0 max-h-screen transition-all duration-300 ${isCollapsed ? "items-center" : ""
                }`}
        >
            <div
                className={`flex flex-col ${isCollapsed ? "gap-4 items-center" : "gap-8"
                    }`}
            >
                <div
                    className={`flex ${isCollapsed ? "justify-center" : "justify-between"
                        }`}
                >
                    <Image
                        src={
                            isCollapsed && isLogoHovered
                                ? "/home/collapse-icon.svg"
                                : "/logo-short.svg"
                        }
                        alt={isCollapsed && isLogoHovered ? "Expand Icon" : "Notin Logo"}
                        width={30}
                        height={30}
                        className={`transition-all duration-200 ${isCollapsed ? "cursor-pointer hover:opacity-70" : ""
                            } ${isCollapsed && isLogoHovered ? "rotate-180" : ""}`}
                        onMouseEnter={handleLogoMouseEnter}
                        onMouseLeave={handleLogoMouseLeave}
                        onClick={isCollapsed ? handleLogoClick : undefined}
                    />
                    {!isCollapsed && (
                        <Image
                            src="/home/collapse-icon.svg"
                            alt="Collapse Icon"
                            width={30}
                            height={30}
                            className="cursor-pointer hover:opacity-70 transition-opacity"
                            onClick={toggleCollapse}
                        />
                    )}
                </div>
                {!isCollapsed && (
                    <>
                        <button className="cursor-pointer bg-[#266293] hover:bg-blue w-full py-1 rounded-md font-bold text-[16px] pt-2">
                            New Note
                        </button>
                        <div className="flex flex-col gap-2">
                            <h2 className="font-bold text-[12px] text-white-opacity-50">
                                Your Notes
                            </h2>
                            <div className="flex flex-col gap-2">
                                <NoteItem noteTitle="Note Title" />
                                <NoteItem noteTitle="Note Title" />
                                <NoteItem noteTitle="Note Title" />
                                <NoteItem noteTitle="Note Title" />
                                <NoteItem noteTitle="Note Title" />
                            </div>
                        </div>
                    </>
                )}
            </div>
            <div
                className={`flex ${isCollapsed ? "justify-center" : "items-center justify-between"
                    }`}
            >
                {isCollapsed ? (
                    <Image
                        src="/home/user-default-avatar.svg"
                        alt="User Default Avatar"
                        width={50}
                        height={50}
                    />
                ) : (
                    <div className="group flex flex-col items-center gap-4" onClick={toggleLogout}>
                        <Link href="#" className={`${isClicked ? "translate-y-0 opacity-100" : "translate-y-15 opacity-0"} transition-all duration-150 bg-red-alert hover:bg-red-indicator w-full justify-center items-center rounded-md`}>
                            <p className="text-center py-1.5 pt-2 font-extrabold">Logout</p>
                        </Link>
                        <div className="flex items-center gap-4 bg-grey z-10">
                            <div className="flex items-center gap-2 cursor-pointer">
                                <Image
                                    src="/home/user-default-avatar.svg"
                                    alt="User Default Avatar"
                                    width={50}
                                    height={50}
                                />
                                <div>
                                    <p className="font-bold text-[16px]">Username</p>
                                    <p className="font-normal text-[12px] text-white-opacity-50">
                                        name@example.com
                                    </p>
                                </div>
                            </div>
                            <Image
                                src="/home/pops-indicator.svg"
                                alt="Logout Icon"
                                width={20}
                                height={20}
                                className={`${isClicked ? "rotate-180" : "rotate-0"} transition-all duration-150 cursor-pointer`}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Sidebar;
