// components/sections/WeeklySchedule.tsx
'use client'

import React from 'react'

interface Experience {
  id: string
  slug: string
  name: string
  category: string
  description: string
  longDescription: string
  image: string
  duration: string
  schedule?: string[]
  included: boolean
  bookingRequired: boolean
  pricing?: {
    perNight: number
    currency: string
  }
}

interface ScheduleSlot {
  time: string
  activityName: string
  color: string
}

const WeeklySchedule = () => {
  // ⭐ UBAH INI UNTUK MENGATUR LEBAR TIME COLUMN
  const timeColumnWidth = '80px'

  const experiencesData = {
    "experiences": [
      {
        "id": "yoga-sessions",
        "slug": "yoga-sessions",
        "name": "Daily Yoga Sessions",
        "category": "wellness",
        "schedule": ["7:00 AM", "5:00 PM"],
        "included": true,
        "bookingRequired": false
      },
      {
        "id": "meditation",
        "slug": "meditation",
        "name": "Guided Meditation",
        "category": "wellness",
        "schedule": ["6:30 AM", "6:00 PM"],
        "included": true,
        "bookingRequired": false
      }
    ]
  }

  const experiences = experiencesData.experiences as Experience[]
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

  // Extract scheduled activities from experiences.json
  const scheduledActivities = experiences
    .filter(exp => exp.schedule && exp.schedule.length > 0)
    .flatMap(exp =>
      exp.schedule!.map(time => ({
        experience: exp,
        time: time
      }))
    )
    .sort((a, b) => {
      // Sort by time
      const timeA = parseTime(a.time)
      const timeB = parseTime(b.time)
      return timeA - timeB
    })

  // Helper function to parse time string to minutes
  function parseTime(timeStr: string): number {
    const match = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/)
    if (!match) return 0

    let hours = parseInt(match[1])
    const minutes = parseInt(match[2])
    const period = match[3]

    if (period === 'PM' && hours !== 12) hours += 12
    if (period === 'AM' && hours === 12) hours = 0

    return hours * 60 + minutes
  }

  // Helper function to format time
  function formatTime(timeStr: string): string {
    const match = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/)
    if (!match) return timeStr

    const hours = match[1]
    const period = match[3]

    return `${hours} ${period}`
  }

  // Assign colors to activities
  const getActivityColor = (category: string): string => {
    const colorMap: { [key: string]: string } = {
      'wellness': 'bg-[#d7debf]',
      'adventure': 'bg-[#d4c8b8]',
      'dining': 'bg-[#b8c4c0]',
      'culture': 'bg-[#c8b8d4]'
    }
    return colorMap[category] || 'bg-[#b8c4c0]'
  }

  // Build schedule data
  const scheduleData: ScheduleSlot[] = scheduledActivities.map(item => ({
    time: formatTime(item.time),
    activityName: item.experience.name.replace('Daily ', '').replace('Guided ', ''),
    color: getActivityColor(item.experience.category)
  }))

  // Add empty slot after last activity for spacing
  const lastTimeSlot = scheduledActivities.length > 0
    ? formatTime(scheduledActivities[scheduledActivities.length - 1].time)
    : '1 PM'

  // Calculate next hour for empty slot
  const getNextHour = (timeStr: string): string => {
    const match = timeStr.match(/(\d+)\s*(AM|PM)/)
    if (!match) return '1 PM'

    const hours = parseInt(match[1])
    const period = match[2]

    if (period === 'AM' && hours === 11) {
      return '12 PM'
    } else if (period === 'PM' && hours === 11) {
      return '12 AM'
    } else if (hours === 12) {
      return `1 ${period}`
    } else {
      return `${hours + 1} ${period}`
    }
  }

  const emptySlotTime = getNextHour(lastTimeSlot)

  return (
    <section className="w-full min-h-screen px-4 md:px-8 lg:px-30 py-16">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-[1.701rem] lg:text-[2.50rem] font-americana text-[#c69c4d] mb-1">
            Weekly Schedule
          </h1>
          <p className="text-[0.9rem] lg:text-base text-[#343e35] font-basis">
            Advanced Booking Is Recommended
          </p>
        </div>

        {/* Mobile: Horizontal Scroll Wrapper */}
        <div className="overflow-x-auto -mx-4 px-4 md:overflow-x-visible md:mx-0 md:px-0 scrollbar-hide font-basis" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {/* Schedule Table */}
          <div className="bg-transparent min-w-[800px] md:min-w-0">
            {/* Days Header */}
            <div className="grid border-b border-[#c69c4d]" style={{ gridTemplateColumns: `${timeColumnWidth} repeat(7, 1fr)` }}>
              <div className="border-r border-[#c69c4d]"></div>
              {daysOfWeek.map((day) => (
                <div
                  key={day}
                  className="text-center py-4 md:py-6 border-r border-[#c69c4d] last:border-r-0"
                >
                  <span className="text-[#c69c4d] font-light text-[11.76px] md:text-[14px]">
                    {day}
                  </span>
                </div>
              ))}
            </div>

            {/* Schedule Rows */}
            {scheduleData.map((slot, index) => (
              <div key={index} className="grid border-b border-[#c69c4d]" style={{ gridTemplateColumns: `${timeColumnWidth} repeat(7, 1fr)` }}>
                {/* Time Column */}
                <div className="flex items-center justify-center py-4 md:py-6 pr-2 md:pr-4 border-r border-[#c69c4d]">
                  <span className="text-[#c69c4d] font-light text-[11.76px] md:text-[14px] whitespace-nowrap">
                    {slot.time}
                  </span>
                </div>

                {/* Activity Columns */}
                {daysOfWeek.map((day) => (
                  <div
                    key={day}
                    className="p-2 md:p-3 border-r border-[#c69c4d] last:border-r-0"
                  >
                    <div className={`${slot.color} rounded-md h-full min-h-[50px] md:min-h-[60px] flex items-center justify-center px-2 md:px-3 py-3 md:py-4`}>
                      <span className="text-[#343e35] text-[11.76px] md:text-[13px] text-center font-light">
                        {slot.activityName}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ))}

            {/* Empty Row for spacing */}
            <div className="grid" style={{ gridTemplateColumns: `${timeColumnWidth} repeat(7, 1fr)` }}>
              <div className="flex items-center justify-center py-4 md:py-6 pr-2 md:pr-4 border-r border-[#c69c4d]">
                <span className="text-[#c69c4d] font-light text-[11.76px] md:text-[13px]">
                  {emptySlotTime}
                </span>
              </div>
              {daysOfWeek.map((day) => (
                <div
                  key={day}
                  className="py-4 md:py-6 border-r border-[#c69c4d] last:border-r-0"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Download Button */}
        <div className="mt-8 text-center md:text-left ml-0 md:ml-19">
          <button className="text-[#c69c4d] text-[13.57px] md:text-[15px] font-light font-basis uppercase tracking-wider border-b border-[#c69c4d] pb-1 hover:text-[#9a7348] hover:border-[#9a7348] transition-colors">
            Download PDF
          </button>
        </div>
      </div>
    </section>
  )
}

export default WeeklySchedule
