// components/ui/GridImages.tsx
'use client'

import React, { useState, useCallback, useEffect, useRef } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react'

interface GridImage {
  id: number
  url: string
  title: string
  size: 'small' | 'medium' | 'large' | 'wide' | 'tall' | 'extra-tall' | 'super-tall' | 'extra-wide' | 'jumbo' | 'banner'
  alternateImages?: string[]
  height?: number
  mobileSize?: 'small' | 'medium' | 'large' | 'wide' | 'tall' | 'extra-tall' | 'super-tall' | 'extra-wide' | 'jumbo' | 'banner'
}

interface GridImagesProps {
  images: GridImage[]
  autoRotate?: boolean
  rotateInterval?: number
  columns?: {
    mobile: number
    tablet: number
    desktop: number
  }
  gap?: number
  columnWidth?: number
  showLightbox?: boolean
  className?: string
  mobileHeightScale?: number // Multiplier untuk height di mobile (default 0.7)
}

const GridImages = ({
  images,
  autoRotate = true,
  rotateInterval = 3000,
  columns = {
    mobile: 2,
    tablet: 3,
    desktop: 4
  },
  gap = 16,
  columnWidth = 347.44,
  showLightbox = true,
  className = '',
}: GridImagesProps) => {
  const [selectedImage, setSelectedImage] = useState<GridImage | null>(null)
  const [currentImageIndexes, setCurrentImageIndexes] = useState<{ [key: number]: number }>({})
  const [columnCount, setColumnCount] = useState(columns.mobile)
  const [actualColumnWidth, setActualColumnWidth] = useState(columnWidth)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [, setIsMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const currentRotatingIndexRef = useRef(0)

  // Mount detection untuk menghindari hydration error
  useEffect(() => {
    setIsMounted(true)
    setIsMobile(window.innerWidth < 768)
  }, [])

  // Responsive columns and calculate actual column width
  useEffect(() => {
    const updateColumns = () => {
      let cols = columns.mobile
      const windowWidth = window.innerWidth

      if (windowWidth >= 1024) {
        cols = columns.desktop
      } else if (windowWidth >= 768) {
        cols = columns.tablet
      }

      setColumnCount(cols)
      setIsMobile(windowWidth < 768)

      // Calculate actual column width based on container
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth
        const totalGap = gap * (cols - 1)
        const availableWidth = containerWidth - totalGap
        const calculatedWidth = Math.min(availableWidth / cols, columnWidth)
        setActualColumnWidth(calculatedWidth)
      }
    }

    updateColumns()
    window.addEventListener('resize', updateColumns)
    return () => window.removeEventListener('resize', updateColumns)
  }, [columns, gap, columnWidth])

  // Auto rotate images - ONE AT A TIME
  useEffect(() => {
    if (!autoRotate) return

    const imagesWithAlternates = images.filter(
      image => image.alternateImages && image.alternateImages.length > 1
    )

    if (imagesWithAlternates.length === 0) return

    const interval = setInterval(() => {
      const imageToRotate = imagesWithAlternates[currentRotatingIndexRef.current]

      setCurrentImageIndexes(prev => {
        const currentIndex = prev[imageToRotate.id] || 0
        return {
          ...prev,
          [imageToRotate.id]: (currentIndex + 1) % (imageToRotate.alternateImages?.length || 1)
        }
      })

      // Move to next image for next rotation
      currentRotatingIndexRef.current = (currentRotatingIndexRef.current + 1) % imagesWithAlternates.length
    }, rotateInterval)

    return () => clearInterval(interval)
  }, [images, autoRotate, rotateInterval])

  // Reset zoom when image changes
  useEffect(() => {
    setZoomLevel(1)
  }, [selectedImage])

  const getCurrentImageUrl = (image: GridImage) => {
    if (!image.alternateImages || image.alternateImages.length === 0) {
      return image.url
    }
    const currentIndex = currentImageIndexes[image.id] || 0
    return image.alternateImages[currentIndex]
  }

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

  const handleZoom = (type: 'in' | 'out') => {
    setZoomLevel(prev => {
      if (type === 'in') {
        return Math.min(prev + 0.5, 3)
      } else {
        return Math.max(prev - 0.5, 1)
      }
    })
  }

  useEffect(() => {
    if (!selectedImage) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedImage(null)
      } else if (e.key === 'ArrowLeft') {
        navigateImage('prev')
      } else if (e.key === 'ArrowRight') {
        navigateImage('next')
      } else if (e.key === '+' || e.key === '=') {
        handleZoom('in')
      } else if (e.key === '-') {
        handleZoom('out')
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedImage, navigateImage])

  // Distribute images into columns maintaining order
  const distributeImages = () => {
    const cols: GridImage[][] = Array.from({ length: columnCount }, () => [])

    // Guard against undefined or null images
    if (!images || !Array.isArray(images)) {
      return cols
    }

    // Mobile view: Custom ordering untuk 2 columns
    // Pattern: [1, 4, 2], [3, 5, 6]
    // Kolom kiri: index 0, 3, 4 (gambar 1, 4, 5)
    // Kolom kanan: index 1, 2, 5 (gambar 2, 3, 6)
    if (isMobile && columnCount === 2) {
      const leftColumn = [0, 3, 2]   // Index untuk gambar 1, 4, 5
      const rightColumn = [1, 4, 5]  // Index untuk gambar 2, 3, 6

      // Distribute ke kolom kiri
      leftColumn.forEach(index => {
        if (index < images.length) {
          cols[0].push(images[index])
        }
      })

      // Distribute ke kolom kanan
      rightColumn.forEach(index => {
        if (index < images.length) {
          cols[1].push(images[index])
        }
      })

      // Untuk gambar ke-7 dan seterusnya, distribusi normal
      for (let i = 6;i < images.length;i++) {
        const colIndex = (i - 6) % columnCount
        cols[colIndex].push(images[i])
      }
    }
    // Desktop view: Normal distribution (left to right)
    else {
      images.forEach((image, index) => {
        const colIndex = index % columnCount
        cols[colIndex].push(image)
      })
    }

    return cols
  }

  const columns_array = distributeImages()

  // Calculate image height based on screen size
  const calculateImageHeight = (image: GridImage): number => {
    const currentSize = isMobile && image.mobileSize ? image.mobileSize : image.size
    let desktopHeight = image.height || 250
    let mobileHeight = image.height || 250

    // Heights untuk desktop dan mobile
    switch (currentSize) {
      case 'small':
        desktopHeight = 300
        mobileHeight = 170
        break
      case 'medium':
        desktopHeight = 317
        mobileHeight = 200
        break
      case 'tall':
        desktopHeight = 417
        mobileHeight = 230
        break
      case 'extra-tall':
        desktopHeight = 434
        mobileHeight = 290
        break
      case 'super-tall':
        desktopHeight = 600
        mobileHeight = 380
        break
      default:
        desktopHeight = image.height || 250
        mobileHeight = image.height ? Math.round(image.height * 0.65) : 160
    }

    return isMobile ? mobileHeight : desktopHeight
  }

  return (
    <>
      <div
        ref={containerRef}
        className={`flex justify-center w-full ${className}`}
        style={{ gap: `${gap}px` }}
      >
        {columns_array.map((column, colIndex) => (
          <div
            key={colIndex}
            className="flex flex-col"
            style={{
              width: `${actualColumnWidth}px`,
              gap: `${gap}px`
            }}
          >
            {column.map((image, imageIndex) => {
              const imageHeight = calculateImageHeight(image)

              return (
                <div
                  key={image.id}
                  className="group relative overflow-hidden cursor-pointer rounded-lg"
                  onClick={() => showLightbox && setSelectedImage(image)}
                  style={{
                    height: `${imageHeight}px`,
                    width: `${actualColumnWidth}px`,
                    animation: `fadeInScale 0.6s ease-out ${(colIndex + imageIndex) * 0.05}s both`
                  }}
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={getCurrentImageUrl(image)}
                      alt={image.title}
                      fill
                      className="object-cover transition-all duration-700 group-hover:scale-110"
                      sizes={`${actualColumnWidth}px`}
                      priority={imageIndex < 2}
                      key={`${image.id}-${currentImageIndexes[image.id] || 0}`}
                      style={{
                        animation: 'imageFade 0.5s ease-in-out'
                      }}
                    />
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="absolute bottom-2 md:bottom-4 left-2 md:left-4 right-2 md:right-4 z-10">
                    <div className="inline-block bg-black/60 backdrop-blur-sm px-2 py-1 rounded">
                      <p className="text-white text-[10px] md:text-sm font-light tracking-wide line-clamp-2">
                        {image.title}
                      </p>
                    </div>
                  </div>

                  {showLightbox && (
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
                  )}
                </div>
              )
            })}
          </div>
        ))}
      </div>

      {showLightbox && selectedImage && (
        <div
          className="fixed inset-0 z-[9999] bg-black/98 flex items-center justify-center overflow-hidden"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-3 right-3 md:top-8 md:right-8 text-white/80 hover:text-white transition-colors z-[10001] hover:bg-white/10 rounded-full p-2"
            onClick={(e) => {
              e.stopPropagation()
              setSelectedImage(null)
            }}
            aria-label="Close Gallery"
          >
            <X size={28} strokeWidth={1.5} className="md:w-8 md:h-8" />
          </button>

          {/* Zoom Controls */}
          <div className="absolute top-3 left-3 md:top-8 md:left-8 flex gap-2 z-[10001]">
            <button
              className="text-white/80 hover:text-white transition-colors hover:bg-white/10 rounded-full p-2"
              onClick={(e) => {
                e.stopPropagation()
                handleZoom('in')
              }}
              aria-label="Zoom In"
            >
              <ZoomIn size={24} strokeWidth={1.5} />
            </button>
            <button
              className="text-white/80 hover:text-white transition-colors hover:bg-white/10 rounded-full p-2"
              onClick={(e) => {
                e.stopPropagation()
                handleZoom('out')
              }}
              aria-label="Zoom Out"
            >
              <ZoomOut size={24} strokeWidth={1.5} />
            </button>
            <span className="text-white/60 text-sm flex items-center px-2">
              {Math.round(zoomLevel * 100)}%
            </span>
          </div>

          <button
            className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-all z-[10001] hover:bg-white/10 rounded-full p-2"
            onClick={(e) => {
              e.stopPropagation()
              navigateImage('prev')
            }}
            aria-label="Previous Image"
          >
            <ChevronLeft size={32} strokeWidth={1.5} className="md:w-10 md:h-10" />
          </button>

          <button
            className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-all z-[10001] hover:bg-white/10 rounded-full p-2"
            onClick={(e) => {
              e.stopPropagation()
              navigateImage('next')
            }}
            aria-label="Next Image"
          >
            <ChevronRight size={32} strokeWidth={1.5} className="md:w-10 md:h-10" />
          </button>

          <div
            className="relative w-full h-full max-w-7xl flex items-center justify-center px-4 overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              ref={imageRef}
              className="relative flex items-center justify-center transition-transform duration-300"
              style={{
                transform: `scale(${zoomLevel})`,
                cursor: zoomLevel > 1 ? 'move' : 'default'
              }}
            >
              <Image
                src={getCurrentImageUrl(selectedImage)}
                alt={selectedImage.title}
                width={1400}
                height={900}
                className="max-w-full max-h-[85vh] w-auto h-auto object-contain"
                style={{ animation: 'fadeIn 0.3s ease-out' }}
                priority
              />
            </div>

            <div className="absolute left-0 right-0 text-center px-4 pointer-events-none" style={{ bottom: '-48px' }}>
              <p className="text-white/90 text-sm md:text-lg font-light tracking-wider">
                {selectedImage.title}
              </p>
              <p className="text-white/50 text-xs md:text-sm mt-1">
                {images.findIndex(img => img.id === selectedImage.id) + 1} / {images.length}
              </p>
            </div>
          </div>

          <div className="absolute hidden md:block text-white/40 text-xs bottom-8 right-8">
            <p>← → to navigate • +/- to zoom • ESC to close</p>
          </div>
        </div>
      )}

      <style jsx>{`
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
    </>
  )
}

export default GridImages
