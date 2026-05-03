const { useState, useRef, useCallback, useId } = React;

function genRandomPattern(length = 5) {
  return Array.from({ length }, () => [
    Math.floor(Math.random() * 4) + 7,
    Math.floor(Math.random() * 6) + 1,
  ]);
}

function GridPattern({ width, height, x, y, squares, className, ...props }) {
  const patternId = 'gp-' + Math.random().toString(36).slice(2);
  return (
    <svg aria-hidden="true" className={className} {...props}>
      <defs>
        <pattern id={patternId} width={width} height={height} patternUnits="userSpaceOnUse" x={x} y={y}>
          <path d={`M.5 ${height}V.5H${width}`} fill="none" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${patternId})`} />
      {squares && (
        <svg x={x} y={y} style={{ overflow: 'visible' }}>
          {squares.map(([sx, sy], i) => (
            <rect strokeWidth="0" key={i} width={width + 1} height={height + 1} x={sx * width} y={sy * height} />
          ))}
        </svg>
      )}
    </svg>
  );
}

function GlowingCard({ icon, title, description, tiltLimit = 12, scale = 1.04, perspective = 1200 }) {
  const wrapperRef = useRef(null);
  const pattern = useRef(genRandomPattern()).current;
  const [transform, setTransform] = useState(
    `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)`
  );
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handlePointerMove = useCallback((e) => {
    const el = wrapperRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const xRot = (py - 0.5) * (tiltLimit * 2) * -1;
    const yRot = (px - 0.5) * (tiltLimit * 2);
    setTransform(
      `perspective(${perspective}px) rotateX(${xRot}deg) rotateY(${yRot}deg) scale3d(${scale},${scale},${scale})`
    );
    setSpotlightPos({ x: px * 100, y: py * 100 });
  }, [tiltLimit, scale, perspective]);

  const handlePointerEnter = useCallback(() => setIsHovered(true), []);

  const handlePointerLeave = useCallback(() => {
    setTransform(`perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)`);
    setIsHovered(false);
  }, [perspective]);

  return (
    <div
      ref={wrapperRef}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        transform,
        transition: 'transform 0.2s ease-out',
        transformStyle: 'preserve-3d',
        willChange: 'transform',
        position: 'relative',
        overflow: 'hidden',
        padding: '1.5rem',
      }}
    >
      {/* Grid pattern background */}
      <div style={{
        pointerEvents: 'none',
        position: 'absolute',
        top: 0, left: '50%',
        marginTop: '-8px', marginLeft: '-80px',
        width: '100%', height: '100%',
        WebkitMaskImage: 'linear-gradient(white, transparent)',
        maskImage: 'linear-gradient(white, transparent)',
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to right, rgba(255,255,255,0.03), rgba(255,255,255,0.01))',
          WebkitMaskImage: 'radial-gradient(farthest-side at top, white, transparent)',
          maskImage: 'radial-gradient(farthest-side at top, white, transparent)',
          opacity: 1,
        }}>
          <GridPattern
            width={20} height={20} x="-12" y="4"
            squares={pattern}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              fill: 'rgba(255,255,255,0.04)',
              stroke: 'rgba(255,255,255,0.15)',
              mixBlendMode: 'overlay',
            }}
          />
        </div>
      </div>

      {/* Liquid glass spotlight on hover */}
      <div style={{
        pointerEvents: 'none',
        position: 'absolute',
        inset: 0,
        zIndex: 2,
        overflow: 'hidden',
        opacity: isHovered ? 1 : 0,
        transition: 'opacity 0.3s',
      }}>
        <div style={{
          position: 'absolute',
          width: '200%',
          height: '200%',
          borderRadius: '50%',
          left: `${spotlightPos.x}%`,
          top: `${spotlightPos.y}%`,
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(255,255,255,0.09) 0%, transparent 50%)',
        }} />
      </div>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 3 }}>
        <div style={{ width: '24px', height: '24px', color: 'rgba(255,255,255,0.7)' }}>
          {icon}
        </div>
        <h3 style={{
          marginTop: '2.5rem',
          fontSize: '1rem',
          fontWeight: 600,
          color: '#f1f5f9',
          marginBottom: '.5rem',
        }}>{title}</h3>
        <p style={{
          fontSize: '.8125rem',
          color: '#64748b',
          lineHeight: 1.65,
          fontWeight: 300,
        }}>{description}</p>
      </div>
    </div>
  );
}

window.GlowingCard = GlowingCard;
