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

// Desktop - Full menu - Horizontal rows untuk kolom kiri
export const fullMenuLeftRows: NavItem[][] = [
  [
    { label: 'Home', href: '/home' },
    { label: '/ Villas', href: '/rooms', image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&h=1200&fit=crop&q=80' }
  ],
  [
    { label: '/ Packages', href: '#packages' },
    { label: '/ Spa', href: '/spa', image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&h=1200&fit=crop&q=80' }
  ],
  [
    { label: 'Retreats', href: '/retreats', image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=1200&fit=crop&q=80' },
    { label: '/ Dine', href: '#dine' }
  ],
  [
    { label: '/ Experiences', href: '#experiences' }
  ]
]

// Desktop - Full menu - Horizontal rows untuk kolom kanan
export const fullMenuRightRows: NavItem[][] = [
  [
    { label: 'Facilities', href: '#facilities', image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=1200&fit=crop&q=80' },
    { label: '/ Blog', href: '#blog', image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&h=1200&fit=crop&q=80' }
  ],
  [
    { label: '/ Reviews', href: '#reviews', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=1200&fit=crop&q=80' },
    { label: '/ About', href: '#about', image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&h=1200&fit=crop&q=80' }
  ],
  [
    { label: 'Contact', href: '#contact', image: 'https://images.unsplash.com/photo-1551244072-5d12893278ab?w=800&h=1200&fit=crop&q=80' },
    { label: '/ The Map', href: '#map', image: 'https://images.unsplash.com/photo-1544843776-7c98a52e08a4?w=800&h=1200&fit=crop&q=80' }
  ]
]

// Mobile - Left Column Menu (3 per row, without leading "/")
export const fullMenuLeftMobile: NavItem[][] = [
  [
    { label: 'Home', href: '/home' },
    { label: '/ Villas', href: '/rooms', image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&h=1200&fit=crop&q=80' },
    { label: '/ Packages', href: '#packages' }
  ],
  [
    { label: '/ Spa', href: '/spa', image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&h=1200&fit=crop&q=80' },
    { label: '/ Retreats', href: '/retreats', image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=1200&fit=crop&q=80' },
    { label: '/ Dine', href: '#dine' }
  ],
  [
    { label: '/ Experiences', href: '#experiences' },
    { label: '/ Facilities', href: '#facilities', image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=1200&fit=crop&q=80' },
  ]
]

// Mobile - Right Column Menu (2 per row, without leading "/")
export const fullMenuRightMobile: NavItem[][] = [
  [
    { label: '/ Blog', href: '#blog', image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&h=1200&fit=crop&q=80' },
    { label: '/ Reviews', href: '#reviews', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=1200&fit=crop&q=80' },
    { label: '/ About', href: '#about', image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&h=1200&fit=crop&q=80' },
  ],
  [
    { label: '/ Contact', href: '#contact', image: 'https://images.unsplash.com/photo-1551244072-5d12893278ab?w=800&h=1200&fit=crop&q=80' },
    { label: '/ The Map', href: '#map', image: 'https://images.unsplash.com/photo-1544843776-7c98a52e08a4?w=800&h=1200&fit=crop&q=80' }
  ],
  [
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
