import { useEffect, useState } from 'react';

export function useScrollSpy(selectors, options = { rootMargin: '-20% 0px -60% 0px', threshold: 0 }) {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const elements = selectors.map((id) => document.getElementById(id)).filter(Boolean);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    }, options);

    elements.forEach((el) => observer.observe(el));

    // Fallback for reaching the top of page
    const handleScroll = () => {
      if (window.scrollY < 80 && selectors.length > 0) {
        setActiveId(selectors[0]);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      window.removeEventListener('scroll', handleScroll);
    };
  }, [selectors, options.rootMargin, options.threshold]);

  return activeId;
}
