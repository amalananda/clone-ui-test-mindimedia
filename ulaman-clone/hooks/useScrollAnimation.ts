// hooks/useScrollAnimation.ts
import { useRef } from 'react'
import { useScroll, useTransform, MotionValue } from 'framer-motion'

type ScrollOffset = "start end" | "end start" | "start start" | "end end" | "center start" | "center end" | "center center"

interface ScrollAnimationConfig {
  offsetStart?: ScrollOffset
  offsetEnd?: ScrollOffset
  leftX?: {
    input: [number, number]
    output: [number, number]
  }
  rightX?: {
    input: [number, number]
    output: [number, number]
  }
  leftRotate?: {
    input: [number, number]
    output: [number, number]
  }
  rightRotate?: {
    input: [number, number]
    output: [number, number]
  }
  opacity?: {
    input: [number, number]
    output: [number, number]
  }
  scale?: {
    input: [number, number]
    output: [number, number]
  }
}

interface ScrollAnimationReturn {
  containerRef: React.RefObject<HTMLDivElement | null>
  scrollYProgress: MotionValue<number>
  leftX?: MotionValue<number>
  rightX?: MotionValue<number>
  leftRotate?: MotionValue<number>
  rightRotate?: MotionValue<number>
  opacity?: MotionValue<number>
  scale?: MotionValue<number>
}

export const useScrollAnimation = (
  config: ScrollAnimationConfig = {}
): ScrollAnimationReturn => {
  const containerRef = useRef<HTMLDivElement>(null)

  const {
    offsetStart = "start end" as ScrollOffset,
    offsetEnd = "end start" as ScrollOffset,
    leftX: leftXConfig,
    rightX: rightXConfig,
    leftRotate: leftRotateConfig,
    rightRotate: rightRotateConfig,
    opacity: opacityConfig,
    scale: scaleConfig
  } = config

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: [offsetStart, offsetEnd]
  })

  // PERBAIKAN: Semua useTransform dipanggil tanpa kondisi
  // Gunakan default values jika config tidak ada
  const leftX = useTransform(
    scrollYProgress,
    leftXConfig?.input || [0, 1],
    leftXConfig?.output || [0, 0]
  )

  const rightX = useTransform(
    scrollYProgress,
    rightXConfig?.input || [0, 1],
    rightXConfig?.output || [0, 0]
  )

  const leftRotate = useTransform(
    scrollYProgress,
    leftRotateConfig?.input || [0, 1],
    leftRotateConfig?.output || [0, 0]
  )

  const rightRotate = useTransform(
    scrollYProgress,
    rightRotateConfig?.input || [0, 1],
    rightRotateConfig?.output || [0, 0]
  )

  const opacity = useTransform(
    scrollYProgress,
    opacityConfig?.input || [0, 1],
    opacityConfig?.output || [1, 1]
  )

  const scale = useTransform(
    scrollYProgress,
    scaleConfig?.input || [0, 1],
    scaleConfig?.output || [1, 1]
  )

  // Return hanya yang dikonfigurasi
  return {
    containerRef,
    scrollYProgress,
    leftX: leftXConfig ? leftX : undefined,
    rightX: rightXConfig ? rightX : undefined,
    leftRotate: leftRotateConfig ? leftRotate : undefined,
    rightRotate: rightRotateConfig ? rightRotate : undefined,
    opacity: opacityConfig ? opacity : undefined,
    scale: scaleConfig ? scale : undefined
  }
}

// Preset konfigurasi untuk use case umum
export const scrollAnimationPresets = {
  splitImages: {
    offsetStart: "start end" as ScrollOffset,
    offsetEnd: "end start" as ScrollOffset,
    leftX: {
      input: [0.1, 0.3] as [number, number],
      output: [0, -370] as [number, number]
    },
    rightX: {
      input: [0.1, 0.3] as [number, number],
      output: [0, 370] as [number, number]
    },
    leftRotate: {
      input: [0.1, 0.7] as [number, number],
      output: [0, -28] as [number, number]
    },
    rightRotate: {
      input: [0.1, 0.7] as [number, number],
      output: [0, 28] as [number, number]
    },
    opacity: {
      input: [0.2, 0.6] as [number, number],
      output: [0, 1] as [number, number]
    },
    scale: {
      input: [0.2, 0.6] as [number, number],
      output: [0.9, 1] as [number, number]
    }
  },

  fadeIn: {
    opacity: {
      input: [0, 0.5] as [number, number],
      output: [0, 1] as [number, number]
    },
    scale: {
      input: [0, 0.5] as [number, number],
      output: [0.8, 1] as [number, number]
    }
  },

  parallax: {
    leftX: {
      input: [0, 1] as [number, number],
      output: [0, -100] as [number, number]
    }
  }
}
