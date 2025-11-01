// components/sections/Footer.tsx
'use client'
import React, { useState } from 'react'

const Footer = () => {
  const [formData, setFormData] = useState({ name: '', email: '' })

  const exploreLinks = {
    column1: [
      { label: 'Home', href: '#home' },
      { label: 'Dining', href: '#dining' },
      { label: 'Retreats', href: '#retreats' },
      { label: 'Facilities', href: '#facilities' },
      { label: 'About', href: '#about' },
      { label: 'Contact', href: '#contact' }
    ],
    column2: [
      { label: 'Villas', href: '#villas' },
      { label: 'Spa', href: '#spa' },
      { label: 'Experiences', href: '#experiences' },
      { label: 'Ulaman Map', href: '#map' },
      { label: 'Articles', href: '#articles' },
      { label: 'Video Testimonials', href: '#testimonials' }
    ]
  }

  const connectLinks = {
    column1: [
      { label: 'Whatsapp', href: '#whatsapp' },
      { label: 'TripAdvisor', href: '#tripadvisor' },
      { label: 'Facebook', href: '#facebook' }
    ],
    column2: [
      { label: 'Directions', href: '#directions' },
      { label: 'Instagram', href: '#instagram' }
    ]
  }

  const awards = [
    { name: 'Interior Design Confederation Singapore', logo: 'IDCS' },
    { name: 'Unique Experiences', logo: 'UE' },
    { name: 'World Luxury Hotel Awards', logo: 'WLHA' },
    { name: 'Destination Deluxe', logo: 'DD' },
    { name: 'UNESCO', logo: 'UNESCO' },
    { name: 'Kohler Bold Design Awards', logo: 'KOHLER' },
    { name: 'Loop Design Awards', logo: 'LOOP' },
    { name: 'Interior Design Confederation Singapore', logo: 'IDCS2' }
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <footer className="bg-[#7A8B7F] text-white font-americana">
      <div className="max-w-7xl mx-auto pt-2 pb-8">

        {/* Coloumn Link & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mb-12">
          {/* Get Notified */}
          <div>
            <h3 className="text-2xl font-serif mb-8">Get Notified On Our Offers</h3>
            <div className="space-y-6">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name*"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-transparent border-b border-white/40 pb-2 text-white placeholder-white/70 focus:outline-none focus:border-white transition-colors"
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email*"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-transparent border-b border-white/40 pb-2 text-white placeholder-white/70 focus:outline-none focus:border-white transition-colors"
                />
              </div>
              <button
                onClick={handleSubmit}
                className="text-white border-b border-white/40 pb-1 hover:border-white transition-colors text-sm tracking-wider"
              >
                SUBMIT
              </button>
            </div>
          </div>

          {/* Explore Links */}
          <div>
            <h3 className="text-2xl font-serif mb-8">Explore</h3>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <ul className="space-y-3">
                  {exploreLinks.column1.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className="text-white/90 hover:text-white transition-colors text-sm"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <ul className="space-y-3">
                  {exploreLinks.column2.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className="text-white/90 hover:text-white transition-colors text-sm"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Connect Links */}
          <div>
            <h3 className="text-2xl font-serif mb-8">Connect</h3>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <ul className="space-y-3">
                  {connectLinks.column1.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className="text-white/90 hover:text-white transition-colors text-sm"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <ul className="space-y-3">
                  {connectLinks.column2.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className="text-white/90 hover:text-white transition-colors text-sm"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Awards Section */}
        <div className="mb-12 overflow-hidden">
          <div className="flex animate-scroll-infinite whitespace-nowrap">
            {/* Duplicate awards 3x untuk seamless infinite loop */}
            {[...Array(3)].map((_, groupIndex) => (
              <React.Fragment key={groupIndex}>
                {awards.map((award, index) => (
                  <div
                    key={`${groupIndex}-${index}`}
                    className="flex-shrink-0 bg-white/10 backdrop-blur-sm px-6 py-4 rounded flex items-center justify-center mx-3"
                    style={{ minWidth: '140px', height: '80px' }}
                  >
                    <span className="text-white/60 text-xs text-center">{award.logo}</span>
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Copyright & Links */}
        <div className=" font-americana pt-6 w-full">
          <div className="flex flex-col md:flex-row justify-center items-center gap-[rem] text-md text-white/70">
            <div className="flex flex-wrap gap-x-[2rem] gap-y-4 justify-start ">
              <a href="#terms" className="hover:text-white transition-colors">Terms</a>
              <a href="#privacy" className="hover:text-white transition-colors">Privacy</a>
              <a href="#bookings" className="hover:text-white transition-colors">Ulaman Bookings</a>
              <span>Kids under 6 are not advised.</span>
              <span>© 2024-2025 Two Moons Studio for ulamanbali.com. All Rights Reserved</span>
              <span>Made With ❤︎ By Two Suns Studio </span>
            </div>
          </div>
        </div>

      </div>

      {/* 2. RUNNING TEXT (FULL WIDTH) */}
      <div className="mt-8 overflow-hidden bg-[#EFEBE2] py-3 w-full">
        <div className="flex animate-scroll-infinite whitespace-nowrap">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex">
              <span className="text-[#7A8B7F] text-sm mx-8">● The Avatar Experience | 3 days 2 nights</span>
              <span className="text-[#7A8B7F] text-sm mx-8">● The Ultimate Honeymoon | 3 days 2 nights</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scroll-infinite {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        .animate-scroll-infinite {
          animation: scroll-infinite 30s linear infinite;
        }
      `}</style>
    </footer>
  )
}

export default Footer
