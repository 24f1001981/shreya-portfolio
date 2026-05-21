import React, { useState, useEffect } from 'react';
import './Contact.css';
import { SiGmail, SiGithub } from 'react-icons/si';
import { FaLinkedinIn, FaEye } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi2';
import { GiLotusFlower, GiRose, GiDaisy } from 'react-icons/gi';
import { LuFlower2 } from 'react-icons/lu';

const contactLinks = [
  {
    icon: <SiGmail color="#c2584e" size={22} />,
    label: 'Email',
    value: 'snshreya2004@gmail.com',
    href: 'mailto:snshreya2004@gmail.com',
    accent: 'purple',
  },
  {
    icon: <SiGmail color="#c2584e" size={22} />,
    label: 'IEEE Email',
    value: 'shreyasn@ieee.org',
    href: 'mailto:shreyasn@ieee.org',
    accent: 'purple',
  },
  {
    icon: <SiGithub size={22} className="github-icon" />,
    label: 'GitHub',
    value: 'github.com/24f1001981',
    href: 'https://github.com/24f1001981',
    accent: 'cyan',
  },
  {
    icon: <FaLinkedinIn color="#0A66C2" size={20} />,
    label: 'LinkedIn',
    value: 'linkedin.com/in/shreya-s-n-geck',
    href: 'https://www.linkedin.com/in/shreya-s-n-geck',
    accent: 'pink',
  },
];

const greetings = [
  { text: 'Say hello',     icon: <LuFlower2 size={18} color="var(--cyan)" /> },
  { text: "Kon'nichiwa",     icon: <GiLotusFlower size={18} color="#f472b6" /> },
  { text: 'hakuna matata', icon: <GiDaisy size={18} color="var(--purple-light)" /> },
  { text: 'annyeonghaseyo',     icon: <GiRose size={18} color="#f87171" /> },
];

export default function Contact() {
  const [displayText, setDisplayText] = useState('');
  const [greetIndex, setGreetIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
    const current = greetings[greetIndex].text;
    const currentArr = [...current];
    const displayArr = [...displayText];
    const speed = isDeleting ? 60 : 100;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentArr.slice(0, displayArr.length + 1).join(''));
        if (displayArr.length + 1 === currentArr.length) {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        if (displayArr.length === 0) {
          setIsDeleting(false);
          setGreetIndex(i => (i + 1) % greetings.length);
        } else {
          setDisplayText(currentArr.slice(0, displayArr.length - 1).join(''));
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, greetIndex]);
  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <div className="contact-inner">
          <div className="contact-text reveal">

            {/* Typewriter greeting */}
            <p style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: 'italic',
              fontSize: '16px',
              letterSpacing: '1px',
              color: 'var(--cyan)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '12px',
            }}>
              {greetings[greetIndex].icon}
              {displayText}
              <span style={{
                borderRight: '2px solid var(--cyan)',
                animation: 'blink 0.7s step-end infinite',
                marginLeft: '2px',
              }}>&nbsp;</span>
              {greetings[greetIndex].icon}
            </p>

            <h2 className="section-title">
              Let's build something<br />
              <span className="gradient-text">meaningful</span>
            </h2>
            <div className="divider" />
            <p className="contact-desc">
              Whether it's a project collaboration, a technical conversation,
              or just a hi — I'm always happy to connect. Feel free to reach out through
              any of the channels <HiSparkles size={16} color="var(--cyan)" style={{ display: 'inline', verticalAlign: 'middle' }} />.
            </p>

            
            <a  href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="copy-email-btn"
            >
              <FaEye size={16} /> Preview Resume
            </a>
          </div>

          <div className="contact-links reveal reveal-delay-2">
            {contactLinks.map((link, i) => (
              
              <a  key={i}
                href={link.href}
                target={link.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className={`contact-card cc-${link.accent}`}
              >
                <div className="contact-card-left">
                  <div className={`contact-icon ci-${link.accent}`}>{link.icon}</div>
                  <div className="contact-info">
                    <span className="contact-label">{link.label}</span>
                    <span className="contact-value">{link.value}</span>
                  </div>
                </div>
                <span className="contact-arrow">→</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}