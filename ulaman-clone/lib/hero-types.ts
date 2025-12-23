// lib/hero-types.ts
export interface NavItem {
  label: string
  href: string
  image?: string  // ← Tambah properti image untuk hover effect
}

export interface HeroButton {
  label: string
  href?: string
  onClick?: () => void
}

export interface HeroProps {
  heroImage?: string
  leftNavItems?: NavItem[]
  rightButton?: HeroButton
  logoText?: string
  logoSubtext?: string
  showLogo?: boolean
}

export interface AnimatedMenuIconProps {
  isOpen: boolean
  firstLineLength?: number
  secondLineLength?: number
  strokeWidth?: number
}
