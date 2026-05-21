import { useEffect, useRef } from 'react';
import './Customcursor.css';

export default function Customcursor() {
  const dotRef   = useRef(null);
  const ringRef  = useRef(null);
  const posRef   = useRef({ x: -100, y: -100 });
  const ringPos  = useRef({ x: -100, y: -100 });
  const frameRef = useRef(null);
  const hoveredRef = useRef(false);
  const clickedRef = useRef(false);

  useEffect(() => {
    /* ── hide default cursor site-wide ── */
    document.documentElement.classList.add('custom-cursor-active');

    const onMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };
    };

    const onEnter = (e) => {
      const t = e.target.closest(
        'a, button, .project-card, .tech-card, .edu-flip, .cloud-tag, .social-chip, .contact-card, .nav-link, .sw-feature'
      );
      if (t) {
        hoveredRef.current = true;
        dotRef.current?.classList.add('cursor-dot--hover');
        ringRef.current?.classList.add('cursor-ring--hover');
      }
    };

    const onLeave = (e) => {
      const t = e.target.closest(
        'a, button, .project-card, .tech-card, .edu-flip, .cloud-tag, .social-chip, .contact-card, .nav-link, .sw-feature'
      );
      if (t) {
        hoveredRef.current = false;
        dotRef.current?.classList.remove('cursor-dot--hover');
        ringRef.current?.classList.remove('cursor-ring--hover');
      }
    };

    const onDown = () => {
      clickedRef.current = true;
      dotRef.current?.classList.add('cursor-dot--click');
      ringRef.current?.classList.add('cursor-ring--click');
    };

    const onUp = () => {
      clickedRef.current = false;
      dotRef.current?.classList.remove('cursor-dot--click');
      ringRef.current?.classList.remove('cursor-ring--click');
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onEnter);
    document.addEventListener('mouseout', onLeave);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);

    /* ── rAF: dot snaps, ring lerps ── */
    const LERP = 0.13;
    const tick = () => {
      const { x, y } = posRef.current;

      /* dot: instant */
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }

      /* ring: smooth lag */
      ringPos.current.x += (x - ringPos.current.x) * LERP;
      ringPos.current.y += (y - ringPos.current.y) * LERP;
      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate(${ringPos.current.x}px, ${ringPos.current.y}px)`;
      }

      frameRef.current = requestAnimationFrame(tick);
    };
    frameRef.current = requestAnimationFrame(tick);

    return () => {
      document.documentElement.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onEnter);
      document.removeEventListener('mouseout', onLeave);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  /* hide on touch devices */
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      {/* Inner dot — snaps instantly */}
      <div className="cursor-dot" ref={dotRef} />
      {/* Outer ring — lags behind */}
      <div className="cursor-ring" ref={ringRef} />
    </>
  );
}