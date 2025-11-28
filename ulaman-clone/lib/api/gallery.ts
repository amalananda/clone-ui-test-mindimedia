// lib/api/gallery.ts
import axios, { AxiosError } from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

export interface GalleryImage {
  id: number
  category: string
  url: string
  alternateImages?: string[]
  title: string
  size: 'small' | 'medium' | 'large' | 'wide' | 'tall' | 'extra-tall' | 'super-tall' | 'extra-wide' | 'jumbo' | 'banner'
  mobileSize?: 'small' | 'medium' | 'large' | 'wide' | 'tall' | 'extra-tall' | 'super-tall' | 'extra-wide' | 'jumbo' | 'banner'
  height?: number
}

interface BackendGalleryImage {
  id: number
  category: string
  url: string
  alternate_images?: string[] | null
  title: string
  size: string
  mobile_size?: string | null
  height?: number | null
  created_at: string
  updated_at: string
}

interface GalleryResponse {
  success: boolean
  data: BackendGalleryImage[] | Record<string, BackendGalleryImage[]>
}

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000, // Kurangi timeout jadi 5 detik
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

function transformImage(backendImage: BackendGalleryImage): GalleryImage {
  return {
    id: backendImage.id,
    category: backendImage.category,
    url: backendImage.url,
    alternateImages: backendImage.alternate_images || undefined,
    title: backendImage.title,
    size: backendImage.size as GalleryImage['size'],
    mobileSize: backendImage.mobile_size as GalleryImage['mobileSize'],
    height: backendImage.height || undefined
  }
}

// ✅ Helper function untuk handle error dengan silent
function isBackendAvailable(error: unknown): boolean {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError
    // Network error = backend mati
    if (axiosError.code === 'ERR_NETWORK' || axiosError.message === 'Network Error') {
      return false
    }
    // Timeout = backend tidak respond
    if (axiosError.code === 'ECONNABORTED') {
      return false
    }
  }
  return false
}

export const galleryService = {
  async getAllImages(): Promise<GalleryImage[]> {
    try {
      const response = await apiClient.get<GalleryResponse>('/gallery')

      if (!response.data.success || !Array.isArray(response.data.data)) {
        throw new Error('Invalid response from backend')
      }

      const images = response.data.data.map(transformImage)
      return images
    } catch (error) {
      // ✅ Silent fail - biarkan hook yang handle fallback
      if (isBackendAvailable(error)) {
        console.warn('⚠️ Backend unavailable, falling back to local data')
      }
      throw error // Re-throw untuk di-catch oleh hook
    }
  },

  async getImagesGrouped(): Promise<Record<string, GalleryImage[]>> {
    try {
      const response = await apiClient.get<GalleryResponse>('/gallery/grouped')

      if (!response.data.success) {
        throw new Error('Invalid response from backend')
      }

      const grouped = response.data.data as Record<string, BackendGalleryImage[]>
      const transformed: Record<string, GalleryImage[]> = {}

      Object.entries(grouped).forEach(([category, images]) => {
        transformed[category] = images.map(transformImage)
      })

      return transformed
    } catch (error) {
      if (isBackendAvailable(error)) {
        console.warn('⚠️ Backend unavailable, falling back to local data')
      }
      throw error
    }
  },

  async getImagesByCategory(category: string): Promise<GalleryImage[]> {
    try {
      const response = await apiClient.get<GalleryResponse>(`/gallery/${category}`)

      if (!response.data.success) {
        throw new Error(`Backend error for category: ${category}`)
      }

      if (!Array.isArray(response.data.data)) {
        throw new Error('Invalid data format from backend')
      }

      if (response.data.data.length === 0) {
        return []
      }

      const images = response.data.data.map(transformImage)
      return images
    } catch (error) {
      if (isBackendAvailable(error)) {
        console.warn(`⚠️ Backend unavailable for category "${category}", falling back to local data`)
      }
      throw error
    }
  },

  async getCategories(): Promise<string[]> {
    try {
      const response = await apiClient.get<{ success: boolean; data: string[] }>('/gallery/categories')
      return response.data.data
    } catch (error) {
      if (isBackendAvailable(error)) {
        console.warn('⚠️ Backend unavailable, falling back to local data')
      }
      throw error
    }
  }
}
