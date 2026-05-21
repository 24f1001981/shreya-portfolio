import React, { useState } from 'react';
import './TechStack.css';
import { PiPlugChargingFill } from "react-icons/pi";
import { FaBrain, FaHandshake, FaCode, FaWifi } from "react-icons/fa";
import { LiaToolsSolid } from "react-icons/lia";
import { FiCpu, FiMessageCircle, FiEdit3, FiGlobe } from "react-icons/fi";
import { RiTerminalBoxLine, RiTeamLine } from "react-icons/ri";

const technicalGroups = [
  {
    label: 'Embedded Systems & Electronics',
    Icon: FiCpu,
    color: 'pink',
    items: [
      { name: 'Embedded Systems' },
      { name: 'Arduino & ESP32' },
      { name: 'PCB Design' },
      { name: 'Signal Processing' },
      { name: 'Circuit Design' },
      { name: 'Digital Logic Design' },
      { name: 'EDA Tools' },
      { name: 'Analog Electronics' },
      { name: 'Digital Electronics' },
      { name: 'Microcontrollers' },
      { name: 'FPGA' },
    ],
  },
  {
    label: 'IoT & Communication Systems',
    Icon: FaWifi,
    color: 'purple',
    items: [
      { name: 'Internet of Things' },
      { name: 'LoRaWAN' },
      { name: 'Wireless Comm.' },
      { name: 'Cloud Integration' },
    ],
  },
  {
    label: 'Software & Web Development',
    Icon: FaCode,
    color: 'cyan',
    items: [
      { name: 'Full-Stack Dev' },
      { name: 'React' },
      { name: 'Flask' },
      { name: 'SQLite' },
      { name: 'Auth & Authorization' },
      { name: 'Responsive Design' },
      { name: 'HTML5' },
      { name: 'CSS' },
      { name: 'Bootstrap' },
      { name: 'Node.js' },
      { name: 'Firebase' },
      { name: 'REST APIs' },
      { name: 'Tailwind' },
      { name: 'MongoDB' },
    ],
  },
  {
    label: 'AI, ML & Data Science',
    Icon: FaBrain,
    color: 'pink',
    items: [
      { name: 'Machine Learning' },
      { name: 'Deep Learning' },
      { name: 'Generative AI' },
      { name: 'Business Analytics' },
      { name: 'Business Data Mgmt' },
      { name: 'Tools in Data Science' },
      { name: 'Applied Mathematics for ML' },
      { name: 'Data Structures' },
      { name: 'Database Management' },
    ],
  },
  {
    label: 'Programming Languages',
    Icon: RiTerminalBoxLine,
    color: 'purple',
    items: [
      { name: 'Python' },
      { name: 'C/C++' },
      { name: 'Embedded C' },
      { name: 'Assembly' },
      { name: 'Verilog' },
      { name: 'Java' },
      { name: 'JavaScript' },
    ],
  },
  {
    label: 'Tools & Platforms',
    Icon: LiaToolsSolid,
    color: 'cyan',
    items: [
      { name: 'Proteus Suite' },
      { name: 'LTSpice' },
      { name: 'Tinkercad' },
      { name: 'GitHub' },
      { name: 'VS Code' },
      { name: 'MATLAB' },
      { name: 'Linux' },
    ],
  },
];

const interpersonalGroups = [
  {
    label: 'Professional & Community Engagement',
    Icon: RiTeamLine,
    color: 'purple',
    items: [
      { name: 'Student Leadership' },
      { name: 'Team Collaboration' },
      { name: 'Professional Comm.' },
      { name: 'Public Speaking' },
      { name: 'Event Management' },
      { name: 'Community Engagement' },
      { name: 'Volunteering' },
    ],
  },
 
  {
    label: 'Productivity & Creative Tools',
    Icon: FiEdit3,
    color: 'pink',
    items: [
      { name: 'Canva' },
      { name: 'Microsoft Office' },
      { name: 'Google Workspace' },
    ],
  },
  {
    label: 'Languages',
    Icon: FiGlobe,
    color: 'cyan',
    items: [
      { name: 'English' },
      { name: 'Hindi' },
      { name: 'Malayalam' },
    ],
  },
];

function CategoryBlock({ cat, index }) {
  return (
    <div className={`tech-category  reveal-delay-${(index % 3) + 1}`}>
      <div className={`tech-cat-label cat-${cat.color}`}>
        <cat.Icon size={16} />
        <span>{cat.label}</span>
      </div>
      <div className="tech-grid">
        {cat.items.map((item, ii) => (
          <div className={`tech-card tc-${cat.color}`} key={ii}>
            <span className="tech-card-name">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TechStack() {
  const [activeTab, setActiveTab] = useState('technical');

  return (
    <section id="tech" className="section tech-section">
      <div className="container">

        <div className="tech-header">
          <p className="section-label">What I work with</p>
          <h2 className="section-title">Tech Stack</h2>
          <p className="section-subtitle">
            From circuits to cloud — the tools, technologies, and skills that power my builds.
          </p>
        </div>

        <div className="tech-tabs">
          <button
            className={`tech-tab ${activeTab === 'technical' ? 'active' : ''}`}
            onClick={() => setActiveTab('technical')}
          >
            <PiPlugChargingFill size={18} /> Technical Expertise
          </button>
          <button
            className={`tech-tab ${activeTab === 'interpersonal' ? 'active' : ''}`}
            onClick={() => setActiveTab('interpersonal')}
          >
            <FaHandshake size={18} /> Interpersonal & Professional
          </button>
        </div>

        {activeTab === 'technical' && (
          <div className="tech-categories">
            {technicalGroups.map((cat, ci) => (
              <CategoryBlock cat={cat} index={ci} key={ci} />
            ))}
          </div>
        )}

        {activeTab === 'interpersonal' && (
          <div className="tech-categories">
            {interpersonalGroups.map((cat, ci) => (
              <CategoryBlock cat={cat} index={ci} key={ci} />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}