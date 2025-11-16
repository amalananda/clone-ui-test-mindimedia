// components/sections/CallToAction.tsx
'use client'
import UnderlineLink from '@/components/ui/UnderlineLink'

interface CallToActionProps {
  title?: string
  titleMobile?: string
  titleDesktop?: string
  subtitle?: string
  buttonText?: string
  buttonHref?: string
  className?: string
  optionalSubtitle?: string
  titleColor?: string
  buttonColor?: string
  optionalSubtitleColor?: string
  titleSize?: string
}

const CallToAction = ({
  title = "Reconnect with yourself in luxurious comfort.",
  titleMobile,
  titleDesktop,
  subtitle,
  buttonText = "BE OUR GUEST",
  buttonHref = "#guest",
  className = "",
  optionalSubtitle = "",
  titleColor = "text-[#C69C4D]",
  buttonColor = "text-[#C69C4D]",
  optionalSubtitleColor = "text-[#C69C4D]",
  titleSize = "text-2xl lg:text-3xl"
}: CallToActionProps) => {
  const mobileTitle = titleMobile || title
  const desktopTitle = titleDesktop || title
  return (
    <section className={`py-18 bg-[#EFEBE2] text-center ${className}`}>
      <div className="max-w-4xl mx-auto">
        {/* Mobile Title */}
        <h3 className={`font-americana ${titleSize} ${titleColor} mb-8 leading-tight lg:hidden`}>
          {mobileTitle.split('<br/>').map((line, index, array) => (
            <span key={index}>
              {line}
              {index < array.length - 1 && <br />}
            </span>
          ))}
        </h3>

        {/* Desktop Title */}
        <h3 className={`font-americana ${titleSize} ${titleColor} mb-8 leading-tight hidden lg:block`}>
          {desktopTitle.split('<br/>').map((line, index, array) => (
            <span key={index}>
              {line}
              {index < array.length - 1 && <br />}
            </span>
          ))}
        </h3>

        {subtitle && (
          <p className="text-[#6B5D4F] text-lg">{subtitle}</p>
        )}
        <UnderlineLink
          href={buttonHref}
          className="mt-0"
          textColor={buttonColor}
          underlineColor={buttonColor.replace('text-', 'bg-')}
        >
          {buttonText}
        </UnderlineLink>
      </div>
      {optionalSubtitle && (
        <UnderlineLink
          href={buttonHref}
          className="mb-[-4rem]"
          textColor={optionalSubtitleColor}
          underlineColor={optionalSubtitleColor.replace('text-', 'bg-')}
        >
          {optionalSubtitle}
        </UnderlineLink>
      )}
    </section>
  )
}

export default CallToAction
