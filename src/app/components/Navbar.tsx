"use client"
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-black/80 backdrop-blur border-b border-[#2563eb]/40 z-50 shadow-xl rounded-b-2xl py-2">
      <div className="max-w-3xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex justify-between items-center h-20">
          <motion.div whileHover={{ scale: 1.08 }} transition={{ duration: 0.2 }}>
            <Link href="/" className="font-extrabold text-2xl sm:text-3xl bg-gradient-to-r from-[#00f0ff] via-[#2563eb] to-[#00ff85] bg-clip-text text-transparent drop-shadow-[0_0_12px_#00f0ff] tracking-tight">
              OSC-Lit
            </Link>
          </motion.div>
          <div className="flex space-x-8">
            {[
              { href: '/', label: 'Home' },
              { href: '/about', label: 'About' },
              { href: '/explore', label: 'Explore' },
            ].map(({ href, label }) => (
              <motion.div key={href} whileHover={{ scale: 1.12 }} transition={{ duration: 0.18 }}>
                <Link
                  href={href}
                  className="relative text-gray-300 hover:text-white transition-colors duration-200 px-3 py-2 group"
                >
                  <span className="relative z-10 font-medium text-lg">{label}</span>
                  <span className="absolute left-0 bottom-0 w-full h-0.5 bg-gradient-to-r from-[#00f0ff] to-[#2563eb] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full shadow-[0_0_8px_#00f0ff] group-hover:shadow-[0_0_16px_#00f0ff]" />
                </Link>
              </motion.div>
            ))}
            <motion.div whileHover={{ scale: 1.12 }} transition={{ duration: 0.18 }}>
              <Link
                href="/login"
                className="px-6 py-2 bg-black/90 border-2 border-transparent rounded-lg text-white font-semibold text-lg shadow-md hover:border-transparent hover:bg-gradient-to-r hover:from-[#00f0ff] hover:to-[#2563eb] hover:text-black hover:shadow-[0_0_24px_4px_rgba(0,240,255,0.25)] transition-all duration-200"
                style={{ boxShadow: '0 0 0 2px #2563eb, 0 2px 16px 0 #00f0ff33' }}
              >
                Login
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </nav>
  );
}