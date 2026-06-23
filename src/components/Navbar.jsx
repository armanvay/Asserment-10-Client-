"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation"; // ১. অ্যাক্টিভ পাথ ট্র্যাকিং হুক
import { authClient } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import logo from "@/at/logo.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname(); // ২. বর্তমান পেজের পাথনেম নেওয়া হলো

  // authClient থেকে ইউজারের সেশন ডাটা নেওয়া
  const { data: session } = authClient.useSession();
  const user = session?.user;

  // সাইন আউট হ্যান্ডলার
  const handleSignOut = async () => {
    await authClient.signOut();
  };

  // অ্যাক্টিভ ক্লাসের জন্য একটা হেল্পার ফাংশন (কোড ক্লিন রাখার জন্য)
  const getLinkClass = (path, isMobile = false) => {
    const isActive = pathname === path;

    if (isMobile) {
      return isActive
        ? "block py-2 text-sm text-white font-semibold pl-2 border-l-2 border-white"
        : "block py-2 text-sm text-zinc-400 hover:text-white transition-colors pl-2";
    }

    // ডেস্কটপ ক্যাপসুল স্টাইল (image_34ecaa.png এর মতো মিল রেখে)
    return isActive
      ? "text-sm font-medium px-4 py-1.5 rounded-full bg-zinc-800 text-white shadow-sm transition-all duration-200"
      : "text-sm font-medium px-4 py-1.5 rounded-full text-zinc-400 hover:text-white transition-colors duration-200";
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#09090b] border-b border-zinc-900 text-zinc-100">
      <header className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* বামপাশ: লোগো এবং প্ল্যাটফর্মের নাম */}
        <Link href="/">
          <div className="flex items-center gap-3 group">
            <div className="h-10 w-10 overflow-hidden rounded-xl bg-gradient-to-br from-zinc-700 to-zinc-900 p-1 flex items-center justify-center border border-zinc-800">
              <Image
                src={logo}
                alt="logo"
                width={40}
                height={40}
                className="object-contain"
                loading="eager"
              />
            </div>
            <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
              Ebook Sharing Platform
            </span>
          </div>
        </Link>

        {/* মাঝখান/ডানপাশ: ডাইনামিক মেনু বার (ডেস্কটপ ভিউ) */}
        <div className="hidden md:flex items-center gap-6">
          {/* ক্যাপসুল আকৃতির ন্যাভিগেশন লিংকসমূহ */}
          <div className="flex items-center gap-1 bg-zinc-900/60 border border-zinc-800/80 rounded-full px-2 py-1.5 backdrop-blur-md">
            <Link href="/" className={getLinkClass("/")}>
              Home
            </Link>

            <Link href="/ebooks" className={getLinkClass("/ebooks")}>
              Browse Books
            </Link>

            {/* ইউজার লগইন থাকলে ড্যাশবোর্ড বাটন দেখাবে এবং অ্যাক্টিভ চেক করবে */}
            {user && (
              <Link
                href={`/dashboard/${user?.role}`}
                className={getLinkClass(`/dashboard/${user?.role}`)}
              >
                Dashboard
              </Link>
            )}
          </div>

          {/* ডিভাইডার লাইন */}
          <div className="h-5 w-[1px] bg-zinc-800" />

          {/* ডানপাশ: অথেনটিকেশন স্টেট অনুসারে কন্টেন্ট */}
          {user ? (
            <div className="flex items-center gap-5">
              <span className="text-sm font-medium text-zinc-300">
                Hi,{" "}
                <span className="text-white font-semibold">{user?.name}</span>!
              </span>
              <button
                onClick={handleSignOut}
                className="text-sm font-medium text-zinc-400 hover:text-red-400 transition-colors cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                href="/signin"
                className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
              >
                Sign In
              </Link>
              <Link href="/signup">
                <Button
                  size="sm"
                  className="bg-white text-black font-semibold hover:bg-zinc-200 rounded-full px-4"
                >
                  Get Started
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* মোবাইল রেসপনসিভ মেনু বাটন */}
        <button
          className="block md:hidden text-zinc-400 hover:text-white transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </header>

      {/* মোবাইল ড্রপডাউন মেনু */}
      {isMenuOpen && (
        <div className="border-t border-zinc-900 bg-[#09090b] md:hidden">
          <ul className="flex flex-col gap-2 p-4">
            <li>
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className={getLinkClass("/", true)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/ebooks"
                onClick={() => setIsMenuOpen(false)}
                className={getLinkClass("/ebooks", true)}
              >
                Browse Books
              </Link>
            </li>

            {user ? (
              <>
                <li>
                  <Link
                    href={`/dashboard/${user?.role}`}
                    onClick={() => setIsMenuOpen(false)}
                    className={getLinkClass(`/dashboard/${user?.role}`, true)}
                  >
                    Dashboard ({user?.name})
                  </Link>
                </li>
                <li className="pt-2 border-t border-zinc-900">
                  <button
                    onClick={() => {
                      handleSignOut();
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left py-2 text-sm text-red-400 pl-2"
                  >
                    Sign Out
                  </button>
                </li>
              </>
            ) : (
              <li className="mt-2 flex flex-col gap-2 border-t border-zinc-900 pt-4">
                <Link
                  href="/signin"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-center py-2 text-sm text-zinc-400 hover:text-white"
                >
                  Sign In
                </Link>
                <Link href="/signup" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full bg-white text-black font-semibold rounded-full">
                    Get Started
                  </Button>
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
