// components/animations/SplitImageReveal.tsx
'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useScrollAnimation, scrollAnimationPresets } from '@/hooks/useScrollAnimation'
import { ReactNode } from 'react'

interface SplitImageRevealProps {
  leftImage: {
    src: string
    alt: string
  }
  rightImage: {
    src: string
    alt: string
  }
  children: ReactNode // Text/konten yang muncul di tengah
  minHeight?: string // Default: min-h-[100vh]
}

export default function SplitImageReveal({
  leftImage,
  rightImage,
  children,
  minHeight = 'min-h-[100vh]'
}: SplitImageRevealProps) {
  const {
    containerRef,
    leftX,
    rightX,
    leftRotate,
    rightRotate,
    opacity,
    scale
  } = useScrollAnimation(scrollAnimationPresets.splitImages)

  return (
    <section
      ref={containerRef}
      className={`relative ${minHeight} bg-[#EFEBE2] overflow-hidden`}
    >
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <div className="relative w-full h-full max-w-7xl mx-auto px-4 flex items-center justify-center">

          {/* Left Image */}
          <motion.div
            className="absolute w-[150px] h-[250px] sm:w-[170px] sm:h-[270px] md:w-[250px] md:h-[350px] lg:w-[280px] lg:h-[380px] z-20"
            style={{
              x: leftX,
              rotate: leftRotate,
              left: '50%',
              top: '50%',
              translateX: '-52%',
              translateY: '-49%'
            }}
          >
            <div className="relative w-full h-full shadow-2xl rounded-lg overflow-hidden">
              <Image
                src={leftImage.src}
                alt={leftImage.alt}
                fill
                sizes="(max-width: 768px) 150px, (max-width: 1024px) 250px, 280px"
                className="object-cover"
                priority
              />
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            className="absolute w-[150px] h-[250px] sm:w-[170px] sm:h-[270px] md:w-[250px] md:h-[350px] lg:w-[280px] lg:h-[380px] z-10"
            style={{
              x: rightX,
              rotate: rightRotate,
              left: '50%',
              top: '50%',
              translateX: '-52%',
              translateY: '-49%'
            }}
          >
            <div className="relative w-full h-full shadow-2xl rounded-lg overflow-hidden">
              <Image
                src={rightImage.src}
                alt={rightImage.alt}
                fill
                sizes="(max-width: 768px) 150px, (max-width: 1024px) 250px, 280px"
                className="object-cover"
                priority
              />
            </div>
          </motion.div>

          {/* Center Content */}
          <motion.div
            className="relative z-30 max-w-lg mx-auto px-6 text-center"
            style={{
              opacity: opacity,
              scale: scale
            }}
          >
            {children}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
