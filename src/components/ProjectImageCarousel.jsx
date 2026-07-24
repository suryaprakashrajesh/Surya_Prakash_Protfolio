import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiMaximize2 } from 'react-icons/fi';

export function ProjectImageCarousel({ images = [], image, title, onImageClick }) {
  // Normalize images array for backward compatibility
  const imageList = Array.isArray(images) && images.length > 0 
    ? images 
    : image 
      ? [image] 
      : [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  if (imageList.length === 0) return null;

  const hasMultipleImages = imageList.length > 1;

  const handlePrev = (e) => {
    if (e) e.stopPropagation();
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? imageList.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    if (e) e.stopPropagation();
    setDirection(1);
    setCurrentIndex((prev) => (prev === imageList.length - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (e, index) => {
    e.stopPropagation();
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 40;
    if (distance > minSwipeDistance) {
      handleNext();
    } else if (distance < -minSwipeDistance) {
      handlePrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const currentImage = imageList[currentIndex];

  const slideVariants = {
    initial: (dir) => ({
      opacity: 0,
      x: dir > 0 ? 30 : -30,
    }),
    animate: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.25, ease: 'easeOut' },
    },
    exit: (dir) => ({
      opacity: 0,
      x: dir > 0 ? -30 : 30,
      transition: { duration: 0.2, ease: 'easeIn' },
    }),
  };

  return (
    <div
      onClick={() => onImageClick && onImageClick(currentImage, currentIndex, imageList)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="mt-4 rounded-xl border border-border/80 overflow-hidden bg-surface/50 group/img relative shadow-sm cursor-pointer select-none"
      role="button"
      tabIndex={0}
      aria-label={`View ${title} screenshot in full screen`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onImageClick && onImageClick(currentImage, currentIndex, imageList);
        }
      }}
    >
      {/* Fixed aspect ratio container to prevent layout shift */}
      <div className="w-full h-48 md:h-52 relative overflow-hidden bg-surface/80">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.img
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            src={currentImage}
            alt={`${title} screenshot ${currentIndex + 1}`}
            className="w-full h-48 md:h-52 object-cover object-top absolute inset-0"
            loading="lazy"
          />
        </AnimatePresence>

        {/* Expand / Fullscreen Badge Button */}
        <div className="absolute top-2.5 right-2.5 z-20">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onImageClick && onImageClick(currentImage, currentIndex, imageList);
            }}
            className="p-1.5 rounded-lg bg-black/70 hover:bg-black/90 text-accent border border-white/20 shadow-md backdrop-blur-md flex items-center gap-1 font-mono text-[10px] cursor-pointer"
            aria-label="View full screen"
          >
            <FiMaximize2 className="w-3.5 h-3.5 text-accent" />
            <span className="inline sm:hidden font-medium">Full Screen</span>
          </button>
        </div>

        {/* Hover overlay hint (desktop) */}
        <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-bg/20 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-end justify-between p-3.5 pointer-events-none z-10">
          <span className="font-mono text-[10px] text-text bg-card/90 backdrop-blur-sm px-2.5 py-1 rounded border border-border flex items-center gap-1.5 shadow-md">
            <FiMaximize2 className="w-3 h-3 text-accent" /> Tap to view full screen
          </span>
        </div>

        {/* Navigation Arrows (rendered only if multiple images) */}
        {hasMultipleImages && (
          <>
            {/* Left Chevron Button - Always visible on mobile, hover on desktop */}
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/70 hover:bg-black/90 border border-white/20 text-accent opacity-100 sm:opacity-0 sm:group-hover/img:opacity-100 focus:opacity-100 transition-all duration-300 flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-sm"
            >
              <FiChevronLeft className="w-5 h-5 text-accent stroke-[2.5]" />
            </button>

            {/* Right Chevron Button - Always visible on mobile, hover on desktop */}
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next image"
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/70 hover:bg-black/90 border border-white/20 text-accent opacity-100 sm:opacity-0 sm:group-hover/img:opacity-100 focus:opacity-100 transition-all duration-300 flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-sm"
            >
              <FiChevronRight className="w-5 h-5 text-accent stroke-[2.5]" />
            </button>

            {/* Pagination Dots */}
            <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15">
              {imageList.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={(e) => handleDotClick(e, idx)}
                  aria-label={`Slide ${idx + 1} of ${imageList.length}`}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    idx === currentIndex
                      ? 'w-4 h-1.5 bg-accent shadow-sm shadow-accent/60'
                      : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/80'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
