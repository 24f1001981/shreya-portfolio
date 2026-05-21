import React from 'react';
import './SparkWhiz.css';
import { FaSearchengin, FaDesktop } from "react-icons/fa";
import { GiProcessor, GiBrain } from "react-icons/gi";
import { BsLightningChargeFill } from "react-icons/bs";
import { IoRocketSharp } from "react-icons/io5";

export default function SparkWhiz() {
  return (
    <section id="sparkwhiz" className="section sparkwhiz-section">
      <div className="container">
        <div className="sparkwhiz-card reveal">
          {/* Background elements */}
          <div className="sw-blob sw-blob-1" />
          <div className="sw-blob sw-blob-2" />
          <div className="sw-grid" />

          <div className="sw-content">
            <div className="sw-eyebrow">
              <BsLightningChargeFill size={12} color="#b175dc" className="sw-lightning" />
              <span>My Technical Journal</span>
              <BsLightningChargeFill size={12} color="#b175dc" className="sw-lightning" />
            </div>

            <h2 className="sw-title">
              Explore <span className="sw-title-gradient-wrapper"><span className="gradient-text">SparkWhiz</span></span>
            </h2>

            <p className="sw-desc">
              My technical journal where I document detailed project builds, implementation
              processes, challenges faced, and learnings extracted. Deep dives, not quick takes.
            </p>

            <div className="sw-features">
                {[
                    { icon: <FaSearchengin size={18} color="#A78BFA" />, text: 'In-depth project breakdowns' },
                    { icon: <GiProcessor size={17} color="#22D3EE" />, text: 'Embedded systems explorations' },
                    { icon: <FaDesktop size={16} color="#34D399" />, text: 'Full-stack development logs' },
                    { icon: <GiBrain size={18} color="#F472B6" />, text: 'Engineering reflections' },
                  ].map((f, i) => (
                    <div className="sw-feature" key={i}>
                      <span>{f.icon}</span>
                      <span>{f.text}</span>
                    </div>
                  ))}
            </div>

            <a
              href="https://sites.google.com/view/sparkwhiz/home?authuser=0"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary sw-cta"
            >
              <IoRocketSharp size={18} color="#fbfbfd" /> Visit SparkWhiz
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
