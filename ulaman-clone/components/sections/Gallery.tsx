// components/sections/Gallery.tsx
'use client'

import React, { useState, useCallback, useEffect } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

interface GalleryImage {
  id: number
  url: string
  title: string
  size: 'small' | 'medium' | 'large' | 'wide' | 'tall'
  alternateImages?: string[]
}

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [currentImageIndexes, setCurrentImageIndexes] = useState<{ [key: number]: number }>({})

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const images: GalleryImage[] = [
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=800&fit=crop&q=80',
      alternateImages: [
        'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=800&fit=crop&q=80',
        'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&h=800&fit=crop&q=80',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=800&fit=crop&q=80'
      ],
      title: 'Ulaman Romantic Dinner',
      size: 'large'
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=600&h=400&fit=crop&q=80',
      alternateImages: [
        'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=600&h=400&fit=crop&q=80',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop&q=80'
      ],
      title: 'Bathtub Flower Decorations',
      size: 'medium'
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&h=800&fit=crop&q=80',
      alternateImages: [
        'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&h=800&fit=crop&q=80',
        'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=600&h=800&fit=crop&q=80'
      ],
      title: "'Melukat' Water Blessing Ceremony",
      size: 'tall'
    },
    {
      id: 4,
      url: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&h=400&fit=crop&q=80',
      alternateImages: [
        'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&h=400&fit=crop&q=80',
        'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop&q=80'
      ],
      title: 'Organic Breakfast',
      size: 'medium'
    },
    {
      id: 5,
      url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop&q=80',
      alternateImages: [
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop&q=80',
        'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&h=400&fit=crop&q=80'
      ],
      title: 'Wedding Ceremony',
      size: 'medium'
    },
    {
      id: 6,
      url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=800&fit=crop&q=80',
      alternateImages: [
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=800&fit=crop&q=80',
        'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=800&fit=crop&q=80'
      ],
      title: 'Ulaman Architecture',
      size: 'large'
    },
    {
      id: 7,
      url: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=600&h=800&fit=crop&q=80',
      alternateImages: [
        'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=600&h=800&fit=crop&q=80',
        'https://images.unsplash.com/photo-1588286840104-8957b019727f?w=600&h=800&fit=crop&q=80'
      ],
      title: 'Yoga (All Levels)',
      size: 'tall'
    },
    {
      id: 8,
      url: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop&q=80',
      alternateImages: [
        'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop&q=80',
        'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&h=400&fit=crop&q=80'
      ],
      title: 'Reiki Healing',
      size: 'medium'
    },
    {
      id: 9,
      url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=800&fit=crop&q=80',
      alternateImages: [
        'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=800&fit=crop&q=80',
        'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&h=800&fit=crop&q=80'
      ],
      title: 'Sandibala: A Romantic Villa Dinner',
      size: 'tall'
    },
    {
      id: 10,
      url: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&h=400&fit=crop&q=80',
      alternateImages: [
        'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&h=400&fit=crop&q=80',
        'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600&h=400&fit=crop&q=80'
      ],
      title: 'Flower Arrangements',
      size: 'medium'
    },
    {
      id: 11,
      url: 'https://images.unsplash.com/photo-1582582621959-48d27397dc69?w=800&h=800&fit=crop&q=80',
      alternateImages: [
        'https://images.unsplash.com/photo-1582582621959-48d27397dc69?w=800&h=800&fit=crop&q=80',
        'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800&h=800&fit=crop&q=80'
      ],
      title: 'Photoshoot and Drone Services',
      size: 'large'
    },
    {
      id: 12,
      url: 'https://images.unsplash.com/photo-1551244072-5d12893278ab?w=600&h=400&fit=crop&q=80',
      alternateImages: [
        'https://images.unsplash.com/photo-1551244072-5d12893278ab?w=600&h=400&fit=crop&q=80',
        'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&h=400&fit=crop&q=80'
      ],
      title: "Chef's Selection Menu",
      size: 'medium'
    }
  ]

  // Auto-rotate images setiap 3 detik
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndexes(prev => {
        const newIndexes = { ...prev }
        images.forEach(image => {
          if (image.alternateImages && image.alternateImages.length > 1) {
            const currentIndex = prev[image.id] || 0
            newIndexes[image.id] = (currentIndex + 1) % image.alternateImages.length
          }
        })
        return newIndexes
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [images])

  // Get current image URL with rotation
  const getCurrentImageUrl = (image: GalleryImage) => {
    if (!image.alternateImages || image.alternateImages.length === 0) {
      return image.url
    }
    const currentIndex = currentImageIndexes[image.id] || 0
    return image.alternateImages[currentIndex]
  }

  // Navigate lightbox
  const navigateImage = useCallback((direction: 'prev' | 'next') => {
    if (!selectedImage) return
    const currentIndex = images.findIndex(img => img.id === selectedImage.id)
    let newIndex = currentIndex

    if (direction === 'next') {
      newIndex = (currentIndex + 1) % images.length
    } else {
      newIndex = (currentIndex - 1 + images.length) % images.length
    }

    setSelectedImage(images[newIndex])
  }, [selectedImage, images])

  // Keyboard navigation
  useEffect(() => {
    if (!selectedImage) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedImage(null)
      } else if (e.key === 'ArrowLeft') {
        navigateImage('prev')
      } else if (e.key === 'ArrowRight') {
        navigateImage('next')
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedImage, navigateImage])

  // Get grid class based on size
  const getGridClass = (size: string) => {
    switch (size) {
      case 'large':
        return 'col-span-2 row-span-2'
      case 'tall':
        return 'row-span-2'
      case 'wide':
        return 'col-span-2'
      default:
        return ''
    }
  }

  return (
    <section id="gallery" className="py-12 md:py-24 bg-[#E8E3D8]">
      <div className="max-w-[1600px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Grid Gallery - Masonry Style */}
        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[280px] gap-2 md:gap-4">
          {images.map((image, index) => (
            <div
              key={image.id}
              className={`group relative overflow-hidden cursor-pointer rounded ${getGridClass(image.size)}`}
              onClick={() => setSelectedImage(image)}
              style={{
                animation: `fadeInScale 0.6s ease-out ${index * 0.05}s both`
              }}
            >
              {/* Image with crossfade transition */}
              <div className="relative w-full h-full">
                <Image
                  src={getCurrentImageUrl(image)}
                  alt={image.title}
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 50vw, 25vw"
                  priority={index < 6}
                  key={`${image.id}-${currentImageIndexes[image.id] || 0}`}
                  style={{
                    animation: 'imageFade 0.5s ease-in-out'
                  }}
                />
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Label - Bottom Left */}
              <div className="absolute bottom-2 md:bottom-4 left-2 md:left-4 right-2 md:right-4 z-10">
                <div className="inline-block bg-black/60 backdrop-blur-sm px-2 md:px-3 py-1 md:py-1.5 rounded">
                  <p className="text-white text-[10px] md:text-sm font-light tracking-wide line-clamp-2">
                    {image.title}
                  </p>
                </div>
              </div>

              {/* Hover Effect - Zoom Indicator (desktop only) */}
              <div className="hidden md:flex absolute inset-0 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-12 h-12 border-2 border-white rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[9999] bg-black/98 flex items-center justify-center"
          onClick={() => setSelectedImage(null)}
        >
          {/* Close Button */}
          <button
            className="absolute top-3 right-3 md:top-8 md:right-8 text-white/80 hover:text-white transition-colors z-[10000] p-2 hover:bg-white/10 rounded-full"
            onClick={(e) => {
              e.stopPropagation()
              setSelectedImage(null)
            }}
            aria-label="Close Gallery"
          >
            <X size={28} strokeWidth={1.5} className="md:w-8 md:h-8" />
          </button>

          {/* Previous Button */}
          <button
            className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-all z-[10000] p-2 md:p-3 hover:bg-white/10 rounded-full"
            onClick={(e) => {
              e.stopPropagation()
              navigateImage('prev')
            }}
            aria-label="Previous Image"
          >
            <ChevronLeft size={32} strokeWidth={1.5} className="md:w-10 md:h-10" />
          </button>

          {/* Next Button */}
          <button
            className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-all z-[10000] p-2 md:p-3 hover:bg-white/10 rounded-full"
            onClick={(e) => {
              e.stopPropagation()
              navigateImage('next')
            }}
            aria-label="Next Image"
          >
            <ChevronRight size={32} strokeWidth={1.5} className="md:w-10 md:h-10" />
          </button>

          {/* Image Container */}
          <div
            className="relative w-full h-full max-w-7xl px-4 md:px-8 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full max-h-[70vh] md:max-h-[85vh] flex items-center justify-center">
              <Image
                src={getCurrentImageUrl(selectedImage)}
                alt={selectedImage.title}
                width={1400}
                height={900}
                className="max-w-full max-h-[70vh] md:max-h-[85vh] w-auto h-auto object-contain"
                style={{ animation: 'fadeIn 0.3s ease-out' }}
                priority
              />
            </div>

            {/* Image Title - Bottom */}
            <div className="absolute -bottom-12 md:-bottom-16 left-0 right-0 text-center px-4">
              <p className="text-white/90 text-sm md:text-lg font-light tracking-wider">
                {selectedImage.title}
              </p>
              <p className="text-white/50 text-xs md:text-sm mt-1 md:mt-2">
                {images.findIndex(img => img.id === selectedImage.id) + 1} / {images.length}
              </p>
            </div>
          </div>

          {/* Keyboard Instructions */}
          <div className="absolute bottom-8 left-8 text-white/40 text-xs hidden md:block">
            <p>Use ← → keys to navigate • ESC to close</p>
          </div>
        </div>
      )}

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

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes imageFade {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  )
}

export default Gallery
