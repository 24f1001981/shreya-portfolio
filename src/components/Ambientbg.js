import { useEffect, useRef } from 'react';
import './Ambientbg.css';

const STAR_COUNT = 80;

function rand(min, max) {
  return min + Math.random() * (max - min);
}

const DARK_COLORS = [
  '0,255,240',
  '0,220,255',
  '180,100,255',
  '210,80,255',
  '255,80,200',
  '255,120,220',
  '255,200,240',
];

const LIGHT_COLORS = [
  '0,100,160',
  '0,80,180',
  '80,0,160',
  '120,0,180',
  '160,0,120',
  '140,0,150',
  '60,0,140',
];

const DIRECTIONS = [
  { dx: -1, dy:  0.45 },
  { dx:  1, dy:  0.45 },
  { dx: -1, dy: -0.35 },
  { dx:  1, dy: -0.35 },
];

function getTheme() {
  return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
}

export default function Ambientbg() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let W, H, frame;

    const isDark = () => getTheme() === 'dark';
    const getColors  = () => isDark() ? DARK_COLORS : LIGHT_COLORS;
    const getOpacity = () => isDark()
      ? { min: 0.10, max: 0.25 }
      : { min: 0.08, max: 0.18 };

    const resize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    /* ── Stars with wandering motion ── */
    const stars = Array.from({ length: STAR_COUNT }, () => {
      const colors = getColors();
      const op     = getOpacity();
      return {
        x:            Math.random() * W,
        y:            Math.random() * H,
        size:         rand(0.2, 2.8),
        opacity:      rand(op.min, op.max),
        color:        colors[Math.floor(Math.random() * colors.length)],

        // gentle upward drift (very slow)
        vy:           rand(0.008, 0.04),

        // wandering: each star has its own phase + radius so they
        // all drift differently — some wide, some tight circles
        wanderAngle:  rand(0, Math.PI * 2),
        wanderSpeed:  rand(0.004, 0.012),   // how fast it orbits
        wanderRadius: rand(1.5, 4.4),        // pixels — tiny!

        // twinkle
        twinkle:      rand(0, Math.PI * 2),
        twinkleSpeed: rand(0.004, 0.015),
      };
    });

    /* Watch data-theme changes */
    const observer = new MutationObserver(() => {
      const colors = getColors();
      const op     = getOpacity();
      stars.forEach((s) => {
        s.color   = colors[Math.floor(Math.random() * colors.length)];
        s.opacity = rand(op.min, op.max);
      });
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    /* ── Shooting stars ── */
    let shootingStars = [];
    let shootTimeout;

    const spawnShootingStar = () => {
      const dir = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];
      shootingStars.push({
        x:        rand(W * 0.1, W * 0.9),
        y:        rand(0, H * 0.6),
        len:      rand(60, 130),
        speed:    rand(5, 10),
        life:     0,
        maxLife:  70,
        dx:       dir.dx,
        dy:       dir.dy,
        color:    getColors()[Math.floor(Math.random() * getColors().length)],
        maxAlpha: isDark() ? 0.55 : 0.75,
      });
      shootTimeout = setTimeout(spawnShootingStar, rand(5000, 12000));
    };

    shootTimeout = setTimeout(spawnShootingStar, rand(2000, 5000));

    /* ── Draw ── */
    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      stars.forEach((s) => {
        // slow upward drift
        s.y -= s.vy;
        if (s.y < -4) { s.y = H + 4; s.x = Math.random() * W; }

        // wander: tiny sinusoidal orbit around current position
        s.wanderAngle += s.wanderSpeed;
        const wx = Math.cos(s.wanderAngle) * s.wanderRadius;
        const wy = Math.sin(s.wanderAngle * 0.7) * s.wanderRadius;

        const px = s.x + wx;
        const py = s.y + wy;

        // twinkle
        s.twinkle += s.twinkleSpeed;
        const pulse   = 0.6 + 0.4 * Math.sin(s.twinkle);
        const opacity = Math.min(1, s.opacity * pulse);

        // subtle glow — radial gradient a bit larger than the dot
        const glowRadius = s.size * 6;
        const grd = ctx.createRadialGradient(px, py, 0, px, py, glowRadius);
        grd.addColorStop(0,   `rgba(${s.color},${opacity})`);
        grd.addColorStop(0.5, `rgba(${s.color},${opacity * 0.15})`);
        grd.addColorStop(1,   `rgba(${s.color},0)`);

        // glow halo
        ctx.beginPath();
        ctx.arc(px, py, glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
      });

      /* Shooting stars */
      shootingStars = shootingStars.filter((s) => {
        s.x += s.speed * s.dx;
        s.y += s.speed * Math.abs(s.dy) * Math.sign(s.dy);
        s.life++;

        const alpha = (1 - s.life / s.maxLife) * s.maxAlpha;
        const tailX = s.x - s.len * s.dx;
        const tailY = s.y - s.len * Math.abs(s.dy) * Math.sign(s.dy);

        const grad = ctx.createLinearGradient(s.x, s.y, tailX, tailY);
        grad.addColorStop(0,   `rgba(${s.color},0)`);
        grad.addColorStop(0.4, `rgba(${s.color},${alpha * 0.7})`);
        grad.addColorStop(1,   `rgba(${s.color},${alpha})`);

        ctx.beginPath();
        ctx.strokeStyle = grad;
        ctx.lineWidth   = isDark() ? 1 : 1.2;
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();

        return s.life < s.maxLife;
      });

      frame = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(shootTimeout);
      window.removeEventListener('resize', resize);
      observer.disconnect();
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