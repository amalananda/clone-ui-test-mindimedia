// hooks/useGalleryGroupedData.ts
import { useState, useEffect, useCallback } from 'react'
import { galleryService, GalleryImage } from '@/lib/api/gallery'
import galleryDataJson from '@/lib/data/gallery-images.json'

interface UseGalleryGroupedDataReturn {
  groupedImages: Record<string, GalleryImage[]>
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

export function useGalleryGroupedData(): UseGalleryGroupedDataReturn {
  const [groupedImages, setGroupedImages] = useState<Record<string, GalleryImage[]>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isFromBackend, setIsFromBackend] = useState(false)

  const loadLocalData = useCallback(() => {
    try {
      const localData = Object.fromEntries(
        Object.entries(galleryDataJson).map(([category, images]) => [
          category,
          (images as LocalImageData[]).map((image: LocalImageData) => ({
            id: image.id,
            category: category,
            url: image.url,
            alternateImages: image.alternateImages,
            title: image.title,
            size: image.size as GalleryImage['size'],
            mobileSize: image.mobileSize as GalleryImage['mobileSize'],
            height: image.height
          } as GalleryImage))
        ])
      ) as Record<string, GalleryImage[]>
      return localData
    } catch (err) {
      console.error('❌ Failed to load local JSON:', err)
      return {}
    }
  }, [])

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      // Try to fetch from backend
      const data = await galleryService.getImagesGrouped()
      setGroupedImages(data)
      setIsFromBackend(true)
      setError(null)
    } catch {
      // ✅ Fallback ke local JSON - NO ERROR THROWN
      const localData = loadLocalData()
      setGroupedImages(localData)
      setIsFromBackend(false)
      setError(null) // ❌ JANGAN set error message - biar seamless
    } finally {
      setLoading(false)
    }
  }, [loadLocalData])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return {
    groupedImages,
    loading,
    error,
    isFromBackend,
    refetch: fetchData
  }
}
