'use client'
import React, { useState } from 'react'
import { Car, Plane, Minus, Plus } from 'lucide-react'

const LocationMap = () => {
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [adults, setAdults] = useState(2)

  const locations = [
    { name: 'Ubud', distance: '45 min', top: '20%', right: '15%' },
    { name: 'Tanah Lot Temple', distance: '10 min', top: '48%', left: '35%' },
    { name: 'Canggu', distance: '20 min', top: '58%', right: '25%' },
    { name: 'Kuta', distance: '40 min', top: '68%', right: '20%' },
    { name: 'Uluwatu Temple', distance: '2 hours', bottom: '20%', left: '15%' },
    { name: 'Ngurah Rai International Airport', distance: '1h15 min', bottom: '18%', right: '12%', isAirport: true }
  ]

  return (
    <section className="relative bg-[#7A8B7F] min-h-screen pt-16">
      {/* Booking Bar */}
      <div className="max-w-7xl mx-auto px-8 mb-8">
        <div className="flex items-center justify-center gap-8 text-white">
          <div className="flex items-center gap-4">
            <label className="text-sm">Check In</label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="bg-transparent border-b border-white/40 px-2 py-1 text-sm focus:outline-none focus:border-white"
            />
          </div>

          <div className="h-8 w-px bg-white/40"></div>

          <div className="flex items-center gap-4">
            <label className="text-sm">Check Out</label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="bg-transparent border-b border-white/40 px-2 py-1 text-sm focus:outline-none focus:border-white"
            />
          </div>

          <div className="h-8 w-px bg-white/40"></div>

          <div className="flex items-center gap-4">
            <label className="text-sm">Adult</label>
            <button
              onClick={() => setAdults(Math.max(1, adults - 1))}
              className="w-8 h-8 rounded-full border border-white/40 flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <Minus size={16} />
            </button>
            <span className="text-sm w-8 text-center">{adults}</span>
            <button
              onClick={() => setAdults(adults + 1)}
              className="w-8 h-8 rounded-full border border-white/40 flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <Plus size={16} />
            </button>
          </div>

          <div className="h-8 w-px bg-white/40"></div>

          <button className="px-8 py-2 border border-white/40 hover:bg-white/10 transition-colors rounded text-sm">
            Search
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white">
            <h2 className="text-4xl md:text-5xl font-serif mb-6 leading-tight">
              Tucked Within Majestic<br />Balinese Nature.
            </h2>
            <p className="text-white/80 text-lg leading-relaxed">
              Strategically located near popular areas like Canggu and Ubud, experience tranquil nature and luxury. With endless activities, you&apos;ll never want to leave Ulaman.
            </p>
          </div>

          {/* Map Section */}
          <div className="relative">
            <div className="relative w-full aspect-[4/3] bg-[#5A6B5F] rounded-lg overflow-hidden">
              {/* Map Background with Roads */}
              <svg
                viewBox="0 0 800 600"
                className="w-full h-full"
                preserveAspectRatio="xMidYMid slice"
              >
                {/* Coastline */}
                <path
                  d="M 0,100 Q 200,120 400,100 T 800,80 L 800,0 L 0,0 Z"
                  fill="#4A5B4F"
                  opacity="0.5"
                />

                {/* Road Network */}
                <g stroke="white" strokeWidth="1" fill="none" opacity="0.3">
                  {/* Main roads */}
                  <path d="M 100,50 Q 300,80 500,100 T 750,120" />
                  <path d="M 200,150 L 600,250" />
                  <path d="M 150,300 Q 400,350 650,320" />
                  <path d="M 100,450 L 700,480" />

                  {/* Vertical roads */}
                  <path d="M 200,50 L 180,500" />
                  <path d="M 400,80 L 420,550" />
                  <path d="M 600,100 L 580,520" />

                  {/* Small streets grid */}
                  {[...Array(15)].map((_, i) => (
                    <React.Fragment key={i}>
                      <path d={`M ${50 + i * 50},${100 + i * 20} L ${150 + i * 50},${120 + i * 20}`} strokeWidth="0.5" />
                      <path d={`M ${100 + i * 40},${150 + i * 25} L ${100 + i * 40},${250 + i * 25}`} strokeWidth="0.5" />
                    </React.Fragment>
                  ))}
                </g>

                {/* Ocean area */}
                <rect x="0" y="0" width="200" height="300" fill="#3A4B3F" opacity="0.3" />
                <rect x="600" y="450" width="200" height="150" fill="#3A4B3F" opacity="0.3" />
              </svg>

              {/* Ulaman Logo/Marker */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="text-amber-500 text-4xl font-serif tracking-wider">
                  <svg width="60" height="60" viewBox="0 0 60 60" className="fill-current">
                    <path d="M 30,15 Q 20,25 20,35 Q 20,45 30,45 Q 40,45 40,35 Q 40,25 30,15 Z M 30,20 Q 35,27 35,35 Q 35,40 30,40 Q 25,40 25,35 Q 25,27 30,20 Z" />
                    <circle cx="30" cy="35" r="3" />
                  </svg>
                </div>
              </div>

              {/* Location Markers */}
              {locations.map((location, index) => (
                <div
                  key={index}
                  className="absolute"
                  style={{
                    top: location.top,
                    bottom: location.bottom,
                    left: location.left,
                    right: location.right
                  }}
                >
                  <div className="relative group">
                    <div className="bg-[#2A3B2F]/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg flex items-center gap-2 whitespace-nowrap">
                      {location.isAirport ? (
                        <Plane size={14} className="text-white" />
                      ) : (
                        <Car size={14} className="text-white" />
                      )}
                      <span className="text-white text-xs">{location.distance}</span>
                    </div>
                    <div className="absolute -bottom-6 left-0 text-white text-xs opacity-90">
                      {location.name}
                    </div>
                    <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                  </div>
                </div>
              ))}

              {/* Airport location with plane icon */}
              <div className="absolute bottom-[18%] right-[12%]">
                <div className="bg-[#2A3B2F]/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg flex items-center gap-2">
                  <Plane size={14} className="text-white" />
                  <span className="text-white text-xs">15 min</span>
                </div>
              </div>

              {/* Uluwatu dropdown indicator */}
              <div className="absolute bottom-[20%] left-[15%]">
                <div className="bg-[#2A3B2F]/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg flex items-center gap-2 cursor-pointer hover:bg-[#3A4B3F]/90 transition-colors">
                  <Car size={14} className="text-white" />
                  <span className="text-white text-xs">2 hours</span>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="white" className="ml-1">
                    <path d="M 3,5 L 6,8 L 9,5" stroke="white" strokeWidth="1.5" fill="none" />
                  </svg>
                </div>
                <div className="absolute -bottom-6 left-0 text-white text-xs opacity-90">
                  Uluwatu Temple
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LocationMap
