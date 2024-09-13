"use client";
import Link from "next/link";
import React, { useState } from "react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-red-600 text-white">
      <div className="navbar flex flex-wrap items-center justify-between px-4 py-3">
        {/* Brand Logo */}
        <div className="flex-1">
          <a href="/" className="text-2xl font-bold tracking-wide">
            GEN-Z ROHANPUR
          </a>
        </div>

        {/* Hamburger Menu (for Mobile) */}
        <div className="lg:hidden">
          <button
            className="btn btn-square btn-ghost"
            type="button"
            aria-label="Toggle menu"
            onClick={toggleMobileMenu}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex lg:items-center space-x-2">
          <Link
            href="/newreport"
            className="btn bg-white text-red-600 border border-white hover:bg-gray-100 hover:text-red-600 rounded-lg shadow-md"
          >
            অনিয়ম রিপোর্ট করুন
          </Link>
          <Link
            href="/reports"
            className="btn bg-white text-red-600 border border-white hover:bg-gray-100 hover:text-red-600 rounded-lg shadow-md"
          >
            অনিয়ম রিপোর্ট দেখুন
          </Link>
          <Link
            href="/volunteerslist"
            className="btn bg-white text-red-600 border border-white hover:bg-gray-100 hover:text-red-600 rounded-lg shadow-md"
          >
            টিমের তথ্য
          </Link>
        </div>
      </div>

      {/* Mobile Menu with Animation */}
      <div
        className={`lg:hidden flex flex-col items-start space-y-2 px-4 pb-3 transition-all duration-300 ease-in-out ${
          isMobileMenuOpen
            ? "max-h-screen opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <Link
          href="/newreport"
          className="btn bg-white text-red-600 border border-white hover:bg-gray-100 hover:text-red-600 rounded-lg w-full shadow-md"
        >
          অনিয়ম রিপোর্ট করুন
        </Link>
        <Link
          href="/reports"
          className="btn bg-white text-red-600 border border-white hover:bg-gray-100 hover:text-red-600 rounded-lg w-full shadow-md"
        >
          অনিয়ম রিপোর্ট দেখুন
        </Link>
        <Link
          href="/volunteerslist"
          className="btn bg-white text-red-600 border border-white hover:bg-gray-100 hover:text-red-600 rounded-lg w-full shadow-md"
        >
          টিমের তথ্য
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
