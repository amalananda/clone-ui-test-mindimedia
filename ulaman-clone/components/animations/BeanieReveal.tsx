// components/animations/BeanieReveal.tsx
'use client'

import React, { useState, useEffect, useCallback, useRef, useId } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface BeanieRevealProps {
  image: string
  alt?: string
  minHeight?: number
  maxHeight?: number
  maxRadius?: number
  id?: string
  className?: string
}

const BeanieReveal = ({
  image,
  alt = 'Hero Image',
  minHeight = 800,
  maxHeight = 1000,
  maxRadius = 20000,
  id,
  className = 'bg-[#EFEBE2]'
}: BeanieRevealProps) => {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const lastScrollY = useRef(0)
  const rafId = useRef<number>(0)

  const reactId = useId()
  const uniqueId = id || `beanie-${reactId.replace(/:/g, '')}`

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleScroll = useCallback(() => {
    if (rafId.current) {
      cancelAnimationFrame(rafId.current)
    }

    rafId.current = requestAnimationFrame(() => {
      const hero = sectionRef.current
      if (!hero) return

      const rect = hero.getBoundingClientRect()
      const winH = window.innerHeight

      // Mobile: trigger earlier and with different calculation
      const startMultiplier = isMobile ? 1.2 : 1.3
      const start = winH * startMultiplier
      const end = -rect.height
      const scrollRange = start - end
      const currentScroll = start - rect.top

      const progress = Math.max(0, Math.min(1, currentScroll / scrollRange))

      setScrollProgress(progress)
      lastScrollY.current = window.scrollY
    })
  }, [isMobile])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafId.current) {
        cancelAnimationFrame(rafId.current)
      }
    }
  }, [handleScroll])

  // Easing function for smoother transitions
  const easeOutCubic = (t: number): number => {
    return 1 - Math.pow(1 - t, 3)
  }

  const easedProgress = easeOutCubic(scrollProgress)

  // Mobile-specific adjustments
  const mobileRadiusMultiplier = isMobile ? 0.5 : 1 // Less extreme curve on mobile
  const mobileScaleStart = isMobile ? 0.95 : 0.92
  const mobileScaleRange = isMobile ? 0.05 : 0.08

  // Calculate values with easing
  const currentRadius = Math.pow(1 - easedProgress, 3) * maxRadius * mobileRadiusMultiplier
  const currentHeight = minHeight + easedProgress * (maxHeight - minHeight)
  const scale = mobileScaleStart + easedProgress * mobileScaleRange
  const opacity = 1

  // Mobile gets faster spring
  const springConfig = isMobile
    ? { stiffness: 180, damping: 35, mass: 0.4 }
    : { stiffness: 150, damping: 30, mass: 0.5 }

  return (
    <section
      ref={sectionRef}
      id={uniqueId}
      className={`relative overflow-hidden ${className}`}
      style={{ height: `${currentHeight}px` }}
    >
      <motion.div
        className="absolute bottom-0 left-0 right-0 w-full overflow-hidden shadow-2xl will-change-transform"
        style={{
          height: '100%',
          scale,
          opacity,
          borderTopLeftRadius: `${currentRadius}px`,
          borderTopRightRadius: `${currentRadius}px`,
          transformOrigin: 'bottom center',
        }}
        transition={{
          type: "spring",
          ...springConfig
        }}
      >
        <Image
          src={image}
          alt={alt}
          className="w-full h-full object-cover"
          fill
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
      </motion.div>
    </section>
  )
}

export default BeanieReveal
