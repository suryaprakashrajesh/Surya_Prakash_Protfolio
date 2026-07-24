import React, { useEffect, useRef, useState, useCallback } from 'react';

/**
 * PixelRevealTransition
 * Multi-pass 4-layer canvas pixel scroll transition between Hero and About sections:
 * Layer 1: Leading Matrix Wireframe Scan Outlines (Pre-reveal scanning HUD)
 * Layer 2: Multi-Stage Chromatic Color Flashes (Teal -> Amber -> Violet confetti)
 * Layer 3: Solid Target Surface Background Grid Fill
 * Layer 4: Floating Micro-Sparkle Particles (Parallax foreground layer)
 */
export function PixelRevealTransition({ theme, targetColorType = 'surface', startOffset = 'normal' }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const cellsRef = useRef([]);
  const particlesRef = useRef([]);
  const dimsRef = useRef({ width: 0, height: 0, dpr: 1 });
  const rafRef = useRef(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check reduced motion preference
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(query.matches);
    const listener = (e) => setPrefersReducedMotion(e.matches);
    query.addEventListener('change', listener);
    return () => query.removeEventListener('change', listener);
  }, []);

  // Helper to read theme colors from CSS variables
  const getThemePalette = useCallback(() => {
    const rootStyles = getComputedStyle(document.documentElement);
    const isDark = document.documentElement.classList.contains('dark');
    const bg = rootStyles.getPropertyValue('--bg').trim() || (isDark ? '#09090B' : '#FAFAFA');
    const surface = rootStyles.getPropertyValue('--surface').trim() || (isDark ? '#111318' : '#FFFFFF');
    const primary = rootStyles.getPropertyValue('--primary').trim() || '#3B82F6';
    const accent = rootStyles.getPropertyValue('--accent').trim() || (isDark ? '#5EEAD4' : '#0F766E');

    const targetColor = targetColorType === 'bg' ? bg : surface;

    return {
      baseColor: bg,
      targetColor: targetColor,
      accents: [
        accent,
        primary,
        '#F59E0B', // Amber
        isDark ? '#14B8A6' : '#0D9488', // Teal
        isDark ? '#A78BFA' : '#7C3AED', // Violet
        '#10B981', // Emerald
      ],
    };
  }, [targetColorType]);

  // Generate / memoize pixel grid structure + micro-sparkle floating particles
  const buildPixelGrid = useCallback((width, height) => {
    const cellSize = 34; // Pixel cell size in CSS pixels
    const cols = Math.ceil(width / cellSize);
    const rows = Math.ceil(height / cellSize) + 3; // 3 extra row blocks for full bleed coverage
    const palette = getThemePalette();

    const cells = [];
    for (let r = 0; r < rows; r++) {
      const rowFactor = (rows - 1 - r) / Math.max(1, rows - 1);

      for (let c = 0; c < cols; c++) {
        const randomOffset = Math.random();
        // Threshold: bottom rows reveal earlier, grid completes reveal by 0.52 progress
        const cellThreshold = Math.min(0.52, rowFactor * 0.38 + randomOffset * 0.22);
        const isAccent = Math.random() < 0.18; // ~18% flash accent confetti
        const accentColor = palette.accents[Math.floor(Math.random() * palette.accents.length)];
        const secondaryColor = palette.accents[(Math.floor(Math.random() * palette.accents.length) + 1) % palette.accents.length];

        cells.push({
          x: c * cellSize,
          y: r * cellSize,
          row: r,
          col: c,
          cellSize,
          cellThreshold,
          isAccent,
          accentColor,
          secondaryColor,
        });
      }
    }

    // Layer 4: Micro-sparkle floating particles (foreground parallax)
    const particleCount = Math.floor(width / 35);
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: height + Math.random() * 150,
        size: Math.floor(Math.random() * 8) + 10, // 10px to 18px
        color: palette.accents[Math.floor(Math.random() * palette.accents.length)],
        startThreshold: Math.random() * 0.3 + 0.05,
      });
    }

    cellsRef.current = cells;
    particlesRef.current = particles;
  }, [getThemePalette]);

  // Handle window resize and high-DPI canvas setup
  const handleResize = useCallback(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const width = containerRef.current.clientWidth || window.innerWidth;
    const height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    dimsRef.current = { width, height, dpr };
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);

    buildPixelGrid(width, height);
  }, [buildPixelGrid]);

  // Main render routine driven by scroll position
  const renderFrame = useCallback(() => {
    if (prefersReducedMotion || !canvasRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = container.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    // Smooth viewport-based scroll progress calculation
    const totalDist = viewportHeight + rect.height;
    const scrolled = viewportHeight - rect.top;

    // Delay activation start for shorter preceding sections (e.g. Experience / Certifications)
    let effectiveScrolled = scrolled;
    let activeDist = totalDist;
    if (startOffset === 'late') {
      const delay = totalDist * 0.28; // Delay start by 28% of scroll runway
      effectiveScrolled = Math.max(0, scrolled - delay);
      activeDist = totalDist * 0.72;
    }

    const rawProgress = Math.max(0, Math.min(1, effectiveScrolled / activeDist));

    const { width, height, dpr } = dimsRef.current;

    // Clear canvas
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (rawProgress <= 0 || rawProgress >= 0.70) {
      canvas.style.opacity = '0';
      return;
    }

    // Scale canvas context for high-DPI crispness
    ctx.scale(dpr, dpr);

    // Softened ease-out curve on scroll progress
    const easedProgress = 1 - Math.pow(1 - rawProgress, 1.6);
    const palette = getThemePalette();
    const gap = 1.5;

    const cells = cellsRef.current;
    const particles = particlesRef.current;

    // ==========================================
    // LAYER 1: Leading Matrix Scan Outlines
    // ==========================================
    for (let i = 0; i < cells.length; i++) {
      const cell = cells[i];
      if (easedProgress < cell.cellThreshold && easedProgress >= cell.cellThreshold - 0.12) {
        const leadRatio = (easedProgress - (cell.cellThreshold - 0.12)) / 0.12;
        ctx.strokeStyle = palette.accents[cell.col % palette.accents.length];
        ctx.globalAlpha = leadRatio * 0.35;
        ctx.lineWidth = 1;
        ctx.strokeRect(cell.x + gap, cell.y + gap, cell.cellSize - gap * 2, cell.cellSize - gap * 2);
        ctx.globalAlpha = 1.0;
      }
    }

    // ==========================================
    // LAYER 2 & 3: Multi-Stage Chromatic Flash + Target Surface Fill
    // ==========================================
    for (let i = 0; i < cells.length; i++) {
      const cell = cells[i];
      if (easedProgress >= cell.cellThreshold) {
        const age = easedProgress - cell.cellThreshold;

        if (cell.isAccent && age < 0.10) {
          // Multi-stage chromatic color shift
          if (age < 0.03) {
            ctx.fillStyle = cell.accentColor;
          } else if (age < 0.07) {
            ctx.fillStyle = cell.secondaryColor;
          } else {
            ctx.fillStyle = palette.accents[0];
          }
        } else {
          ctx.fillStyle = palette.targetColor;
        }

        ctx.fillRect(
          cell.x + gap / 2,
          cell.y + gap / 2,
          cell.cellSize - gap,
          cell.cellSize - gap
        );
      }
    }

    // ==========================================
    // LAYER 4: Floating Micro-Sparkle Particles Overlay
    // ==========================================
    for (let p = 0; p < particles.length; p++) {
      const pt = particles[p];
      if (rawProgress >= pt.startThreshold && rawProgress <= 0.65) {
        const particleProgress = (rawProgress - pt.startThreshold) / (0.65 - pt.startThreshold);
        const curY = pt.y - particleProgress * (height + 250);
        ctx.fillStyle = pt.color;
        ctx.globalAlpha = Math.sin(particleProgress * Math.PI) * 0.7;
        ctx.fillRect(pt.x, curY, pt.size, pt.size);
        ctx.globalAlpha = 1.0;
      }
    }

    // End-state soft focus blur & fade out completely by 0.70 progress
    if (rawProgress > 0.52) {
      const fadeRatio = Math.min(1, (rawProgress - 0.52) / 0.18);
      const opacity = Math.max(0, 1 - fadeRatio);
      const blurPx = (fadeRatio * 12).toFixed(1);
      canvas.style.opacity = opacity.toFixed(3);
      canvas.style.filter = `blur(${blurPx}px)`;
    } else {
      canvas.style.opacity = '1';
      canvas.style.filter = 'none';
    }
  }, [prefersReducedMotion, getThemePalette, startOffset]);

  // Setup scroll listener with requestAnimationFrame throttling
  useEffect(() => {
    handleResize();

    const onScrollOrResize = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(renderFrame);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    onScrollOrResize();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', onScrollOrResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [handleResize, renderFrame, theme]);

  if (prefersReducedMotion) {
    return <div className="h-24 w-full" aria-hidden="true" />;
  }

  return (
    <div
      ref={containerRef}
      className="relative h-[60vh] w-full pointer-events-none select-none overflow-hidden"
      aria-hidden="true"
    >
      <div className="fixed inset-0 w-full h-full pointer-events-none z-20">
        <canvas
          ref={canvasRef}
          className="w-full h-full block transition-opacity duration-150"
        />
      </div>
    </div>
  );
}
