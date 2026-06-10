import React, { useState } from 'react';
import './Projects.css';
import { FaGithub } from "react-icons/fa";
import { BsFillLightningChargeFill } from "react-icons/bs";
import { LiaStethoscopeSolid } from "react-icons/lia";
import { GrAppsRounded } from "react-icons/gr";
import { PiLockKeyFill } from "react-icons/pi";
import { FaLinkedin } from "react-icons/fa";
import {GiSatelliteCommunication} from "react-icons/gi";

// ── Feature 3: import the drawer ──
import Projectdrawer from './Projectdrawer';

const projects = [
  {
    title: 'Soil Doctor ', subtitle: 'Smart Portable Soil Health Analyzer',
    meta : '[Model: SDX-01]',
    beta : 'KTU Mini-project',
    description:
      'An ESP32-based portable soil monitoring system that measures real-time NPK, moisture, temperature, EC, and pH using an RS485 multi-parameter sensor, and provides intelligent crop and fertilizer recommendations through a Decision Tree–based rule engine.',
    highlights: [
       'Real-time measurement of NPK and soil parameters',
        'ESP32-based embedded processing',
        ' Decision Tree–based recommendation system',
        '16×2 LCD display with simple user interface',
        'Portable and low-cost design',
        'Supports sustainable and precision agriculture',
    ],  
    tags: ['ESP32', 'ML', 'Python', 'Embedded C++', 'Modbus RTU'],
    accent: 'cyan',
    emoji: <LiaStethoscopeSolid/>,
    status: 'Agriculture',
    screenshots: [
    '/images/soildoctor/Decision.png',
    '/images/soildoctor/Soil.png',
    '/images/soildoctor/fig.jpeg',
  ],
    links: { demo: '#', linkedin: 'https://www.linkedin.com/posts/shreya-s-n-geck_embeddedai-esp32-ai-ugcPost-7465386911264583681-ai9P/?utm_source=share&utm_medium=member_desktop&rcm=ACoAADMPzHEBleB7JPtfyZbwAwnXWrhhZMnKu2I', github: 'https://github.com/24f1001981/Soil-Doctor-KTU-Miniproject-', sparkwhiz: 'https://sites.google.com/view/sparkwhiz/electrosphere/realwire/soil-doctor?authuser=0' },
  github : 'https://github.com/24f1001981/Soil-Doctor-KTU-Miniproject-'},
  {
    title: 'RecruitEase', subtitle : 'Placement Portal Application',
    beta :'IITM MAD 1 Project ',
    description: 
'A Flask-based campus placement portal for Admins, Companies, and Students to manage recruitment drives, applications, and approvals.',

    highlights: [
  'Role-based portal for Admins, Companies, and Students with secure authentication and dedicated dashboards',

  'Placement drive management system enabling companies to create, edit, and manage recruitment drives efficiently',

  'Application tracking workflow with statuses like Applied, Shortlisted, Selected, Rejected, and Waiting',

  'Advanced admin controls for managing students, companies, drives, blacklist actions, and approvals',

  'Resume, profile photo, and company logo upload support for better profile management',

  'Interactive dashboards with live analytics and recruitment statistics',
],

    tags: ['Render', 'Flask', 'Python', 'Jinja2', 'HTML5', 'Bootstrap 5', 'SQLite'],
    accent: 'purple',
    emoji: <GrAppsRounded/>,
    status: 'App',
    screenshots: [
    '/images/recruitease/admindashboard.png',
    '/images/recruitease/analytics.png',
    '/images/recruitease/company.png',
    '/images/recruitease/companylist.png',
    '/images/recruitease/student.png',
  ],
    links: { demo: 'https://drive.google.com/file/d/1FzIQ6Jdh5mqZCQnzj7Ge5lkJPONDRvBE/view?usp=sharing', linkedin: 'https://www.linkedin.com/posts/shreya-s-n-geck_iitmadras-bsdatascience-flask-activity-7460733168028000257-Ylqm?utm_source=share&utm_medium=member_desktop&rcm=ACoAADMPzHEBleB7JPtfyZbwAwnXWrhhZMnKu2I', github: 'https://github.com/24f1001981/placement-portal-app', sparkwhiz: 'https://sites.google.com/view/sparkwhiz/codecanvas/appstudio/placement-portal-system?authuser=0' },
  },
  {
    title: 'CircuitGuard',
    subtitle :'Password Protected Lock System',
    meta : 'Built with PIC16F877A',
    beta : 'Simulated in Proteus',
    description:
    'CircuitGuard is a security system simulation developed using the PIC16F877A microcontroller. Designed for small-scale secure entry applications, this project features a 4x3 keypad, 16x2 LCD, visual indicators (LEDs). It requires a 4-digit PIN for access and includes a lockout mechanism after three failed attempts to enhance security.',

  highlights: [
  'User-friendly keypad interface for secure PIN-based access',

  '16×2 LCD display providing real-time PIN entry and system status feedback',

  'Red and green LED indicators for access granted and denied notifications',

  'Automatic 10-second lockout mechanism after three incorrect password attempts',

  'Compact modular circuit designed and simulated using Proteus',

  'Developed completely from scratch using Embedded C and PIC16F877A',
],
    tags: ['PIC16F877A Microcontroller', 'Embedded C', 'MPLAB IDE', 'Proteus 8.9', 'PCB & Circuit Design', 'IoT', 'Electrical Safety & Monitoring Systems'],
    accent: 'pink',
    emoji: <PiLockKeyFill/>,
    status: 'Microcontroller (Simulation)',
    screenshots: [
    '/images/circuitguard/circuitdiagram.png',
    '/images/circuitguard/circuitguard.png',,
  ],
    links: { demo: 'https://drive.google.com/file/d/1rLBct0EhoUBXl7SiQaQ-xzD3Z8qEhbHd/view?usp=sharing', linkedin: 'https://www.linkedin.com/posts/shreya-s-n-geck_embeddedsystems-pic16f877a-engineeringstudent-activity-7341002822865297408-mTLa?utm_source=share&utm_medium=member_desktop&rcm=ACoAADMPzHEBleB7JPtfyZbwAwnXWrhhZMnKu2I', github: 'https://github.com/24f1001981/CircuitGuard', sparkwhiz: 'https://sites.google.com/view/sparkwhiz/electrosphere/simulab/circuitguard?authuser=0' },
  },
  {
    title: 'Adaptive Wireless Communication System', subtitle : 'Performance Analysis of Threshold-Based Modulation Switching over AWGN and Rayleigh Fading Channels',
    beta :'Built with MATLAB R2024a App Designer ',
    description: 
'AdaptiveCommSim is a real-time wireless communication simulator built in MATLAB App Designer. It implements threshold-based adaptive modulation (BPSK/QPSK) over AWGN and Rayleigh fading channels, with four live visualisation panels — BER curves, IQ constellation, carrier waveform, and eye diagram — and a live metrics dashboard.',

    highlights: [
  'Threshold-based adaptive controller auto-switches between BPSK and QPSK based on live SNR vs user-defined threshold',

'BPSK and QPSK with accurate Gray coding, coherent PSK demodulation, and validated BER against berawgn / berfading theory curves',
'Two-path Rayleigh fading channel with 100 Hz Doppler shift + configurable AWGN; SNR range −2 to 30 dB',

'Four live axes: BER vs SNR · IQ Constellation · Carrier Waveform · Eye Diagram — all updated per run',

'Live metrics dashboard: throughput (Mbps), spectral efficiency (b/s/Hz), BER, active modulation — with adaptive mode lamp indicator',

'Adaptive gain ~30–60% improvement in time-averaged spectral efficiency over fixed BPSK in a 0–20 dB mobile channel scenario',
],

    tags: ['MATLAB App Designer','BPSK-QPSK','AWGN & Rayleigh Fading','Gray Coding','Adaptive Modulation'],
    accent: 'purple',
    emoji: <GiSatelliteCommunication/>,
    status: 'Commn (Simulation)',
    screenshots: [
    '/images/adaptive/1.png',
    '/images/adaptive/2.png',
    '/images/adaptive/3.png',
    '/images/adaptive/4.png',
  ],
    links: { demo: '', linkedin: '', github: 'https://github.com/24f1001981/placement-portal-app', sparkwhiz: 'https://sites.google.com/view/sparkwhiz/codecanvas/appstudio/placement-portal-system?authuser=0' },
  },
];

const accentMap = {
  purple: { bg: 'rgba(139,92,246,0.08)', border: 'rgba(139,92,246,0.35)', glow: 'rgba(139,92,246,0.2)' },
  cyan:   { bg: 'rgba(34,211,238,0.06)', border: 'rgba(34,211,238,0.3)',   glow: 'rgba(34,211,238,0.15)' },
  pink:   { bg: 'rgba(244,114,182,0.06)', border: 'rgba(244,114,182,0.3)', glow: 'rgba(244,114,182,0.15)' },
};

function ProjectCard({ project, index, onClick }) {
  const [hovered, setHovered] = useState(false);
  const a = accentMap[project.accent];

  return (
    <div
      className={`project-card reveal-delay-${(index % 2) + 1}`}
      style={{
        cursor: 'pointer',
        ...(hovered ? { borderColor: a.border, boxShadow: `0 8px 40px ${a.glow}` } : {}),
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onClick()}
    >
      {/* Top bar */}
      <div className="project-card-top">
        <div className="project-title-row">
          <div className="project-emoji">{project.emoji}</div>
          <h3 className="project-title">{project.title}</h3>
        </div>
        <span className={`project-status status-${project.accent}`}>{project.status}</span>
      </div>

      {project.subtitle && <p className="project-subtitle">{project.subtitle}</p>}
      {project.meta && <p className="project-meta">{project.meta}</p>}
      {project.beta && <p className="project-beta">{project.beta}</p>}

      <p className="project-desc" dangerouslySetInnerHTML={{ __html: project.description }} />

      <div className="project-tags">
        {project.tags.map((t, i) => (
          <span className="tag" key={i}>{t}</span>
        ))}
      </div>

      {/* Links — stop propagation so clicks on links don't also open drawer */}
      <div className="project-links" onClick={e => e.stopPropagation()}>
        <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="project-link">
          <FaGithub className="link-icon" /> GitHub
        </a>
        <a href={project.links.sparkwhiz} target="_blank" rel="noopener noreferrer" className="project-link">
          <BsFillLightningChargeFill className="link-icon spark-icon" /> SparkWhiz
        </a>
        <a href={project.links.linkedin} target="_blank" rel="noopener noreferrer" className="project-link">
          <FaLinkedin className="link-icon spark-icon" /> LinkedIn
        </a>
        {project.links.demo && project.links.demo !== '#' && (
          <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className={`project-link-primary link-${project.accent}`}>
            Live Demo →
          </a>
        )}
      </div>

      {/* Subtle hint to open drawer */}
      <p className="project-open-hint">Click card for full details →</p>
    </div>
  );
}

export default function Projects() {
  const [activeProject, setActiveProject] = useState(null);

  return (
    <section id="projects" className="section projects-section">
      <div className="container">
        <div className="projects-header reveal">
          <p className="section-label">What I've built</p>
          <h2 className="section-title">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="section-subtitle">
            A curated selection of things I've built — from hardware to web to everything in between.
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((p, i) => (
            <ProjectCard
              project={p}
              index={i}
              key={i}
              onClick={() => setActiveProject(p)}
            />
          ))}
        </div>

        <div className="projects-cta reveal">
          <a href="https://github.com/24f1001981" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
            View all on GitHub →
          </a>
        </div>
      </div>

      {/* Feature 3: Project drawer */}
      {activeProject && (
        <Projectdrawer
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      )}
    </section>
  );
}