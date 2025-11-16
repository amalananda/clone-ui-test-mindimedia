// components/ui/ImageSlider.tsx
'use client'

import React, { useState } from 'react'
import Image from 'next/image'

interface SlideData {
  src: string
  alt: string
  [key: string]: unknown
}

interface ImageSliderProps {
  slides: SlideData[]
  renderContent?: (slide: SlideData, index: number) => React.ReactNode
  imageClassName?: string
  containerClassName?: string
}

const ImageSlider: React.FC<ImageSliderProps> = ({
  slides,
  renderContent,
  imageClassName = '',
  containerClassName = ''
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % slides.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length)
  }

  const activeSlide = slides[currentImageIndex]

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-24 lg:mb-32 pt-8 ${containerClassName}`}>
      {/* Image Section */}
      <div className="relative h-[500px] sm:h-[600px] lg:w-[511.48px] lg:h-[716.80px] overflow-hidden group">
        <Image
          key={currentImageIndex}
          src={activeSlide.src}
          alt={activeSlide.alt}
          fill
          className={`w-full h-full object-cover rounded-tl-xl rounded-br-xl ${imageClassName}`}
        />

        {/* Previous Arrow - Bottom Left */}
        <button
          onClick={prevImage}
          className="absolute bottom-6 left-6 md:bottom-8 md:left-8 w-[51px] h-[51px] md:w-[56px] md:h-[56px] rounded-md flex items-center justify-center bg-[#EDE6D966] hover:bg-[#5A5A5A] text-white transition-all duration-300 md:opacity-0 md:group-hover:opacity-100"
          aria-label="Previous image"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Dots Navigation - Bottom Center */}
        <div className="absolute inset-x-0 bottom-6 md:bottom-8 flex justify-center">
          <div className="flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === currentImageIndex
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
          onClick={nextImage}
          className="absolute bottom-6 right-6 md:bottom-8 md:right-8 w-[51px] h-[51px] md:w-[56px] md:h-[56px] rounded-md flex items-center justify-center bg-[#EDE6D966] hover:bg-[#5A5A5A] text-white transition-all duration-300 md:opacity-0 md:group-hover:opacity-100"
          aria-label="Next image"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Content Section - Flexible */}
      {renderContent && (
        <div className="pt-4 lg:pt-35">
          {renderContent(activeSlide, currentImageIndex)}
        </div>
      )}
    </div>
  )
}

export default ImageSlider
