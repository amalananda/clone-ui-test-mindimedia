// components/ui/UnderlineLinkOnHover.tsx
'use client'

import React from 'react'

interface UnderlineLinkOnHoverProps {
  href: string
  children: React.ReactNode
  className?: string
  textColor?: string
  underlineColor?: string
  textSize?: string
}

const UnderlineLinkOnHover: React.FC<UnderlineLinkOnHoverProps> = ({
  href,
  children,
  className = "",
  textColor = "text-[#C69C4D]",
  underlineColor = "bg-[#C69C4D]",
  textSize = "text-sm"
}) => {
  return (
    <a
      href={href}
      className={`inline-block ${textColor} font-medium ${textSize} relative group overflow-hidden ${className}`}
    >
      {children}
      <span className={`absolute bottom-0 left-0 w-full h-[1px] ${underlineColor} scale-x-0 group-hover:scale-x-100 origin-right transition-transform duration-300 ease-out`}></span>
    </a>
  )
}

export default UnderlineLinkOnHover
