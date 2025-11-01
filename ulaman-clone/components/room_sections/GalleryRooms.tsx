// components/GalleryRooms.tsx
'use client'
import { useState } from 'react'
import Image from 'next/image'

export default function GalleryRooms() {
  const [activeView, setActiveView] = useState<'inside' | 'outside'>('inside')

  const insideImages = [
    {
      src: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&h=700&fit=crop&q=80',
      alt: 'Luxury villa lounge area'
    },
    {
      src: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600&h=700&fit=crop&q=80',
      alt: 'Modern bathroom with mirror'
    },
    {
      src: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=600&h=700&fit=crop&q=80',
      alt: 'Villa bedroom interior'
    },
  ]

  const outsideImages = [
    {
      src: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&h=700&fit=crop&q=80',
      alt: 'Villa deck with hammock overlooking lake'
    },
    {
      src: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&h=700&fit=crop&q=80',
      alt: 'Villa entrance with tropical garden'
    },
    {
      src: 'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=600&h=700&fit=crop&q=80',
      alt: 'Floating villa deck view over water'
    },
  ]

  const currentImages = activeView === 'inside' ? insideImages : outsideImages

  return (
    <section className="py-12 px-6 bg-[#EFEBE2]">
      <div className="max-w-7xl mx-auto">
        {/* Top Images */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {currentImages.slice(0, 3).map((img, idx) => (
            <div
              key={`${activeView}-top-${idx}`}
              className="relative overflow-hidden rounded-lg group"
              style={{
                animation: `fadeInScale 0.5s ease-out ${idx * 0.1}s both`
              }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={600}
                height={700}
                className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          ))}
        </div>

        {/* Toggle Buttons */}
        <div className="flex justify-center gap-8 mb-12">
          <button
            onClick={() => setActiveView('inside')}
            className={`flex items-center gap-3 transition-all duration-300 ${activeView === 'inside' ? 'text-[#C5A572]' : 'text-[#8B7355]/50'
              }`}
          >
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${activeView === 'inside' ? 'bg-[#C5A572]/10' : 'bg-[#8B7355]/5'
                }`}
            >
              <span className="text-sm">📷</span>
            </div>
            <span className="text-sm font-medium">
              From the<br />inside
            </span>
          </button>

          <button
            onClick={() => setActiveView('outside')}
            className={`flex items-center gap-3 transition-all duration-300 ${activeView === 'outside' ? 'text-[#C5A572]' : 'text-[#8B7355]/50'
              }`}
          >
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${activeView === 'outside' ? 'bg-[#C5A572]/10' : 'bg-[#8B7355]/5'
                }`}
            >
              <span className="text-sm">🌿</span>
            </div>
            <span className="text-sm font-medium">
              From the<br />outside
            </span>
          </button>
        </div>

        {/* Bottom Images */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {currentImages.slice(3, 6).map((img, idx) => (
            <div
              key={`${activeView}-bottom-${idx}`}
              className="relative overflow-hidden rounded-lg group"
              style={{
                animation: `fadeInScale 0.5s ease-out ${(idx + 3) * 0.1}s both`
              }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={600}
                height={700}
                className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </section>
  )
}
