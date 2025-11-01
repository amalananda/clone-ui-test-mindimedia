// components/sections/Gallery.tsx
'use client'

import React from 'react'
import GridImages from '@/components/ui/GridImages'
import galleryData from '@/lib/data/gallery-images.json'

interface GalleryImage {
  id: number
  url: string
  title: string
  size: 'small' | 'medium' | 'tall' | 'extra-tall' | 'super-tall'
  alternateImages?: string[]
}

interface GalleryProps {
  category?: keyof typeof galleryData
  images?: GalleryImage[]
  title?: string
  subtitle?: string
  autoRotate?: boolean
  rotateInterval?: number
  backgroundColor?: string
  showTitle?: boolean
}

const Gallery = ({
  category = 'home',
  images,
  title,
  subtitle,
  // autoRotate = true,
  // rotateInterval = 3000,
  backgroundColor = '#EFEBE2',
  showTitle = false
}: GalleryProps) => {
  const galleryImages = images || (galleryData[category] as GalleryImage[]) || []

  return (
    <section id="gallery" className="py-12 md:py-24" style={{ backgroundColor }}>
      <div className="max-w-[1600px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {showTitle && (title || subtitle) && (
          <div className="text-center mb-12 md:mb-16">
            {subtitle && (
              <p className="text-[#c9a961] text-sm md:text-base mb-2 font-americana">
                {subtitle}
              </p>
            )}
            {title && (
              <h2 className="text-3xl md:text-5xl font-americana text-[#c9a961]">
                {title}
              </h2>
            )}
          </div>
        )}

        <GridImages
          images={galleryImages}
          autoRotate={true}
          rotateInterval={3000}
          columns={{
            mobile: 2,
            tablet: 3,
            desktop: 3
          }}
          gap={16} // Gap dalam pixel
          showLightbox={true}
          className="px-4 sm:px-6 lg:px-8"
        />
      </div>
    </section>
  )
}

export default Gallery
