import { useEffect, useState } from 'react';

export function useScrollSpy(selectors, headerOffset = 120) {
  const [activeId, setActiveId] = useState('');

  const selectorKey = Array.isArray(selectors) ? selectors.join(',') : '';

  useEffect(() => {
    if (!selectors || selectors.length === 0) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // 1. Top of page fallback -> select first section
      if (scrollPosition < 50) {
        setActiveId(selectors[0]);
        return;
      }

      // 2. Bottom of page fallback -> select last section
      if (windowHeight + Math.ceil(scrollPosition) >= documentHeight - 40) {
        setActiveId(selectors[selectors.length - 1]);
        return;
      }

      // 3. Find section that spans across the headerOffset focal line
      const sectionElements = selectors
        .map((id) => document.getElementById(id))
        .filter(Boolean);

      let currentActiveId = '';

      for (let i = 0; i < sectionElements.length; i++) {
        const el = sectionElements[i];
        const rect = el.getBoundingClientRect();
        
        // Active section top must be at or above focal line AND bottom must be below focal line
        if (rect.top <= headerOffset && rect.bottom > headerOffset) {
          currentActiveId = el.id;
          break;
        }
      }

      // Fallback: If no section strictly spans the line, pick the section closest to focal line
      if (!currentActiveId && sectionElements.length > 0) {
        let minDistance = Infinity;
        sectionElements.forEach((el) => {
          const rect = el.getBoundingClientRect();
          const distance = Math.abs(rect.top - headerOffset);
          if (distance < minDistance) {
            minDistance = distance;
            currentActiveId = el.id;
          }
        });
      }

      if (currentActiveId) {
        setActiveId(currentActiveId);
      }
    };

    // Trigger check immediately on mount
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [selectorKey, headerOffset]);

  return activeId;
}
