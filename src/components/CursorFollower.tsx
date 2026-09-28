import React, { useEffect, useRef, useState } from 'react';

export const CursorFollower: React.FC = () => {
  const [enabled, setEnabled] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [clicking, setClicking] = useState(false);

  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  // Position references for 60fps linear interpolation without React re-renders
  const mousePos = useRef({ x: -100, y: -100 });
  const dotPos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const spotlightPos = useRef({ x: -100, y: -100 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // Only enable custom cursor if fine pointer (mouse/trackpad), not touch screens
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!hasFinePointer || prefersReducedMotion) {
      return;
    }

    setEnabled(true);

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseDown = () => setClicking(true);
    const onMouseUp = () => setClicking(false);

    // Track hover on interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && target.closest('a, button, [role="button"], input, textarea, .interactive-card')) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseover', handleMouseOver, { passive: true });

    // Smooth Lerp animation loop using hardware-accelerated transforms
    const updateCursor = () => {
      // Direct dot tracking (snappy)
      dotPos.current.x += (mousePos.current.x - dotPos.current.x) * 0.75;
      dotPos.current.y += (mousePos.current.y - dotPos.current.y) * 0.75;

      // Ring tracking (fluid spring dampening)
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.22;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.22;

      // Ambient spotlight tracking (silky soft follow)
      spotlightPos.current.x += (mousePos.current.x - spotlightPos.current.x) * 0.12;
      spotlightPos.current.y += (mousePos.current.y - spotlightPos.current.y) * 0.12;

      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${dotPos.current.x}px, ${dotPos.current.y}px, 0)`;
      }

      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate3d(${spotlightPos.current.x - 300}px, ${spotlightPos.current.y - 300}px, 0)`;
      }

      rafId.current = requestAnimationFrame(updateCursor);
    };

    rafId.current = requestAnimationFrame(updateCursor);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  if (!enabled) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
      {/* Background ambient lighting spotlight following cursor */}
      <div
        ref={spotlightRef}
        className="pointer-events-none fixed top-0 left-0 h-[600px] w-[600px] rounded-full will-change-transform opacity-35"
        style={{
          background: 'radial-gradient(circle, rgba(255, 107, 53, 0.16) 0%, rgba(255, 107, 53, 0.04) 45%, transparent 70%)',
          filter: 'blur(35px)',
        }}
      />

      {/* Primary pinpoint dot */}
      <div
        ref={cursorDotRef}
        className={`pointer-events-none fixed top-0 left-0 -ml-1 -mt-1 h-2 w-2 rounded-full bg-[#FF6B35] shadow-[0_0_12px_#FF6B35] will-change-transform transition-opacity duration-150 ${
          hovered ? 'opacity-90 scale-125' : 'opacity-80'
        }`}
      />

      {/* Fluid outer glowing ring follower */}
      <div
        ref={cursorRingRef}
        className={`pointer-events-none fixed top-0 left-0 rounded-full border will-change-transform transition-all duration-200 ease-out ${
          hovered
            ? '-ml-6 -mt-6 h-12 w-12 border-[#FF6B35]/70 bg-[#FF6B35]/10 shadow-[0_0_24px_rgba(255,107,53,0.3)] scale-110'
            : clicking
            ? '-ml-3.5 -mt-3.5 h-7 w-7 border-[#FF6B35]/90 bg-[#FF6B35]/20 scale-95'
            : '-ml-4.5 -mt-4.5 h-9 w-9 border-[#FF6B35]/35 bg-transparent'
        }`}
      />
    </div>
  );
};
