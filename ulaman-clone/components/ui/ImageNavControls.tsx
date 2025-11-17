// components/ui/ImageNavControls.tsx
'use client'

import React from 'react'

interface ImageNavControlsProps {
  currentIndex: number
  totalSlides: number
  onPrev: () => void
  onNext: () => void
  onDotClick: (index: number) => void
  className?: string
}

const ImageNavControls: React.FC<ImageNavControlsProps> = ({
  currentIndex,
  totalSlides,
  onPrev,
  onNext,
  onDotClick,
  className = ''
}) => {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      {/* Previous Arrow - Bottom Left */}
      <button
        onClick={onPrev}
        className="pointer-events-auto absolute bottom-6 left-6 md:bottom-8 md:left-8 w-[51px] h-[51px] md:w-[56px] md:h-[56px] rounded-md flex items-center justify-center bg-[#EDE6D966] hover:bg-[#5A5A5A] text-white transition-all duration-300 md:opacity-0 md:group-hover:opacity-100"
        aria-label="Previous image"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Dots Navigation - Bottom Center */}
      <div className="pointer-events-auto absolute inset-x-0 bottom-6 md:bottom-8 flex justify-center">
        <div className="flex space-x-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => onDotClick(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === currentIndex
                ? 'bg-[#F4EFE8]'
                : 'bg-white/70 hover:bg-white'
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Next Arrow - Bottom Right */}
      <button
        onClick={onNext}
        className="pointer-events-auto absolute bottom-6 right-6 md:bottom-8 md:right-8 w-[51px] h-[51px] md:w-[56px] md:h-[56px] rounded-md flex items-center justify-center bg-[#EDE6D966] hover:bg-[#5A5A5A] text-white transition-all duration-300 md:opacity-0 md:group-hover:opacity-100"
        aria-label="Next image"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  )
}

export default ImageNavControls
