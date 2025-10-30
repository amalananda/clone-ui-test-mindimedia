// AnimatedLink.tsx (atau .jsx)

interface UnderlineLinkProps {
  href: string
  children: React.ReactNode
  className?: string
}

const UnderlineLink: React.FC<UnderlineLinkProps> = ({ href, children, className = "" }) => {
  return (
    <a
      href={href}
      className={`inline-block text-[#C69C4D] font-medium text-sm relative group/link overflow-hidden ${className}`
      }
    >
      {children}
      < span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#C69C4D] group-hover/link:opacity-0 transition-opacity duration-0 delay-700" ></span >
      <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#E8E3D8] translate-x-[-100%] group-hover/link:translate-x-[0%] transition-transform duration-500 ease-in-out"></span>
    </a >
  )
}

export default UnderlineLink
