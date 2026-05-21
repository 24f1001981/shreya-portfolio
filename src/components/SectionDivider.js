import React from 'react';
import './SectionDivider.css';

export default function SectionDivider() {
  return (
    <div className="section-divider" aria-hidden="true">
      <div className="section-divider-line" />
      <div className="section-divider-glow" />
    </div>
  );
}