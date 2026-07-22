import { useEffect, useRef } from 'react';

export function CustomCursor() {
  const cursorRef = useRef(null);
  const posRef = useRef({ x: -100, y: -100 });
  const hoverRef = useRef(false);
  const animFrameRef = useRef(null);

  useEffect(() => {
    const hoverMediaQuery = window.matchMedia('(hover: hover)');
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const startLoop = () => {
      if (!animFrameRef.current) {
        const renderLoop = () => {
          if (cursorRef.current) {
            const { x, y } = posRef.current;
            const isHovering = hoverRef.current;
            const scale = isHovering ? 2.4 : 1;

            cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${scale})`;

            if (isHovering) {
              cursorRef.current.classList.add('is-hovering');
            } else {
              cursorRef.current.classList.remove('is-hovering');
            }
          }
          animFrameRef.current = requestAnimationFrame(renderLoop);
        };
        animFrameRef.current = requestAnimationFrame(renderLoop);
      }
    };

    const stopLoop = () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
    };

    const updateState = () => {
      const active = hoverMediaQuery.matches && !reducedMotionQuery.matches;
      if (active) {
        document.documentElement.classList.add('has-custom-cursor');
        if (cursorRef.current) cursorRef.current.style.display = 'block';
        startLoop();
      } else {
        document.documentElement.classList.remove('has-custom-cursor');
        if (cursorRef.current) cursorRef.current.style.display = 'none';
        stopLoop();
      }
    };

    updateState();

    hoverMediaQuery.addEventListener('change', updateState);
    reducedMotionQuery.addEventListener('change', updateState);

    const handleMouseMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      posRef.current = { x: -100, y: -100 };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    // Track pressable hover elements
    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;

      const isClickable = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.closest('button') || 
        target.closest('a') ||
        target.classList.contains('clickable') ||
        target.getAttribute('role') === 'button' ||
        window.getComputedStyle(target).cursor === 'pointer';
      
      hoverRef.current = !!isClickable;
    };

    window.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      stopLoop();
      document.documentElement.classList.remove('has-custom-cursor');
      hoverMediaQuery.removeEventListener('change', updateState);
      reducedMotionQuery.removeEventListener('change', updateState);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-3.5 h-3.5 rounded-full pointer-events-none z-[99999] cursor-lens"
      style={{
        left: '0px',
        top: '0px',
        transform: 'translate3d(-100px, -100px, 0) translate(-50%, -50%)',
      }}
    />
  );
}
