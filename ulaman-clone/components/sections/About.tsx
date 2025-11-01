// components/sections/About.tsx
'use client'

import React, { useState, useEffect, useRef } from 'react'
import TextReveal from '@/components/animations/TextReveal'
import Image from 'next/image'
import UnderlineLink from '../ui/UnderlineLink'
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

const About = () => {
  const [, setScrollY] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [revealRatio, setRevealRatio] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const textContainerRef = useRef<HTMLDivElement>(null)
  const isDesktop = useIsDesktop(1024)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)

      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        const inView = rect.top < window.innerHeight * 0.75 && rect.bottom > 0
        if (inView && !isVisible) {
          setIsVisible(true)
        }
      }

      // ✅ PERBAIKAN UTAMA: Hitung revealRatio di dalam useEffect
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

  const mainTextMobile =
    "Nestled among the rice |BREAK|" +
    "fields and coconut trees |BREAK|" +
    "of Tabanan, Ulaman is |BREAK|" +
    "only 20 minutes away |BREAK|" +
    "from the vibrant town of |BREAK|" +
    "Canggu."
  const mainTextDesktop =
    "Nestled among the rice fields and |BREAK|" +
    "coconut trees of Tabanan, Ulaman |BREAK|" +
    "is only 20 minutes away from the |BREAK|" +
    "vibrant town of Canggu."

  const textRevealProps = isDesktop
    ? {
      text: mainTextDesktop,
      className: "font-americana text-[2.5rem] leading-[1.25] font-normal",
      startColor: "#C69C4D",
      endColor: "rgba(198, 156, 77, 0.3)",
    }
    : {
      text: mainTextMobile,
      className: "font-americana text-[1.875rem] leading-[1.25] font-normal",
      startColor: "#C69C4D",
      endColor: "rgba(198, 156, 77, 0.3)",
    }

  const titleText =
    "An award-winning eco-luxury resort |BREAK|" +
    "offering a unique hideaway experience. |BREAK|" +
    "Embrace authenticity, balance, and |BREAK|" +
    "harmony with nature in a healing, |BREAK|" +
    "luxurious environment."

  const bodyText =
    "We believe nature and luxury can coexist. Ulaman |BREAK|" +
    "Eco Luxury Resort offers a secluded, lush haven |BREAK|" +
    "with luxurious amenities and impeccable service. |BREAK|" +
    "Immerse yourself in traditional Balinese culture and |BREAK|" +
    "leave feeling renewed, all while minimizing your |BREAK|" +
    "ecological footprint. Recharge your mind, body, and |BREAK|" +
    "soul in this unique holistic retreat."

  const sliderData = [
    {
      src: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&h=1000&fit=crop&q=80',
      alt: 'Ulaman Eco Resort Exterior View',
      title: titleText,
      body: bodyText
    },
    {
      src: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&h=1000&fit=crop&q=80',
      alt: 'Luxury Interior Design',
      title: titleText,
      body: bodyText
    },
    {
      src: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&h=1000&fit=crop&q=80',
      alt: 'Infinity Pool with Nature View',
      title: titleText,
      body: bodyText
    }
  ]

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % sliderData.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + sliderData.length) % sliderData.length)
  }

  const activeSlide = sliderData[currentImageIndex]

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative bg-[#EFEBE2] from-stone-950 to-stone-900 text-white overflow-hidden"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-20 items-center mb-24">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-24 lg:mb-32 pt-8">
          <div className="relative aspect-[3/4] overflow-hidden rounded-xl shadow-2xl">
            <Image
              key={currentImageIndex}
              src={activeSlide.src}
              alt={activeSlide.alt}
              fill
              className="w-full h-full object-cover transition-opacity duration-700 ease-in-out"
            />
            <div className="absolute inset-0 bg-black/10 flex justify-between items-end p-6 md:p-8">
              <div className="flex space-x-2">
                {sliderData.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentImageIndex ? 'bg-amber-400 w-6' : 'bg-white/50 hover:bg-white/80'
                      }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={prevImage}
                  className="p-3 bg-white/20 hover:bg-white/40 text-white rounded-full transition-colors backdrop-blur-sm"
                  aria-label="Previous image"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                </button>
                <button
                  onClick={nextImage}
                  className="p-3 bg-white/20 hover:bg-white/40 text-white rounded-full transition-colors backdrop-blur-sm"
                  aria-label="Next image"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="pt-4 lg:pt-35 ml-12">
            <div
              key={currentImageIndex + '-title'}
              className="font-americana text-[1.35rem] lg:text-[1.625rem] leading-snug font-medium text-[#C69C4D] transition-opacity duration-500 ease-in-out"
            >
              {activeSlide.title.split('|BREAK|').map((segment, index, array) => (
                <React.Fragment key={index}>
                  {segment}
                  {index < array.length - 1 && <br />}
                </React.Fragment>
              ))}
            </div>

            <p className="mt-8 font-basis text-gray-400 text-lg leading-relaxed transition-opacity duration-500 ease-in-out">
              {activeSlide.body.split('|BREAK|').map((segment, index, array) => (
                <React.Fragment key={index}>
                  {segment}
                  {index < array.length - 1 && <br />}
                </React.Fragment>
              ))}
            </p>

            <UnderlineLink href="/about" className="mt-5">ABOUT US</UnderlineLink>

          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

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

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scaleX {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }
      `}</style>
    </section>
  )
}

export default About
