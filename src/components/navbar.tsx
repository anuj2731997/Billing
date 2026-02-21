"use client";

import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Navbar() {
  return (
    <header className="w-full border-b bg-white">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        <Link href="/" className="text-xl font-semibold tracking-tight bg-linear-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity duration-200">
          Rayzorpay
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
         
          <Link href="/profile" className="hover:text-black transition">
            Profile
          </Link>
          <Link href="/about" className="hover:text-black transition">
            About
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          
          <SignedOut>
            <Link
              href="/sign-in"
              className="text-sm font-medium text-gray-600 hover:text-black transition"
            >
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className="bg-black text-white text-sm px-4 py-2 rounded-md hover:bg-gray-800 transition"
            >
              Get Started
            </Link>
          </SignedOut>

          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-9 h-9",
                },
              }}
          



            />
          </SignedIn>

        </div>
      </div>
    </header>
  );
}