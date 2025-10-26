'use client'

import React, { useState, useEffect, useRef, useMemo } from 'react'
import Image from 'next/image'

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
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [isVisible])

  // FIXED: Add isDesktop to dependency array

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

  // FIXED: Add titleText and bodyText to dependency array
  const sliderData = useMemo(() => ([
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
  ]), [titleText, bodyText])

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
      className="relative bg-[#e8e1d8] text-gray-900 overflow-hidden"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        {/* Main Text Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-20 items-center mb-24">
          <div
            className="lg:col-span-2 flex justify-center"
            style={{
              animation: isVisible ? 'fadeInLeft 1s ease-out 0.3s both' : 'none'
            }}
          >
            <div ref={textContainerRef} className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-5xl font-serif text-[#C69C4D] mb-6">
                {isDesktop ? mainTextDesktop.split('|BREAK|').map((segment, index, array) => (
                  <React.Fragment key={index}>
                    {segment}
                    {index < array.length - 1 && <br />}
                  </React.Fragment>
                )) : mainTextMobile.split('|BREAK|').map((segment, index, array) => (
                  <React.Fragment key={index}>
                    {segment}
                    {index < array.length - 1 && <br />}
                  </React.Fragment>
                ))}
              </h2>
            </div>
          </div>
        </div>

        {/* Image Slider & About Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-24 lg:mb-32 pt-8">
          {/* LEFT: IMAGE SLIDER */}
          <div className="relative aspect-[3/4] overflow-hidden rounded-xl shadow-2xl">
            <Image
              key={currentImageIndex}
              src={activeSlide.src}
              alt={activeSlide.alt}
              fill
              className="object-cover transition-opacity duration-700 ease-in-out"
            />

            <div className="absolute inset-0 bg-black/10 flex justify-between items-end p-6 md:p-8">
              {/* Dots Navigation */}
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

              {/* Navigation Buttons */}
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

          {/* RIGHT: TEXT CONTENT */}
          <div className="pt-4 lg:pt-12">
            <h3 className="text-xl lg:text-2xl font-serif text-[#C69C4D] leading-snug mb-6">
              {activeSlide.title.split('|BREAK|').map((segment, index, array) => (
                <React.Fragment key={index}>
                  {segment}
                  {index < array.length - 1 && <br />}
                </React.Fragment>
              ))}
            </h3>

            <p className="text-gray-600 text-base lg:text-lg leading-relaxed mb-8">
              {activeSlide.body.split('|BREAK|').map((segment, index, array) => (
                <React.Fragment key={index}>
                  {segment}
                  {index < array.length - 1 && <br />}
                </React.Fragment>
              ))}
            </p>

            <a
              href="/about"
              className="inline-block text-[#C69C4D] hover:text-[#B8893D] transition-colors font-medium tracking-wider text-sm"
            >
              ABOUT US →
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
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

export default About
