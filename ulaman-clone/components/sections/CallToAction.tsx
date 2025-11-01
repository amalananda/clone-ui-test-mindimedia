// components/sections/CallToAction.tsx
'use client'
import UnderlineLink from '@/components/ui/UnderlineLink'

interface CallToActionProps {
  title?: string
  subtitle?: string
  buttonText?: string
  buttonHref?: string
  className?: string
  optionalSubtitle?: string
}

const CallToAction = ({
  title = "Reconnect with yourself in luxurious comfort.",
  subtitle,
  buttonText = "BE OUR GUEST",
  buttonHref = "#guest",
  className = "",
  optionalSubtitle = ""
}: CallToActionProps) => {
  return (
    <section className={`py-24 bg-[#EFEBE2] text-center ${className}`}>
      <div className="max-w-4xl mx-auto mt-4">
        <h3 className="font-americana text-2xl lg:text-3xl text-[#C69C4D] mb-8 leading-tight">
          {title.split('<br/>').map((line, index, array) => (
            <span key={index}>
              {line}
              {index < array.length - 1 && <br />}
            </span>
          ))}
        </h3>
        {subtitle && (
          <p className="text-[#6B5D4F] text-lg">{subtitle}</p>
        )}
        <UnderlineLink href={buttonHref} className="mt-0">
          {buttonText}
        </UnderlineLink>
      </div>
      <UnderlineLink href={buttonHref} className=" mb-[-4rem]">
        {optionalSubtitle}
      </UnderlineLink>
    </section>
  )
}

export default CallToAction
