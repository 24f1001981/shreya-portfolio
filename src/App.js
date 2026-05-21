import React, { useState, useEffect } from 'react';
import './index.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Education from './components/Education';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import Experience from './components/Experience';
import SparkWhiz from './components/SparkWhiz';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SectionDivider from './components/SectionDivider';

// ── 5 new features ──
import Customcursor from './components/Customcursor';   // 1
import Starfield    from './components/Starfield';      // 2 — used inside Hero.js
import Aichatwidget from './components/Aichatwidget';   // 4
import Easteregg    from './components/Easteregg'; 
import Ghostsignal from './components/Ghostsignal';     // 5
// ProjectDrawer (3) is imported and used inside Projects.js

export default function App() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    const observe = () => {
      document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    };

    observe();
    // re-run after a tick to catch any late-rendered elements
    const t = setTimeout(observe, 200);

    return () => {
      observer.disconnect();
      clearTimeout(t);
    };
  }, []);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  return (
    <div className="noise">
      {/* Feature 1: Custom cursor — renders globally */}
      <Customcursor />

      {/* Feature 5: Easter egg — listens globally for Konami */}
      <Easteregg />
      {/* Feature 5b: Ghost signal — subliminal flickering hint */}
      <Ghostsignal />

      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <main>
        {/* Feature 2: StarField is added inside Hero.js — see Hero.js instructions */}
        <Hero />
        <SectionDivider />
        <About />
        <SectionDivider />
        <Education />
        <SectionDivider />
        <TechStack />
        <SectionDivider />
        {/* Feature 3: ProjectDrawer is wired inside Projects.js */}
        <Projects />
        <SectionDivider />
        <Experience />
        <SectionDivider />
        <SparkWhiz />
        <SectionDivider />
        <Contact />
      </main>

      <Footer />

      {/* Feature 4: AI chat widget — fixed floating UI */}
      <Aichatwidget />
    </div>
  );
}