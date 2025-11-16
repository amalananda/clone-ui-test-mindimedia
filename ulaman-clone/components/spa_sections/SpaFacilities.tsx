import React from 'react'

const SpaFacilities = () => {
  const facilities = [
    {
      name: 'Singles Massage Room',
      icon: (
        <svg viewBox="0 0 80 60" className="w-20 h-16" fill="none" stroke="rgb(183, 159, 140)" strokeWidth="1.5">
          <rect x="15" y="20" width="50" height="30" rx="2" />
          <rect x="20" y="25" width="40" height="5" />
          <rect x="25" y="15" width="30" height="3" />
        </svg>
      )
    },
    {
      name: 'Couples Massage Room',
      icon: (
        <svg viewBox="0 0 80 60" className="w-20 h-16" fill="none" stroke="rgb(183, 159, 140)" strokeWidth="1.5">
          <rect x="15" y="20" width="50" height="30" rx="2" />
          <rect x="20" y="25" width="18" height="5" />
          <rect x="42" y="25" width="18" height="5" />
          <rect x="25" y="15" width="30" height="3" />
        </svg>
      )
    },
    {
      name: 'Mani - Pedi Lounge',
      icon: (
        <svg viewBox="0 0 80 60" className="w-20 h-16" fill="none" stroke="rgb(183, 159, 140)" strokeWidth="1.5">
          <rect x="20" y="15" width="35" height="30" rx="3" />
          <path d="M 22 20 L 53 20 M 22 25 L 53 25 M 22 30 L 53 30" />
          <circle cx="30" cy="38" r="3" />
          <circle cx="45" cy="38" r="3" />
        </svg>
      )
    },
    {
      name: 'Hot Plunge Pool',
      icon: (
        <svg viewBox="0 0 80 60" className="w-20 h-16" fill="none" stroke="rgb(183, 159, 140)" strokeWidth="1.5">
          <ellipse cx="40" cy="32" rx="25" ry="15" />
          <path d="M 30 22 Q 30 18 32 18 Q 32 22 34 22 Q 34 18 36 18 Q 36 22 38 22" />
          <path d="M 42 22 Q 42 18 44 18 Q 44 22 46 22 Q 46 18 48 18 Q 48 22 50 22" />
        </svg>
      )
    },
    {
      name: 'Cold Plunge Pool',
      icon: (
        <svg viewBox="0 0 80 60" className="w-20 h-16" fill="none" stroke="rgb(183, 159, 140)" strokeWidth="1.5">
          <ellipse cx="40" cy="32" rx="25" ry="15" />
          <path d="M 32 20 L 32 26 M 40 18 L 40 24 M 48 20 L 48 26" />
        </svg>
      )
    },
    {
      name: 'Locker Room',
      icon: (
        <svg viewBox="0 0 80 60" className="w-20 h-16" fill="none" stroke="rgb(183, 159, 140)" strokeWidth="1.5">
          <rect x="25" y="15" width="30" height="35" rx="1" />
          <line x1="40" y1="15" x2="40" y2="50" />
          <line x1="25" y1="26.6" x2="55" y2="26.6" />
          <line x1="25" y1="38.3" x2="55" y2="38.3" />
          <circle cx="32" cy="21" r="1" />
          <circle cx="48" cy="21" r="1" />
          <circle cx="32" cy="32.5" r="1" />
          <circle cx="48" cy="32.5" r="1" />
          <circle cx="32" cy="44" r="1" />
          <circle cx="48" cy="44" r="1" />
        </svg>
      )
    },
    {
      name: 'Infrared Sauna',
      icon: (
        <svg viewBox="0 0 80 60" className="w-20 h-16" fill="none" stroke="rgb(183, 159, 140)" strokeWidth="1.5">
          <rect x="20" y="25" width="40" height="20" rx="1" />
          <path d="M 26 30 L 54 30 M 26 33 L 54 33 M 26 36 L 54 36 M 26 39 L 54 39" />
          <path d="M 30 18 Q 30 15 32 15 Q 32 18 34 18 M 38 18 Q 38 15 40 15 Q 40 18 42 18 M 46 18 Q 46 15 48 15 Q 48 18 50 18" strokeLinecap="round" />
        </svg>
      )
    },
    {
      name: 'Steam Room',
      icon: (
        <svg viewBox="0 0 80 60" className="w-20 h-16" fill="none" stroke="rgb(183, 159, 140)" strokeWidth="1.5">
          <circle cx="40" cy="28" r="8" />
          <path d="M 32 26 Q 30 22 32 20 M 40 24 Q 38 20 40 18 M 48 26 Q 50 22 48 20" strokeLinecap="round" />
          <path d="M 28 36 Q 26 40 28 42 M 36 38 Q 34 42 36 44 M 44 38 Q 42 42 44 44 M 52 36 Q 54 40 52 42" strokeLinecap="round" />
        </svg>
      )
    },
    {
      name: 'Private Shower',
      icon: (
        <svg viewBox="0 0 80 60" className="w-20 h-16" fill="none" stroke="rgb(183, 159, 140)" strokeWidth="1.5">
          <path d="M 35 15 L 35 22 M 45 15 L 45 22" />
          <rect x="30" y="22" width="20" height="3" rx="1.5" />
          <path d="M 32 28 L 32 45 M 36 28 L 36 45 M 40 28 L 40 45 M 44 28 L 44 45 M 48 28 L 48 45" strokeLinecap="round" />
        </svg>
      )
    }
  ]

  return (
    <section className="py-16 px-6 md:px-12 lg:px-24 bg-[#EFEBE2] ">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left Content */}
          <div className="space-y-6">
            <h4 className="text-[1.75rem] md:text-3xl text-[#b79f8c] font-americana font-medium heading display-4 ml-5 justify-center">
              Discover our unique<br />spa facilities
            </h4>

            <p className="text-sm md:text-base text-[#343e35] font-basis leading-relaxed max-w-md">
              Experience individual and couples massage<br /> rooms, mani-pedi chairs, leaf-shaped hammocks,<br /> hot and cold plunge pools, infrared sauna, steam<br /> room, glowing backlit bathtubs and secure<br /> lockers.
            </p>
            <p className="hidden lg:block text-xs md:text-sm text-[rgb(183,159,140)]/60 italic pt-40">
              *Facilities are free for<br />in-house guests
            </p>
          </div>

          {/* Right Grid */}
          <div className="border border-[rgb(183,159,140)]/30">
            <div className="grid grid-cols-2 lg:grid-cols-3 divide-x divide-y divide-[rgb(183,159,140)]/30">
              {facilities.map((facility, index) => (
                <div
                  key={index}
                  className="relative w-full"
                  style={{ paddingBottom: '76.92%' }}
                >
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-3 md:p-4 hover:bg-[rgb(183,159,140)]/5 transition-colors duration-300">
                    <div className="mb-3 md:mb-4 flex-shrink-0">
                      {facility.icon}
                    </div>
                    <p className="text-xs md:text-sm text-[rgb(183,159,140)] text-center leading-tight line-clamp-2">
                      {facility.name}
                    </p>
                  </div>
                </div>
              ))}
              {/* Empty box for mobile grid */}
              <div className="lg:hidden relative w-full" style={{ paddingBottom: '76.92%' }}></div>
            </div>
          </div>
        </div>

        {/* Mobile only - below grid */}
        <p className="lg:hidden text-xs text-[rgb(183,159,140)]/60 italic mt-8">
          *Facilities are free for<br />in-house guests
        </p>
      </div>
    </section>
  )
}

export default SpaFacilities
