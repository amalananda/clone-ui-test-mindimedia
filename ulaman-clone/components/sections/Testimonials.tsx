// components/sections/Testimonials.tsx
'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image' // ✅ Import Image untuk optimasi
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react'

// 1. Define Testimonial interface
interface Testimonial {
  id: number
  name: string
  location: string
  rating: number
  comment: string
  date: string
  avatar: string
}

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  // 2. Navigation function
  const navigate = (direction: 'prev' | 'next') => {
    setCurrentIndex((prev) => {
      if (direction === 'next') {
        return (prev + 1) % testimonials.length
      } else {
        return (prev - 1 + testimonials.length) % testimonials.length
      }
    })
  }

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Sarah Johnson',
      location: 'United States',
      rating: 5,
      comment: 'Absolutely magical experience! The bamboo villas are stunning and the commitment to sustainability is genuine.',
      date: 'September 2024',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop'
    },
    {
      id: 2,
      name: 'Michael Chen',
      location: 'Singapore',
      rating: 5,
      comment: 'The perfect retreat for those seeking peace and tranquility. The staff went above and beyond.',
      date: 'August 2024',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop'
    }
  ]

  useEffect(() => {
    // Auto-advance testimonials every 5 seconds
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section className="py-20 bg-gradient-to-br from-amber-50 to-stone-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-amber-600 text-sm tracking-widest uppercase mb-4">Guest Stories</p>
          <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-6">What Our Guests Say</h2>
        </div>

        <div className="relative">
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 animate-fadeIn">
            <Quote size={48} fill="#F59E0B" className="text-amber-400 mb-6" />
            {/* Rating Stars */}
            <div className="flex gap-1 mb-6">
              {[...Array(currentTestimonial.rating)].map((_, i) => (
                <Star key={i} size={20} fill="#F59E0B" className="text-amber-500" />
              ))}
            </div>
            {/* Comment */}
            <p className="text-gray-700 text-lg md:text-xl leading-relaxed mb-8 italic">
              &quot;{currentTestimonial.comment}&quot;
            </p>
            {/* Author Info */}
            <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
              {/* ✅ Ganti <img> dengan <Image /> untuk optimasi Avatar */}
              <Image
                src={currentTestimonial.avatar}
                alt={currentTestimonial.name}
                width={64} // W-16 = 64px
                height={64} // H-16 = 64px
                className="rounded-full object-cover ring-4 ring-amber-100"
              />
              <div>
                <h4 className="font-semibold text-gray-900 text-lg">{currentTestimonial.name}</h4>
                <p className="text-gray-600 text-sm">{currentTestimonial.location}</p>
                <p className="text-gray-400 text-xs mt-1">{currentTestimonial.date}</p>
              </div>
            </div>
          </div>
          {/* Previous Button */}
          <button
            onClick={() => navigate('prev')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-16 bg-white rounded-full p-3 shadow-lg hover:bg-amber-500 hover:text-white transition-all duration-300 z-10"
            aria-label="Previous Testimonial"
          >
            <ChevronLeft size={24} />
          </button>
          {/* Next Button */}
          <button
            onClick={() => navigate('next')}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-16 bg-white rounded-full p-3 shadow-lg hover:bg-amber-500 hover:text-white transition-all duration-300 z-10"
            aria-label="Next Testimonial"
          >
            <ChevronRight size={24} />
          </button>
        </div>
        {/* Indicators */}
        <div className="flex justify-center gap-3 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`transition-all duration-300 rounded-full ${index === currentIndex ? 'w-12 h-3 bg-amber-600' : 'w-3 h-3 bg-gray-300'}`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
