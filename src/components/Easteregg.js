import { useEffect, useState, useRef } from 'react';
import './Easteregg.css';
import { BsFillLightningChargeFill } from "react-icons/bs";
import { GiSparkles,GiEasterEgg ,GiMoonOrbit} from "react-icons/gi";
import { PiEyesFill } from "react-icons/pi";
import { FaBoltLightning } from "react-icons/fa6";

/* ── Konami sequence ── */
const KONAMI = [
  'ArrowUp','ArrowUp','ArrowDown','ArrowDown',
  'ArrowLeft','ArrowRight','ArrowLeft','ArrowRight',
  'b','a',
];

/* ── Random confetti particle ── */
function makeParticle(id) {
  const colors = ['#8B5CF6','#22D3EE','#F472B6','#A78BFA','#fff'];
  return {
    id,
    x: Math.random() * 100,       // vw
    y: -10,
    vx: (Math.random() - 0.5) * 1.2,
    vy: Math.random() * 1.8 + 0.8,
    rotation: Math.random() * 360,
    rotationSpeed: (Math.random() - 0.5) * 8,
    size: Math.random() * 8 + 5,
    color: colors[Math.floor(Math.random() * colors.length)],
    shape: Math.random() < 0.5 ? 'rect' : 'circle',
  };
}

export default function Easteregg() {
  const [active, setActive]   = useState(false);
  const [particles, setParticles] = useState([]);
  const keysRef  = useRef([]);
  const frameRef = useRef(null);
  const pRef     = useRef([]);
  const countRef = useRef(0);

  /* ── Listen for Konami ── */
  useEffect(() => {
    const onKey = (e) => {
      keysRef.current = [...keysRef.current, e.key].slice(-KONAMI.length);
      if (keysRef.current.join(',') === KONAMI.join(',')) {
        trigger();
        keysRef.current = [];
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const trigger = () => {
    if (active) return;
    setActive(true);

    /* spawn 120 particles */
    const initial = Array.from({ length: 220 }, (_, i) => makeParticle(i));
    pRef.current = initial;
    countRef.current = 120;
    setParticles([...initial]);

    /* animate */
    const animate = () => {
      pRef.current = pRef.current
        .map(p => ({
          ...p,
          x: p.x + p.vx * 0.28,
          y: p.y + p.vy * 0.32,
          vy: p.vy + 0.02,          // gravity
          rotation: p.rotation + p.rotationSpeed,
        }))
        .filter(p => p.y < 115);   // remove offscreen

      setParticles([...pRef.current]);

      if (pRef.current.length > 0) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };
    frameRef.current = requestAnimationFrame(animate);

    /* auto-dismiss after 4s */
    setTimeout(() => {
      setActive(false);
      cancelAnimationFrame(frameRef.current);
      pRef.current = [];
      setParticles([]);
    }, 11200);
  };

  if (!active) return null;

  return (
    <div className="ee-overlay" aria-live="polite">
      {/* Confetti canvas layer */}
      <div className="ee-confetti" aria-hidden="true">
        {particles.map(p => (
          <div
            key={p.id}
            className={`ee-particle ee-particle--${p.shape}`}
            style={{
              left: `${p.x}vw`,
              top: `${p.y}vh`,
              width: p.size,
              height: p.shape === 'rect' ? p.size * 0.45 : p.size,
              background: p.color,
              transform: `rotate(${p.rotation}deg)`,
              opacity: Math.max(0, 1 - (p.y / 115)),
            }}
          />
        ))}
      </div>

      {/* Message card */}
      <div className="ee-card">
        <div className="ee-glyph gradient-icon"><GiEasterEgg /></div>
        <h2 className="ee-title">
            <GiSparkles className="gradient-icon" /> 
            대박 !!
            <GiSparkles className="gradient-icon" /> 
            <br />
            Easter Egg Foundd !!
        </h2>
        <p className="ee-body">
          well well well—<br/>that wasn't an accident  <PiEyesFill/> <br/> someone still remembers the konami code  <FaBoltLightning/><br/> you've entered the 0.01%<br/> who found the hidden side of this portfolio!! <br/>
        </p>
        <p className="ee-sub"> ↑↑↓↓←→←→BA </p>
        <button
          className="ee-close"
          onClick={() => {
            setActive(false);
            cancelAnimationFrame(frameRef.current);
            pRef.current = [];
            setParticles([]);
          }}
        >
          back to orbit  <GiMoonOrbit />
        </button>
      </div>
    </div>
  );
}