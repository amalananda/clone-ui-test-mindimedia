import React, { useState } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  roomType?: string
}

export default function BookingModal({ isOpen, onClose, roomType = 'Floating Lake' }: BookingModalProps) {
  // State for calendar month and year
  const [currentMonth, setCurrentMonth] = useState(10) // November (0-indexed)
  const [currentYear, setCurrentYear] = useState(2025)

  if (!isOpen) return null

  // Get current date
  const today = new Date()
  const todayDay = today.getDate()
  const todayMonth = today.getMonth()
  const todayYear = today.getFullYear()

  // Month names
  const monthNames = [
    'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
    'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
  ]

  // Get number of days in current month
  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  // Get first day of month (0 = Sunday, 1 = Monday, etc.)
  const getFirstDayOfMonth = (month: number, year: number) => {
    const firstDay = new Date(year, month, 1).getDay()
    // Convert Sunday (0) to 6, and shift others back by 1 (Monday becomes 0)
    return firstDay === 0 ? 6 : firstDay - 1
  }

  const daysInMonth = getDaysInMonth(currentMonth, currentYear)
  const firstDayOfMonth = getFirstDayOfMonth(currentMonth, currentYear)

  // Function to check if a day is in the past
  const isPastDate = (day: number) => {
    if (currentYear < todayYear) return true
    if (currentYear > todayYear) return false
    if (currentMonth < todayMonth) return true
    if (currentMonth > todayMonth) return false
    return day < todayDay
  }

  // Navigate to previous month
  const previousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  // Navigate to next month
  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }
  return (
    <div
      className="fixed inset-0 z-50 bg-black/50"
      onClick={onClose}
    >
      <div
        className="relative bg-[#EFEBE2] w-full h-full flex items-center justify-center overflow-y-auto md:overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Reviews - Positioned top left */}
        <div className="hidden md:block absolute top-4 left-4 md:top-6 md:right-6 p-2 text-[13px] text-[#C69C4D]">
          <div className="flex items-center gap-2">
            <span>4.7 ★</span>
            <span className="text-[#C69C4D]">/ 742 Google Reviews</span>
          </div>
          <div className="flex items-center gap-2">
            <span>4.8 ★</span>
            <span className="text-[#C69C4D]">/ 295 Tripadvisor Reviews</span>
          </div>
        </div>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="fixed top-4 right-4 md:top-6 md:right-6 z-10 p-2"
          aria-label="Close booking modal"
        >
          <X size={36} className="text-[#B0A06C]" strokeWidth={1.5} />
        </button>
        {/* Background Text - Room Type (Full Screen Centered) */}
        <div className="hidden lg:flex absolute inset-0 items-center justify-center pointer-events-none z-0">
          <div className="text-[#C69C4D]/20 font-americana text-[7.5rem] font-medium select-none leading-none tracking-wide">
            {roomType}
          </div>
        </div>
        {/* Modal Content - Compact */}
        <div className="w-full max-w-md ">
          {/* Logo */}
          <div className="hidden md:flex justify-center ">
            <div className="text-[#B79F8C]">
              <svg
                width="120"
                height="120"
                viewBox="0 0 200 200"
                fill="currentColor"
                className="mx-auto"
              >
                {/* Lotus flower petals */}
                <path d="M100 60 C80 70, 65 85, 65 100 L75 105 C75 92, 85 78, 100 70 C115 78, 125 92, 125 105 L135 100 C135 85, 120 70, 100 60 Z" />
                <path d="M100 75 C88 82, 78 92, 78 105 L85 108 C85 97, 92 87, 100 82 C108 87, 115 97, 115 108 L122 105 C122 92, 112 82, 100 75 Z" />

                {/* Center circle */}
                <ellipse cx="100" cy="110" rx="22" ry="12" />

                {/* Bottom petals */}
                <path d="M78 110 L72 130 L82 133 L85 110 Z" />
                <path d="M122 110 L128 130 L118 133 L115 110 Z" />
                <path d="M88 112 L83 132 L93 135 L95 112 Z" />
                <path d="M112 112 L117 132 L107 135 L105 112 Z" />
                <path d="M100 114 L98 135 L102 135 L100 114 Z" />
              </svg>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-americana text-[#343E35] text-center mt-30 md:mt-0 mb-7 md:mb-3">
            BOOK A ROOM
          </h2>


          {/* Form */}
          <div className="space-y-3">
            {/* Row 1 - Guest Info */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 px-4 md:px-0 ">
              <div>
                <label className="block text-[10px] font-basis text-[#343E35] mb-1">
                  Number of adults
                </label>
                <select className="w-[119px] md:w-[125px] h-[33px] px-2 py-1.5 bg-white border border-[#C5A572]/30 rounded text-[#343E35] font-basis text-xs focus:outline-none focus:border-[#C5A572]">
                  <option>2</option>
                  <option>1</option>
                  <option>3</option>
                  <option>4</option>
                </select>
              </div>
              <div className="-ml-12 md:ml-0">
                <label className="block text-[10px] font-basis text-[#343E35] mb-1">
                  Number of children
                </label>
                <select className="w-[119px] md:w-[137px] h-[33px] px-2 py-1.5 bg-white border border-[#C5A572]/30 rounded text-[#343E35] font-basis text-xs focus:outline-none focus:border-[#C5A572]">
                  <option>0</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                </select>
              </div>
              <div className="col-span-2 md:col-span-1">
                <label className="block text-[10px] font-basis text-[#343E35] mb-1">
                  Promo code
                </label>
                <input
                  type="text"
                  className="w-[150px] md:w-[150px] h-[33px] px-2 py-1.5 bg-white border border-[#C5A572]/30 rounded text-[#343E35] font-basis text-xs focus:outline-none focus:border-[#C5A572]"
                  placeholder=""
                />
              </div>
            </div>

            {/* Row 2 - Dates (Hidden - Calendar shows instead) */}
            <div className="hidden md:grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-basis text-[#B0A06C] mb-1">
                  Arrival Date
                </label>
              </div>
              <div>
                <label className="block text-[10px] font-basis text-[#343E35] mb-1">
                  Departure Date
                </label>
              </div>
            </div>

            {/* Calendar Display - Compact */}
            <div className="bg-[#EFEBE2]/0 backdrop-blur-sm p-3">
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-2">
                  <button
                    onClick={previousMonth}
                    className="p-1 hover:bg-white/50 rounded"
                  >
                    <ChevronLeft className="text-[#C69C4D]" size={14} strokeWidth={1.5} />
                  </button>
                  <h3 className="text-base font-basis text-[#B0A06C] font-semibold tracking-wider">
                    {monthNames[currentMonth]} {currentYear}
                  </h3>
                  <button
                    onClick={nextMonth}
                    className="p-1 hover:bg-white/50 rounded"
                  >
                    <ChevronRight className="text-[#C69C4D]" size={14} strokeWidth={1.5} />
                  </button>
                </div>

                {/* Calendar Grid - Compact */}
                <div className="grid grid-cols-7 gap-1 text-center">
                  {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((day) => (
                    <div key={day} className="text-[9px] font-basis text-[#343E35] font-medium py-0.5">
                      {day}
                    </div>
                  ))}
                  {/* Empty cells for calendar start */}
                  {Array.from({ length: firstDayOfMonth }, (_, i) => (
                    <div key={`empty-${i}`} className="aspect-square"></div>
                  ))}
                  {/* Calendar days */}
                  {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
                    const isPast = isPastDate(day)
                    return (
                      <button
                        key={day}
                        disabled={isPast}
                        className={`aspect-square flex flex-col items-center justify-center text-[0.875rem] font-basis rounded relative ${isPast
                          ? 'bg-[#EEEEEE] text-[#CCCCCC] cursor-not-allowed'
                          : 'text-[#617262] hover:bg-[#C69C4D]/20'
                          }`}
                      >
                        <span className={day >= 1 ? 'mb-0.5' : ''}>{day}</span>
                        {/* Price indicators with icons - only show for future dates */}
                        {!isPast && day >= 1 && (
                          <>
                            <span className="text-[7px] text-green-600 leading-none">
                              IDR 8.0M
                            </span>
                            {/* Best Price indicator (green flag) */}
                            <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                            {/* Last room indicator (red flag) - on some dates */}
                            {day % 2 === 0 && (
                              <div className="absolute top-0 left-0 w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                            )}
                          </>
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
            {/* Legend & Book Button - Side by side on desktop */}
            <div className="flex flex-col md:flex-row md:justify-center md:items-center gap-4 mb-4">
              {/* Legend - Compact */}
              <div className="flex justify-center md:justify-start gap-4 text-[9px] font-basis">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span className="text-[#343E35]">Best Price</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  <span className="text-[#343E35]">Last room(s)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                  <span className="text-[#343E35]">Minimum stay</span>
                </div>
              </div>


              {/* Row 2 - Dates (Shown on mobile below legend) */}
              <div className="md:hidden flex flex-col gap-3">
                <div>
                  <label className="block text-[14px] font-basis text-[#B0A06C] mb-10">
                    Arrival Date
                  </label>
                </div>
                <div>
                  <label className="block text-[14px] font-basis text-[#343E35] mb-12">
                    Departure Date
                  </label>
                </div>
              </div>

              {/* Book Button */}
              <div className="flex justify-center md:justify-end pt-2 md:pt-0">
                <button className="w-[354px] md:w-[100px] h-[44px] px-0 py-2 bg-[#B0A06C] hover:bg-[#B0A06C]/70 text-[#000000] font-basis text-[14px] font-light tracking-wider transition-colors">
                  BOOK
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}
