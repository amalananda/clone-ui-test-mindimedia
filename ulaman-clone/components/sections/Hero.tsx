// components/sections/Hero.tsx
'use client'

import React, { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface NavItem {
  label: string
  href: string
}

interface HeroButton {
  label: string
  href?: string
  onClick?: () => void
}

interface HeroProps {
  heroImage?: string
  leftNavItems?: NavItem[]
  rightButton?: HeroButton
  logoText?: string
  logoSubtext?: string
  showLogo?: boolean
}

const defaultLeftNavItems: NavItem[] = [
  { label: 'Villas', href: '/rooms' },
  { label: 'Spa', href: '/spa' },
  { label: 'Dine', href: '#dine' },
  { label: 'Retreats', href: '/retreats' }
]

const defaultButton: HeroButton = {
  label: 'Stay With Us',
  href: '#booking'
}

const Hero = ({
  heroImage = 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1920&h=1080&fit=crop&q=80',
  leftNavItems = defaultLeftNavItems,
  rightButton = defaultButton,
  logoText = 'ULAMAN',
  logoSubtext = 'Eco Luxury Resort',
  showLogo = true
}: HeroProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100)
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    if (href.startsWith('/') && !href.startsWith('/#')) {
      router.push(href)
      setIsMenuOpen(false)
      return
    }
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  const handleButtonClick = () => {
    if (rightButton.onClick) {
      rightButton.onClick()
    } else if (rightButton.href) {
      scrollToSection(rightButton.href)
    }
    setIsMenuOpen(false)
  }

  return (
    <div id="home" className="relative min-h-screen bg-[#EFEBE2] overflow-hidden">
      {/* Navigation */}
      <nav
        className={`fixed w-full z-50 transition-all duration-500 ${scrolled
          ? 'bg-[#EFEBE2] border-b border-[#C69C4D] py-4 md:py-5'
          : 'bg-transparent border-b border-transparent py-6 md:py-8'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Mobile Menu Button - Left */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden text-[#C69C4D] p-2 hover:bg-[#C69C4D]/10 rounded-lg transition-colors"
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
                  className="text-[#C69C4D] font-basis transition-all duration-300 text-sm tracking-wide capitalize relative group"
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
            {showLogo && (
              <div className="absolute left-1/2 -translate-x-1/2 text-center">
                <div className="text-[#C69C4D] mb-1">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 40 40"
                    fill="currentColor"
                    className="mx-auto md:w-10 md:h-10"
                  >
                    <path d="M20 5 L25 15 L20 25 L15 15 Z M20 15 L25 25 L20 35 L15 25 Z" />
                    <circle cx="20" cy="20" r="2" />
                  </svg>
                </div>
                <h1 className="text-base md:text-lg tracking-[0.2rem] -mt-2 font-basis text-[#C69C4D]">
                  {logoText}
                </h1>
                <p className="text-[9px] md:text-[11px] uppercase text-[#C69C4D] -mt-2 font-basis mt-0.5">
                  {logoSubtext}
                </p>
              </div>
            )}

            {/* Right Button - Desktop */}
            {rightButton && (
              <button
                onClick={handleButtonClick}
                className="hidden lg:block px-6 py-2.5 border border-[#C69C4D] text-[#C69C4D] hover:text-white hover:bg-[#C69C4D] text-xs tracking-wider capitalize transition-all duration-300 rounded-sm"
                style={{
                  animation: 'fadeInDown 0.6s ease-out 0.4s both'
                }}
              >
                {rightButton.label}
              </button>
            )}

            {/* Spacer for mobile (keeps logo centered) */}
            <div className="lg:hidden w-10"></div>
          </div>

          {/* Mobile Menu */}
          <div
            className={`lg:hidden overflow-hidden transition-all duration-500 ${isMenuOpen ? 'max-h-screen opacity-100 mt-6' : 'max-h-0 opacity-0'
              }`}
          >
            <div className="space-y-4 pb-6">
              {leftNavItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection(item.href)
                  }}
                  className="block text-[#C69C4D] hover:text-[#b8975a] transition-colors duration-300 text-sm tracking-wide capitalize py-2"
                >
                  {item.label}
                </a>
              ))}

              {/* Mobile Button */}
              {rightButton && (
                <button
                  onClick={handleButtonClick}
                  className="w-full px-6 py-3 border border-[#C69C4D] text-[#C69C4D] hover:text-white hover:bg-[#C69C4D] text-xs tracking-wider capitalize transition-all duration-300 rounded-sm"
                >
                  {rightButton.label}
                </button>
              )}
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
            backgroundImage: `url('${heroImage}')`
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
