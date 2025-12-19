// lib/hero-constants.ts
import { NavItem, HeroButton } from './hero-types'

export const defaultLeftNavItems: NavItem[] = [
  { label: 'Villas', href: '/rooms' },
  { label: 'Spa', href: '/spa' },
  { label: 'Dine', href: '#dine' },
  { label: 'Retreats', href: '/retreats' }
]

export const defaultButton: HeroButton = {
  label: 'Stay With Us',
  href: '#booking'
}

// Full menu - Horizontal rows untuk kolom kiri
export const fullMenuLeftRows: NavItem[][] = [
  [
    { label: 'Home', href: '/home' },
    { label: '/ Villas', href: '/rooms' }
  ],
  [
    { label: '/ Packages', href: '#packages' },
    { label: '/ Spa', href: '/spa', image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&h=1200&fit=crop&q=80' }
  ],
  [
    { label: 'Retreats', href: '/retreats', image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&h=1200&fit=crop&q=80' },
    { label: '/ Dine', href: '#dine' }
  ],
  [
    { label: '/ Experiences', href: '#experiences' }
  ]
]

// Full menu - Horizontal rows untuk kolom kanan
export const fullMenuRightRows: NavItem[][] = [
  [
    { label: 'Facilities', href: '#facilities' },
    { label: '/ Blog', href: '#blog' }
  ],
  [
    { label: '/ Reviews', href: '#reviews' },
    { label: '/ About', href: '#about' }
  ],
  [
    { label: 'Contact', href: '#contact' },
    { label: '/ The Map', href: '#map' }
  ]
]

export const fullMenuBottomItems: NavItem[] = [
  { label: 'Whatsapp', href: '#whatsapp' },
  { label: 'Directions', href: '#directions' },
  { label: 'TripAdvisor', href: '#tripadvisor' },
  { label: 'Instagram', href: '#instagram' },
  { label: 'Facebook', href: '#facebook' }
]

export const ANIMATION_TIMINGS = {
  showBg: 2000,
  showNav1: 2200,
  showNav2: 2400,
  showNav3: 2600,
  showNav4: 2800,
  showLogo: 3000,
  showButton: 3200
}
