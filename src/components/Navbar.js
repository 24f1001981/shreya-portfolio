import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { ImSun } from "react-icons/im";
import { BsFillMoonStarsFill,BsFillLightningChargeFill  } from "react-icons/bs";


const links = [
  { label: 'About', href: '#about' },
  { label: 'Education', href: '#education' },
  { label: 'Skills', href: '#tech' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'SparkWhiz', href: '#sparkwhiz' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#about');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    const sections = document.querySelectorAll('section');

    const handleScroll = () => {
      let current = '';

      sections.forEach(section => {
        const rect = section.getBoundingClientRect();

        if (
          rect.top <= window.innerHeight * 0.32 &&
          rect.bottom >= window.innerHeight * 0.32
        ) {
          current = `#${section.id}`;
        }
      });

      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const handleNav = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView();
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-inner container">
        <a href="#hero" className="navbar-logo" onClick={e => handleNav(e, '#hero')}>
          <span className="logo-text">Shreya S N</span>
          <BsFillLightningChargeFill className="logo-bolt" />
        </a>

        <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          {links.map(link => (
            <a
              key={link.label}
              href={link.href}
              className={`nav-link ${
                activeSection === link.href ? 'active' : ''
              }`}
              onClick={e => handleNav(e, link.href)}
            >
              {link.label}
            </a>
          ))}
          <button
            className={`theme-toggle ${theme}`}
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <ImSun /> : <BsFillMoonStarsFill />}
          </button>
        </div>

        <button
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Menu"
        >
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
}
