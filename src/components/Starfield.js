import { useEffect, useRef } from 'react';
import './Starfield.css';

const STAR_COUNT  = 100;
const SPEED_BASE  = 0.005;  // base drift speed
const PARALLAX    = 0.04;   // mouse parallax strength

function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}

export default function Starfield() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let W, H;
    let mouse = { x: 0, y: 0 };
    let frameId;

    /* ── Generate stars ── */
    const stars = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random(),          // 0-1 normalized
      y: Math.random(),
      size: randomBetween(0.4, 2.2),
      opacity: randomBetween(0.2, 0.9),
      // random movement direction
      vx: randomBetween(-0.15, 0.15) * SPEED_BASE,
      vy: randomBetween(-0.15, 0.15) * SPEED_BASE,

      // wandering motion
      driftPhase: randomBetween(0, Math.PI * 2),
      driftSpeed: randomBetween(0.002, 0.008),

      
      twinklePhase: randomBetween(0, Math.PI * 2),
      twinkleSpeed: randomBetween(0.008, 0.025),
      // color: mostly white-cyan, occasional purple/pink
      hue: Math.random() < 0.6 ? 'cyan' :
           Math.random() < 0.5 ? 'purple' : 'white',
    }));

    /* ── Resize ── */
    const resize = () => {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    /* ── Mouse parallax ── */
    const onMouseMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth  - 0.5) * 2;  // -1 to 1
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);

    /* ── Draw ── */
    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      stars.forEach((s) => {
        
        /* wandering drift */
        s.driftPhase += s.driftSpeed;

        s.x += s.vx + Math.cos(s.driftPhase) * 0.00015;
        s.y += s.vy + Math.sin(s.driftPhase) * 0.00015;

        /* wrap around screen edges */
        if (s.x < 0) s.x = 1;
        if (s.x > 1) s.x = 0;

        if (s.y < 0) s.y = 1;
        if (s.y > 1) s.y = 0;

        /* twinkle */
        s.twinklePhase += s.twinkleSpeed;
        const twinkle = 0.5 + 0.5 * Math.sin(s.twinklePhase);
        const alpha = s.opacity * (0.6 + 0.4 * twinkle);

        /* parallax offset */
        const px = s.x * W + mouse.x * PARALLAX * W * (s.size / 2.2);
        const py = s.y * H + mouse.y * PARALLAX * H * (s.size / 2.2);

        /* color */
        let color;
        if (s.hue === 'cyan')   color = `rgba(34,211,238,${alpha})`;
        else if (s.hue === 'purple') color = `rgba(139,92,246,${alpha})`;
        else                    color = `rgba(220,230,255,${alpha})`;

        /* glow for bigger stars */
        if (s.size > 1.4) {
          const grd = ctx.createRadialGradient(px, py, 0, px, py, s.size * 3.5);
          grd.addColorStop(0, color);
          grd.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.beginPath();
          ctx.arc(px, py, s.size * 3.5, 0, Math.PI * 2);
          ctx.fillStyle = grd;
          ctx.fill();
        }

        /* core dot */
        ctx.beginPath();
        ctx.arc(px, py, s.size, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
      });

      frameId = requestAnimationFrame(draw);
    };
    frameId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="starfield-canvas" aria-hidden="true" />;
}