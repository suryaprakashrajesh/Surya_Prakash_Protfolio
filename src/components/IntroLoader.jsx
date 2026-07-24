// src/components/IntroLoader.jsx
import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Cinematic Awwwards-Level Opening Assembly Sequence
 * 
 * Timeline:
 * Phase 1 (0-1.4s): Black Canvas, SP logo glow, 0->100% progress bar & percentage counter.
 * Phase 2 (1.4-1.6s): 100% Impact - progress bar fades, SP logo scales up with intense glow.
 * Phase 3 (1.6-1.9s): Radial Mask Expansion - Dark overlay opens via clip-path revealing live page.
 * Phase 4 (1.9-2.5s): Logo Flight - SP logo physically animates along a curved path from center to Navbar top-left position.
 * Phase 5 (2.5s+): Hand-off to Navbar & Hero Assembly Cascade.
 */
export function IntroLoader({ onFinish, onComplete }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('loading'); // 'loading' | 'impact' | 'expand' | 'flight' | 'complete'
  const [flightTarget, setFlightTarget] = useState({ x: 0, y: 0, scale: 0.38 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const handleFinish = onFinish || onComplete;
  const rafIdRef = useRef(null);

  // Accessibility check for reduced motion
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(query.matches);
    const listener = (e) => setPrefersReducedMotion(e.matches);
    query.addEventListener('change', listener);
    return () => query.removeEventListener('change', listener);
  }, []);

  // Calculate dynamic flight target coordinates to match top-left Navbar logo exactly
  const calculateFlightTarget = () => {
    if (typeof window === 'undefined') return;
    const isMobile = window.innerWidth < 768;
    // Navbar logo offset from center screen
    const targetX = -(window.innerWidth / 2 - (isMobile ? 38 : 72));
    const targetY = -(window.innerHeight / 2 - (isMobile ? 32 : 36));
    const targetScale = isMobile ? 0.42 : 0.38;
    setFlightTarget({ x: targetX, y: targetY, scale: targetScale });
  };

  useEffect(() => {
    calculateFlightTarget();
    window.addEventListener('resize', calculateFlightTarget);
    return () => window.removeEventListener('resize', calculateFlightTarget);
  }, []);

  // 60 FPS GPU-accelerated progress animation loop
  useEffect(() => {
    if (prefersReducedMotion) {
      setProgress(100);
      setPhase('complete');
      if (handleFinish) handleFinish();
      return;
    }

    let startTime = null;
    const duration = 1350; // 1.35s progress fill

    const animateProgress = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const currentProgress = Math.min(100, Math.floor((elapsed / duration) * 100));

      setProgress(currentProgress);

      if (elapsed < duration) {
        rafIdRef.current = requestAnimationFrame(animateProgress);
      } else {
        // Step 3: 100% Impact phase
        setPhase('impact');
        setTimeout(() => {
          // Step 4: Radial Mask Expansion
          setPhase('expand');
          setTimeout(() => {
            // Step 5: Logo Flight to Navbar
            setPhase('flight');
            setTimeout(() => {
              // Step 6: Complete & Hand-off to Hero Assembly
              setPhase('complete');
              if (handleFinish) handleFinish();
            }, 600);
          }, 300);
        }, 220);
      }
    };

    rafIdRef.current = requestAnimationFrame(animateProgress);

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [handleFinish, prefersReducedMotion]);

  if (phase === 'complete') return null;

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-[9999] pointer-events-none select-none overflow-hidden"
        aria-label="Loading Portfolio"
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        {/* Step 4: Radial Expansion Mask Overlay Layer */}
        <motion.div
          initial={{ clipPath: 'circle(150% at 50% 50%)' }}
          animate={{
            clipPath: phase === 'expand' || phase === 'flight'
              ? 'circle(0% at 50% 50%)'
              : 'circle(150% at 50% 50%)'
          }}
          transition={{ duration: 0.55, ease: [0.77, 0, 0.175, 1] }}
          className="absolute inset-0 bg-[#09090B] z-10 flex items-center justify-center"
        />

        {/* Ambient Pulsing Background Glow behind central logo */}
        {(phase === 'loading' || phase === 'impact') && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: phase === 'impact' ? 0.9 : 0.45,
              scale: phase === 'impact' ? 1.4 : [0.9, 1.1, 0.9],
            }}
            transition={{
              opacity: { duration: 0.3 },
              scale: phase === 'impact' ? { duration: 0.3 } : { duration: 3, repeat: Infinity, ease: 'easeInOut' }
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full z-20 pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(59, 130, 246, 0.35) 0%, rgba(94, 234, 212, 0.2) 45%, transparent 70%)',
              filter: 'blur(40px)',
            }}
          />
        )}

        {/* Step 1, 3, 5: Morphing "SP." Logo (Transforms from Center to Navbar) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={
            phase === 'flight'
              ? {
                  x: flightTarget.x,
                  y: flightTarget.y,
                  scale: flightTarget.scale,
                  opacity: [1, 1, 0],
                  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
                }
              : phase === 'impact'
              ? { opacity: 1, scale: 1.12, y: 0, transition: { duration: 0.2 } }
              : { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5 } }
          }
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 font-display font-extrabold text-5xl md:text-7xl tracking-wider text-text flex items-center justify-center select-none"
          style={{
            transformOrigin: 'center center',
            textShadow: phase === 'impact' 
              ? '0 0 40px rgba(59, 130, 246, 0.8), 0 0 60px rgba(94, 234, 212, 0.6)' 
              : '0 0 20px rgba(59, 130, 246, 0.3)',
          }}
        >
          <span>S</span>
          <span className="text-primary">P</span>
          <span className="text-accent">.</span>
        </motion.div>

        {/* Step 2: Futuristic Progress Bar & Percentage Readout */}
        {(phase === 'loading' || phase === 'impact') && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: phase === 'impact' ? 0 : 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed top-[calc(50%+60px)] md:top-[calc(50%+80px)] left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-3 w-56 select-none"
          >
            {/* 0-100% Progress Line Container */}
            <div className="w-full h-[2.5px] bg-border/60 rounded-full overflow-hidden relative shadow-inner">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-primary via-accent to-primary"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>

            {/* Readout Status */}
            <div className="flex items-center justify-between w-full font-mono text-[11px] text-text-secondary tracking-widest uppercase">
              <span>Loading Portfolio</span>
              <span className="text-accent font-semibold">{progress}%</span>
            </div>
          </motion.div>
        )}
      </div>
    </AnimatePresence>
  );
}

export default IntroLoader;