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

export default function App() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    // Intersection observer for reveal animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    const revealEls = document.querySelectorAll('.reveal');
    revealEls.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  return (
    <div className="noise">
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <SectionDivider />
        <About />
        <SectionDivider />
        <Education/>
        <SectionDivider />
        <TechStack />
        <SectionDivider />
        <Projects />
        <SectionDivider />
        <Experience />
        <SectionDivider />
        <SparkWhiz />
        <SectionDivider />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
