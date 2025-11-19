// components/sections/Rooms.tsx
'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import UnderlineLink from '@/components/ui/UnderlineLink'
import BeanieReveal from '@/components/animations/BeanieReveal'
import { ArrowLeft, ArrowRight } from 'lucide-react'

const SINGLE_HERO_IMAGE =
  'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1600&h=1000&fit=crop&q=80'

const RoomsPackages = () => {
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024)
    }
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const packages = [
    {
      id: 1,
      name: 'The Avatar Experience',
      duration: '3 Days / 2 Nights',
      image:
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop&q=80',
      description: 'Immerse yourself in nature',
    },
    {
      id: 2,
      name: 'The Ultimate Honeymoon',
      duration: '3 Days / 2 Nights',
      image:
        'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop&q=80',
      description: 'Romance in paradise',
    },
  ]

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 450
      if (direction === 'left') {
        scrollContainerRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
      } else {
        scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
      }
    }
  }

  return (
    <>
      {/* TEXT SECTION */}
      <section
        className="relative bg-[#EFEBE2] flex flex-col items-center justify-center text-center px-4"
        style={{ minHeight: '100vh' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 z-10">
          <h1 className={`font-americana text-[#C69C4D] mb-6 sm:mb-8 leading-relaxed ${isDesktop ? 'text-[2.5rem]' : 'text-[1.5rem] sm:text-[1.875rem]'
            }`}>
            Experience a blend of nature, comfort and<br className="hidden sm:block" />
            luxury like never before.
          </h1>
          <button className="px-6 sm:px-8 py-2.5 sm:py-3 border-2 text-[#C69C4D] transition-all duration-300 tracking-wider text-xs sm:text-sm font-medium rounded-full shadow-lg hover:shadow-xl">
            BOOK YOUR STAY
          </button>
        </div>
      </section>

      {/* IMAGE SECTION - REUSABLE */}
      <BeanieReveal
        image={SINGLE_HERO_IMAGE}
        alt="Luxury Villa View"
        minHeight={700}
        maxHeight={900}
        maxRadius={20000}
        id="beanie-image"
      />

      {/* PACKAGES SECTION */}
      <section className="py-12 sm:py-16 md:py-20 bg-[#EFEBE2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className={`font-americana text-[#C69C4D] mb-4 leading-relaxed px-4 ${isDesktop ? 'text-[2.5rem]' : 'text-[1.5rem] sm:text-[1.875rem]'
              }`}>
              Book one of our special<br />
              packages for a getaway you&apos;ll<br />
              never forget.
            </h2>
          </div>

          {/* WRAPPER FLEX UNTUK NAVIGATION + CARDS */}
          <div className="flex items-center justify-center max-w-6xl mx-auto">
            {/* NAVIGATION BUTTONS - KIRI */}
            <div className="hidden lg:flex flex-col items-center lg:w-[10vw] lg:h-[12vw] xl:w-[5vw] xl:h-[15vw] flex-shrink-0 space-y-8 border-current lg:mr-[1vw] lg:ml-[2vw] xl:ml-[-3vw]">
              <button
                onClick={() => scroll('left')}
                className="p-[1.5vw] border border-[#C69C4D] transition-all duration-300 text-[#C69C4D]"
                aria-label="Scroll left"
              >
                <ArrowLeft className="w-[2vw] h-[2vw]" />
              </button>
              <button
                onClick={() => scroll('right')}
                className="p-[1.5vw] border border-[#C69C4D] transition-all duration-300 text-[#C69C4D]"
                aria-label="Scroll right"
              >
                <ArrowRight className="w-[2vw] h-[2vw]" />
              </button>
            </div>
            {/* Mobile: Horizontal Scroll | Desktop: Grid */}
            <div className="w-full md:grid md:grid-cols-2 md:gap-8 md:max-w-5xl md:mx-auto md:justify-items-center">
              {/* Mobile Wrapper */}
              <div
                ref={scrollContainerRef}
                className="flex md:contents overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-6 pb-4 px-4 sm:px-0 md:gap-0"
              >
                {packages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className="flex-none snap-start group relative overflow-hidden w-[311.21px] md:w-[343.65px] md:snap-center"
                  >
                    <div className="relative overflow-hidden rounded-2xl">
                      {/* GAMBAR */}
                      <div className="relative h-[329.88px] md:h-[364.27px] overflow-hidden">
                        <Image
                          src={pkg.image}
                          alt={pkg.name}
                          fill
                          className="w-full h-full object-cover "
                          sizes="(max-width: 768px) 85vw, (max-width: 1024px) 45vw, 40vw"
                        />
                      </div>

                      {/* KONTEN DI BAWAH GAMBAR */}
                      <div className=" bg-[#EFEBE2] mt-4 ">
                        <p className="text-xs mb-2 text-[#343E35] font-basis bg-[#EDE6D8] w-[111.44px] px-2 py-1">
                          {pkg.duration}
                        </p>
                        <h3 className="text-[1.37rem] md:text-[1.58rem] font-americana mb-3 sm:mb-4 text-[#C69C4D]">
                          {pkg.name}
                        </h3>
                        <UnderlineLink href="#discover" className="mt-4 sm:mt-5">DISCOVER</UnderlineLink>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* MOBILE NAVIGATION BUTTONS - BAWAH */}
          <div className="flex lg:hidden justify-center items-center gap-4 mt-8">
            <button
              onClick={() => scroll('left')}
              className="p-3 border border-[#C69C4D] transition-all duration-300 text-[#C69C4D] rounded-md hover:bg-[#C69C4D] hover:text-white"
              aria-label="Scroll left"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-3 border border-[#C69C4D] transition-all duration-300 text-[#C69C4D] rounded-md hover:bg-[#C69C4D] hover:text-white"
              aria-label="Scroll right"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

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

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  )
}

export default RoomsPackages
