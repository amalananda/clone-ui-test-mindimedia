// components/sections/Rooms.tsx
'use client'

import React, { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import UnderlineLink from '@/components/ui/UnderlineLink'
import BeanieReveal from '@/components/animations/BeanieReveal'

const SINGLE_HERO_IMAGE =
  'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1600&h=1000&fit=crop&q=80'

const HeroWithPackages = () => {
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024)
    }
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

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

  return (
    <>
      {/* TEXT SECTION */}
      <section
        className="relative bg-[#EFEBE2] flex flex-col items-center justify-center text-center"
        style={{ minHeight: '100vh' }}
      >
        <div className="max-w-7xl mx-auto px-8 z-10">
          <h1 className={`font-americana text-[#C69C4D] mb-8 leading-relaxed ${isDesktop ? 'text-[2.5rem]' : 'text-[1.875rem]'
            }`}>
            Experience a blend of nature, comfort and<br />
            luxury like never before.
          </h1>
          <button className="px-8 py-3 border-2 text-[#C69C4D] transition-all duration-300 tracking-wider text-sm font-medium rounded-full shadow-lg hover:shadow-xl">
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
      <section className="py-20 bg-[#EFEBE2]">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className={`font-americana text-[#C69C4D] mb-4 leading-relaxed ${isDesktop ? 'text-[2.5rem]' : 'text-[1.875rem]'
              }`}>
              Book one of our special<br />
              packages for a getaway you&apos;ll<br />
              never forget.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {packages.map((pkg, i) => (
              <div
                key={pkg.id}
                className="group relative"
                style={{
                  animation: `fadeInUp 0.8s ease-out ${i * 0.2}s both`,
                }}
              >
                <div className="relative overflow-hidden rounded-2xl shadow-xl">
                  <div className="relative h-96 overflow-hidden">
                    <Image
                      src={pkg.image}
                      alt={pkg.name}
                      fill
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <p className="text-xs tracking-widest uppercase mb-2 text-amber-400 font-basis">
                      {pkg.duration}
                    </p>
                    <h3 className="text-2xl md:text-3xl font-americana mb-4">
                      {pkg.name}
                    </h3>
                    <UnderlineLink href="#discover" className="mt-5">DISCOVER</UnderlineLink>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-4 mt-12">
            <button className="w-12 h-12 border-2 border-amber-600 text-amber-700 hover:bg-amber-600 hover:text-white rounded-full flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg">
              <ChevronLeft size={20} />
            </button>
            <button className="w-12 h-12 border-2 border-amber-600 text-amber-700 hover:bg-amber-600 hover:text-white rounded-full flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg">
              <ChevronRight size={20} />
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
      `}</style>
    </>
  )
}

export default HeroWithPackages
