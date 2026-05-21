import React, { useEffect, useRef, useState } from 'react';
import './About.css';
import { FaGraduationCap } from "react-icons/fa6";
import { FaLaptopCode } from "react-icons/fa";
import { SlRefresh } from "react-icons/sl";

/* ── CountUp ── */
function CountUp({ target, suffix = '' }) {
  const ref = useRef(null);
  const hasRun = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let timer;

    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let v = 0;
        const inc = target / (2500 / 16);   // 2500ms = slower
        timer = setInterval(() => {
          v += inc;
          if (v >= target) { el.textContent = target + suffix; clearInterval(timer); }
          else el.textContent = Math.floor(v) + suffix;
        }, 16);
      } else {
        clearInterval(timer);
        el.textContent = '0' + suffix;       // reset when scrolled away
      }
    }, { threshold: 0.5 });

    observer.observe(el);
    return () => { observer.disconnect(); clearInterval(timer); };
  }, [target, suffix]);
  return <span ref={ref}>0{suffix}</span>;
}

/* ── Education data ── */
const educationFacts = [
  {
    icon: <FaGraduationCap color=" #cf92d2" />, badge: 'B.Tech (Hons.)',
    degree: 'Electronics & Communication Engineering',
    minor: 'Minor: Computer Science & Design',
    university: 'GEC Kozhikode · APJAKTU', cgpa: '8.59', accent: 'purple',
  },
  {
    icon: <FaLaptopCode color = "cyan"/>, badge: 'BS Degree',
    degree: 'Data Science & Applications',
    minor: 'Dual Diplomas: Data Science & Programming',
    university: 'IIT Madras', cgpa: '7.26', accent: 'cyan',
  },
];

const interests = [
  'Embedded Systems', 'Communication Systems', 'AI & Data Science',
  'IoT & Automation', 'Full Stack Development',
];

const volunteeringItems = [
  { org: 'IEEE AESS Kerala Section', role: 'Women in Aerospace (WIA)', year: '2026', accent: 'cyan' },
  { org: 'IEEE SB GEC KKD', role: 'Lead, Proposal Writing Team', year: '2026', accent: 'purple' },
  { org: 'IEEE SB GEC KKD', role: 'Secretary, WIE AG', year: '2025', accent: 'pink' },
];

/* ── Flip card for education ── */
function EduFlipCard({ fact }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      className={`edu-flip ${flipped ? 'flipped' : ''}`}
      onClick={() => setFlipped(f => !f)}
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && setFlipped(f => !f)}
    >
      <div className="edu-flip-inner">
        {/* Front */}
        <div className={`edu-flip-front edu-accent-${fact.accent}`}>
          <span className="edu-flip-icon">{fact.icon}</span>
          <div>
            <span className={`edu-flip-badge badge-${fact.accent}`}>{fact.badge}</span>
            <p className="edu-flip-degree">{fact.degree}</p>
          </div>
          <span className="edu-flip-hint">tap <SlRefresh /></span>
        </div>
        {/* Back */}
        <div className={`edu-flip-back edu-accent-${fact.accent}`}>
          <p className="edu-back-minor">{fact.minor}</p>
          <p className="edu-back-uni">{fact.university}</p>
          <span className={`edu-back-cgpa cgpa-${fact.accent}`}>
            CGPA <strong>{fact.cgpa}</strong>
          </span>
        </div>
      </div>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="section about-section">
      <div className="container">
        <div className="about-grid">

          {/* ── LEFT: Text (untouched) ── */}
          <div className="about-text reveal">
            <p className="section-label">Who I am</p>
            <h2 className="section-title">
              Engineer at the intersection of<br />
              <span className="gradient-text">circuits and code</span>
            </h2>
            <div className="divider" />
            <p className="about-body">
              I'm an Electronics and Communication Engineering student at GEC Kozhikode,
              simultaneously pursuing a BS in Data Science from IIT Madras. My world lives
              at the crossroads of hardware and software — from programming microcontrollers
              to building full-stack web apps.
            </p>
            <p className="about-body">
              What drives me is curiosity — the kind that makes you pull apart a circuit
              at midnight to understand why it failed, then rebuild it better. I believe
              the most interesting problems live in the space where electrons and algorithms meet.
            </p>
            <p className="about-body">
              Beyond building systems, I care deeply about building communities through IEEE
              — contributing to spaces that inspire innovation, collaboration, and more women
              to dream fearlessly in engineering and aerospace.
            </p>
            <div className="tagline-banner">
              <span className="tagline-text">
                Engineering for impact, innovation,<br />and something beyond ordinary.
              </span>
              <span className="tagline-glow" aria-hidden="true">
                Engineering for impact, innovation,<br />and something beyond ordinary.
              </span>
            </div>
          </div>

          {/* ── RIGHT: stacked variety column ── */}
          <div className="about-facts-col reveal reveal-delay-2">
            <div className="facts-col-heading">
              <span className="gradient-text">At a Glance</span>
            </div>
            {/* ── 1. EDUCATION: flip cards ── */}
            <div className="facts-row-label">
              <span className="row-dot dot-purple" />Education
            </div>
            <div className="edu-flip-row">
              {educationFacts.map((f, i) => <EduFlipCard fact={f} key={i} />)}
            </div>

            {/* ── 2. INTERESTS: scattered glow tags ── */}
            <div className="facts-row-label" style={{ marginTop: '28px' }}>
              <span className="row-dot dot-amber" />Interests
            </div>
            <div className="interests-cloud">
              {interests.map((label, i) => (
                <span className={`cloud-tag cloud-tag-${i % 3}`} key={i}>{label}</span>
              ))}
            </div>

            {/* ── 3. VOLUNTEERING: neon timeline ── */}
            <div className="facts-row-label" style={{ marginTop: '28px' }}>
              <span className="row-dot dot-green" />Volunteering
            </div>
            <div className="neon-timeline">
              {volunteeringItems.map((v, i) => (
                <div className={`neon-item neon-${v.accent}`} key={i}>
                  <div className={`neon-dot nd-${v.accent}`} />
                  <div className="neon-content">
                    <span className="neon-role">{v.role}</span>
                    <span className="neon-org">{v.org}</span>
                  </div>
                  <span className="neon-year">{v.year}</span>
                </div>
              ))}
            </div>

            {/* ── 4. VISION QUOTE: cinematic pull-quote ── */}
            <blockquote className="vision-quote">
              <div className="vision-quote-bg" aria-hidden="true" />
              <div className="vision-mark">"</div>
              <p className="vision-body">
                Exploring the space where hardware, software, and curiosity meet.
              </p>
              <div className="vision-nodes">
                <span className="vnode">Hardware</span>
                <span className="vline" />
                <span className="vnode vnode-spark">✦</span>
                <span className="vline" />
                <span className="vnode">Software</span>
                <span className="vline" />
                <span className="vnode vnode-spark">✦</span>
                <span className="vline" />
                <span className="vnode">Innovation</span>
              </div>
            </blockquote>

            {/* ── Let's connect ── */}
            <div className="facts-footer">
              <a href="#contact" className="facts-cta">Let's connect →</a>
            </div>

            {/* ── 5. MINI STATS ── */}
            <div className="mini-stats">
              <div className="mini-stat">
                <span className="mini-stat-num gradient-text">
                  <CountUp target={10} suffix="+" />
                </span>
                <span className="mini-stat-label">Projects &amp; experiments</span>
              </div>

              <div className="mini-stat mini-stat-words">
                <span className="mini-stat-word gradient-text">Learning.</span>
                <span className="mini-stat-word gradient-text">Building.</span>
                <span className="mini-stat-word gradient-text">Evolving.</span>
              </div>

              <div className="mini-stat">
                <span className="mini-stat-num gradient-text mini-infinity" aria-label="Infinite curiosity">
                  ∞
                </span>
                <span className="mini-stat-label">Curiosity</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}