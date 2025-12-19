// components/sections/MenuOverlay.tsx
'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { HeroButton } from '@/lib/hero-types'
import { AnimatedMenuIcon } from '@/components/ui/AnimatedMenuIcon'
import { fullMenuLeftRows, fullMenuRightRows, fullMenuBottomItems } from '@/lib/hero-constants'

interface FullMenuOverlayProps {
  isFullMenuOpen: boolean
  setIsFullMenuOpen: (open: boolean) => void
  heroImage: string
  logoText: string
  logoSubtext: string
  showLogo: boolean
  rightButton: HeroButton
  scrollToSection: (href: string) => void
  handleButtonClick: () => void
}

export const FullMenuOverlay = ({
  isFullMenuOpen,
  setIsFullMenuOpen,
  heroImage,
  logoText,
  logoSubtext,
  showLogo,
  rightButton,
  scrollToSection,
  handleButtonClick
}: FullMenuOverlayProps) => {
  const [hoveredImage, setHoveredImage] = useState<string | null>(null)

  // Gambar yang ditampilkan: hoveredImage jika ada, heroImage jika tidak
  const displayImage = hoveredImage || heroImage

  return (
    <div
      className={`fixed inset-0 bg-[#EFEBE2] z-[100] transition-all duration-500 ${isFullMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
    >
      <div className="h-full flex flex-col">
        {/* Header with close button */}
        <div className="border-b border-[#C69C4D]/30">
          <div className="max-w-7xl mx-auto py-6 md:py-5">
            <div className="relative flex justify-between items-center px-4 md:px-8">
              <button
                onClick={() => setIsFullMenuOpen(false)}
                className="text-[#C69C4D] p-2 hover:bg-[#C69C4D]/10 rounded-lg transition-all duration-300 -ml-20"
                aria-label="Close menu"
              >
                <AnimatedMenuIcon
                  isOpen={true}
                  firstLineLength={27}
                  secondLineLength={54}
                  strokeWidth={0.5}
                />
              </button>

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

              {/* Right Button */}
              {rightButton && (
                <button
                  onClick={() => {
                    setIsFullMenuOpen(false)
                    handleButtonClick()
                  }}
                  className="absolute right-0 px-6 py-2.5 border border-[#C69C4D] text-[#C69C4D] hover:text-[#F4EFE8] hover:bg-[#C69C4D] text-xs tracking-wider capitalize transition-all duration-300 rounded-tl-md rounded-br-md"
                >
                  {rightButton.label}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Menu Content */}
        <div className="flex-1 flex items-start justify-center px-4 sm:px-6 lg:px-8 pt-20 md:pt-24">
          <div className="w-full max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 lg:gap-24">
              {/* Left Column */}
              <div className="space-y-4 md:space-y-6" style={{ alignItems: 'center', paddingTop: '10vh' }}>
                {fullMenuLeftRows.map((row, rowIndex) => (
                  <div
                    key={rowIndex}
                    className="flex flex-wrap gap-x-4"
                    style={{
                      animation: isFullMenuOpen
                        ? `fadeInUp 0.5s ease-out ${rowIndex * 0.1}s both`
                        : 'none'
                    }}
                  >
                    {row.map((item) => (
                      <React.Fragment key={item.href}>
                        <a
                          href={item.href}
                          onClick={(e) => {
                            e.preventDefault()
                            setIsFullMenuOpen(false)
                            scrollToSection(item.href)
                          }}
                          onMouseEnter={() => item.image && setHoveredImage(item.image)}
                          onMouseLeave={() => setHoveredImage(null)}
                          className="text-[#C69C4D] hover:text-[#b8975a] transition-colors duration-300 text-2xl md:text-3xl lg:text-4xl font-americana cursor-pointer"
                        >
                          {item.label}
                        </a>
                      </React.Fragment>
                    ))}
                  </div>
                ))}
              </div>

              {/* Center Image */}
              <div
                className="hidden md:flex items-center justify-center"
                style={{
                  animation: isFullMenuOpen ? 'fadeInUp 0.5s ease-out 0.3s both' : 'none'
                }}
              >
                <div className="relative w-full aspect-[3/4] rounded-t-full overflow-hidden">
                  <Image
                    key={displayImage}
                    src={displayImage}
                    alt="Menu Preview"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-opacity duration-500"
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4 md:space-y-6 md:text-right" style={{ alignItems: 'center', paddingTop: '10vh' }}>
                {fullMenuRightRows.map((row, rowIndex) => (
                  <div
                    key={rowIndex}
                    className="flex flex-wrap gap-x-4 md:justify-end"
                    style={{
                      animation: isFullMenuOpen
                        ? `fadeInUp 0.5s ease-out ${(rowIndex + 1) * 0.1}s both`
                        : 'none'
                    }}
                  >
                    {row.map((item) => (
                      <React.Fragment key={item.href}>
                        <a
                          href={item.href}
                          onClick={(e) => {
                            e.preventDefault()
                            setIsFullMenuOpen(false)
                            scrollToSection(item.href)
                          }}
                          onMouseEnter={() => item.image && setHoveredImage(item.image)}
                          onMouseLeave={() => setHoveredImage(null)}
                          className="text-[#C69C4D] hover:text-[#b8975a] transition-colors duration-300 text-2xl md:text-3xl lg:text-4xl font-americana cursor-pointer"
                        >
                          {item.label}
                        </a>
                      </React.Fragment>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Links */}
            <div
              className="mt-12 md:mt-16 pt-8 border-t border-[#C69C4D]/30"
              style={{
                animation: isFullMenuOpen ? 'fadeInUp 0.5s ease-out 0.8s both' : 'none'
              }}
            >
              <div className="flex flex-wrap gap-4 md:gap-6 text-[#C69C4D] text-sm md:text-base">
                {fullMenuBottomItems.map((item, index) => (
                  <React.Fragment key={item.href}>
                    <a
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault()
                        setIsFullMenuOpen(false)
                        scrollToSection(item.href)
                      }}
                      className="hover:text-[#b8975a] transition-colors duration-300 font-basis"
                    >
                      {item.label}
                    </a>
                    {index < fullMenuBottomItems.length - 1 && (
                      <span className="text-[#C69C4D]/30">/</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
