import React, { useEffect, useRef, useState } from 'react';
import './Hero.css';
import Starfield from './Starfield'; 
import { FaGithub } from "react-icons/fa";
import { BsFillLightningChargeFill } from "react-icons/bs";
import { PiHandWavingFill } from "react-icons/pi";
import { FaLinkedin } from "react-icons/fa6";
import { BiLogoGmail } from "react-icons/bi";
import { HiOutlineDocumentText } from "react-icons/hi2";

const orbitalLabels = [
  { text: 'Embedded',      angle: 0,    radius: 185, speed: 18, color: 'cyan'   },
  { text: 'AI',            angle: 51,   radius: 195, speed: 20, color: 'purple' },
  { text: 'Aerospace',     angle: 102,  radius: 180, speed: 22, color: 'pink'   },
  { text: 'Communication', angle: 154,  radius: 200, speed: 19, color: 'cyan'   },
  { text: 'IoT & Auto',    angle: 205,  radius: 188, speed: 21, color: 'purple' },
  { text: 'IEEE',          angle: 256,  radius: 178, speed: 18, color: 'pink'   },
  { text: 'IITM BS',       angle: 308,  radius: 192, speed: 20, color: 'cyan'   },
];

export default function Hero() {
  const heroRef   = useRef(null);
  const orbitRef  = useRef(null);
  const animRef   = useRef([]);
  const frameRef  = useRef(null);
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    // mouse parallax on blobs
    const handleMouseMove = (e) => {
      if (!heroRef.current) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 20;
      const y = (clientY / innerHeight - 0.5) * 20;
      heroRef.current.querySelectorAll('.hero-blob').forEach((blob, i) => {
        blob.style.transform = `translate(${x * (i + 1) * 0.4}px, ${y * (i + 1) * 0.4}px)`;
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // animate orbital pills via rAF
  useEffect(() => {
    animRef.current = orbitalLabels.map(l => l.angle);

    const tick = () => {
      if (!orbitRef.current) return;
      const pills = orbitRef.current.querySelectorAll('.orbital-pill');
      pills.forEach((pill, i) => {
        animRef.current[i] = (animRef.current[i] + 360 / (orbitalLabels[i].speed * 60)) % 360;
        const rad = (animRef.current[i] * Math.PI) / 180;
        const r   = orbitalLabels[i].radius;
        const x   = Math.cos(rad) * r;
        const y   = Math.sin(rad) * r * 0.65; // flatten to ellipse
        const z   = Math.sin(rad); // depth
        const scale = 0.78 + 0.22 * ((z + 1) / 2);
        const op    = 0.45 + 0.55 * ((z + 1) / 2);
        pill.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
        pill.style.opacity   = op;
        pill.style.zIndex    = Math.round(z * 10);
      });
      frameRef.current = requestAnimationFrame(tick);
    };
    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  const scrollToProjects = (e) => {
    e.preventDefault();
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };
  const copyEmail = () => {
  navigator.clipboard.writeText('snshreya2004@gmail.com');
  setCopied(true);

  setTimeout(() => {
    setCopied(false);
  }, 2000);
};
  return (
    <section id="hero" className="hero" ref={heroRef}>
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <linearGradient id="spark-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="50%" stopColor="#22D3EE" />
            <stop offset="100%" stopColor="#F472B6" />
          </linearGradient>
        </defs>
      </svg>

      <div className="hero-blob hero-blob-1" />
      <div className="hero-blob hero-blob-2" />
      <div className="hero-blob hero-blob-3" />
      <div className="hero-grid" />
      <Starfield />  

      <div className="container hero-container">
        {/* LEFT */}
        <div className="hero-content">
          <div className="hero-greeting">
            <span className="greeting-ping" />
            <PiHandWavingFill className="greeting-wave" />
            <span>Hellooo, I'm</span>
          </div>

          <h1 className="hero-name">Shreya S N</h1>

          <div className="hero-tagline-wrapper">
            <span className="hero-tagline gradient-text">
              Electronics · Embedded Systems · Full-Stack Development
            </span>
            <BsFillLightningChargeFill className="spark-tagline-icon" />
          </div>

          <p className="hero-intro">
            Building intelligent systems through code, circuits, and curiosity —
            blending hardware innovation with modern software experiences.
          </p>

          {/* cinematic line */}
          <div className="hero-cinematic">
            <span className="cin-dot" />
            <span className="cin-text">Engineer&nbsp;·&nbsp;Dreamer&nbsp;·&nbsp;Builder&nbsp;·&nbsp;Explorer</span>
            <span className="cin-dot" />
          </div>

          <div className="hero-buttons">
            <a href="#projects" className="btn btn-secondary" onClick={scrollToProjects}>
              View Projects
            </a>
            <a
              href="https://sites.google.com/view/sparkwhiz/home?authuser=0"
              target="_blank" rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              <BsFillLightningChargeFill className="link-icon spark-icon" /> SparkWhiz
            </a>
            <a
              href="/resume.pdf"
              target="_blank" rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              <HiOutlineDocumentText className="link-icon" /> Resume
            </a>
          </div>

          <div className="hero-socials">
            <a href="https://github.com/24f1001981" target="_blank" rel="noopener noreferrer" className="social-chip">
              <FaGithub className="social-icon" /> GitHub
            </a>
            <span className="social-sep">·</span>
            <a href="https://www.linkedin.com/in/shreya-s-n-geck" target="_blank" rel="noopener noreferrer" className="social-chip">
              <FaLinkedin className="social-icon" /> LinkedIn
            </a>
            <span className="social-sep">·</span>
            <button
              className="social-chip social-btn"
              onClick={copyEmail}
            >
              <BiLogoGmail className="social-icon" /> Email
            </button>
            
          </div>
        </div>

        {/* RIGHT — orbital system */}
        <div className="hero-visual">
          <div className="orbit-system" ref={orbitRef}>
            {/* orbit ring traces */}
            <div className="orbit-trace orbit-trace-1" />
            <div className="orbit-trace orbit-trace-2" />
            <div className="orbit-trace orbit-trace-3" />

            {/* orbital pills */}
            {orbitalLabels.map((label, i) => (
              <div
                key={i}
                className={`orbital-pill pill-${label.color}`}
              >
                {label.text}
              </div>
            ))}

            {/* center sphere */}
            <div className="hero-avatar-wrapper">
              <div className="hero-avatar-ring ring-1" />
              <div className="hero-avatar-ring ring-2" />
              <div className="hero-avatar-core">
                <div className="avatar-initials">SN</div>
                <div className="avatar-glow" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll-indicator">
        <div className="scroll-line" />
        <span>scroll</span>
      </div>
      {copied && (
        <div className="copy-toast">
          ✓ Email copied
        </div>
      )}  
    </section>
  );
}