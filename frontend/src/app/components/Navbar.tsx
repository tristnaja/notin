"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

/**
 * The navigation bar component.
 */
function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#features", label: "Features" },
    { href: "#developers", label: "Developers" },
  ];

  return (
    <div
      className={`flex justify select-none lg:select-auto between w-full py-6 px-8 ${
        isMenuOpen ? "bg-grey" : "bg-transparent"
      }`}
    >
      <Link href="/" className="w-full h-full">
        <div
          className="w-full flex justify-start items-center cursor-pointer"
          style={{ zIndex: 51 }}
        >
          <Image
            src="/logo-full.svg"
            alt="Logo"
            priority
            width={140}
            height={140}
            className="w-25 h-auto"
          />
        </div>
      </Link>
      <div className="hidden lg:flex w-full justify-center items-center">
        <ul className="flex gap-10 font-semibold">
          {navLinks.map((link) => (
            <li
              key={link.href}
              className="scale-100 text-white hover:text-white-opacity-50 hover:scale-105 transition-all duration-100"
            >
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="hidden lg:flex w-full justify-end items-center">
        <Link href="/auth/sign-in">
          <div className="bg-red-alert hover:bg-red-indicator scale-100 hover:scale-105 w-max rounded-md cursor-pointer transition-all duration-100">
            <p className="px-6 py-2 m-0 font-bold">Sign In</p>
          </div>
        </Link>
      </div>

      {/* Hamburger Menu for Small Screens */}
      <div
        className="lg:hidden flex w-full justify-end items-center"
        style={{ zIndex: 51 }}
      >
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-white hover:text-white-opacity-50 focus:outline-none focus:text-white-opacity-50"
          aria-label="Toggle menu"
        >
          <svg
            className="h-10 w-10"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMenuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`flex flex-col p-8 gap-8 lg:hidden absolute top-16 left-0 w-full bg-grey shadow-md transition-all duration-300 ease-in-out ${
          isMenuOpen ? "transform translate-y-0" : "transform -translate-y-120"
        }`}
        style={{ zIndex: 50 }}
      >
        <ul className="grid grid-cols-1 items-center gap-5">
          {navLinks.map((link) => (
            <li
              key={link.href}
              className="text-center border-b-2 border-white p-2"
            >
              <Link href={link.href} onClick={() => setIsMenuOpen(false)}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/auth/sign-in">
          <div className="bg-red-alert rounded-md cursor-pointer self-center w-full hover:bg-red-indicator transition-colors duration-100">
            <p className="px-6 py-3 m-0 font-bold text-center">SIGN IN</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;