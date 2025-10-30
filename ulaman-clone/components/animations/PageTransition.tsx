// components/animations/PageTransition.tsx
'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [displayText, setDisplayText] = useState('')

  useEffect(() => {
    // Set text berdasarkan route
    const pathMap: { [key: string]: string } = {
      '/': 'Welcome',
      '/about': 'About',
      '/experience': 'Experience',
    }
    setDisplayText(pathMap[pathname] || pathname.replace('/', ''))
  }, [pathname])

  // Split text menjadi array huruf
  const letters = displayText.split('')

  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname}>
        {/* Overlay Transition - Full Screen dengan fade */}
        <motion.div
          className="fixed inset-0 z-50 bg-[#E8E3D8] flex items-center justify-center"
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.6, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ pointerEvents: 'none' }}
        >
          {/* Text dengan animasi huruf per huruf dari kiri ke kanan */}
          <h1 className="font-americana text-[#C69C4D] text-2xl md:text-3xl lg:text-4xl tracking-wide flex">
            {letters.map((char, index) => (
              <motion.span
                key={`${char}-${index}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.09, // Setiap huruf delay 80ms dari huruf sebelumnya
                  ease: [0.22, 1, 0.36, 1]
                }}
                className={char === ' ' ? 'w-4 md:w-6' : ''}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </h1>
        </motion.div>

        {/* Page Content - Fade in setelah transition */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 1.4 }}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
