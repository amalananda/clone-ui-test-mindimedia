// components/ui/UnderlineLink.tsx
import React from 'react'

interface UnderlineLinkProps {
  href?: string
  children: React.ReactNode
  className?: string
  textColor?: string
  underlineColor?: string
  hoverUnderlineColor?: string
  textSize?: string
  onClick?: () => void
}

const UnderlineLink: React.FC<UnderlineLinkProps> = ({
  href,
  children,
  className = "",
  textColor = "text-[#C69C4D]",
  underlineColor = "bg-[#C69C4D]",
  hoverUnderlineColor = "bg-[#E8E3D8]",
  textSize = "text-sm",
  onClick
}) => {
  if (onClick) {
    return (
      <button
        onClick={onClick}
        className={`inline-block ${textColor} font-medium ${textSize} relative group/link overflow-hidden ${className}`}
      >
        {children}
        <span className={`absolute bottom-0 left-0 w-full h-[1px] ${underlineColor} group-hover/link:opacity-0 transition-opacity duration-0 delay-700`}></span>
        <span className={`absolute bottom-0 left-0 w-full h-[1px] ${hoverUnderlineColor} translate-x-[-100%] group-hover/link:translate-x-[0%] transition-transform duration-500 ease-in-out`}></span>
      </button>
    )
  }
  return (
    <a
      href={href}
      className={`inline-block ${textColor} font-medium ${textSize} relative group/link overflow-hidden ${className}`}
    >
      {children}
      <span className={`absolute bottom-0 left-0 w-full h-[1px] ${underlineColor} group-hover/link:opacity-0 transition-opacity duration-0 delay-700`}></span>
      <span className={`absolute bottom-0 left-0 w-full h-[1px] ${hoverUnderlineColor} translate-x-[-100%] group-hover/link:translate-x-[0%] transition-transform duration-500 ease-in-out`}></span>
    </a>
  )
}

export default UnderlineLink
