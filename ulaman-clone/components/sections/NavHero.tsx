// components/sections/NavHero.tsx
'use client'

import React from 'react'
import { NavItem, HeroButton } from '@/lib/hero-types'
import { AnimatedMenuIcon } from '@/components/ui/AnimatedMenuIcon'

interface NavigationProps {
  isMenuOpen: boolean
  setIsMenuOpen: (open: boolean) => void
  isFullMenuOpen: boolean
  setIsFullMenuOpen: (open: boolean) => void
  scrolled: boolean
  navStates: boolean[]
  showLogoAnim: boolean
  showButton: boolean
  leftNavItems: NavItem[]
  rightButton: HeroButton
  logoText: string
  logoSubtext: string
  showLogo: boolean
  scrollToSection: (href: string) => void
  handleButtonClick: () => void
}

export const Navigation = ({
  isFullMenuOpen,
  setIsFullMenuOpen,
  scrolled,
  navStates,
  showLogoAnim,
  showButton,
  leftNavItems,
  rightButton,
  logoText,
  logoSubtext,
  showLogo,
  scrollToSection,
  handleButtonClick
}: NavigationProps) => {
  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${scrolled
        ? 'bg-[#EFEBE2] border-b border-[#C69C4D] py-4 md:py-5'
        : 'bg-transparent border-b border-transparent py-6 md:py-8'
        }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="relative flex justify-between items-center px-4 sm:px-6 lg:px-8">
          {/* Left Section: Hamburger + Nav Items */}
          <div className="hidden lg:flex items-center gap-8">
            {/* Desktop Hamburger Menu Button - Animated */}
            <button
              onClick={() => setIsFullMenuOpen(!isFullMenuOpen)}
              className={`p-2 hover:bg-[#F4EFE8]/10 rounded-lg transition-all duration-700 -ml-20 mt-2 hamburger-button ${scrolled ? 'text-[#C69C4D] hover:bg-[#C69C4D]/10' : 'text-[#F4EFE8]'
                } ${navStates[0] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
              aria-label="Toggle full menu"
            >
              <AnimatedMenuIcon
                isOpen={isFullMenuOpen}
                firstLineLength={27}
                secondLineLength={54}
                strokeWidth={0.5}
              />
            </button>

            {/* Left Nav Items - Desktop */}
            <div className="flex space-x-8">
              {leftNavItems.map((item, index) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection(item.href)
                  }}
                  className={`font-basis transition-all duration-700 text-sm tracking-wide capitalize relative group ${scrolled ? 'text-[#C69C4D]' : 'text-[#F4EFE8]'
                    } ${navStates[index] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-1 left-0 w-0 h-[1px] transition-all duration-300 group-hover:w-full ${scrolled ? 'bg-[#C69C4D]' : 'bg-[#F4EFE8]'
                      }`}
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button - Left */}
          <button
            onClick={() => setIsFullMenuOpen(!isFullMenuOpen)}
            className={`lg:hidden p-2 hover:bg-[#F4EFE8]/10 rounded-lg transition-all duration-700 hamburger-button ${scrolled ? 'text-[#C69C4D] hover:bg-[#C69C4D]/10' : 'text-[#F4EFE8]'
              } ${navStates[0] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
            aria-label="Toggle menu"
          >
            <AnimatedMenuIcon
              isOpen={isFullMenuOpen}
              firstLineLength={27}
              secondLineLength={54}
              strokeWidth={0.5}
            />
          </button>

          {/* Center Logo */}
          {showLogo && (
            <div
              className={`absolute left-1/2 -translate-x-1/2 text-center transition-all duration-700 ${showLogoAnim ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                }`}
            >
              <div
                className={`mb-1 text-[#C69C4D]
                  }`}
              >
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
              <h1
                className={`text-base md:text-lg tracking-[0.2rem] -mt-2 font-basis text-[#C69C4D]
                  }`}
              >
                {logoText}
              </h1>
              <p
                className={`text-[9px] md:text-[11px] uppercase -mt-2 font-basis mt-0.5 text-[#C69C4D]
                  }`}
              >
                {logoSubtext}
              </p>
            </div>
          )}

          {/* Right Button - Desktop (Stay With Us) */}
          {rightButton && (
            <button
              onClick={handleButtonClick}
              className={`hidden lg:block absolute -right-12 px-6 py-2.5 font-basis border text-xs tracking-wider capitalize transition-all duration-700 rounded-tl-md rounded-br-md ${scrolled
                ? 'border-[#C69C4D] text-[#C69C4D] hover:text-[#F4EFE8] hover:bg-[#C69C4D]'
                : 'border-[#F4EFE8] text-[#F4EFE8] hover:text-[#F4EFE8] hover:bg-[#C69C4D] hover:border-[#C69C4D]'
                } ${showButton ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
            >
              {rightButton.label}
            </button>
          )}

          {/* Right Button - Mobile (Book) */}
          {rightButton && (
            <button
              onClick={handleButtonClick}
              className={`lg:hidden px-4 py-2 font-basis border text-xs tracking-wider uppercase transition-all duration-700 rounded-tl-md rounded-br-md ${scrolled
                ? 'border-[#C69C4D] text-[#C69C4D] hover:text-[#F4EFE8] hover:bg-[#C69C4D]'
                : 'border-[#F4EFE8] text-[#F4EFE8] hover:text-[#F4EFE8] hover:bg-[#C69C4D] hover:border-[#C69C4D]'
                } ${showButton ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
            >
              Book
            </button>
          )}
        </div>

        {/* Mobile Menu - Hidden (not used anymore) */}
        <div className="hidden">
          {/* Old mobile menu - not used anymore */}
        </div>
      </div>
    </nav>
  )
}
