"use client"
import React from 'react';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <div className="min-h-screen text-white py-16 relative overflow-hidden pt-24">
      {/* Fixed, full-screen background image */}
      <div
        className="fixed inset-0 -z-10 bg-black bg-cover bg-center bg-no-repeat bg-fixed"
        style={{ backgroundImage: "url('/gradient_background_about.jpg')" }}
      />
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black opacity-40 pointer-events-none -z-10"></div>
      <div className="fixed left-1/2 bottom-0 -translate-x-1/2 w-[120vw] h-[60vh] -z-10 pointer-events-none">
        <div className="w-full h-full rounded-full blur-3xl opacity-80 bg-gradient-to-t from-[#00f0ff] via-[#2563eb] via-60% to-[#a855f7]" />
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h1 className="text-4xl font-extrabold mb-8 text-center bg-gradient-to-r from-[#00f0ff] via-[#2563eb] to-[#00ff85] bg-clip-text text-transparent drop-shadow-lg drop-shadow-[0_0_16px_#00f0ff]">About OSC-Lit</h1>
          <p className="text-lg text-gray-300 mb-8 text-center">
            New to open source? Don't worry, we've got your back! OSC-Lit is your all-in-one platform for managing and optimizing your open source contributions.
          </p>
          <div className="space-y-8">
            <div className="bg-black border border-[#2563eb]/40 rounded-lg p-6 shadow-lg">
              <h2 className="text-2xl font-bold mb-4 text-[#00f0ff]">Features</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                <li>Easy project discovery and contribution tracking.</li>
                <li>Real-time collaboration and feedback.</li>
                <li>Automated workflows to streamline your open source journey.</li>
                <li>Find repositories of companies which have been in GSOC.</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 