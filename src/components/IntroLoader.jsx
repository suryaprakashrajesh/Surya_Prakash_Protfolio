import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export function IntroLoader({ onFinish }) {
  const [isFinished, setIsFinished] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Check if the visitor prefers reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setShouldRender(false);
      onFinish();
      return;
    }

    const timer = setTimeout(() => {
      setIsFinished(true);
    }, 2200);

    return () => clearTimeout(timer);
  }, [onFinish]);

  if (!shouldRender) return null;

  return (
    <AnimatePresence onExitComplete={onFinish}>
      {!isFinished && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.5, ease: 'easeInOut' }
          }}
          className="fixed inset-0 bg-[#09090B] z-[99999] flex flex-col items-center justify-center pointer-events-none"
        >
          <div className="relative flex flex-col items-center">
            {/* SVG Logo "SP" Container */}
            <svg
              width="100"
              height="100"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="overflow-visible"
            >
              {/* Outer container box */}
              <motion.rect
                x="4"
                y="4"
                width="92"
                height="92"
                rx="16"
                stroke="var(--accent)"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.4, ease: 'easeInOut' }}
              />

              {/* S Outline */}
              <motion.path
                d="M32 36 C32 28, 48 28, 48 36 C48 44, 32 42, 32 50 C32 58, 48 58, 48 50"
                stroke="var(--text)"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, delay: 0.2, ease: 'easeInOut' }}
              />

              {/* P Outline */}
              <motion.path
                d="M56 60 V30 H66 C71 30, 71 42, 66 42 H56"
                stroke="var(--primary)"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, delay: 0.4, ease: 'easeInOut' }}
              />
            </svg>

            {/* Subtext */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.4 }}
              className="mt-6 font-display font-medium text-sm tracking-[0.25em] text-[#F4F4F5] uppercase"
            >
              Surya Prakash R
            </motion.div>
            
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 40 }}
              transition={{ delay: 1.0, duration: 0.6, ease: 'easeOut' }}
              className="h-[2px] bg-accent mt-2"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
