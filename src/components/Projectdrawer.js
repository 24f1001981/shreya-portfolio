import React, { useEffect, useRef, useState } from 'react';
import './Projectdrawer.css';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { BsFillLightningChargeFill } from 'react-icons/bs';
import { IoClose } from 'react-icons/io5';
import { HiArrowUpRight } from 'react-icons/hi2';

export default function Projectdrawer({ project, onClose }) {
  const drawerRef = useRef(null);
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        if (activeImage) setActiveImage(null);  // close lightbox first
        else onClose();                          // then close drawer
      }
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    drawerRef.current?.querySelector('.pd-close')?.focus();
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose, activeImage]);

  if (!project) return null;

  const accentVar =
    project.accent === 'cyan'  ? 'var(--cyan)'        :
    project.accent === 'pink'  ? 'var(--pink)'        :
                                 'var(--purple-light)';

  return (
    <>
      {/* Backdrop */}
      <div className="pd-backdrop" onClick={onClose} aria-hidden="true" />

      {/* Drawer panel — overflow:hidden clips the lightbox */}
      <div
        className="pd-drawer"
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label={`${project.title} details`}
      >
        {/* Accent bar */}
        <div className="pd-accent-bar" style={{ background: accentVar }} />

        {/* Header */}
        <div className="pd-header">
          <div className="pd-header-left">
            <div className="pd-emoji">{project.emoji}</div>
            <div>
              <span className={`pd-status status-${project.accent}`}>{project.status}</span>
              <h2 className="pd-title">{project.title}</h2>
              {project.subtitle && <p className="pd-subtitle">{project.subtitle}</p>}
            </div>
          </div>
          <button className="pd-close" onClick={onClose} aria-label="Close drawer">
            <IoClose size={20} />
          </button>
        </div>

        <div className="pd-divider" />

        {/* Scrollable body */}
        <div className="pd-body">

          {(project.meta || project.beta) && (
            <div className="pd-meta-row">
              {project.meta && <span className="pd-meta-pill">{project.meta}</span>}
              {project.beta && <span className="pd-meta-pill">{project.beta}</span>}
            </div>
          )}

          <div className="pd-section">
            <p className="pd-section-label">About this project</p>
            <div className="pd-description" dangerouslySetInnerHTML={{ __html: project.description }} />
          </div>

          {project.highlights && (
            <div className="pd-section">
              <p className="pd-section-label">Key Highlights</p>
              <ul className="pd-highlights">
                {project.highlights.map((point, i) => (
                  <li key={i} className="pd-highlight-item" style={{ '--highlight-accent': accentVar }}>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {project.screenshots && (
            <div className="pd-section">
              <p className="pd-section-label">Screenshots</p>
              <div className="pd-gallery">
                {project.screenshots.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`${project.title} screenshot ${i + 1}`}
                    className="pd-image"
                    onClick={() => setActiveImage(img)}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="pd-section">
            <p className="pd-section-label">Tech Stack</p>
            <div className="pd-tags">
              {project.tags.map((t, i) => (
                <span key={i} className="pd-tag" style={{ borderColor: `${accentVar}55`, color: accentVar }}>
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="pd-section">
            <p className="pd-section-label">Links</p>
            <div className="pd-links">
              {project.links.github && project.links.github !== '#' && (
                <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="pd-link-btn">
                  <FaGithub size={16} /> GitHub <HiArrowUpRight size={13} />
                </a>
              )}
              {project.links.sparkwhiz && project.links.sparkwhiz !== '#' && (
                <a href={project.links.sparkwhiz} target="_blank" rel="noopener noreferrer" className="pd-link-btn pd-link-spark">
                  <BsFillLightningChargeFill size={14} /> SparkWhiz <HiArrowUpRight size={13} />
                </a>
              )}
              {project.links.linkedin && project.links.linkedin !== '#' && (
                <a href={project.links.linkedin} target="_blank" rel="noopener noreferrer" className="pd-link-btn pd-link-linkedin">
                  <FaLinkedin size={16} /> LinkedIn <HiArrowUpRight size={13} />
                </a>
              )}
              {project.links.demo && project.links.demo !== '#' && (
                <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="pd-link-btn pd-link-demo" style={{ borderColor: accentVar, color: accentVar }}>
                  Live Demo <HiArrowUpRight size={13} />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* ── Lightbox — position:absolute so it's clipped to the drawer ── */}
        {activeImage && (
          <div
            className="pd-image-modal"
            onClick={() => setActiveImage(null)}
            role="dialog"
            aria-label="Image preview"
          >
            <button
              className="pd-close"
              style={{ position: 'absolute', top: 16, right: 16 }}
              onClick={e => { e.stopPropagation(); setActiveImage(null); }}
              aria-label="Close image"
            >
              <IoClose size={20} />
            </button>
            <img
              src={activeImage}
              alt="Expanded preview"
              className="pd-image-expanded"
              onClick={e => e.stopPropagation()}
            />
          </div>
        )}
      </div>
    </>
  );
}