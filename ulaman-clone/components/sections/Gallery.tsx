// components/sections/Gallery.tsx
'use client'
import React, { useState, useCallback } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react'

// 1. add interface for GalleryImage
interface GalleryImage {
  id: number
  url: string
  category: string
  title: string
}

const Gallery = () => {
  // 2. Use the GalleryImage type for selectedImage state
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [activeCategory, setActiveCategory] = useState('all')

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'resort', label: 'Resort' },
    { id: 'rooms', label: 'Rooms' },
    { id: 'nature', label: 'Nature' }
  ]

  const images: GalleryImage[] = [ // 3. Gunakan tipe untuk array images
    { id: 1, url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop', category: 'resort', title: 'Main Pavilion' },
    { id: 2, url: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&h=600&fit=crop', category: 'rooms', title: 'Eco Loft Interior' },
    { id: 3, url: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&h=600&fit=crop', category: 'rooms', title: 'Valley Villa' },
    { id: 4, url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', category: 'nature', title: 'Jungle Views' },
    { id: 5, url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop', category: 'resort', title: 'Infinity Pool' },
    { id: 6, url: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&h=600&fit=crop', category: 'resort', title: 'Spa & Wellness' }
  ]

  const filteredImages = activeCategory === 'all' ? images : images.filter(img => img.category === activeCategory)

  // Function to navigate images in lightbox
  const navigateImage = useCallback((direction: 'prev' | 'next') => {
    if (!selectedImage) return
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id)
    let newIndex = currentIndex
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % filteredImages.length
    } else {
      newIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length
    }
    setSelectedImage(filteredImages[newIndex])
  }, [selectedImage, filteredImages])
  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-amber-600 text-sm tracking-widest uppercase mb-4">Visual Journey</p>
          <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-6">Gallery</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">Explore the beauty and tranquility of Ulaman</p>
        </div>
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2 rounded-full text-sm tracking-wider transition-all duration-300 ${activeCategory === cat.id ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              {cat.label}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredImages.map((image, index) => (
            <div
              key={image.id}
              className="group relative aspect-square overflow-hidden rounded-lg cursor-pointer animate-slideUp"
              onClick={() => setSelectedImage(image)}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <Image
                src={image.url}
                alt={image.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                priority={index < 3}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                <div className="transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 text-center">
                  <Maximize2 className="text-white mb-2 mx-auto" size={32} />
                  <p className="text-white text-sm tracking-wider">{image.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>

          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-white hover:text-amber-400 transition-colors z-[60]"
            onClick={() => setSelectedImage(null)}
            aria-label="Close Lightbox"
          >
            <X size={32} />
          </button>

          {/* Previous Button */}
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-3 rounded-full bg-black/50 hover:bg-black/80 transition-all z-[60] hidden md:block"
            onClick={(e) => { e.stopPropagation(); navigateImage('prev') }}
            aria-label="Previous Image"
          >
            <ChevronLeft size={32} />
          </button>

          <div className="max-w-5xl max-h-[90vh] w-full relative" onClick={(e) => e.stopPropagation()}>
            <Image
              src={selectedImage.url}
              alt={selectedImage.title}
              width={1000}
              height={750}
              className="w-full h-full object-contain rounded-lg animate-fadeIn"
            />
            <p className="text-white text-center mt-4 text-lg tracking-wider">{selectedImage.title}</p>
          </div>
          {/* Next Button */}
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-3 rounded-full bg-black/50 hover:bg-black/80 transition-all z-[60] hidden md:block"
            onClick={(e) => { e.stopPropagation(); navigateImage('next') }}
            aria-label="Next Image"
          >
            <ChevronRight size={32} />
          </button>
        </div>
      )}
    </section>
  )
}

export default Gallery
