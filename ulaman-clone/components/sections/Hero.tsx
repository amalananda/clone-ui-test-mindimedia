// components/sections/Hero.tsx
'use client'

import React, { useState, useEffect } from 'react'
import { ChevronDown, Menu, X } from 'lucide-react'

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1920&h=1080&fit=crop&q=80',
      title: 'Welcome to Ulaman',
      subtitle: 'Eco Luxury Resort',
      description: 'Where Nature and Luxury Coexist'
    },
    {
      image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1920&h=1080&fit=crop&q=80',
      title: 'Sustainable Luxury',
      subtitle: 'Bamboo Architecture',
      description: 'Handcrafted with Love for Nature'
    },
    {
      image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1920&h=1080&fit=crop&q=80',
      title: 'Immerse in Nature',
      subtitle: 'Jungle Paradise',
      description: 'A Sanctuary for Your Soul'
    }
  ]

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'Rooms', href: '#rooms' },
    { label: 'Experiences', href: '#experiences' },
    { label: 'About', href: '#about' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Contact', href: '#contact' }
  ]

  useEffect(() => {
    // Auto-play carousel every 6 seconds
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 6000)

    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      clearInterval(timer)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [slides.length])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  return (
    <div id="home" className="relative min-h-screen bg-stone-950 overflow-hidden">
      {/* Navigation */}
      <nav
        className={`fixed w-full z-50 transition-all duration-500 ${scrolled
          ? 'bg-stone-950/95 backdrop-blur-lg py-3 shadow-2xl'
          : 'bg-transparent py-6'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="text-white transform transition-transform hover:scale-105">
              <h1 className="font-['Playfair_Display'] text-3xl md:text-4xl tracking-wider font-light">
                ULAMAN
              </h1>
              <p className="text-[10px] tracking-[0.3em] text-amber-400 uppercase font-light">
                Eco Luxury Resort
              </p>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-10">
              {navItems.map((item, index) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection(item.href)
                  }}
                  className="text-white/90 hover:text-amber-400 transition-all duration-300 text-sm tracking-widest uppercase relative group"
                  style={{
                    animation: `fadeInDown 0.6s ease-out ${index * 0.1}s both`
                  }}
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-amber-400 transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>

            {/* Book Now Button */}
            <button
              className="hidden lg:block px-8 py-3 bg-amber-600 hover:bg-amber-500 text-white text-xs tracking-[0.2em] uppercase transition-all duration-300 shadow-lg hover:shadow-amber-600/50 transform hover:-translate-y-0.5"
              style={{
                animation: 'fadeInDown 0.6s ease-out 0.6s both'
              }}
            >
              Book Now
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            className={`lg:hidden overflow-hidden transition-all duration-500 ${isMenuOpen ? 'max-h-screen opacity-100 mt-6' : 'max-h-0 opacity-0'
              }`}
          >
            <div className="space-y-4 pb-6">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection(item.href)
                  }}
                  className="block text-white/90 hover:text-amber-400 transition-colors duration-300 text-sm tracking-widest uppercase py-2"
                >
                  {item.label}
                </a>
              ))}
              <button className="w-full px-8 py-3 bg-amber-600 hover:bg-amber-500 text-white text-xs tracking-[0.2em] uppercase transition-all duration-300">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Carousel */}
      <div className="relative h-screen">
        {/* Background Slides with Ken Burns Effect */}
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-[1500ms] ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${slide.image})`,
                transform: index === currentSlide ? 'scale(1.1)' : 'scale(1)',
                transition: 'transform 8s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
          </div>
        ))}

        {/* Hero Content */}
        <div className="relative h-full flex items-center justify-center text-center px-4 z-20">
          <div className="max-w-5xl">
            <div
              className="w-24 h-[1px] bg-amber-400 mx-auto mb-8"
              style={{
                animation: 'scaleX 1s ease-out 0.5s both',
                transformOrigin: 'center'
              }}
            />
            <h2
              key={`title-${currentSlide}`}
              className="font-['Playfair_Display'] text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light mb-6 leading-tight"
              style={{
                animation: 'fadeInUp 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.3s both'
              }}
            >
              {slides[currentSlide].title}
            </h2>
            <p
              key={`subtitle-${currentSlide}`}
              className="text-amber-400 text-lg sm:text-xl md:text-2xl tracking-[0.3em] uppercase font-light mb-4"
              style={{
                animation: 'fadeInUp 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.6s both'
              }}
            >
              {slides[currentSlide].subtitle}
            </p>
            <p
              key={`desc-${currentSlide}`}
              className="text-white/80 text-base md:text-lg tracking-wider mb-12 max-w-2xl mx-auto"
              style={{
                animation: 'fadeInUp 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.9s both'
              }}
            >
              {slides[currentSlide].description}
            </p>

            <button
              className="group relative px-12 py-4 bg-transparent border-2 border-white text-white hover:bg-white hover:text-stone-950 transition-all duration-500 text-sm tracking-[0.2em] uppercase overflow-hidden"
              style={{
                animation: 'fadeInUp 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 1.2s both'
              }}
            >
              <span className="relative z-10">Explore Resort</span>
            </button>
          </div>
        </div>
        {/* Slide Indicators */}
        <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 flex space-x-3 z-30">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`transition-all duration-500 ${index === currentSlide
                ? 'w-16 h-1 bg-white'
                : 'w-8 h-1 bg-white/40 hover:bg-white/60'
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        {/* Scroll Indicator */}
        <div
          className="absolute bottom-10 left-[52%] transform -translate-x-1/2 flex flex-col items-center space-y-2 z-30"
          style={{
            animation: 'bounce 2s infinite'
          }}
        >
          <span className="text-white/60 text-xs tracking-widest uppercase">Scroll</span>
          <ChevronDown className="text-white/60" size={28} strokeWidth={1} />
        </div>
      </div>
      <style jsx>{`
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

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
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

        @keyframes bounce {
          0%, 100% {
            transform: translateX(-50%) translateY(0);
          }
          50% {
            transform: translateX(-50%) translateY(-10px);
          }
        }
      `}</style>
    </div>
  )
}

export default Hero
