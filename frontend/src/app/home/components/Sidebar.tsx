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
          ? "items-start bg-black min-w-screen md:min-w-max max-h-screen md:h-screen drop-shadow-2xl"
          : "bg-grey h-screen min-w-max"
      } p-3 sm:p-4 md:p-6`}
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
              className="cursor-pointer bg-[#266293] hover:bg-blue w-full py-2 sm:py-3 rounded-md font-bold text-sm sm:text-base transition-colors duration-200"
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
      <div
        className={`${
          isCollapsed
            ? "hidden sm:flex justify-center"
            : "flex items-center justify-between"
        }`}
      >
        {isCollapsed ? (
          <Image
            src="/home/user-default-avatar.svg"
            alt="User Default Avatar"
            width={50}
            height={50}
            className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14"
          />
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
