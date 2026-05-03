const { useState, useRef, useCallback, useEffect } = React;

function HoverButton({ children, href, onClick, className = '', style = {} }) {
  const buttonRef = useRef(null);
  const [isListening, setIsListening] = useState(false);
  const [circles, setCircles] = useState([]);
  const lastAddedRef = useRef(0);

  const createCircle = useCallback((x, y) => {
    const buttonWidth = buttonRef.current?.offsetWidth || 0;
    const xPos = x / buttonWidth;
    const color = `linear-gradient(to right, rgba(160,217,248,${xPos}) ${xPos * 100}%, rgba(58,91,191,${1-xPos}) ${xPos * 100}%)`;

    setCircles((prev) => [
      ...prev,
      { id: Date.now(), x, y, color, fadeState: null },
    ]);
  }, []);

  const handlePointerMove = useCallback((event) => {
    if (!isListening) return;
    
    const currentTime = Date.now();
    if (currentTime - lastAddedRef.current > 100) {
      lastAddedRef.current = currentTime;
      const rect = event.currentTarget.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      createCircle(x, y);
    }
  }, [isListening, createCircle]);

  const handlePointerEnter = useCallback(() => {
    setIsListening(true);
  }, []);

  const handlePointerLeave = useCallback(() => {
    setIsListening(false);
  }, []);

  useEffect(() => {
    circles.forEach((circle) => {
      if (!circle.fadeState) {
        setTimeout(() => {
          setCircles((prev) =>
            prev.map((c) =>
              c.id === circle.id ? { ...c, fadeState: "in" } : c
            )
          );
        }, 0);

        setTimeout(() => {
          setCircles((prev) =>
            prev.map((c) =>
              c.id === circle.id ? { ...c, fadeState: "out" } : c
            )
          );
        }, 1000);

        setTimeout(() => {
          setCircles((prev) => prev.filter((c) => c.id !== circle.id));
        }, 2200);
      }
    });
  }, [circles]);

  const baseStyles = {
    position: 'relative',
    isolation: 'isolate',
    padding: '0.875rem 2rem',
    borderRadius: '999px',
    color: '#fff',
    fontWeight: 600,
    fontSize: '0.9375rem',
    backdropFilter: 'blur(12px)',
    background: 'rgba(43,55,80,0.1)',
    cursor: 'pointer',
    overflow: 'hidden',
    border: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    boxShadow: 'inset 0 0 0 1px rgba(170,202,255,0.2), inset 0 0 16px 0 rgba(170,202,255,0.1), inset 0 -3px 12px 0 rgba(170,202,255,0.15), 0 1px 3px 0 rgba(0,0,0,0.50), 0 4px 12px 0 rgba(0,0,0,0.45)',
    transition: 'transform 0.3s',
    textDecoration: 'none',
    ...style
  };

  const Tag = href ? 'a' : 'button';

  return (
    <Tag
      ref={buttonRef}
      href={href}
      onClick={onClick}
      className={className}
      style={baseStyles}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.975)'}
      onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
      {circles.map(({ id, x, y, color, fadeState }) => (
        <div
          key={id}
          style={{
            position: 'absolute',
            width: '12px',
            height: '12px',
            left: x,
            top: y,
            transform: 'translate(-50%, -50%)',
            borderRadius: '50%',
            filter: 'blur(8px)',
            pointerEvents: 'none',
            zIndex: -1,
            background: color,
            opacity: fadeState === 'in' ? 0.75 : fadeState === 'out' ? 0 : 0,
            transition: fadeState === 'out' ? 'opacity 1.2s' : 'opacity 0.3s',
          }}
        />
      ))}
      {children}
    </Tag>
  );
}

// Export to window
window.HoverButton = HoverButton;
