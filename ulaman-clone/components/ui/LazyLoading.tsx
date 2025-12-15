// components/ui/LazyLoading.tsx
'use client'

import { useState, useEffect, useRef, ReactNode } from 'react'

interface LazyLoadingProps {
  children: ReactNode
  className?: string
  threshold?: number
  rootMargin?: string
}

export default function LazyLoading({
  children,
  className = '',
  threshold = 0.1,
  rootMargin = '-100px'
}: LazyLoadingProps) {
  const [shouldRender, setShouldRender] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !shouldRender) {
          setShouldRender(true)

          requestAnimationFrame(() => {
            setTimeout(() => {
              setIsVisible(true)
            }, 150)
          })

          observer.disconnect()
        }
      },
      { threshold, rootMargin }
    )

    const currentRef = ref.current
    if (currentRef) observer.observe(currentRef)

    return () => {
      if (currentRef) observer.unobserve(currentRef)
    }
  }, [threshold, rootMargin, shouldRender])

  return (
    <div
      ref={ref}
      className={`min-h-[300px] ${className}`}
    >
      {shouldRender && (
        <div
          className={`transition-all duration-[1400ms] ease-out ${isVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-24'
            }`}
        >
          {children}
        </div>
      )}
    </div>
  )
}
