// components/ui/AnimatedMenuIcon.tsx
import React from 'react'
import { AnimatedMenuIconProps } from '@/lib/hero-types'

export const AnimatedMenuIcon = ({
  isOpen,
  firstLineLength = 32,
  secondLineLength = 64,
  strokeWidth = 0.5
}: AnimatedMenuIconProps) => {
  // Pengaturan X dengan sudut 30° antar garis
  const halfAngle = 15      // ← Setengah dari 30° (karena ada 2 garis)
  const centerY = 15        // ← Titik tengah pertemuan X
  const centerX = 32        // ← Titik tengah horizontal
  const length = 32         // ← Panjang dari center ke ujung

  // Konversi sudut ke radian
  const angleRad = (halfAngle * Math.PI) / 180

  // Hitung offset vertikal dan horizontal
  const yOffset = length * Math.sin(angleRad)  // ≈ 8.3px untuk 15°
  const xOffset = length * Math.cos(angleRad)  // ≈ 30.9px untuk 15°

  return (
    <svg
      width="70"
      height="32"
      viewBox="0 0 70 32"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      className="hamburger-icon"
    >
      {/* Line 1 - Garis dari kiri-bawah ke kanan-atas (15° dari horizontal) */}
      <line
        x1={isOpen ? (centerX - xOffset) : 0}           // Kiri
        y1={isOpen ? (centerY + yOffset) : 9}           // Bawah
        x2={isOpen ? (centerX + xOffset) : firstLineLength}  // Kanan
        y2={isOpen ? (centerY - yOffset) : 9}           // Atas
        className="line-1"
        style={{
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          opacity: 1
        }}
      />

      {/* Line 2 - Garis dari kiri-atas ke kanan-bawah (15° dari horizontal) */}
      <line
        x1={isOpen ? (centerX - xOffset) : 0}           // Kiri
        y1={isOpen ? (centerY - yOffset) : 15}          // Atas
        x2={isOpen ? (centerX + xOffset) : secondLineLength}  // Kanan
        y2={isOpen ? (centerY + yOffset) : 15}          // Bawah
        className="line-2"
        style={{
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          opacity: 1
        }}
      />
    </svg>
  )
}
