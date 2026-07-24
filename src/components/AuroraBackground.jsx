import React from 'react';

/**
 * AuroraBackground
 * A lightweight, CSS-only animated background displaying soft, drifting, 
 * blurred gradient blobs (aurora effect) that seamlessly adapt to dark/light mode 
 * using CSS variables, enhanced with film grain texture and a 5th hero focal blob.
 */
export function AuroraBackground() {
  return (
    <div className="aurora-container" aria-hidden="true">
      <div className="aurora-blob aurora-blob-1" />
      <div className="aurora-blob aurora-blob-2" />
      <div className="aurora-blob aurora-blob-3" />
      <div className="aurora-blob aurora-blob-4" />
      <div className="aurora-blob aurora-blob-5" />
    </div>
  );
}
