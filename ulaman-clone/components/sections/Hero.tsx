// components/sections/Hero.tsx
'use client'

import React, { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const Hero = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const leftNavItems = [
    { label: 'Villas', href: '#villas' },
    { label: 'Spa', href: '#spa' },
    { label: 'Dine', href: '#dine' },
    { label: 'Retreats', href: '#retreats' }
  ]

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100)
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  return (
    <div id="home" className="relative min-h-screen  bg-[#E8E3D8] overflow-hidden">
      {/* Navigation */}
      <nav
        className={`fixed w-full z-50 transition-all duration-500 ${scrolled
          ? 'bg-[#E8E3D8] backdrop-blur-lg py-9 shadow-2xl'
          : 'bg-transparent py-9'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Mobile Menu Button - Left */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Left Nav Items - Desktop */}
            <div className="hidden lg:flex items-center space-x-8">
              {leftNavItems.map((item, index) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection(item.href)
                  }}
                  className="text-[#C69C4D] transition-all duration-300 text-sm tracking-wide capitalize relative group"
                  style={{
                    animation: `fadeInDown 0.6s ease-out ${index * 0.1}s both`
                  }}
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-amber-400 transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>

            {/* Center Logo */}
            <div className="absolute left-1/2 -translate-x-1/2 text-center">
              <div className="text-[#C69C4D] mb-1">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="currentColor"
                  className="mx-auto"
                >
                  <path d="M20 5 L25 15 L20 25 L15 15 Z M20 15 L25 25 L20 35 L15 25 Z" />
                  <circle cx="20" cy="20" r="2" />
                </svg>
              </div>
              <h1 className=" text-xl tracking-[0.2em] text-[#C69C4D]">
                ULAMAN
              </h1>
              <p className="text-[11px] uppercase text-[#C69C4D] mt-0.5">
                Eco Luxury Resort
              </p>
            </div>

            {/* Stay With Us Button - Desktop */}
            <button
              className="hidden lg:block px-6 py-2.5 border border-white/40 text-[#C69C4D] hover:text-white hover:bg-[#C69C4D] text-xs tracking-wider capitalize transition-all duration-300 rounded-sm"
              style={{
                animation: 'fadeInDown 0.6s ease-out 0.4s both'
              }}
            >
              Stay With Us
            </button>


            {/* Spacer for mobile (keeps logo centered) */}
            <div className="lg:hidden w-10"></div>
          </div>

          {/* Mobile Menu */}
          <div
            className={`lg:hidden overflow-hidden transition-all duration-500 ${isMenuOpen ? 'max-h-screen opacity-100 mt-6' : 'max-h-0 opacity-0'
              }`}
          >
            <div className="space-y-4 pb-6 ">
              {leftNavItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection(item.href)
                  }}
                  className="block text-white/90 hover:text-amber-400 transition-colors duration-300 text-sm tracking-wide capitalize py-2"
                >
                  {item.label}
                </a>
              ))}

              {/* Tombol Mobile dengan efek hover baru */}
              <button
                className="w-full px-6 py-3 border border-white/40 text-[#C69C4D] hover:text-white hover:bg-white text-xs tracking-wider capitalize transition-all duration-300 rounded-sm"
              >
                Stay With Us
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative h-screen">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[5000ms] scale-110"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1920&h=1080&fit=crop&q=80')"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleX {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
      `}</style>
    </div>
  )
}

export default Hero
