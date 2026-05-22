import { useEffect, useRef } from 'react';
import './Ambientbg.css';

const STAR_COUNT = 120;

function rand(min, max) {
  return min + Math.random() * (max - min);
}

// Pastel palette for dark mode
const DARK_COLORS = [
  '0,255,240',    // cyan
  '0,220,255',    // sky-cyan
  '180,100,255',  // violet-purple
  '210,80,255',   // bright purple
  '255,80,200',   // hot pink
  '255,120,220',  // soft pink
  '255,200,240',  // blush white
];

// Deep saturated palette for light mode — readable against white
const LIGHT_COLORS = [
  '0,180,200',    // deep cyan
  '0,150,220',    // deep sky
  '120,0,200',    // deep violet
  '160,0,220',    // deep purple
  '200,0,140',    // deep magenta
  '180,0,160',    // deep pink
  '100,0,180',    // indigo
];

// Shooting star direction vectors
const DIRECTIONS = [
  { dx: -1,  dy:  0.45 },  // ↙
  { dx:  1,  dy:  0.45 },  // ↘
  { dx: -1,  dy: -0.35 },  // ↖
  { dx:  1,  dy: -0.35 },  // ↗
];

export default function Ambientbg() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    let W, H;
    let frame;
    let scrollY = window.scrollY;

    // Dark / light mode detection
    const darkMQ = window.matchMedia('(prefers-color-scheme: dark)');
    let isDark = darkMQ.matches;

    const getColors  = () => isDark ? DARK_COLORS  : LIGHT_COLORS;
    const getOpacity = () => isDark
      ? { min: 0.1, max: 0.28 }
      : { min: 1.45, max: 1.85 };

    // Will be defined after stars array — see onSchemeChange below

    const onScroll = () => {
      scrollY = window.scrollY;
    };

    const resize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('scroll', onScroll);

    /* ── Ambient stars ── */
    const stars = Array.from({ length: STAR_COUNT }, () => {
      const colors = getColors();
      const op     = getOpacity();
      return {
        x:            Math.random() * W,
        y:            Math.random() * H,
        size:         rand(0.3, 2.2),
        opacity:      rand(op.min, op.max),
        speed:        rand(0.02, 0.08),
        twinkle:      rand(0, Math.PI * 2),
        twinkleSpeed: rand(0.01, 0.03),
        color:        colors[Math.floor(Math.random() * colors.length)],
      };
    });

    // Re-skin stars when OS theme changes
    const onSchemeChange = (e) => {
      isDark = e.matches;
      const colors = getColors();
      const op     = getOpacity();
      stars.forEach((s) => {
        s.color   = colors[Math.floor(Math.random() * colors.length)];
        s.opacity = rand(op.min, op.max);
      });
    };

    darkMQ.addEventListener('change', onSchemeChange);

    /* ── Shooting stars ── */
    let shootingStars = [];

    const spawnShootingStar = () => {
      // 4. Pick a random direction
      const dir = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];

      shootingStars.push({
        x:       rand(W * 0.2, W * 0.9),
        y:       rand(0, H * 0.5),
        len:     rand(80, 180),
        speed:   rand(8, 14),
        life:    0,
        maxLife: 80,
        dx:      dir.dx,
        dy:      dir.dy,
        color:   getColors()[Math.floor(Math.random() * getColors().length)],
      });

      setTimeout(spawnShootingStar, rand(4000, 9000));
    };

    spawnShootingStar();

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      /* ── Stars ── */
      stars.forEach((s) => {
        s.y -= s.speed;
        if (s.y < 0) {
          s.y = H;
          s.x = Math.random() * W;
        }

        // 2. Twinkle pulse
        s.twinkle += s.twinkleSpeed;
        const pulse   = 0.7 + 0.3 * Math.sin(s.twinkle);
        const opacity = s.opacity * pulse;

        // 1. Scroll drift — stars shift very subtly with scroll
        const py = (s.y + scrollY * 0.02) % H;

        ctx.beginPath();
        ctx.arc(s.x, py, s.size, 0, Math.PI * 2);

        // Larger stars get a soft radial glow in their color
        if (s.size > 1.2) {
          const grd = ctx.createRadialGradient(s.x, py, 0, s.x, py, s.size * 3);
          grd.addColorStop(0,   `rgba(${s.color},${opacity})`);
          grd.addColorStop(0.5, `rgba(${s.color},${opacity * 0.4})`);
          grd.addColorStop(1,   `rgba(${s.color},0)`);
          ctx.fillStyle = grd;
        } else {
          ctx.fillStyle = `rgba(${s.color},${opacity})`;
        }

        ctx.fill();
      });

      /* ── Shooting stars ── */
      shootingStars = shootingStars.filter((s) => {
        s.x += s.speed * s.dx;
        s.y += s.speed * Math.abs(s.dy) * Math.sign(s.dy);
        s.life++;

        const alpha = 1 - s.life / s.maxLife;
        const tailX  = s.x - s.len * s.dx;
        const tailY  = s.y - s.len * Math.abs(s.dy) * Math.sign(s.dy);

        const grad = ctx.createLinearGradient(s.x, s.y, tailX, tailY);
        grad.addColorStop(0,   `rgba(${s.color},0)`);
        grad.addColorStop(0.4, `rgba(${s.color},${alpha * 0.7})`);
        grad.addColorStop(1,   `rgba(255,255,255,${alpha})`);

        const glowColor = `rgba(${s.color},${alpha})`;

        // 5. Blur glow — makes them look expensive
        ctx.shadowBlur  = 10;
        ctx.shadowColor = glowColor;

        ctx.beginPath();
        ctx.strokeStyle = grad;
        ctx.lineWidth   = 1.5;
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();

        // Reset shadow so stars aren't blurred
        ctx.shadowBlur = 0;

        return s.life < s.maxLife;
      });

      frame = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
      darkMQ.removeEventListener('change', onSchemeChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="ambient-bg"
      aria-hidden="true"
    />
  );
}