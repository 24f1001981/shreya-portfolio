import React, { useState } from 'react';
import './Experience.css';

import { IoRocketSharp, IoBookOutline } from "react-icons/io5";
import { PiStarFill } from "react-icons/pi";
import { MdOutlineSettings, MdOutlineGroups3, MdOutlineEngineering } from "react-icons/md";
import { FaMedal } from "react-icons/fa";

/* ── Experience & Leadership groups ── */
const expGroups = [
  {
    label: <><MdOutlineGroups3 size={18} /> Leadership</>,
    sublabel: 'Roles & Community',
    items: [
      {
        period: '2026 – Present',
        role: 'Women in Aerospace (WIA)',
        org: 'IEEE AESS Kerala Section',
        desc: 'Contributing to a growing network focused on aerospace awareness, mentorship, and empowering women in advanced engineering domains through collaborative initiatives and community-driven programs.',
        icon: <IoRocketSharp size={18} color="#8B5CF6" />,
        accent: '#8B5CF6',
        size: 'normal',
      },
      {
        period: '2026 – Present',
        role: 'Lead - Proposal Writing Team',
        org: 'IEEE SB GEC Kozhikode',
        desc: 'Managing the Proposal Team, overseeing proposal writing, content planning, and documentation for technical events, outreach activities, and organizational initiatives.',
        icon: <PiStarFill size={18} color="#06B6D4" />,
        accent: '#06B6D4',
        size: 'normal',
      },
      {
        period: '2025 – 2026',
        role: 'Secretary, IEEE WIE AG',
        org: 'IEEE SB GEC Kozhikode',
        desc: 'Organising technical workshops, outreach events, and fostering a community for women in engineering. Led initiatives reaching 200+ students.',
        icon: <IoBookOutline size={18} color="#EC4899" />,
        accent: '#EC4899',
        size: 'normal',
      },
    ],
  },
  {
    label: <><MdOutlineEngineering size={18} /> Experience</>,
    sublabel: 'Internships & Activities',
    items: [
      {
        period: '2025 – 2025',
        role: 'Intern, Electronics & Communication',
        org: 'Keltron KSG, Kozhikode',
        desc: 'Completed a one-week internship in Embedded Systems and Python Programming organized by <strong>KELTRON Knowledge Centre - Kozhikode</strong>, gaining hands-on exposure to IoT, PIC microcontroller programming, Proteus, MPLAB IDE, and embedded system development.',
        icon: <MdOutlineSettings size={18} color="#6366F1" />,
        accent: '#6366F1',
        size: 'normal',
      },
      {
        period: '2017 – 2019',
        role: 'NCC Cadet II',
        org: '9(K) Naval Unit NCC Kozhikode, RHSS Nileshwar',
        desc: "<strong>NCC 'A' Certificate holder</strong> and active cadet, developing leadership, discipline, teamwork, and resilience through community service activities, awareness campaigns, training programs, and NCC camps.",
        icon: <FaMedal size={18} color="#8B5CF6" />,
        accent: '#8B5CF6',
        size: 'normal',
      },
    ],
  },
];

/* ── Shared card component ── */
function ExpCard({ item, index }) {
  const [hovered, setHovered] = useState(false);

  const a = {
    border: item.accent,
    glow: `0 8px 32px ${item.accent}33`,
    tag: item.accent,
    orb: `${item.accent}22`,
  };

  return (
    <div
      className={`exp-card exp-card--${item.size} reveal-delay-${(index % 3) + 1}`}
      style={hovered ? { borderColor: a.border, boxShadow: a.glow } : {}}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="exp-card-orb"
        style={{ background: `radial-gradient(circle, ${a.orb} 0%, transparent 70%)` }}
      />
      <div className="exp-card-top">
        <div className="exp-card-icon-wrap" style={hovered ? { borderColor: a.border } : {}}>
          <span className="exp-card-icon">{item.icon}</span>
        </div>
        <span className="exp-card-period">{item.period}</span>
      </div>
      <div className="exp-card-body">
        <h3 className="exp-card-role">{item.role}</h3>
        <p className="exp-card-org" style={hovered ? { color: a.tag } : {}}>{item.org}</p>
        <p className="exp-card-desc" dangerouslySetInnerHTML={{ __html: item.desc }} />
      </div>
      <div
        className="exp-card-bar"
        style={{ background: a.tag, opacity: hovered ? 0.7 : 0.25 }}
      />
    </div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="section exp-section">
      <div className="container">
        <div className="exp-header ">
          <p className="section-label">Background</p>
          <h2 className="section-title">
            Experience &amp; <span className="gradient-text">Leadership</span>
          </h2>
          <p className="section-subtitle">
            Communities, leadership roles, and collaborative journeys that continue to shape me as an engineer and lifelong learner.
          </p>
        </div>
        <div className="exp-groups">
          {expGroups.map((group, gi) => (
            <div className="exp-group" key={gi}>
              <div className="exp-group-header">
                <span className="exp-group-label">{group.label}</span>
                <span className="exp-group-sublabel">{group.sublabel}</span>
                <div className="exp-group-line" />
              </div>
              <div className="exp-bento">
                {group.items.map((item, i) => (
                  <ExpCard key={i} item={item} index={i} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}