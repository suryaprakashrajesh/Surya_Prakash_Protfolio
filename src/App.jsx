import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { CustomCursor } from './components/CustomCursor';
import { ScrollProgress } from './components/ScrollProgress';

// Lazy loaded page nodes
const Landing = lazy(() => import('./sections/Landing'));
const NotFound = lazy(() => import('./sections/NotFound'));

// Smooth placeholder spinner for bundle load suspense
function PageFallback() {
  return (
    <div className="min-h-screen bg-[#09090B] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
    </div>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        {/* Universal UI decorations */}
        <ScrollProgress />
        <CustomCursor />
        
        {/* Router nodes */}
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </HelmetProvider>
  );
}
