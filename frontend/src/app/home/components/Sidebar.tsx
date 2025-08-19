"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import NoteItem from "./Sidebar.NoteItem";
import Link from "next/link";
import {
  MarkdownContentManager,
  MarkdownContentType,
} from "../../../lib/markdown";

type SidebarProps = {
  onNewNote?: () => void;
  contentManager?: MarkdownContentManager;
  currentType?: MarkdownContentType;
  onFileSelect?: (type: MarkdownContentType) => void;
};

function Sidebar({
  onNewNote,
  contentManager,
  currentType,
  onFileSelect,
}: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isLargeViewport, setIsLargeViewport] = useState(false);

  useEffect(() => {
    const checkViewportSize = () => {
      setIsLargeViewport(window.innerWidth > 640);
    };

    checkViewportSize();
    window.addEventListener("resize", checkViewportSize);

    return () => window.removeEventListener("resize", checkViewportSize);
  }, []);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
    setIsLogoHovered(false);
  };

  const toggleLogout = () => {
    setIsClicked(!isClicked);
  };

  const handleLogoMouseEnter = () => {
    if (isCollapsed && isLargeViewport) {
      setIsLogoHovered(true);
    }
  };

  const handleLogoMouseLeave = () => {
    if (isCollapsed && isLargeViewport) {
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
      className={`flex flex-col justify-between absolute top-0 left-0 ${
        isCollapsed
          ? "items-center flex-row md:flex-col border-b-2 border-white-opacity-50 md:border-0 bg-black md:bg-grey min-w-screen md:min-w-max max-h-screen md:h-screen drop-shadow-2xl"
          : "bg-grey h-screen min-w-max"
      } p-4`}
    >
      <div
        className={`flex flex-col ${
          isCollapsed ? "gap-3 sm:gap-4 items-center" : "gap-6 sm:gap-8"
        }`}
      >
        <div className="flex justify-between">
          <Image
            src={
              isCollapsed && isLogoHovered && isLargeViewport
                ? "/home/collapse-icon.svg"
                : "/logo-short.svg"
            }
            alt={
              isCollapsed && isLogoHovered && isLargeViewport
                ? "Expand Icon"
                : "Notin Logo"
            }
            width={30}
            height={30}
            className={`transition-all duration-200 ${
              isCollapsed ? "cursor-pointer hover:opacity-70" : ""
            } ${
              isCollapsed && isLogoHovered && isLargeViewport
                ? "rotate-180"
                : ""
            }`}
            onMouseEnter={isCollapsed ? handleLogoMouseEnter : undefined}
            onMouseLeave={isCollapsed ? handleLogoMouseLeave : undefined}
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
            <button
              onClick={onNewNote}
              className="cursor-pointer bg-[#266293] hover:bg-blue w-full py-2 pt-3 sm:py-3 rounded-md font-bold text-sm sm:text-base transition-colors duration-200"
            >
              New Note
            </button>
            <div className="flex flex-col gap-3 sm:gap-4">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-xs sm:text-sm text-white-opacity-50 pt-1">
                  Your Notes
                </h2>
                {contentManager && (
                  <span className="text-xs text-white-opacity-30 bg-light-grey px-2 py-1 pt-2 rounded">
                    {contentManager.getFileCount()} files
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                {contentManager ? (
                  contentManager
                    .getAvailableFiles()
                    .map((type) => (
                      <NoteItem
                        key={type}
                        noteTitle={contentManager.getFileDisplayName(type)}
                        noteType={type}
                        isActive={currentType === type}
                        onClick={() => onFileSelect?.(type)}
                      />
                    ))
                ) : (
                  <>
                    <NoteItem noteTitle="Note Title" />
                    <NoteItem noteTitle="Note Title" />
                    <NoteItem noteTitle="Note Title" />
                    <NoteItem noteTitle="Note Title" />
                    <NoteItem noteTitle="Note Title" />
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </div>
      <div className="flex items-center justify-between">
        {isCollapsed ? (
          <>
            <Image
              src="/home/user-default-avatar.svg"
              alt="User Default Avatar"
              width={50}
              height={50}
              className="hidden md:block w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14"
            />
            <svg
              width="30px"
              height="30px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="block md:hidden cursor-pointer stroke-white hover:stroke-white-opacity-50"
              onClick={onNewNote}
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
          </>
        ) : (
          <div
            className="group flex flex-col items-center gap-3 sm:gap-4"
            onClick={toggleLogout}
          >
            <Link
              href="#"
              className={`${
                isClicked
                  ? "translate-y-0 opacity-100"
                  : "translate-y-15 opacity-0"
              } transition-all duration-150 bg-red-alert hover:bg-red-indicator w-full justify-center items-center rounded-md`}
            >
              <p className="text-center py-1.5 pt-2 font-extrabold text-sm sm:text-base">
                Logout
              </p>
            </Link>
            <div className="flex items-center gap-3 sm:gap-4 bg-grey z-10">
              <div className="flex items-center gap-2 cursor-pointer">
                <Image
                  src="/home/user-default-avatar.svg"
                  alt="User Default Avatar"
                  width={50}
                  height={50}
                  className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14"
                />
                <div className="">
                  <p className="font-bold text-sm sm:text-base">Username</p>
                  <p className="font-normal text-xs sm:text-sm text-white-opacity-50">
                    name@example.com
                  </p>
                </div>
              </div>
              <Image
                src="/home/pops-indicator.svg"
                alt="Logout Icon"
                width={20}
                height={20}
                className={`${
                  isClicked ? "rotate-180" : "rotate-0"
                } transition-all duration-150 cursor-pointer w-4 h-4 sm:w-5 sm:h-5`}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
