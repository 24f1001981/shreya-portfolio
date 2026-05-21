import React, { useState } from 'react';
import './Education.css';

import { GrPersonalComputer } from "react-icons/gr";
import { FaGraduationCap, FaSchool } from "react-icons/fa";

/* ── Education data ── */
const educationItems = [
  {
    period: '2024 – Present',
    role: 'BS Degree in Data Science & Applications',
    org: 'Indian Institute of Technology Madras',
    desc: 'Pursuing a concurrent undergraduate degree in <strong>Data Science and Applications</strong> alongside ECE, with dual diploma certifications in <strong>Programming and Data Science</strong> — deepening expertise in machine learning, programming, and data-driven problem solving.',
    icon: <GrPersonalComputer size={18} color="#22D3EE" />,
    accent: '#22D3EE',
  },
  {
    period: '2023 – Present',
    role: 'B.Tech (Hons.), Electronics & Communication Engineering',
    org: 'Govt. Engineering College Kozhikode · APJ Abdul Kalam Technological University (KTU)',
    desc: '• Pursuing a <strong>B.Tech Honours in Electronics & Communication Engineering with a Minor in Computer Science & Design</strong>, while exploring embedded systems, communication technologies, signal processing, and intelligent systems through innovation-focused projects<br/> • <strong> Current CGPA : 8.59.</strong>',
    icon: <FaGraduationCap size={18} color="#D946EF" />,
    accent: '#D946EF',
  },
  {
    period: '2020 – 2022',
    role: 'Higher Secondary, Science (PCMB)',
    org: "Rajah's Higher Secondary School Nileshwar · Kerala State Board",
    desc: '• Science Stream — Physics, Chemistry, Mathematics, Biology<br/> • <strong>Percentage: 97.5%</strong>',
    icon: <FaSchool size={18} color="#e96f8d" />,
    accent: '#e96f8d',
  },
  {
    period: '2020',
    role: 'Secondary School Leaving Certificate (SSLC)',
    org: "Rajah's Higher Secondary School Nileshwar · Kerala State Board",
    desc: '• Secondary Education<br/>• <strong>Grade: Full A+</strong>',
    icon: <FaSchool size={18} color="#f9d507" />,
    accent: '#f9d507',
  },
];

function EduItem({ item, index, isLast }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`edu-item reveal reveal-delay-${(index % 3) + 1}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Timeline rail */}
      <div className="edu-rail">
        <div
          className="edu-dot"
          style={{
            borderColor: hovered ? item.accent : `${item.accent}55`,
            boxShadow: hovered ? `0 0 0 4px ${item.accent}22` : 'none',
          }}
        >
          <span className="edu-dot-inner" style={{ background: item.accent }} />
        </div>
        {!isLast && <div className="edu-rail-line" />}
      </div>

      {/* Content */}
      <div
        className="edu-content"
        style={hovered ? {
          borderColor: item.accent,
          boxShadow: `0 4px 24px ${item.accent}22`,
        } : {}}
      >
        {/* Left accent stripe */}
        <div className="edu-stripe" style={{ background: item.accent, opacity: hovered ? 1 : 0.65 }} />

        <div className="edu-content-inner">
          <div className="edu-top">
            <div className="edu-icon-wrap" style={hovered ? { borderColor: item.accent, background: `${item.accent}18` } : {}}>
              {item.icon}
            </div>
            <span className="edu-period">{item.period}</span>
          </div>
          <h3 className="edu-role">{item.role}</h3>
          <p className="edu-org" style={hovered ? { color: item.accent } : {}}>{item.org}</p>
          <p className="edu-desc" dangerouslySetInnerHTML={{ __html: item.desc }} />
        </div>
      </div>
    </div>
  );
}

export default function Education() {
  return (
    <section id="education" className="section edu-section">
      <div className="container">
        <div className="edu-header reveal">
          <p className="section-label">Academic Background</p>
          <h2 className="section-title">
            <span className="gradient-text">Education</span>
          </h2>
          <p className="section-subtitle">
            Degrees, and academic milestones that form the foundation
            of my engineering journey.
          </p>
        </div>

        <div className="edu-timeline">
          {educationItems.map((item, i) => (
            <EduItem
              key={i}
              item={item}
              index={i}
              isLast={i === educationItems.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}