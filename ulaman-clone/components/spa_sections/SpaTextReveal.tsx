// components/sections/HeroTextReveal.tsx
'use client'

import React, { useState, useEffect, useRef } from 'react'
import TextReveal from '@/components/animations/TextReveal'

interface SpaTextRevealProps {
  textMobile: string
  textDesktop: string
  className?: string
  startColor?: string
  endColor?: string
  backgroundColor?: string
}

const useIsDesktop = (minWidth: number = 1024) => {
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= minWidth)
    }
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [minWidth])

  return isDesktop
}

const SpaTextReveal: React.FC<SpaTextRevealProps> = ({
  textMobile,
  textDesktop,
  className = '',
  startColor = '#b79f8c',
  endColor = 'rgba(198, 156, 77, 0.3)',
  backgroundColor = '#EFEBE2'
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [revealRatio, setRevealRatio] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const textContainerRef = useRef<HTMLDivElement>(null)
  const isDesktop = useIsDesktop(1024)

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        const inView = rect.top < window.innerHeight * 0.75 && rect.bottom > 0
        if (inView && !isVisible) {
          setIsVisible(true)
        }
      }

      if (textContainerRef.current) {
        const { top, height } = textContainerRef.current.getBoundingClientRect()
        const windowHeight = window.innerHeight

        let startOffset, endOffset

        if (isDesktop) {
          startOffset = windowHeight * 0.69
          endOffset = -windowHeight * 0.02
        } else {
          startOffset = windowHeight * 0.59
          endOffset = -windowHeight * 0.02
        }

        const scrollDistance = height + startOffset - endOffset
        const ratio = 1 - (top - endOffset) / scrollDistance
        const newRatio = Math.min(1, Math.max(0, ratio))

        setRevealRatio(newRatio)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [isVisible, isDesktop])

  const textRevealProps = isDesktop
    ? {
      text: textDesktop,
      className: `font-americana text-[2.5rem] leading-[1.25] font-normal ${className}`,
      startColor,
      endColor,
    }
    : {
      text: textMobile,
      className: `font-americana text-[1.7rem] leading-[1.25] font-normal ${className}`,
      startColor,
      endColor,
    }

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ backgroundColor }}
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-20 items-center">
          <div
            className="lg:col-span-2 flex justify-center"
            style={{
              animation: isVisible ? 'fadeInLeft 1s ease-out 0.3s both' : 'none'
            }}
          >
            <div ref={textContainerRef} className="max-w-4xl mx-auto text-center">
              <TextReveal
                {...textRevealProps}
                as="h1"
                revealRatio={revealRatio}
              />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  )
}

export default SpaTextReveal
