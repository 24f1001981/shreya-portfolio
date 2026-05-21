import React, { useState } from 'react';
import './Projects.css';
import { FaGithub } from "react-icons/fa";
import { BsFillLightningChargeFill } from "react-icons/bs";
import { LiaStethoscopeSolid } from "react-icons/lia";
import { GrAppsRounded } from "react-icons/gr";
import { PiLockKeyFill } from "react-icons/pi";
import { FaLinkedin } from "react-icons/fa";
const projects = [
  {
    title: 'Soil Doctor ', subtitle: 'Smart Portable Soil Health Analyzer',
    meta : '[Model: SDX-01]',
    beta : 'KTU Mini-project',
    description:
      'An ESP32-based portable soil monitoring system that measures real-time NPK, moisture, temperature, EC, and pH using an RS485 multi-parameter sensor, and provides intelligent crop and fertilizer recommendations through a Decision Tree–based rule engine.<br/><br/><strong> Key Highlights :</strong> <br/> • Real-time measurement of NPK and soil parameters<br/> • ESP32-based embedded processing<br/> •  Decision Tree–based recommendation system<br/> • 16×2 LCD display with simple user interface<br/> • Portable and low-cost design<br/> • Supports sustainable and precision agriculture <br/>',
    tags: ['ESP32', 'IoT', 'Python', 'MQTT', 'React'],
    accent: 'cyan',
    emoji: <LiaStethoscopeSolid/>,
    status: 'Featured',
    links: { demo: '#',linkedin :'#', github: 'https://github.com/24f1001981/Soil-Doctor-KTU-Miniproject-', sparkwhiz: 'https://sites.google.com/view/sparkwhiz/electrosphere/realwire/soil-doctor?authuser=0' },
  },
  {
    title: 'RecruitEase', subtitle : 'Placement Portal Application',
    beta :'IITM MAD 1 Project ',
    description: `
A Flask-based campus placement portal for Admins, Companies, and Students to manage recruitment drives, applications, and approvals.

<br/><br/><strong>Key Features :</strong><br/>

• <strong>Role-Based Access System :</strong><br/>
Separate modules for Admin, Company, and Student with secure authentication and dedicated dashboards.

<br/>
• <strong>Placement Drive Management :</strong><br/>
Companies can create, edit, close, and manage placement drives, while admins can approve or reject them.

<br/>

• <strong>Application & Recruitment Tracking :</strong><br/>
Students can apply to drives and track statuses like Applied, Shortlisted, Selected, Rejected, or Waiting.

<br/>

• <strong>Advanced Admin Controls :</strong><br/>
Admins can search, blacklist, restore, or delete students, companies, and drives.

<br/>

• <strong>Profile & Document Management :</strong><br/>
Students and companies can upload resumes, profile photos, and company logos.

<br/>

• <strong>Interactive Dashboards & Analytics :</strong><br/>
Live statistics for applications, drives, shortlisted candidates, and selections.
`,
tags: ['Render', 'Flask', 'Python', 'Jinja2',  'HTML5' ,'Bootstrap 5' ,'SQLite'],
    accent: 'purple',
    emoji: <GrAppsRounded/>,
    status: 'Live',
    links: { demo: 'https://drive.google.com/file/d/1FzIQ6Jdh5mqZCQnzj7Ge5lkJPONDRvBE/view?usp=sharing',linkedin :'https://www.linkedin.com/posts/shreya-s-n-geck_iitmadras-bsdatascience-flask-activity-7460733168028000257-Ylqm?utm_source=share&utm_medium=member_desktop&rcm=ACoAADMPzHEBleB7JPtfyZbwAwnXWrhhZMnKu2I', github: 'https://github.com/24f1001981/placement-portal-app', sparkwhiz: 'https://sites.google.com/view/sparkwhiz/codecanvas/appstudio/placement-portal-system?authuser=0' },
  },
  {
    title: 'CircuitGuard',
    subtitle :'Password Protected Lock System',
    meta : 'Built with PIC16F877A',
    beta : 'Simulated in Proteus',
    description:
    `
CircuitGuard is a security system simulation developed using the PIC16F877A microcontroller. Designed for small-scale secure entry applications, this project features a 4x3 keypad, 16x2 LCD, visual indicators (LEDs). It requires a 4-digit PIN for access and includes a lockout mechanism after three failed attempts to enhance security.

<br/><br/><strong>Key Highlights :</strong><br/>
• User-friendly keypad interface
<br/>
• LCD feedback for PIN entry and status messages
<br/>
• Red/Green LED indicators for access granted and denial messages
<br/>
• Auto lock for 10 seconds after 3 wrong attempts
<br/>
• Compact and modular design using Proteus simulation
<br/>
• Built completely from scratch using structured C
`,
    tags: ['PIC16F877A Microcontrolle', 'Embedded C', 'MPLAB IDE', 'Proteus 8.9 ','PCB & Circuit Design','IoT','Electrical Safety & Monitoring Systems'],
    accent: 'pink',
    emoji: < PiLockKeyFill/> ,
    status: 'Hardware (Simulation)',
    links: { demo: 'https://drive.google.com/file/d/1rLBct0EhoUBXl7SiQaQ-xzD3Z8qEhbHd/view?usp=sharing', linkedin :'https://www.linkedin.com/posts/shreya-s-n-geck_embeddedsystems-pic16f877a-engineeringstudent-activity-7341002822865297408-mTLa?utm_source=share&utm_medium=member_desktop&rcm=ACoAADMPzHEBleB7JPtfyZbwAwnXWrhhZMnKu2I',github: 'https://github.com/24f1001981/CircuitGuard', sparkwhiz: 'https://sites.google.com/view/sparkwhiz/electrosphere/simulab/circuitguard?authuser=0' },
  },
  {
    title: 'Portfolio Website',
    description:
      'This very website — designed from scratch with a focus on performance, subtle animations, and a consistent design language. Dark/light mode, fully responsive, deployed on Vercel.',
    tags: ['React', 'CSS', 'Framer Motion', 'Vercel'],
    accent: 'purple',
    emoji: < BsFillLightningChargeFill/>,
    status: 'Open Source',
    links: { demo: '#',linkedin :'#', github: '#', sparkwhiz: '#' },
  },
];

const accentMap = {
  purple: { bg: 'rgba(139,92,246,0.08)', border: 'rgba(139,92,246,0.35)', glow: 'rgba(139,92,246,0.2)' },
  cyan:   { bg: 'rgba(34,211,238,0.06)', border: 'rgba(34,211,238,0.3)',   glow: 'rgba(34,211,238,0.15)' },
  pink:   { bg: 'rgba(244,114,182,0.06)', border: 'rgba(244,114,182,0.3)', glow: 'rgba(244,114,182,0.15)' },
};

function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false);
  const a = accentMap[project.accent];

  return (
    <div
      className={`project-card reveal reveal-delay-${(index % 2) + 1}`}
      style={hovered ? {
        borderColor: a.border,
        boxShadow: `0 8px 40px ${a.glow}`,
      } : {}}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top bar */}
      <div className="project-card-top">
        <div className="project-title-row">
          <div className="project-emoji">{project.emoji}</div>
          <h3 className="project-title">{project.title}</h3>
        </div>
        <span className={`project-status status-${project.accent}`}>{project.status}</span>
      </div>

      {/* Content */}
      
      {project.subtitle && (
        <p className="project-subtitle">{project.subtitle}</p>
      )}
      {project.meta && <p className="project-meta">{project.meta}</p>}
      {project.beta && <p className="project-beta">{project.beta}</p>}
      <p className="project-desc" dangerouslySetInnerHTML={{ __html: project.description }} />

      {/* Tags */}
      <div className="project-tags">
        {project.tags.map((t, i) => (
          <span className="tag" key={i}>{t}</span>
        ))}
      </div>

      {/* Links */}
      <div className="project-links">

        <a
          href={project.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="project-link"
        >
          <FaGithub className="link-icon" />
          GitHub
        </a>

        <a
          href={project.links.sparkwhiz}
          target="_blank"
          rel="noopener noreferrer"
          className="project-link"
        >
          <BsFillLightningChargeFill className="link-icon spark-icon" />
          SparkWhiz
        </a>
        <a
          href={project.links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="project-link"
        >
          <FaLinkedin className="link-icon spark-icon" />
          LinkedIn
        </a>

        {project.links.demo && project.links.demo !== '#' && (
          <a
            href={project.links.demo}
            target="_blank"
            rel="noopener noreferrer"
            className={`project-link-primary link-${project.accent}`}
          >
            Live Demo →
          </a>
        )}

      </div>
    </div>
  );
}

export default function Projects() {
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
            <ProjectCard project={p} index={i} key={i} />
          ))}
        </div>

        <div className="projects-cta reveal">
          <a href="https://github.com/24f1001981" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
            View all on GitHub →
          </a>
        </div>
      </div>
    </section>
  );
}
