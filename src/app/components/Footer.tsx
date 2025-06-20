"use client"
import { FiGithub } from 'react-icons/fi';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-black border-t border-[#2563eb]/40 py-2 mt-10">
      <div className="max-w-3xl mx-auto flex flex-col items-center justify-center gap-3 px-4">
        <div className="flex gap-4 mb-2">
          <Link
            href="https://github.com/vaishcodescape/OSC-Lit.git"
            className="text-gray-400 hover:text-[#2563eb] hover:scale-110 transition-all duration-200"
            aria-label="GitHub"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FiGithub className="text-2xl" />
          </Link>
        </div>
        <p className="text-xs text-gray-500 text-center">&copy; 2025 OSC-Lit. All rights reserved.</p>
      </div>
    </footer>
  );
}