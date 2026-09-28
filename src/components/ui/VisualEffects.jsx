import React, { useEffect, useRef } from 'react';

/* ═══════════════════════════════════════════════════
   INJECT KEYFRAMES ONCE
═══════════════════════════════════════════════════ */
const CSS = `
@keyframes bubbleFloat {
  0%   { transform: translateY(0px)   scale(1);    opacity: 0; }
  10%  { opacity: 1; }
  90%  { opacity: 0.7; }
  100% { transform: translateY(-100vh) scale(0.6); opacity: 0; }
}
/* Subtle green glow pulse on interactive elements */
.ops-interactive {
  transition:
    box-shadow 0.35s cubic-bezier(0.34,1.56,0.64,1),
    border-color 0.3s ease,
    transform 0.3s cubic-bezier(0.34,1.56,0.64,1) !important;
}
.ops-interactive:hover {
  box-shadow: 0 0 0 1px rgba(132,224,113,0.35),
              0 8px 32px rgba(0,0,0,0.5),
              0 0 20px rgba(132,224,113,0.1) !important;
  border-color: rgba(132,224,113,0.4) !important;
  transform: translateY(-2px) scale(1.012) !important;
}
`;

function InjectStyle() {
  useEffect(() => {
    const el = document.createElement('style');
    el.id = 'ops-visual-effects-style';
    if (!document.getElementById('ops-visual-effects-style')) {
      el.textContent = CSS;
      document.head.appendChild(el);
    }
    return () => document.getElementById('ops-visual-effects-style')?.remove();
  }, []);
  return null;
}

/* ═══════════════════════════════════════════════════
   CURSOR GREEN GLOW
═══════════════════════════════════════════════════ */
function CursorGlow() {
  const ref = useRef(null);
  const cur = useRef({ x: -400, y: -400 });
  const cur2 = useRef({ x: -400, y: -400 }); // lagged for inner dot
  const raf = useRef(null);

  useEffect(() => {
    const onMove = (e) => { cur.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener('mousemove', onMove, { passive: true });

    const lerp = (a, b, t) => a + (b - a) * t;

    const tick = () => {
      cur2.current.x = lerp(cur2.current.x, cur.current.x, 0.12);
      cur2.current.y = lerp(cur2.current.y, cur.current.y, 0.12);

      if (ref.current) {
        const { x, y } = cur2.current;
        ref.current.style.transform = `translate(${x - 220}px, ${y - 220}px)`;
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: 440, height: 440,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(132,224,113,0.06) 0%, rgba(132,224,113,0.025) 40%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 9999,
        willChange: 'transform',
      }}
    />
  );
}

/* ═══════════════════════════════════════════════════
   NETWORK + REACTIVE PARTICLES CANVAS
   - Dots animate at base speed
   - Near cursor: dots accelerate, grow, glow brighter
   - Near interactive elements (cards/buttons): 
     dots cluster slightly, lines brighten
═══════════════════════════════════════════════════ */
const N       = 38;       // node count
const MAX_D   = 150;      // max line distance
const GREEN   = '132,224,113';
const REACT_R = 130;      // radius around cursor that activates nodes

function NetworkCanvas() {
  const canvasRef = useRef(null);
  const nodes     = useRef([]);
  const mouse     = useRef({ x: -999, y: -999 });
  const raf       = useRef(null);
  // interactive element rects
  const rects     = useRef([]);

  // Collect interactive element rects every 2s
  useEffect(() => {
    const collect = () => {
      const els = document.querySelectorAll(
        'button, [class*="card-hover"], [class*="row-hover"], a, input, [class*="rounded-2xl"]'
      );
      rects.current = Array.from(els).map((el) => {
        const r = el.getBoundingClientRect();
        return { cx: r.left + r.width / 2, cy: r.top + r.height / 2, w: r.width, h: r.height };
      });
    };
    collect();
    const id = setInterval(collect, 2000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      nodes.current = Array.from({ length: N }, () => ({
        x:   Math.random() * canvas.width,
        y:   Math.random() * canvas.height,
        vx:  (Math.random() - 0.5) * 0.3,
        vy:  (Math.random() - 0.5) * 0.3,
        r:   1.4 + Math.random() * 1.6,
        // animated scale for proximity effect
        scale: 1,
        targetScale: 1,
      }));
    };
    resize();
    window.addEventListener('resize', resize);

    const onMove = (e) => { mouse.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener('mousemove', onMove, { passive: true });

    const lerp = (a, b, t) => a + (b - a) * t;

    const draw = () => {
      const { width: W, height: H } = canvas;
      ctx.clearRect(0, 0, W, H);
      const mx = mouse.current.x;
      const my = mouse.current.y;
      const ns = nodes.current;

      for (const n of ns) {
        // Distance to cursor
        const dx = n.x - mx;
        const dy = n.y - my;
        const d  = Math.sqrt(dx * dx + dy * dy);

        // Check proximity to any interactive element
        let nearEl = false;
        for (const r of rects.current) {
          const ex = n.x - r.cx;
          const ey = n.y - r.cy;
          if (Math.sqrt(ex * ex + ey * ey) < 120) { nearEl = true; break; }
        }

        // Cursor proximity → node grows and drifts slightly toward cursor
        if (d < REACT_R) {
          const force = (1 - d / REACT_R) * 0.6;
          n.vx += (-dx / d) * force * 0.018;
          n.vy += (-dy / d) * force * 0.018;
          n.targetScale = 1 + (1 - d / REACT_R) * 2.2;
        } else if (nearEl) {
          n.targetScale = 1.5;
        } else {
          n.targetScale = 1;
        }

        // Smooth scale interpolation
        n.scale = lerp(n.scale, n.targetScale, 0.1);

        // Speed cap
        const speed = Math.sqrt(n.vx * n.vx + n.vy * n.vy);
        if (speed > 1.4) { n.vx *= 1.4 / speed; n.vy *= 1.4 / speed; }

        // Slow drag toward base speed
        n.vx *= 0.995;
        n.vy *= 0.995;

        // Move
        n.x += n.vx;
        n.y += n.vy;

        // Bounce
        if (n.x < 0 || n.x > W) { n.vx *= -1; n.x = Math.max(0, Math.min(W, n.x)); }
        if (n.y < 0 || n.y > H) { n.vy *= -1; n.y = Math.max(0, Math.min(H, n.y)); }
      }

      // Draw lines
      for (let i = 0; i < ns.length; i++) {
        for (let j = i + 1; j < ns.length; j++) {
          const dx   = ns[i].x - ns[j].x;
          const dy   = ns[i].y - ns[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_D) {
            const avgScale = (ns[i].scale + ns[j].scale) / 2;
            const alpha    = (1 - dist / MAX_D) * 0.1 * Math.min(avgScale, 2);
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${GREEN},${alpha})`;
            ctx.lineWidth   = 0.7 * Math.min(avgScale, 1.5);
            ctx.moveTo(ns[i].x, ns[i].y);
            ctx.lineTo(ns[j].x, ns[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw dots
      for (const n of ns) {
        const r       = n.r * n.scale;
        const alpha   = 0.18 + (n.scale - 1) * 0.25;
        const glowR   = r + 3 * n.scale;

        // glow halo
        const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, glowR);
        grad.addColorStop(0,   `rgba(${GREEN},${Math.min(alpha * 0.9, 0.5)})`);
        grad.addColorStop(0.5, `rgba(${GREEN},${Math.min(alpha * 0.3, 0.2)})`);
        grad.addColorStop(1,   `rgba(${GREEN},0)`);
        ctx.beginPath();
        ctx.arc(n.x, n.y, glowR, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // core dot
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${GREEN},${Math.min(alpha + 0.1, 0.55)})`;
        ctx.fill();
      }

      raf.current = requestAnimationFrame(draw);
    };

    raf.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}

/* ═══════════════════════════════════════════════════
   FLOATING BUBBLES (subtle, slow)
═══════════════════════════════════════════════════ */
const BUBBLES = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  size:     2.5 + Math.random() * 4,
  left:     `${4 + Math.random() * 92}%`,
  delay:    `${Math.random() * 16}s`,
  duration: `${14 + Math.random() * 18}s`,
  opacity:  0.06 + Math.random() * 0.1,
}));

function FloatingBubbles() {
  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1, overflow: 'hidden' }}>
      {BUBBLES.map((b) => (
        <div
          key={b.id}
          style={{
            position: 'absolute',
            bottom: '-10px',
            left: b.left,
            width:  b.size,
            height: b.size,
            borderRadius: '50%',
            background: `rgba(132,224,113,${b.opacity})`,
            boxShadow: `0 0 ${b.size * 3}px rgba(132,224,113,${b.opacity * 1.5})`,
            animation: `bubbleFloat ${b.duration} ${b.delay} ease-in infinite`,
          }}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   CORNER AMBIENT GLOWS
═══════════════════════════════════════════════════ */
function AmbientGlows() {
  return (
    <>
      <div style={{
        position: 'fixed', top: -100, left: -100,
        width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(132,224,113,0.05) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
      }} />
      <div style={{
        position: 'fixed', bottom: -100, right: -100,
        width: 420, height: 420, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(132,224,113,0.04) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
      }} />
    </>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN EXPORT
═══════════════════════════════════════════════════ */
export default function VisualEffects() {
  return (
    <>
      <InjectStyle />
      <AmbientGlows />
      <NetworkCanvas />
      <FloatingBubbles />
      <CursorGlow />
    </>
  );
}
