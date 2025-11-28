// hooks/useGalleryData.ts
import { useState, useEffect, useCallback } from 'react'
import { galleryService, GalleryImage } from '@/lib/api/gallery'
import galleryDataJson from '@/lib/data/gallery-images.json'

interface UseGalleryDataReturn {
  images: GalleryImage[]
  loading: boolean
  error: string | null
  isFromBackend: boolean
  refetch: () => Promise<void>
}

interface LocalImageData {
  id: number
  url: string
  alternateImages?: string[]
  title: string
  size: string
  mobileSize?: string
  height?: number
}

export function useGalleryData(category?: string): UseGalleryDataReturn {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isFromBackend, setIsFromBackend] = useState(false)

  const loadLocalData = useCallback(() => {
    try {
      const localData = galleryDataJson as Record<string, LocalImageData[]>

      if (category && localData[category]) {
        const categoryImages = localData[category].map((image: LocalImageData) => ({
          id: image.id,
          category: category,
          url: image.url,
          alternateImages: image.alternateImages,
          title: image.title,
          size: image.size as GalleryImage['size'],
          mobileSize: image.mobileSize as GalleryImage['mobileSize'],
          height: image.height
        } as GalleryImage))
        return categoryImages
      } else if (!category) {
        const allImages: GalleryImage[] = []
        Object.entries(localData).forEach(([cat, imgs]) => {
          imgs.forEach((image: LocalImageData) => {
            allImages.push({
              id: image.id,
              category: cat,
              url: image.url,
              alternateImages: image.alternateImages,
              title: image.title,
              size: image.size as GalleryImage['size'],
              mobileSize: image.mobileSize as GalleryImage['mobileSize'],
              height: image.height
            } as GalleryImage)
          })
        })
        return allImages
      }
      return []
    } catch (err) {
      console.error('❌ Failed to load local JSON:', err)
      return []
    }
  }, [category])

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      // Try to fetch from backend
      let data: GalleryImage[]

      if (category) {
        data = await galleryService.getImagesByCategory(category)
      } else {
        data = await galleryService.getAllImages()
      }

      setImages(data)
      setIsFromBackend(true)
      setError(null)
    } catch {
      // ✅ Fallback ke local JSON - NO ERROR THROWN
      const localImages = loadLocalData()
      setImages(localImages)
      setIsFromBackend(false)
      setError(null) // ❌ JANGAN set error message - biar seamless
    } finally {
      setLoading(false)
    }
  }, [category, loadLocalData])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return {
    images,
    loading,
    error,
    isFromBackend,
    refetch: fetchData
  }
}
