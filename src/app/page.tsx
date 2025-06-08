/*OSC-Lit*/
"use client"
import Footer from './components/Footer';
import { useEffect } from 'react';
import gsap from 'gsap';
import Button from './components/Button';
import KeyFeaturesSection from './components/KeyFeaturesSection';

export default function Home() {
  useEffect(() => {
    gsap.from('.title', { opacity: 0, y: -20, duration: 1.2, ease: 'power3.out', delay: 0.5 });
    gsap.from('.button', { opacity: 0, y: 20, duration: 1.2, stagger: 0.5, ease: 'power3.out', delay: 0.5 });
    gsap.from('.feature', { opacity: 0, y: 20, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '.feature', start: 'top 80%' } });
    gsap.from('.fade-in', { opacity: 0, duration: 1, ease: 'power3.out', delay: 0.5, stagger: 0.2 });
  }, []);

  return (
    <div className="home-container min-h-screen flex flex-col justify-between bg-gradient-to-b from-black via-[#181028] to-[#161b22] relative overflow-hidden">
      {/* Hero Section */}
      <section className="home-content relative z-10 flex flex-col items-center justify-center min-h-[70vh] w-full">
        {/* Glassmorphism card */}
        <div className="relative bg-black border border-[#2563eb]/40 rounded-2xl shadow-2xl px-10 py-14 flex flex-col items-center max-w-2xl mx-auto backdrop-blur-md overflow-hidden">
          {/* Neon border */}
          <div className="absolute -inset-1 rounded-2xl pointer-events-none z-0 bg-gradient-to-r from-[#00f0ff] via-[#2563eb] to-[#00ff85] blur-2xl opacity-50"></div>
          <h1 className="home-title text-5xl font-extrabold mb-6 relative z-10 bg-gradient-to-r from-[#00f0ff] via-[#2563eb] to-[#00ff85] bg-clip-text text-transparent drop-shadow-lg drop-shadow-[0_0_16px_#00f0ff]">OSC-Lit</h1>
          <p className="home-description text-lg text-gray-200 mb-10 max-w-xl mx-auto relative z-10">
            Your gateway to simplified Open Source Contribution
          </p>
          <div className="home-buttons flex flex-col sm:flex-row gap-4 justify-center relative z-10">
            <Button href="#" variant="primary">Get Started</Button>
            <Button href="#" variant="secondary">Learn More</Button>
          </div>
        </div>
        {/* Neon Glow Effect */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-[-60px] w-[90vw] h-40 pointer-events-none z-0">
          <div className="w-full h-full rounded-full blur-3xl opacity-90 bg-gradient-to-r from-[#00f0ff] via-[#2563eb] to-[#00ff85]"></div>
        </div>
      </section>

      {/* Key Features Section */}
      <KeyFeaturesSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
