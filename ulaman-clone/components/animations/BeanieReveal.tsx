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
  minHeight = 700,
  maxHeight = 900,
  maxRadius = 20000,
  id,
  className = 'bg-[#EFEBE2]'
}: BeanieRevealProps) => {
  const [scrollProgress, setScrollProgress] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  const reactId = useId()
  const uniqueId = id || `beanie-${reactId.replace(/:/g, '')}`

  const handleScroll = useCallback(() => {
    const hero = sectionRef.current
    if (!hero) return

    const rect = hero.getBoundingClientRect()
    const winH = window.innerHeight
    const progress = 1 - Math.max(0, rect.top / winH)
    setScrollProgress(Math.max(0, Math.min(progress, 1)))
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const currentRadius = Math.pow(1 - scrollProgress, 2) * maxRadius
  const currentHeight = minHeight + scrollProgress * (maxHeight - minHeight)
  const scale = 0.95 + scrollProgress * 0.05
  const opacity = 0.5 + scrollProgress * 0.5

  return (
    <section
      ref={sectionRef}
      id={uniqueId}
      className={`relative overflow-hidden ${className}`}
      style={{ height: `${currentHeight}px` }}
    >
      <motion.div
        className="absolute bottom-0 left-0 right-0 w-full overflow-hidden shadow-2xl"
        style={{
          height: '100%',
          scale,
          opacity,
          borderTopLeftRadius: `${currentRadius}px`,
          borderTopRightRadius: `${currentRadius}px`,
          transformOrigin: 'top center',
          transition:
            'border-radius 0.01s ease-out, opacity 0.01s ease-out, transform 0.01s ease-out',
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
