// lib/use-hero.ts
import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { ANIMATION_TIMINGS } from './hero-constants'

export const useHero = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isFullMenuOpen, setIsFullMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [showNav1, setShowNav1] = useState(false)
  const [showNav2, setShowNav2] = useState(false)
  const [showNav3, setShowNav3] = useState(false)
  const [showNav4, setShowNav4] = useState(false)
  const [showLogoAnim, setShowLogoAnim] = useState(false)
  const [showButton, setShowButton] = useState(false)
  const [showBg, setShowBg] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const timer1 = setTimeout(() => setShowBg(true), ANIMATION_TIMINGS.showBg)
    const timer2 = setTimeout(() => setShowNav1(true), ANIMATION_TIMINGS.showNav1)
    const timer3 = setTimeout(() => setShowNav2(true), ANIMATION_TIMINGS.showNav2)
    const timer4 = setTimeout(() => setShowNav3(true), ANIMATION_TIMINGS.showNav3)
    const timer5 = setTimeout(() => setShowNav4(true), ANIMATION_TIMINGS.showNav4)
    const timer6 = setTimeout(() => setShowLogoAnim(true), ANIMATION_TIMINGS.showLogo)
    const timer7 = setTimeout(() => setShowButton(true), ANIMATION_TIMINGS.showButton)

    const handleScroll = () => setScrolled(window.scrollY > 100)
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
      clearTimeout(timer5)
      clearTimeout(timer6)
      clearTimeout(timer7)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToSection = (href: string) => {
    if (href.startsWith('/') && !href.startsWith('/#')) {
      router.push(href)
      setIsMenuOpen(false)
      setIsFullMenuOpen(false)
      return
    }
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
    setIsFullMenuOpen(false)
  }

  const navStates = [showNav1, showNav2, showNav3, showNav4]

  return {
    isMenuOpen,
    setIsMenuOpen,
    isFullMenuOpen,
    setIsFullMenuOpen,
    scrolled,
    navStates,
    showLogoAnim,
    showButton,
    showBg,
    scrollToSection,
    pathname
  }
}
