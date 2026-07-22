import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FiHome, FiAlertTriangle } from 'react-icons/fi';

export function NotFound() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(query.matches);

    const listener = (e) => setPrefersReducedMotion(e.matches);
    query.addEventListener('change', listener);
    return () => query.removeEventListener('change', listener);
  }, []);

  return (
    <div className="min-h-screen bg-bg flex flex-col items-center justify-center p-6 text-center select-none relative overflow-hidden">
      <Helmet>
        <title>404 — Page Not Found | Surya Prakash R</title>
        <meta name="description" content="The page you are looking for does not exist in Surya Prakash R's portfolio system." />
      </Helmet>

      {/* Background soft lighting */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.05) 0%, transparent 50%)',
        }}
      />

      <div className="relative z-10 space-y-6 max-w-md">
        {/* Warning Icon */}
        <div className={`mx-auto w-16 h-16 rounded-2xl bg-card border border-border flex items-center justify-center text-primary shadow-lg shadow-primary/5 ${
          prefersReducedMotion ? '' : 'animate-pulse'
        }`}>
          <FiAlertTriangle className="w-8 h-8" />
        </div>

        {/* 404 Info */}
        <div className="space-y-2">
          <h1 className="text-6xl font-display font-extrabold text-primary">
            404
          </h1>
          <h2 className="text-xl font-display font-bold text-text uppercase tracking-wider">
            Signal Lost
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed font-mono">
            The screen is blank. The route you are trying to resolve does not exist in our layout system.
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-4">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-primary text-[#FFFFFF] font-display text-sm font-semibold tracking-wide shadow-md shadow-primary/20 transition-all duration-300 hover:translate-y-[-2px] active:translate-y-0"
          >
            <FiHome className="w-4.5 h-4.5" />
            <span>Return to Portfolio</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
export default NotFound;
