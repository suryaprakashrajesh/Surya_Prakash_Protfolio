// src/components/IntroLoader.jsx
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export function IntroLoader({ onFinish, onComplete }) {
  const [done, setDone] = useState(false);
  const handleFinish = onFinish || onComplete;

  useEffect(() => {
    const timer = setTimeout(() => {
      setDone(true);
      setTimeout(() => {
        if (handleFinish) handleFinish();
      }, 500);
    }, 1800);
    return () => clearTimeout(timer);
  }, [handleFinish]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            background: 'var(--bg)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '24px',
          }}
          aria-label="Loading"
          role="progressbar"
          aria-valuetext="Loading portfolio"
        >
          {/* Animated logo */}
          <motion.div
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontWeight: 700,
              fontSize: '48px',
              display: 'flex',
              gap: '4px',
            }}
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{ color: 'var(--primary)' }}
            >
              S
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{ color: 'var(--accent)' }}
            >
              P
            </motion.span>
          </motion.div>

          {/* Progress line */}
          <motion.div
            style={{
              width: '120px',
              height: '2px',
              background: 'var(--border)',
              borderRadius: '1px',
              overflow: 'hidden',
            }}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.4, delay: 0.3, ease: 'easeInOut' }}
              style={{
                height: '100%',
                background: 'linear-gradient(90deg, var(--primary), var(--accent))',
                borderRadius: '1px',
              }}
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '11px',
              color: 'var(--text-secondary)',
              letterSpacing: '0.1em',
            }}
          >
            loading portfolio...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default IntroLoader;