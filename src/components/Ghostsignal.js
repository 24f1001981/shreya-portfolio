import { useEffect, useRef, useState } from 'react';
import './Ghostsignal.css';

// Different "transmissions" — each feels like a different fragment
const SIGNALS = [
  '↑↑↓↓←→←→ ...',
  '// the sequence remembers',
  '> awaiting input...',
  '↑↑↓↓ the rest is instinct',
  '[SIGNAL LOST]',
  '> konami.exe initiated',
  '↑↑↓↓←→←→BA',
  '__ __ __ __ ...',
  'you already know the pattern',
  '[TRANSMISSION INTERCEPTED]',
  '> unlock sequence detected',
  'the code is older than the stars',
  '// curiosity unlocks everything',
  '[ACCESS PARTIALLY GRANTED]',
  '> hidden protocol online',
  'not every user finds this',
  '[ANOMALY DETECTED]',
  '> sequence accepted',
  '// there is always an easter egg',
  '↑ ↑ ↓ ↓ ← → ← →',
  '[REDACTED]',
  '> reality.sys modified',
  'signal recovered...',
  '// some secrets want to be found',
];

// Random position — avoid center of screen so it doesn't block content
function randomPos() {
  const zones = [
    { top: `${4  + Math.random() * 10}vh`, left: `${3  + Math.random() * 20}vw` },
    { top: `${4  + Math.random() * 10}vh`, right:`${3  + Math.random() * 20}vw` },
    { top: `${80 + Math.random() * 12}vh`, left: `${3  + Math.random() * 25}vw` },
    { top: `${80 + Math.random() * 12}vh`, right:`${3  + Math.random() * 25}vw` },
    { top: `${40 + Math.random() *  8}vh`, left: `${1  + Math.random() *  6}vw` },
    { top: `${40 + Math.random() *  8}vh`, right:`${1  + Math.random() *  6}vw` },
  ];
  return zones[Math.floor(Math.random() * zones.length)];
}

export default function Ghostsignal() {
  const [visible, setVisible]   = useState(false);
  const [signal,  setSignal]    = useState('');
  const [pos,     setPos]       = useState({});
  const [glitch,  setGlitch]    = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    const schedule = () => {
      // show every 8–18 seconds — rare enough to feel accidental
      const delay = 2000 + Math.random() * 10000;

      timerRef.current = setTimeout(() => {
        // pick signal + position
        setSignal(SIGNALS[Math.floor(Math.random() * SIGNALS.length)]);
        setPos(randomPos());
        setVisible(true);
        setGlitch(false);

        // glitch flash mid-life
        setTimeout(() => setGlitch(true),  600);
        setTimeout(() => setGlitch(false), 800);
        setTimeout(() => setGlitch(true),  1100);
        setTimeout(() => setGlitch(false), 1200);

        // disappear after 1.6s
        setTimeout(() => {
          setVisible(false);
          schedule(); // schedule next appearance
        }, 4600);

      }, delay);
    };

    // first appearance after 6s so page has loaded
    timerRef.current = setTimeout(() => {
      schedule();
    }, 6000);

    return () => clearTimeout(timerRef.current);
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`ghost-signal ${glitch ? 'ghost-signal--glitch' : ''}`}
      style={pos}
      aria-hidden="true"
    >
      {signal}
    </div>
  );
}