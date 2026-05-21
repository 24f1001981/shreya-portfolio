import React from 'react';
import './Footer.css';
import { GiCometSpark } from "react-icons/gi";
import { GiLightningBow } from "react-icons/gi";
import { BsLightningCharge } from "react-icons/bs";

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="footer">
      <div className="footer-line" />
      <div className="container footer-inner">
        <div className="footer-left">
          <span className="footer-name">Shreya S N <BsLightningCharge size={16} color="#d892e1" style={{ display: 'inline', verticalAlign: 'middle' }} /> </span>
          <p className="footer-tagline">
            Built with curiosity, caffeine, and code <GiLightningBow size={16} color="var(--purple)" style={{ display: 'inline', verticalAlign: 'middle' }} />
          </p>
        </div>

        <div className="footer-center">
          <span className="footer-copy">© {year} Shreya S N. All rights reserved.</span>
        </div>

        <div className="footer-right">
          <button className="back-top-btn" onClick={scrollTop} aria-label="Back to top">
            ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
